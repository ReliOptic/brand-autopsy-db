#!/usr/bin/env python3
"""
S&P 500 Brand Autopsy — One-command batch runner.

Usage:
  # Analyze Tech sector (73 companies)
  python run_batch.py --sector "Information Technology"

  # Analyze single company
  python run_batch.py --ticker AAPL

  # Analyze all 503 companies
  python run_batch.py --all

  # Analyze first 50 companies
  python run_batch.py --all --limit 50

  # Validate existing results only
  python run_batch.py --validate-only

  # Re-crawl CSS for failed companies
  python run_batch.py --recrawl

  # Fetch latest SEC EDGAR filings + XBRL facts for all tickers
  python run_batch.py --sec-fetch --all
  python run_batch.py --sec-fetch --ticker AAPL

  # Show status dashboard
  python run_batch.py --status

Prerequisites:
  export ANTHROPIC_API_KEY=sk-ant-...        # required only for LLM analysis
  export SEC_USER_AGENT="Your Name contact@example.com"  # recommended for --sec-fetch
"""

import argparse
import csv
import json
import re
import shutil
import sys
import asyncio
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

DATA_DIR = Path(__file__).parent / "data"


def _slugify_brand_name(name: str) -> str:
    """Convert a company name to a directory-safe slug."""
    slug = re.sub(r"[^A-Za-z0-9]+", "-", name).strip("-")
    slug = re.sub(r"-{2,}", "-", slug)
    return slug or "Unknown-Brand"


def resolve_brand_dir(ticker: str, company_name: str | None = None) -> Path:
    """Resolve the canonical brand directory, preferring existing ticker-prefixed paths."""
    brands_root = DATA_DIR / "brands"

    if company_name:
        exact = brands_root / f"{ticker}_{_slugify_brand_name(company_name)}"
        if exact.exists():
            return exact

    for existing in brands_root.iterdir():
        if existing.is_dir() and existing.name.startswith(f"{ticker}_"):
            return existing

    if company_name:
        return brands_root / f"{ticker}_{_slugify_brand_name(company_name)}"
    return brands_root / ticker


