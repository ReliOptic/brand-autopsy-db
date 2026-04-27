"""
SEC EDGAR fetcher for the Brand Autopsy pipeline.

Pulls authoritative, post-pretraining-cutoff data from SEC EDGAR for the
companies listed in ``data/sp500_list.csv`` and writes the result to
``data/raw/{ticker}/sec_*.json`` so downstream layers (especially Layer 7
Financial Anatomy and Layer 8 Legal Review) can ground their claims in
the most recent T1_OFFICIAL filings.

Outputs per ticker (under ``data/raw/{ticker}/``):
- ``sec_submissions.json``      — raw EDGAR submissions index for the company
- ``sec_company_facts.json``    — XBRL company facts, restricted to a
                                  curated set of headline GAAP concepts
                                  (kept small enough for downstream
                                  prompt assembly)
- ``sec_filings_summary.json``  — project-condensed view: latest 10-K,
                                  10-Q, 8-K filing metadata + headline
                                  financial metrics + ``fetched_at``
                                  timestamp

This module deliberately uses only the Python standard library (matches
``src/crawler/sp500_list.py`` style) so the fetcher can run in any
environment that has Python 3.11+.

SEC EDGAR access policy reference:
    https://www.sec.gov/os/accessing-edgar-data
- A descriptive User-Agent that includes a contact address is required.
- Soft rate limit of 10 requests/second; this fetcher self-throttles at
  ~5 requests/second.
"""

from __future__ import annotations

import csv
import json
import os
import sys
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


DATA_DIR = Path(__file__).parent.parent.parent / "data"
CSV_PATH = DATA_DIR / "sp500_list.csv"
RAW_DIR = DATA_DIR / "raw"

SUBMISSIONS_URL = "https://data.sec.gov/submissions/CIK{cik}.json"
COMPANY_FACTS_URL = "https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json"

DEFAULT_USER_AGENT = (
    "BrandAutopsyDB research-fetcher (contact: ops@brand-autopsy.local)"
)

# Curated headline GAAP concepts kept in sec_company_facts.json.
# Keeping this list explicit prevents the file from ballooning to tens of
# megabytes and keeps the downstream prompt assembly deterministic.
HEADLINE_CONCEPTS: tuple[str, ...] = (
    "Revenues",
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "GrossProfit",
    "OperatingIncomeLoss",
    "NetIncomeLoss",
    "Assets",
    "Liabilities",
    "StockholdersEquity",
    "CashAndCashEquivalentsAtCarryingValue",
    "ResearchAndDevelopmentExpense",
    "EarningsPerShareDiluted",
)

THROTTLE_SECONDS = 0.2  # ~5 requests/second; SEC allows up to 10/sec.


@dataclass
class FetchResult:
    ticker: str
    cik: str | None
    submissions: bool = False
    company_facts: bool = False
    summary: bool = False
    error: str | None = None


def _user_agent() -> str:
    return os.getenv("SEC_USER_AGENT", DEFAULT_USER_AGENT)


def _pad_cik(cik: str) -> str:
    digits = "".join(ch for ch in cik if ch.isdigit())
    if not digits:
        raise ValueError(f"Invalid CIK: {cik!r}")
    return digits.zfill(10)


def _http_get_json(url: str, timeout: int = 30) -> dict[str, Any]:
    req = Request(url, headers={"User-Agent": _user_agent(), "Accept": "application/json"})
    with urlopen(req, timeout=timeout) as resp:
        if resp.status != 200:
            raise RuntimeError(f"HTTP {resp.status} for {url}")
        return json.loads(resp.read().decode("utf-8"))


def fetch_submissions(cik_padded: str) -> dict[str, Any]:
    return _http_get_json(SUBMISSIONS_URL.format(cik=cik_padded))


def fetch_company_facts(cik_padded: str) -> dict[str, Any]:
    return _http_get_json(COMPANY_FACTS_URL.format(cik=cik_padded))


def filter_headline_facts(company_facts: dict[str, Any]) -> dict[str, Any]:
    """Keep only the curated headline GAAP concepts to bound file size."""
    facts = company_facts.get("facts", {})
    us_gaap = facts.get("us-gaap", {})
    kept = {name: us_gaap[name] for name in HEADLINE_CONCEPTS if name in us_gaap}
    return {
        "cik": company_facts.get("cik"),
        "entityName": company_facts.get("entityName"),
        "facts": {"us-gaap": kept},
        "_concepts_retained": list(kept.keys()),
    }


