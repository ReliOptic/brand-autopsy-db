"""Integration tests for design-md API routes."""
from __future__ import annotations

from fastapi.testclient import TestClient

from src.api.main import app

client = TestClient(app)


def test_design_md_markdown_returns_aapl_sections() -> None:
    response = client.get("/api/brands/AAPL/design-md")
    assert response.status_code == 200
    data = response.json()
    assert data["ticker"] == "AAPL"
    assert data["format"] == "markdown"
    assert data["design_readiness_score"] >= 65
    assert "## 11. Market Visual Positioning" in data["markdown"]
    assert "## 12. Legal & Usage Notice" in data["markdown"]


def test_design_md_json_returns_raw_brand_design_md() -> None:
    response = client.get("/api/brands/AAPL/design-md.json")
    assert response.status_code == 200
    data = response.json()
    assert data["ticker"] == "AAPL"
    assert data["visual_archetype"] == "Product Gallery"
    assert data["awesome_design_md_reference"] is True
    assert data["market_visual_positioning"]


def test_design_preview_returns_token_specs_only() -> None:
    response = client.get("/api/brands/AAPL/design-preview")
    assert response.status_code == 200
    data = response.json()
    assert data["ticker"] == "AAPL"
    assert data["color_palette"]
    assert data["typography_rules"]
    assert data["component_styling"]
    assert "legal_notice" not in data


def test_design_md_unknown_ticker_returns_error_payload() -> None:
    response = client.get("/api/brands/UNKNOWN/design-md")
    assert response.status_code == 404
    assert response.json() == {"error": "Brand not found", "ticker": "UNKNOWN"}


def test_design_md_missing_artifact_returns_404_not_500() -> None:
    response = client.get("/api/brands/ABBV/design-md")
    assert response.status_code == 404
    assert response.json() == {"error": "DESIGN.md not yet generated", "ticker": "ABBV"}


def test_design_systems_summary_includes_archetypes_and_readiness() -> None:
    response = client.get("/api/analytics/design-systems")
    assert response.status_code == 200
    data = response.json()
    assert data["visual_archetypes"]
    assert data["readiness_distribution"]
    assert any(item["archetype"] == "Product Gallery" for item in data["visual_archetypes"])
    assert any(item["grade"] == "DESIGN_READY" for item in data["readiness_distribution"])


def test_compare_alias_includes_design_comparison_payload() -> None:
    response = client.get("/api/brands/compare?a=AAPL&b=MSFT")
    assert response.status_code == 200
    data = response.json()
    assert data["design_comparison"]["AAPL"]["has_design_md"] is True
    assert data["design_comparison"]["AAPL"]["visual_archetype"] == "Product Gallery"
    assert data["design_comparison"]["MSFT"]["visual_archetype"] == "Enterprise Carbon"
