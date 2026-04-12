"""
Brand Autopsy LLM Analysis Engine.
Chains 8 layers sequentially with Claude API, using few-shot examples.
"""

import json
import time
import os
import sys
import re
from pathlib import Path
from datetime import date

from .prompts.system import SYSTEM_PROMPT, FEW_SHOT_INSTRUCTION
from .legal_validator import validate_markdown

# Lazy import — only needed when actually running analysis
anthropic = None

LAYER_MODULES = {
    1: ("01-brand-identity.md", "01_identity"),
    2: ("02-audience-map.md", "02_audience"),
    3: ("03-competitive-landscape.md", "03_competition"),
    4: ("04-content-dna.md", "04_content"),
    5: ("05-design-system.md", "05_design"),
    6: ("06-channel-playbook.md", "06_channel"),
    7: ("07-financial-anatomy.md", "07_financial"),
    8: ("08-legal-review.md", "08_legal"),
}

# Import prompt modules dynamically to avoid naming issues
import importlib
LAYER_PROMPT_MODULES = {}
for _n, (_f, _mod_name) in LAYER_MODULES.items():
    LAYER_PROMPT_MODULES[_n] = importlib.import_module(f".prompts.{_mod_name}", package="src.analyzer")

DATA_DIR = Path(__file__).parent.parent.parent / "data"
FEW_SHOT_DIR = Path("/mnt/c/Users/ReliQbit/Downloads/brand-autopsy-framework/"
                     "brand-autopsy-framework/brands")
LOCAL_FEW_SHOT_BRANDS = [
    "AAPL_Apple-Inc",
    "ADBE_Adobe-Inc",
    "ACN_Accenture",
]


def _load_anthropic():
    global anthropic
    if anthropic is None:
        import anthropic as _anthropic
        anthropic = _anthropic


def _get_few_shot_examples(layer_num: int, count: int = 2) -> str:
    """Load few-shot examples from existing analyzed brands."""
    filename = LAYER_MODULES[layer_num][0]
    examples = []

    # Prefer the external framework when available, but fall back to checked-in repo examples.
    candidate_roots = []
    if FEW_SHOT_DIR.exists():
        candidate_roots.append((
            FEW_SHOT_DIR,
            ["01-gentle-monster", "02-toss", "03-notion", "06-aesop", "10-figma"],
        ))
    candidate_roots.append((DATA_DIR / "brands", LOCAL_FEW_SHOT_BRANDS))

    for root, preferred in candidate_roots:
        for brand_dir_name in preferred:
            if len(examples) >= count:
                break
            filepath = root / brand_dir_name / "context" / filename
            if filepath.exists():
                content = filepath.read_text(encoding="utf-8")
                examples.append(f"### Example: {brand_dir_name}\n\n{content}")
        if len(examples) >= count:
            break

    return "\n\n---\n\n".join(examples)


def _slugify_brand_name(name: str) -> str:
    """Convert a company name to a directory-safe slug."""
    slug = re.sub(r"[^A-Za-z0-9]+", "-", name).strip("-")
    slug = re.sub(r"-{2,}", "-", slug)
    return slug or "Unknown-Brand"


def _brand_dir(ticker: str, name: str) -> Path:
    """Resolve the canonical brand directory, preferring existing ticker-prefixed paths."""
    brands_root = DATA_DIR / "brands"
    exact = brands_root / f"{ticker}_{_slugify_brand_name(name)}"
    if exact.exists():
        return exact

    for existing in brands_root.iterdir():
        if existing.is_dir() and existing.name.startswith(f"{ticker}_"):
            return existing

    return exact


def _load_css_data(ticker: str) -> str:
    """Load crawled CSS data for a company."""
    css_path = DATA_DIR / "raw" / ticker / "css_data.json"
    if not css_path.exists():
        return "No CSS data available (crawl failed or not collected)"

    with open(css_path, encoding="utf-8") as f:
        data = json.load(f)

    if "error" in data:
        return f"CSS crawl failed: {data['error']}"

    parts = [f"URL: {data.get('url', 'N/A')}"]
    if data.get("colors"):
        parts.append("Extracted colors:")
        for c in data["colors"][:15]:
            parts.append(f"  {c['hex']} (used {c['count']} times)")
    if data.get("fonts"):
        parts.append(f"Extracted fonts: {', '.join(data['fonts'][:10])}")

    return "\n".join(parts)


