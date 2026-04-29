"""Freshness classification + analysis-date extraction tests.

`track_brand`/`track_all` accept a `now=` parameter, so all time-based
boundaries are deterministic without freezegun.
"""
from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Callable

import pytest

from src.pipeline.freshness_tracker import (
    AGING_DAYS,
    FRESH_DAYS,
    FreshnessRecord,
    _extract_analysis_date,
    track_all,
    track_brand,
)

NOW = datetime(2026, 4, 30, 12, 0, 0, tzinfo=timezone.utc)


def _set_layer_mtime(path: Path, days_ago: int) -> None:
    target = NOW - timedelta(days=days_ago)
    ts = target.timestamp()
    os.utime(path, (ts, ts))


def test_classifies_recent_brand_as_fresh(make_brand_dir: Callable[..., Path]) -> None:
    brand = make_brand_dir(layers={1: "# x"})
    _set_layer_mtime(brand / "context" / "01-brand-identity.md", days_ago=10)

    rec = track_brand(brand, now=NOW)

    assert rec is not None
    assert rec.status == "FRESH"
    assert rec.days_since_update == 10


@pytest.mark.parametrize(
    ("days_ago", "expected"),
    [
        (FRESH_DAYS - 1, "FRESH"),    # boundary just under
        (FRESH_DAYS, "AGING"),         # boundary
        (AGING_DAYS - 1, "AGING"),     # boundary just under
        (AGING_DAYS, "STALE"),         # boundary
        (AGING_DAYS + 30, "STALE"),    # well past
    ],
)
def test_status_thresholds_at_boundaries(
    make_brand_dir: Callable[..., Path],
    days_ago: int,
    expected: str,
) -> None:
    brand = make_brand_dir(layers={1: "x"})
    _set_layer_mtime(brand / "context" / "01-brand-identity.md", days_ago=days_ago)

    rec = track_brand(brand, now=NOW)

    assert rec is not None
    assert rec.status == expected


def test_returns_none_when_no_layers_present(tmp_path: Path) -> None:
    brand = tmp_path / "brands" / "EMPTY_Co"
    (brand / "context").mkdir(parents=True)
    assert track_brand(brand, now=NOW) is None


def test_uses_newest_mtime_for_status_oldest_for_meta(
    make_brand_dir: Callable[..., Path],
) -> None:
    # Layer 01 is fresh (5 days), Layer 07 is stale (220 days).
    # Status reflects the freshest layer; metadata exposes both extremes.
    brand = make_brand_dir(layers={1: "x", 7: "y"})
    _set_layer_mtime(brand / "context" / "01-brand-identity.md", days_ago=5)
    _set_layer_mtime(brand / "context" / "07-financial-anatomy.md", days_ago=220)

    rec = track_brand(brand, now=NOW)

    assert rec is not None
    assert rec.status == "FRESH"
    assert rec.days_since_update == 5
    payload = rec.to_dict()
    assert payload["oldest_mtime"].startswith("2025")  # ~220 days before 2026-04-30
    assert payload["newest_mtime"].startswith("2026")


def test_extracts_analysis_date_from_front_matter() -> None:
    text = "---\nanalysis_date: 2026-03-15\nticker: AAPL\n---\n\n# Brand\n"
    assert _extract_analysis_date(text) == "2026-03-15"


def test_extracts_analysis_date_from_doc_header_when_no_front_matter() -> None:
    text = "# Brand Identity\n\nAnalysis date: 2025-11-01\nMore content...\n"
    assert _extract_analysis_date(text) == "2025-11-01"


def test_extracts_iso_date_fallback_in_header() -> None:
    text = "# Brand Identity\nGenerated 2025-09-15 from public data.\n"
    assert _extract_analysis_date(text) == "2025-09-15"


def test_extract_analysis_date_returns_none_when_absent() -> None:
    assert _extract_analysis_date("# Brand Identity\nNo dates here.\n") is None
    assert _extract_analysis_date("") is None


def test_track_all_aggregates_multi_brand(
    tmp_path: Path,
    make_brand_dir: Callable[..., Path],
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    # track_all reads from BRANDS_DIR; the fixture creates dirs under tmp_path/brands.
    # We re-point BRANDS_DIR to the tmp parent so the scanner finds them.
    monkeypatch.setattr(
        "src.pipeline.freshness_tracker.BRANDS_DIR",
        tmp_path / "brands",
    )
    aapl = make_brand_dir(ticker="AAPL", name="Apple-Inc", layers={1: "x"})
    msft = make_brand_dir(ticker="MSFT", name="Microsoft-Corp", layers={1: "y"})
    _set_layer_mtime(aapl / "context" / "01-brand-identity.md", days_ago=5)
    _set_layer_mtime(msft / "context" / "01-brand-identity.md", days_ago=200)

    records = track_all(now=NOW)

    assert set(records.keys()) == {"AAPL", "MSFT"}
    assert records["AAPL"].status == "FRESH"
    assert records["MSFT"].status == "STALE"


def test_track_all_returns_empty_when_brands_dir_missing(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        "src.pipeline.freshness_tracker.BRANDS_DIR",
        tmp_path / "does" / "not" / "exist",
    )
    assert track_all(now=NOW) == {}


def test_freshness_record_to_dict_round_trip(
    make_brand_dir: Callable[..., Path],
) -> None:
    brand = make_brand_dir(layers={1: "x"})
    _set_layer_mtime(brand / "context" / "01-brand-identity.md", days_ago=12)
    rec = track_brand(brand, now=NOW)
    assert rec is not None
    assert isinstance(rec, FreshnessRecord)

    payload = rec.to_dict()

    assert payload["ticker"] == rec.ticker
    assert payload["status"] == "FRESH"
    assert payload["days_since_update"] == 12
    assert payload["newest_mtime"].endswith("Z")
    assert payload["oldest_mtime"].endswith("Z")
