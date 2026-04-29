"""Brand data reader — parses markdown files from data/brands/."""
from __future__ import annotations
import csv
import re
from datetime import datetime, timezone
from pathlib import Path
from pydantic import BaseModel

BRANDS_DIR = Path(__file__).parent.parent.parent.parent / "data" / "brands"
_CSV_PATH = Path(__file__).parent.parent.parent.parent / "data" / "sp500_list.csv"


def _load_sp500_meta() -> dict[str, dict[str, str]]:
    if not _CSV_PATH.exists():
        return {}
    with _CSV_PATH.open(encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return {
            row["ticker"]: {
                "sector": row.get("sector", ""),
                "industry": row.get("industry", ""),
                "hq": row.get("hq", ""),
            }
            for row in reader
        }


_SP500_META: dict[str, dict[str, str]] = _load_sp500_meta()

LAYER_NAMES = {
    1: "Brand Identity", 2: "Audience Map", 3: "Competitive Landscape",
    4: "Content DNA", 5: "Design System", 6: "Channel Playbook",
    7: "Financial Anatomy", 8: "Legal Review",
}
LAYER_FILES = {
    1: "01-brand-identity.md", 2: "02-audience-map.md", 3: "03-competitive-landscape.md",
    4: "04-content-dna.md", 5: "05-design-system.md", 6: "06-channel-playbook.md",
    7: "07-financial-anatomy.md", 8: "08-legal-review.md",
}


class VoiceMatrix(BaseModel):
    formal_casual: int | None = None
    authority_peer: int | None = None
    emotional_rational: int | None = None
    restrained_bold: int | None = None


class ColorEntry(BaseModel):
    role: str
    name: str
    hex: str
    usage: str = ""


class LayerInfo(BaseModel):
    num: int
    name: str
    available: bool


class BrandSummary(BaseModel):
    ticker: str
    name: str
    sector: str = ""
    archetype_primary: str = ""
    color_primary: str = ""
    status: str = "published"
    layer_count: int = 0
    analysis_date: str = ""


class BrandDetail(BaseModel):
    ticker: str
    name: str
    sector: str = ""
    industry: str = ""
    archetype_primary: str = ""
    archetype_secondary: str = ""
    tagline: str = ""
    slogan: str = ""
    analysis_date: str = ""
    voice_matrix: VoiceMatrix | None = None
    colors: list[ColorEntry] = []
    layers: list[LayerInfo] = []


def _scan_brands() -> list[Path]:
    if not BRANDS_DIR.exists():
        return []
    return sorted(p for p in BRANDS_DIR.iterdir() if p.is_dir() and (p / "context").exists())


_SUMMARY_CACHE: list[BrandSummary] | None = None


def _build_summary_cache() -> list[BrandSummary]:
    dirs = _scan_brands()
    results: list[BrandSummary] = []
    for d in dirs:
        ticker = _parse_ticker(d)
        name = _parse_name(d)
        meta = _SP500_META.get(ticker, {})
        color_primary = ""
        design_path = d / "context" / LAYER_FILES[5]
        if design_path.exists():
            try:
                colors = _extract_colors(design_path.read_text(encoding="utf-8", errors="replace"))
                if colors:
                    color_primary = colors[0].hex
            except Exception:
                pass
        arch_primary = ""
        analysis_date = ""
        identity_path = d / "context" / LAYER_FILES[1]
        if identity_path.exists():
            try:
                arch_primary, _ = _extract_archetype(identity_path.read_text(encoding="utf-8", errors="replace"))
            except Exception:
                pass
            try:
                analysis_date = _extract_analysis_date(identity_path)
            except Exception:
                pass
        layer_count = sum(
            1 for n in range(1, 9)
            if (d / "context" / LAYER_FILES[n]).exists()
        )
        results.append(BrandSummary(
            ticker=ticker,
            name=name,
            sector=meta.get("sector", ""),
            archetype_primary=arch_primary,
            color_primary=color_primary,
            status="published",
            layer_count=layer_count,
            analysis_date=analysis_date,
        ))
    return results


def _get_cached_summaries() -> list[BrandSummary]:
    global _SUMMARY_CACHE
    if _SUMMARY_CACHE is None:
        _SUMMARY_CACHE = _build_summary_cache()
    return _SUMMARY_CACHE


def _parse_ticker(brand_dir: Path) -> str:
    return brand_dir.name.split("_", 1)[0]


def _parse_name(brand_dir: Path) -> str:
    parts = brand_dir.name.split("_", 1)
    return parts[1].replace("-", " ") if len(parts) > 1 else brand_dir.name


def _extract_colors(design_md: str) -> list[ColorEntry]:
    colors: list[ColorEntry] = []
    # Match table rows: | name | hex | ... | usage |
    # Handles both 4-col and 5-col tables (Token Name | HEX | Frequency | Role | Usage)
    pattern = re.compile(
        r"^\|[^|]*`([^`]+)`[^|]*\|[^|]*`(#[0-9A-Fa-f]{3,6})`[^|]*\|[^|]*\|[^|]*\|([^|]*)\|",
        re.MULTILINE,
    )
    for m in pattern.finditer(design_md):
        name = m.group(1).strip()
        hex_val = m.group(2).strip()
        usage = m.group(3).strip().strip("*")
        if not hex_val.startswith("#"):
            continue
        colors.append(ColorEntry(role="brand", name=name, hex=hex_val, usage=usage))
    # Fallback: simpler pattern for tables without backticks
    if not colors:
        simple = re.compile(
            r"\|\s*(?:\*\*)?(.+?)(?:\*\*)?\s*\|\s*(?:\*\*)?`?(#[0-9A-Fa-f]{3,6})`?(?:\*\*)?\s*\|",
            re.MULTILINE,
        )
        for m in simple.finditer(design_md):
            name = m.group(1).strip().strip("*").strip("`")
            hex_val = m.group(2).strip()
            if name.lower() in ("hex", "color", "---", "") or not hex_val.startswith("#"):
                continue
            colors.append(ColorEntry(role="brand", name=name, hex=hex_val))
    return colors[:8]


def _extract_archetype(identity_md: str) -> tuple[str, str]:
    primary = re.search(r"\|\s*\*\*Primary\*\*\s*\|\s*\*\*([^|*]+)\*\*", identity_md)
    secondary = re.search(r"\|\s*\*\*Secondary\*\*\s*\|\s*\*\*([^|*]+)\*\*", identity_md)
    p = primary.group(1).strip() if primary else ""
    s = secondary.group(1).strip() if secondary else ""
    return p, s


def _extract_voice_matrix(identity_md: str) -> VoiceMatrix | None:
    # Format: | **Formal ↔ Casual** | ... | **4 / 10** | ...
    scores: dict[str, int | None] = {}

    def _find_score(pattern: str) -> int | None:
        m = re.search(pattern, identity_md, re.IGNORECASE)
        if m:
            return int(m.group(1))
        return None

    scores["formal_casual"] = _find_score(
        r"[Ff]ormal\s*[↔\-]\s*[Cc]asual[^|]*\|[^|]*\|\s*\**(\d+)\s*/\s*10"
    )
    scores["authority_peer"] = _find_score(
        r"[Aa]uthorit[^|]*[↔\-][^|]*[Pp]eer[^|]*\|[^|]*\|\s*\**(\d+)\s*/\s*10"
    )
    scores["emotional_rational"] = _find_score(
        r"[Ee]motion[^|]*[↔\-][^|]*[Rr]ation[^|]*\|[^|]*\|\s*\**(\d+)\s*/\s*10"
    )
    scores["restrained_bold"] = _find_score(
        r"(?:[Rr]estrained?\s*[↔\-]\s*[Bb]old|[Uu]nderstated?\s*[↔\-]\s*[Hh]yperbol)[^|]*\|[^|]*\|\s*\**(\d+)\s*/\s*10"
    )

    if not any(v is not None for v in scores.values()):
        return None
    return VoiceMatrix(**scores)


def _extract_tagline(identity_md: str) -> str:
    # Look for blockquote with quotes: > "..."
    m = re.search(r'>\s*"(.+?)"', identity_md)
    return m.group(1).strip()[:300] if m else ""


def _extract_analysis_date(identity_path: Path) -> str:
    try:
        ts = identity_path.stat().st_mtime
        return datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m-%d")
    except Exception:
        return datetime.now().strftime("%Y-%m-%d")


def list_brands(
    q: str = "",
    sector: str = "",
    archetype: str = "",
    limit: int = 50,
    offset: int = 0,
) -> tuple[list[BrandSummary], int]:
    all_brands = _get_cached_summaries()
    results: list[BrandSummary] = []
    for b in all_brands:
        if q and q.lower() not in b.ticker.lower() and q.lower() not in b.name.lower():
            continue
        if sector and sector.lower() not in b.sector.lower():
            continue
        if archetype and archetype.lower() not in b.archetype_primary.lower():
            continue
        results.append(b)
    total = len(results)
    return results[offset:offset + limit], total


def get_brand(ticker: str) -> BrandDetail | None:
    ticker_upper = ticker.upper()
    dirs = _scan_brands()
    brand_dir = next((d for d in dirs if _parse_ticker(d).upper() == ticker_upper), None)
    if not brand_dir:
        return None

    context_dir = brand_dir / "context"
    name = _parse_name(brand_dir)

    identity_path = context_dir / LAYER_FILES[1]
    identity_md = identity_path.read_text(encoding="utf-8", errors="replace") if identity_path.exists() else ""

    design_path = context_dir / LAYER_FILES[5]
    design_md = design_path.read_text(encoding="utf-8", errors="replace") if design_path.exists() else ""

    arch_primary, arch_secondary = _extract_archetype(identity_md)
    colors = _extract_colors(design_md)
    voice = _extract_voice_matrix(identity_md)
    tagline = _extract_tagline(identity_md)
    analysis_date = _extract_analysis_date(identity_path) if identity_path.exists() else datetime.now().strftime("%Y-%m-%d")

    layers = [
        LayerInfo(num=n, name=LAYER_NAMES[n], available=(context_dir / LAYER_FILES[n]).exists())
        for n in range(1, 9)
    ]

    meta = _SP500_META.get(ticker_upper, {})
    return BrandDetail(
        ticker=ticker_upper, name=name,
        sector=meta.get("sector", ""),
        industry=meta.get("industry", ""),
        archetype_primary=arch_primary, archetype_secondary=arch_secondary,
        tagline=tagline, analysis_date=analysis_date,
        voice_matrix=voice, colors=colors, layers=layers,
    )


def get_layer(ticker: str, num: int) -> dict[str, str] | None:
    if num not in LAYER_NAMES:
        return None
    ticker_upper = ticker.upper()
    dirs = _scan_brands()
    brand_dir = next((d for d in dirs if _parse_ticker(d).upper() == ticker_upper), None)
    if not brand_dir:
        return None
    layer_path = brand_dir / "context" / LAYER_FILES[num]
    if not layer_path.exists():
        return None
    content = layer_path.read_text(encoding="utf-8", errors="replace")
    return {"content": content, "layer_name": LAYER_NAMES[num]}
