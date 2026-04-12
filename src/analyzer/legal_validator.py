"""
Legal compliance validator for brand autopsy markdown files.

Scans generated layer files for Korean characters, missing disclaimers,
prohibited expressions, missing source citations, and unhedged comparisons.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path

# ---------------------------------------------------------------------------
# Configurable patterns
# ---------------------------------------------------------------------------

# Hangul Unicode ranges: Hangul Syllables, Hangul Jamo, Hangul Compatibility Jamo
KOREAN_PATTERN = re.compile(r"[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]")

DISCLAIMER_PATTERN = re.compile(r"^>?\s*\*\*(?:Disclaimer|DISCLAIMER)\*?\*?:?\s", re.MULTILINE | re.IGNORECASE)

# Attribution phrases that excuse pejorative words when they precede them
ATTRIBUTION_PREFIXES = [
    r"regulators? (?:stated|said|found|noted|concluded)",
    r"court (?:found|ruled|held|determined|stated)",
    r"judge (?:found|ruled|held|determined|stated)",
    r"(?:the )?(?:FTC|SEC|DOJ|CFPB|FDA|NLRB) (?:found|stated|alleged|concluded|ruled)",
    r"(?:investigators?|prosecutors?|auditors?) (?:found|stated|alleged|concluded)",
    r"according to (?:regulators?|the court|investigators?|prosecutors?)",
    r"as (?:stated|noted|found|ruled|determined) by",
    r"in (?:the )?(?:ruling|judgment|verdict|finding|report)",
]
ATTRIBUTION_PREFIX_RE = re.compile(
    r"(?:" + "|".join(ATTRIBUTION_PREFIXES) + r")",
    re.IGNORECASE,
)

# Intent attribution patterns (always prohibited regardless of context)
INTENT_ATTRIBUTION_PATTERNS: list[tuple[str, str]] = [
    (r"\bintentionally\b", "intent attribution: 'intentionally'"),
    (r"\bdeliberately\b", "intent attribution: 'deliberately'"),
    (r"\baims to deceive\b", "intent attribution: 'aims to deceive'"),
    (r"\bknowingly\b", "intent attribution: 'knowingly'"),
    (r"\bpurposely misleads?\b", "intent attribution: 'purposely misleads'"),
]

# Pejorative assertion patterns (prohibited when NOT preceded by attribution)
PEJORATIVE_PATTERNS: list[tuple[str, str]] = [
    (r"\bdeceptive\b", "pejorative assertion: 'deceptive'"),
    (r"\bfraudulent\b", "pejorative assertion: 'fraudulent'"),
    (r"\bmanipulative\b", "pejorative assertion: 'manipulative'"),
    (r"\bexploitative\b", "pejorative assertion: 'exploitative'"),
    (r"\bpredatory\b", "pejorative assertion: 'predatory'"),
]

# Hidden-motive assertion patterns
HIDDEN_MOTIVE_PATTERNS: list[tuple[str, str]] = [
    (r"\bthe company believes\b", "hidden motive assertion: 'the company believes'"),
    (r"\btheir strategy is to\b", "hidden motive assertion: 'their strategy is to'"),
    (r"\bthey intend to\b", "hidden motive assertion: 'they intend to'"),
]

# Unsourced generalisation patterns
UNSOURCED_PATTERNS: list[tuple[str, str]] = [
    (r"\beveryone knows\b", "unsourced generalisation: 'everyone knows'"),
    (r"\bit is well[- ]known\b", "unsourced generalisation: 'it is well known'"),
    (r"\bconsumers think\b", "unsourced generalisation: 'consumers think'"),
]

# All prohibited expression groups combined
PROHIBITED_PATTERNS: list[tuple[str, str, bool]] = (
    # (pattern, message, requires_attribution_check)
    [(p, m, False) for p, m in INTENT_ATTRIBUTION_PATTERNS]
    + [(p, m, True) for p, m in PEJORATIVE_PATTERNS]
    + [(p, m, False) for p, m in HIDDEN_MOTIVE_PATTERNS]
    + [(p, m, False) for p, m in UNSOURCED_PATTERNS]
)

# Source citation patterns
SOURCE_CITATION_PATTERNS: list[str] = [
    r"\(official\)",
    r"\(SEC 10-K\)",
    r"\(estimated\)",
    r"\(observed\)",
    r"\bT1_OFFICIAL\b",
    r"\bT2_PRIMARY\b",
    r"\bT3_SECONDARY\b",
    r"\bT4_ESTIMATED\b",
    r"\bT5_INFERRED\b",
]
SOURCE_CITATION_RE = re.compile(
    "|".join(SOURCE_CITATION_PATTERNS), re.IGNORECASE
)

# Unhedged comparison patterns — flagged unless followed by a metric qualifier
COMPARISON_PATTERNS: list[tuple[str, str]] = [
    (r"\bbetter than\b", "unhedged comparison: 'better than'"),
    (r"\bworse than\b", "unhedged comparison: 'worse than'"),
    (r"\bsuperior to\b", "unhedged comparison: 'superior to'"),
    (r"\binferior to\b", "unhedged comparison: 'inferior to'"),
]
# A metric qualifier immediately follows the comparison phrase (same clause)
METRIC_QUALIFIER_RE = re.compile(
    r"(?:by \d|in (?:terms? of|revenue|margin|score|rating|price|speed|accuracy)|"
    r"\d+\s*%|according to|per (?:the|our)|as measured|benchmark)",
    re.IGNORECASE,
)

# Layer files that should be validated (glob pattern relative to brand dir)
LAYER_FILE_GLOB = "context/*.md"


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------


@dataclass
class ValidationIssue:
    file_path: str
    line_number: int
    severity: str  # "error" | "warning"
    category: str  # "korean" | "disclaimer" | "prohibited" | "source" | "comparison"
    message: str
    context: str  # the offending line


@dataclass
class ValidationReport:
    file_path: str
    passed: bool
    issues: list[ValidationIssue] = field(default_factory=list)

    def summary(self) -> str:
        errors = sum(1 for i in self.issues if i.severity == "error")
        warnings = sum(1 for i in self.issues if i.severity == "warning")
        status = "PASS" if self.passed else "FAIL"
        return f"[{status}] {self.file_path}: {errors} errors, {warnings} warnings"


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------


def _check_korean(lines: list[str], file_path: str) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []
    for lineno, line in enumerate(lines, start=1):
        if KOREAN_PATTERN.search(line):
            issues.append(
                ValidationIssue(
                    file_path=file_path,
                    line_number=lineno,
                    severity="error",
                    category="korean",
                    message="Korean characters detected",
                    context=line.rstrip("\n"),
                )
            )
    return issues


def _check_disclaimer(content: str, file_path: str) -> list[ValidationIssue]:
    if not DISCLAIMER_PATTERN.search(content):
        return [
            ValidationIssue(
                file_path=file_path,
                line_number=0,
                severity="error",
                category="disclaimer",
                message="Missing required disclaimer (line starting with '> **Disclaimer**')",
                context="",
            )
        ]
    return []


_META_REFERENCE_RE = re.compile(
    r"(?:do not (?:write|use|characterize|assert|claim|state))"
    r"|(?:never (?:use|write|assert|characterize|claim))"
    r"|(?:avoid (?:using|writing|stating|claiming))"
    r"|(?:prohibited|forbidden|banned|do not)"
    r"|(?:instead (?:write|use|say))"
    r"|(?:as (?:bare )?assertions)"
    r"|(?:characteriz(?:ing|ations?).*?as\b)"
    r"|(?:nothing in this document)"
    r"|(?:this document does not)"
    r"|(?:such characterizations are)",
    re.IGNORECASE,
)


def _check_prohibited(lines: list[str], file_path: str) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []
    for lineno, line in enumerate(lines, start=1):
        stripped = line.rstrip("\n")
        for raw_pattern, message, check_attribution in PROHIBITED_PATTERNS:
            compiled = re.compile(raw_pattern, re.IGNORECASE)
            if not compiled.search(stripped):
                continue
            # If attribution check required, skip if an attribution phrase exists
            # in the same line before the match position
            if check_attribution:
                match = compiled.search(stripped)
                if match and ATTRIBUTION_PREFIX_RE.search(
                    stripped[: match.start()]
                ):
                    continue
            # Skip if the line is a meta-reference (e.g., "DO NOT write 'deceptive'")
            if _META_REFERENCE_RE.search(stripped):
                continue
            issues.append(
                ValidationIssue(
                    file_path=file_path,
                    line_number=lineno,
                    severity="error",
                    category="prohibited",
                    message=f"Prohibited expression — {message}",
                    context=stripped,
                )
            )
    return issues


def _check_sources(content: str, file_path: str) -> list[ValidationIssue]:
    if not SOURCE_CITATION_RE.search(content):
        return [
            ValidationIssue(
                file_path=file_path,
                line_number=0,
                severity="warning",
                category="source",
                message=(
                    "No source citation found. Expected at least one of: "
                    "(official), (SEC 10-K), (estimated), (observed), "
                    "T1_OFFICIAL, T2_PRIMARY, etc."
                ),
                context="",
            )
        ]
    return []


def _check_comparisons(lines: list[str], file_path: str) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []
    for lineno, line in enumerate(lines, start=1):
        stripped = line.rstrip("\n")
        for raw_pattern, message in COMPARISON_PATTERNS:
            compiled = re.compile(raw_pattern, re.IGNORECASE)
            match = compiled.search(stripped)
            if not match:
                continue
            # Allow if a metric qualifier appears after the match in the same line
            remainder = stripped[match.end():]
            if METRIC_QUALIFIER_RE.search(remainder):
                continue
            issues.append(
                ValidationIssue(
                    file_path=file_path,
                    line_number=lineno,
                    severity="warning",
                    category="comparison",
                    message=f"Unhedged competitive comparison — {message}",
                    context=stripped,
                )
            )
    return issues


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------


def validate_markdown(content: str, file_path: str = "<memory>") -> ValidationReport:
    """Validate markdown content that has not yet been written to disk."""
    lines = content.splitlines(keepends=True)

    issues: list[ValidationIssue] = []
    issues.extend(_check_korean(lines, file_path))
    issues.extend(_check_disclaimer(content, file_path))
    issues.extend(_check_prohibited(lines, file_path))
    issues.extend(_check_sources(content, file_path))
    issues.extend(_check_comparisons(lines, file_path))

    passed = all(i.severity != "error" for i in issues)
    return ValidationReport(file_path=file_path, passed=passed, issues=issues)


def validate_file(file_path: str) -> ValidationReport:
    """Validate a single markdown file for legal compliance."""
    path = Path(file_path)

    if not path.exists():
        return ValidationReport(
            file_path=file_path,
            passed=False,
            issues=[
                ValidationIssue(
                    file_path=file_path,
                    line_number=0,
                    severity="error",
                    category="disclaimer",
                    message=f"File not found: {file_path}",
                    context="",
                )
            ],
        )

    content = path.read_text(encoding="utf-8", errors="replace")
    return validate_markdown(content, file_path=file_path)


def validate_brand(brand_dir: str) -> list[ValidationReport]:
    """Validate all layer markdown files for a brand."""
    brand_path = Path(brand_dir)
    reports: list[ValidationReport] = []

    md_files = sorted(brand_path.glob(LAYER_FILE_GLOB))
    if not md_files:
        return reports

    for md_file in md_files:
        reports.append(validate_file(str(md_file)))

    return reports


def validate_all(brands_dir: str) -> dict:
    """
    Validate all brands found under brands_dir.

    Returns a summary dict with keys:
        total_files, passed, failed, total_errors, total_warnings,
        brands: {brand_name: [ValidationReport, ...]}
    """
    root = Path(brands_dir)
    summary: dict = {
        "total_files": 0,
        "passed": 0,
        "failed": 0,
        "total_errors": 0,
        "total_warnings": 0,
        "brands": {},
    }

    brand_dirs = sorted(p for p in root.iterdir() if p.is_dir())
    for brand_path in brand_dirs:
        reports = validate_brand(str(brand_path))
        if not reports:
            continue

        summary["brands"][brand_path.name] = reports
        for report in reports:
            summary["total_files"] += 1
            if report.passed:
                summary["passed"] += 1
            else:
                summary["failed"] += 1
            for issue in report.issues:
                if issue.severity == "error":
                    summary["total_errors"] += 1
                elif issue.severity == "warning":
                    summary["total_warnings"] += 1

    return summary


def print_report(reports: list[ValidationReport], verbose: bool = False) -> None:
    """Print validation report to console."""
    if not reports:
        print("No reports to display.")
        return

    for report in reports:
        print(report.summary())
        if verbose and report.issues:
            for issue in report.issues:
                loc = f"line {issue.line_number}" if issue.line_number else "file-level"
                print(
                    f"  [{issue.severity.upper()}] [{issue.category}] {loc}: {issue.message}"
                )
                if issue.context:
                    # Truncate long lines for readability
                    ctx = issue.context if len(issue.context) <= 120 else issue.context[:117] + "..."
                    print(f"    > {ctx}")

    total = len(reports)
    passed = sum(1 for r in reports if r.passed)
    failed = total - passed
    total_errors = sum(
        1 for r in reports for i in r.issues if i.severity == "error"
    )
    total_warnings = sum(
        1 for r in reports for i in r.issues if i.severity == "warning"
    )
    print(
        f"\nSummary: {total} files — {passed} passed, {failed} failed, "
        f"{total_errors} errors, {total_warnings} warnings"
    )
