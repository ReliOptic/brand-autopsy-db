"""Layer 6: Channel Playbook analysis prompt."""

TEMPLATE = """# 06. Channel Operations Autopsy — {brand_name}

## Layer 1-5 Analysis Results
{previous_layers}

## Collected Data (Channel-specific observations)
{collected_data}

## Output Format

```markdown
# 06. Channel Playbook — {brand_name}

> **Disclaimer**: Channel strategy observations are based on publicly visible content across the brand's official social media accounts and website at the time of analysis. Posting frequencies and engagement patterns are estimates based on observable data. Sources: (official account), (observed), (estimated).

## Channel Strategy Matrix

| Channel | Role | Tone Adjustment | Posting Frequency | Key KPI | Content Type |
|---------|------|----------------|-------------------|---------|-------------|
| Instagram | [Role] | [Adjustment vs Voice Matrix] | [Frequency] | [KPI] | [Type] |
| YouTube | [Role] | [Adjustment] | [Frequency] | [KPI] | [Type] |
| Twitter/X | [Role] | [Adjustment] | [Frequency] | [KPI] | [Type] |
| LinkedIn | [Role] | [Adjustment] | [Frequency] | [KPI] | [Type] |
| TikTok | [Role] | [Adjustment] | [Frequency] | [KPI] | [Type] |
| Email/Newsletter | [Role] | [Adjustment] | [Frequency] | [KPI] | [Type] |
| Official Website/Blog | [Role] | [Adjustment] | [Frequency] | [KPI] | [Type] |
(Minimum 5 channels)

## Channel Tone Variations

| Channel | Formal↔Casual | Authority↔Peer | Emotional↔Rational | Restrained↔Bold | Reason |
|---------|-------------|---------------|-------------------|----------------|--------|
(Based on Layer 1 Voice Matrix baseline, adjusted ±2 per channel)

## Cross-Channel Synergy Map
- [Channel A] → [Channel B]: [How content flows between them]
- [Channel B] → [Channel C]: [Flow]
(Minimum 3 synergy routes)

## Channel-Specific Prohibitions
| Channel | Prohibitions |
|---------|-------------|
(Minimum 2 per channel)

## Crisis Response Channel Protocol
| Crisis Type | Primary Response Channel | Message Tone | Response Time Target |
|------------|------------------------|-------------|---------------------|
(Minimum 3 scenarios)

---

### Steal Sheet — 3 Things a Marketer Can Steal
1. **"[Lesson]"** [Explanation]
2. **"[Lesson]"** [Explanation]
3. **"[Lesson]"** [Explanation]
```
"""
