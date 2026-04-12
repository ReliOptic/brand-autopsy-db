"""Layer 7: Financial Anatomy analysis prompt."""

TEMPLATE = """# 07. Financial Anatomy — {brand_name}

Based on the collected data and previous layer analyses below, dissect this brand's financial structure.

**Core Principles**:
- All figures must be verifiable from SEC filings (10-K, 10-Q, DEF 14A).
- Tag each figure with its source (filing name + section). Use (official) for confirmed data.
- Any figure not directly from filings must be tagged (estimated) with estimation basis.
- Provide SEC EDGAR direct links for one-click verification.
- CIK-based EDGAR URL pattern: https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={{CIK}}&type=10-K&dateb=&owner=include&count=10

## Previous Layer Analysis (Brand Context)
{previous_layers}

## Collected Data
{collected_data}

## SEC Filing Data
{sec_data}

## Output Format (follow this structure exactly)

```markdown
# 07. Financial Anatomy — {brand_name}

> **Disclaimer**: All financial data in this document is extracted from SEC filings (10-K, 10-Q, DEF 14A). Source links are provided for each figure. Figures without an "estimated" tag are verifiable in the original filings. This is brand strategy analysis, not investment advice.

---

## Filing Source Links (Primary Sources)

| Document | Fiscal Year | Direct Link |
|----------|-------------|-------------|
| 10-K (Annual Report) | [Latest FY] | [SEC EDGAR — {{ticker}} 10-K](EDGAR URL) |
| 10-Q (Quarterly Report) | [Latest Q] | [SEC EDGAR — {{ticker}} 10-Q](EDGAR URL) |
| DEF 14A (Proxy Statement) | [Latest FY] | [SEC EDGAR — {{ticker}} DEF 14A](EDGAR URL) |
| Earnings Call / IR | [Latest] | [IR Page URL] |

> **CIK Number**: [CIK] — Full EDGAR search: [EDGAR Full Filing Search](URL)

---

## 1. Revenue Anatomy

### 1.1 Consolidated Revenue Trend

| Fiscal Year | Revenue ($B) | YoY Growth | Net Income ($B) | Net Margin | Source |
|-------------|-------------|------------|-----------------|------------|--------|
(Minimum 5 years. Cite 10-K year for each row)

> **5-Year CAGR**: Revenue +X%, Net Income +X% — [growth pattern interpretation]

### 1.2 Segment Revenue (Latest FY)

| Segment | Revenue ($B) | Share | YoY | Strategic Implications |
|---------|-------------|-------|-----|----------------------|
(Based on 10-K Segment Information. Include brand strategy implications for each segment)

> **Source**: [10-K — Segment Information / Notes](EDGAR URL)

### 1.3 Geographic Revenue (Latest FY)

| Region | Revenue ($B) | Share | YoY | Strategic Implications |
|--------|-------------|-------|-----|----------------------|
(Based on 10-K Geographic Information)

> **Source**: [10-K — Geographic Information](EDGAR URL)

---

## 2. Profitability Anatomy

### 2.1 Margin Structure

| Metric | Latest FY | FY-1 | FY-2 | Interpretation |
|--------|----------|------|------|---------------|
| Gross Margin | X% | X% | X% | [trend interpretation] |
| Operating Margin | X% | X% | X% | |
| Net Margin | X% | X% | X% | |
| FCF Margin | X% | X% | X% | |

> **Source**: [10-K — Consolidated Statements of Operations](EDGAR URL)

### 2.2 Segment Margins (if disclosed)

| Segment | Gross Margin | Trend | Source |
|---------|-------------|-------|--------|
(Only include if segment margins are separately disclosed in 10-K. State "Not disclosed — estimate used" if applicable)

> **Brand Strategy Implication**: [How margin structure affects brand positioning]

---

## 3. Investment Structure

### 3.1 R&D Spending

| Fiscal Year | R&D ($B) | % of Revenue | YoY Change | Source |
|-------------|---------|-------------|------------|--------|
(Minimum 4 years)

> **Industry Comparison**: [Compare R&D ratio with same-sector competitors]

### 3.2 Marketing & SG&A

| Fiscal Year | SG&A ($B) | % of Revenue | Trend |
|-------------|----------|-------------|-------|
(Minimum 3 years)

> **Note**: Check whether advertising/marketing costs are separately disclosed. If not, state "included in SG&A" + cite external estimates with attribution.

### 3.3 CapEx & Free Cash Flow

| Item | Latest FY | Notes |
|------|----------|-------|
| CapEx | $X | [Major investment areas] |
| Depreciation | $X | |
| Free Cash Flow | $X | X% of revenue |

> **Source**: 10-K — Consolidated Statements of Cash Flows

---

## 4. Capital Allocation Strategy

### 4.1 Shareholder Returns

| Item | Latest FY | FY-1 | Cumulative |
|------|----------|------|------------|
| Share Buybacks | | | |
| Dividends | | | |
| **Total Returns** | | | |

> **Source**: [10-K — Financing Activities](EDGAR URL)

### 4.2 M&A Strategy

| Major Acquisition | Domain | Brand Strategy Relevance |
|-------------------|--------|------------------------|
(Only include publicly confirmed acquisitions. State "undisclosed" for unconfirmed amounts)

---

## 5. Financial Health

### 5.1 Balance Sheet Highlights

| Item | Latest FY | Interpretation |
|------|----------|---------------|
| Total Assets | | |
| Cash + Marketable Securities | | |
| Total Debt | | |
| Net Cash / Net Debt | | |
| Shareholders' Equity | | |

> **Source**: [10-K — Consolidated Balance Sheets](EDGAR URL)

### 5.2 Credit Ratings

| Agency | Rating | Outlook | Interpretation |
|--------|--------|---------|---------------|
(Moody's, S&P, Fitch — include only publicly available ratings)

---

## 6. Brand Valuation

### 6.1 External Valuations

| Agency | Valuation | Year | Rank | Source Type |
|--------|----------|------|------|-------------|
(Interbrand, Brand Finance, Kantar, etc. All tagged as "third-party estimate")

### 6.2 Brand Premium Quantification

| Metric | This Brand | Industry Avg | Premium | Interpretation |
|--------|-----------|-------------|---------|---------------|
| P/E Ratio | | | | |
| ASP (Core Product) | | vs. competitors | | |
| Customer Retention | | | | (mark estimated if applicable) |

---

## 7. Financial Risk Matrix

### Based on SEC 10-K Risk Factors

| Risk Category | Key Content | Brand Strategy Impact |
|--------------|-------------|----------------------|
(Extracted directly from 10-K Part I, Item 1A. Minimum 5 risks. Brand strategy connection analysis required)

> **Original filing**: [10-K Risk Factors](EDGAR URL)

---

## 8. Brand-Finance Nexus

### 8.1 What Financial Data Reveals About Brand Strategy

| Financial Signal | Brand Strategy Interpretation |
|-----------------|------------------------------|
(Minimum 5 signals. Analyze causal links between financial metrics and brand positioning)

### 8.2 Marketing ROI Framework

[Visualize brand-finance virtuous/vicious cycle as ASCII diagram]

---

## EDGAR Quick Reference

1. **Full EDGAR Filings**: [URL]
2. **EDGAR Full-Text Search**: [URL]
3. **IR Page**: [URL]
4. **XBRL Viewer**: [URL]

> **Data Freshness**: This document is based on [FY year] 10-K. Update required when quarterly 10-Q is filed.
```
"""
