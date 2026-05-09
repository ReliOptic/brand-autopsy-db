"""Brand routes."""
from collections import Counter, defaultdict
import json
import re
from typing import Optional
from pathlib import Path
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from ..services.brand_reader import (
    list_brands,
    get_brand,
    get_layer,
    _scan_brands,
    _parse_ticker,
    _SP500_META,
    LAYER_FILES,
)

router = APIRouter(prefix="/api")

_QUALITY_SCORES_PATH = Path(__file__).parent.parent.parent.parent / "data" / "quality_scores.json"
_QUALITY_CACHE: Optional[dict[str, dict]] = None


def _load_quality_scores() -> dict[str, dict]:
    """Load (and cache) quality_scores.json. Raises 404 if file missing."""
    global _QUALITY_CACHE
    if _QUALITY_CACHE is not None:
        return _QUALITY_CACHE
    if not _QUALITY_SCORES_PATH.exists():
        raise HTTPException(
            status_code=404,
            detail="quality_scores.json not found; run `python -m src.pipeline.quality_scorer`",
        )
    try:
        with _QUALITY_SCORES_PATH.open(encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to read quality_scores.json: {exc}",
        ) from exc
    if not isinstance(data, dict):
        raise HTTPException(status_code=500, detail="quality_scores.json malformed")
    _QUALITY_CACHE = data
    return data


class BriefData(BaseModel):
    ticker: str
    name: str
    sector: str
    industry: str
    archetype_primary: str
    archetype_secondary: str
    voice_matrix: Optional[dict] = None
    color_primary: str
    colors: list[str]
    layer_count: int
    analysis_date: str
    data_confidence: str
    positioning_statement: str
    key_messages: list[str]
    top_channels: list[str]
    legal_risk_level: str
    financial_headline: str
    audience_segments: list[str] = []
    primary_persona: str = ""
    thesis: str = ""
    voice_summary: str = ""
    audience_anti: list[str] = []
    competitive_contrast: list[str] = []
    shadow_risk: str = ""


def _extract_section_text(text: str, *headers: str) -> str:
    for header in headers:
        pattern = rf'##\s+{re.escape(header)}\s*\n+(.*?)(?=\n##|\Z)'
        m = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        if m:
            content = m.group(1).strip()
            first_para = content.split('\n\n')[0].strip()
            first_para = re.sub(r'^>\s*', '', first_para, flags=re.MULTILINE)
            first_para = re.sub(r'^[-*]\s+', '', first_para)
            first_para = re.sub(r'\*+', '', first_para)
            return first_para.strip()[:200]
    return ""


def _extract_taglines(text: str) -> list[str]:
    """Extract slogans from Slogans & Taglines table (second column)."""
    m = re.search(r'##\s+Slogans[^#\n]*\n+(.*?)(?=\n##|\Z)', text, re.DOTALL | re.IGNORECASE)
    if m:
        rows = re.findall(r'^\|[^|]+\|\s*"([^"(]+)"', m.group(1), re.MULTILINE)
        if rows:
            return [r.strip() for r in rows[:3]]
    return []


def _extract_channels_from_table(text: str) -> list[str]:
    """Extract channel names from a Channel Matrix/Strategy table first column.

    Handles headings like '## Channel Matrix' and '## 1. Channel Strategy Matrix'.
    """
    m = re.search(
        r'##[^#\n]*Channel[^#\n]*Matrix[^#\n]*\n+(.*?)(?=\n##|\Z)',
        text,
        re.DOTALL | re.IGNORECASE,
    )
    if m:
        rows = re.findall(r'^\|\s*\*\*([^*|]+)\*\*', m.group(1), re.MULTILINE)
        if rows:
            cleaned = [re.sub(r'\s*\([^)]*\)', '', r).strip() for r in rows[:3]]
            return [c for c in cleaned if c]
    return []


def _extract_bullets(text: str, *headers: str, max_count: int = 3) -> list[str]:
    for header in headers:
        pattern = rf'##\s+{re.escape(header)}\s*\n+(.*?)(?=\n##|\Z)'
        m = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        if m:
            content = m.group(1)
            bullets = re.findall(r'^[-*]\s+(.+)', content, re.MULTILINE)
            cleaned = [b.split(':')[0].split('—')[0].strip() for b in bullets[:max_count]]
            return [c for c in cleaned if c]
    return []


