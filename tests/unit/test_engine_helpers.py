"""Engine helper tests: pure functions in src/analyzer/engine.py.

AnalysisEngine itself requires a live Anthropic API key and is tested
via integration tests. This file covers the pure, filesystem-free helpers
that are safe to unit-test directly.
"""
from __future__ import annotations

import pytest

from src.analyzer.engine import _slugify_brand_name


# ---- _slugify_brand_name -----------------------------------------------------


def test_simple_two_word_name() -> None:
    assert _slugify_brand_name("Apple Inc") == "Apple-Inc"


def test_punctuation_becomes_hyphen() -> None:
    assert _slugify_brand_name("Amazon.com Inc.") == "Amazon-com-Inc"


def test_ampersand_and_spaces_collapsed() -> None:
    # "S&P 500" → non-alnum chars all become single hyphens
    assert _slugify_brand_name("S&P 500") == "S-P-500"


def test_multiple_consecutive_specials_collapsed() -> None:
    # Multiple non-alnum runs become a single hyphen
    assert _slugify_brand_name("A  B  C") == "A-B-C"


def test_leading_trailing_specials_stripped() -> None:
    assert _slugify_brand_name("  Apple  ") == "Apple"


def test_empty_string_returns_unknown_brand() -> None:
    assert _slugify_brand_name("") == "Unknown-Brand"


def test_all_special_chars_returns_unknown_brand() -> None:
    assert _slugify_brand_name("!@#$%^&*") == "Unknown-Brand"


def test_preserves_mixed_case() -> None:
    assert _slugify_brand_name("Berkshire Hathaway Inc") == "Berkshire-Hathaway-Inc"


def test_alphanumeric_only_unchanged() -> None:
    assert _slugify_brand_name("AAPL") == "AAPL"


def test_numbers_preserved() -> None:
    assert _slugify_brand_name("3M Company") == "3M-Company"


# ---- AnalysisEngine init guard -----------------------------------------------


def test_engine_raises_without_api_key(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)
    from src.analyzer.engine import AnalysisEngine
    with pytest.raises(ValueError, match="ANTHROPIC_API_KEY"):
        AnalysisEngine()
