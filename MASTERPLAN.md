# Brand Autopsy DB — Master Plan v2

> **Goal**: Build the world's first structured brand intelligence database for all S&P 500 companies,
> legally defensible, globally accessible (English), queryable via API, and visualized on a web dashboard.
>
> **Timeline**: 3+ months (4 phases)
> **Budget**: $0 (Claude Code agent execution)
> **Stack**: Python + SQLAlchemy + FastAPI + Jinja + SQLite (PostgreSQL migration path)

---

## Current State (2026-04-12)

| Metric | Value |
|--------|-------|
| Brands registered | 513 (S&P 500 + 10 original) |
| 6-Layer analysis complete | 174 (34%) — all in Korean |
| Layer 7-8 complete | 0 (AAPL sample only) |
| CSS crawled | 293/503 (58%) |
| DB records | 2,468 colors, 1,044 layer docs, 32 voice matrices |
| English / Source Tier / Disclaimer | Not applied |
| SEC EDGAR data pipeline | Not built |
| Web dashboard | Not built |

## Critical Gaps (from Analyst review)

1. **No SEC data pipeline** — Layer 7/8 depends on data that has no collection mechanism
2. **No automated legal compliance validator** — LLM output goes directly to DB without checking prohibited expressions, missing disclaimers, or Korean characters
3. **No `source_tier` column in DB** — source tiers exist only as inline markdown, making compliance auditing impossible at scale
4. **No `--force` regeneration flag** — cannot re-run analysis for existing brands
5. **Few-shot path fragility** — WSL mount dependency, silent degradation
6. **Korean strings in engine.py** — leak into English analysis
7. **Competitors/ChannelPlaybooks tables empty** — DB parser incomplete

---

## Phase 0: Foundation Hardening (Week 1-2)

**Goal**: Fix all structural issues before any batch generation.

### 0.1 DB Schema Evolution
- [ ] Add `source_tier` column to `layer_documents` (default: `T5_LLM_DRAFT`)
- [ ] Add `data_freshness_date` column to `layer_documents` and `brands`
- [ ] Add `language` column to `layer_documents` (en/ko)
- [ ] Add `disclaimer_present` boolean to `layer_documents`
- [ ] Add `version` column to `layer_documents` (for regeneration tracking)
- [ ] Add `filing_type` to `brands` (10-K vs 20-F for foreign issuers)
- [ ] Create migration script (SQLAlchemy Alembic or manual ALTER TABLE)

**Files**: `src/db/models.py`, new `migrations/` directory

### 0.2 Engine Hardening
- [ ] Add `--force` / `--regenerate` flag to `run_batch.py`
- [ ] Add `--max-cost` budget ceiling with kill switch
- [ ] Archive old outputs to `data/brands/{ticker}/archive/v1-ko/` before overwrite
- [ ] Fix Korean strings in `engine.py` (lines 70, 86, 95-96)
- [ ] Make few-shot path resilient (fallback to embedded examples if WSL mount unavailable)
- [ ] Expand analysis loop from 6 to 8 layers (already done in engine, verify end-to-end)
- [ ] Add per-minute rate limiting (token bucket) for API calls

**Files**: `run_batch.py`, `src/analyzer/engine.py`

### 0.3 Legal Compliance Validator
- [ ] Build `src/analyzer/legal_validator.py`:
  - Scan for prohibited expressions (from LEGAL_RISK_WRITING_POLICY.md lines 119-124)
  - Check disclaimer presence in every layer
  - Detect Korean characters (Unicode range check)
  - Verify at least one T1/T2 source tag per layer
  - Flag intent attribution patterns ("intentionally", "deliberately", "aims to deceive")
  - Flag pejorative patterns ("deceptive", "fraudulent", "manipulative", "exploitative")
- [ ] Integrate validator into `run_batch.py` pipeline (generate → validate → persist)
- [ ] Validation report: pass/fail per layer with specific line numbers
- [ ] Add `--validate-only` mode to scan existing outputs without regeneration

