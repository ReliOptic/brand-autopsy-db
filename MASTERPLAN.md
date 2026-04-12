# Brand Autopsy DB — Master Plan v2

> **Goal**: Build the world's first open-source S&P 500 brand intelligence archive —
> 503 companies x 8-layer markdown research documents, legally defensible, globally accessible in English.
> The MD document archive IS the product. DB and API are downstream services built on top.
>
> **Timeline**: 3+ months (4 phases)
> **Budget**: $0 (Claude Code agent execution)
> **Stack**: Python + Markdown files (primary) → SQLAlchemy + FastAPI + Jinja (secondary)

---

## Architecture: Documents First, DB Second

```
Research & Analysis    Open-Source Archive     Downstream Services
─────────────────     ──────────────────      ───────────────────

Claude Code agents    data/brands/            DB parsing
  + SEC EDGAR data      {TICKER}_{Name}/        ↓
  + CSS crawl data        context/            SQLite / PostgreSQL
  + Legal policy            01-brand-identity.md    ↓
       │                    02-audience-map.md   REST API (FastAPI)
       │                    03-competitive-landscape.md   ↓
       ▼                    04-content-dna.md    Web Dashboard
  Generate MD files         05-design-system.md    (FastAPI + Jinja)
  per brand                 06-channel-playbook.md
       │                    07-financial-anatomy.md
       │                    08-legal-review.md
       ▼                      │
  Legal Validator             ▼
  (auto-scan)            GitHub Public Repo
                         (open-source archive)
```

**The markdown files are the product.**
- Each brand = a folder of 8 research documents
- Anyone can read, fork, contribute, or build on top
- DB/API/Dashboard serve people who need structured queries

---

## Current State (2026-04-12)

| Metric | Value |
|--------|-------|
| Brands registered | 513 (S&P 500 + 10 original) |
| 6-Layer analysis complete | 174 (34%) — all in Korean |
| Layer 7-8 complete | 0 (AAPL sample only) |
| CSS crawled | 293/503 (58%) |
| English / Source Tier / Disclaimer | Not applied |
| SEC EDGAR data pipeline | Not built |

## Critical Gaps

1. **All 174 analyses are in Korean** — must be English for global open-source archive
2. **No SEC data pipeline** — Layer 7/8 depends on data with no collection mechanism
3. **No automated legal compliance validator** — LLM output goes to files unchecked
4. **No `--force` regeneration flag** — cannot re-run analysis for existing brands
5. **Few-shot path fragility** — WSL mount dependency, silent degradation
6. **Korean strings in engine.py** — leak into English analysis prompts

---

## Phase 0: Foundation Hardening (Week 1-2)

**Goal**: Fix all structural issues before any batch generation. Make the engine produce
legally defensible English markdown documents.

### 0.1 Engine Hardening
- [x] Add `--force` / `--regenerate` flag to `run_batch.py`
- [x] Archive old outputs to `data/brands/{ticker}/archive/v1-ko/` before overwrite
- [x] Fix Korean strings in `engine.py` (lines 70, 86, 95-96)
- [x] Make few-shot path resilient (fallback to embedded examples if WSL mount unavailable)
- [ ] Verify 8-layer analysis loop works end-to-end (already coded, needs testing)

**Files**: `run_batch.py`, `src/analyzer/engine.py`

### 0.2 Legal Compliance Validator
- [x] Build `src/analyzer/legal_validator.py`:
  - Scan for prohibited expressions (from LEGAL_RISK_WRITING_POLICY.md lines 119-124)
  - Check disclaimer presence in every layer
  - Detect Korean characters (Unicode range check)
  - Verify at least one source citation per layer
  - Flag intent attribution patterns ("intentionally", "deliberately", "aims to deceive")
  - Flag pejorative patterns ("deceptive", "fraudulent", "manipulative", "exploitative")
- [x] Integrate validator into pipeline: generate → validate → save to file
- [x] Validation report: pass/fail per layer with specific line numbers
- [x] Add `--validate-only` mode to scan existing MD files without regeneration

**Files**: new `src/analyzer/legal_validator.py`, `run_batch.py`

### 0.3 Layer 1-6 Prompt English Conversion
- [x] Convert all 6 prompt templates (01_identity through 06_channel) to English
- [x] Replace Korean markers (공식)/(추정) with English source tags: (official), (estimated)
- [x] Add mandatory disclaimer block to each template
- [x] Update few-shot examples to English (or create new English few-shots from AAPL)

