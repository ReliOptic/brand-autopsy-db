"""Tests for _extract_colors deduplication logic."""
from __future__ import annotations

from src.api.services.brand_reader import _extract_colors, ColorEntry


def test_near_duplicate_blues_collapsed_to_one() -> None:
    """4개의 유사 파란색 변형 → 1개만 남아야 함."""
    md = """
## Color Palette
| Token | HEX | Freq | Role | Usage |
|---|---|---|---|---|
| `color-blue` | `#0071e3` | High | CTA | Primary button |
| `color-blue-hover` | `#0077ed` | Med | Hover | Hover state |
| `color-blue-active` | `#006edb` | Low | Active | Active state |
| `color-blue-dark` | `#0066cc` | Low | Dark BG | Dark background |
"""
    result = _extract_colors(md)
    blues = [c for c in result if c.hex.lower() in ("#0071e3", "#0077ed", "#006edb", "#0066cc")]
    assert len(blues) == 1, f"Expected 1 blue kept, got {len(blues)}: {[c.hex for c in blues]}"


def test_distinct_colors_all_kept() -> None:
    """시각적으로 다른 색상들은 모두 유지돼야 함."""
    md = """
## Color Palette
| Token | HEX | Freq | Role | Usage |
|---|---|---|---|---|
| `color-dark` | `#1d1d1f` | High | Text | Primary text |
| `color-blue` | `#0071e3` | High | CTA | Button |
| `color-gray` | `#6e6e73` | High | Secondary | Subheads |
| `color-light` | `#f4f8fb` | Med | Surface | Background |
"""
    result = _extract_colors(md)
    hexes = {c.hex.lower() for c in result}
    assert "#1d1d1f" in hexes
    assert "#0071e3" in hexes
    assert "#6e6e73" in hexes
    assert "#f4f8fb" in hexes


def test_max_six_colors_returned() -> None:
    """최대 6개 반환."""
    md = """
## Color Palette
| Token | HEX | Freq | Role | Usage |
|---|---|---|---|---|
| `c1` | `#ff0000` | H | R | red |
| `c2` | `#00ff00` | H | G | green |
| `c3` | `#0000ff` | H | B | blue |
| `c4` | `#ffff00` | H | Y | yellow |
| `c5` | `#ff00ff` | H | M | magenta |
| `c6` | `#00ffff` | H | C | cyan |
| `c7` | `#ffffff` | H | W | white |
| `c8` | `#808080` | H | Gr | gray |
"""
    result = _extract_colors(md)
    assert len(result) <= 6


def test_aapl_colors_are_visually_distinct() -> None:
    """AAPL 실제 디자인시스템 파일에서 추출한 색상들이 서로 시각적으로 구별돼야 함."""
    from pathlib import Path

    design_path = Path("data/brands/AAPL_Apple-Inc/context/05-design-system.md")
    if not design_path.exists():
        import pytest
        pytest.skip("AAPL data not available")
    md = design_path.read_text(encoding="utf-8")
    result = _extract_colors(md)

    def _dist(h1: str, h2: str) -> float:
        h1, h2 = h1.lstrip("#"), h2.lstrip("#")
        r1, g1, b1 = int(h1[0:2], 16), int(h1[2:4], 16), int(h1[4:6], 16)
        r2, g2, b2 = int(h2[0:2], 16), int(h2[2:4], 16), int(h2[4:6], 16)
        return ((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2) ** 0.5

    for i, c1 in enumerate(result):
        for c2 in result[i + 1:]:
            d = _dist(c1.hex, c2.hex)
            assert d >= 30, f"Too similar: {c1.hex} vs {c2.hex} (dist={d:.1f})"