**Files**: new `src/analyzer/legal_validator.py`, `run_batch.py`

### 0.4 Layer 1-6 Prompt English Conversion
- [ ] Convert all 6 prompt templates (01_identity through 06_channel) to English
- [ ] Replace Korean markers (공식)/(추정) with English source tier tags
- [ ] Add mandatory disclaimer block to each template
- [ ] Update few-shot examples to English (or create new English few-shots from AAPL)

**Files**: `src/analyzer/prompts/01_identity.py` through `06_channel.py`

### 0.5 DB Parser Completion
- [ ] Fix `voice_matrices` parser (only 32/174 parsed — investigate gap)
- [ ] Implement `competitors` table parser from Layer 3 markdown
- [ ] Implement `channel_playbooks` table parser from Layer 6 markdown
- [ ] Add `typography` parser improvements (only 106 records vs expected ~500+)

**Files**: `src/db/loader.py`

### Acceptance Criteria — Phase 0
- [ ] `python3 run_batch.py --validate-only` runs on all 174 existing analyses and reports compliance status
- [ ] `python3 run_batch.py --force --ticker AAPL` regenerates AAPL in English with all 8 layers, Source Tier tags, and disclaimers
- [ ] Legal validator catches 100% of prohibited expression patterns from policy doc
- [ ] Old Korean analyses archived to `v1-ko/` before any overwrite
- [ ] DB schema has source_tier, data_freshness_date, language, version columns

---

## Phase 1: Data Pipeline + Full English Regeneration (Week 3-6)

**Goal**: Build SEC EDGAR data pipeline, regenerate all 503 brands in English with 8 layers.

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
- Filing index: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=10-K`
- Full-text search: `https://efts.sec.gov/LATEST/search-index?q={query}`
- XBRL companyfacts: `https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json`

### 1.2 CSS Re-crawl (Failed 210)
- [ ] Re-crawl 210 failed CSS extractions with improved error handling
- [ ] Add Playwright fallback for JavaScript-rendered sites
- [ ] Target: 450/503 CSS success rate (90%)

**Files**: `src/crawler/css_extractor.py`, `src/crawler/batch_crawl.py`

### 1.3 Full English Regeneration (503 brands x 8 layers)
- [ ] Execution method: Claude Code agent parallel execution ($0 cost)
- [ ] Batch strategy: sector-by-sector, starting with IT (best CSS coverage, 66%)
- [ ] Execution order:
  1. Information Technology (73 brands, 51 CSS) — validate quality
  2. Consumer Staples (36 brands) — different sector, quality check
  3. Remaining 9 sectors
- [ ] Each brand: archive Korean v1 → generate English v2 → validate → persist
- [ ] Quality gate: legal validator must pass before DB insertion
- [ ] Parallel execution: up to 5 concurrent agent workers

**Execution tracking**: `run_batch.py --status` dashboard

### 1.4 DB Reload
- [ ] Re-parse all 503 English layer outputs into structured DB tables
- [ ] Verify all tables populated: colors, voice_matrices, typography, keywords, design_rules, competitors, channel_playbooks
- [ ] Target: 503 brands x 8 layers = 4,024 layer_documents

### Acceptance Criteria — Phase 1
- [ ] SEC 10-K data fetched for 480+ brands (95%+ of S&P 500)
- [ ] 503 brands x 8 layers = 4,024 English layer documents generated
- [ ] Legal validator: 0 prohibited expressions, 100% disclaimer coverage
- [ ] All 9 DB tables populated (competitors and channel_playbooks no longer empty)
- [ ] CSS coverage: 450/503 (90%+)
- [ ] voice_matrices: 500+ records (vs current 32)

---

## Phase 2: Extended Data Sources + API (Week 7-10)

**Goal**: Add secondary data sources, build REST API backend.