**Files**: `src/analyzer/prompts/01_identity.py` through `06_channel.py`

### 0.4 AAPL Gold Standard
- [x] Regenerate AAPL with new English prompts (all 8 layers)
- [x] Run legal validator — must pass 100%
- [x] Manual quality review against existing Korean version
- [x] This becomes the benchmark for all subsequent generation

### Acceptance Criteria — Phase 0
- [x] `python3 run_batch.py --force --ticker AAPL` regenerates AAPL in English, 8 layers, with disclaimers and source tags
- [x] Legal validator catches 100% of prohibited expression patterns from policy doc
- [x] `python3 run_batch.py --validate-only` scans existing files and reports compliance status
- [x] Old Korean analyses archived to `archive/v1-ko/` before any overwrite
- [x] AAPL English output quality matches or exceeds Korean original

**2026-04-13 closure note**
- Canonical runner hardening is implemented in code: `--validate-only`, legal-validator-first pipeline gating, canonical brand directory resolution, and few-shot fallback are all in place.
- Phase 0 is considered closed under the accepted in-agent execution model. External Anthropic API key usage is not required for acceptance when the repository already contains the AAPL English corpus, Korean archive, and a passing legal-validator result.

---

## Phase 1: SEC Data + Full S&P 500 Research (Week 3-8)

**Goal**: Collect SEC EDGAR data, regenerate all 503 brands as English 8-layer markdown documents.
This is the core research phase — the primary output is a complete open-source document archive.

### 1.1 SEC EDGAR Data Fetcher
- [ ] Build `src/crawler/sec_fetcher.py`:
  - Use EDGAR full-text search API (efts.sec.gov — public, no auth required)
  - Fetch latest 10-K (or 20-F for foreign issuers) for each ticker
  - Extract: Risk Factors (Item 1A), Legal Proceedings (Item 3), Financial Statements
  - Parse XBRL for structured financial data (revenue, margins, segments)
  - Store in `data/raw/{ticker}/sec_10k.json` with metadata (filing_date, cik, form_type)
- [ ] Rate limit: respect SEC EDGAR 10 req/sec limit, add User-Agent header per SEC policy
- [ ] Handle edge cases: foreign private issuers (20-F), recent IPOs (limited history), delistings
- [ ] Add `--sec-fetch` mode to `run_batch.py`

**Files**: new `src/crawler/sec_fetcher.py`, `run_batch.py`

