"""Analytics routes — archetype distribution, voice similarity, sector stats."""
from __future__ import annotations
import json
import math
from collections import Counter, defaultdict
from pathlib import Path
from typing import Optional
from fastapi import APIRouter, HTTPException
from ..services.brand_reader import (
    _scan_brands,
    _parse_ticker,
    _parse_name,
    _extract_archetype,
    _extract_voice_matrix,
    LAYER_FILES,
    _SP500_META,
)

router = APIRouter(prefix="/api")

_FRESHNESS_PATH = Path(__file__).parent.parent.parent.parent / "data" / "freshness.json"
_FRESHNESS_CACHE: Optional[dict[str, dict]] = None


def _load_freshness() -> dict[str, dict]:
    """Load (and cache) freshness.json. Raises 404 if file missing."""
    global _FRESHNESS_CACHE
    if _FRESHNESS_CACHE is not None:
        return _FRESHNESS_CACHE
    if not _FRESHNESS_PATH.exists():
        raise HTTPException(
            status_code=404,
            detail="freshness.json not found; run `python -m src.pipeline.freshness_tracker`",
        )
    try:
        with _FRESHNESS_PATH.open(encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to read freshness.json: {exc}",
        ) from exc
    if not isinstance(data, dict):
        raise HTTPException(status_code=500, detail="freshness.json malformed")
    _FRESHNESS_CACHE = data
    return data


def _get_all_brand_data() -> list[dict]:
    """Return ticker, name, sector, archetype_primary for every brand."""
    results: list[dict] = []
    for d in _scan_brands():
        ticker = _parse_ticker(d)
        name = _parse_name(d)
        meta = _SP500_META.get(ticker, {})
        sector = meta.get("sector", "")
        arch_primary = ""
        identity_path = d / "context" / LAYER_FILES[1]
        if identity_path.exists():
            identity_md = identity_path.read_text(encoding="utf-8", errors="replace")
            arch_primary, _ = _extract_archetype(identity_md)
        results.append({"ticker": ticker, "name": name, "sector": sector, "archetype": arch_primary or "Unknown"})
    return results


@router.get("/analytics/archetypes")
def archetypes_distribution() -> dict:
    brands = _get_all_brand_data()
    total = len(brands)

    archetype_counter: Counter[str] = Counter()
    archetype_sectors: dict[str, set[str]] = defaultdict(set)
    by_sector: dict[str, Counter[str]] = defaultdict(Counter)

    for b in brands:
        arch = b["archetype"]
        sect = b["sector"] or "Unknown"
        archetype_counter[arch] += 1
        if sect:
            archetype_sectors[arch].add(sect)
        by_sector[sect][arch] += 1

    archetypes = [
        {
            "archetype": arch,
            "count": count,
            "percentage": round(count / total * 100, 1) if total else 0.0,
            "sectors": sorted(archetype_sectors[arch]),
        }
        for arch, count in archetype_counter.most_common()
    ]

    return {
        "total_brands": total,
        "archetypes": archetypes,
        "by_sector": {sect: dict(counter) for sect, counter in sorted(by_sector.items())},
    }


def _cosine_similarity(v1: list[float], v2: list[float]) -> float:
    dot = sum(a * b for a, b in zip(v1, v2))
    mag1 = math.sqrt(sum(a * a for a in v1))
    mag2 = math.sqrt(sum(b * b for b in v2))
    if mag1 == 0 or mag2 == 0:
        return 0.0
    return dot / (mag1 * mag2)


def _voice_to_vector(vm: object) -> list[float] | None:
    vals = [vm.formal_casual, vm.authority_peer, vm.emotional_rational, vm.restrained_bold]  # type: ignore[attr-defined]
    if any(v is None for v in vals):
        return None
    return [float(v) for v in vals]


