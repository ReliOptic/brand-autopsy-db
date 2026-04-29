"""Shared test fixtures.

Brand directory + XBRL fact set builders are exposed as factories so
each test composes only the layers it needs (avoid coupling unit tests
to the full 8-layer scaffold).
"""
from __future__ import annotations

import sys
from pathlib import Path
from typing import Any, Callable

import pytest

PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))


@pytest.fixture
def make_brand_dir(tmp_path: Path) -> Callable[..., Path]:
    """Factory that builds a TICKER_Name brand dir with the requested layer files.

    Usage:
        brand = make_brand_dir(
            ticker="AAPL",
            name="Apple-Inc",
            layers={1: "# Brand Identity\\n...", 7: "# Financial Anatomy\\n..."},
        )
    """
    layer_filenames: dict[int, str] = {
        1: "01-brand-identity.md",
        2: "02-audience-map.md",
        3: "03-competitive-landscape.md",
        4: "04-content-dna.md",
        5: "05-design-system.md",
        6: "06-channel-playbook.md",
        7: "07-financial-anatomy.md",
        8: "08-legal-review.md",
    }

    def _build(ticker: str = "TEST", name: str = "Test-Co", layers: dict[int, str] | None = None) -> Path:
        brand_dir = tmp_path / "brands" / f"{ticker}_{name}"
        context = brand_dir / "context"
        context.mkdir(parents=True, exist_ok=True)
        for num, content in (layers or {}).items():
            if num not in layer_filenames:
                raise ValueError(f"unknown layer number: {num}")
            (context / layer_filenames[num]).write_text(content, encoding="utf-8")
        return brand_dir

    return _build


@pytest.fixture
def make_xbrl_fact() -> Callable[..., dict[str, Any]]:
    """Factory for a single SEC company-facts entry.

    Default builds a duration fact (income statement). Pass start=None
    to build an instant fact (balance sheet).
    """

    def _build(
        end: str,
        val: float | int,
        start: str | None = None,
        fy: int | None = None,
        fp: str = "FY",
        form: str = "10-K",
        filed: str = "2024-02-01",
    ) -> dict[str, Any]:
        out: dict[str, Any] = {
            "end": end,
            "val": val,
            "fy": fy if fy is not None else int(end[:4]),
            "fp": fp,
            "form": form,
            "filed": filed,
        }
        if start is not None:
            out["start"] = start
        return out

    return _build


@pytest.fixture
def make_xbrl_concept(make_xbrl_fact: Callable[..., dict[str, Any]]) -> Callable[..., dict[str, Any]]:
    """Wraps facts into the {us-gaap: {Concept: {units: {USD: [...]}}}} envelope."""

    def _build(concept: str, facts: list[dict[str, Any]], unit: str = "USD") -> dict[str, Any]:
        return {
            "us-gaap": {
                concept: {"units": {unit: facts}},
            },
        }

    # Re-expose make_xbrl_fact via attribute for convenience in tests
    _build.fact = make_xbrl_fact  # type: ignore[attr-defined]
    return _build
