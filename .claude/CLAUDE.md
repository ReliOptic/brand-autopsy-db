# Brand Autopsy DB — Project Instructions

## Language Policy

**All analysis output MUST be written in English.** This is a global brand intelligence database.
Korean is acceptable only in internal dev notes and commit messages. All layer outputs (01–08),
prompts, templates, and user-facing documentation must be in English.

## Legal Risk Management (Core Principle)

This project's #1 operational risk is defamation / false statement claims from analyzed companies.
Every piece of content must be defensible in court. Follow these rules without exception:

### Source Tier System

Every factual claim must carry a source tier tag:

- `T1_OFFICIAL` — SEC filings (10-K, 10-Q, 8-K, DEF 14A), company IR, official press releases
- `T2_PRIMARY_RELIABLE` — Official interviews, earnings call transcripts, regulatory agency records
- `T3_SECONDARY_RELIABLE` — Reputable journalism (WSJ, Bloomberg, Reuters), industry research reports
- `T4_INFERRED` — Project's own interpretation based on public data (must be explicitly labeled)
- `T5_LLM_DRAFT` — Unverified LLM output (never publish externally)

### Mandatory Rules

1. **No assertions without verifiable sources.** If you can't cite it, don't write it.
2. **Separate fact from interpretation.** Never mix confirmed data and inference in the same paragraph.
3. **Use hedged language for interpretations.** Prefer: "suggests", "indicates", "may reflect", "appears to", "based on public filings". Never: "is", "proves", "clearly shows" for non-T1 claims.
4. **No intent attribution.** Never claim to know a company's internal motivations, strategies they haven't disclosed, or hidden agendas. Write what they DO, not what they THINK.
5. **No pejorative characterizations.** Never use words like "deceptive", "fraudulent", "manipulative", "exploitative" as assertions. If regulatory bodies have used such language, quote them with attribution.
6. **Competitor comparisons must be metric-based.** Use observable, quantifiable data. Not "better/worse" but "higher/lower [metric]".
7. **Mark all estimates.** Any number not directly from T1/T2 sources must be tagged `(estimated)` with estimation basis.
8. **Include disclaimers.** Every layer output must include a disclaimer stating this is brand strategy analysis, not investment/legal advice, based on publicly available information.

### Prohibited Expressions

- Assertions of illegality, fraud, or criminal intent
- Characterizing a company's actions as "deceptive" or "manipulative" without regulatory citation
- Generalizing consumer sentiment without survey data
- Stating competitive superiority/inferiority as fact
- Value judgments on social/political issues presented as factual statements

### Allowed Expressions

- "Based on SEC filings, ..."
- "Public data indicates ..."
- "As observed on the company's official website, ..."
- "This analysis interprets this as ..."
- "This is an estimate; the company has not officially disclosed ..."
- "Regulatory proceedings have raised questions about ..."

## Data Sources (Priority Order)

1. **SEC EDGAR filings** (10-K, 10-Q, 8-K, DEF 14A, 13F) — highest authority
2. **Company official website** — IR pages, press releases, brand guidelines
3. **Regulatory agency records** — FTC, EU Commission, USPTO, court filings
4. **Company CSS/design tokens** — directly observed, timestamped
5. **Reputable financial data providers** — with attribution
6. **Major news outlets** — supplementary only, never sole source for factual claims

Sources NOT acceptable as sole evidence:
- Anonymous forum posts, unverified blogs, re-circulated secondary content
- LLM-generated summaries without human verification
- Social media comments or sentiment (unless from official company accounts)

## Analysis Framework

8-Layer Brand Autopsy:
1. Brand Identity
2. Audience Map
3. Competitive Landscape
4. Content DNA
5. Design System
6. Channel Playbook
7. Financial Anatomy (SEC-based)
8. Legal Review (project risk management focus)

**Layer 8 special note:** The Legal Review layer exists primarily to protect THIS PROJECT
from legal exposure. It should assess: (a) IP/trademark landscape the project must respect,
(b) litigation patterns that inform how carefully we must write about this company,
(c) regulatory sensitivity level, and (d) specific language risks for our analysis.
The output should include a "Writing Risk Guide" section with company-specific dos and don'ts.

## Quality Standards

- All HEX color codes must be valid 6-digit codes with # prefix
- Voice Matrix scores must be integers 1-10 with example sentences
- Every claim must indicate source type: (official), (SEC 10-K), (observed on website), (estimated)
- Competitor analysis must name at least 3 competitors with specific, metric-based differentiators
- Financial data must reference specific fiscal years and filing documents

## Reference

- Full legal writing policy: `LEGAL_RISK_WRITING_POLICY.md`
- Original brand framework: `/mnt/c/Users/ReliQbit/Downloads/brand-autopsy-framework/`
- Database: `data/brand_autopsy.db` (SQLite)
