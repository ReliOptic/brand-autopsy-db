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
  python run_batch.py --validate

  # Re-crawl CSS for failed companies
  python run_batch.py --recrawl

  # Show status dashboard
  python run_batch.py --status

Prerequisites:
  export ANTHROPIC_API_KEY=sk-ant-...
"""

import argparse
import csv
import json
import shutil
import sys
import asyncio
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

DATA_DIR = Path(__file__).parent / "data"


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
            identity = brands_dir / ticker / "context" / "01-brand-identity.md"
            if not identity.exists() and brands_dir.exists():
                # Look for TICKER_* prefixed folder
                for d in brands_dir.iterdir():
                    if d.is_dir() and d.name.startswith(f"{ticker}_"):
                        identity = d / "context" / "01-brand-identity.md"
                        break
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


def _archive_old_analysis(ticker):
    """Archive existing analysis before regeneration."""
    brand_dir = DATA_DIR / "brands" / ticker / "context"
    archive_dir = DATA_DIR / "brands" / ticker / "archive" / "v1-ko"
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
        existing = DATA_DIR / "brands" / t["ticker"] / "context" / "01-brand-identity.md"
        if existing.exists():
            if force:
                _archive_old_analysis(t["ticker"])
                remaining.append(t)
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
            engine.save_results(comp["ticker"], results)

            # Load into DB
            from src.db.loader import load_brand
            from src.db.models import get_session
            brand_dir = DATA_DIR / "brands" / comp["ticker"]
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


def run_validate():
    """Validate all existing analyses."""
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
    parser.add_argument("--validate", action="store_true", help="Validate existing")
    parser.add_argument("--recrawl", action="store_true", help="Re-crawl failed CSS")
    parser.add_argument("--force", action="store_true", help="Force regeneration of already-analyzed brands")
    args = parser.parse_args()

    if args.status:
        show_status()
    elif args.validate:
        run_validate()
    elif args.recrawl:
        recrawl_failed()
    else:
        run_analysis(args.ticker, args.sector, args.limit, args.all, force=args.force)


if __name__ == "__main__":
    main()
