"""
Programmatic Layer 07 (Financial Anatomy) generator.

Generates Layer 07 directly from XBRL data without LLM.
Financial tables are 100% sourced from SEC EDGAR XBRL API.
Narrative sections use sector-aware templates.

Usage:
  python -m src.analyzer.generate_layer7 --ticker AAPL
  python -m src.analyzer.generate_layer7 --all
  python -m src.analyzer.generate_layer7 --placeholder-only
"""

from __future__ import annotations

import csv
import json
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent.parent / "data"
BRANDS_DIR = DATA_DIR / "brands"
RAW_DIR = DATA_DIR / "raw"
CSV_PATH = DATA_DIR / "sp500_list.csv"

PLACEHOLDER_PATTERN = "available in the company"

_DISCLAIMER = """> **DISCLAIMER**: This document is prepared for brand strategy analysis purposes only. It does not
> constitute investment advice, financial guidance, or legal counsel. All financial figures are
> sourced from the company's SEC filings (10-K, 10-Q, DEF 14A) and official Investor Relations
> disclosures unless explicitly marked "(estimated)". Source tier codes follow the project's
> T1–T5 classification system defined in CLAUDE.md."""


def _fmt_billions(val: int | float) -> str:
    b = val / 1_000_000_000
    return f"${b:,.1f}B"


def _fmt_millions(val: int | float) -> str:
    m = val / 1_000_000
    return f"${m:,.0f}M"


def _fmt_value(val: int | float, unit: str) -> str:
    if unit == "USD":
        if abs(val) >= 1_000_000_000:
            return _fmt_billions(val)
        return _fmt_millions(val)
    return f"{val:,.2f}"


def _yoy(curr: float, prev: float) -> str:
    if prev == 0:
        return "N/A"
    pct = (curr - prev) / abs(prev) * 100
    sign = "+" if pct >= 0 else ""
    return f"{sign}{pct:.1f}%"


def _revenue_table(entries: list[dict]) -> str:
    if not entries:
        return "_XBRL revenue data not available for this company._"
    rows = ["| Fiscal Year | Revenue | YoY Change | Source |",
            "|-------------|---------|------------|--------|"]
    for i, e in enumerate(entries):
        yr = e["year"]
        val = _fmt_value(e["value"], e["unit"])
        prev_val = entries[i + 1]["value"] if i + 1 < len(entries) else None
        yoy = _yoy(e["value"], prev_val) if prev_val else "—"
        rows.append(f"| FY{yr} | {val} | {yoy} | (SEC 10-K FY{yr}) |")
    return "\n".join(rows)


def _margin_table(financials: dict[str, list[dict]], entries_count: int = 3) -> str:
    rev = financials.get("revenue", [])
    gross = financials.get("gross_profit", [])
    op_inc = financials.get("operating_income", [])
    net_inc = financials.get("net_income", [])

    if not rev:
        return "_Margin data requires revenue XBRL figures; not available for this company._"

    # Build year-keyed dicts
    rev_map = {e["year"]: e["value"] for e in rev}
    gross_map = {e["year"]: e["value"] for e in gross}
    op_map = {e["year"]: e["value"] for e in op_inc}
    net_map = {e["year"]: e["value"] for e in net_inc}

    years = sorted(rev_map.keys(), reverse=True)[:entries_count]
    rows = ["| Metric | " + " | ".join(f"FY{y}" for y in years) + " | Source |",
            "|--------|" + "|".join("------" for _ in years) + "|--------|"]

    def margin_row(label: str, num_map: dict) -> str:
        cells = []
        for y in years:
            r = rev_map.get(y)
            n = num_map.get(y)
            if r and n and r != 0:
                cells.append(f"{n/r*100:.1f}%")
            else:
                cells.append("N/A")
        return f"| {label} | " + " | ".join(cells) + " | (SEC 10-K) |"

    if gross_map:
        rows.append(margin_row("Gross Margin", gross_map))
    if op_map:
        rows.append(margin_row("Operating Margin", op_map))
    if net_map:
        rows.append(margin_row("Net Margin", net_map))
    return "\n".join(rows)


def _balance_sheet_table(financials: dict[str, list[dict]]) -> str:
    assets = financials.get("total_assets", [])
    cash = financials.get("cash", [])
    debt = financials.get("long_term_debt", [])
    equity = financials.get("shareholders_equity", [])

    has_any = any([assets, cash, debt, equity])
    if not has_any:
        return "_Balance sheet XBRL data not available for this company._"

    rows = ["| Item | Value | Source |", "|------|-------|--------|"]
    for label, group in [("Total Assets", assets), ("Cash & Equivalents", cash),
                          ("Long-Term Debt", debt), ("Shareholders' Equity", equity)]:
        if group:
            yr_data = max(group, key=lambda e: e["year"])
            rows.append(f"| {label} | {_fmt_value(yr_data['value'], yr_data['unit'])} | (SEC 10-K FY{yr_data['year']}) |")
    return "\n".join(rows)


