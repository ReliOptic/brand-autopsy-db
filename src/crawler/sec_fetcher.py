"""
SEC EDGAR data fetcher for S&P 500 companies.

Uses public EDGAR APIs (no auth required) to fetch 10-K / 20-F filing
metadata, XBRL financial facts, and key text sections (Risk Factors,
Legal Proceedings).

Rate limit: ≤10 req/s per SEC policy (User-Agent header required).
Output: data/raw/{ticker}/sec_10k.json
"""

from __future__ import annotations

import asyncio
import csv
import html as html_lib
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import httpx

DATA_DIR = Path(__file__).parent.parent.parent / "data"
RAW_DIR = DATA_DIR / "raw"
CSV_PATH = DATA_DIR / "sp500_list.csv"

_HEADERS = {"User-Agent": "BrandAutopsyBot/1.0 ckiwon7@gmail.com"}
_CONCURRENCY = 8  # stay under SEC's 10 req/s ceiling
_STREAM_LIMIT = 6_000_000  # 6 MB — large 10-Ks place Item 1A at 3–5 MB in

# XBRL concept groups — first match wins per category
_XBRL_CONCEPTS: dict[str, list[str]] = {
    "revenue": [
        "RevenueFromContractWithCustomerExcludingAssessedTax",
        "Revenues",
        "SalesRevenueNet",
    ],
    "net_income": ["NetIncomeLoss"],
    "operating_income": ["OperatingIncomeLoss"],
    "gross_profit": ["GrossProfit"],
    "total_assets": ["Assets"],
    "shareholders_equity": [
        "StockholdersEquity",
        "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        "CommonStockholdersEquity",
    ],
    "rd_expense": ["ResearchAndDevelopmentExpense"],
    "sga_expense": [
        "SellingGeneralAndAdministrativeExpense",
        "SellingAndMarketingExpense",
        "GeneralAndAdministrativeExpense",
    ],
    "capex": ["PaymentsToAcquirePropertyPlantAndEquipment"],
    "eps_diluted": ["EarningsPerShareDiluted"],
    "long_term_debt": [
        "LongTermDebtAndCapitalLeaseObligationsIncludingCurrentMaturities",
        "LongTermDebtNoncurrent",
        "LongTermDebt",
        "LongTermDebtAndCapitalLeaseObligations",
    ],
    "cash": [
        "CashAndDueFromBanks",
        "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents",
        "CashAndCashEquivalentsAtCarryingValue",
        "CashCashEquivalentsAndShortTermInvestments",
    ],
    "share_repurchases": ["PaymentsForRepurchaseOfCommonStock"],
    "dividends_paid": ["PaymentsOfDividends", "PaymentsOfDividendsCommonStock"],
}

_HTML_TAG_RE = re.compile(r"<[^>]+>")
_BLOCK_TAG_RE = re.compile(r"<(?:p|div|h[1-6]|tr|li|br)[^>]*>", re.IGNORECASE)
_MULTILINE_RE = re.compile(r"\n{3,}")
_INLINE_SPACE_RE = re.compile(r"[ \t]+")


def _pad_cik(cik: str) -> str:
    return str(cik).strip().zfill(10)


def _strip_html(raw: str) -> str:
    text = html_lib.unescape(raw)
    # Preserve paragraph/section breaks so section headers stay line-initial
    text = _BLOCK_TAG_RE.sub("\n", text)
    text = _HTML_TAG_RE.sub(" ", text)
    text = _INLINE_SPACE_RE.sub(" ", text)
    return _MULTILINE_RE.sub("\n\n", text).strip()


def _extract_section(text: str, item_id: str, max_chars: int = 3000, min_chars: int = 2_000) -> str:
    """Extract a 10-K item section from plain text (e.g. item_id='1A' or '3').

    Requires the marker to be line-initial (after block-tag preservation) to
    avoid matching mid-sentence cross-references like 'see Item 1A'.
    min_chars filters TOC stubs; use a lower value for sections that can be short.
    """
    marker_re = re.compile(
        r"^[ \t]*(?:ITEM|Item)\s+" + re.escape(item_id) + r"[\s.,\-—–]",
        re.MULTILINE,
    )
    next_re = re.compile(
        r"^[ \t]*(?:ITEM|Item)\s+\d+[A-Z]?[\s.,\-—–]",
        re.MULTILINE | re.IGNORECASE,
    )
    for m in marker_re.finditer(text):
        tail = text[m.start() + 8:]
        end = next_re.search(tail)
        excerpt = tail[: end.start() if end else 50_000]
        if len(excerpt.strip()) > min_chars:
            return excerpt[:max_chars].strip()
    return ""