def _extract_financial_headline(text: str) -> str:
    for line in text.splitlines():
        if 'revenue' in line.lower():
            m = re.search(r'\$[\d,\.]+\s*(?:billion|million|B|M)\b', line, re.IGNORECASE)
            if m:
                return f"Revenue: {m.group(0)}"
    return "See Layer 07 for financial data"


def _extract_legal_risk(text: str) -> str:
    m = re.search(r'(?:Risk level|Risk Level|Overall Risk)[^:\n]*:\s*(LOW|MEDIUM|HIGH)', text, re.IGNORECASE)
    if m:
        return m.group(1).upper()
    return "UNKNOWN"


def _extract_audience_segments(text: str) -> list[str]:
    """Extract persona names from Layer 02 Persona headings (## or ### level)."""
    # Matches: "## Persona 1 — The Specialty Prescriber" or "### Persona 1 — Maya, Creative Freelancer"
    # or "## Persona 1: The CIO Under Pressure"
    matches = re.findall(
        r'^#{2,3}\s+Persona\s+\d+\s*[—:\-]\s*(.+)',
        text,
        re.MULTILINE | re.IGNORECASE,
    )
    cleaned = [re.sub(r'\*+', '', m).split(',')[0].strip() for m in matches[:3]]
    return [c for c in cleaned if c]


def _extract_primary_persona(text: str) -> str:
    """Extract a readable ICP summary from Layer 02.

    Prefers a prose sentence over table markup. For table-format ICPs,
    extracts the 'Occupation segments' row value. Falls back to empty string.
    """
    raw = _extract_section_text(
        text,
        "Ideal Customer Profile (ICP)",
        "Ideal Customer Profile",
        "Primary Persona",
        "Core Customer",
        "Audience Overview",
    )
    if raw and not raw.startswith("|"):
        return raw[:150]
    # Table-format ICP: pull the Occupation segments cell
    m = re.search(
        r'\|\s*\*{0,2}Occupation segments?\*{0,2}\s*\|\s*([^|]+)',
        text,
        re.IGNORECASE,
    )
    if m:
        return m.group(1).strip()[:150]
    return ""


def _extract_thesis(text: str) -> str:
    """Extract brand raison d'etre quote from Layer 01."""
    m = re.search(r'##\s+Raison[^#\n]*\n+(.*?)(?=\n##|\Z)', text, re.DOTALL | re.IGNORECASE)
    if m:
        q = re.search(r'>\s*"([^"]{30,})"', m.group(1))
        if q:
            return q.group(1).strip()[:300]
    return ""


def _extract_voice_summary(text: str) -> str:
    """Extract voice summary line from Layer 01 Voice Matrix section."""
    m = re.search(r'\*\*Summary\*\*:\s*(.+?)(?=\n\n|\n---|\n##|\Z)', text, re.DOTALL | re.IGNORECASE)
    if m:
        summary = re.sub(r'\*+', '', m.group(1)).strip().split('\n')[0]
        return summary[:200]
    return ""


def _extract_audience_anti(text: str) -> list[str]:
    """Extract anti-persona types from Layer 02."""
    m = re.search(r'##\s+Anti.Persona[^#\n]*\n+(.*?)(?=\n##|\Z)', text, re.DOTALL | re.IGNORECASE)
    if m:
        rows = re.findall(r'^\|\s*\*\*([^*|]+)\*\*', m.group(1), re.MULTILINE)
        return [r.strip() for r in rows[:3] if r.strip()]
    return []


def _extract_competitive_contrast(text: str) -> list[str]:
    """Extract competitive positioning sentences from Layer 03."""
    results: list[str] = []
    pos_m = re.search(
        r"Apple['’]?s strategic position[^.]+\.[^.]+\.", text, re.IGNORECASE
    )
    if pos_m:
        results.append(re.sub(r'\*+', '', pos_m.group(0)).strip())
    contrasts = re.findall(
        r'\b(?:Samsung|Google|Microsoft|Meta|Tesla|Amazon)\b[^.\n]{0,80}competes[^.\n]+\.',
        text, re.IGNORECASE,
    )
    results.extend(re.sub(r'\*+', '', c).strip() for c in contrasts[:2])
    return results[:3]


