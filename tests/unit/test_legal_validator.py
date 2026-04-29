"""Legal validator tests.

The validator is the last gate before brand markdown ships, so every
prohibited-expression rule needs explicit positive AND negative coverage.
A regression here means defamation/IP exposure for the project — these
tests are the contract.
"""
from __future__ import annotations

import pytest

from src.analyzer.legal_validator import (
    ValidationReport,
    validate_markdown,
)


DISCLAIMER = (
    "> **Disclaimer**: This is brand strategy analysis based on publicly "
    "available information. Not investment, legal, or financial advice.\n"
)
SOURCE = "Revenue grew 12% (SEC 10-K).\n"


def _content(*sections: str) -> str:
    """Compose a minimal compliant doc + the test sections."""
    return DISCLAIMER + SOURCE + "".join(sections)


def _has_error_for(report: ValidationReport, category: str) -> bool:
    return any(i.severity == "error" and i.category == category for i in report.issues)


def _has_warning_for(report: ValidationReport, category: str) -> bool:
    return any(i.severity == "warning" and i.category == category for i in report.issues)


# ---- baseline -----------------------------------------------------------------


def test_clean_document_passes() -> None:
    report = validate_markdown(_content("This is a clean line.\n"))
    assert report.passed is True
    assert not any(i.severity == "error" for i in report.issues)


# ---- Korean characters --------------------------------------------------------


def test_korean_characters_blocked() -> None:
    report = validate_markdown(_content("이 문장은 한국어입니다.\n"))
    assert report.passed is False
    assert _has_error_for(report, "korean")


def test_korean_jamo_block_also_caught() -> None:
    # Hangul Jamo range used standalone
    report = validate_markdown(_content("ㄱㄴㄷ\n"))
    assert _has_error_for(report, "korean")


# ---- Disclaimer ---------------------------------------------------------------


def test_missing_disclaimer_fails() -> None:
    body = SOURCE + "Some clean content.\n"
    report = validate_markdown(body)
    assert report.passed is False
    assert _has_error_for(report, "disclaimer")


def test_disclaimer_recognises_uppercase_variant() -> None:
    body = (
        "> **DISCLAIMER**: brand strategy analysis only.\n"
        + SOURCE
        + "Body text.\n"
    )
    report = validate_markdown(body)
    assert not _has_error_for(report, "disclaimer")


# ---- Prohibited expressions: pejoratives --------------------------------------


def test_bare_pejorative_assertion_blocked() -> None:
    report = validate_markdown(_content("The pricing is deceptive.\n"))
    assert _has_error_for(report, "prohibited")


def test_pejorative_after_regulator_attribution_allowed() -> None:
    line = "Regulators stated the practice was deceptive (FTC ruling, 2023).\n"
    report = validate_markdown(_content(line))
    assert not _has_error_for(report, "prohibited")


def test_pejorative_after_court_attribution_allowed() -> None:
    line = "The court ruled the conduct was fraudulent.\n"
    report = validate_markdown(_content(line))
    assert not _has_error_for(report, "prohibited")


def test_meta_reference_to_pejorative_in_guidance_skipped() -> None:
    # A docs/guidance line that talks ABOUT prohibited words should not flag itself.
    line = "Do not use 'deceptive' as a bare assertion.\n"
    report = validate_markdown(_content(line))
    assert not _has_error_for(report, "prohibited")


def test_blockquoted_line_skipped_as_source_quote() -> None:
    # Block quotes are treated as verbatim T1 source citations.
    line = "> The pricing is deceptive (per FTC complaint).\n"
    report = validate_markdown(_content(line))
    assert not _has_error_for(report, "prohibited")


# ---- Intent attribution (always prohibited) -----------------------------------


@pytest.mark.parametrize(
    "phrase",
    ["intentionally", "deliberately", "knowingly", "purposely misleads"],
)
def test_intent_attribution_always_blocked(phrase: str) -> None:
    line = f"The company {phrase} obscured the data.\n"
    report = validate_markdown(_content(line))
    assert _has_error_for(report, "prohibited")


def test_intent_attribution_blocked_even_with_regulator_prefix() -> None:
    # Even if regulators said it, intent attribution is still rejected because
    # those patterns are check_attribution=False.
    line = "Regulators stated the company intentionally obscured the data.\n"
    report = validate_markdown(_content(line))
    assert _has_error_for(report, "prohibited")


# ---- Hidden motive ------------------------------------------------------------


def test_hidden_motive_assertion_blocked() -> None:
    line = "The company believes growth will continue.\n"
    report = validate_markdown(_content(line))
    assert _has_error_for(report, "prohibited")


# ---- Unsourced generalisation -------------------------------------------------


def test_unsourced_generalisation_blocked() -> None:
    line = "Everyone knows this brand is loved.\n"
    report = validate_markdown(_content(line))
    assert _has_error_for(report, "prohibited")


# ---- Source citation (warning, not error) -------------------------------------


def test_no_source_citation_emits_warning_not_error() -> None:
    body = DISCLAIMER + "Body without any source citation.\n"
    report = validate_markdown(body)
    assert report.passed is True  # only a warning
    assert _has_warning_for(report, "source")


def test_T1_official_tag_satisfies_source_check() -> None:
    body = DISCLAIMER + "Net income was $8.5B [T1_OFFICIAL].\n"
    report = validate_markdown(body)
    assert not _has_warning_for(report, "source")


# ---- Comparisons --------------------------------------------------------------


def test_unhedged_better_than_emits_warning() -> None:
    line = "AAPL is better than its competitors.\n"
    report = validate_markdown(_content(line))
    assert _has_warning_for(report, "comparison")


def test_metric_qualifier_excuses_comparison() -> None:
    line = "AAPL revenue was higher in terms of operating margin (SEC 10-K).\n"
    line2 = "AAPL is better than competitors by 12% in operating margin.\n"
    report = validate_markdown(_content(line, line2))
    # Neither line should flag — the qualifier follows the comparison.
    assert not _has_warning_for(report, "comparison")


def test_unhedged_inferior_to_emits_warning() -> None:
    line = "Brand X is inferior to its peers.\n"
    report = validate_markdown(_content(line))
    assert _has_warning_for(report, "comparison")


# ---- Report shape -------------------------------------------------------------


def test_report_summary_format() -> None:
    report = validate_markdown(_content("The pricing is deceptive.\n"))
    summary = report.summary()
    assert summary.startswith("[FAIL]")
    assert "errors" in summary and "warnings" in summary


def test_report_passes_when_only_warnings() -> None:
    line = "AAPL is better than competitors.\n"
    report = validate_markdown(_content(line))
    # Comparison emits a warning; no errors → passed.
    assert report.passed is True
    assert any(i.severity == "warning" for i in report.issues)