def _investment_table(financials: dict[str, list[dict]]) -> str:
    rd = financials.get("rd_expense", [])
    sga = financials.get("sga_expense", [])
    capex = financials.get("capex", [])
    rev = financials.get("revenue", [])
    rev_map = {e["year"]: e["value"] for e in rev}

    lines = []
    if rd:
        lines.append("**R&D Spending**\n")
        lines.append("| Fiscal Year | R&D | % of Revenue | Source |")
        lines.append("|-------------|-----|-------------|--------|")
        for e in rd[:4]:
            pct = f"{e['value']/rev_map[e['year']]*100:.1f}%" if e["year"] in rev_map and rev_map[e["year"]] else "N/A"
            lines.append(f"| FY{e['year']} | {_fmt_value(e['value'], e['unit'])} | {pct} | (SEC 10-K FY{e['year']}) |")
        lines.append("")

    if sga:
        lines.append("**SG&A Spending**\n")
        lines.append("| Fiscal Year | SG&A | % of Revenue | Source |")
        lines.append("|-------------|------|-------------|--------|")
        for e in sga[:4]:
            pct = f"{e['value']/rev_map[e['year']]*100:.1f}%" if e["year"] in rev_map and rev_map[e["year"]] else "N/A"
            lines.append(f"| FY{e['year']} | {_fmt_value(e['value'], e['unit'])} | {pct} | (SEC 10-K FY{e['year']}) |")
        lines.append("")

    if capex:
        lines.append("**Capital Expenditure**\n")
        lines.append("| Fiscal Year | CapEx | Source |")
        lines.append("|-------------|-------|--------|")
        for e in capex[:3]:
            lines.append(f"| FY{e['year']} | {_fmt_value(e['value'], e['unit'])} | (SEC 10-K FY{e['year']}) |")

    return "\n".join(lines) if lines else "_Investment data not separately disclosed in EDGAR XBRL._"


def _capital_allocation_table(financials: dict[str, list[dict]]) -> str:
    buybacks = financials.get("share_repurchases", [])
    dividends = financials.get("dividends_paid", [])

    lines = []
    if buybacks or dividends:
        years = sorted(set(
            [e["year"] for e in buybacks[:3]] + [e["year"] for e in dividends[:3]]
        ), reverse=True)[:3]
        buy_map = {e["year"]: e["value"] for e in buybacks}
        div_map = {e["year"]: e["value"] for e in dividends}

        lines.append("| Item | " + " | ".join(f"FY{y}" for y in years) + " | Source |")
        lines.append("|------|" + "|".join("------" for _ in years) + "|--------|")
        if buybacks:
            cells = [_fmt_value(abs(buy_map[y]), "USD") if y in buy_map else "N/A" for y in years]
            lines.append("| Share Buybacks | " + " | ".join(cells) + " | (SEC 10-K) |")
        if dividends:
            cells = [_fmt_value(abs(div_map[y]), "USD") if y in div_map else "N/A" for y in years]
            lines.append("| Dividends Paid | " + " | ".join(cells) + " | (SEC 10-K) |")
    else:
        lines.append("_Share repurchase and dividend data not available in EDGAR XBRL._")

    return "\n".join(lines)


def _eps_trend(financials: dict[str, list[dict]]) -> str:
    eps = financials.get("eps_diluted", [])
    if not eps:
        return "_EPS data not available in EDGAR XBRL._"
    rows = ["| Fiscal Year | Diluted EPS | Source |",
            "|-------------|------------|--------|"]
    for e in eps[:5]:
        val = f"${e['value']:.2f}" if isinstance(e["value"], (int, float)) else str(e["value"])
        rows.append(f"| FY{e['year']} | {val} | (SEC 10-K FY{e['year']}) |")
    return "\n".join(rows)


def _risks_section(risk_excerpt: str) -> str:
    if not risk_excerpt or len(risk_excerpt.strip()) < 100:
        return "_Risk factors excerpt not available. See Item 1A of the company's 10-K filing on EDGAR._"
    quoted = "\n> ".join(risk_excerpt[:2500].strip().split("\n"))
    return f"The following is an excerpt from Item 1A (Risk Factors) of the company's most recent 10-K filing (T1_OFFICIAL):\n\n> {quoted}\n\n> *(Excerpt continues — see full filing on EDGAR for complete risk factors)*"


