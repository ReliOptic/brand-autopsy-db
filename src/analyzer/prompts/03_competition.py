"""Layer 3: Competitive Landscape analysis prompt."""

TEMPLATE = """# 03. Competitive Landscape Autopsy — {brand_name}

## Layer 1-2 Analysis Results
{previous_layers}

## Collected Data
{collected_data}

## Same-Sector Companies (Comparison Set)
{sector_companies}

## Output Format

```markdown
# 03. Competitive Landscape — {brand_name}

> **Disclaimer**: This competitive analysis is based on publicly available information (official websites, SEC filings, press releases). Competitive positioning assessments represent this project's interpretation of observable market data, not definitive market judgments. Sources: (official), (SEC 10-K), (observed), (estimated).

## Competitive Matrix

| Competitor | Relationship | Positioning Difference | Their Strength | Our Advantage |
|-----------|-------------|----------------------|---------------|---------------|
| [Competitor 1] | Direct | [1-line summary] | [Specific, sourced] | [Specific, sourced] |
| [Competitor 2] | Direct | [1-line summary] | [Specific, sourced] | [Specific, sourced] |
| [Competitor 3] | Indirect | [1-line summary] | [Specific, sourced] | [Specific, sourced] |
| [Competitor 4] | Substitute | [1-line summary] | [Specific, sourced] | [Specific, sourced] |
(Minimum 4. All comparative claims must cite observable metrics, not value judgments.)

## Positioning Map

### Axis 1: [Industry-relevant axis] (e.g., Price ↔ Premium)
### Axis 2: [Industry-relevant axis] (e.g., Function-focused ↔ Experience-focused)

| Brand | Axis 1 Position | Axis 2 Position | Key Differentiator |
|-------|----------------|----------------|-------------------|
(5+ brands positioned. Base positions on observable evidence.)

## Battle Cards (Top 3 Competitors)

### vs [Competitor 1]
- **Their claim**: "[What the competitor emphasizes]" (source)
- **Our counter**: "[Observable advantage]" (source)
- **Vulnerability**: "[Their observable weak point]" (source)
- **Caution**: "[Where they observably outperform]" (source)

### vs [Competitor 2]
(Same structure)

### vs [Competitor 3]
(Same structure)

## Threats & Opportunities

| Type | Description | Urgency |
|------|------------|---------|
| Threat | [Specific, sourced] | High/Medium/Low |
| Opportunity | [Specific, sourced] | High/Medium/Low |
(Minimum 3 each)

## Differentiation Summary
> One sentence: "[This brand's unique differentiator based on observable evidence]"

---

### Steal Sheet — 3 Things a Marketer Can Steal
1. **"[Lesson]"** [Explanation]
2. **"[Lesson]"** [Explanation]
3. **"[Lesson]"** [Explanation]
```
"""
