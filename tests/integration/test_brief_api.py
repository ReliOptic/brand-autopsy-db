"""Integration tests for GET /api/brands/{ticker}/brief.

TDD cycle: tests written first; run to confirm RED before any API changes.
All tests use the real AAPL data in data/brands/AAPL_Apple-Inc/context/.
"""
from __future__ import annotations

import re

import pytest
from fastapi.testclient import TestClient

from src.api.main import app

client = TestClient(app)

_VALID_LEGAL_RISK_LEVELS = {"LOW", "MEDIUM", "HIGH", "UNKNOWN"}
_HEX_RE = re.compile(r"^#[0-9A-Fa-f]{6}$")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _get_aapl_brief() -> dict:
    """Fetch AAPL brief once; callers assert on the returned dict."""
    response = client.get("/api/brands/AAPL/brief")
    assert response.status_code == 200, (
        f"Expected 200 for AAPL brief, got {response.status_code}: {response.text}"
    )
    return response.json()


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------


@pytest.mark.integration
def test_brief_returns_all_required_fields() -> None:
    """GET /api/brands/AAPL/brief returns every field declared in BriefData."""
    data = _get_aapl_brief()
    required = {
        "ticker",
        "name",
        "sector",
        "industry",
        "archetype_primary",
        "archetype_secondary",
        "voice_matrix",
        "color_primary",
        "colors",
        "layer_count",
        "analysis_date",
        "data_confidence",
        "positioning_statement",
        "key_messages",
        "top_channels",
        "legal_risk_level",
        "financial_headline",
        "audience_segments",
        "primary_persona",
    }
    missing = required - data.keys()
    assert not missing, f"Response missing fields: {missing}"


@pytest.mark.integration
def test_brief_colors_non_empty() -> None:
    """AAPL brief has at least one color, and color_primary is a valid 6-digit HEX."""
    data = _get_aapl_brief()
    assert data["colors"], "colors list must not be empty for AAPL"
    assert _HEX_RE.match(data["color_primary"]), (
        f"color_primary '{data['color_primary']}' is not a valid #RRGGBB hex code"
    )


@pytest.mark.integration
def test_brief_voice_matrix_four_scores() -> None:
    """When voice_matrix is present, all four axis keys must exist."""
    data = _get_aapl_brief()
    vm = data["voice_matrix"]
    # voice_matrix is Optional — only assert keys if it is not None
    if vm is None:
        pytest.skip("voice_matrix is None for AAPL — extraction may have failed")
    required_keys = {
        "formal_casual",
        "authority_peer",
        "emotional_rational",
        "restrained_bold",
    }
    missing = required_keys - vm.keys()
    assert not missing, f"voice_matrix missing keys: {missing}"


@pytest.mark.integration
def test_brief_key_messages_populated() -> None:
    """AAPL brief must contain at least one key message."""
    data = _get_aapl_brief()
    assert isinstance(data["key_messages"], list), "key_messages must be a list"
    assert len(data["key_messages"]) >= 1, (
        f"key_messages is empty; got: {data['key_messages']}"
    )


@pytest.mark.integration
def test_brief_financial_headline_not_empty() -> None:
    """financial_headline must not be an empty string for AAPL."""
    data = _get_aapl_brief()
    assert data["financial_headline"] != "", "financial_headline must not be empty"


@pytest.mark.integration
def test_brief_legal_risk_level_valid() -> None:
    """legal_risk_level must be one of the four allowed values."""
    data = _get_aapl_brief()
    assert data["legal_risk_level"] in _VALID_LEGAL_RISK_LEVELS, (
        f"legal_risk_level '{data['legal_risk_level']}' not in {_VALID_LEGAL_RISK_LEVELS}"
    )


@pytest.mark.integration
def test_brief_top_channels_populated() -> None:
    """AAPL brief must contain at least one top channel."""
    data = _get_aapl_brief()
    assert isinstance(data["top_channels"], list), "top_channels must be a list"
    assert len(data["top_channels"]) >= 1, (
        f"top_channels is empty; AAPL layer 06 has a Channel Matrix table"
    )


@pytest.mark.integration
def test_brief_404_for_unknown_ticker() -> None:
    """GET /api/brands/XXXXXXNOTREAL/brief returns HTTP 404."""
    response = client.get("/api/brands/XXXXXXNOTREAL/brief")
    assert response.status_code == 404, (
        f"Expected 404 for unknown ticker, got {response.status_code}"
    )


@pytest.mark.integration
def test_brief_audience_segments_populated() -> None:
    """AAPL brief must contain at least one audience segment from Layer 02."""
    data = _get_aapl_brief()
    assert isinstance(data["audience_segments"], list), "audience_segments must be a list"
    assert len(data["audience_segments"]) >= 1, (
        f"audience_segments is empty; AAPL layer 02 has named personas"
    )
    for seg in data["audience_segments"]:
        assert isinstance(seg, str) and seg, "each audience segment must be a non-empty string"


@pytest.mark.integration
def test_brief_primary_persona_is_string() -> None:
    """primary_persona must be a string (empty string is acceptable for brands without Layer 02)."""
    data = _get_aapl_brief()
    assert isinstance(data["primary_persona"], str), "primary_persona must be a string"
    # AAPL has a full Layer 02 — persona description should be non-empty
    assert data["primary_persona"] != "", "primary_persona must not be empty for AAPL (Layer 02 present)"
