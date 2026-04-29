# Brand Autopsy Database

A comprehensive brand intelligence platform analyzing 504 S&P 500 companies across 8 strategic layers: Brand Identity, Audience Map, Competitive Landscape, Content DNA, Design System, Channel Playbook, Financial Anatomy (SEC-based), and Legal Review.

## What This Is

Brand Autopsy DB is a full-stack platform (Python backend + Next.js 14 frontend) that surfaces publicly available brand strategy data from 8 layers of analysis. The system automatically refreshes financial data weekly via SEC EDGAR filings, tracks data freshness and quality metrics, and serves a REST API for search, comparison, and analytics across the S&P 500.

**8-Layer Analysis:**
- Layer 01: Brand Identity — archetype, voice matrix, positioning, visual system
- Layer 02: Audience Map — personas, demographics, segments
- Layer 03: Competitive Landscape — direct/indirect competitors, market position
- Layer 04: Content DNA — messaging themes, content strategy, tone guidelines
- Layer 05: Design System — colors, typography, visual language
- Layer 06: Channel Playbook — media channels, campaign focus, engagement model
- Layer 07: Financial Anatomy — revenue, profitability, market cap (from SEC 10-K/10-Q)
- Layer 08: Legal Review — regulatory risk, IP landscape, litigation patterns

## Repository Layout

```
brand-autopsy-db/
├── README.md                    # This file
├── MASTERPLAN.md               # Roadmap and vision (read for project context)
├── PHASE0_CLOSEOUT.md          # Phase handoff record and go/no-go decisions
├── LEGAL_RISK_WRITING_POLICY.md # Source tiers, defamation safeguards, claim validation
├── GENERATION_PROTOCOL.md      # Layer generation process and validation rules
├── PILOT_6_BRAND_POC.md        # Initial 6-brand proof-of-concept report
│
├── .claude/
│   └── CLAUDE.md               # Project conventions (naming, structure, error handling)
│
├── .github/
│   └── workflows/
│       └── weekly-update.yml   # GitHub Actions cron schedule (Sunday 02:00 UTC)
│
├── src/
│   ├── api/                    # FastAPI backend (port 8000)
│   │   ├── main.py             # FastAPI app, CORS config, route registration
│   │   ├── routes/
│   │   │   ├── brands.py       # Brand list, detail, layer retrieval, brief endpoint
│   │   │   ├── compare.py      # Multi-brand comparison
│   │   │   └── analytics.py    # Archetypes, voice similarity, positioning maps, freshness
│   │   └── services/
│   │       └── brand_reader.py # Brand data loading from markdown files
│   │
│   ├── pipeline/               # Data quality & freshness scoring
│   │   ├── quality_scorer.py   # 0–100 score (layers, voice matrix, colors, financial, legal)
│   │   └── freshness_tracker.py# FRESH/AGING/STALE status (90/180-day thresholds)
│   │
│   └── crawler/                # SEC filing fetcher (placeholder for Layer 07 refresh)
│       └── sec_fetcher.py      # XBRL parser (known bug: uses fy instead of end date year)
│
├── web/                        # Next.js 14 frontend (port 3000, dev: npm run dev)
│   ├── app/
│   │   ├── page.tsx            # Homepage
│   │   ├── login/              # next-auth v5 Google OAuth + email
│   │   ├── account/            # User profile & subscription
│   │   ├── dashboard/          # Analytics dashboard
│   │   ├── brands/[ticker]/    # Brand detail + full layer view
│   │   ├── brands/[ticker]/brief/ # 1-pager summary
│   │   ├── compare/            # Side-by-side comparison (up to 4 brands)
│   │   ├── analytics/          # Voice matrix positioning map, sector breakdown
│   │   ├── reports/[sector]/   # Sector deep-dive reports
│   │   ├── admin/inventory/    # Admin: brand list + quality/freshness dashboard
│   │   ├── settings/           # API key management (OpenRouter)
│   │   ├── pricing/            # Stripe billing plans
│   │   └── waitlist/           # Sign-up before launch
│   ├── .env.local              # API URL, auth secrets, Stripe keys
│   ├── lib/api.ts              # TypeScript API client
│   └── package.json
│
├── scripts/
│   ├── dev.sh                  # Start backend (8000) + frontend (3000) together
│   ├── cron_runner.py          # Weekly pipeline: filing detection → Layer 07 refresh → quality rescore → freshness update
│   └── run_quality_check.py    # CLI report: top N brands by score, optionally filtered to STALE only
│
├── data/
│   ├── brands/                 # 504 S&P 500 brand directories (TICKER/context/*.md layers)
│   ├── raw/                    # SEC filing cache (TICKER/sec_10k.json, sec_10q.json, etc.)
│   ├── sp500_list.csv          # Master ticker list
│   ├── quality_scores.json     # Per-brand score (committed to surface regressions)
│   ├── freshness.json          # Per-brand status + days-since-update (committed)
│   └── logs/                   # Cron execution logs (cron_YYYYMMDD.log per run)
│
├── pyproject.toml              # Python dependencies (sqlalchemy, fastapi, uvicorn, anthropic, etc.)
├── uv.lock                     # Locked dependency versions (uv only)
├── .env.example                # Minimal config template (ANTHROPIC_API_KEY, DATABASE_URL)
└── .gitignore                  # Excludes .env.local, .venv, __pycache__, node_modules
```

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- `uv` package manager (install: `pip install uv`)

