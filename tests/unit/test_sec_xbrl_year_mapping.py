"""Regression guard for the XBRL year-mapping bug.

Pre-fix behavior: facts grouped by `fy` (filing fiscal year), so prior-year
comparatives in a single 10-K landed on the wrong year (e.g. GS net_income
FY2023 read $21.6B when the true FY2023 value was $8.516B).

Post-fix: facts grouped by `end`-date year, with a 350–380 day duration
filter so quarterly entries don't leak in. These tests lock that behavior.
"""
from __future__ import annotations

from typing import Any, Callable

from src.crawler.sec_fetcher import _extract_annual_xbrl


def test_groups_duration_facts_by_end_year_not_filing_year(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    # Three annual revenue facts, all reported under fy=2023 in a single 10-K.
    # Old code would collapse them into one 2023 entry; new code splits by `end`.
    facts = [
        make_xbrl_fact(start="2023-01-01", end="2023-12-31", val=100, fy=2023),
        make_xbrl_fact(start="2022-01-01", end="2022-12-31", val=90, fy=2023),
        make_xbrl_fact(start="2021-01-01", end="2021-12-31", val=80, fy=2023),
    ]
    result = _extract_annual_xbrl(make_xbrl_concept("Revenues", facts), ["Revenues"])
    assert result == [
        {"year": 2023, "value": 100, "unit": "USD"},
        {"year": 2022, "value": 90, "unit": "USD"},
        {"year": 2021, "value": 80, "unit": "USD"},
    ]


def test_drops_quarterly_facts_via_duration_filter(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    # Q4 entry has form=10-K but a ~92 day duration; must be excluded.
    facts = [
        make_xbrl_fact(start="2023-01-01", end="2023-12-31", val=100, fy=2023),
        make_xbrl_fact(start="2023-10-01", end="2023-12-31", val=25, fy=2023, fp="Q4"),
    ]
    result = _extract_annual_xbrl(make_xbrl_concept("Revenues", facts), ["Revenues"])
    assert result == [{"year": 2023, "value": 100, "unit": "USD"}]


def test_keeps_instant_facts_without_start(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    # Balance sheet facts have no `start`. They should still map by end year.
    facts = [
        make_xbrl_fact(end="2023-12-31", val=500, fy=2023),
        make_xbrl_fact(end="2022-12-31", val=450, fy=2023),
    ]
    result = _extract_annual_xbrl(make_xbrl_concept("Assets", facts), ["Assets"])
    assert result == [
        {"year": 2023, "value": 500, "unit": "USD"},
        {"year": 2022, "value": 450, "unit": "USD"},
    ]


def test_accepts_fiscal_year_off_calendar_within_duration_window(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    # Fiscal year ending June 30 — duration is ~365 days, end-date year wins.
    facts = [
        make_xbrl_fact(start="2022-07-01", end="2023-06-30", val=200, fy=2023),
    ]
    result = _extract_annual_xbrl(make_xbrl_concept("Revenues", facts), ["Revenues"])
    assert result == [{"year": 2023, "value": 200, "unit": "USD"}]


def test_drops_period_outside_350_to_380_day_window(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    # Half-year period (~182 days) and 2-year period (~730 days) both excluded.
    facts = [
        make_xbrl_fact(start="2023-01-01", end="2023-06-30", val=50, fy=2023),
        make_xbrl_fact(start="2022-01-01", end="2023-12-31", val=300, fy=2023),
    ]
    result = _extract_annual_xbrl(make_xbrl_concept("Revenues", facts), ["Revenues"])
    assert result == []


def test_falls_back_through_concept_aliases(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    # First concept missing; second concept has data — extractor should use it.
    facts = [make_xbrl_fact(start="2023-01-01", end="2023-12-31", val=42, fy=2023)]
    payload = make_xbrl_concept("RevenueFromContractWithCustomerExcludingAssessedTax", facts)
    result = _extract_annual_xbrl(payload, ["Revenues", "RevenueFromContractWithCustomerExcludingAssessedTax"])
    assert result == [{"year": 2023, "value": 42, "unit": "USD"}]


def test_picks_concept_with_higher_max_year_when_both_present(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    # Two concepts present; the one whose latest year is higher wins.
    older = make_xbrl_concept("Revenues", [make_xbrl_fact(start="2020-01-01", end="2020-12-31", val=10, fy=2020)])
    newer_concept = "RevenueFromContractWithCustomerExcludingAssessedTax"
    newer = {
        "us-gaap": {
            **older["us-gaap"],
            newer_concept: {"units": {"USD": [
                make_xbrl_fact(start="2023-01-01", end="2023-12-31", val=999, fy=2023),
            ]}},
        }
    }
    result = _extract_annual_xbrl(newer, ["Revenues", newer_concept])
    assert result == [{"year": 2023, "value": 999, "unit": "USD"}]


def test_collision_keeps_most_recently_filed_value(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    # Two facts for the same end-year (one from prior 10-K, one restated in newer
    # filing). Restated value wins.
    facts = [
        make_xbrl_fact(start="2022-01-01", end="2022-12-31", val=90, fy=2022, filed="2023-02-01"),
        make_xbrl_fact(start="2022-01-01", end="2022-12-31", val=92, fy=2023, filed="2024-02-01"),
    ]
    result = _extract_annual_xbrl(make_xbrl_concept("Revenues", facts), ["Revenues"])
    assert result == [{"year": 2022, "value": 92, "unit": "USD"}]


def test_returns_empty_when_concept_missing(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    payload = make_xbrl_concept("SomethingElse", [make_xbrl_fact(end="2023-12-31", val=1)])
    assert _extract_annual_xbrl(payload, ["Revenues"]) == []


def test_skips_non_10k_forms(
    make_xbrl_concept: Callable[..., dict[str, Any]],
    make_xbrl_fact: Callable[..., dict[str, Any]],
) -> None:
    facts = [
        make_xbrl_fact(start="2023-01-01", end="2023-12-31", val=100, form="10-Q"),
        make_xbrl_fact(start="2023-01-01", end="2023-12-31", val=200, form="8-K"),
    ]
    assert _extract_annual_xbrl(make_xbrl_concept("Revenues", facts), ["Revenues"]) == []