def generate_layer7_content(
    ticker: str,
    company_name: str,
    sector: str,
    industry: str,
    sec: dict,
) -> str:
    cik = sec.get("cik", "")
    filing_date = sec.get("filing_date", "")
    period = sec.get("period_of_report", "")
    form_type = sec.get("form_type", "10-K")
    accession_fmt = sec.get("accession_number", "")
    financials = sec.get("financials", {})
    risk_text = sec.get("risk_factors_excerpt", "")
    legal_text = sec.get("legal_proceedings_excerpt", "")

    cik_int = str(int(cik)) if cik else ticker
    edgar_base = f"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type"

    rev_entries = financials.get("revenue", [])
    latest_fy = rev_entries[0]["year"] if rev_entries else (filing_date[:4] if filing_date else "N/A")

    content = f"""# 07. Financial Anatomy — {company_name} ({ticker})

{_DISCLAIMER}

---

## 1. Filing Source Links

| Document | Fiscal Year | Direct Link |
|----------|-------------|-------------|
| 10-K (Annual Report) | FY{latest_fy} | [SEC EDGAR — {ticker} 10-K]({edgar_base}=10-K&dateb=&owner=include&count=10) |
| 10-Q (Quarterly Report) | Latest | [SEC EDGAR — {ticker} 10-Q]({edgar_base}=10-Q&dateb=&owner=include&count=10) |
| DEF 14A (Proxy Statement) | FY{latest_fy} | [SEC EDGAR — {ticker} DEF 14A]({edgar_base}=DEF+14A&dateb=&owner=include&count=10) |
| 8-K (Material Events) | Rolling | [SEC EDGAR — {ticker} 8-K]({edgar_base}=8-K&dateb=&owner=include&count=20) |

**CIK**: {cik}
**Period**: {period} | **Filed**: {filing_date} | **Form**: {form_type}
**Accession**: {accession_fmt}

---

## 2. Revenue Anatomy

### 2.1 Revenue Trend (XBRL — T1_OFFICIAL)

{_revenue_table(rev_entries)}

> **Source**: SEC EDGAR XBRL companyfacts API — [CIK {cik}]({edgar_base}=10-K&dateb=&owner=include&count=10)

### 2.2 Revenue Context

Based on public SEC filings, {company_name} operates in the **{industry}** segment within the **{sector}** sector. Revenue composition details, including segment and geographic breakdowns, are disclosed in the company's 10-K filing under Notes to Financial Statements (T1_OFFICIAL). Refer to the EDGAR filing linked above for the most current segment disclosure.

---

## 3. Profitability Anatomy

### 3.1 Margin Structure (XBRL — T1_OFFICIAL)

{_margin_table(financials)}

> **Source**: Derived from XBRL gross_profit, operating_income, net_income, and revenue figures — SEC 10-K (T1_OFFICIAL).

### 3.2 EPS Trend

{_eps_trend(financials)}

---

## 4. Investment Structure

{_investment_table(financials)}

> **Note**: R&D and SG&A figures are sourced from EDGAR XBRL. If a metric shows N/A, the company may report it under a different XBRL tag or disclose it as a combined line item.

---

## 5. Capital Allocation

{_capital_allocation_table(financials)}

> **Source**: SEC 10-K — Consolidated Statements of Cash Flows (T1_OFFICIAL). Negative values per GAAP convention are presented as absolute values above.

---

## 6. Balance Sheet Highlights (Latest FY)

{_balance_sheet_table(financials)}

> **Source**: SEC 10-K — Consolidated Balance Sheets (T1_OFFICIAL).

---

## 7. Financial Risk Factors

### From SEC 10-K Item 1A (T1_OFFICIAL)

{_risks_section(risk_text)}

---

## 8. Legal Proceedings Summary

### From SEC 10-K Item 3 (T1_OFFICIAL)

"""
    if legal_text and len(legal_text.strip()) > 50:
        quoted_legal = "\n> ".join(legal_text[:1500].strip().split("\n"))
        content += f"> {quoted_legal}\n\n"
    else:
        content += "_Legal proceedings excerpt not available. See Item 3 of the company's 10-K filing on EDGAR._\n\n"

    content += """
---

## 9. Brand-Finance Nexus

### 9.1 Financial Signal → Brand Strategy Interpretation

| Financial Signal | Observed Data | Brand Strategy Implication |
|-----------------|---------------|---------------------------|
"""
    # Add signals based on available XBRL data
    rev_entries_local = financials.get("revenue", [])
    if len(rev_entries_local) >= 2:
        latest = rev_entries_local[0]
        prev = rev_entries_local[1]
        yoy = _yoy(latest["value"], prev["value"])
        content += f"| Revenue Trend | {yoy} YoY (FY{latest['year']}) | {'Growth momentum supports brand investment' if latest['value'] > prev['value'] else 'Revenue contraction may signal brand strategy re-evaluation'} |\n"

    net = financials.get("net_income", [])
    if net:
        n = net[0]
        content += f"| Net Income (FY{n['year']}) | {_fmt_value(n['value'], n['unit'])} | {'Positive net income provides headroom for brand and marketing investment' if n['value'] > 0 else 'Net loss environment limits discretionary brand spend'} |\n"

    rd = financials.get("rd_expense", [])
    rev_map = {e["year"]: e["value"] for e in rev_entries_local}
    if rd and rd[0]["year"] in rev_map and rev_map[rd[0]["year"]]:
        rd_pct = rd[0]["value"] / rev_map[rd[0]["year"]] * 100
        content += f"| R&D Intensity (FY{rd[0]['year']}) | {rd_pct:.1f}% of revenue | {'High R&D ratio indicates innovation-led brand positioning' if rd_pct > 10 else 'Moderate/low R&D ratio suggests brand competes on non-technology dimensions'} |\n"

    content += f"""
> **Note**: Financial-to-brand inferences above are T4_INFERRED interpretations based on publicly available financial data. They represent analytical observations, not statements of company strategy or intent.

---

## EDGAR Quick Reference

1. **All {ticker} Filings**: [{edgar_base}=10-K&dateb=&owner=include&count=40)]({edgar_base}=10-K&dateb=&owner=include&count=40)
2. **XBRL Viewer**: [https://www.sec.gov/cgi-bin/viewer?action=view&cik={cik_int}&type=10-K](https://www.sec.gov/cgi-bin/viewer?action=view&cik={cik_int}&type=10-K)
3. **Company Facts API**: [https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json](https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json)

> **Data Freshness**: Based on FY{latest_fy} {form_type} filed {filing_date}. Update required when next annual filing is submitted to EDGAR.
"""
    return content


