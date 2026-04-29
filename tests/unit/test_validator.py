"""Validator tests: structural quality gate for 8-layer brand markdown.

Pins the pass/fail/warn contract for each layer validator. A regression here
means layer quality checks are silently broken before content ships.
"""
from __future__ import annotations

import pytest

from src.analyzer.validator import (
    VALIDATORS,
    ValidationResult,
    _count_h2,
    _extract_hex_codes,
    _has_steal_sheet,
    _has_table,
    validate_brand,
    validate_layer1,
    validate_layer5,
    validate_layer7,
)


# ---- ValidationResult mechanics ----------------------------------------------


def test_result_starts_passing() -> None:
    r = ValidationResult(brand="ACME", layer=1)
    assert r.passed is True
    assert r.score == 0
    assert r.max_score == 0


def test_check_increments_score_on_truth() -> None:
    r = ValidationResult(brand="ACME", layer=1)
    r.check(True, "ok", points=3)
    assert r.score == 3
    assert r.max_score == 3
    assert r.passed is True


def test_check_fails_and_records_issue() -> None:
    r = ValidationResult(brand="ACME", layer=1)
    r.check(False, "missing section", points=2)
    assert r.score == 0
    assert r.max_score == 2
    assert r.passed is False
    assert "missing section" in r.issues


def test_warn_does_not_change_passed() -> None:
    r = ValidationResult(brand="ACME", layer=1)
    r.warn("low keyword count")
    assert r.passed is True
    assert "low keyword count" in r.warnings


def test_pct_calculation() -> None:
    r = ValidationResult(brand="ACME", layer=1)
    r.check(True, "", 3)
    r.check(False, "x", 2)
    assert r.pct == 60


def test_pct_zero_max_score_is_zero_not_error() -> None:
    r = ValidationResult(brand="ACME", layer=1)
    assert r.pct == 0


def test_summary_starts_with_pass() -> None:
    r = ValidationResult(brand="ACME", layer=1)
    r.check(True, "", 1)
    assert r.summary().startswith("[PASS]")


def test_summary_starts_with_fail_and_includes_issue() -> None:
    r = ValidationResult(brand="ACME", layer=1)
    r.check(False, "Missing: headline", 1)
    s = r.summary()
    assert "[FAIL]" in s
    assert "Missing: headline" in s


# ---- Pure helpers ------------------------------------------------------------


def test_count_h2_empty() -> None:
    assert _count_h2("") == 0


def test_count_h2_counts_only_level_2() -> None:
    md = "# H1\n## Section A\n### H3\n## Section B\n"
    assert _count_h2(md) == 2


def test_has_table_present() -> None:
    assert _has_table("| col1 | col2 | col3 |") is True


def test_has_table_absent() -> None:
    assert _has_table("No table here.") is False


def test_extract_hex_codes_valid_6_digit() -> None:
    codes = _extract_hex_codes("Colors: #FF0000 and #00ff00 and #AABBCC")
    assert codes == ["#FF0000", "#00ff00", "#AABBCC"]


def test_extract_hex_codes_ignores_short() -> None:
    codes = _extract_hex_codes("#FFF is short, #123456 is valid")
    assert "#FFF" not in codes
    assert "#123456" in codes


def test_has_steal_sheet_english() -> None:
    assert _has_steal_sheet("## Steal Sheet\n...") is True


def test_has_steal_sheet_korean() -> None:
    assert _has_steal_sheet("## 훔쳐갈 인사이트\n") is True


def test_has_steal_sheet_absent() -> None:
    assert _has_steal_sheet("## Summary\nNothing.\n") is False


# ---- validate_layer1 ---------------------------------------------------------

_L1_FULL = """\
## 존재 이유 (Why)
Apple exists to empower creative individuals.

## 브랜드 약속
We promise simplicity in every product.

## 포지셔닝 문장
Premium consumer technology for creators.

## 브랜드 아키타입
The Creator / Innovator archetype.

## Voice Matrix
| Dimension | Score |
|-----------|-------|
| 따뜻함    | 7/10  |
| 대담함    | 8/10  |
| 지성      | 9/10  |
| 공식      | 6/10  |

## 금지어
- Never use casual slang

## 필수어
- Innovation, Always

## Steal Sheet
Key design takeaway here.
"""


def test_layer1_compliant_passes() -> None:
    r = validate_layer1(_L1_FULL, "Apple")
    assert r.passed is True


def test_layer1_missing_why_fails() -> None:
    md = _L1_FULL.replace("존재 이유 (Why)", "Purpose").replace("Why", "Purpose")
    r = validate_layer1(md, "Apple")
    assert r.passed is False
    assert any("Why" in i for i in r.issues)


def test_layer1_insufficient_voice_scores_fails() -> None:
    # Only 2 x/10 scores — below the required 4
    md = (
        "## 존재 이유\n텍스트\n## 브랜드 약속\n약속\n## 포지셔닝\n포지션\n"
        "## 아키타입\n타입\n음성 8/10 명확성 7/10\n## 금지어\n없음\n## 필수어\n없음\n## Steal Sheet\n인사이트"
    )
    r = validate_layer1(md, "Test")
    assert any("Voice Matrix" in i for i in r.issues)


