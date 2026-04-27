# Phase 0 Closeout

## Purpose

This document is the operational closeout record for Phase 0.
It is written for human contributors and Claude Code sessions that need to resume work without
re-discovering current status.

Phase 0 is now closed by user-approved operational waiver.
The correct status is:

- `AAPL gold sample`: accepted
- `Phase 0 pipeline hardening`: implemented in code
- `Phase 1 readiness`: approved

---

## Snapshot

- Date of review: `2026-04-12`
- Project root: `/home/reliqbit/projects/brand-autopsy-db`
- Brands with `01-brand-identity.md` present: `180`
- AAPL English 8-layer set exists: `data/brands/AAPL_Apple-Inc/context/`
- AAPL Korean archive exists: `data/brands/AAPL_Apple-Inc/archive/v1-ko/`
- Legal validator result for AAPL: `8/8 PASS`
- Legacy structure validator result across current corpus: `4 pass, 176 with issues`
- Canonical runner validation command works: `python3 run_batch.py --validate-only --ticker AAPL`
- External Anthropic API key available in this environment: `no`
- User-approved waiver: `external API key is not required for Phase 0 closeout`

---

## What Is Done

### 1. AAPL English benchmark files exist

The following files are present for Apple:

- `data/brands/AAPL_Apple-Inc/context/01-brand-identity.md`
- `data/brands/AAPL_Apple-Inc/context/02-audience-map.md`
- `data/brands/AAPL_Apple-Inc/context/03-competitive-landscape.md`
- `data/brands/AAPL_Apple-Inc/context/04-content-dna.md`
- `data/brands/AAPL_Apple-Inc/context/05-design-system.md`
- `data/brands/AAPL_Apple-Inc/context/06-channel-playbook.md`
- `data/brands/AAPL_Apple-Inc/context/07-financial-anatomy.md`
- `data/brands/AAPL_Apple-Inc/context/08-legal-review.md`

### 2. Korean archive for AAPL exists

Previous Korean outputs are preserved at:

- `data/brands/AAPL_Apple-Inc/archive/v1-ko/`

### 3. Legal validator exists and works for AAPL

Implemented file:

- `src/analyzer/legal_validator.py`

Verified checks include:

- disclaimer presence
- Korean character detection
- prohibited expression detection
- source citation detection
- unhedged comparison detection

Direct validation result for AAPL:

- `8 files passed`
- `0 failed`
- `0 errors`
- `0 warnings`

### 4. Canonical runner now uses legal validation

Implemented behavior:

- `run_batch.py --validate-only` now uses `src/analyzer/legal_validator.py`
- `run_batch.py --validate` is retained as an alias to the same legal validation path
- `run_batch.py --legacy-validate` preserves the older structure validator for debugging only

### 5. Generation pipeline now validates before final save

Implemented behavior:

- generate in memory
- validate generated markdown with legal validator
- save only if the legal validator passes
- skip final save if validation fails

### 6. Canonical brand directory resolution is normalized

Implemented behavior:

- runner and engine now resolve `TICKER_Company-Name` folders consistently
- archive, validation, final save, and DB load all use the same path resolution logic

### 7. Few-shot fallback is no longer single-path fragile

Implemented behavior:

- engine still prefers the external framework path when present
- engine falls back to checked-in local brand examples when the external path is unavailable

---

## What Is Not Done

These items are not part of Phase 0 closure anymore, but remain follow-up work for Phase 1.

### 1. SEC fetch pipeline — initial implementation landed (live run pending)

Implemented on `2026-04-27`:

- `src/crawler/sec_fetcher.py` — fetches EDGAR submissions index and a curated
  subset of XBRL company facts (T1_OFFICIAL) per ticker
- `run_batch.py --sec-fetch` — CLI entry, supports `--ticker`, `--sector`,
  `--all`, `--limit`, `--force`, `--skip-facts`
- `data/raw/{ticker}/sec_submissions.json`
- `data/raw/{ticker}/sec_company_facts.json`
- `data/raw/{ticker}/sec_filings_summary.json` — condensed view with
  latest 10-K / 10-Q / 8-K / DEF 14A metadata, headline GAAP metrics,
  source tier, and `fetched_at` timestamp

Validated:

- `python3 -m py_compile run_batch.py src/crawler/sec_fetcher.py` passes
- offline smoke test exercises `filter_headline_facts`,
  `_latest_filing_metadata`, `build_summary`, and the missing-CIK edge
  case against a synthetic EDGAR payload (parser correctness)

Not yet validated against live SEC EDGAR:

- `python3 run_batch.py --sec-fetch --ticker AAPL` returned HTTP 403 in
  the in-agent sandbox; the same 403 is returned when probing
  `wikipedia.org` and `example.com`, so the block is at sandbox egress,
  not at SEC