def _latest_filing_metadata(submissions: dict[str, Any], form: str) -> dict[str, Any] | None:
    """Find the most recent filing of ``form`` (e.g. ``10-K``) in submissions."""
    recent = submissions.get("filings", {}).get("recent", {})
    forms = recent.get("form", [])
    accession_numbers = recent.get("accessionNumber", [])
    filing_dates = recent.get("filingDate", [])
    report_dates = recent.get("reportDate", [])
    primary_docs = recent.get("primaryDocument", [])

    cik_int = submissions.get("cik")
    cik_str = str(cik_int) if cik_int is not None else None

    for i, f in enumerate(forms):
        if f != form:
            continue
        accession = accession_numbers[i]
        primary_doc = primary_docs[i] if i < len(primary_docs) else None
        url = None
        if cik_str and primary_doc:
            url = (
                f"https://www.sec.gov/Archives/edgar/data/{int(cik_str)}/"
                f"{accession.replace('-', '')}/{primary_doc}"
            )
        return {
            "form": form,
            "accession_number": accession,
            "filing_date": filing_dates[i] if i < len(filing_dates) else None,
            "report_date": report_dates[i] if i < len(report_dates) else None,
            "primary_document": primary_doc,
            "primary_document_url": url,
        }
    return None


def _headline_metric_latest(headline_facts: dict[str, Any], concept: str) -> dict[str, Any] | None:
    """Return the most recent annual (FY) USD value for a concept, if available."""
    us_gaap = headline_facts.get("facts", {}).get("us-gaap", {})
    concept_data = us_gaap.get(concept)
    if not concept_data:
        return None
    units = concept_data.get("units", {})
    usd = units.get("USD") or units.get("USD/shares")
    if not usd:
        return None
    annual = [row for row in usd if row.get("fp") == "FY" and row.get("form") == "10-K"]
    if not annual:
        annual = [row for row in usd if row.get("form") == "10-K"]
    if not annual:
        annual = list(usd)
    annual.sort(key=lambda r: (r.get("end") or "", r.get("filed") or ""))
    last = annual[-1]
    return {
        "concept": concept,
        "label": concept_data.get("label"),
        "value": last.get("val"),
        "unit": "USD" if "USD" in units else next(iter(units.keys()), None),
        "period_end": last.get("end"),
        "fiscal_year": last.get("fy"),
        "fiscal_period": last.get("fp"),
        "form": last.get("form"),
        "filed": last.get("filed"),
        "accession_number": last.get("accn"),
    }


def build_summary(
    ticker: str,
    company_name: str,
    cik_padded: str,
    submissions: dict[str, Any],
    headline_facts: dict[str, Any],
) -> dict[str, Any]:
    headline_metrics = {}
    for concept in HEADLINE_CONCEPTS:
        latest = _headline_metric_latest(headline_facts, concept)
        if latest:
            headline_metrics[concept] = latest

    return {
        "ticker": ticker,
        "company_name": company_name,
        "cik": cik_padded,
        "entity_name": submissions.get("name") or headline_facts.get("entityName"),
        "sic": submissions.get("sic"),
        "sic_description": submissions.get("sicDescription"),
        "fiscal_year_end": submissions.get("fiscalYearEnd"),
        "tickers": submissions.get("tickers"),
        "exchanges": submissions.get("exchanges"),
        "latest_10k": _latest_filing_metadata(submissions, "10-K"),
        "latest_10q": _latest_filing_metadata(submissions, "10-Q"),
        "latest_8k": _latest_filing_metadata(submissions, "8-K"),
        "latest_def14a": _latest_filing_metadata(submissions, "DEF 14A"),
        "headline_metrics": headline_metrics,
        "source_tier": "T1_OFFICIAL",
        "source_provenance": "direct_edgar",
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "fetcher_version": "0.1.0",
    }


