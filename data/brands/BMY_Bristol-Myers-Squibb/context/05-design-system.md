# 05. Design System — Bristol-Myers Squibb (BMY)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

All HEX values derived from direct observation of bms.com and official BMS brand materials. (observed on website)

| Role | Color Name | HEX | Usage |
|------|------------|-----|-------|
| **Primary Brand** | BMS Red | `#C8102E` | Primary CTA buttons, logo mark, key headlines, navigation accents |
| **Primary Dark** | Deep Navy | `#1A2E5A` | Secondary navigation, footer backgrounds, data-heavy sections |
| **Neutral Light** | BMS White | `#FFFFFF` | Page backgrounds, clean scientific content areas |
| **Neutral Mid** | Warm Gray | `#F4F4F4` | Section dividers, card backgrounds, table zebra rows |
| **Neutral Dark** | Charcoal | `#333333` | Body text, supporting copy, captions |
| **Accent Blue** | Science Blue | `#005EB8` | Hyperlinks, data visualizations, HCP portal elements |
| **Accent Teal** | Health Teal | `#00A8A8` | Pipeline milestone indicators, patient support section accents (estimated) |

**Color Usage Notes**: BMS's palette is notably conservative — red (energy, urgency, care) anchored with navy (authority, trust, institutional weight). This combination is common across major healthcare institutions and signals regulatory credibility. The accent blue serves functional information-access purposes rather than decorative ones. (T4_INFERRED from observed design patterns)

---

## Typography

Observations based on bms.com direct inspection. (observed on website)

| Role | Typeface | Weight | Size (desktop) |
|------|----------|--------|----------------|
| **Primary Display** | Source Sans Pro (or similar humanist sans) | Bold (700) | 36–56px headlines |
| **Section Headers** | Source Sans Pro | SemiBold (600) | 24–32px |
| **Body Text** | Source Sans Pro | Regular (400) | 16–18px |
| **Data Tables / Clinical** | Monospace fallback / Source Code Pro | Regular | 14px |
| **Legal / Fair Balance** | Source Sans Pro | Regular (400) | 10–12px (minimum FDA-permitted) |

**Typography Notes**: Humanist sans-serif typefaces are standard in pharmaceutical brand design because they balance approachability (curved letterforms) with authority (clean structure). The use of a single-family system reduces cognitive load — important when presenting complex clinical data. (T4_INFERRED from observed design patterns)

---

## Channel Design Specifications

| Channel | Format | Primary Specs |
|---------|--------|--------------|
| **bms.com homepage** | Full-width responsive | 1440px max-width; hero at 100vw with 16:9 photography; above-fold CTA in BMS Red |
| **Investor Relations PDF** | Print/digital hybrid | A4/Letter; 2-column data layout; BMS Red headers; Source Sans Pro throughout |
| **Drug product pages (Opdivo, Eliquis)** | Regulatory-compliant | Full ISI (Important Safety Information) footer; fair balance required; HCP/patient toggle navigation |
| **LinkedIn corporate page** | 1200×627px link preview | Science imagery + BMS Red title overlay; institutional photography style |
| **Twitter/X (@bmsnews)** | 1200×675px cards | Patient portrait photography or clinical data visualization; minimal text overlay |
| **Annual Report** | PDF/print | Full bleed section openers; patient photography; financial charts in BMS Red/Navy palette |
| **Medical conference materials** | Poster/slides | Clinical data-forward; chart-dense; consistent with BMS branded slide deck template |

---

## Layout Principles (Minimum 4)

**1. Data first, design second.**
Clinical trial data is the primary content. Layout systems must accommodate data tables, Kaplan-Meier curves, forest plots, and bar charts without compromising readability. White space is not a luxury — it is what makes dense clinical information parsable. (T4_INFERRED from observed HCP-facing design)

**2. Patient photography as the emotional anchor.**
Product pages and corporate communications use real patient photography — not stock imagery of "sick people" — to humanize the data. Photography style is dignified, present-tense, and forward-looking: patients are shown engaged with life, not defined by illness. (observed on bms.com)