**SEC EDGAR API endpoints**:
- Company search: `https://efts.sec.gov/LATEST/search-index?q={company}&forms=10-K`
- XBRL companyfacts: `https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json`
- Filing index: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=10-K`

### 1.2 CSS Re-crawl (Failed 210)
- [ ] Re-crawl 210 failed CSS extractions with improved error handling
- [ ] Add Playwright fallback for JavaScript-rendered sites
- [ ] Target: 450/503 CSS success rate (90%)

**Files**: `src/crawler/css_extractor.py`, `src/crawler/batch_crawl.py`

### 1.3 Full S&P 500 English Research (503 brands x 8 layers = 4,024 documents)
- [ ] Execution method: Claude Code agent parallel execution ($0 cost)
- [ ] Batch strategy: sector-by-sector, starting with IT (best CSS coverage, 66%)
- [ ] Execution order:
  1. Information Technology (73 brands, 51 CSS) — validate quality on first 10
  2. Consumer Staples (36 brands) — cross-sector quality check
  3. Remaining 9 sectors in order of CSS coverage
- [ ] Each brand: archive Korean v1 → generate English v2 → legal validator → save
- [ ] Quality gate: legal validator must pass before file is finalized
- [ ] Output: `data/brands/{TICKER}_{Name}/context/01..08-*.md`

**Execution tracking**: `run_batch.py --status` dashboard

### 1.4 Open-Source Archive Preparation
- [ ] Write README.md for the document archive (what it is, how to use, how to contribute)
- [ ] Add LICENSE file (CC BY-SA 4.0 recommended for research data)
- [ ] Create `data/brands/INDEX.md` — master index of all 503 brands with status
- [ ] Add contributing guidelines for community corrections
- [ ] Ensure `.gitignore` excludes `data/raw/` (crawled data) but includes `data/brands/` (research output)

### Acceptance Criteria — Phase 1
- [ ] SEC 10-K/20-F data fetched for 480+ brands (95%+ of S&P 500)
- [ ] 503 brands x 8 layers = 4,024 English markdown documents generated
- [ ] Legal validator: 0 prohibited expressions, 100% disclaimer coverage across all 4,024 files
- [ ] CSS coverage: 450/503 (90%+)
- [ ] README, LICENSE, INDEX.md ready for GitHub public release
- [ ] `git push` to public GitHub repository

---

## Phase 2: Extended Data Sources + GitHub Release (Week 9-12)

**Goal**: Enrich the archive with additional data sources. Publish and promote.

### 2.1 Additional Data Collection
- [ ] **USPTO Trademark Data** — bulk data downloads from USPTO Open Data (NOT TESS scraping)
  - Store in `data/raw/{ticker}/trademark_data.json`
  - Enrich Layer 8 with actual trademark counts
- [ ] **Credit Rating Data** — S&P/Moody's public press releases (T2_PRIMARY_RELIABLE)
  - Enrich Layer 7 with verified ratings
- [ ] **Google Trends** — `pytrends` library for 5-year brand search interest
  - Store in `data/raw/{ticker}/trends_data.json`
- [ ] **Wayback Machine** — CDX API for homepage snapshot history
  - Store in `data/raw/{ticker}/wayback_snapshots.json`
  - Visual evolution analysis for design-heavy brands

### 2.2 Selective Layer Regeneration
- [ ] Re-run Layer 7 (Financial) with enriched SEC + credit rating data
- [ ] Re-run Layer 8 (Legal) with enriched USPTO trademark data
- [ ] Legal validator pass on all updated files

### 2.3 GitHub Open-Source Launch
- [ ] Final audit: legal validator across all 4,024+ documents
- [ ] GitHub repo structure:
  ```
  brand-autopsy-db/
  ├── README.md              (project overview, usage guide)
  ├── LICENSE                 (CC BY-SA 4.0)
  ├── MASTERPLAN.md           (this document)
  ├── LEGAL_RISK_WRITING_POLICY.md
  ├── data/
  │   ├── brands/             (THE ARCHIVE — 503 brand folders)
  │   │   ├── INDEX.md
  │   │   ├── AAPL_Apple-Inc/
  │   │   │   └── context/    (8 layer markdown files)
  │   │   ├── MSFT_Microsoft/
  │   │   └── ...
  │   └── sp500_list.csv
  └── src/                    (generation toolchain)
  ```
- [ ] Write announcement / blog post draft
- [ ] Submit to Hacker News, Reddit r/dataisbeautiful, relevant communities

### Acceptance Criteria — Phase 2
- [ ] USPTO data available for 100+ brands
- [ ] Google Trends data collected for 500+ brands
- [ ] Wayback snapshots indexed for 200+ brands
- [ ] GitHub repo public with proper README, LICENSE, contributing guide
- [ ] Zero legal compliance violations in final audit

---

## Phase 3: DB + API + Dashboard (Week 13-16)

**Goal**: Build structured database and web interface on top of the markdown archive,
for users who need programmatic access or visual exploration.

### 3.1 DB Schema & Parsing
- [ ] Add new columns: `source_tier`, `data_freshness_date`, `language`, `version`
- [ ] Fix parsers: voice_matrices (32→500+), competitors (0→filled), channel_playbooks (0→filled)
- [ ] Parse all 4,024 English markdown documents into structured DB tables
- [ ] Target: all 9 tables fully populated

**Files**: `src/db/models.py`, `src/db/loader.py`

### 3.2 REST API (FastAPI)
- [ ] Expand existing `src/api/` scaffolding:
  - `GET /brands` — list with filtering (sector, status, search)
  - `GET /brands/{ticker}` — full brand profile with all 8 layers
  - `GET /brands/{ticker}/layers/{n}` — single layer content
  - `GET /brands/{ticker}/colors` — color palette
  - `GET /brands/{ticker}/voice` — voice matrix scores
  - `GET /compare?tickers=AAPL,MSFT,GOOGL` — side-by-side comparison
  - `GET /sectors/{sector}` — sector aggregates
  - `GET /search?q=blue+premium` — full-text search across layers
  - `GET /colors/popular` — cross-brand color frequency analysis
- [ ] Authentication: API key for rate limiting
- [ ] OpenAPI/Swagger docs auto-generated

**Files**: `src/api/main.py`, `src/api/routes/`, `src/api/schemas/`

### 3.3 Web Dashboard (FastAPI + Jinja)
- [ ] Homepage: brand search + sector grid overview
- [ ] Brand detail page: 8-layer tabbed view with source tags
- [ ] Sector view: aggregated metrics, color clouds, voice matrix radar charts
- [ ] Comparison page: side-by-side brand comparison (2-5 brands)
- [ ] Color explorer: S&P 500 color map, filter by role/sector
- [ ] Financial overview: sector-level indicators (from Layer 7)
- [ ] Legal risk dashboard: risk heatmap across sectors (from Layer 8)

### 3.4 Visualization
- [ ] Voice matrix radar charts (Chart.js via CDN)
- [ ] Color palette swatches with HEX/LAB values
- [ ] Sector treemap
- [ ] Legal risk heatmap

### 3.5 Export & Deployment
- [ ] Per-brand PDF report generation
- [ ] CSV/JSON bulk export for researchers
- [ ] SQLite → PostgreSQL migration (for concurrent API access)
- [ ] Docker compose setup
- [ ] Global disclaimer + Terms of Use on every page

### Acceptance Criteria — Phase 3
- [ ] API serves all endpoints with <200ms response time
- [ ] Dashboard loads all 503 brands with <1s page load
- [ ] PDF export produces legally compliant reports
- [ ] All pages show source tags and disclaimers
- [ ] Docker compose deploys successfully on a fresh machine

---

## Risk Register

| # | Risk | Impact | Likelihood | Mitigation |
|---|------|--------|-----------|------------|
| 1 | LLM generates legally risky content at scale | Critical | High | Automated legal validator gate. Human review for high-sensitivity brands. |
| 2 | SEC EDGAR rate limits / data gaps | High | Medium | Respect 10 req/sec. Handle 20-F foreign issuers. Cache all responses. |
| 3 | Quality variance across 503 brands | High | Medium | Sector-by-sector with quality gate. AAPL as gold standard. |
| 4 | Few-shot path breaks on different machine | Medium | High | Embed few-shot examples in repo. |
| 5 | S&P 500 membership changes | Low | Certain | Quarterly refresh script. |
| 6 | USPTO scraping ToS violation | High | Low | Bulk data downloads only. No direct TESS scraping. |
| 7 | Brand sends cease & desist | High | Low | All content T1/T2 sourced. Fair Use analysis in Layer 8. |
| 8 | Open-source contributors introduce risky content | Medium | Medium | PR review + legal validator CI gate. |

---

## Stage Vision

```
Phase 0-1                Phase 2                Phase 3               Future
──────────               ───────                ───────               ──────

