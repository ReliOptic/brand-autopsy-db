# Brand Autopsy DB — Generation Protocol

> This document is the editorial bible for all Claude Code sessions generating brand analyses.
> Every session MUST read this file before starting work.

## Mission

Generate 8-layer English brand analysis documents for S&P 500 companies.
Each brand = a folder of 8 markdown research documents in `data/brands/{TICKER}_{Name}/context/`.

## Quality Standard: AAPL Gold Standard

Reference: `data/brands/AAPL_Apple-Inc/context/` — this is the benchmark.
Every generated analysis must match this quality level.

## Rules (Non-Negotiable)

### Language
- ALL output in English. Zero Korean characters.

### Legal Compliance
- Every file MUST start with a disclaimer: `> **Disclaimer**: ...`
- Every factual claim MUST cite its source: (official), (SEC 10-K), (observed on website), (estimated)
- NEVER assert intent, hidden motives, or use pejorative language
- NEVER write "deceptive", "fraudulent", "manipulative" as your own assertion
- Use hedged language for interpretations: "suggests", "indicates", "appears to", "may reflect"
- Competitor comparisons MUST be metric-based, not value judgments
- See `LEGAL_RISK_WRITING_POLICY.md` for full policy

### Validation
- After generating each brand, run the legal validator:
  ```python
  from src.analyzer.legal_validator import validate_brand, print_report
  reports = validate_brand('data/brands/{TICKER}_{Name}')
  print_report(reports, verbose=True)
  ```
- ALL 8 files must PASS (0 errors) before moving to the next brand
- If validation fails, fix the issues and re-validate

### File Structure

Each brand gets 8 files in `data/brands/{TICKER}_{Company-Name}/context/`:

```
01-brand-identity.md      (~100-150 lines)
02-audience-map.md         (~80-120 lines)
03-competitive-landscape.md (~150-200 lines)
04-content-dna.md          (~150-200 lines)
05-design-system.md        (~200-400 lines)
06-channel-playbook.md     (~200-400 lines)
07-financial-anatomy.md    (~250-400 lines)
08-legal-review.md         (~300-450 lines)
```

### Layer Content Guide

**Layer 01 — Brand Identity**: Raison d'etre, brand promise, positioning statement, archetype (primary + secondary), voice matrix (4 axes, 1-10 with example copy), banned/required words, slogans, steal sheet.

**Layer 02 — Audience Map**: ICP (5 dimensions), 3 personas with pain/gain/triggers, AARRR purchase journey, anti-persona, steal sheet.

**Layer 03 — Competitive Landscape**: Competitive matrix (min 4 competitors), positioning map (2 axes, 5+ brands), 3 battle cards, threats & opportunities (min 3 each), steal sheet.

**Layer 04 — Content DNA**: Content pillars (3-5 with %), hook patterns (min 4), CTA patterns (min 3), tone & mood guide (4 situations), content prohibitions (min 5), hashtag strategy, steal sheet.

**Layer 05 — Design System**: Color palette (min 5 with HEX), typography, channel specs, layout principles (min 4), icon style, AI image prompt guide, design prohibitions (min 6).

**Layer 06 — Channel Playbook**: Channel matrix (min 5 channels), tone variations, cross-channel synergy (min 3 routes), channel prohibitions, crisis protocol (min 3 scenarios), steal sheet.

**Layer 07 — Financial Anatomy**: SEC EDGAR source links, 5-year revenue trend, segment/geographic revenue, margin structure, R&D/SG&A/CapEx, capital allocation, financial health, brand valuation, risk matrix (from 10-K), brand-finance nexus.

**Layer 08 — Legal Review**: IP portfolio, major litigation, regulatory landscape, PROJECT RISK ASSESSMENT (litigation posture, data collection legality, Fair Use analysis, Writing Risk Guide with SAFE/HEDGE/DO NOT WRITE sections), ESG, risk heatmap.

### Data Sources (per brand)

1. **CSS data**: Check `data/raw/{TICKER}/css_data.json` — if exists and no error, use for Layer 05
2. **SEC data**: Check `data/raw/{TICKER}/sec_10k.json` — if exists, use for Layer 07/08
3. **General knowledge**: Use your training data for publicly known brand information
4. **When data is unavailable**: State explicitly "(data not available — analysis based on publicly known information)"

### Skip Logic

- Check if `data/brands/{TICKER}_{Name}/context/01-brand-identity.md` exists AND contains "Disclaimer"
- If yes → skip (already done in English)
- If no → generate all 8 layers

### Folder Naming

Use the existing folder names in `data/brands/`. If a folder already exists (e.g., `AAPL_Apple-Inc`), use that name. If creating new, use format: `{TICKER}_{Name-With-Hyphens}`.

### Commit Protocol

- Commit after every 5 brands completed
- Commit message: `Add {N} brand analyses: {TICKER1}, {TICKER2}, ... ({sector})`
- Push to origin/main periodically

### Progress Tracking

After each brand, print:
```
[DONE] {TICKER} — {brand_name} | 8/8 PASS | Worker {N} | {completed}/{total}
```

### Error Recovery

- If a brand fails, log the error and SKIP to the next brand
- Do NOT stop the entire batch for one failure
- Create `data/brands/{TICKER}_{Name}/FAILED.txt` with the error message
- Come back to failed brands at the end

## Worker Assignment

Workers are assigned by chunk file. Each worker reads its chunk:
- `scripts/chunks/worker1.csv`
- `scripts/chunks/worker2.csv`
- `scripts/chunks/worker3.csv`
- `scripts/chunks/worker4.csv`

## Session Startup Prompt

Each Claude Code session should be started with:

```
Read GENERATION_PROTOCOL.md and .claude/CLAUDE.md. You are Worker {N}.
Read your brand list from scripts/chunks/worker{N}.csv.
For each brand in the list, generate all 8 layers following the protocol.
Skip brands that already have English analysis. Validate each brand with
the legal validator. Commit every 5 brands. If you hit an error on one
brand, skip it and continue. Print progress after each brand.
Start now.
```