### Setup

1. Clone and navigate:
   ```bash
   git clone <repo-url>
   cd brand-autopsy-db
   ```

2. Sync Python dependencies:
   ```bash
   uv sync
   ```

3. Copy environment template:
   ```bash
   cp .env.example .env
   # Edit .env: add your ANTHROPIC_API_KEY
   ```

4. Configure web app environment (only needed if using authentication/billing):
   ```bash
   cat > web/.env.local <<'EOF'
   # Required for API access
   NEXT_PUBLIC_API_URL=http://localhost:8001
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   
   # Next-auth v5 (optional, used for login)
   AUTH_SECRET=<generate-with-openssl-rand-hex-32>
   AUTH_GOOGLE_ID=<your-google-oauth-client-id>
   AUTH_GOOGLE_SECRET=<your-google-oauth-secret>
   AUTH_RESEND_KEY=<your-resend-api-key>
   AUTH_EMAIL_FROM=noreply@bautopsy.com
   
   # Stripe billing (optional)
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   STRIPE_PRICE_ID_PRO=price_...
   EOF
   ```

5. Boot both servers:
   ```bash
   scripts/dev.sh
   ```
   - Backend (FastAPI): http://localhost:8000
   - Frontend (Next.js): http://localhost:3000
   - API docs (Swagger): http://localhost:8000/docs

### Environment Variables Reference

**Root `.env`** (required for backend):
| Variable | Purpose | Required | Default |
|----------|---------|----------|---------|
| `ANTHROPIC_API_KEY` | Anthropic Claude API key (Layer generation) | Yes | — |
| `DATABASE_URL` | SQLite path or PostgreSQL connection | No | `sqlite:///data/brand_autopsy.db` |

**`web/.env.local`** (only required if using auth/billing):
| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend endpoint (frontend calls to this) | No (falls back to `http://localhost:8000`) |
| `NEXT_PUBLIC_SITE_URL` | Web app base URL | No |
| `AUTH_SECRET` | next-auth encryption key | No (auth disabled if missing) |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | No |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret | No |
| `AUTH_RESEND_KEY` | Resend email service API key | No |
| `AUTH_EMAIL_FROM` | Sender email for Resend | No |
| `STRIPE_SECRET_KEY` | Stripe secret (server-side) | No |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (client-side) | No |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing key | No |
| `STRIPE_PRICE_ID_PRO` | Stripe Pro plan price ID | No |

## Operational Pipeline

### Automatic Weekly Run

The system refreshes data every Sunday at 02:00 UTC via GitHub Actions (`.github/workflows/weekly-update.yml`):

1. **Filing Detection** — Scan SEC cache for 10-K/10-Q filed in last 7 days
2. **Layer 07 Refresh** — Regenerate Financial Anatomy for newly-filed companies (optional, currently stubbed)
3. **Quality Rescore** — Compute 0–100 quality score for all brands
4. **Freshness Update** — Recompute FRESH/AGING/STALE status for all brands
5. **Commit & Push** — Auto-commit updated `quality_scores.json` and `freshness.json` to surface regressions

### Manual Trigger