def _load_collected_data(ticker: str) -> str:
    """Load all collected raw data for a company."""
    raw_dir = DATA_DIR / "raw" / ticker
    parts = []

    # CSS data
    parts.append("### CSS Extraction Data")
    parts.append(_load_css_data(ticker))

    # SEC data (if exists)
    sec_path = raw_dir / "sec_10k.json"
    if sec_path.exists():
        with open(sec_path, encoding="utf-8") as f:
            sec = json.load(f)
        parts.append(f"\n### SEC 10-K Data\n{json.dumps(sec, indent=2, ensure_ascii=False)[:3000]}")

    # Social data (if exists)
    social_path = raw_dir / "social_data.json"
    if social_path.exists():
        with open(social_path, encoding="utf-8") as f:
            social = json.load(f)
        parts.append(f"\n### Social Media Data\n{json.dumps(social, indent=2, ensure_ascii=False)[:3000]}")

    return "\n\n".join(parts)


def _load_sec_data(ticker: str) -> str:
    """Load SEC filing data for a company."""
    sec_path = DATA_DIR / "raw" / ticker / "sec_10k.json"
    if not sec_path.exists():
        return (
            "SEC 10-K data not available. "
            f"Check directly on EDGAR: https://www.sec.gov/cgi-bin/browse-edgar?"
            f"action=getcompany&CIK={ticker}&type=10-K&dateb=&owner=include&count=10"
        )

    with open(sec_path, encoding="utf-8") as f:
        sec = json.load(f)

    return json.dumps(sec, indent=2, ensure_ascii=False)[:5000]


