"""
SEC EDGAR fetcher for the Brand Autopsy DB project.

Pulls the canonical SEC `companyfacts` and `submissions` JSON for a given CIK,
caches the raw payload, and emits a normalized fiscal-period summary that
Layer 7 (Financial Anatomy) regeneration can consume directly.

SEC API endpoints used:
- https://data.sec.gov/api/xbrl/companyfacts/CIK{cik10}.json
- https://data.sec.gov/submissions/CIK{cik10}.json

SEC fair-access policy:
- A descriptive User-Agent header is required.
- Maximum 10 requests/second across the host.
"""

from __future__ import annotations

import json
import os
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import httpx

DATA_DIR = Path(__file__).parent.parent.parent / "data"
RAW_DIR = DATA_DIR / "raw"

SEC_HOST = "https://data.sec.gov"
DEFAULT_USER_AGENT = os.getenv(
    "SEC_USER_AGENT",
    "Brand Autopsy DB research@brand-autopsy-db.local",
)
RATE_LIMIT_INTERVAL = 0.12  # ~8 req/s, under the 10 req/s SEC ceiling

# Canonical XBRL concepts (us-gaap) used for Layer 7 narrative.
CANONICAL_CONCEPTS: dict[str, list[str]] = {
    "Revenues": ["Revenues", "RevenueFromContractWithCustomerExcludingAssessedTax", "SalesRevenueNet"],
    "GrossProfit": ["GrossProfit"],
    "OperatingIncomeLoss": ["OperatingIncomeLoss"],
    "NetIncomeLoss": ["NetIncomeLoss"],
    "ResearchAndDevelopmentExpense": ["ResearchAndDevelopmentExpense"],
    "SellingGeneralAndAdministrativeExpense": [
        "SellingGeneralAndAdministrativeExpense",
        "GeneralAndAdministrativeExpense",
    ],
    "Assets": ["Assets"],
    "Liabilities": ["Liabilities"],
    "StockholdersEquity": ["StockholdersEquity"],
    "CashAndCashEquivalentsAtCarryingValue": [
        "CashAndCashEquivalentsAtCarryingValue",
        "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents",
    ],
    "LongTermDebtNoncurrent": ["LongTermDebtNoncurrent", "LongTermDebt"],
    "PaymentsForRepurchaseOfCommonStock": ["PaymentsForRepurchaseOfCommonStock"],
    "PaymentsOfDividends": ["PaymentsOfDividends", "PaymentsOfDividendsCommonStock"],
    "NetCashProvidedByUsedInOperatingActivities": [
        "NetCashProvidedByUsedInOperatingActivities"
    ],
    "PaymentsToAcquirePropertyPlantAndEquipment": [
        "PaymentsToAcquirePropertyPlantAndEquipment"
    ],
}

# Most recent N fiscal years to extract from companyfacts.
DEFAULT_YEARS = 5


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------


@dataclass
class FiscalDatum:
    fy: int
    fp: str  # "FY" | "Q1" | "Q2" | "Q3"
    end: str  # ISO date YYYY-MM-DD
    value: float
    accn: str
    form: str  # "10-K" | "10-Q"
    unit: str  # e.g. "USD"


@dataclass
class FilingRef:
    accession: str
    form: str
    filed: str
    period_of_report: str
    primary_document: str
    primary_document_url: str


@dataclass
class CompanySnapshot:
    cik: str
    ticker: str
    entity_name: str
    fiscal_year_end: str | None
    facts: dict[str, list[FiscalDatum]] = field(default_factory=dict)
    recent_filings: list[FilingRef] = field(default_factory=list)


# ---------------------------------------------------------------------------
# HTTP layer with rate limiting
# ---------------------------------------------------------------------------


_LAST_REQUEST_TS: float = 0.0