Use GitHub Actions `workflow_dispatch` to run on-demand:
```bash
# Via gh CLI:
gh workflow run weekly-update.yml -f dry_run=true -f tickers="AAPL MSFT"

# Or visit: https://github.com/owner/repo/actions/workflows/weekly-update.yml
# Click "Run workflow" → set dry_run + tickers → submit
```

### Local Execution

Run the cron pipeline locally:
```bash
# Full refresh (all S&P 500)
python scripts/cron_runner.py

# Dry-run (no writes)
python scripts/cron_runner.py --dry-run

# Specific tickers
python scripts/cron_runner.py --tickers AAPL MSFT GOOGL

# Refresh Layer 7 only (instead of default Layer 7)
python scripts/cron_runner.py --layer 7

# Refresh all layers
python scripts/cron_runner.py --layer all

# Print JSON summary to stdout (for external pipelines)
python scripts/cron_runner.py --notify
```

**Logs** are written to `data/logs/cron_YYYYMMDD.log` after each run. Check logs for errors or skipped tickers.

### On-Demand Quality Report

Generate a table of top brands by quality score or filter by freshness:
```bash
# Top 20 brands
python scripts/run_quality_check.py --top 20

# Only show stale entries
python scripts/run_quality_check.py --stale-only

# Top 10 stale
python scripts/run_quality_check.py --top 10 --stale-only
```

Output columns: `TICKER`, `SCORE` (0–100), `LAYERS` (completed/total), `VOICE` (matrix present), `COLORS` (count), `FINANCIAL` (L7 data), `LEGAL` (L8 risk level), `FRESHNESS` (status + days).

## API Endpoints

All endpoints are served on `http://localhost:8000` in development.

### Brand Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Health check + brand count |
| GET | `/api/brands` | List all brands (paginated, searchable) |
| GET | `/api/brands/{ticker}` | Get brand detail (metadata + all layers) |
| GET | `/api/brands/{ticker}/layers/{num}` | Get single layer markdown (num: 1–8) |
| GET | `/api/brands/{ticker}/brief` | Get 1-pager brief (positioning, channels, financial, risk) |
| GET | `/api/brands/{ticker}/quality` | Get quality score for brand |
| GET | `/compare?a={t1}&b={t2}&c={t3}&d={t4}` | Compare 2–4 brands (returns array) |

**Query Parameters** (for `/api/brands`):
- `q` — search by ticker or name
- `sector` — filter by sector
- `archetype` — filter by brand archetype
- `limit` — page size (default: 48, max: 200)
- `offset` — pagination offset (default: 0)

### Analytics Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/analytics/quality-summary` | Aggregate quality stats (avg score, distribution) |
| GET | `/api/analytics/freshness-summary` | Aggregate freshness (FRESH/AGING/STALE counts) |
| GET | `/api/analytics/archetypes` | Archetype distribution + sector breakdown |
| GET | `/api/analytics/sectors` | Sector summary + top archetypes per sector |
| GET | `/api/analytics/voice-similarity/{ticker}` | Find 10 most similar brands by voice matrix |
| GET | `/api/analytics/positioning?sector={sector}` | Positioning map data (Voice Matrix 2D plot) |

**Example Request:**
```bash
curl "http://localhost:8000/api/brands?q=apple&limit=5"
curl "http://localhost:8000/api/brands/AAPL/brief"
curl "http://localhost:8000/api/compare?a=AAPL&b=MSFT&c=GOOGL"
```

**API Docs:** Interactive Swagger UI at `http://localhost:8000/docs`

## Web App Routes

All routes are served on `http://localhost:3000` in development. Authentication gates account, admin, and settings pages.

| Path | Purpose | Auth Required |
|------|---------|---|
| `/` | Homepage + featured brands | No |
| `/brands` | Browse all brands (search/filter) | No |
| `/brands/{ticker}` | Brand detail page (all 8 layers) | No |
| `/brands/{ticker}/brief` | 1-pager brief | No |
| `/compare` | Multi-brand comparison tool | No |
| `/analytics` | Voice matrix positioning maps, sector breakdown | No |
| `/reports` | Sector deep-dive reports | No |
| `/login` | Google OAuth + email login (next-auth v5) | No |
| `/account` | User profile, subscription plan | Yes |
| `/settings` | API key management (OpenRouter) | Yes |
| `/admin/inventory` | Admin: brand quality/freshness dashboard | Yes (Admin) |
| `/pricing` | Stripe billing plans | No |
| `/waitlist` | Pre-launch sign-up | No |

