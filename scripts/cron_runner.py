"""Weekly data refresh cron runner.

Orchestrates: SEC filing detection -> Layer 07 refresh -> quality rescore -> freshness update.
Safe to run repeatedly (idempotent). Logs to data/logs/cron_YYYYMMDD.log.

Usage:
    python scripts/cron_runner.py [--dry-run] [--tickers AAPL MSFT]
"""

from __future__ import annotations

import argparse
import csv
import json
import logging
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"
LOG_DIR = DATA_DIR / "logs"
CSV_PATH = DATA_DIR / "sp500_list.csv"
QUALITY_SCORES_PATH = DATA_DIR / "quality_scores.json"
FRESHNESS_PATH = DATA_DIR / "freshness.json"

# Ensure project root is importable for src.* modules
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

LOG_FORMAT = "%(asctime)s [%(levelname)s] %(name)s: %(message)s"


def setup_logging(dry_run: bool) -> logging.Logger:
    """Configure logging to both file (data/logs/cron_YYYYMMDD.log) and stderr."""
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now(timezone.utc).strftime("%Y%m%d")
    log_file = LOG_DIR / f"cron_{today}.log"

    logger = logging.getLogger("cron_runner")
    logger.setLevel(logging.DEBUG)
    logger.propagate = False

    # Reset handlers in case of repeated invocation in same process
    for handler in list(logger.handlers):
        logger.removeHandler(handler)

    formatter = logging.Formatter(LOG_FORMAT)

    file_handler = logging.FileHandler(log_file, encoding="utf-8")
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    stream_handler = logging.StreamHandler(sys.stderr)
    stream_handler.setLevel(logging.INFO)
    stream_handler.setFormatter(formatter)
    logger.addHandler(stream_handler)

    mode = "DRY-RUN" if dry_run else "LIVE"
    logger.info("cron_runner initialised | mode=%s | log_file=%s", mode, log_file)
    return logger