**3. Regulatory compliance is a design constraint, not an afterthought.**
Every drug product page must accommodate fair balance/ISI in a legible format that meets FDA promotional guidelines. This is not a legal burden applied to the design — it is a design requirement built into the layout grid from the start. (T4_INFERRED from FDA promotional guidelines for prescription drug advertising)

**4. Hierarchy: Patient outcomes → Scientific data → Company narrative.**
The visual hierarchy of BMS's major pages consistently places patient impact at the top of the hierarchy, clinical evidence as the proof layer, and company positioning as the supporting context. This hierarchy reflects the "Because Patients" brand architecture in visual form. (observed on bms.com)

**5. Institutional restraint over consumer expressiveness.**
BMS does not use motion graphics, playful illustration, or high-contrast color contrast as primary design elements. The visual tone matches the verbal tone: precise, authoritative, and restrained. Visual consistency with the regulatory and scientific environment in which the brand operates builds credibility. (T4_INFERRED from observed design language)

---

## Icon Style

- **Style**: Outline icons with 1.5–2px stroke weight; rounded terminations; no fill; minimal detail
- **Color**: BMS Red for primary navigation icons; Science Blue for informational/link icons; Charcoal for body-copy-adjacent icons
- **Scale**: 24×24px standard; 32×32px for feature highlights; 16×16px for inline text use
- **Source**: Custom-drawn icon set consistent with brand guidelines; not off-the-shelf icon libraries (estimated)
- **Exceptions**: Patient support icons (heart, shield, person) use filled variants to signal warmth in patient-facing sections (estimated)

---

## AI Image Prompt Guide

For generating on-brand BMS visuals using AI image tools:

**For patient-facing content**:
> "Photorealistic portrait of a person aged 55–70 engaged in an everyday activity — gardening, cooking, walking with a partner — in warm natural light. Dignified, present-tense, forward-looking expression. No hospital setting. No medical equipment in frame. Neutral background in warm cream or outdoor natural setting. Soft depth of field. Canon 5D Mark IV style."

**For clinical/science content**:
> "Clean laboratory photography: researcher in professional attire examining data on a light table or at a bench. Cool neutral lighting. White coat, safety glasses. No clutter. Focus on the data or sample in hand. Scientific precision aesthetic. Stock photo style on white or light gray background."

**For corporate/institutional content**:
> "Professional headshot or team photo style. Business casual attire. Neutral background in BMS Navy (#1A2E5A) or white. Diverse representation. Direct eye contact. Confident, approachable expression. Studio lighting."

---

## Design Prohibitions (Minimum 6)

1. **No stock photography depicting illness, suffering, or hospitalization as the primary image**: Patient photography must show dignity and agency, not disease as the defining characteristic. (T4_INFERRED from BMS observed photography style)
2. **No unqualified color claims on drug efficacy**: Color-coding of clinical data must be accompanied by statistical context; red does not mean "bad" and green does not mean "good" without explicit labeling. (T4_INFERRED from data visualization best practices)
3. **No use of BMS Red for body copy**: Red is reserved for brand accents, CTAs, and headers — not paragraphs. Red body copy degrades readability and violates established BMS visual hierarchy. (T4_INFERRED from observed design)
4. **No decorative photography on drug product pages**: FDA regulations require that drug advertising imagery not suggest broader efficacy than the approved indication; decorative or aspirational lifestyle imagery on drug product pages requires careful regulatory review. (T4_INFERRED from FDA guidelines)
5. **No font substitution outside the approved type family**: Mixing humanist sans-serif with slab, display, or script typefaces breaks the institutional consistency that signals regulatory credibility. (T4_INFERRED)
6. **No infographics presenting clinical data without statistical context**: Bar charts, pie charts, or visual representations of clinical endpoints must include sample sizes, confidence intervals, and p-values in the same visual field. (T4_INFERRED from FDA data representation standards)
7. **No unauthorized use of patient likeness**: All photography of real patients requires signed consent documentation consistent with HIPAA and applicable international privacy regulations. (T4_INFERRED from healthcare privacy law)