def _extract_annual_xbrl(facts: dict, concepts: list[str]) -> list[dict[str, Any]]:
    """Extract annual values keyed by reporting year (from `end` date).

    The XBRL `fy` field is the FILING year, not the reporting year. A
    single 10-K carries prior-year comparative facts under the same
    `fy`, so grouping by `fy` silently maps comparatives to the wrong
    year (e.g. an FY2021 net income mis-tagged as FY2023). This caller
    instead uses the calendar year of the `end` date, and for duration
    facts (income statement, cash flow) restricts to ~annual periods so
    quarterly entries don't leak in. Instant facts (balance sheet) lack
    `start` and are kept by `end` year directly.

    On collision (rare: same year reported in multiple filings), the
    most recently filed value wins.
    """
    usgaap = facts.get("us-gaap", {})
    best_result: list[dict[str, Any]] = []
    best_max_year: int = 0
    for concept in concepts:
        if concept not in usgaap:
            continue
        units = usgaap[concept].get("units", {})
        unit_key = next(iter(units), None)
        if not unit_key:
            continue
        annual = [e for e in units[unit_key] if e.get("form") == "10-K"]
        by_year: dict[int, dict] = {}
        for e in annual:
            end_raw = e.get("end")
            if not end_raw:
                continue
            try:
                end_dt = datetime.strptime(end_raw, "%Y-%m-%d").date()
            except (TypeError, ValueError):
                continue
            start_raw = e.get("start")
            if start_raw:
                # Duration fact (income statement, cash flow): require ~annual period
                try:
                    start_dt = datetime.strptime(start_raw, "%Y-%m-%d").date()
                except (TypeError, ValueError):
                    continue
                duration_days = (end_dt - start_dt).days
                if not 350 <= duration_days <= 380:
                    continue
            year = end_dt.year
            existing = by_year.get(year)
            if existing is None or e.get("filed", "") > existing.get("filed", ""):
                by_year[year] = e
        if not by_year:
            continue
        max_year = max(by_year)
        if max_year > best_max_year:
            best_max_year = max_year
            top = sorted(by_year, reverse=True)[:7]
            best_result = [{"year": yr, "value": by_year[yr]["val"], "unit": unit_key} for yr in top]
    return best_result


def _build_financials(facts: dict) -> dict[str, list[dict[str, Any]]]:
    # EDGAR companyfacts response: {"facts": {"us-gaap": {...}}}
    return {k: _extract_annual_xbrl(facts.get("facts", {}), v) for k, v in _XBRL_CONCEPTS.items()}


async def _get(
    client: httpx.AsyncClient,
    url: str,
    semaphore: asyncio.Semaphore,
    timeout: float = 30.0,
) -> dict | None:
    for attempt in range(3):
        async with semaphore:
            await asyncio.sleep(0.13)  # ~7.5 req/s sustained
            try:
                r = await client.get(url, headers=_HEADERS, timeout=timeout)
                if r.status_code == 200:
                    return r.json()
                if r.status_code in (429,) or r.status_code >= 500:
                    await asyncio.sleep(2**attempt)
                    continue
                return None
            except Exception:
                if attempt == 2:
                    return None
                await asyncio.sleep(2**attempt)
    return None


async def _fetch_10k_meta(
    client: httpx.AsyncClient, cik_padded: str, semaphore: asyncio.Semaphore
) -> dict | None:
    data = await _get(
        client, f"https://data.sec.gov/submissions/CIK{cik_padded}.json", semaphore
    )
    if not data:
        return None
    recent = data.get("filings", {}).get("recent", {})
    for i, form in enumerate(recent.get("form", [])):
        if form not in ("10-K", "20-F"):
            continue
        return {
            "form_type": form,
            "filing_date": recent["filingDate"][i] if i < len(recent.get("filingDate", [])) else "",
            "accession_number": recent["accessionNumber"][i] if i < len(recent.get("accessionNumber", [])) else "",
            "primary_document": recent["primaryDocument"][i] if i < len(recent.get("primaryDocument", [])) else "",
            "period_of_report": recent["reportDate"][i] if i < len(recent.get("reportDate", [])) else "",
        }
    return None


