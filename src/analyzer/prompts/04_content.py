"""Layer 4: Content DNA analysis prompt."""

TEMPLATE = """# 04. Content DNA Autopsy — {brand_name}

## Layer 1-3 Analysis Results
{previous_layers}

## Collected Data (Social captions, blog, newsletter, etc.)
{collected_data}

## Output Format

```markdown
# 04. Content DNA — {brand_name}

> **Disclaimer**: This analysis is based on publicly available content (official website, social media, press releases). Content pattern observations are based on publicly visible posts at the time of analysis. Sources: (official), (observed on social), (estimated).

## Content Pillars (3-5)

| Pillar | Share | Purpose | Representative Content Example |
|--------|-------|---------|-------------------------------|
| [Pillar 1] | XX% | [Branding/Conversion/Education/Community] | [Actual content title/format] |
| [Pillar 2] | XX% | [Purpose] | [Example] |
| [Pillar 3] | XX% | [Purpose] | [Example] |

## Hook Patterns

| Pattern | Frequency | Example |
|---------|----------|---------|
| [Question/Number/Provocative/Empathy/Declaration] | High/Medium | "[Actual hook example]" |
(Minimum 4 patterns)

## CTA Patterns

| CTA Type | Copy Pattern | Placement |
|----------|-------------|-----------|
| [Conversion/Engagement/Share/Subscribe] | "[Actual CTA copy]" | [Location] |
(Minimum 3)

## Tone & Mood Guide

| Situation | Tone | Example Copy |
|-----------|------|-------------|
| New Product Launch | [Tone description] | "[Copy]" |
| Crisis/Apology | [Tone description] | "[Copy]" |
| Everyday Post | [Tone description] | "[Copy]" |
| Promotion | [Tone description] | "[Copy]" |

## Content Prohibitions
- [Content types to avoid and the reason why]
(Minimum 5)

## Hashtag Strategy
- **Brand Hashtags**: [Fixed hashtags]
- **Campaign Hashtags**: [Seasonal/campaign-specific]
- **Community Hashtags**: [UGC-driving]

---

### Steal Sheet — 3 Things a Marketer Can Steal
1. **"[Lesson]"** [Explanation]
2. **"[Lesson]"** [Explanation]
3. **"[Lesson]"** [Explanation]
```
"""