@router.get("/analytics/voice-similarity/{ticker}")
def voice_similarity(ticker: str) -> dict:
    ticker_upper = ticker.upper()
    target_dir = next(
        (d for d in _scan_brands() if _parse_ticker(d).upper() == ticker_upper),
        None,
    )
    if not target_dir:
        raise HTTPException(status_code=404, detail=f"Brand not found: {ticker_upper}")

    target_identity = target_dir / "context" / LAYER_FILES[1]
    if not target_identity.exists():
        raise HTTPException(status_code=404, detail="identity.md not found for this brand")

    target_md = target_identity.read_text(encoding="utf-8", errors="replace")
    target_vm = _extract_voice_matrix(target_md)
    if not target_vm:
        raise HTTPException(status_code=422, detail="Voice matrix not available for this brand")

    target_vec = _voice_to_vector(target_vm)
    if not target_vec:
        raise HTTPException(status_code=422, detail="Incomplete voice matrix for this brand")

    candidates: list[dict] = []
    for d in _scan_brands():
        t = _parse_ticker(d)
        if t.upper() == ticker_upper:
            continue
        ip = d / "context" / LAYER_FILES[1]
        if not ip.exists():
            continue
        md = ip.read_text(encoding="utf-8", errors="replace")
        vm = _extract_voice_matrix(md)
        if not vm:
            continue
        vec = _voice_to_vector(vm)
        if not vec:
            continue
        sim = _cosine_similarity(target_vec, vec)
        candidates.append({
            "ticker": t,
            "name": _parse_name(d),
            "similarity": round(sim, 4),
            "voice_matrix": vm.model_dump(),
        })

    candidates.sort(key=lambda x: x["similarity"], reverse=True)
    return {
        "ticker": ticker_upper,
        "voice_matrix": target_vm.model_dump(),
        "similar_brands": candidates[:10],
    }


@router.get("/analytics/positioning")
async def brand_positioning(sector: str = "") -> dict:
    """섹터 내 브랜드 Voice Matrix 포지셔닝 맵 데이터."""
    from ..services.brand_reader import (
        _get_cached_summaries,
        _parse_ticker,
    )
    summaries = _get_cached_summaries()
    filtered = [
        b for b in summaries
        if not sector or sector.lower() in b.sector.lower()
    ]
    dirs = {_parse_ticker(d): d for d in _scan_brands()}
    points = []
    for b in filtered:
        brand_dir = dirs.get(b.ticker)
        if not brand_dir:
            continue
        identity_path = brand_dir / "context" / LAYER_FILES[1]
        if not identity_path.exists():
            continue
        try:
            vm = _extract_voice_matrix(identity_path.read_text(encoding="utf-8", errors="replace"))
        except Exception:
            vm = None
        if not vm or vm.formal_casual is None or vm.authority_peer is None:
            continue
        points.append({
            "ticker": b.ticker,
            "name": b.name,
            "sector": b.sector,
            "archetype": b.archetype_primary,
            "color": b.color_primary or "#6366F1",
            "formal_casual": vm.formal_casual,
            "authority_peer": vm.authority_peer,
            "emotional_rational": vm.emotional_rational,
            "restrained_bold": vm.restrained_bold,
        })
    return {"sector": sector, "count": len(points), "points": points}


@router.get("/analytics/sectors")
def sectors_summary() -> dict:
    brands = _get_all_brand_data()

    sector_tickers: dict[str, list[str]] = defaultdict(list)
    sector_archetypes: dict[str, list[str]] = defaultdict(list)

    for b in brands:
        sect = b["sector"] or "Unknown"
        sector_tickers[sect].append(b["ticker"])
        sector_archetypes[sect].append(b["archetype"])

    sectors = []
    for sect in sorted(sector_tickers):
        arch_counts = Counter(sector_archetypes[sect])
        top_archetypes = [a for a, _ in arch_counts.most_common(3) if a != "Unknown"]
        sectors.append({
            "sector": sect,
            "count": len(sector_tickers[sect]),
            "top_archetypes": top_archetypes,
            "tickers_sample": sorted(sector_tickers[sect])[:3],
        })

    return {"sectors": sectors}


@router.get("/analytics/freshness-summary")
def freshness_summary() -> dict:
    """Return freshness distribution (FRESH/AGING/STALE) across all brands."""
    records = _load_freshness()
    total = len(records)
    if total == 0:
        return {
            "total": 0,
            "fresh": 0,
            "aging": 0,
            "stale": 0,
            "distribution": {"FRESH": 0, "AGING": 0, "STALE": 0},
        }
    fresh = sum(1 for r in records.values() if r.get("status") == "FRESH")
    aging = sum(1 for r in records.values() if r.get("status") == "AGING")
    stale = sum(1 for r in records.values() if r.get("status") == "STALE")
    return {
        "total": total,
        "fresh": fresh,
        "aging": aging,
        "stale": stale,
        "distribution": {"FRESH": fresh, "AGING": aging, "STALE": stale},
    }
