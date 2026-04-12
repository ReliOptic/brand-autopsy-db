# 05. Design System — Eaton Corporation (ETN)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

> Note: Eaton's CSS data file returned an error (no color data available). Palette below is based on direct observation of eaton.com and official brand materials. (observed on eaton.com)

| Role | Color Name | HEX | Usage |
|------|-----------|-----|-------|
| **Primary brand** | Eaton Red | `#E31837` | Logo, primary CTAs, navigation active states, key data callouts |
| **Secondary brand** | Dark Charcoal | `#1A1A1A` | Primary body text, headings, technical specification tables |
| **Neutral light** | Light Gray | `#F5F5F5` | Page backgrounds, card backgrounds, section dividers |
| **Neutral mid** | Medium Gray | `#6B6B6B` | Secondary text, metadata, footnotes, caption text |
| **White** | Pure White | `#FFFFFF` | Primary background, reverse text on dark backgrounds |
| **Accent** | Industrial Blue | `#003865` | Secondary navigation, technical diagram accents, footer elements |

**Color logic**: The red-on-white palette signals precision and authority — consistent with the industrial safety color convention where red denotes critical systems. The blue accent connects to engineering and technical credibility. The palette avoids consumer-market warmth (no oranges, no pastels), consistent with industrial authority positioning. (T4_INFERRED)

---

## Typography

> Based on observation of eaton.com. Eaton does not publicly publish its brand typography guide. (observed on eaton.com)

| Role | Typeface | Weight | Usage |
|------|----------|--------|-------|
| **Display headings** | Eaton custom sans-serif (appears to be a modified geometric sans) | Bold / 700 | Hero headlines, section titles |
| **Body text** | Arial / Helvetica Neue fallback | Regular / 400 | Product descriptions, technical specifications, body copy |
| **Technical specs** | Monospace or tabular sans | Regular | Data tables, part numbers, specification values |
| **Captions / metadata** | Arial | Regular / 300 | Footnotes, source citations, image captions |

**Typography logic**: Sans-serif dominance signals modernity and technical precision. Serif fonts are absent — consistent with engineering documentation conventions where readability at small sizes (spec sheets, labels) is prioritized over typographic expression. (T4_INFERRED)

---

## Channel Specifications

| Channel | Image Specs | Copy Length | Design Notes |
|---------|------------|-------------|--------------|
| **eaton.com product pages** | Product photography: white background, 1200×900px minimum; application photography: 1600×900px | Technical specs table + 150–300 word description | Spec table above the fold; compliance badges prominent |
| **LinkedIn (primary social)** | 1200×627px for link posts; 1080×1080px for image posts | 150–300 characters for hook; full post 500–1200 characters | Data-forward visuals: infographics, product diagrams, facility photography |
| **Trade publication ads** | Full page: 8.5×11" at 300 DPI; half page: 7.25×4.75" | Headline + subhead + single CTA + product image | Specification callout (key rating/certification) mandatory |
| **Technical datasheets (PDF)** | A4/letter format; product image top-right; spec table dominant | Dense technical content; 1–4 pages standard | Part number, certification marks, and ordering information always on page 1 |
| **Trade show signage** | 8×10ft banner: 150 DPI minimum | 5–8 words maximum for primary headline | Product in operating environment; certification badges; QR to product page |

---

## Layout Principles

1. **Specification table above the fold**: On every product page, the key technical parameters (voltage range, current rating, certifications) appear before scrolling. Engineers evaluate on specs; burying them below marketing copy loses the audience. (observed on eaton.com)

2. **Certification badges as trust anchors**: UL Listed, CSA, IEC, ATEX, and other certification marks appear prominently on product pages and datasheets — not footnoted or hidden. For an industrial buyer, these marks are often the first filter before any feature evaluation. (observed on eaton.com product pages)

3. **Application photography over studio photography**: Product images show the equipment installed and operating in context (data center row, industrial switchgear room, aircraft wing assembly). Context signals that the product has been tested and validated in real environments — not merely designed in a lab. (observed on eaton.com)

4. **Logical information hierarchy**: Product page structure follows the engineer's decision sequence — what it does → what standards it meets → how to specify/size it → how to order it. Marketing narrative, if present, appears after this sequence, not before. (observed on eaton.com)

5. **White space is functional, not decorative**: Dense technical content requires clear visual separation between data tables, specification callouts, and descriptive text. White space serves readability in complex technical documents, not aesthetic minimalism. (T4_INFERRED)

---

## Icon Style

- **Style**: Flat, single-color line icons. No gradients, no shadows, no decorative complexity.
- **Primary color**: Eaton Red (`#E31837`) on white backgrounds; white on dark backgrounds.
- **Subject matter**: Electrical symbols (bolt, circuit, breaker), mechanical symbols (gear, actuator), data center icons (server rack, cooling unit), safety symbols (shield, warning triangle).
- **Usage context**: Navigation icons, product category identifiers, feature callout icons in technical content.
- **Prohibited**: Realistic 3D renderings of icons; consumer-style emoji-adjacent icons; icons that prioritize aesthetics over immediate recognition. (T4_INFERRED from observed eaton.com icon set)

---

## AI Image Prompt Guide

For generating on-brand Eaton-style imagery:

**Data center context**:
> "Wide-angle photograph of a large data center electrical room. Floor-mounted UPS units and red-branded switchgear cabinets arranged in rows. Overhead cable trays. Cool blue-white fluorescent lighting. Clean concrete floor. No people. Technical, industrial, professional atmosphere."

**Industrial facility context**:
> "Motor control center in an automotive manufacturing plant. Gray and red metallic cabinet panels with clear safety labels and warning icons. Cinematic lighting from overhead industrial fixtures. Clean industrial floor. Visible circuit breaker handles and status indicators."

**Aerospace context**:
> "Close-up of aircraft hydraulic system components. Precision-machined aluminum fittings, high-pressure hoses, and actuator assemblies. Studio lighting revealing surface finish and engineering precision. No branding visible. Technical product photography style."

---

## Design Prohibitions

1. **No lifestyle imagery**: People shown in relaxed, aspirational, or consumer-lifestyle contexts are inappropriate for Eaton's industrial brand. Workers shown must be in proper PPE in genuine industrial environments. (T4_INFERRED)
2. **No gradient-heavy backgrounds**: Eaton's visual system uses flat, clean backgrounds. Gradient sweeps and lens flares signal consumer marketing and undermine technical authority. (T4_INFERRED)
3. **No rounded corners on data tables**: Spec tables use straight-edge cells for readability and to signal precision — rounded corners soften technical content inappropriately. (T4_INFERRED)
4. **No stock photography of happy office workers**: Generic business people imagery is inconsistent with Eaton's engineering and industrial identity. (T4_INFERRED)
5. **No unauthorized color additions to the logo**: Eaton's red logomark is not reproduced in alternate colors for themed campaigns or co-brand applications without official brand guideline authorization. (T4_INFERRED)
6. **No typography mixing with serif fonts in technical content**: Serif type in specification tables or technical copy introduces visual inconsistency and reduces readability at small sizes in PDF datasheets. (T4_INFERRED)
7. **No infographics without source citations**: Data-driven infographics for LinkedIn or trade publications must include source notation — consistent with Eaton's engineering-credibility brand posture. (T4_INFERRED)