def build_summary_from_manifest(
    ticker: str,
    company_name: str,
    manifest: dict[str, Any],
) -> dict[str, Any]:
    """Build a summary from a thin manifest dict.

    Use this when the operator only has summarized facts (e.g. WebSearch
    snippets, manual extraction) rather than the raw EDGAR JSON. The
    returned summary is force-tagged ``source_tier: T3_SECONDARY_RELIABLE``
    and ``source_provenance: manifest_ingest`` so downstream prompt
    assembly never silently treats it as T1_OFFICIAL.

    Manifest schema (all fields optional unless marked):
        {
          "cik":            "0000320193",        # required
          "entity_name":    "Apple Inc.",
          "sic":            "3571",
          "sic_description": "Electronic Computers",
          "fiscal_year_end":"0928",
          "tickers":        ["AAPL"],
          "exchanges":      ["Nasdaq"],
          "latest_10k": {
              "form": "10-K",
              "accession_number": "0000320193-25-000079",
              "filing_date": "2025-10-31",
              "report_date": "2025-09-27",
              "primary_document": "aapl-20250927.htm",
              "primary_document_url": "https://...",
          },
          "latest_10q": {...}, "latest_8k": {...}, "latest_def14a": {...},
          "headline_metrics": {
              "Revenues": {
                  "value": 416161000000, "unit": "USD",
                  "period_end": "2025-09-27", "fiscal_year": 2025,
                  "fiscal_period": "FY", "form": "10-K",
                  "accession_number": "0000320193-25-000079",
                  "source_url": "https://...",
              },
              ...
          },
          "source_notes": ["WebSearch snippet 2026-04-27: ..."]
        }
    """
    cik = manifest.get("cik")
    if not cik:
        raise ValueError("manifest must include 'cik'")
    cik_padded = _pad_cik(cik)

    return {
        "ticker": ticker,
        "company_name": company_name,
        "cik": cik_padded,
        "entity_name": manifest.get("entity_name"),
        "sic": manifest.get("sic"),
        "sic_description": manifest.get("sic_description"),
        "fiscal_year_end": manifest.get("fiscal_year_end"),
        "tickers": manifest.get("tickers"),
        "exchanges": manifest.get("exchanges"),
        "latest_10k": manifest.get("latest_10k"),
        "latest_10q": manifest.get("latest_10q"),
        "latest_8k": manifest.get("latest_8k"),
        "latest_def14a": manifest.get("latest_def14a"),
        "headline_metrics": manifest.get("headline_metrics", {}),
        "source_tier": "T3_SECONDARY_RELIABLE",
        "source_provenance": "manifest_ingest",
        "source_notes": manifest.get("source_notes", []),
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "fetcher_version": "0.1.0",
        "_provenance_warning": (
            "Source tier is T3_SECONDARY_RELIABLE because this summary was "
            "built from a manifest (WebSearch snippets or manual extraction), "
            "not the raw EDGAR endpoint. All values must be re-verified "
            "against the primary_document_url before use in published "
            "analysis under LEGAL_RISK_WRITING_POLICY.md."
        ),
    }


def _write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)


def fetch_one(
    ticker: str,
    company_name: str,
    cik: str | None,
    *,
    force: bool = False,
    skip_facts: bool = False,
) -> FetchResult:
    """Fetch SEC artifacts for a single ticker.

    The function is intentionally tolerant: any sub-step failure is captured
    on the returned ``FetchResult`` rather than raised, so a batch run can
    keep going even when an individual ticker has no CIK or hits a 404.
    """
    out_dir = RAW_DIR / ticker
    submissions_path = out_dir / "sec_submissions.json"
    facts_path = out_dir / "sec_company_facts.json"
    summary_path = out_dir / "sec_filings_summary.json"

    if not force and summary_path.exists():
        return FetchResult(ticker=ticker, cik=cik, submissions=True, company_facts=True, summary=True)

    if not cik:
        return FetchResult(ticker=ticker, cik=None, error="missing CIK in sp500_list.csv")

    try:
        cik_padded = _pad_cik(cik)
    except ValueError as exc:
        return FetchResult(ticker=ticker, cik=cik, error=str(exc))

    result = FetchResult(ticker=ticker, cik=cik_padded)

    try:
        submissions = fetch_submissions(cik_padded)
        _write_json(submissions_path, submissions)
        result.submissions = True
    except (HTTPError, URLError, RuntimeError, TimeoutError) as exc:
        result.error = f"submissions fetch failed: {exc}"
        return result

    time.sleep(THROTTLE_SECONDS)

    headline_facts: dict[str, Any] = {"facts": {"us-gaap": {}}}
    if not skip_facts:
        try:
            company_facts = fetch_company_facts(cik_padded)
            headline_facts = filter_headline_facts(company_facts)
            _write_json(facts_path, headline_facts)
            result.company_facts = True
        except HTTPError as exc:
            # Some entities (e.g. recent IPOs, foreign private issuers) have no
            # XBRL company-facts endpoint yet. That should not abort the run.
            if exc.code == 404:
                result.error = "company_facts: 404 (no XBRL facts published)"
            else:
                result.error = f"company_facts fetch failed: HTTP {exc.code}"
        except (URLError, RuntimeError, TimeoutError) as exc:
            result.error = f"company_facts fetch failed: {exc}"

        time.sleep(THROTTLE_SECONDS)

    summary = build_summary(ticker, company_name, cik_padded, submissions, headline_facts)
    _write_json(summary_path, summary)
    result.summary = True
    return result