503 brands            GitHub Public         API + Dashboard       Brand Risk
8-layer English MD    Open-Source Archive   Structured queries    Intelligence
Legal validator       Extended data         Visualization         Platform
SEC EDGAR data        Community             PDF reports           M&A / Investment
                                                                  Copilot

THE ARCHIVE           THE RELEASE           THE SERVICE           THE PLATFORM
(research)            (open-source)         (API users)           (enterprise)
```

---

## Decision Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Primary output | Markdown files, NOT database | MD files are human-readable, git-friendly, open-source-ready. DB is a derivative. |
| Language | English-only output | Global archive utility; legal defensibility |
| Regeneration | Full regeneration (not translation) | Higher quality with new prompts |
| Budget | $0 (Claude Code execution) | Agent parallel execution within subscription |
| Open-source license | CC BY-SA 4.0 (proposed) | Allows reuse with attribution; share-alike preserves openness |
| Frontend | FastAPI + Jinja | Server-side rendering; no separate build pipeline |
| SEC data | EDGAR API (efts.sec.gov) | Public, no auth, XBRL structured data |
| USPTO | Bulk data downloads only | TESS scraping = ToS violation risk |
| DB timing | After MD archive complete | Documents first, structured data second |
| Regeneration order | Sector-by-sector (IT first) | Highest CSS coverage, fastest quality feedback |

---

## Next Action

Start Phase 0.1: Engine hardening → `run_batch.py` + `engine.py` fixes.
