"""Brand routes."""
import json
import re
from typing import Optional
from pathlib import Path
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from ..services.brand_reader import list_brands, get_brand, get_layer, _scan_brands, BRANDS_DIR, LAYER_FILES

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
) -> dict:
    brands, total = list_brands(q=q, sector=sector, archetype=archetype, limit=limit, offset=offset)
    return {"brands": [b.model_dump() for b in brands], "total": total}


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