def _throttle() -> None:
    global _LAST_REQUEST_TS
    delta = time.monotonic() - _LAST_REQUEST_TS
    if delta < RATE_LIMIT_INTERVAL:
        time.sleep(RATE_LIMIT_INTERVAL - delta)
    _LAST_REQUEST_TS = time.monotonic()


def _get_json(client: httpx.Client, url: str) -> dict[str, Any]:
    _throttle()
    resp = client.get(url, timeout=30.0)
    resp.raise_for_status()
    return resp.json()


def _build_client() -> httpx.Client:
    return httpx.Client(
        headers={
            "User-Agent": DEFAULT_USER_AGENT,
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate",
        },
        follow_redirects=True,
    )


# ---------------------------------------------------------------------------
# Cache helpers
# ---------------------------------------------------------------------------


def _cache_paths(ticker: str) -> tuple[Path, Path, Path]:
    base = RAW_DIR / ticker.upper()
    base.mkdir(parents=True, exist_ok=True)
    return (
        base / "sec_companyfacts.json",
        base / "sec_submissions.json",
        base / "sec_summary.json",
    )


def _zero_pad_cik(cik: str | int) -> str:
    return str(cik).strip().lstrip("0").zfill(10)


# ---------------------------------------------------------------------------
# Extraction
# ---------------------------------------------------------------------------


def _pick_concept_series(
    facts_root: dict[str, Any], concept_aliases: list[str]
) -> tuple[str, list[dict[str, Any]]] | None:
    """Find the first available us-gaap concept among aliases; return USD series."""
    us_gaap = facts_root.get("facts", {}).get("us-gaap", {})
    for name in concept_aliases:
        node = us_gaap.get(name)
        if not node:
            continue
        units = node.get("units", {})
        for unit_key, series in units.items():
            if unit_key.startswith("USD"):
                return name, series
    return None


def _normalize_series(
    series: list[dict[str, Any]], unit: str = "USD"
) -> list[FiscalDatum]:
    out: list[FiscalDatum] = []
    seen_keys: set[tuple[int, str]] = set()
    for entry in series:
        fp = entry.get("fp")
        fy = entry.get("fy")
        end = entry.get("end")
        val = entry.get("val")
        accn = entry.get("accn", "")
        form = entry.get("form", "")
        if fp is None or fy is None or end is None or val is None:
            continue
        if form not in ("10-K", "10-K/A", "10-Q", "10-Q/A", "20-F"):
            continue
        key = (int(fy), fp)
        if key in seen_keys:
            continue
        seen_keys.add(key)
        out.append(
            FiscalDatum(
                fy=int(fy),
                fp=str(fp),
                end=str(end),
                value=float(val),
                accn=str(accn),
                form=str(form),
                unit=unit,
            )
        )
    out.sort(key=lambda d: (d.fy, {"Q1": 1, "Q2": 2, "Q3": 3, "FY": 4}.get(d.fp, 9)))
    return out


def _recent_filings(submissions: dict[str, Any], limit: int = 12) -> list[FilingRef]:
    recent = submissions.get("filings", {}).get("recent", {})
    forms = recent.get("form", [])
    accns = recent.get("accessionNumber", [])
    filed = recent.get("filingDate", [])
    pors = recent.get("periodOfReport", [])
    docs = recent.get("primaryDocument", [])
    cik = submissions.get("cik", "")

    keep = {"10-K", "10-K/A", "10-Q", "10-Q/A", "20-F", "DEF 14A", "8-K"}
    out: list[FilingRef] = []
    for i, form in enumerate(forms):
        if form not in keep:
            continue
        accession = accns[i]
        accn_no_dash = accession.replace("-", "")
        primary = docs[i] if i < len(docs) else ""
        url = (
            f"https://www.sec.gov/Archives/edgar/data/{int(cik)}/"
            f"{accn_no_dash}/{primary}"
        )
        out.append(
            FilingRef(
                accession=accession,
                form=form,
                filed=filed[i],
                period_of_report=pors[i] if i < len(pors) else "",
                primary_document=primary,
                primary_document_url=url,
            )
        )
        if len(out) >= limit:
            break
    return out


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------