def _load_all_tickers() -> list[str]:
    """Read S&P 500 tickers from data/sp500_list.csv."""
    if not CSV_PATH.exists():
        return []
    tickers: list[str] = []
    with open(CSV_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            t = row.get("ticker")
            if t:
                tickers.append(t)
    return tickers


def detect_new_filings(tickers: list[str], logger: logging.Logger) -> list[str]:
    """Return tickers with a 10-K/10-Q filed in the last 7 days.

    Uses the existing on-disk SEC cache as a fallback. Live EDGAR detection is
    optional: if the SEC fetcher dependencies are unavailable, log and return [].
    """
    cutoff = datetime.now(timezone.utc) - timedelta(days=7)
    cutoff_date = cutoff.date()
    raw_dir = DATA_DIR / "raw"

    # Optional: try live EDGAR fetcher import for future hooks. Stays graceful.
    try:
        from src.crawler import sec_fetcher  # noqa: F401
        logger.debug("sec_fetcher available for live detection")
    except ImportError as exc:
        logger.warning("sec_fetcher unavailable, falling back to cache scan: %s", exc)
    except Exception as exc:  # broad to keep cron resilient
        logger.warning("sec_fetcher import raised non-ImportError: %s", exc)

    new_filings: list[str] = []
    for ticker in tickers:
        sec_path = raw_dir / ticker / "sec_10k.json"
        if not sec_path.exists():
            continue
        try:
            data = json.loads(sec_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            logger.warning("could not read %s: %s", sec_path, exc)
            continue
        if data.get("error"):
            continue
        if data.get("form_type") not in ("10-K", "10-Q", "20-F"):
            continue
        filing_date_raw = data.get("filing_date", "")
        if not filing_date_raw:
            continue
        try:
            filing_date = datetime.strptime(filing_date_raw, "%Y-%m-%d").date()
        except ValueError:
            logger.debug("ticker=%s has unparseable filing_date=%r", ticker, filing_date_raw)
            continue
        if filing_date >= cutoff_date:
            new_filings.append(ticker)
            logger.info(
                "new filing detected | ticker=%s form=%s filed=%s",
                ticker, data.get("form_type"), filing_date_raw,
            )

    logger.info("filing detection complete | new_filings=%d", len(new_filings))
    return new_filings


def refresh_layer7(
    tickers: list[str],
    dry_run: bool,
    logger: logging.Logger,
) -> list[str]:
    """Regenerate Layer 07 (Financial Anatomy) for the supplied tickers.

    Reads cached SEC XBRL data from data/raw/<TICKER>/sec_10k.json and writes
    the generated Markdown to data/brands/<TICKER>_<Brand>/context/07-financial-anatomy.md.
    No external API key is required; all data is sourced from on-disk SEC cache.

    Per-ticker exceptions are caught and logged so one failure does not abort
    the full run. Gracefully degrades if the generator module cannot be imported.
    """
    if not tickers:
        logger.info("refresh_layer7 skipped | reason=no_tickers")
        return []

    if dry_run:
        logger.info("refresh_layer7 DRY-RUN | would_refresh=%s", tickers)
        return list(tickers)

    try:
        from src.analyzer.generate_layer7 import run as generate_layer7_run
    except ImportError as exc:
        logger.warning("generate_layer7 unavailable, skipping Layer 07 refresh: %s", exc)
        return []
    except Exception as exc:
        logger.warning("generate_layer7 import error: %s", exc)
        return []

    refreshed: list[str] = []
    for ticker in tickers:
        try:
            generate_layer7_run(ticker=ticker, force=True)
            logger.info("refresh_layer7 success | ticker=%s", ticker)
            refreshed.append(ticker)
        except Exception as exc:
            logger.error(
                "refresh_layer7 failed | ticker=%s | error_type=%s | error=%s",
                ticker,
                type(exc).__name__,
                exc,
            )

    logger.info("refresh_layer7 complete | refreshed=%d | failed=%d", len(refreshed), len(tickers) - len(refreshed))
    return refreshed


def rescore_quality(dry_run: bool, logger: logging.Logger) -> dict[str, Any]:
    """Run quality scoring across all brands and persist to data/quality_scores.json."""
    try:
        from src.pipeline.quality_scorer import save_scores, score_all  # type: ignore[import-not-found]
    except ImportError as exc:
        logger.warning("quality_scorer unavailable, skipping rescore: %s", exc)
        return {"skipped": True, "reason": "quality_scorer not importable"}
    except Exception as exc:
        logger.warning("quality_scorer import error: %s", exc)
        return {"skipped": True, "reason": str(exc)}

    try:
        scores = score_all()
    except Exception as exc:
        logger.error("quality_scorer.score_all failed: %s", exc)
        return {"skipped": True, "reason": f"score_all error: {exc}"}

    summary = {
        "total": len(scores) if hasattr(scores, "__len__") else 0,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }

    if dry_run:
        logger.info("rescore_quality DRY-RUN | %s", json.dumps(summary))
        return {"skipped": False, "dry_run": True, **summary}

    save_scores(scores, QUALITY_SCORES_PATH)
    logger.info("quality scores written | path=%s | total=%d", QUALITY_SCORES_PATH, summary["total"])
    return {"skipped": False, "dry_run": False, **summary}


def update_freshness(dry_run: bool, logger: logging.Logger) -> dict[str, Any]:
    """Run freshness tracking across all brands and persist to data/freshness.json."""
    try:
        from src.pipeline.freshness_tracker import save_freshness, track_all  # type: ignore[import-not-found]
    except ImportError as exc:
        logger.warning("freshness_tracker unavailable, skipping update: %s", exc)
        return {"skipped": True, "reason": "freshness_tracker not importable"}
    except Exception as exc:
        logger.warning("freshness_tracker import error: %s", exc)
        return {"skipped": True, "reason": str(exc)}

    try:
        freshness = track_all()
    except Exception as exc:
        logger.error("freshness_tracker.track_all failed: %s", exc)
        return {"skipped": True, "reason": f"track_all error: {exc}"}

    summary = {
        "total": len(freshness) if hasattr(freshness, "__len__") else 0,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }

    if dry_run:
        logger.info("update_freshness DRY-RUN | %s", json.dumps(summary))
        return {"skipped": False, "dry_run": True, **summary}

    save_freshness(freshness, FRESHNESS_PATH)
    logger.info("freshness written | path=%s | total=%d", FRESHNESS_PATH, summary["total"])
    return {"skipped": False, "dry_run": False, **summary}


def run(args: argparse.Namespace) -> int:
    """Execute the full pipeline. Returns process exit code (0 on success)."""
    logger = setup_logging(args.dry_run)

    # 1. Resolve target tickers
    if args.tickers:
        tickers = list(args.tickers)
        logger.info("targets supplied via --tickers | n=%d", len(tickers))
    else:
        tickers = _load_all_tickers()
        logger.info("targets loaded from sp500_list.csv | n=%d", len(tickers))

    if not tickers:
        logger.error("no tickers resolved; aborting")
        return 2

    layer_choice = args.layer

    # 2. Detect filings
    new_filings = detect_new_filings(tickers, logger)

    # 3. Refresh Layer 07 (or all layers, when requested)
    refreshed: list[str] = []
    if layer_choice in ("7", "all"):
        refreshed = refresh_layer7(new_filings, args.dry_run, logger)
    else:
        logger.info("refresh_layer7 skipped | layer=%s", layer_choice)

    # 4. Rescore quality
    quality_summary = rescore_quality(args.dry_run, logger)

    # 5. Update freshness
    freshness_summary = update_freshness(args.dry_run, logger)

    # 6. Summary
    summary: dict[str, Any] = {
        "run_at": datetime.now(timezone.utc).isoformat(),
        "dry_run": args.dry_run,
        "layer": layer_choice,
        "tickers_considered": len(tickers),
        "new_filings": new_filings,
        "layer7_refreshed": refreshed,
        "quality": quality_summary,
        "freshness": freshness_summary,
    }

    logger.info("pipeline complete | %s", json.dumps(summary, default=str))

    if args.notify:
        # Print structured JSON to stdout so an external pipeline can capture it
        print(json.dumps(summary, indent=2, default=str))

    return 0


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Weekly Brand Autopsy data refresh cron runner.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Log what would be updated without writing any files.",
    )
    parser.add_argument(
        "--tickers",
        nargs="+",
        default=None,
        help="Specific tickers to update (default: all S&P 500).",
    )
    parser.add_argument(
        "--layer",
        choices=["7", "8", "all"],
        default="7",
        help="Which layers to refresh (default: 7).",
    )
    parser.add_argument(
        "--notify",
        action="store_true",
        help="Emit structured JSON summary to stdout on completion.",
    )
    args = parser.parse_args()
    sys.exit(run(args))


if __name__ == "__main__":
    main()
