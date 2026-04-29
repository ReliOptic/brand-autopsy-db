"""Source freshness tracker.

Computes per-brand freshness from file modification timestamps
and analysis_date fields. Writes to data/freshness.json.

Status thresholds (days since newest layer mtime):
    FRESH  : < 90
    AGING  : 90-179
    STALE  : >= 180
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

BRANDS_DIR = Path(__file__).parent.parent.parent / "data" / "brands"
OUTPUT_PATH = Path(__file__).parent.parent.parent / "data" / "freshness.json"

FRESH_DAYS = 90
AGING_DAYS = 180
STALE_MONTHS = 6  # brand is STALE if oldest layer > 6 months

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

_ANALYSIS_DATE_RE = re.compile(
    r"(?:analysis[_\s-]*date|date)\s*[:=]\s*[\"']?(\d{4}-\d{2}-\d{2})[\"']?",
    re.IGNORECASE,
)
_ISO_DATE_RE = re.compile(r"\b(\d{4}-\d{2}-\d{2})\b")
_FRONT_MATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


class FreshnessError(Exception):
    """Raised when freshness tracking cannot proceed."""


@dataclass
class FreshnessRecord:
    ticker: str
    analysis_date: Optional[str]
    oldest_mtime: datetime
    newest_mtime: datetime
    days_since_update: int
    status: str = field(init=False)  # FRESH | AGING | STALE

    def __post_init__(self) -> None:
        self.status = self._classify()

    def _classify(self) -> str:
        if self.days_since_update < FRESH_DAYS:
            return "FRESH"
        if self.days_since_update < AGING_DAYS:
            return "AGING"
        return "STALE"

    def to_dict(self) -> dict[str, object]:
        return {
            "ticker": self.ticker,
            "analysis_date": self.analysis_date,
            "days_since_update": self.days_since_update,
            "status": self.status,
            "oldest_mtime": _to_iso_z(self.oldest_mtime),
            "newest_mtime": _to_iso_z(self.newest_mtime),
        }


def _to_iso_z(dt: datetime) -> str:
    """Format datetime as UTC ISO-8601 with trailing Z."""
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _scan_brand_dirs() -> list[Path]:
    if not BRANDS_DIR.exists():
        return []
    return sorted(
        p for p in BRANDS_DIR.iterdir()
        if p.is_dir() and (p / "context").exists()
    )


def _parse_ticker_from_dir(d: Path) -> str:
    return d.name.split("_", 1)[0]


def _extract_analysis_date(text: str) -> Optional[str]:
    """Pull ISO date (YYYY-MM-DD) from front matter or document header."""
    if not text:
        return None
    fm = _FRONT_MATTER_RE.match(text)
    if fm:
        m = _ANALYSIS_DATE_RE.search(fm.group(1))
        if m:
            return m.group(1)
    head = text[:2000]
    m = _ANALYSIS_DATE_RE.search(head)
    if m:
        return m.group(1)
    m = _ISO_DATE_RE.search(head)
    if m:
        return m.group(1)
    return None


def _layer_mtimes(brand_dir: Path) -> list[datetime]:
    """Return list of UTC datetimes for every layer file present."""
    out: list[datetime] = []
    for num in LAYER_FILES:
        layer_path = brand_dir / "context" / LAYER_FILES[num]
        if not layer_path.exists():
            continue
        try:
            ts = layer_path.stat().st_mtime
        except OSError:
            continue
        out.append(datetime.fromtimestamp(ts, tz=timezone.utc))
    return out


def _read_layer1(brand_dir: Path) -> str:
    layer_path = brand_dir / "context" / LAYER_FILES[1]
    if not layer_path.exists():
        return ""
    try:
        return layer_path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return ""


def track_brand(
    brand_dir: Path,
    now: Optional[datetime] = None,
) -> Optional[FreshnessRecord]:
    """Compute freshness for one brand. Returns None if no layer files exist."""
    ticker = _parse_ticker_from_dir(brand_dir)
    mtimes = _layer_mtimes(brand_dir)
    if not mtimes:
        return None
    oldest = min(mtimes)
    newest = max(mtimes)
    reference = now if now is not None else datetime.now(tz=timezone.utc)
    if reference.tzinfo is None:
        reference = reference.replace(tzinfo=timezone.utc)
    delta = reference - newest
    days_since = max(int(delta.total_seconds() // 86400), 0)
    analysis_date = _extract_analysis_date(_read_layer1(brand_dir))
    return FreshnessRecord(
        ticker=ticker,
        analysis_date=analysis_date,
        oldest_mtime=oldest,
        newest_mtime=newest,
        days_since_update=days_since,
    )


def track_all(now: Optional[datetime] = None) -> dict[str, FreshnessRecord]:
    """Track freshness for every brand directory. Keyed by ticker."""
    dirs = _scan_brand_dirs()
    if not dirs:
        return {}
    out: dict[str, FreshnessRecord] = {}
    for d in dirs:
        try:
            record = track_brand(d, now=now)
        except OSError:
            continue
        if record is None:
            continue
        out[record.ticker] = record
    return out


def save_freshness(
    records: dict[str, FreshnessRecord],
    path: Path = OUTPUT_PATH,
) -> None:
    """Persist freshness records to JSON. Creates parent dir if missing."""
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = {ticker: rec.to_dict() for ticker, rec in records.items()}
    path.write_text(
        json.dumps(payload, indent=2, sort_keys=True, ensure_ascii=False),
        encoding="utf-8",
    )


def _summarize(records: dict[str, FreshnessRecord]) -> dict[str, object]:
    total = len(records)
    if total == 0:
        return {"total": 0, "fresh": 0, "aging": 0, "stale": 0}
    fresh = sum(1 for r in records.values() if r.status == "FRESH")
    aging = sum(1 for r in records.values() if r.status == "AGING")
    stale = sum(1 for r in records.values() if r.status == "STALE")
    return {"total": total, "fresh": fresh, "aging": aging, "stale": stale}


def main() -> None:
    records = track_all()
    save_freshness(records)
    summary = _summarize(records)
    print(
        f"[freshness_tracker] brands={summary['total']} "
        f"FRESH={summary['fresh']} "
        f"AGING={summary['aging']} "
        f"STALE={summary['stale']}"
    )
    print(f"[freshness_tracker] written to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