### 2.1 USPTO Trademark Data (Manual + Semi-automated)
- [ ] USPTO TESS has no public API — use bulk data downloads from USPTO Open Data
- [ ] Alternative: use Google Patents API for patent portfolio analysis
- [ ] Manual collection for top 50 brands, automated for the rest via bulk data
- [ ] Store in `data/raw/{ticker}/trademark_data.json`
- [ ] Enrich Layer 8 (Legal Review) with actual trademark counts

**Note**: Do NOT scrape USPTO TESS directly — ToS violation risk.

### 2.2 Credit Rating Data
- [ ] Source: S&P/Moody's press releases (public, T2_PRIMARY_RELIABLE)
- [ ] Add `credit_ratings` table to DB
- [ ] Enrich Layer 7 (Financial Anatomy) with verified ratings

### 2.3 Google Trends Integration
- [ ] Use `pytrends` library for search interest data
- [ ] Collect 5-year trend data for each brand name + ticker
- [ ] Store in `data/raw/{ticker}/trends_data.json`
- [ ] New DB table: `search_trends` (brand_id, date, interest_score, region)

### 2.4 Wayback Machine Integration
- [ ] Use Wayback CDX API (public, no auth)
- [ ] Fetch homepage snapshots at yearly intervals (5 years)
- [ ] Extract visual evolution: logo changes, color palette shifts, messaging pivots
- [ ] Store metadata in `data/raw/{ticker}/wayback_snapshots.json`

### 2.5 REST API (FastAPI)
- [ ] Expand existing `src/api/` scaffolding:
  - `GET /brands` — list all brands with filtering (sector, status, search)
  - `GET /brands/{ticker}` — full brand profile with all 8 layers
  - `GET /brands/{ticker}/layers/{n}` — single layer content
  - `GET /brands/{ticker}/colors` — color palette
  - `GET /brands/{ticker}/voice` — voice matrix scores
  - `GET /compare?tickers=AAPL,MSFT,GOOGL` — side-by-side comparison
  - `GET /sectors/{sector}` — sector aggregates (avg voice matrix, common colors)
  - `GET /search?q=blue+premium` — full-text search across layer documents
  - `GET /colors/popular` — cross-brand color frequency analysis
  - `GET /health` — API health check
- [ ] Authentication: API key for rate limiting (no public write access)
- [ ] CORS enabled for dashboard frontend
- [ ] OpenAPI/Swagger docs auto-generated

**Files**: `src/api/main.py`, `src/api/routes/`, `src/api/schemas/`

### Acceptance Criteria — Phase 2
- [ ] API serves all endpoints with <200ms response time
- [ ] `/compare` endpoint works for any combination of 2-5 tickers
- [ ] `/search` returns relevant results with source tier filtering
- [ ] USPTO data available for top 50 brands
- [ ] Google Trends data collected for 500+ brands
- [ ] Wayback snapshots indexed for 200+ brands

---

## Phase 3: Web Dashboard + Platform Polish (Week 11-14)

**Goal**: Build the web dashboard, polish for external use, prepare for Stage 2/3 vision.

### 3.1 FastAPI + Jinja Dashboard
- [ ] Homepage: brand search + sector grid overview
- [ ] Brand detail page: 8-layer tabbed view with source tier badges
- [ ] Sector view: aggregated metrics, color clouds, voice matrix radar charts
- [ ] Comparison page: side-by-side brand comparison (2-5 brands)
- [ ] Color explorer: S&P 500 color map, filter by role/sector
- [ ] Financial overview: sector-level financial health indicators (from Layer 7)
- [ ] Legal risk dashboard: risk heatmap across sectors (from Layer 8)

### 3.2 Data Visualization
- [ ] Voice matrix radar charts (Chart.js or D3.js via CDN)
- [ ] Color palette swatches with HEX/LAB values
- [ ] Sector treemap (brand count + analysis coverage)
- [ ] Brand-Finance nexus diagrams (from Layer 7 Section 8)
- [ ] Legal risk heatmap (from Layer 8 summary)