## Quality & Freshness Model

### Quality Score (0–100)

Computed per brand based on 6 weighted metrics in `src/pipeline/quality_scorer.py`:

| Metric | Max Points | Criterion |
|--------|-----------|-----------|
| Layer Count | 80 | 10 points per layer completed (0–8 layers) |
| Voice Matrix | 5 | All 4 axes present and non-zero |
| Color Count | 6 | 2 points per valid hex color (capped at 3 colors) |
| Positioning Statement | 4 | Positioning extracted from Layer 01 |
| Financial Data | 3 | Dollar amount found in Layer 07 |
| Legal Risk Level | 2 | LOW/MEDIUM/HIGH extracted from Layer 08 |
| **Total** | **100** | Sum of all components |

**Interpretation:**
- 80–100: High quality (all/most layers complete)
- 60–79: Medium quality (6–7 layers complete)
- < 60: Low quality (< 6 layers or missing critical data)

### Freshness Status

Computed per brand based on file modification timestamps in `src/pipeline/freshness_tracker.py`:

| Status | Days Since Newest Layer | Interpretation |
|--------|------------------------|---|
| FRESH | < 90 | Recently updated, analysis current |
| AGING | 90–179 | Approaching refresh window |
| STALE | ≥ 180 | Older than 6 months, needs update |

**Note:** Freshness is recomputed weekly; stale brands are candidates for Layer 07 financial refresh on next cron run.

## Legal & Data Policy

This project's primary operational risk is defamation / false statement liability. All analysis must be defensible.

**Read before writing/editing any content:**
- `LEGAL_RISK_WRITING_POLICY.md` — source tier system (T1–T5), required hedging language, prohibited assertions, defamation safeguards
- `.claude/CLAUDE.md` — project conventions (naming, structure, error handling, language policy)

### Source Tiers

Every factual claim in the database carries a source tier:

- **T1_OFFICIAL** — SEC filings (10-K, 10-Q, 8-K, DEF 14A), official IR pages, press releases
- **T2_PRIMARY_RELIABLE** — Regulatory records, earnings call transcripts, official interviews
- **T3_SECONDARY_RELIABLE** — Reputable journalism (WSJ, Bloomberg), industry reports
- **T4_INFERRED** — Project's interpretation of public data (must be labeled)
- **T5_LLM_DRAFT** — Unverified LLM output (never publish externally)

### Non-Negotiable Rules

1. **No assertions without sources.** Every claim must be traceable.
2. **Separate fact from interpretation.** Never mix them in the same paragraph.
3. **Hedge interpretations.** Use "suggests", "indicates", "may reflect", not "is" or "proves" for non-T1 claims.
4. **No intent attribution.** Never claim to know internal motivations or hidden strategies.
5. **No pejorative language.** Avoid "deceptive", "fraudulent", "exploitative" unless regulators have said so (then quote them).
6. **Comparisons must be metric-based.** Use data (e.g., "higher revenue"), not subjective judgments.
7. **Mark all estimates.** Tag estimates with `(estimated)` and note the basis.
8. **Include disclaimers.** Every output includes: "This is brand strategy analysis based on publicly available information, not investment or legal advice."

**All output must be in English** (Korean acceptable only in internal dev notes).

---

## Running the System

**For local development:**
```bash
scripts/dev.sh  # Starts backend + frontend
```

**For production deployment:**
- Backend: `uvicorn src.api.main:app --host 0.0.0.0 --port 8000`
- Frontend: `npm run build && npm start` (in `web/`)
- Cron: Schedule `python scripts/cron_runner.py` weekly via systemd, cron, or orchestrator

**For CI/CD:**
- GitHub Actions handles weekly auto-refresh (see `.github/workflows/weekly-update.yml`)
- All data files (`quality_scores.json`, `freshness.json`, logs) are committed to surface regressions

---

**Questions?** See `MASTERPLAN.md` for roadmap, `PHASE0_CLOSEOUT.md` for project status, or `LEGAL_RISK_WRITING_POLICY.md` for content guidelines.