async def _fetch_text_sections(
    client: httpx.AsyncClient,
    cik_padded: str,
    accession: str,
    primary_doc: str,
    semaphore: asyncio.Semaphore,
) -> tuple[str, str]:
    cik_int = int(cik_padded)
    accession_clean = accession.replace("-", "")
    url = f"https://www.sec.gov/Archives/edgar/data/{cik_int}/{accession_clean}/{primary_doc}"
    async with semaphore:
        await asyncio.sleep(0.13)
        try:
            async with client.stream("GET", url, headers=_HEADERS, timeout=60.0) as r:
                if r.status_code != 200:
                    return "", ""
                chunks: list[bytes] = []
                total = 0
                async for chunk in r.aiter_bytes(65_536):
                    chunks.append(chunk)
                    total += len(chunk)
                    if total >= _STREAM_LIMIT:
                        break
            html = b"".join(chunks).decode("utf-8", errors="replace")
        except Exception:
            return "", ""
    plain = _strip_html(html)
    return (
        _extract_section(plain, "1A", max_chars=3_000, min_chars=2_000),
        _extract_section(plain, "3", max_chars=2_000, min_chars=100),
    )


async def fetch_one(
    client: httpx.AsyncClient,
    ticker: str,
    cik: str,
    semaphore: asyncio.Semaphore,
) -> dict[str, Any]:
    cik_padded = _pad_cik(cik)
    result: dict[str, Any] = {
        "ticker": ticker,
        "cik": cik_padded,
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "error": None,
    }
    meta = await _fetch_10k_meta(client, cik_padded, semaphore)
    if not meta:
        result["error"] = "No 10-K or 20-F found in EDGAR submissions"
        return result

    result.update(meta)

    facts = await _get(
        client,
        f"https://data.sec.gov/api/xbrl/companyfacts/CIK{cik_padded}.json",
        semaphore,
    )
    result["financials"] = _build_financials(facts) if facts else {}

    if meta.get("accession_number") and meta.get("primary_document"):
        risk, legal = await _fetch_text_sections(
            client,
            cik_padded,
            meta["accession_number"],
            meta["primary_document"],
            semaphore,
        )
    else:
        risk, legal = "", ""

    result["risk_factors_excerpt"] = risk
    result["legal_proceedings_excerpt"] = legal
    return result


async def _enrich_xbrl(
    client: httpx.AsyncClient,
    ticker: str,
    cik: str,
    semaphore: asyncio.Semaphore,
) -> tuple[str, bool, str]:
    """Fetch ONLY XBRL companyfacts and patch the existing sec_10k.json."""
    cik_padded = _pad_cik(cik)
    out_path = RAW_DIR / ticker / "sec_10k.json"
    if not out_path.exists():
        return ticker, False, "no existing sec_10k.json"
    try:
        existing = json.loads(out_path.read_text(encoding="utf-8"))
    except Exception as exc:
        return ticker, False, f"read error: {exc}"

    facts = await _get(
        client,
        f"https://data.sec.gov/api/xbrl/companyfacts/CIK{cik_padded}.json",
        semaphore,
    )
    if not facts:
        return ticker, False, "XBRL API returned None"

    financials = _build_financials(facts)
    if not any(v for v in financials.values()):
        return ticker, False, "XBRL returned no usable metrics"

    existing["financials"] = financials
    existing["fetched_at"] = datetime.now(timezone.utc).isoformat()
    out_path.write_text(json.dumps(existing, indent=2, ensure_ascii=False), encoding="utf-8")
    n = sum(1 for v in financials.values() if v)
    return ticker, True, f"{n}/{len(_XBRL_CONCEPTS)} metrics"


