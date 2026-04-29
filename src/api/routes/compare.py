"""Compare route."""
from fastapi import APIRouter, HTTPException, Query
from ..services.brand_reader import get_brand

router = APIRouter(prefix="/api")


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
    return {"brands": brands}