### 3.3 Export & Reports
- [ ] Per-brand PDF report generation (WeasyPrint or similar)
- [ ] CSV/JSON bulk export for researchers
- [ ] API documentation page

### 3.4 Legal & Compliance Polish
- [ ] Global disclaimer on every page
- [ ] Source tier badges visible on all data points
- [ ] "Report Error" mechanism for each brand page
- [ ] Human review queue for Layer 8 (high-sensitivity brands)
- [ ] Terms of Use page covering Fair Use basis

### 3.5 Deployment Preparation
- [ ] SQLite → PostgreSQL migration (for concurrent access)
- [ ] Docker compose setup (API + DB + static assets)
- [ ] CI/CD pipeline (GitHub Actions: test → validate → deploy)
- [ ] Monitoring: basic error tracking + API usage metrics

### Acceptance Criteria — Phase 3
- [ ] Dashboard loads all 503 brands with <1s page load
- [ ] Brand comparison works for any S&P 500 pair
- [ ] PDF export produces professional, legally compliant reports
- [ ] All pages show source tier badges and disclaimers
- [ ] Docker compose deploys successfully on a fresh machine
- [ ] Zero prohibited expressions found by automated legal scan

---

## Risk Register

| # | Risk | Impact | Likelihood | Mitigation |
|---|------|--------|-----------|------------|
| 1 | LLM generates legally risky content at scale | Critical | High | Automated legal validator gate before DB insertion. Human review queue for high-sensitivity brands. |
| 2 | SEC EDGAR rate limits / data gaps | High | Medium | Respect 10 req/sec limit. Handle 20-F foreign issuers. Cache all responses. |
| 3 | Quality variance across 503 brands | High | Medium | Sector-by-sector generation with quality gate. AAPL as gold standard benchmark. |
| 4 | Few-shot path breaks on different machine | Medium | High | Embed few-shot examples in repo, remove WSL mount dependency. |
| 5 | SQLite write contention during parallel generation | Medium | Medium | Sequential writes with WAL mode. Migrate to PostgreSQL in Phase 3. |
| 6 | S&P 500 membership changes (additions/removals) | Low | Certain | Quarterly refresh script. Track effective_date for composition changes. |
| 7 | USPTO scraping ToS violation | High | Low | Use bulk data downloads only. No direct TESS scraping. |
| 8 | Brand sends cease & desist | High | Low | All content backed by T1/T2 sources. Fair Use 4-factor analysis in Layer 8. Legal counsel on retainer recommended for Stage 3. |

---

## Stage Vision Roadmap

```
NOW                    Phase 0-1              Phase 2-3              Future
 |                        |                      |                     |
 v                        v                      v                     v
[Korean 6-Layer DB] → [English 8-Layer     → [API + Dashboard    → [Brand Risk
 174 brands            503 brands              Full S&P 500          Intelligence
 No legal gates]       SEC EDGAR data          Extended data          Platform
                       Legal validator]         sources]              M&A / Investment]

                       STAGE 1                 STAGE 1.5              STAGE 2-3
                       "Searchable DB"         "Visual Intel"         "Risk Platform"
```

---

## Decision Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Language | English-only output | Global database utility; legal defensibility in English-speaking jurisdictions |
| Regeneration strategy | Full regeneration (not translation) | Higher quality; new prompts with Source Tier + Disclaimer built-in |
| Budget | $0 (Claude Code execution) | Agent parallel execution within subscription |
| Frontend | FastAPI + Jinja | Leverages existing scaffolding; no separate build pipeline |
| SEC data source | EDGAR API (efts.sec.gov) | Public, no auth, structured XBRL data available |
| USPTO approach | Bulk data downloads, NOT TESS scraping | ToS compliance |
| DB | SQLite now → PostgreSQL Phase 3 | Avoid premature optimization; migrate when concurrent access needed |
| Regeneration order | Sector-by-sector (IT first) | Highest CSS coverage, fastest quality validation loop |

---

## Next Action

Start Phase 0.1: DB schema evolution → `src/db/models.py` + migration script.
