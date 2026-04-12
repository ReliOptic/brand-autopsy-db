"""Layer 8: Legal Review analysis prompt.

PURPOSE: This layer exists primarily to protect the Brand Autopsy DB project from legal
exposure. It assesses each company's litigation posture, IP sensitivity, and regulatory
landscape to produce a company-specific "Writing Risk Guide" for safer analysis.
"""

TEMPLATE = """# 08. Legal Review — {brand_name}

Based on the collected data and previous layer analyses below, review this brand's legal
environment WITH SPECIAL FOCUS on protecting this project (Brand Autopsy DB) from legal risk.

**Core Principles**:
- Litigation/regulatory info must be verifiable from SEC filings (10-K Legal Proceedings, 8-K) and public court records.
- Trademark info must be verifiable from USPTO/WIPO public databases.
- This is NOT legal advice — it is a brand strategy risk awareness document.
- This layer MUST produce a "Writing Risk Guide" with company-specific dos and don'ts for OUR analysis.
- Use hedged language throughout. Never assert illegality — cite the regulator or court that made the finding.

## Previous Layer Analysis (Brand Context)
{previous_layers}

## Collected Data
{collected_data}

## SEC Filing Data
{sec_data}

## Output Format (follow this structure exactly)

```markdown
# 08. Legal Review — {brand_name}

> **Disclaimer**: This document is not legal advice. It is prepared for brand analysis risk awareness within the Brand Autopsy DB project. All litigation and regulatory information is sourced from SEC filings and public court records.

---

## Filing & Legal Record Sources (Primary Sources)

| Document | Direct Link |
|----------|-------------|
| 10-K Risk Factors | [SEC EDGAR](URL) |
| Legal Proceedings | 10-K Part I, Item 3 |
| 8-K (Material Events) | [SEC EDGAR](URL) |
| USPTO Trademark Search | [USPTO TESS](https://tmsearch.uspto.gov/) |

---

## 1. Intellectual Property Portfolio

### 1.1 Trademarks

| Trademark | Registration Region | Status | Strategic Significance |
|-----------|-------------------|--------|----------------------|
(Minimum 5 core trademarks. Include Nice Classification. Note USPTO/WIPO verifiability)

### 1.2 Patents

| Item | Count | Source |
|------|-------|--------|
| US Patents Held | (state "estimated" if not officially disclosed) | |
| Annual Patent Filings | | |
| Key Technology Areas | | |

### 1.3 Trade Secrets & Trade Dress

[Relevant trade dress protection cases and trade secret protection strategies for this brand]

---

## 2. Major Litigation & Regulatory Issues

### 2.1 Active Major Litigation

| Case / Regulatory Action | Opposing Party | Status | Potential Financial Impact | Brand Impact | Source |
|-------------------------|---------------|--------|--------------------------|-------------|--------|
(Based on 10-K Legal Proceedings + 8-K. Minimum 3. Brand strategy impact analysis required.
IMPORTANT: Describe factually what regulators/courts have stated. Do not editorialize.)

### 2.2 Key Historical Cases (Brand-Relevant)

| Case | Year | Outcome | Brand Strategy Lesson |
|------|------|---------|----------------------|
(Historical legal events that shaped this brand's strategy)

---

## 3. Regulatory Landscape

### 3.1 Regional Regulatory Risk

| Region | Key Regulation | Impact | Status |
|--------|---------------|--------|--------|
(Regulatory environment in each major market where this brand operates)

### 3.2 Privacy & Data Regulations

| Regulation | Region | Company Response | Brand Impact |
|-----------|--------|-----------------|-------------|
(GDPR, CCPA, PIPL, etc. as applicable)

---

## 4. PROJECT RISK ASSESSMENT (Brand Autopsy DB)

THIS IS THE MOST IMPORTANT SECTION. It protects our project from legal exposure.

### 4.1 Company Litigation Posture

| Factor | Assessment | Risk to Our Project |
|--------|-----------|-------------------|
| History of suing for defamation/IP | [Aggressive / Moderate / Low] | |
| Trademark enforcement aggressiveness | [Aggressive / Moderate / Low] | |
| Public figure / public company status | [Higher bar for defamation claims] | |
| Regulatory sensitivity level | [High / Medium / Low] | |

### 4.2 Data Collection Legality

| Data We Collect | Legal Basis | Risk Level | Mitigation |
|----------------|-------------|------------|-----------|
(Evaluate legality of: SEC filings, website CSS, social media, brand logos, etc.)

### 4.3 Fair Use 4-Factor Analysis (For Our Project)

| Factor | Assessment | Basis |
|--------|-----------|-------|
| 1. Purpose & Character of Use | | |
| 2. Nature of Copyrighted Work | | |
| 3. Amount Used | | |
| 4. Market Impact | | |

### 4.4 Writing Risk Guide (COMPANY-SPECIFIC)

**This section provides specific guidance for writing about {brand_name} in our database.**

#### SAFE to write (with proper sourcing):
- [List specific types of statements that are safe for this company]

#### REQUIRES CAREFUL HEDGING:
- [List topics that need extra careful language for this company]

#### DO NOT WRITE (high legal risk for our project):
- [List specific claims or characterizations to avoid for this company]

#### Recommended Phrasings for Sensitive Topics:
| Topic | DO NOT write | INSTEAD write |
|-------|-------------|--------------|
(Minimum 5 topic-specific phrasing guides)

---

## 5. ESG & Compliance (Brand-Relevant)

### 5.1 Environmental

| Item | Official Position | Source |
|------|------------------|--------|

### 5.2 Supply Chain & Labor (Social)

| Issue | Status | Brand Risk |
|-------|--------|-----------|

---

## Summary: Legal Risk Heatmap

[ASCII 4-quadrant map: X-axis = Financial Impact (Low→High), Y-axis = Brand Impact (Low→High)]

**Highest Risk**: [Top 1-2 legal risks and their brand strategy impact summary]

**Project Writing Risk Level**: [LOW / MEDIUM / HIGH] — [One-line justification]
```
"""