def _find_brand_dir(ticker: str) -> Path | None:
    for d in BRANDS_DIR.iterdir():
        if d.is_dir() and d.name.startswith(f"{ticker}_"):
            return d
    if (BRANDS_DIR / ticker).exists():
        return BRANDS_DIR / ticker
    return None


def _is_placeholder(path: Path) -> bool:
    if not path.exists():
        return True
    return PLACEHOLDER_PATTERN in path.read_text(encoding="utf-8")


def run(
    ticker: str | None = None,
    sector: str | None = None,
    placeholder_only: bool = False,
    force: bool = False,
) -> None:
    companies: list[dict] = []
    with open(CSV_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if ticker and row["ticker"] != ticker:
                continue
            if sector and row["sector"] != sector:
                continue
            companies.append(row)

    success = failed = skipped = 0
    for comp in companies:
        t = comp["ticker"]
        brand_dir = _find_brand_dir(t)
        if not brand_dir:
            print(f"  SKIP {t}: no brand directory found")
            skipped += 1
            continue

        out_path = brand_dir / "context" / "07-financial-anatomy.md"
        if not force and not placeholder_only and out_path.exists() and not _is_placeholder(out_path):
            skipped += 1
            continue
        if placeholder_only and out_path.exists() and not _is_placeholder(out_path):
            skipped += 1
            continue

        sec_path = RAW_DIR / t / "sec_10k.json"
        if not sec_path.exists():
            print(f"  WARN {t}: no sec_10k.json")
            failed += 1
            continue

        try:
            sec = json.loads(sec_path.read_text(encoding="utf-8"))
            if sec.get("error"):
                print(f"  WARN {t}: SEC error — {sec['error']}")
                failed += 1
                continue

            content = generate_layer7_content(
                t, comp["name"], comp["sector"], comp["industry"], sec
            )
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(content, encoding="utf-8")
            print(f"  OK   {t:<8s} {len(content.splitlines())} lines")
            success += 1
        except Exception as exc:
            print(f"  FAIL {t}: {exc}")
            failed += 1

    print(f"\nDone: {success} success, {failed} failed, {skipped} skipped")


def main() -> None:
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--ticker", type=str)
    p.add_argument("--sector", type=str)
    p.add_argument("--placeholder-only", action="store_true",
                   help="Only regenerate files that still have placeholder content")
    p.add_argument("--all", action="store_true")
    p.add_argument("--force", action="store_true")
    args = p.parse_args()
    run(
        ticker=args.ticker,
        sector=args.sector,
        placeholder_only=args.placeholder_only,
        force=args.force,
    )


if __name__ == "__main__":
    main()
