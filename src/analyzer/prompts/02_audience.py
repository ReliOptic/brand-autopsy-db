"""Layer 2: Audience Map analysis prompt."""

TEMPLATE = """# 02. Target & Persona Autopsy — {brand_name}

Based on the collected data and Layer 1 (Brand Identity) analysis below, create the audience map.

## Layer 1 Analysis Result
{layer1_result}

## Collected Data
{collected_data}

## Output Format

```markdown
# 02. Audience Map — {brand_name}

> **Disclaimer**: This analysis is based on publicly available information and is intended for brand strategy research purposes only. Persona profiles are analytical constructs based on observable data, not statements about actual individuals. Sources: (official), (observed), (estimated).

## ICP (Ideal Customer Profile)

| Dimension | Definition |
|-----------|-----------|
| Demographics | [Age, gender, income, education, occupation] |
| Geography | [Primary markets, urban/suburban, global distribution] |
| Psychographics | [Values, lifestyle, interests] |
| Behavior | [Media consumption, purchase patterns, brand loyalty] |
| Technology | [Devices, platforms, app usage patterns] |

## Core Personas (3)

### Persona 1: [Name]
- **Age/Occupation**: [Specific]
- **One-liner**: "[Why this person uses this brand]"
- **Pain Point**: [Problem they're solving]
- **Gain Point**: [Value they're seeking]
- **Media Habits**: [Primary channels/content]
- **Purchase Trigger**: [What drives the purchase decision]
- **Churn Trigger**: [What would make them leave]

### Persona 2: [Name]
(Same structure)

### Persona 3: [Name]
(Same structure)

## Purchase Journey (AARRR)

| Stage | Touchpoint | Key Message | Conversion Barrier |
|-------|-----------|-------------|-------------------|
| Acquisition | [First contact] | [First impression message] | [Entry barrier] |
| Activation | [First value experience] | [Aha moment] | [Onboarding friction] |
| Retention | [Reason to return] | [Retention message] | [Churn factor] |
| Revenue | [Payment moment] | [Price justification] | [Price resistance] |
| Referral | [Referral motivation] | [Sharing message] | [Referral barrier] |

## Anti-Persona (Customers This Brand Rejects)
- [Customer types intentionally not targeted and the strategic reason why]

---

### Steal Sheet — 3 Things a Marketer Can Steal
1. **"[Lesson]"** [Explanation]
2. **"[Lesson]"** [Explanation]
3. **"[Lesson]"** [Explanation]
```
"""