def _extract_shadow_risk(text: str) -> str:
    """Extract shadow archetype risk from Layer 01 archetype table."""
    m = re.search(r'\|\s*\*\*Shadow\*\*\s*\|[^|]*\|\s*([^|]+)', text, re.IGNORECASE)
    if m:
        risk = re.sub(r'\*+|\([^)]+\)', '', m.group(1)).strip()
        return risk.split('.')[0].strip()[:200]
    return ""


def _read_layer_text(ticker_upper: str, layer_num: int) -> str:
    from ..services.brand_reader import _scan_brands, _parse_ticker
    dirs = _scan_brands()
    brand_dir = next((d for d in dirs if _parse_ticker(d).upper() == ticker_upper), None)
    if not brand_dir:
        return ""
    layer_path = brand_dir / "context" / LAYER_FILES[layer_num]
    if not layer_path.exists():
        return ""
    return layer_path.read_text(encoding="utf-8", errors="replace")


def _design_error(status_code: int, error: str, ticker: str | None = None) -> JSONResponse:
    payload: dict[str, str] = {"error": error}
    if ticker is not None:
        payload["ticker"] = ticker
    return JSONResponse(status_code=status_code, content=payload)


def _find_brand_dir(ticker: str) -> Path | None:
    ticker_upper = ticker.upper()
    return next((d for d in _scan_brands() if _parse_ticker(d).upper() == ticker_upper), None)


def _design_md_path_for_ticker(ticker: str) -> tuple[str, Path | None, Path | None]:
    ticker_upper = ticker.upper()
    brand_dir = _find_brand_dir(ticker_upper)
    if brand_dir is None:
        return ticker_upper, None, None
    return ticker_upper, brand_dir, brand_dir / "design-md" / "design-md.json"


