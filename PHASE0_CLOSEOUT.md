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

### 1. SEC fetch pipeline is not built

Missing:

- `src/crawler/sec_fetcher.py`
- `run_batch.py --sec-fetch`
- `data/raw/{ticker}/sec_10k.json` generation workflow

Impact:

- this is the first major Phase 1 implementation task
- Layer 7 and Layer 8 at scale still lack the intended structured SEC ingestion path

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

The next approved engineering task is:

`Begin Phase 1 implementation, starting with SEC fetch pipeline design and runner integration.`

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

### 2026-04-13 — Phase 0 closure decision

Decision:

- external Anthropic API key is not required for Phase 0 acceptance
- in-repo AAPL corpus plus legal-validator pass is accepted as sufficient benchmark evidence
- Phase 0 is closed
- Phase 1 may begin

Basis:

- explicit user instruction that external key usage is not desired
- user approval that Claude Code / Codex in-agent work is an acceptable execution model