def test_layer1_missing_steal_sheet_fails() -> None:
    md = _L1_FULL.replace("Steal Sheet", "REMOVED")
    r = validate_layer1(md, "Apple")
    assert r.passed is False


def test_layer1_brand_name_recorded() -> None:
    r = validate_layer1(_L1_FULL, "TestBrand")
    assert r.brand == "TestBrand"
    assert r.layer == 1


# ---- validate_layer5 ---------------------------------------------------------

_L5_FULL = """\
## Color Palette
| HEX     | Usage      |
|---------|------------|
| #000000 | Primary    |
| #FFFFFF | Background |
| #FF0000 | Accent     |
| #00FF00 | Secondary  |
| #0000FF | Tertiary   |

## 타이포그래피 (Typography)
SF Pro Display — headline font.

## 레이아웃 원칙
Grid-based layout system.

## 금지사항
No gradients on primary backgrounds.

## 채널별 규격
1080x1080 for Instagram.

## Steal Sheet
Design steal-worthy takeaways here.
"""


def test_layer5_compliant_passes() -> None:
    r = validate_layer5(_L5_FULL, "Apple")
    assert r.passed is True


def test_layer5_too_few_hex_codes_fails() -> None:
    # Remove two HEX entries, leaving only 3
    md = _L5_FULL.replace("#00FF00", "green").replace("#0000FF", "blue")
    r = validate_layer5(md, "Apple")
    assert r.passed is False
    assert any("HEX" in i for i in r.issues)


def test_layer5_missing_typography_fails() -> None:
    md = (
        _L5_FULL
        .replace("타이포그래피 (Typography)", "REMOVED")
        .replace("Typography", "GONE")
        .replace("폰트", "GONE")
    )
    r = validate_layer5(md, "Apple")
    assert r.passed is False
    assert any("타이포" in i or "Typography" in i for i in r.issues)


def test_layer5_missing_color_table_fails() -> None:
    # Remove the HEX column header so the table check fails
    md = _L5_FULL.replace("| HEX     | Usage      |", "| Color | Usage |")
    r = validate_layer5(md, "Apple")
    assert r.passed is False
    assert any("color palette table" in i.lower() for i in r.issues)


# ---- validate_layer7 ---------------------------------------------------------


def _build_layer7() -> str:
    fy_refs = " ".join(f"FY{y}" for y in range(2020, 2025))   # 5 FY refs
    dollars = " ".join(f"${i}B" for i in range(10, 22))       # 12 dollar amounts
    sec_links = " sec.gov sec.gov sec.gov"
    source_cites = " 10-K " * 10                               # 10 source tags
    return (
        f"## 면책 고지\nDisclaimer text.\n\n"
        f"## Primary Sources\n{sec_links}\n\n"
        f"## 수익 구조 (Revenue)\n{fy_refs} {dollars}\n\n"
        f"| Year | Revenue |\n|------|--------|\n| 2024 | $100B |\n\n"
        f"## 수익성 (Profitability)\n{source_cites}\n\n"
        f"## R&D 지출\nHeavy investment.\n\n"
        f"## SG&A\nMarketing cost.\n\n"
        f"## 자본 배분 (Capital Allocation)\nBuybacks.\n\n"
        f"## 재무 건전성 (Financial Health)\nStrong balance sheet.\n\n"
        f"## 브랜드 가치 (Brand Valuation)\n$500B.\n\n"
        f"## 리스크 (Risk)\nMacro exposure.\n\n"
        f"## Brand × Finance\nConnected insight.\n"
    )


def test_layer7_compliant_passes() -> None:
    r = validate_layer7(_build_layer7(), "Apple")
    assert r.passed is True


def test_layer7_missing_disclaimer_fails() -> None:
    md = _build_layer7().replace("면책 고지", "REMOVED")
    r = validate_layer7(md, "Apple")
    assert r.passed is False
    assert any("면책" in i or "Disclaimer" in i for i in r.issues)


def test_layer7_insufficient_fy_refs_fails() -> None:
    md = _build_layer7()
    for y in range(2020, 2025):
        md = md.replace(f"FY{y}", str(y))
    r = validate_layer7(md, "Apple")
    assert r.passed is False
    assert any("fiscal year" in i.lower() for i in r.issues)


def test_layer7_insufficient_edgar_links_fails() -> None:
    md = _build_layer7().replace("sec.gov sec.gov sec.gov", "sec.gov")
    r = validate_layer7(md, "Apple")
    assert r.passed is False
    assert any("EDGAR" in i or "sec.gov" in i.lower() for i in r.issues)


# ---- validate_brand ----------------------------------------------------------


def test_validate_brand_returns_one_result_per_layer() -> None:
    layers = {1: _L1_FULL, 5: _L5_FULL}
    results = validate_brand(layers, "Apple")
    assert len(results) == 2
    assert {r.layer for r in results} == {1, 5}


def test_validate_brand_unknown_layer_skipped() -> None:
    results = validate_brand({99: "garbage"}, "X")
    assert results == []


def test_validate_brand_results_sorted_by_layer() -> None:
    layers = {5: _L5_FULL, 1: _L1_FULL}
    results = validate_brand(layers, "Apple")
    assert [r.layer for r in results] == [1, 5]


def test_validators_dict_covers_all_8_layers() -> None:
    assert set(VALIDATORS.keys()) == set(range(1, 9))
