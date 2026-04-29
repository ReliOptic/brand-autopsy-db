"""Smoke tests: verify the test harness, fixtures, and core imports work."""
from __future__ import annotations

from pathlib import Path
from typing import Any, Callable


def test_pytest_runs() -> None:
    assert True


def test_core_modules_importable() -> None:
    from src.analyzer import legal_validator
    from src.api.services import brand_reader
    from src.crawler import sec_fetcher
    from src.pipeline import freshness_tracker, quality_scorer

    assert all(m is not None for m in (
        legal_validator, brand_reader, sec_fetcher, freshness_tracker, quality_scorer,
    ))


def test_make_brand_dir_fixture(make_brand_dir: Callable[..., Path]) -> None:
    brand = make_brand_dir(
        ticker="AAPL",
        name="Apple-Inc",
        layers={1: "# Brand Identity\nApple positioning.\n", 7: "# Financial Anatomy\n$100B revenue.\n"},
    )
    assert brand.is_dir()
    assert (brand / "context" / "01-brand-identity.md").read_text().startswith("# Brand Identity")
    assert (brand / "context" / "07-financial-anatomy.md").exists()
    assert not (brand / "context" / "08-legal-review.md").exists()


def test_make_xbrl_fact_fixture(make_xbrl_fact: Callable[..., dict[str, Any]]) -> None:
    duration_fact = make_xbrl_fact(start="2023-01-01", end="2023-12-31", val=100)
    assert duration_fact["start"] == "2023-01-01"
    assert duration_fact["fy"] == 2023
    assert duration_fact["form"] == "10-K"

    instant_fact = make_xbrl_fact(end="2023-12-31", val=500)
    assert "start" not in instant_fact
    assert instant_fact["val"] == 500