def ingest_local(
    ticker: str,
    company_name: str,
    inbox_dir: Path,
    *,
    force: bool = False,
) -> FetchResult:
    """Build SEC artifacts from pre-fetched files dropped into ``inbox_dir``.

    This is the bypass for environments where outbound HTTPS to SEC EDGAR
    is blocked. The operator (or another agent step) places files into
    ``{inbox_dir}/{ticker}/`` and this function produces the same outputs
    as ``fetch_one`` would have — but tagged with the right provenance.

    Recognized inputs (under ``{inbox_dir}/{ticker}/``):
    - ``submissions.json`` and ``company_facts.json``  → T1_OFFICIAL
      (raw EDGAR responses copied verbatim from a network-enabled host)
    - ``manifest.json``                                → T3_SECONDARY_RELIABLE
      (thin manifest produced from WebSearch snippets or manual notes;
       see ``build_summary_from_manifest`` for the schema)

    Manifest mode is mutually exclusive with raw mode for a given ticker.
    Raw mode wins if both are present.
    """
    src_dir = inbox_dir / ticker
    if not src_dir.exists():
        return FetchResult(ticker=ticker, cik=None, error=f"inbox not found: {src_dir}")

    out_dir = RAW_DIR / ticker
    submissions_path = out_dir / "sec_submissions.json"
    facts_path = out_dir / "sec_company_facts.json"
    summary_path = out_dir / "sec_filings_summary.json"

    if not force and summary_path.exists():
        return FetchResult(
            ticker=ticker, cik=None, submissions=True, company_facts=True, summary=True
        )

    raw_subs = src_dir / "submissions.json"
    raw_facts = src_dir / "company_facts.json"
    manifest_path = src_dir / "manifest.json"

    if raw_subs.exists():
        with open(raw_subs, encoding="utf-8") as f:
            submissions = json.load(f)
        cik_padded = _pad_cik(str(submissions.get("cik", "")))
        _write_json(submissions_path, submissions)

        headline_facts: dict[str, Any] = {"facts": {"us-gaap": {}}}
        if raw_facts.exists():
            with open(raw_facts, encoding="utf-8") as f:
                company_facts = json.load(f)
            headline_facts = filter_headline_facts(company_facts)
            _write_json(facts_path, headline_facts)

        summary = build_summary(ticker, company_name, cik_padded, submissions, headline_facts)
        summary["source_provenance"] = "local_ingest_edgar"
        _write_json(summary_path, summary)
        return FetchResult(
            ticker=ticker,
            cik=cik_padded,
            submissions=True,
            company_facts=raw_facts.exists(),
            summary=True,
        )

    if manifest_path.exists():
        with open(manifest_path, encoding="utf-8") as f:
            manifest = json.load(f)
        summary = build_summary_from_manifest(ticker, company_name, manifest)
        _write_json(summary_path, summary)
        return FetchResult(
            ticker=ticker,
            cik=summary["cik"],
            submissions=False,
            company_facts=False,
            summary=True,
        )

    return FetchResult(
        ticker=ticker,
        cik=None,
        error=(
            f"no recognized inputs in {src_dir} (expected submissions.json + "
            "company_facts.json, or manifest.json)"
        ),
    )


