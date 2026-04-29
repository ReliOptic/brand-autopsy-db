"""Brand analysis quality scorer.

Scans all brand directories and computes a quality score (0-100)
based on 6 weighted metrics. Results written to data/quality_scores.json.

Metrics:
    - layer_count          : 0-8 layers present  (10 pts each, max 80)
    - voice_matrix_complete: 4 axes all non-zero (5 pts)
    - color_count          : hex codes extracted  (2 pts each, max 6)
    - has_positioning      : positioning extracted (4 pts)
    - has_financial_data   : dollar amount in L7  (3 pts)
    - has_legal_risk_level : LOW/MEDIUM/HIGH in L8 (2 pts)
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path

BRANDS_DIR = Path(__file__).parent.parent.parent / "data" / "brands"
OUTPUT_PATH = Path(__file__).parent.parent.parent / "data" / "quality_scores.json"

LAYER_FILES: dict[int, str] = {
    1: "01-brand-identity.md",
    2: "02-audience-map.md",
    3: "03-competitive-landscape.md",
    4: "04-content-dna.md",
    5: "05-design-system.md",
    6: "06-channel-playbook.md",
    7: "07-financial-anatomy.md",
    8: "08-legal-review.md",
}

_HEX_RE = re.compile(r"#[0-9A-Fa-f]{6}\b")
_DOLLAR_RE = re.compile(r"\$\s*[\d,]+(?:\.\d+)?\s*(?:billion|million|thousand|B|M|K)?", re.IGNORECASE)
_RISK_RE = re.compile(
    r"(?:Risk\s*level|Risk\s*Level|Overall\s*Risk)[^:\n]*:\s*(LOW|MEDIUM|HIGH)",
    re.IGNORECASE,
)
_VM_PATTERNS: dict[str, re.Pattern[str]] = {
    "formal_casual": re.compile(
        r"[Ff]ormal\s*[↔\-]\s*[Cc]asual[^|]*\|[^|]*\|\s*\**\s*(\d+)\s*/\s*10",
    ),
    "authority_peer": re.compile(
        r"[Aa]uthorit[^|]*[↔\-][^|]*[Pp]eer[^|]*\|[^|]*\|\s*\**\s*(\d+)\s*/\s*10",
    ),
    "emotional_rational": re.compile(
        r"[Ee]motion[^|]*[↔\-][^|]*[Rr]ation[^|]*\|[^|]*\|\s*\**\s*(\d+)\s*/\s*10",
    ),
    "restrained_bold": re.compile(
        r"(?:[Rr]estrained?\s*[↔\-]\s*[Bb]old|"
        r"[Uu]nderstated?\s*[↔\-]\s*[Hh]yperbol)[^|]*\|[^|]*\|\s*\**\s*(\d+)\s*/\s*10",
    ),
}
_POSITIONING_HEADERS: tuple[str, ...] = (
    "Positioning Statement",
    "Brand Positioning",
    "Brand Promise",
)


class QualityScoreError(Exception):
    """Raised when scoring cannot proceed (e.g. missing brands directory)."""


@dataclass
class QualityMetrics:
    ticker: str
    layer_count: int                    # 0-8 layers present
    voice_matrix_complete: bool         # 4 axes all non-zero
    color_count: int                    # number of hex colors extracted
    has_positioning_statement: bool     # positioning extracted
    has_financial_data: bool            # dollar amount in layer 07
    has_legal_risk_level: bool          # LOW/MEDIUM/HIGH in layer 08
    score: int = field(init=False)      # computed 0-100

    def __post_init__(self) -> None:
        self.score = self._compute()

    def _compute(self) -> int:
        # Weights sum to 100
        points = 0
        points += min(self.layer_count, 8) * 10           # 0-80
        points += 5 if self.voice_matrix_complete else 0  # 5
        points += min(self.color_count, 3) * 2            # 0-6 (capped)
        points += 4 if self.has_positioning_statement else 0
        points += 3 if self.has_financial_data else 0
        points += 2 if self.has_legal_risk_level else 0
        return min(points, 100)

    def to_dict(self) -> dict[str, object]:
        return {
            "ticker": self.ticker,
            "score": self.score,
            "layer_count": self.layer_count,
            "voice_matrix_complete": self.voice_matrix_complete,
            "color_count": self.color_count,
            "has_positioning_statement": self.has_positioning_statement,
            "has_financial_data": self.has_financial_data,
            "has_legal_risk_level": self.has_legal_risk_level,
        }


def _scan_brand_dirs() -> list[Path]:
    """Return sorted list of brand directories that contain a `context/` subdir."""
    if not BRANDS_DIR.exists():
        return []
    return sorted(
        p for p in BRANDS_DIR.iterdir()
        if p.is_dir() and (p / "context").exists()
    )


def _parse_ticker_from_dir(d: Path) -> str:
    """Extract ticker from dir name (format: TICKER_Brand-Name)."""
    return d.name.split("_", 1)[0]


def _read_layer(brand_dir: Path, num: int) -> str:
    """Read layer markdown file. Return empty string if missing or unreadable."""
    if num not in LAYER_FILES:
        return ""
    layer_path = brand_dir / "context" / LAYER_FILES[num]
    if not layer_path.exists():
        return ""
    try:
        return layer_path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return ""


def _extract_hex_colors(text: str) -> list[str]:
    """Find all 6-digit hex codes (#RRGGBB). Returns deduped uppercase list."""
    if not text:
        return []
    seen: set[str] = set()
    out: list[str] = []
    for match in _HEX_RE.findall(text):
        norm = match.upper()
        if norm not in seen:
            seen.add(norm)
            out.append(norm)
    return out


def _voice_matrix_complete(text: str) -> bool:
    """Return True iff all four voice-matrix axes are present with non-zero values."""
    if not text:
        return False
    for pattern in _VM_PATTERNS.values():
        m = pattern.search(text)
        if not m:
            return False
        try:
            val = int(m.group(1))
        except ValueError:
            return False
        if val == 0:
            return False
    return True


def _has_positioning_statement(text: str) -> bool:
    """Return True iff a positioning/brand-promise section has non-empty content."""
    if not text:
        return False
    for header in _POSITIONING_HEADERS:
        pattern = rf"##\s+{re.escape(header)}\s*\n+(.*?)(?=\n##|\Z)"
        m = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        if m and m.group(1).strip():
            return True
    return False


def _has_financial_data(text: str) -> bool:
    """Return True iff text contains at least one dollar-amount expression."""
    if not text:
        return False
    return _DOLLAR_RE.search(text) is not None


def _has_legal_risk_level(text: str) -> bool:
    """Return True iff text contains an explicit Risk Level: LOW/MEDIUM/HIGH marker."""
    if not text:
        return False
    return _RISK_RE.search(text) is not None


def score_brand(brand_dir: Path) -> QualityMetrics:
    """Compute all quality metrics for a single brand directory."""
    ticker = _parse_ticker_from_dir(brand_dir)
    layer_count = sum(
        1 for n in LAYER_FILES
        if (brand_dir / "context" / LAYER_FILES[n]).exists()
    )
    layer01 = _read_layer(brand_dir, 1)
    layer05 = _read_layer(brand_dir, 5)
    layer07 = _read_layer(brand_dir, 7)
    layer08 = _read_layer(brand_dir, 8)
    return QualityMetrics(
        ticker=ticker,
        layer_count=layer_count,
        voice_matrix_complete=_voice_matrix_complete(layer01),
        color_count=len(_extract_hex_colors(layer05)),
        has_positioning_statement=_has_positioning_statement(layer01),
        has_financial_data=_has_financial_data(layer07),
        has_legal_risk_level=_has_legal_risk_level(layer08),
    )


def score_all() -> dict[str, QualityMetrics]:
    """Score all brand directories. Returns dict keyed by ticker."""
    dirs = _scan_brand_dirs()
    if not dirs:
        return {}
    out: dict[str, QualityMetrics] = {}
    for d in dirs:
        try:
            metrics = score_brand(d)
        except OSError:
            continue
        out[metrics.ticker] = metrics
    return out


def save_scores(
    scores: dict[str, QualityMetrics],
    path: Path = OUTPUT_PATH,
) -> None:
    """Persist scores to JSON. Creates parent dir if missing."""
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = {ticker: metrics.to_dict() for ticker, metrics in scores.items()}
    path.write_text(
        json.dumps(payload, indent=2, sort_keys=True, ensure_ascii=False),
        encoding="utf-8",
    )


def _summarize(scores: dict[str, QualityMetrics]) -> dict[str, object]:
    total = len(scores)
    if total == 0:
        return {"total": 0, "avg_score": 0.0, "high": 0, "medium": 0, "low": 0}
    high = sum(1 for m in scores.values() if m.score >= 80)
    medium = sum(1 for m in scores.values() if 60 <= m.score < 80)
    low = sum(1 for m in scores.values() if m.score < 60)
    avg = sum(m.score for m in scores.values()) / total
    return {
        "total": total,
        "avg_score": round(avg, 1),
        "high": high,
        "medium": medium,
        "low": low,
    }


def main() -> None:
    scores = score_all()
    save_scores(scores)
    summary = _summarize(scores)
    print(
        f"[quality_scorer] brands={summary['total']} "
        f"avg={summary['avg_score']} "
        f"HIGH(>=80)={summary['high']} "
        f"MEDIUM(60-79)={summary['medium']} "
        f"LOW(<60)={summary['low']}"
    )
    print(f"[quality_scorer] written to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
