"""Quality scoring tests: score formula + per-metric extraction.

The score weights live in QualityMetrics._compute and changing them silently
shifts every brand's admin/inventory readout — these tests lock the contract.
"""
from __future__ import annotations

from pathlib import Path
from typing import Callable

import pytest

from src.pipeline.quality_scorer import (
    QualityMetrics,
    _extract_hex_colors,
    _has_financial_data,
    _has_legal_risk_level,
    _has_positioning_statement,
    _voice_matrix_complete,
    score_all,
    score_brand,
)


# ---- _compute: score formula ---------------------------------------------------


def _metrics(
    layers: int = 0,
    voice: bool = False,
    colors: int = 0,
    positioning: bool = False,
    financial: bool = False,
    legal: bool = False,
) -> QualityMetrics:
    return QualityMetrics(
        ticker="X",
        layer_count=layers,
        voice_matrix_complete=voice,
        color_count=colors,
        has_positioning_statement=positioning,
        has_financial_data=financial,
        has_legal_risk_level=legal,
    )


def test_score_zero_for_empty_brand() -> None:
    assert _metrics().score == 0


def test_score_full_brand_caps_at_100() -> None:
    full = _metrics(layers=8, voice=True, colors=10, positioning=True, financial=True, legal=True)
    # 80 + 5 + 6 (color cap) + 4 + 3 + 2 = 100
    assert full.score == 100


def test_layer_count_weight_is_10_per_layer_capped_at_8() -> None:
    assert _metrics(layers=1).score == 10
    assert _metrics(layers=8).score == 80
    assert _metrics(layers=12).score == 80  # capped


def test_color_count_capped_at_3_visible() -> None:
    # Each of the first 3 colors is worth 2 points; further colors do not score.
    assert _metrics(colors=1).score == 2
    assert _metrics(colors=3).score == 6
    assert _metrics(colors=20).score == 6


@pytest.mark.parametrize(
    ("flag_kwargs", "expected_points"),
    [
        ({"voice": True}, 5),
        ({"positioning": True}, 4),
        ({"financial": True}, 3),
        ({"legal": True}, 2),
    ],
)
def test_individual_flag_weights(
    flag_kwargs: dict[str, bool], expected_points: int,
) -> None:
    assert _metrics(**flag_kwargs).score == expected_points


# ---- text extractors ----------------------------------------------------------


def test_extract_hex_colors_dedupes_and_uppercases() -> None:
    text = "Primary #abc123 secondary #ABC123 accent #DEF456 again #def456 #abc123"
    assert _extract_hex_colors(text) == ["#ABC123", "#DEF456"]


def test_extract_hex_colors_ignores_3_digit_shorthand_and_garbage() -> None:
    # Spec is 6-digit only — short form (#abc) and 7-digit (#aabbccdd) are not extracted as full hex.
    text = "Try #abc and #aabbccdd and ##aabbcc"
    out = _extract_hex_colors(text)
    assert "#aabbcc".upper() in out  # the trailing 6-digit substring still matches
    assert "#ABC" not in out


def test_voice_matrix_complete_requires_all_four_axes() -> None:
    full = (
        "| Formal ↔ Casual | example | 7/10 |\n"
        "| Authority ↔ Peer | example | 4/10 |\n"
        "| Emotional ↔ Rational | example | 6/10 |\n"
        "| Restrained ↔ Bold | example | 8/10 |\n"
    )
    assert _voice_matrix_complete(full) is True

    missing_axis = (
        "| Formal ↔ Casual | example | 7/10 |\n"
        "| Authority ↔ Peer | example | 4/10 |\n"
        "| Emotional ↔ Rational | example | 6/10 |\n"
        # restrained-bold missing
    )
    assert _voice_matrix_complete(missing_axis) is False


def test_voice_matrix_zero_value_disqualifies() -> None:
    text = (
        "| Formal ↔ Casual | x | 7/10 |\n"
        "| Authority ↔ Peer | x | 0/10 |\n"
        "| Emotional ↔ Rational | x | 6/10 |\n"
        "| Restrained ↔ Bold | x | 8/10 |\n"
    )
    assert _voice_matrix_complete(text) is False


def test_has_positioning_statement_recognises_alias_headers() -> None:
    assert _has_positioning_statement("## Positioning Statement\nHelp the helpers.\n## Next") is True
    assert _has_positioning_statement("## Brand Promise\nMake it simple.\n## Other") is True
    assert _has_positioning_statement("## Random Header\nNothing useful.\n") is False


def test_has_financial_data_matches_dollar_amounts() -> None:
    assert _has_financial_data("Revenue was $50 billion in FY2023.") is True
    assert _has_financial_data("Operating income reached $1,234.5M.") is True
    assert _has_financial_data("Cash position: $500.") is True
    assert _has_financial_data("No financial data available.") is False


def test_has_legal_risk_level_requires_explicit_marker() -> None:
    assert _has_legal_risk_level("Risk Level: HIGH") is True
    assert _has_legal_risk_level("Overall Risk Score: MEDIUM") is True
    assert _has_legal_risk_level("Risk level: low") is True
    assert _has_legal_risk_level("Various legal risks discussed below.") is False


# ---- score_brand integration --------------------------------------------------


def test_score_brand_resolves_ticker_and_aggregates_layers(
    make_brand_dir: Callable[..., Path],
) -> None:
    layer1 = (
        "## Positioning Statement\n"
        "We empower the helpers.\n\n"
        "| Formal ↔ Casual | x | 7/10 |\n"
        "| Authority ↔ Peer | x | 4/10 |\n"
        "| Emotional ↔ Rational | x | 6/10 |\n"
        "| Restrained ↔ Bold | x | 8/10 |\n"
    )
    layer5 = "Primary #1A2B3C, secondary #DEFABC, accent #112233"
    layer7 = "Revenue was $100 billion in FY2023."
    layer8 = "Risk Level: LOW"
    brand = make_brand_dir(
        ticker="AAPL",
        name="Apple-Inc",
        layers={1: layer1, 5: layer5, 7: layer7, 8: layer8},
    )

    metrics = score_brand(brand)

    assert metrics.ticker == "AAPL"
    assert metrics.layer_count == 4
    assert metrics.voice_matrix_complete is True
    assert metrics.color_count == 3
    assert metrics.has_positioning_statement is True
    assert metrics.has_financial_data is True
    assert metrics.has_legal_risk_level is True
    # 4*10 + 5 + 6 + 4 + 3 + 2 = 60
    assert metrics.score == 60


def test_score_all_skips_dirs_without_context(
    tmp_path: Path,
    make_brand_dir: Callable[..., Path],
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr("src.pipeline.quality_scorer.BRANDS_DIR", tmp_path / "brands")
    make_brand_dir(ticker="AAPL", name="Apple-Inc", layers={1: "x"})
    # Stray directory without context/ — must be ignored, not crash.
    (tmp_path / "brands" / "STRAY_Co").mkdir()

    scores = score_all()

    assert set(scores.keys()) == {"AAPL"}
    assert scores["AAPL"].layer_count == 1


def test_to_dict_omits_internal_fields(
    make_brand_dir: Callable[..., Path],
) -> None:
    brand = make_brand_dir(ticker="X", name="X-Co", layers={1: "x"})
    metrics = score_brand(brand)

    payload = metrics.to_dict()

    assert set(payload.keys()) == {
        "ticker",
        "score",
        "layer_count",
        "voice_matrix_complete",
        "color_count",
        "has_positioning_statement",
        "has_financial_data",
        "has_legal_risk_level",
    }