async def batch_enrich_xbrl(ticker: str | None = None, sector: str | None = None) -> None:
    """Re-fetch XBRL for companies that currently have empty financials."""
    targets: list[dict] = []
    with open(CSV_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if ticker and row["ticker"] != ticker:
                continue
            if sector and row["sector"] != sector:
                continue
            if not row.get("cik"):
                continue
            existing = RAW_DIR / row["ticker"] / "sec_10k.json"
            if not existing.exists():
                continue
            try:
                data = json.loads(existing.read_text(encoding="utf-8"))
                if any(v for v in data.get("financials", {}).values()):
                    continue  # already has financials
            except Exception:
                pass
            targets.append(row)

    if not targets:
        print("No companies need XBRL enrichment.")
        return

    print(f"Enriching XBRL for {len(targets)} companies...")
    semaphore = asyncio.Semaphore(_CONCURRENCY)
    success = failed = 0

    async def _tagged(client: httpx.AsyncClient, comp: dict) -> tuple[dict, tuple[str, bool, str]]:
        res = await _enrich_xbrl(client, comp["ticker"], comp["cik"], semaphore)
        return comp, res

    async with httpx.AsyncClient(follow_redirects=True) as client:
        futs = [asyncio.ensure_future(_tagged(client, c)) for c in targets]
        for fut in asyncio.as_completed(futs):
            _, (t, ok, msg) = await fut
            status = "OK  " if ok else "WARN"
            print(f"  {status} {t:<6s}  {msg}", flush=True)
            if ok:
                success += 1
            else:
                failed += 1

    print(f"\nDone: {success} enriched, {failed} failed out of {len(targets)}")


def _write_result(comp: dict, result: Any) -> tuple[bool, str]:
    """Write a single fetch result to disk. Returns (ok, status_line)."""
    t = comp["ticker"]
    if isinstance(result, Exception):
        return False, f"  FAIL {t}: {result}"
    out_dir = RAW_DIR / t
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "sec_10k.json").write_text(
        json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    if result.get("error"):
        return False, f"  WARN {t:<6s}: {result['error']}"
    n = sum(1 for v in result.get("financials", {}).values() if v)
    return True, (
        f"  OK   {t:<6s}  {result.get('form_type', '?')} "
        f"{result.get('filing_date', '?')}  {n}/{len(_XBRL_CONCEPTS)} metrics"
    )


async def batch_fetch(
    ticker: str | None = None,
    sector: str | None = None,
    force: bool = False,
) -> None:
    companies: list[dict] = []
    with open(CSV_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if ticker and row["ticker"] != ticker:
                continue
            if sector and row["sector"] != sector:
                continue
            if not row.get("cik"):
                continue
            if not force:
                existing = RAW_DIR / row["ticker"] / "sec_10k.json"
                if existing.exists():
                    try:
                        if not json.loads(existing.read_text(encoding="utf-8")).get("error"):
                            continue
                    except Exception:
                        pass
            companies.append(row)

    if not companies:
        print("No companies to fetch (all done or no match).")
        return

    print(f"Fetching SEC data for {len(companies)} companies...")
    semaphore = asyncio.Semaphore(_CONCURRENCY)
    success = failed = 0

    async def _fetch_tagged(client: httpx.AsyncClient, comp: dict) -> tuple[dict, Any]:
        try:
            result = await fetch_one(client, comp["ticker"], comp["cik"], semaphore)
        except Exception as exc:
            result = exc
        return comp, result

    async with httpx.AsyncClient(follow_redirects=True) as client:
        futs = [asyncio.ensure_future(_fetch_tagged(client, c)) for c in companies]
        for fut in asyncio.as_completed(futs):
            comp, result = await fut
            ok, line = _write_result(comp, result)
            print(line, flush=True)
            if ok:
                success += 1
            else:
                failed += 1

    print(f"\nDone: {success} success, {failed} failed out of {len(companies)}")


def main() -> None:
    import argparse
    p = argparse.ArgumentParser(description="Fetch SEC EDGAR data for S&P 500 companies")
    p.add_argument("--ticker", type=str)
    p.add_argument("--sector", type=str)
    p.add_argument("--force", action="store_true", help="Re-fetch already fetched companies")
    args = p.parse_args()
    asyncio.run(batch_fetch(ticker=args.ticker, sector=args.sector, force=args.force))


if __name__ == "__main__":
    main()
