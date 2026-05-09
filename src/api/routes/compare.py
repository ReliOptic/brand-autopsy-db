"""Compare route."""
import json

from fastapi import APIRouter, HTTPException, Query
from ..services.brand_reader import get_brand, _scan_brands, _parse_ticker

router = APIRouter(prefix="/api")


def _design_compare_entry(ticker: str) -> dict:
    brand_dir = next((d for d in _scan_brands() if _parse_ticker(d).upper() == ticker), None)
    if brand_dir is None:
        return {"has_design_md": False}
    design_path = brand_dir / "design-md" / "design-md.json"
    if not design_path.exists():
        return {"has_design_md": False}
    try:
        data = json.loads(design_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {"has_design_md": False}
    if not isinstance(data, dict):
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


@router.get("/compare")
def compare(
    a: str = Query(...),
    b: str = Query(...),
    c: str | None = Query(default=None),
    d: str | None = Query(default=None),
) -> dict:
    tickers = [a.upper(), b.upper()]
    if c:
        tickers.append(c.upper())
    if d:
        tickers.append(d.upper())
    brands = []
    for t in tickers:
        brand = get_brand(t)
        if not brand:
            raise HTTPException(status_code=404, detail=f"Brand {t} not found")
        brands.append(brand.model_dump())
    return {
        "brands": brands,
        "design_comparison": {ticker: _design_compare_entry(ticker) for ticker in tickers},
    }
