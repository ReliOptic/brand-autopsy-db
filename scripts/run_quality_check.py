#!/usr/bin/env python3
"""Run quality score + freshness check and print a report table.

Usage: python scripts/run_quality_check.py [--top N] [--stale-only]
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"
QUALITY_SCORES_PATH = DATA_DIR / "quality_scores.json"
FRESHNESS_PATH = DATA_DIR / "freshness.json"

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))


def _load_quality_scores() -> dict[str, dict[str, Any]]:
    """Load quality scores from disk; compute fresh ones when modules are available."""
    try:
        from src.pipeline.quality_scorer import score_all  # type: ignore[import-not-found]
        scores = score_all()
        if isinstance(scores, dict):
            return {k: v.to_dict() if hasattr(v, "to_dict") else v for k, v in scores.items()}
    except (ImportError, Exception):  # noqa: BLE001 — fallback to cached file
        pass

    if QUALITY_SCORES_PATH.exists():
        try:
            payload = json.loads(QUALITY_SCORES_PATH.read_text(encoding="utf-8"))
            data = payload.get("scores", payload)
            if isinstance(data, dict):
                return data
        except (OSError, json.JSONDecodeError):
            return {}
    return {}


def _load_freshness() -> dict[str, dict[str, Any]]:
    """Load freshness data from disk; compute fresh values when modules are available."""
    try:
        from src.pipeline.freshness_tracker import track_all  # type: ignore[import-not-found]
        freshness = track_all()
        if isinstance(freshness, dict):
            return {k: v.to_dict() if hasattr(v, "to_dict") else v for k, v in freshness.items()}
    except (ImportError, Exception):  # noqa: BLE001
        pass

    if FRESHNESS_PATH.exists():
        try:
            payload = json.loads(FRESHNESS_PATH.read_text(encoding="utf-8"))
            data = payload.get("freshness", payload)
            if isinstance(data, dict):
                return data
        except (OSError, json.JSONDecodeError):
            return {}
    return {}


def _check_mark(value: Any) -> str:
    if isinstance(value, bool):
        return "Y" if value else "-"
    if value in (None, "", 0):
        return "-"
    return "Y"


def _format_freshness(entry: dict[str, Any]) -> str:
    if not entry:
        return "UNKNOWN"
    status = entry.get("status") or entry.get("state") or "UNKNOWN"
    age_days = entry.get("days_since_update", entry.get("age_days"))
    if age_days is None:
        for key in ("newest_mtime", "last_updated"):
            ts = entry.get(key)
            if not ts:
                continue
            try:
                last = datetime.fromisoformat(str(ts).replace("Z", "+00:00"))
                age_days = (datetime.now(timezone.utc) - last).days
                break
            except ValueError:
                continue
    if age_days is not None:
        return f"{status} ({age_days}d)"
    return str(status)


def _build_row(ticker: str, score_entry: dict[str, Any], fresh_entry: dict[str, Any]) -> dict[str, Any]:
    score = score_entry.get("score", score_entry.get("total_score", 0))
    layers_done = score_entry.get(
        "layer_count",
        score_entry.get("layers_done", score_entry.get("layers_completed")),
    )
    layers_total = score_entry.get("layers_total", 8)
    layers = f"{layers_done}/{layers_total}" if layers_done is not None else "-"
    voice = _check_mark(
        score_entry.get(
            "voice_matrix_complete",
            score_entry.get("voice_ok", score_entry.get("voice_complete")),
        )
    )
    colors = score_entry.get(
        "color_count",
        score_entry.get("colors_count", score_entry.get("colors", "-")),
    )
    financial = _check_mark(
        score_entry.get(
            "has_financial_data",
            score_entry.get("financial_ok", score_entry.get("layer7_ok")),
        )
    )
    legal = _check_mark(
        score_entry.get(
            "has_legal_risk_level",
            score_entry.get("legal_ok", score_entry.get("layer8_ok")),
        )
    )
    freshness = _format_freshness(fresh_entry)

    return {
        "ticker": ticker,
        "score": score if isinstance(score, (int, float)) else 0,
        "layers": layers,
        "voice": voice,
        "colors": str(colors),
        "financial": financial,
        "legal": legal,
        "freshness": freshness,
    }


def _print_table(rows: list[dict[str, Any]]) -> None:
    headers = ["TICKER", "SCORE", "LAYERS", "VOICE", "COLORS", "FINANCIAL", "LEGAL", "FRESHNESS"]
    keys = ["ticker", "score", "layers", "voice", "colors", "financial", "legal", "freshness"]
    widths = [6, 5, 6, 5, 6, 9, 5, 18]

    print("  ".join(h.ljust(w) for h, w in zip(headers, widths)))
    print("  ".join("-" * w for w in widths))
    for row in rows:
        cells = [
            str(row.get(k, "")).ljust(w)
            for k, w in zip(keys, widths)
        ]
        print("  ".join(cells))


def main() -> None:
    parser = argparse.ArgumentParser(description="Brand quality + freshness report")
    parser.add_argument("--top", type=int, default=None, help="Show only top N rows by score.")
    parser.add_argument("--stale-only", action="store_true", help="Only show STALE freshness entries.")
    args = parser.parse_args()

    scores = _load_quality_scores()
    freshness = _load_freshness()

    if not scores and not freshness:
        print("No quality_scores.json or freshness.json found, and modules are unavailable.")
        print("Run scripts/cron_runner.py first to generate the input files.")
        sys.exit(1)

    tickers = sorted(set(scores.keys()) | set(freshness.keys()))
    rows = [
        _build_row(t, scores.get(t, {}) or {}, freshness.get(t, {}) or {})
        for t in tickers
    ]
    rows.sort(key=lambda r: r["score"], reverse=True)

    if args.stale_only:
        rows = [r for r in rows if "STALE" in r["freshness"].upper()]

    if args.top is not None and args.top > 0:
        rows = rows[: args.top]

    _print_table(rows)
    print(f"\nTotal: {len(rows)} brands")


if __name__ == "__main__":
    main()
