"""Enrich BrandDesignMd JSON from local awesome-design-md T3 sources."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
BRANDS_DIR = ROOT / "data" / "brands"
AWESOME_DIR = ROOT / "awesome-design-md" / "design-md"

TICKER_TO_SLUG = {
    "AAPL": "apple",
    "ABNB": "airbnb",
}


def _brand_dirs() -> list[Path]:
    return sorted(p for p in BRANDS_DIR.iterdir() if p.is_dir()) if BRANDS_DIR.exists() else []


def _ticker(brand_dir: Path) -> str:
    return brand_dir.name.split("_", 1)[0].upper()


def _slug_candidates(ticker: str, brand_dir: Path) -> list[str]:
    explicit = TICKER_TO_SLUG.get(ticker.upper())
    name = brand_dir.name.split("_", 1)[1] if "_" in brand_dir.name else brand_dir.name
    base = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    candidates = [c for c in [explicit, base, base.replace("-inc", ""), base.split("-")[0]] if c]
    return list(dict.fromkeys(candidates))


def _find_brand_dir(ticker: str) -> Path | None:
    return next((d for d in _brand_dirs() if _ticker(d) == ticker.upper()), None)


def _awesome_design_path(ticker: str, brand_dir: Path) -> Path | None:
    for slug in _slug_candidates(ticker, brand_dir):
        path = AWESOME_DIR / slug / "DESIGN.md"
        if path.exists():
            return path
    return None


def _frontmatter(text: str) -> str:
    if not text.startswith("---"):
        return ""
    parts = text.split("---", 2)
    return parts[1] if len(parts) >= 3 else ""


def _extract_block(frontmatter: str, key: str) -> str:
    match = re.search(rf"^{key}:\n(.*?)(?=^[a-zA-Z0-9_-]+:|\Z)", frontmatter, re.M | re.S)
    return match.group(1).rstrip() if match else ""


def _extract_component_styling(awesome_md: str) -> dict[str, str]:
    fm = _frontmatter(awesome_md)
    components = _extract_block(fm, "components")
    if not components:
        return {}

    def lines_containing(*needles: str) -> str:
        out = []
        active = False
        for line in components.splitlines():
            stripped = line.strip()
            if re.match(r"^[a-z0-9_-]+:", stripped):
                active = any(n in stripped for n in needles)
            if active and stripped:
                out.append(stripped)
        return "; ".join(out[:18])

    buttons = lines_containing("button", "text-link")
    cards = lines_containing("card", "tile")
    navigation = lines_containing("nav", "sticky", "bar")
    inputs = lines_containing("input", "search", "chip")
    charts = lines_containing("chart", "graph", "data")
    result = {
        "buttons": f"{buttons} (T3: awesome-design-md)" if buttons else "Button styling unavailable in T3 source.",
        "cards": f"{cards} (T3: awesome-design-md)" if cards else "Card/tile styling unavailable in T3 source.",
        "navigation": f"{navigation} (T3: awesome-design-md)" if navigation else "Navigation styling unavailable in T3 source.",
    }
    if inputs:
        result["inputs"] = f"{inputs} (T3: awesome-design-md)"
    if charts:
        result["charts"] = f"{charts} (T3: awesome-design-md)"
    return result


def _count_text(values: list[str]) -> int:
    return sum(1 for v in values if str(v).strip())


def _score(data: dict[str, Any]) -> tuple[int, str, dict[str, int]]:
    colors = data.get("color_palette") or []
    roles = {c.get("role") for c in colors if isinstance(c, dict)}
    n = len(colors)
    color = 18 if n >= 13 else 16 if n >= 8 else 11 if n >= 4 else 6 if n >= 1 else 0
    if {"primary", "surface", "text", "accent"}.issubset(roles):
        color += 2
    typo = data.get("typography_rules") or {}
    typography = (4 if typo.get("heading") else 0) + (3 if typo.get("body") else 0) + (2 if typo.get("mono") else 0) + (3 if len(str(typo.get("scale_notes", "")).strip()) > 30 else 0) + (3 if len(str(typo.get("weight_notes", "")).strip()) > 30 else 0)
    comp = data.get("component_styling") or {}
    component = (6 if comp.get("buttons") else 0) + (6 if comp.get("cards") else 0) + (5 if comp.get("navigation") else 0) + (2 if comp.get("inputs") else 0) + (1 if comp.get("charts") else 0)
    layouts = _count_text(data.get("layout_principles") or [])
    layout = (13 if layouts >= 5 else 10 if layouts >= 3 else 5 if layouts >= 1 else 0) + (2 if len(str(data.get("depth_elevation", "")).strip()) > 20 else 0)
    do_dont = (5 if _count_text(data.get("dos") or []) >= 3 else 0) + (5 if _count_text(data.get("donts") or []) >= 3 else 0)
    prompt_len = len(str(data.get("agent_prompt_guide", "")).strip())
    prompt = (8 if prompt_len >= 300 else 6 if prompt_len > 150 else 3 if prompt_len >= 50 else 0) + (2 if data.get("visual_archetype") != "Unclassified" else 0)
    source = {"HIGH": 10, "MEDIUM": 6, "LOW": 3}.get(data.get("source_confidence"), 3)
    breakdown = {
        "color_completeness": color,
        "typography_specificity": typography,
        "component_completeness": component,
        "layout_specificity": layout,
        "do_dont_clarity": do_dont,
        "agent_prompt_usability": prompt,
        "source_confidence_score": source,
    }
    total = min(100, sum(breakdown.values()) + (3 if data.get("awesome_design_md_reference") else 0) + (2 if data.get("market_visual_positioning") else 0))
    grade = "DESIGN_READY" if total >= 85 else "PARTIAL" if total >= 65 else "DRAFT" if total >= 40 else "STUB"
    return total, grade, breakdown


def enrich_design_md(ticker: str) -> dict[str, Any]:
    brand_dir = _find_brand_dir(ticker)
    if brand_dir is None:
        raise FileNotFoundError(f"Brand not found: {ticker.upper()}")
    design_path = brand_dir / "design-md" / "design-md.json"
    if not design_path.exists():
        raise FileNotFoundError(f"design-md.json not found: {ticker.upper()}")
    awesome_path = _awesome_design_path(ticker, brand_dir)
    data = json.loads(design_path.read_text(encoding="utf-8"))
    if awesome_path is None:
        return {"ticker": ticker.upper(), "changed": False, "reason": "awesome-design-md source not found"}
    styling = _extract_component_styling(awesome_path.read_text(encoding="utf-8", errors="replace"))
    if not styling:
        return {"ticker": ticker.upper(), "changed": False, "reason": "component styling not found"}
    data["component_styling"] = {**(data.get("component_styling") or {}), **styling}
    data["awesome_design_md_reference"] = True
    score, grade, breakdown = _score(data)
    data["design_readiness_score"] = score
    data["design_readiness_grade"] = grade
    data["score_breakdown"] = breakdown
    design_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return {"ticker": ticker.upper(), "changed": True, "score": score, "grade": grade, "source": str(awesome_path.relative_to(ROOT))}


def main() -> None:
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--ticker")
    group.add_argument("--all", action="store_true")
    args = parser.parse_args()
    tickers = [_ticker(d) for d in _brand_dirs()] if args.all else [args.ticker.upper()]
    for ticker in tickers:
        try:
            print(json.dumps(enrich_design_md(ticker), ensure_ascii=False))
        except FileNotFoundError as exc:
            if args.all:
                continue
            raise SystemExit(str(exc)) from exc


if __name__ == "__main__":
    main()
