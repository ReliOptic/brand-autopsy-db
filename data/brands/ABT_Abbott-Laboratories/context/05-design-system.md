# 05. Design System — Abbott Laboratories (ABT)

> **Disclaimer**: This analysis is based on publicly available information including observed brand materials on abbott.com and product websites. Design system details are based on direct observation unless noted. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Color Palette

| Color Name | HEX | Usage | Source |
|-----------|-----|-------|--------|
| **Abbott Blue** | #0061A0 | Primary brand color; headers, primary CTAs, logo | Observed on abbott.com |
| **Dark Blue** | #003865 | Deep variant; footers, high-contrast text | Observed on abbott.com |
| **Light Blue** | #4FC3F7 | Accent, digital highlights, infographic elements | Observed on abbott.com product pages |
| **White** | #FFFFFF | Primary background; clinical, clean | Observed on abbott.com |
| **Cool Gray** | #6B7280 | Body text, secondary information | Observed on abbott.com |
| **Warm Teal** (FreeStyle Libre) | #00A19B | FreeStyle Libre sub-brand accent | Observed on freestylelibre.com |
| **Lime Green** (FreeStyle Libre) | #92C83E | FreeStyle Libre energy/health signal | Observed on freestylelibre.com product pages |

**Color note**: The primary Abbott blue is consistent with healthcare institutional standards (trust, precision), while the FreeStyle Libre sub-brand introduces a teal-lime palette that signals consumer health technology rather than clinical equipment. This sub-brand color differentiation allows FreeStyle Libre to occupy a more approachable, consumer-tech aesthetic within Abbott's broader institutional identity. (T4_INFERRED from observed design differentiation)

---

## Typography

| Role | Typeface | Weight | Observed Usage |
|------|----------|--------|----------------|
| **Corporate Display** | Open Sans or similar humanist sans-serif | Bold, ExtraBold | Abbott.com headlines (observed — specific proprietary typeface not publicly documented) |
| **Body Text** | Open Sans or similar | Regular, Medium | Long-form content, press releases (observed) |
| **FreeStyle Libre Sub-brand** | Distinct rounded sans-serif | Bold | FreeStyle Libre product pages — more consumer-tech aesthetic (observed on freestylelibre.com) |
| **Data / Clinical** | Tabular sans-serif | Regular | Clinical tables, diagnostic specifications (T4_INFERRED) |

*Abbott's specific proprietary typeface details are not publicly documented. Observations based on rendered text on abbott.com.*

---

## Channel Design Specifications

| Channel | Dimensions | Color Usage | Typography |
|---------|-----------|-------------|------------|
| **Website Hero** | 1440px desktop | Abbott blue gradient or photography + blue overlay | Bold headline, 48-60px |
| **FreeStyle Libre App** | iOS/Android native | White background, teal accents, lime data visualization | Rounded sans-serif, clear data display |
| **LinkedIn Banner** | 1584 × 396px | Abbott blue, white text, corporate imagery | Bold headline, logo prominent |
| **Medical Congress Materials** | Variable (poster, slide) | White background, blue headers, data-heavy | Clinical precision layout |
| **DTC Television (FreeStyle Libre)** | 16:9, 30-60 seconds | Lifestyle-forward, teal/lime brand elements at close | Patient narrative voice |
| **Investor Presentation** | 16:9 widescreen | White + blue, data visualization heavy | Corporate typeface |
| **Product Packaging** | Variable | Sub-brand color system per product line | Product name prominent |

---

## Layout Principles

1. **Segment clarity**: Abbott's website architecture separates diagnostics, devices, nutrition, and pharmaceuticals visually — each segment has distinct visual anchors while sharing the master brand blue. This prevents the portfolio complexity from creating user confusion. (observed on abbott.com)
2. **Data visualization as trust signal**: Clinical accuracy claims, market reach statistics, and geographic presence maps are presented with clear data visualization rather than text-only assertions. Charts are labeled with sources and time periods. (T4_INFERRED from observed materials)
3. **FreeStyle Libre consumer design system**: The CGM product line operates with a lighter, more consumer-friendly layout — rounded card elements, lifestyle photography, and a teal/lime palette that distinguishes it from clinical diagnostic products aimed at lab directors. (observed on freestylelibre.com)
4. **Human-centered hero imagery**: Abbott's corporate photography features healthcare professionals, patients, and scientists — not abstract science imagery. The faces humanize institutional scale. (observed on abbott.com)
5. **Information hierarchy by audience depth**: Corporate pages layer executive summary → supporting data → technical detail, allowing different reader types to exit at their appropriate depth without feeling the content is too shallow or too technical. (T4_INFERRED from observed page structure)

---

## Icon Style

- **Corporate**: Clean, geometric line icons in Abbott blue; medical and scientific iconography (laboratory equipment, heart, infant, glucose graph)
- **FreeStyle Libre**: More expressive illustrated icons with teal/lime coloring; activity and health icons (running figure, apple, graph uptrend)
- **Diagnostics**: Technical precision icons — pipette, analyzer equipment, molecular representations; used in B2B contexts
- **Accessibility**: WCAG 2.1 AA standard assumed for digital platforms (T4_INFERRED from modern healthcare digital standards)

---

## AI Prompt Guide (Generating On-Brand Visuals)

**For corporate Abbott content**:
"Professional healthcare photography, [diverse healthcare professional or patient demographic], clean clinical environment with warm human elements, Abbott blue brand accents, natural lighting, optimistic and purposeful emotional tone, modern medical setting rather than sterile hospital aesthetic"

**For FreeStyle Libre consumer content**:
"Active lifestyle photography, person with visible FreeStyle Libre sensor on arm, engaged in everyday activity (cycling, cooking, working), teal and lime color accent in environment, natural outdoor or home setting, empowered and free body language, not clinical"

**Avoid in all Abbott prompts**:
- Stigmatizing imagery of illness or disability
- Outdated or stereotyped medical imagery (white coat as dominant element)
- Imagery implying absolute cure or recovery without nuance
- Competitive product branding visible in frame

---

## Design Prohibitions

1. **No clinical claims embedded in imagery**: Regulatory requirements prohibit embedding efficacy claims in images without full fair balance compliance. (T4_INFERRED from FDA IVD and device promotional guidance)
2. **No unauthorized medical association logos** implying product endorsement. (T4_INFERRED from FDA endorsement guidance)
3. **No mixing of FreeStyle Libre consumer palette with clinical diagnostics communications** — sub-brand integrity requires consistent application. (T4_INFERRED from observed brand consistency)
4. **No competitor product imagery** in Abbott-produced materials. (T4_INFERRED from standard brand practice)
5. **No use of Abbott logo mark** in ways implying third-party endorsement without explicit authorization. (T4_INFERRED from trademark protection)
6. **No imagery that depicts or implies product misuse**: Medical device visual content must depict correct and approved use cases. (T4_INFERRED from FDA device promotional guidance)
7. **No low-resolution product imagery** in regulatory submissions or promotional materials — image quality standards apply across channels. (T4_INFERRED)