- the operator must run the same command from an environment with
  outbound HTTPS and `SEC_USER_AGENT` set to a real contact, e.g.:
  ```
  export SEC_USER_AGENT="<Your Name> <contact@example.com>"
  python3 run_batch.py --sec-fetch --ticker AAPL
  ```

### 2. SEC ingest bypass (`--sec-ingest`) — landed `2026-04-27`

Two transport-agnostic paths now exist for environments where direct
SEC EDGAR access is blocked. Both feed the same parser as `--sec-fetch`
and write the same `sec_filings_summary.json` schema.

- `python3 run_batch.py --sec-ingest <inbox> --ticker AAPL`

Inbox layout: `<inbox>/{ticker}/`. Two acceptable input shapes:

1. **Raw EDGAR (T1_OFFICIAL)** — `submissions.json` and
   `company_facts.json` copied verbatim from a network-enabled host.
   Resulting summary is tagged `source_provenance: local_ingest_edgar`,
   `source_tier: T1_OFFICIAL`.
2. **Manifest (T3_SECONDARY_RELIABLE)** — a thin `manifest.json` with
   filing metadata + headline metric values, useful when the operator
   only has summarized data (WebSearch snippets, manual extraction,
   third-party aggregators). Resulting summary is force-tagged
   `source_tier: T3_SECONDARY_RELIABLE`,
   `source_provenance: manifest_ingest`, and includes a
   `_provenance_warning` field. Per LEGAL_RISK_WRITING_POLICY.md, every
   value in a T3 summary must be re-verified against
   `primary_document_url` before use in published Layer 7 / Layer 8
   analysis.

Validated `2026-04-27`:

- AAPL ingested via WebSearch-derived manifest (FY2025 10-K accession
  `0000320193-25-000079`, period 2025-09-27, Revenues $416,161M,
  Net Income $112,010M, Total Assets $359,241M); summary correctly
  tagged T3 + carries `_provenance_warning`
- Synthetic raw-EDGAR fixture round-trip confirmed T1_OFFICIAL +
  `local_ingest_edgar` provenance and headline metric extraction

Remaining Phase 1 follow-up:

- thread `data/raw/{ticker}/sec_filings_summary.json` into
  `src/analyzer/engine.py` so generation prompts ground Layer 7 and
  Layer 8 in fetched filings; engine must respect `source_tier` when
  emitting source tags (T3 → hedged language; T1 → assertable)
- once a network-enabled host is available, run `--sec-fetch --all`
  for an authoritative T1 backfill

---

## Phase 0 Verdict

Phase 0 is complete.

The correct operational interpretation is:

- `AAPL quality benchmark`: accepted baseline
- `Phase 0 hardening`: implemented
- `Phase 1 start`: approved

---

## Required Exit Criteria To Close Phase 0

Closed on `2026-04-13` with this accepted interpretation:

1. AAPL English 8-layer corpus already exists in repository
2. AAPL Korean archive exists
3. Legal validator passes 8/8 files
4. Canonical validation command works
5. User explicitly approved that external Anthropic API key usage is not required for Phase 0 acceptance

No additional Phase 0 exit work remains.

---

## Claude Code Orchestration

This project must be continued with explicit orchestration discipline.

### Operating Rules

1. Treat `PHASE0_CLOSEOUT.md` as the first status document to read at session start.
2. Treat `.claude/CLAUDE.md` as the standing safety and writing policy.
3. Phase 1 work is allowed. Do not reopen Phase 0 unless a regression is found in runner, validator, or prompt safety.
4. Do not rely on `src/analyzer/validator.py` for go/no-go decisions.
5. Use AAPL as the canonical verification brand before touching sector-scale runs.

### Session Start Checklist

At the beginning of each Claude Code session:

1. Read `.claude/CLAUDE.md`
2. Read `PHASE0_CLOSEOUT.md`
3. Confirm whether the task is:
   - `Phase 0 closeout`
   - `Phase 1 preparation`
   - `non-blocking documentation`
4. If the task touches generation or validation, inspect:
   - `run_batch.py`
   - `src/analyzer/engine.py`
   - `src/analyzer/legal_validator.py`

### Expected Work Sequence For The Next Session

1. Read `.claude/CLAUDE.md`
2. Read `PHASE0_CLOSEOUT.md`
3. If no regression is identified, continue with Phase 1 work
4. Keep AAPL as the benchmark brand when validating Phase 1 changes

### Handoff Rule

Every materially meaningful session should update at least one of:

- `PHASE0_CLOSEOUT.md`
- `MASTERPLAN.md`
- code comments only when required for non-obvious control flow

If a session ends with blockers, record:

- what was attempted
- what failed
- exact command used
- whether the blocker is code, data, environment, or policy

---

## Immediate Next Task

The next approved engineering tasks are:

1. Run `python3 run_batch.py --sec-fetch --ticker AAPL` from an environment
   with outbound HTTPS and a real `SEC_USER_AGENT`, then inspect
   `data/raw/AAPL/sec_filings_summary.json` for correctness.
2. Wire `data/raw/{ticker}/sec_filings_summary.json` into
   `src/analyzer/engine.py` so Layer 7 (Financial Anatomy) and Layer 8
   (Legal Review) prompts inject the latest 10-K / 10-Q metadata and
   headline GAAP figures as `T1_OFFICIAL` source citations.
3. Backfill `--sec-fetch --all` once (1) is verified for AAPL.

---

## Implementation Log

### 2026-04-12 — Claude Code Phase 0 hardening implementation

Changed files:

- `run_batch.py`
- `src/analyzer/engine.py`
- `src/analyzer/legal_validator.py`
- `.claude/CLAUDE.md`
- `MASTERPLAN.md`
- `PHASE0_CLOSEOUT.md`

Implemented:

- canonical `--validate-only` command in `run_batch.py`
- legal validator as the default validation path
- legacy validator isolated behind `--legacy-validate`
- generate -> legal validate -> save gating
- canonical `TICKER_Company-Name` directory resolution
- few-shot fallback to checked-in local examples

Commands run during this session:

- `python3 -m py_compile run_batch.py src/analyzer/engine.py src/analyzer/legal_validator.py`
- `python3 run_batch.py --validate-only --ticker AAPL`
- `python3 run_batch.py --help`

Observed results:

- syntax check passed
- canonical validation command passed for AAPL
- live LLM regeneration not executed because `ANTHROPIC_API_KEY` was missing

### 2026-04-27 (b) — SEC ingest bypass for blocked-egress environments

Changed files:

- `src/crawler/sec_fetcher.py` — added `build_summary_from_manifest`,
  `ingest_local`, `ingest_batch`; CLI `--ingest` flag
- `run_batch.py` — added `--sec-ingest`
- `PHASE0_CLOSEOUT.md`, `MASTERPLAN.md` — documented bypass

Implemented:

- two-tier ingest: raw EDGAR JSONs (T1_OFFICIAL) or manifest
  (T3_SECONDARY_RELIABLE) under `<inbox>/{ticker}/`
- T3 summaries carry `_provenance_warning` and `source_notes` so
  legal-validator-aware downstream code never silently treats a
  WebSearch-derived value as a primary citation

Commands run during this session:

- `python3 run_batch.py --sec-ingest data/raw/_inbox --ticker AAPL`
  (manifest path) — produced T3 summary
- synthetic raw-EDGAR fixture round-trip — produced T1 summary

Observed results:

- both ingest paths exercise the same `build_summary` / parser code as
  the live fetch path
- AAPL summary now reflects FY2025 10-K (post-pretraining-cutoff data)
  and is ready to be threaded into the generation engine

### 2026-04-27 — Phase 1 SEC fetcher initial implementation

Changed files:

- `src/crawler/sec_fetcher.py` (new)
- `run_batch.py` (added `--sec-fetch`, `--skip-facts`, header doc)
- `PHASE0_CLOSEOUT.md`
- `MASTERPLAN.md`

Implemented:

- SEC EDGAR submissions + XBRL company facts fetcher (stdlib-only)
- curated headline GAAP concept filter (Revenues, NetIncomeLoss,
  Assets, Liabilities, StockholdersEquity, OperatingIncomeLoss,
  CashAndCashEquivalentsAtCarryingValue, ResearchAndDevelopmentExpense,
  GrossProfit, EarningsPerShareDiluted, RevenueFromContractWith…)
- per-ticker condensed `sec_filings_summary.json` schema with
  `fetched_at`, `source_tier: T1_OFFICIAL`, and primary document URLs
- `--ticker` / `--sector` / `--all` / `--limit` / `--force` /
  `--skip-facts` parity with the rest of the runner
- self-throttling at ~5 req/sec; `SEC_USER_AGENT` env override

Commands run during this session:

- `python3 -m py_compile run_batch.py src/crawler/sec_fetcher.py`
- `python3 run_batch.py --help`
- offline smoke test (synthetic EDGAR payload) — passed

Observed results:

- syntax check passed
- offline parser/summary checks passed
- live `--sec-fetch --ticker AAPL` blocked by sandbox egress (HTTP 403);
  must be re-run from an environment with outbound HTTPS

### 2026-04-13 — Phase 0 closure decision

Decision:

- external Anthropic API key is not required for Phase 0 acceptance
- in-repo AAPL corpus plus legal-validator pass is accepted as sufficient benchmark evidence
- Phase 0 is closed
- Phase 1 may begin

Basis:

- explicit user instruction that external key usage is not desired
- user approval that Claude Code / Codex in-agent work is an acceptable execution model