def ingest_batch(
    inbox_dir: Path,
    *,
    ticker: str | None = None,
    force: bool = False,
) -> dict[str, Any]:
    """Run ``ingest_local`` for one ticker or every ticker subdir in inbox."""
    if not inbox_dir.exists():
        print(f"Inbox does not exist: {inbox_dir}")
        return {"success": 0, "failed": 0, "results": []}

    name_by_ticker: dict[str, str] = {}
    with open(CSV_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            name_by_ticker[row["ticker"]] = row["name"]

    if ticker:
        tickers = [ticker]
    else:
        tickers = sorted(p.name for p in inbox_dir.iterdir() if p.is_dir())

    if not tickers:
        print(f"No ticker subdirectories under {inbox_dir}")
        return {"success": 0, "failed": 0, "results": []}

    print(f"Ingesting SEC data from {inbox_dir} for {len(tickers)} ticker(s)")
    success = 0
    failed = 0
    results: list[FetchResult] = []
    for t in tickers:
        company_name = name_by_ticker.get(t, t)
        result = ingest_local(t, company_name, inbox_dir, force=force)
        results.append(result)
        if result.error:
            failed += 1
            print(f"  FAIL {t}: {result.error}")
        else:
            success += 1
            print(f"  OK   {t} (summary written)")

    print(f"\nDone: {success} ingested, {failed} failed out of {len(tickers)}")
    return {
        "success": success,
        "failed": failed,
        "results": [r.__dict__ for r in results],
    }


def _load_targets(
    ticker: str | None,
    sector: str | None,
    limit: int | None,
) -> list[dict[str, str]]:
    targets: list[dict[str, str]] = []
    with open(CSV_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if ticker and row["ticker"] != ticker:
                continue
            if sector and row["sector"] != sector:
                continue
            targets.append(row)
    if limit:
        targets = targets[:limit]
    return targets


def fetch_batch(
    *,
    ticker: str | None = None,
    sector: str | None = None,
    limit: int | None = None,
    force: bool = False,
    skip_facts: bool = False,
) -> dict[str, Any]:
    targets = _load_targets(ticker, sector, limit)
    if not targets:
        print("No targets matched filter.")
        return {"success": 0, "failed": 0, "skipped": 0, "results": []}

    print(f"Fetching SEC data for {len(targets)} companies (force={force}, skip_facts={skip_facts})")
    print(f"User-Agent: {_user_agent()}")

    success = 0
    failed = 0
    skipped = 0
    results: list[FetchResult] = []
    for i, comp in enumerate(targets, 1):
        ticker_i = comp["ticker"]
        result = fetch_one(
            ticker_i,
            comp["name"],
            comp.get("cik"),
            force=force,
            skip_facts=skip_facts,
        )
        results.append(result)

        if result.error:
            failed += 1
            print(f"  [{i:3d}/{len(targets)}] FAIL {ticker_i}: {result.error}")
        elif result.summary and not (result.submissions and (skip_facts or result.company_facts)):
            skipped += 1
            print(f"  [{i:3d}/{len(targets)}] SKIP {ticker_i} (cached)")
        else:
            success += 1
            print(f"  [{i:3d}/{len(targets)}] OK   {ticker_i} CIK={result.cik}")

        time.sleep(THROTTLE_SECONDS)

    print(f"\nDone: {success} fetched, {failed} failed, {skipped} cached out of {len(targets)}")
    return {
        "success": success,
        "failed": failed,
        "skipped": skipped,
        "results": [r.__dict__ for r in results],
    }


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="SEC EDGAR fetcher for Brand Autopsy")
    parser.add_argument("--ticker", type=str, help="Fetch a single ticker")
    parser.add_argument("--sector", type=str, help="Fetch all tickers in a sector")
    parser.add_argument("--all", action="store_true", help="Fetch all S&P 500 tickers")
    parser.add_argument("--limit", type=int, help="Limit number of tickers")
    parser.add_argument("--force", action="store_true", help="Re-fetch even if cached")
    parser.add_argument(
        "--skip-facts",
        action="store_true",
        help="Skip XBRL company-facts download (submissions + summary only)",
    )
    parser.add_argument(
        "--ingest",
        type=str,
        metavar="INBOX_DIR",
        help=(
            "Bypass network: ingest pre-fetched files from INBOX_DIR/{ticker}/ "
            "(submissions.json+company_facts.json for T1, or manifest.json for T3)"
        ),
    )
    args = parser.parse_args()

    if args.ingest:
        ingest_batch(Path(args.ingest), ticker=args.ticker, force=args.force)
        return

    if not (args.ticker or args.sector or args.all):
        parser.error("specify --ticker, --sector, --all, or --ingest")

    fetch_batch(
        ticker=args.ticker,
        sector=args.sector,
        limit=args.limit,
        force=args.force,
        skip_facts=args.skip_facts,
    )


if __name__ == "__main__":
    main()
    sys.exit(0)