def fetch_company(
    cik: str | int,
    ticker: str,
    *,
    use_cache: bool = True,
    years: int = DEFAULT_YEARS,
) -> CompanySnapshot:
    """Fetch (or load cached) SEC data for a single company."""
    cik10 = _zero_pad_cik(cik)
    facts_path, subs_path, summary_path = _cache_paths(ticker)

    facts_payload: dict[str, Any] | None = None
    subs_payload: dict[str, Any] | None = None

    if use_cache and facts_path.exists() and subs_path.exists():
        facts_payload = json.loads(facts_path.read_text(encoding="utf-8"))
        subs_payload = json.loads(subs_path.read_text(encoding="utf-8"))

    if facts_payload is None or subs_payload is None:
        with _build_client() as client:
            facts_payload = _get_json(
                client, f"{SEC_HOST}/api/xbrl/companyfacts/CIK{cik10}.json"
            )
            subs_payload = _get_json(
                client, f"{SEC_HOST}/submissions/CIK{cik10}.json"
            )
        facts_path.write_text(json.dumps(facts_payload), encoding="utf-8")
        subs_path.write_text(json.dumps(subs_payload), encoding="utf-8")

    snapshot = CompanySnapshot(
        cik=cik10,
        ticker=ticker.upper(),
        entity_name=facts_payload.get("entityName", ticker.upper()),
        fiscal_year_end=subs_payload.get("fiscalYearEnd"),
    )

    cutoff_year = max(
        (int(y) for y in [subs_payload.get("filings", {}).get("recent", {}).get("filingDate", [""])[0][:4] or 0]),
        default=0,
    ) - years

    for label, aliases in CANONICAL_CONCEPTS.items():
        picked = _pick_concept_series(facts_payload, aliases)
        if picked is None:
            continue
        _, series = picked
        normalized = _normalize_series(series)
        if cutoff_year > 0:
            normalized = [d for d in normalized if d.fy >= cutoff_year]
        snapshot.facts[label] = normalized

    snapshot.recent_filings = _recent_filings(subs_payload)

    summary = {
        "cik": snapshot.cik,
        "ticker": snapshot.ticker,
        "entity_name": snapshot.entity_name,
        "fiscal_year_end": snapshot.fiscal_year_end,
        "facts": {
            label: [d.__dict__ for d in data]
            for label, data in snapshot.facts.items()
        },
        "recent_filings": [f.__dict__ for f in snapshot.recent_filings],
    }
    summary_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return snapshot


def fetch_many(
    targets: list[tuple[str, str | int]],
    *,
    use_cache: bool = True,
    years: int = DEFAULT_YEARS,
) -> dict[str, CompanySnapshot]:
    """Fetch SEC data for a list of (ticker, cik) pairs."""
    out: dict[str, CompanySnapshot] = {}
    for ticker, cik in targets:
        try:
            out[ticker] = fetch_company(cik, ticker, use_cache=use_cache, years=years)
        except httpx.HTTPStatusError as exc:
            print(f"[{ticker}] HTTP {exc.response.status_code} from SEC: {exc.request.url}")
        except httpx.HTTPError as exc:
            print(f"[{ticker}] network error: {exc}")
    return out


def latest_fy(snapshot: CompanySnapshot) -> FiscalDatum | None:
    """Return the latest FY revenue datum, useful for narrative anchoring."""
    series = snapshot.facts.get("Revenues") or []
    fy_only = [d for d in series if d.fp == "FY"]
    if not fy_only:
        return None
    return max(fy_only, key=lambda d: (d.fy, d.end))


__all__ = [
    "CompanySnapshot",
    "FiscalDatum",
    "FilingRef",
    "fetch_company",
    "fetch_many",
    "latest_fy",
    "CANONICAL_CONCEPTS",
]