def _get_sector_companies(ticker: str, sector: str) -> str:
    """Get list of companies in the same sector for competitive analysis."""
    import csv
    csv_path = DATA_DIR / "sp500_list.csv"
    companies = []
    with open(csv_path, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row["sector"] == sector and row["ticker"] != ticker:
                companies.append(f"- {row['ticker']}: {row['name']} ({row['industry']})")
    return "\n".join(companies[:20])


class AnalysisEngine:
    """Run 8-layer brand analysis using Claude API."""

    def __init__(self, model: str = "claude-sonnet-4-20250514", max_retries: int = 3):
        _load_anthropic()
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError(
                "ANTHROPIC_API_KEY not set. "
                "Export it or add to .env:\n"
                "  export ANTHROPIC_API_KEY=sk-ant-..."
            )
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = model
        self.max_retries = max_retries
        self.cost_tracker = {"input_tokens": 0, "output_tokens": 0, "calls": 0}

    def _call_llm(self, system: str, user_prompt: str) -> str:
        """Call Claude API with retry logic."""
        for attempt in range(self.max_retries):
            try:
                response = self.client.messages.create(
                    model=self.model,
                    max_tokens=8192,
                    system=system,
                    messages=[{"role": "user", "content": user_prompt}],
                )

                # Track costs
                usage = response.usage
                self.cost_tracker["input_tokens"] += usage.input_tokens
                self.cost_tracker["output_tokens"] += usage.output_tokens
                self.cost_tracker["calls"] += 1

                return response.content[0].text

            except Exception as e:
                if attempt < self.max_retries - 1:
                    wait = 2 ** attempt
                    print(f"  Retry {attempt+1}/{self.max_retries} after {wait}s: {e}")
                    time.sleep(wait)
                else:
                    raise

    def analyze_brand(self, ticker: str, name: str, sector: str = "",
                      industry: str = "") -> dict[int, str]:
        """Run full 8-layer analysis for a brand."""
        print(f"\n{'='*50}")
        print(f"Analyzing: {name} ({ticker})")
        print(f"{'='*50}")

        collected_data = _load_collected_data(ticker)
        css_data = _load_css_data(ticker)

        # Build system prompt with few-shot instruction
        system = SYSTEM_PROMPT + "\n\n" + FEW_SHOT_INSTRUCTION

        # Company context
        company_context = (
            f"Company: {name}\n"
            f"Ticker: {ticker}\n"
            f"Sector: {sector}\n"
            f"Industry: {industry}\n"
        )

        results = {}

        for layer_num in range(1, 9):
            print(f"\n  Layer {layer_num}/8...", end=" ", flush=True)
            start = time.time()

            module = LAYER_PROMPT_MODULES[layer_num]
            few_shot = _get_few_shot_examples(layer_num, count=2)

            # Build layer-specific prompt
            template_vars = {
                "brand_name": name,
                "collected_data": collected_data,
            }

            if layer_num == 1:
                template_vars["collected_data"] = f"{company_context}\n\n{collected_data}"
            elif layer_num == 2:
                template_vars["layer1_result"] = results.get(1, "")[:3000]
                template_vars["collected_data"] = collected_data
            elif layer_num == 3:
                prev = "\n\n---\n\n".join(
                    results.get(i, "")[:2000] for i in range(1, 3)
                )
                template_vars["previous_layers"] = prev
                template_vars["collected_data"] = collected_data
                template_vars["sector_companies"] = _get_sector_companies(ticker, sector)
            elif layer_num == 4:
                prev = "\n\n---\n\n".join(
                    results.get(i, "")[:1500] for i in range(1, 4)
                )
                template_vars["previous_layers"] = prev
                template_vars["collected_data"] = collected_data
            elif layer_num == 5:
                template_vars["layer1_result"] = results.get(1, "")[:2000]
                template_vars["css_data"] = css_data
                template_vars["collected_data"] = collected_data
            elif layer_num == 6:
                prev = "\n\n---\n\n".join(
                    results.get(i, "")[:1500] for i in range(1, 6)
                )
                template_vars["previous_layers"] = prev
                template_vars["collected_data"] = collected_data
            elif layer_num == 7:
                prev = "\n\n---\n\n".join(
                    results.get(i, "")[:1500] for i in [1, 3]
                )
                template_vars["previous_layers"] = prev
                template_vars["collected_data"] = collected_data
                template_vars["sec_data"] = _load_sec_data(ticker)
            elif layer_num == 8:
                prev = "\n\n---\n\n".join(
                    results.get(i, "")[:1500] for i in [1, 3, 7]
                )
                template_vars["previous_layers"] = prev
                template_vars["collected_data"] = collected_data
                template_vars["sec_data"] = _load_sec_data(ticker)

            user_prompt = (
                f"## Few-Shot Examples\n\n{few_shot}\n\n"
                f"## Now analyze this brand:\n\n"
                f"{module.TEMPLATE.format(**template_vars)}"
            )

            result = self._call_llm(system, user_prompt)
            results[layer_num] = result

            elapsed = time.time() - start
            print(f"done ({elapsed:.1f}s, {len(result)} chars)")

        return results

    def validate_results(self, ticker: str, name: str, results: dict[int, str]):
        """Validate generated layer content before final save."""
        reports = []
        for layer_num, content in sorted(results.items()):
            filename = LAYER_MODULES[layer_num][0]
            file_label = str(_brand_dir(ticker, name) / "context" / filename)
            reports.append(validate_markdown(content, file_path=file_label))
        return reports

    def get_brand_dir(self, ticker: str, name: str) -> Path:
        """Public helper for runner code that needs the canonical output path."""
        return _brand_dir(ticker, name)

    def save_results(self, ticker: str, name: str, results: dict[int, str]):
        """Save analysis results as markdown files."""
        out_dir = _brand_dir(ticker, name) / "context"
        out_dir.mkdir(parents=True, exist_ok=True)

        filenames = {
            1: "01-brand-identity.md",
            2: "02-audience-map.md",
            3: "03-competitive-landscape.md",
            4: "04-content-dna.md",
            5: "05-design-system.md",
            6: "06-channel-playbook.md",
            7: "07-financial-anatomy.md",
            8: "08-legal-review.md",
        }

        for num, content in results.items():
            filepath = out_dir / filenames[num]
            filepath.write_text(content, encoding="utf-8")

        print(f"  Saved to {out_dir}")

    def report_costs(self):
        """Print cost summary."""
        ct = self.cost_tracker
        # Sonnet pricing: $3/M input, $15/M output
        input_cost = ct["input_tokens"] / 1_000_000 * 3
        output_cost = ct["output_tokens"] / 1_000_000 * 15
        total = input_cost + output_cost
        print(f"\nAPI Cost Summary:")
        print(f"  Calls: {ct['calls']}")
        print(f"  Input:  {ct['input_tokens']:,} tokens (${input_cost:.3f})")
        print(f"  Output: {ct['output_tokens']:,} tokens (${output_cost:.3f})")
        print(f"  Total:  ${total:.3f}")


def main():
    """CLI: analyze a single brand or batch."""
    import argparse
    import csv
    from src.analyzer.legal_validator import validate_brand, validate_all, print_report

    parser = argparse.ArgumentParser(description="Run Brand Autopsy analysis")
    parser.add_argument("--ticker", type=str, help="Single ticker to analyze")
    parser.add_argument("--sector", type=str, help="Analyze all companies in sector")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of companies")
    parser.add_argument("--model", type=str, default="claude-sonnet-4-20250514")
    parser.add_argument("--validate-only", action="store_true",
                        help="Only validate existing results")
    args = parser.parse_args()

    if args.validate_only:
        # Validate existing analyses
        brands_dir = DATA_DIR / "brands"
        if args.ticker:
            target_dir = _brand_dir(args.ticker, args.ticker)
            for brand_dir in sorted(brands_dir.iterdir()):
                if brand_dir.is_dir() and brand_dir.name.startswith(f"{args.ticker}_"):
                    target_dir = brand_dir
                    break
            print_report(validate_brand(str(target_dir)), verbose=True)
        else:
            summary = validate_all(str(brands_dir))
            print(
                f"Summary: {summary['total_files']} files — {summary['passed']} passed, "
                f"{summary['failed']} failed, {summary['total_errors']} errors, "
                f"{summary['total_warnings']} warnings"
            )
        return

    engine = AnalysisEngine(model=args.model)

    # Build target list
    targets = []
    csv_path = DATA_DIR / "sp500_list.csv"

    if args.ticker:
        with open(csv_path, encoding="utf-8") as f:
            for row in csv.DictReader(f):
                if row["ticker"] == args.ticker:
                    targets.append(row)
                    break
        if not targets:
            print(f"Ticker {args.ticker} not found in S&P 500 list")
            sys.exit(1)
    elif args.sector:
        with open(csv_path, encoding="utf-8") as f:
            for row in csv.DictReader(f):
                if row["sector"] == args.sector:
                    targets.append(row)
    else:
        with open(csv_path, encoding="utf-8") as f:
            targets = list(csv.DictReader(f))

    if args.limit:
        targets = targets[:args.limit]

    print(f"Targets: {len(targets)} companies")

    success, failed = 0, 0
    for i, comp in enumerate(targets, 1):
        ticker = comp["ticker"]
        name = comp["name"]
        sector = comp["sector"]
        industry = comp["industry"]

        # Skip if already analyzed
        existing = _brand_dir(ticker, name) / "context" / "01-brand-identity.md"
        if existing.exists():
            print(f"[{i}/{len(targets)}] {ticker} — already analyzed, skipping")
            continue

        try:
            print(f"\n[{i}/{len(targets)}] {ticker} — {name}")
            results = engine.analyze_brand(ticker, name, sector, industry)
            reports = engine.validate_results(ticker, name, results)
            passed = all(report.passed for report in reports)
            for report in reports:
                print(f"  {report.summary()}")
            if not passed:
                failed += 1
                print("  FAILED: legal validator rejected generated output before final save")
                continue
            engine.save_results(ticker, name, results)
            success += 1

        except Exception as e:
            failed += 1
            print(f"  FAILED: {e}")

    print(f"\n{'='*50}")
    print(f"Batch complete: {success} success, {failed} failed")
    engine.report_costs()


if __name__ == "__main__":
    main()
