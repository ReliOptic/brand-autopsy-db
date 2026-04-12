"""Layer 1: Brand Identity analysis prompt."""

TEMPLATE = """# 01. Brand Identity Autopsy — {brand_name}

Based on the collected data below, dissect this brand's identity.

## Collected Data
{collected_data}

## Output Format (follow this structure exactly)

```markdown
# 01. Brand Identity Autopsy — {brand_name}

> **Disclaimer**: This analysis is based on publicly available information and is intended for brand strategy research purposes only. It does not constitute investment, legal, or business advice. All claims are tagged with their source type: (official), (observed on website), (SEC filing), or (estimated).

## Raison d'Etre (Why)
> If this brand disappeared, what the world would lose:
>
> "[Define in one sentence]"

## Brand Promise
> What customers are guaranteed to receive after paying:
>
> "[Specific promise]"

## Positioning Statement
> For [target], compared to [competitive alternatives], we provide [differentiator] as a [category].
>
> "[Completed positioning statement]"

## Brand Archetype

| Type | Archetype | Behavioral Guideline |
|------|-----------|---------------------|
| Primary | [Select from 12 archetypes] | [Specific behavioral principle] |
| Secondary | [Select from 12 archetypes] | [Specific behavioral principle] |

(12 Archetypes: Innocent, Everyman, Hero, Outlaw, Explorer, Creator, Ruler, Magician, Lover, Caregiver, Jester, Sage)

## Voice Matrix

| Axis | Range | Position | Example Sentence |
|------|-------|----------|-----------------|
| Formal ↔ Casual | 1=Legal doc / 10=Friend chat | X/10 | "[Actual brand copy quote]" |
| Authoritative ↔ Peer | 1=Professor lecture / 10=Peer advice | X/10 | "[Actual brand copy quote]" |
| Emotional ↔ Rational | 1=Poetic / 10=Data-driven | X/10 | "[Actual brand copy quote]" |
| Restrained ↔ Bold | 1=Understatement / 10=Superlative | X/10 | "[Actual brand copy quote]" |

## Banned Words
- "[Word]" — [Reason for ban]
(Minimum 5)

## Required Words
- "[Word/Phrase]" — [Reason for use]
(Minimum 5)

## Slogans / Taglines

| Purpose | Copy |
|---------|------|
| Main Slogan | "[Slogan]" |
| Sub Tagline | "[Tagline]" |
| Hashtag Set | [List official hashtags] |

---

### Steal Sheet — 3 Things a Marketer Can Steal

1. **"[Key Lesson Title]"** [Specific explanation + how to apply]
2. **"[Key Lesson Title]"** [Specific explanation + how to apply]
3. **"[Key Lesson Title]"** [Specific explanation + how to apply]
```
"""
