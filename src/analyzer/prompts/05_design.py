"""Layer 5: Design System analysis prompt."""

TEMPLATE = """# 05. Design System Autopsy — {brand_name}

## Layer 1 Analysis Result (Voice/Archetype)
{layer1_result}

## CSS Auto-Extraction Data
{css_data}

## Collected Data (Website, app, marketing asset observations)
{collected_data}

## Output Format

```markdown
# 05. Design System Spec — {brand_name}

> **Disclaimer**: Color codes and typography data are extracted from the brand's official website CSS at the time of analysis (observed). Design principle interpretations are this project's analysis of observable patterns. Sources: (CSS extraction), (official brand guide), (observed), (estimated).

## Color Palette

| Role | Color Name | HEX | Usage |
|------|-----------|-----|-------|
| Primary | [Name] | #XXXXXX | [Specific usage] |
| Secondary | [Name] | #XXXXXX | [Usage] |
| Accent | [Name] | #XXXXXX | [Usage] |
| Neutral Light | [Name] | #XXXXXX | [Usage] |
| Neutral Dark | [Name] | #XXXXXX | [Usage] |
| White | [Name] | #XXXXXX | [Usage] |
(Minimum 5, maximum 10 colors)

**Color Principles**: [2-3 core color usage rules for this brand]

## Typography

| Role | Font | Weight | Size Rules |
|------|------|--------|-----------|
| Headline | [Font name] | [Weight] | [Size rules] |
| Body | [Font name] | [Weight] | [Size rules] |
| Caption | [Font name] | [Weight] | [Size rules] |
| CJK Fallback | [Font name] | [Weight] | [Size rules] |

## Channel Specifications

| Channel | Size (px) | Safe Area Margin | Notes |
|---------|----------|-----------------|-------|
(Minimum 5 channels)

## Layout Principles
- [Principle 1]
- [Principle 2]
- [Principle 3]
(Minimum 4)

## Icon & Illustration Style
- Style: [Specific description]
- Colors: [Usage rules]
- Prohibited: [What not to do]

## AI Image Generation Prompt Guide
```
Style keywords: [keywords]
Tone: [tone description]
Prohibited elements: [prohibitions]
Preferred elements: [preferences]
```

## Design Prohibitions
- [Prohibition 1]
- [Prohibition 2]
(Minimum 6)
```
"""