def show_status():
    """Show current progress dashboard."""
    csv_path = DATA_DIR / "sp500_list.csv"
    raw_dir = DATA_DIR / "raw"
    brands_dir = DATA_DIR / "brands"

    # Count by status
    total = 0
    css_ok = 0
    css_fail = 0
    analyzed = 0
    sectors = {}

    with open(csv_path, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            total += 1
            ticker = row["ticker"]
            sector = row["sector"]
            sectors.setdefault(sector, {"total": 0, "css": 0, "analyzed": 0})
            sectors[sector]["total"] += 1

            # CSS data
            css_file = raw_dir / ticker / "css_data.json"
            if css_file.exists():
                with open(css_file, encoding="utf-8") as cf:
                    data = json.load(cf)
                if "error" not in data:
                    css_ok += 1
                    sectors[sector]["css"] += 1
                else:
                    css_fail += 1
            else:
                css_fail += 1

            # Analysis — check both ticker/ and TICKER_Company-Name/ folder formats
            identity = resolve_brand_dir(ticker) / "context" / "01-brand-identity.md"
            if identity.exists():
                analyzed += 1
                sectors[sector]["analyzed"] += 1

    print(f"\n{'='*60}")
    print(f"S&P 500 Brand Autopsy — Status Dashboard")
    print(f"{'='*60}")
    print(f"\n  Total companies:     {total}")
    print(f"  CSS crawled (OK):    {css_ok} ({100*css_ok//total}%)")
    print(f"  CSS failed:          {css_fail}")
    print(f"  Analyzed (6-Layer):  {analyzed} ({100*analyzed//total}%)")
    print(f"  Remaining:           {total - analyzed}")

    print(f"\n{'  Sector':<35s} {'Total':>5s} {'CSS':>5s} {'Done':>5s} {'%':>5s}")
    print(f"  {'-'*55}")
    for sector in sorted(sectors, key=lambda s: -sectors[s]["total"]):
        s = sectors[sector]
        pct = f"{100*s['analyzed']//s['total']}%" if s['total'] else "—"
        print(f"  {sector:<35s} {s['total']:5d} {s['css']:5d} {s['analyzed']:5d} {pct:>5s}")

    # Cost estimate
    remaining = total - analyzed
    est_cost = remaining * 0.27
    print(f"\n  Estimated cost for remaining {remaining} companies: ~${est_cost:.0f}")


def recrawl_failed():
    """Re-crawl companies where CSS extraction failed."""
    from src.crawler.batch_crawl import batch_crawl

    csv_path = DATA_DIR / "sp500_list.csv"
    raw_dir = DATA_DIR / "raw"

    failed_tickers = set()
    with open(csv_path, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            ticker = row["ticker"]
            css_file = raw_dir / ticker / "css_data.json"
            if css_file.exists():
                with open(css_file, encoding="utf-8") as cf:
                    data = json.load(cf)
                if "error" in data:
                    failed_tickers.add(ticker)
            else:
                failed_tickers.add(ticker)

    print(f"Re-crawling {len(failed_tickers)} failed companies...")
    # For now just re-run the full batch — it will skip those with good data
    asyncio.run(batch_crawl())


def _archive_old_analysis(ticker, company_name):
    """Archive existing analysis before regeneration."""
    brand_root = resolve_brand_dir(ticker, company_name)
    brand_dir = brand_root / "context"
    archive_dir = brand_root / "archive" / "v1-ko"
    if brand_dir.exists() and not archive_dir.exists():
        archive_dir.parent.mkdir(parents=True, exist_ok=True)
        shutil.copytree(brand_dir, archive_dir)
        print(f"  Archived old analysis to {archive_dir}")


def run_analysis(ticker=None, sector=None, limit=None, all_companies=False, force=False):
    """Run LLM analysis."""
    import os
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set.")
        print("  export ANTHROPIC_API_KEY=sk-ant-...")
        sys.exit(1)

    from src.analyzer.engine import AnalysisEngine
    engine = AnalysisEngine()

    targets = []
    csv_path = DATA_DIR / "sp500_list.csv"

    with open(csv_path, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if ticker and row["ticker"] != ticker:
                continue
            if sector and row["sector"] != sector:
                continue
            targets.append(row)

    if not all_companies and not ticker and not sector:
        print("Specify --ticker, --sector, or --all")
        sys.exit(1)

    if limit:
        targets = targets[:limit]

    # Skip already analyzed (or archive and re-run if --force)
    remaining = []
    for t in targets:
        existing = resolve_brand_dir(t["ticker"], t["name"]) / "context" / "01-brand-identity.md"
        if existing.exists():
            if force:
                _archive_old_analysis(t["ticker"], t["name"])
                remaining.append(t)
                continue
            continue
        remaining.append(t)

    print(f"Targets: {len(targets)} total, {len(remaining)} remaining (skipping {len(targets)-len(remaining)} already done)")

    if not remaining:
        print("All targets already analyzed!")
        return

    success, failed = 0, 0
    for i, comp in enumerate(remaining, 1):
        try:
            print(f"\n[{i}/{len(remaining)}] {comp['ticker']} — {comp['name']}")
            results = engine.analyze_brand(
                comp["ticker"], comp["name"],
                comp["sector"], comp["industry"],
            )

            reports = engine.validate_results(comp["ticker"], comp["name"], results)
            passed = all(report.passed for report in reports)
            for report in reports:
                print(f"  {report.summary()}")

            if not passed:
                failed += 1
                print("  FAILED: legal validator rejected generated output before final save")
                continue

            engine.save_results(comp["ticker"], comp["name"], results)

            # Load into DB
            from src.db.loader import load_brand
            from src.db.models import get_session
            brand_dir = engine.get_brand_dir(comp["ticker"], comp["name"])
            Session = get_session("sqlite:///data/brand_autopsy.db")
            load_brand(brand_dir, Session)

            success += 1
        except KeyboardInterrupt:
            print("\n\nInterrupted by user. Progress saved.")
            break
        except Exception as e:
            failed += 1
            print(f"  FAILED: {e}")

    print(f"\n{'='*50}")
    print(f"Batch complete: {success} success, {failed} failed")
    engine.report_costs()


def run_validate_legal(ticker=None, verbose=False):
    """Validate existing analyses with the legal compliance validator."""
    from src.analyzer.legal_validator import validate_brand, validate_all, print_report

    brands_dir = DATA_DIR / "brands"
    if not brands_dir.exists():
        print("No analyses found.")
        return

    if ticker:
        brand_dir = resolve_brand_dir(ticker)
        if not brand_dir.exists():
            print(f"No brand directory found for ticker {ticker}")
            return
        reports = validate_brand(str(brand_dir))
        print_report(reports, verbose=verbose)
        return

    summary = validate_all(str(brands_dir))
    total_files = summary["total_files"]
    passed = summary["passed"]
    failed = summary["failed"]
    errors = summary["total_errors"]
    warnings = summary["total_warnings"]
    print(
        f"Summary: {total_files} files — {passed} passed, {failed} failed, "
        f"{errors} errors, {warnings} warnings"
    )


def run_sec_fetch(ticker=None, sector=None, all_companies=False, limit=None,
                  force=False, skip_facts=False):
    """Pull the latest SEC EDGAR filings + XBRL facts into data/raw/."""
    from src.crawler.sec_fetcher import fetch_batch

    if not (ticker or sector or all_companies):
        print("Specify --ticker, --sector, or --all with --sec-fetch")
        sys.exit(1)

    fetch_batch(
        ticker=ticker,
        sector=sector,
        limit=limit,
        force=force,
        skip_facts=skip_facts,
    )


def run_validate_legacy():
    """Legacy structure validator retained for comparison/debugging only."""
    from src.analyzer.validator import validate_and_report

    brands_dir = DATA_DIR / "brands"
    if not brands_dir.exists():
        print("No analyses found.")
        return

    files = {
        1: "01-brand-identity.md", 2: "02-audience-map.md",
        3: "03-competitive-landscape.md", 4: "04-content-dna.md",
        5: "05-design-system.md", 6: "06-channel-playbook.md",
        7: "07-financial-anatomy.md", 8: "08-legal-review.md",
    }

    total_pass, total_fail = 0, 0
    for brand_dir in sorted(brands_dir.iterdir()):
        context = brand_dir / "context"
        if not context.exists():
            continue
        layers = {}
        for num, fn in files.items():
            p = context / fn
            if p.exists():
                layers[num] = p.read_text(encoding="utf-8")
        if layers:
            ok = validate_and_report(layers, brand_dir.name)
            if ok:
                total_pass += 1
            else:
                total_fail += 1

    print(f"\nSummary: {total_pass} pass, {total_fail} with issues")


def main():
    parser = argparse.ArgumentParser(description="S&P 500 Brand Autopsy Runner")
    parser.add_argument("--ticker", type=str, help="Analyze single ticker")
    parser.add_argument("--sector", type=str, help="Analyze all in sector")
    parser.add_argument("--all", action="store_true", help="Analyze all companies")
    parser.add_argument("--limit", type=int, help="Limit number of companies")
    parser.add_argument("--status", action="store_true", help="Show status dashboard")
    parser.add_argument("--validate-only", action="store_true", help="Validate existing files with legal validator")
    parser.add_argument("--validate", action="store_true", help="Alias for --validate-only")
    parser.add_argument("--legacy-validate", action="store_true", help="Run legacy structure validator")
    parser.add_argument("--recrawl", action="store_true", help="Re-crawl failed CSS")
    parser.add_argument("--sec-fetch", action="store_true",
                        help="Fetch latest SEC EDGAR filings + XBRL facts into data/raw/{ticker}/")
    parser.add_argument("--skip-facts", action="store_true",
                        help="With --sec-fetch: skip XBRL company-facts download (submissions only)")
    parser.add_argument("--force", action="store_true", help="Force regeneration of already-analyzed brands")
    parser.add_argument("--verbose-validation", action="store_true", help="Show detailed validation issues")
    args = parser.parse_args()

    if args.status:
        show_status()
    elif args.validate_only or args.validate:
        run_validate_legal(ticker=args.ticker, verbose=args.verbose_validation)
    elif args.legacy_validate:
        run_validate_legacy()
    elif args.recrawl:
        recrawl_failed()
    elif args.sec_fetch:
        run_sec_fetch(
            ticker=args.ticker,
            sector=args.sector,
            all_companies=args.all,
            limit=args.limit,
            force=args.force,
            skip_facts=args.skip_facts,
        )
    else:
        run_analysis(args.ticker, args.sector, args.limit, args.all, force=args.force)


if __name__ == "__main__":
    main()