def _load_design_md_response(ticker: str) -> tuple[dict | None, JSONResponse | None]:
    ticker_upper, _brand_dir, design_path = _design_md_path_for_ticker(ticker)
    if design_path is None:
        return None, _design_error(404, "Brand not found", ticker_upper)
    if not design_path.exists():
        return None, _design_error(404, "DESIGN.md not yet generated", ticker_upper)
    try:
        with design_path.open(encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError as exc:
        return None, _design_error(500, f"design-md.json malformed: {exc}", ticker_upper)
    except OSError as exc:
        return None, _design_error(500, f"Failed to read design-md.json: {exc}", ticker_upper)
    if not isinstance(data, dict):
        return None, _design_error(500, "design-md.json malformed", ticker_upper)
    return data, None


def _read_design_summary(ticker: str) -> dict:
    ticker_upper, _brand_dir, design_path = _design_md_path_for_ticker(ticker)
    if design_path is None or not design_path.exists():
        return {
            "has_design_md": False,
            "visual_archetype": "Unclassified",
            "design_readiness_grade": "STUB",
            "design_readiness_score": 0,
        }
    try:
        data = json.loads(design_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {
            "has_design_md": False,
            "visual_archetype": "Unclassified",
            "design_readiness_grade": "STUB",
            "design_readiness_score": 0,
        }
    if not isinstance(data, dict):
        return {
            "has_design_md": False,
            "visual_archetype": "Unclassified",
            "design_readiness_grade": "STUB",
            "design_readiness_score": 0,
        }
    return {
        "has_design_md": True,
        "visual_archetype": data.get("visual_archetype", "Unclassified"),
        "design_readiness_grade": data.get("design_readiness_grade", "STUB"),
        "design_readiness_score": data.get("design_readiness_score", 0),
    }


def _fallback_text(value: object, fallback: str) -> str:
    if isinstance(value, str) and value.strip():
        return value.strip()
    return fallback


def _bullet_list(values: object, fallback: str) -> str:
    if isinstance(values, list):
        items = [str(v).strip() for v in values if str(v).strip()]
        if items:
            return "\n".join(f"- {item}" for item in items)
    return fallback


def _design_md_to_markdown(data: dict) -> str:
    """Convert a BrandDesignMd dict into a 12-section DESIGN.md string."""
    ticker = _fallback_text(data.get("ticker"), "UNKNOWN")
    brand_name = _fallback_text(data.get("brand_name"), ticker)
    theme = data.get("visual_theme") if isinstance(data.get("visual_theme"), dict) else {}
    typography = data.get("typography_rules") if isinstance(data.get("typography_rules"), dict) else {}
    components = data.get("component_styling") if isinstance(data.get("component_styling"), dict) else {}
    market = data.get("market_visual_positioning") if isinstance(data.get("market_visual_positioning"), dict) else {}
    score_breakdown = data.get("score_breakdown") if isinstance(data.get("score_breakdown"), dict) else {}
    palette = data.get("color_palette") if isinstance(data.get("color_palette"), list) else []

    color_rows = []
    for color in palette:
        if not isinstance(color, dict):
            continue
        color_rows.append(
            "| {token} | {hex} | {role} | {usage} | {confidence} |".format(
                token=_fallback_text(color.get("token"), "token"),
                hex=_fallback_text(color.get("hex"), "#000000"),
                role=_fallback_text(color.get("role"), "unknown"),
                usage=_fallback_text(color.get("usage"), "No usage note provided."),
                confidence=_fallback_text(color.get("confidence"), "LOW"),
            )
        )
    color_table = "\n".join(color_rows) if color_rows else "| fallback | #000000 | surface | No palette available. | LOW |"

    component_lines = "\n".join(
        f"- **{key}**: {_fallback_text(components.get(key), 'No component guidance available.')}"
        for key in ("buttons", "cards", "navigation", "inputs", "charts")
    )

    typography_lines = "\n".join(
        f"- **{key}**: {_fallback_text(typography.get(key), 'No typography guidance available.')}"
        for key in ("heading", "body", "mono", "scale_notes", "weight_notes")
    )

    differentiators = market.get("visual_differentiators") if isinstance(market.get("visual_differentiators"), dict) else {}
    differentiator_lines = "\n".join(f"- **{k}**: {v}" for k, v in differentiators.items()) or "- No competitor differentiators available."

    breakdown_lines = "\n".join(f"- `{k}`: {v}" for k, v in score_breakdown.items()) or "- No score breakdown available."

    return f"""# {ticker} DESIGN.md — {brand_name}

## 1. Metadata

- Ticker: `{ticker}`
- Brand: {brand_name}
- Version: {_fallback_text(data.get("version"), "unknown")}
- Generated at: {_fallback_text(data.get("generated_at"), "unknown")}
- Source confidence: {_fallback_text(data.get("source_confidence"), "LOW")}
- Storage path: `{_fallback_text(data.get("storage_path"), "unknown")}`
- Product design-md: `{str(data.get("is_product_design_md", False)).lower()}`

## 2. Visual Theme

{_fallback_text(theme.get("summary"), "No visual theme summary available.")}

- Density: `{_fallback_text(theme.get("density"), "unknown")}`
- Surface model: `{_fallback_text(theme.get("surface_model"), "unknown")}`
- Color temperature: `{_fallback_text(theme.get("color_temperature"), "unknown")}`
- Keywords: {", ".join(theme.get("atmosphere_keywords", [])) if isinstance(theme.get("atmosphere_keywords"), list) else "No keywords available."}

## 3. Color Palette

| Token | Hex | Role | Usage | Confidence |
|---|---:|---|---|---|
{color_table}

## 4. Typography Rules

{typography_lines}

## 5. Component Styling

{component_lines}

## 6. Layout Principles

{_bullet_list(data.get("layout_principles"), "- No layout principles available.")}

## 7. Depth & Elevation

{_fallback_text(data.get("depth_elevation"), "No depth/elevation guidance available.")}

## 8. Do

{_bullet_list(data.get("dos"), "- No do-list available.")}

## 9. Don't

{_bullet_list(data.get("donts"), "- No don't-list available.")}

## 10. Responsive Behavior

{_fallback_text(data.get("responsive_behavior"), "No responsive guidance available.")}

## 11. Market Visual Positioning

{_fallback_text(market.get("quadrant_description"), "No market positioning available.")}

- Closest competitors: {", ".join(market.get("closest_competitors", [])) if isinstance(market.get("closest_competitors"), list) else "None listed."}
- Archetype context: {_fallback_text(market.get("archetype_market_context"), "No archetype market context available.")}

{differentiator_lines}

## 12. Legal & Usage Notice

{_fallback_text(data.get("legal_notice"), "No legal notice available.")}

{_fallback_text(data.get("legal_notice_addendum"), "")}

## Agent Prompt Guide

{_fallback_text(data.get("agent_prompt_guide"), "No agent prompt guide available.")}

## Design Readiness

- Archetype: `{_fallback_text(data.get("visual_archetype"), "Unclassified")}`
- Archetype confidence: `{_fallback_text(data.get("visual_archetype_confidence"), "LOW")}`
- Score: `{data.get("design_readiness_score", 0)}`
- Grade: `{_fallback_text(data.get("design_readiness_grade"), "STUB")}`

{breakdown_lines}
"""


@router.get("/health")
def health() -> dict:
    return {"status": "ok", "brands_count": len(_scan_brands())}


@router.get("/brands")
def brands_list(
    q: str = Query(default="", description="Search query"),
    sector: str = Query(default="", description="Sector filter"),
    archetype: str = Query(default="", description="Archetype filter"),
    limit: int = Query(default=48, ge=1, le=600),
    offset: int = Query(default=0, ge=0),
    has_design_md: bool | None = Query(default=None),
    design_readiness: str = Query(default=""),
    visual_archetype: str = Query(default=""),
) -> dict:
    needs_design_filter = has_design_md is not None or bool(design_readiness) or bool(visual_archetype)
    fetch_limit = 600 if needs_design_filter else limit
    fetch_offset = 0 if needs_design_filter else offset
    brands, total = list_brands(q=q, sector=sector, archetype=archetype, limit=fetch_limit, offset=fetch_offset)
    rows = []
    for b in brands:
        row = b.model_dump()
        row.update(_read_design_summary(row["ticker"]))
        rows.append(row)

    if has_design_md is not None:
        rows = [r for r in rows if bool(r["has_design_md"]) is has_design_md]
    if design_readiness:
        allowed = {g.strip().upper() for g in design_readiness.split(",") if g.strip()}
        rows = [r for r in rows if str(r["design_readiness_grade"]).upper() in allowed]
    if visual_archetype:
        rows = [r for r in rows if r["visual_archetype"] == visual_archetype]
    if needs_design_filter:
        total = len(rows)
        rows = rows[offset: offset + limit]

    return {"brands": rows, "total": total}


def _design_compare_entry(ticker: str) -> dict:
    data, error = _load_design_md_response(ticker)
    if error is not None or data is None:
        return {"has_design_md": False}
    theme = data.get("visual_theme") if isinstance(data.get("visual_theme"), dict) else {}
    palette = data.get("color_palette") if isinstance(data.get("color_palette"), list) else []
    primary = next(
        (c.get("hex") for c in palette if isinstance(c, dict) and c.get("role") == "primary"),
        None,
    )
    if not primary and palette and isinstance(palette[0], dict):
        primary = palette[0].get("hex")
    return {
        "has_design_md": True,
        "visual_archetype": data.get("visual_archetype", "Unclassified"),
        "color_temperature": theme.get("color_temperature", "neutral"),
        "density": theme.get("density", "medium"),
        "surface_model": theme.get("surface_model", "flat"),
        "primary_color": primary or "#6366F1",
        "design_readiness_score": data.get("design_readiness_score", 0),
        "design_readiness_grade": data.get("design_readiness_grade", "STUB"),
        "agent_prompt_guide": data.get("agent_prompt_guide", ""),
    }


@router.get("/brands/compare")
def brands_compare_alias(
    a: str = Query(...),
    b: str = Query(...),
    c: str | None = Query(default=None),
    d: str | None = Query(default=None),
) -> dict:
    """Compare brands with an explicit /brands namespace alias."""
    tickers = [a.upper(), b.upper()]
    if c:
        tickers.append(c.upper())
    if d:
        tickers.append(d.upper())
    brands = []
    for ticker in tickers:
        brand = get_brand(ticker)
        if not brand:
            raise HTTPException(status_code=404, detail=f"Brand {ticker} not found")
        brands.append(brand.model_dump())
    return {
        "brands": brands,
        "design_comparison": {ticker: _design_compare_entry(ticker) for ticker in tickers},
    }


@router.get("/brands/{ticker}/design-md", response_model=None)
def brand_design_md(ticker: str):
    """Return a generated 12-section DESIGN.md markdown string for a brand."""
    data, error = _load_design_md_response(ticker)
    if error is not None:
        return error
    assert data is not None
    return {
        "ticker": data.get("ticker", ticker.upper()),
        "format": "markdown",
        "version": data.get("version", "0.1"),
        "generated_at": data.get("generated_at", ""),
        "markdown": _design_md_to_markdown(data),
        "source_confidence": data.get("source_confidence", "LOW"),
        "design_readiness_score": data.get("design_readiness_score", 0),
        "design_readiness_grade": data.get("design_readiness_grade", "STUB"),
    }


@router.get("/brands/{ticker}/design-md.json", response_model=None)
def brand_design_md_json(ticker: str):
    """Return the raw BrandDesignMd JSON artifact for a brand."""
    data, error = _load_design_md_response(ticker)
    if error is not None:
        return error
    assert data is not None
    return data


@router.get("/brands/{ticker}/design-preview", response_model=None)
def brand_design_preview(ticker: str):
    """Return token/spec slices for preview catalog rendering."""
    data, error = _load_design_md_response(ticker)
    if error is not None:
        return error
    assert data is not None
    return {
        "ticker": data.get("ticker", ticker.upper()),
        "brand_name": data.get("brand_name", ""),
        "version": data.get("version", ""),
        "visual_archetype": data.get("visual_archetype", "Unclassified"),
        "design_readiness_score": data.get("design_readiness_score", 0),
        "design_readiness_grade": data.get("design_readiness_grade", "STUB"),
        "color_palette": data.get("color_palette", []),
        "typography_rules": data.get("typography_rules", {}),
        "component_styling": data.get("component_styling", {}),
    }


@router.get("/brands/{ticker}/layers/{num}")
def brand_layer(ticker: str, num: int) -> dict:
    result = get_layer(ticker, num)
    if not result:
        raise HTTPException(status_code=404, detail="Layer not found")
    return result


@router.get("/brands/{ticker}/brief")
def get_brand_brief(ticker: str) -> BriefData:
    ticker_upper = ticker.upper()
    detail = get_brand(ticker_upper)
    if not detail:
        raise HTTPException(status_code=404, detail="Brand not found")

    layer01 = _read_layer_text(ticker_upper, 1)
    layer02 = _read_layer_text(ticker_upper, 2)
    layer03 = _read_layer_text(ticker_upper, 3)
    layer06 = _read_layer_text(ticker_upper, 6)
    layer07 = _read_layer_text(ticker_upper, 7)
    layer08 = _read_layer_text(ticker_upper, 8)

    lc = sum(1 for layer in detail.layers if layer.available)
    confidence = "HIGH" if lc >= 8 else ("MEDIUM" if lc >= 6 else "LOW")

    vm_dict = None
    if detail.voice_matrix:
        vm_dict = {
            "formal_casual": detail.voice_matrix.formal_casual,
            "authority_peer": detail.voice_matrix.authority_peer,
            "emotional_rational": detail.voice_matrix.emotional_rational,
            "restrained_bold": detail.voice_matrix.restrained_bold,
        }

    return BriefData(
        ticker=detail.ticker,
        name=detail.name,
        sector=detail.sector,
        industry=detail.industry,
        archetype_primary=detail.archetype_primary or "",
        archetype_secondary=detail.archetype_secondary or "",
        voice_matrix=vm_dict,
        color_primary=detail.colors[0].hex if detail.colors else "",
        colors=[c.hex for c in detail.colors],
        layer_count=lc,
        analysis_date=detail.analysis_date or "",
        data_confidence=confidence,
        positioning_statement=_extract_section_text(
            layer01, "Brand Positioning", "Positioning Statement", "Brand Promise"
        ),
        key_messages=_extract_taglines(layer01) or _extract_bullets(
            layer01, "Key Messages", "Core Messages", "Brand Messages", "Required Words"
        ),
        top_channels=_extract_channels_from_table(layer06) or _extract_bullets(
            layer06, "Primary Channels", "Channel Strategy", "Channels", "Channel Matrix"
        ),
        legal_risk_level=_extract_legal_risk(layer08),
        financial_headline=_extract_financial_headline(layer07),
        audience_segments=_extract_audience_segments(layer02),
        primary_persona=_extract_primary_persona(layer02),
        thesis=_extract_thesis(layer01),
        voice_summary=_extract_voice_summary(layer01),
        audience_anti=_extract_audience_anti(layer02),
        competitive_contrast=_extract_competitive_contrast(layer03),
        shadow_risk=_extract_shadow_risk(layer01),
    )


@router.get("/brands/{ticker}")
def brand_detail(ticker: str) -> dict:
    brand = get_brand(ticker)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return brand.model_dump()


@router.get("/brands/{ticker}/quality")
def brand_quality(ticker: str) -> dict:
    """Return quality score for a brand (from data/quality_scores.json)."""
    scores = _load_quality_scores()
    record = scores.get(ticker.upper())
    if record is None:
        raise HTTPException(
            status_code=404,
            detail=f"No quality score for ticker {ticker.upper()}",
        )
    return record


@router.get("/analytics/quality-summary")
def quality_summary() -> dict:
    """Return aggregate quality stats across all brands."""
    scores = _load_quality_scores()
    total = len(scores)
    if total == 0:
        return {
            "total": 0,
            "avg_score": 0.0,
            "high": 0,
            "medium": 0,
            "low": 0,
            "distribution": {"HIGH": 0, "MEDIUM": 0, "LOW": 0},
        }
    score_values = [int(rec.get("score", 0)) for rec in scores.values()]
    high = sum(1 for s in score_values if s >= 80)
    medium = sum(1 for s in score_values if 60 <= s < 80)
    low = sum(1 for s in score_values if s < 60)
    avg = sum(score_values) / total
    return {
        "total": total,
        "avg_score": round(avg, 1),
        "high": high,
        "medium": medium,
        "low": low,
        "distribution": {"HIGH": high, "MEDIUM": medium, "LOW": low},
    }


@router.get("/analytics/design-systems")
def design_systems_summary() -> dict:
    """Return aggregate design-md readiness and archetype stats."""
    total_brands = len(_scan_brands())
    visual_archetypes: Counter[str] = Counter()
    readiness_distribution: Counter[str] = Counter()
    sector_archetypes: dict[str, Counter[str]] = defaultdict(Counter)
    readiness_leaderboard: list[dict] = []
    invalid_records: list[dict[str, str]] = []
    with_design_md = 0

    for brand_dir in _scan_brands():
        design_path = brand_dir / "design-md" / "design-md.json"
        if not design_path.exists():
            continue
        ticker = _parse_ticker(brand_dir)
        try:
            data = json.loads(design_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            invalid_records.append({"ticker": ticker, "error": str(exc)})
            continue
        if not isinstance(data, dict):
            invalid_records.append({"ticker": ticker, "error": "design-md.json malformed"})
            continue

        with_design_md += 1
        archetype = str(data.get("visual_archetype") or "Unclassified")
        grade = str(data.get("design_readiness_grade") or "STUB")
        score = int(data.get("design_readiness_score") or 0)
        sector = _SP500_META.get(ticker, {}).get("sector", "Unknown") or "Unknown"

        visual_archetypes[archetype] += 1
        readiness_distribution[grade] += 1
        sector_archetypes[sector][archetype] += 1
        readiness_leaderboard.append({
            "ticker": ticker,
            "brand_name": data.get("brand_name", ticker),
            "score": score,
            "grade": grade,
            "visual_archetype": archetype,
            "sector": sector,
        })

    missing_count = max(total_brands - with_design_md, 0)
    if missing_count:
        visual_archetypes["Unclassified"] += missing_count
        readiness_distribution["STUB"] += missing_count
    readiness_leaderboard.sort(key=lambda row: int(row["score"]), reverse=True)

    return {
        "coverage": {
            "total": total_brands,
            "with_design_md": with_design_md,
            "without_design_md": missing_count,
            "by_grade": dict(readiness_distribution),
        },
        "visual_archetypes": [
            {"archetype": archetype, "count": count}
            for archetype, count in visual_archetypes.most_common()
        ],
        "readiness_distribution": [
            {"grade": grade, "count": count}
            for grade, count in readiness_distribution.most_common()
        ],
        "sector_matrix": [
            {
                "sector": sector,
                "dominant_archetype": counter.most_common(1)[0][0],
                "count": sum(counter.values()),
            }
            for sector, counter in sorted(sector_archetypes.items())
            if counter
        ],
        "readiness_leaderboard": readiness_leaderboard[:10],
        "invalid_records": invalid_records,
    }
