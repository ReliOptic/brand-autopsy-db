from src.pipeline.design_md_enricher import enrich_design_md


def test_enrich_aapl_from_awesome_design_md() -> None:
    result = enrich_design_md("AAPL")
    assert result["ticker"] == "AAPL"
    assert result["changed"] is True
    assert result["score"] >= 80


def test_enrich_missing_awesome_source_is_noop() -> None:
    result = enrich_design_md("MSFT")
    assert result["ticker"] == "MSFT"
    assert result["changed"] is False
