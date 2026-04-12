# 05. Design System — Progressive Corporation (PGR)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

Colors observed via CSS analysis of progressive.com (observed on website):

| Role | Name | HEX | Usage |
|------|------|-----|-------|
| **Primary Brand Blue** | Progressive Blue | `#0077B3` | Primary CTAs, links, navigation, anchor brand elements (63 instances — highest frequency) |
| **Light Sky Blue** | Progressive Sky | `#8FD8F2` | Secondary highlights, hover states, informational elements (46 instances) |
| **Near Black** | Progressive Dark | `#2D2D2D` | Primary body text, headlines (47 instances) |
| **Soft Pink** | Progressive Blush | `#FFCFDE` | Accent, Flo-campaign aligned accent, form highlight states (46 instances) |
| **Lavender** | Progressive Lavender | `#E4B9E4` | Secondary accent, diversity/community content contexts (36 instances) |
| **Pale Blue-Gray** | Progressive Mist | `#D1E2E5` | Background panels, card surfaces (31 instances) |
| **Mint** | Progressive Mint | `#BDEFE6` | Positive states, savings confirmation, Snapshot success indicators (19 instances) |
| **Warm Peach** | Progressive Peach | `#FFCC8F` | Warm accent for friendly-tone content (19 instances) |
| **Action Red-Pink** | Progressive Alert | `#D41659` | Error states, urgency alerts, primary accent in some contexts (11 instances) |
| **Light Page** | Progressive White-Blue | `#F3F9FC` | Page background, quote form background (7 instances) |

**Color Philosophy**: Progressive's palette is unusually warm and diverse for a financial services brand. The combination of blues (primary brand anchor), pinks, lavenders, mints, and peaches creates an approachable, almost pastel warmth that directly contradicts the cold institutional palette of traditional financial services. This is a deliberate positioning choice: the color system says "we are not a traditional insurance company" before a single word is read. (T4_INFERRED from observed CSS data)

**Flo-campaign color alignment**: The soft pink (`#FFCFDE`) and blue (`#0077B3`) together echo the visual language of the Flo advertising universe (white store, blue and pink accents, Flo's white uniform). The brand and campaign palettes are integrated. (T4_INFERRED)

**Custom typography note**: Progressive uses "96 Sans" — a proprietary typeface family (96 Sans, 96 Sans Condensed, 96 Sans Icons, 96 Sans Monospaced) — as its exclusive type system. This is unusual; custom typefaces at this investment level signal a serious brand system commitment. (observed on website, CSS font-face declarations)

---

## Typography

**Primary Font Family** (observed on website):
- **96 Sans** — Primary typeface for all brand communications. A custom sans-serif developed exclusively for Progressive. The "96" designation likely references Progressive's founding year (1937) or a design iteration number — the exact origin is not publicly disclosed. (T4_INFERRED)
- **96 Sans Condensed** — Compact display variant for space-constrained headline contexts.
- **96 Sans Icons** — Custom icon font, suggesting a bespoke iconographic system.
- **96 Sans Monospaced** — Technical/data display contexts (policy numbers, rate displays).

**Fallback Stack**: Arial → sans-serif (observed in CSS)

**Typography Rules**:
- 96 Sans is a proprietary asset; Arial is the fallback only for technical failure cases
- The custom type system gives Progressive a typographic distinctiveness that commodity sans-serif choices (Helvetica, Open Sans) would not provide
- Condensed variant used for campaign headlines where visual impact in limited space is required
- Icon font indicates a comprehensive design system with custom iconography rather than generic icon library usage

---

## Channel Design Specifications

| Channel | Spec Notes |
|---------|-----------|
| **progressive.com** | Bright white backgrounds; blue CTAs; warm accent colors in form flows; quote funnel optimized for minimal friction; mobile-first responsive design. (observed on website) |
| **TV / Video** | Flo's "insurance store" set design — white walls, blue accents, price tag motifs. Consistent visual environment across 950+ commercials. (observed, Progressive advertising) |
| **Digital Advertising** | Quote-initiation CTAs; "Compare rates" messaging; blue and white dominant; occasional Flo photography. (observed, Progressive digital ads) |
| **Mobile App** | Progressive app follows the progressive.com design system; Snapshot monitoring interface uses the mint/green palette for safe-driving positive feedback. (T4_INFERRED from observed brand system) |
| **Direct Mail** | Blue-primary with warm accent; rate and savings emphasis; "Name your price" mechanic featured. (T4_INFERRED) |

---

## Layout Principles

**1. Funnel-first design.**
Every major section of progressive.com is architecturally oriented toward quote initiation. The homepage, product pages, and campaign landing pages all have a primary quote CTA in the hero position. Content is designed to answer questions that would otherwise prevent quote completion, not to be read for its own sake. (observed on progressive.com)

**2. Color warmth as category disruption.**
The use of pinks, lavenders, and mints in a financial services context is a deliberate break from the institutional blues and grays that dominate the insurance sector. The color warmth communicates approachability and reduces the emotional distance between the customer and the product. (T4_INFERRED from observed palette and category context)

**3. Clarity over density.**
Progressive's quote flow and product pages prioritize single-concept pages with minimal competing information. Each step in the quote flow asks one question. Coverage type pages explain one concept. This mirrors the brand's commitment to reducing the intimidation of insurance shopping. (observed on progressive.com)

**4. Flo visual integration.**
The Flo character appears in advertising, website hero imagery, and campaign landing pages — creating a consistent visual thread between TV awareness and digital conversion. When Flo appears on a landing page, she carries the tone of the advertising into the quote experience. (observed on progressive.com)

**5. Mobile-native quote experience.**
Progressive's quote flow is designed mobile-first; the tap target sizes, simplified input fields, and progress-indicator design reflect that a substantial portion of auto insurance shopping happens on mobile. (T4_INFERRED from observed progressive.com mobile design)

---

## Icon Style

- **Style**: 96 Sans Icons — a custom proprietary icon set, indicating that Progressive has invested in a bespoke iconographic language rather than licensing a generic library.
- **Character**: Friendly, rounded, approachable — consistent with the warm brand register. Not angular or corporate-sharp.
- **Usage**: Navigation icons, coverage category identifiers, claims process step indicators.
- **Prohibited**: Generic stock icon libraries (Font Awesome, Material Icons) would undermine the custom brand system consistency in on-brand contexts. (T4_INFERRED)

---

## AI Image Prompt Guide

**Flo-universe brand imagery**:
> "Cheerful woman in white apron working at a clean, bright retail counter with blue and pink accent colors visible in background, warm smile, helpful posture, professional photography style, insurance store aesthetic, soft ambient lighting, no text overlays"

**Driving / Snapshot**:
> "Happy driver in modern sedan on open highway, morning light, dashboard visible showing Snapshot app interface in blue and white color scheme, safe driving context, natural photography style, no accident imagery"

**Digital / Product**:
> "Smartphone showing auto insurance quote comparison screen in Progressive brand blue (#0077B3) and white, clean UI design, hand holding phone at comfortable angle, natural lighting, no text legible in screen"

**Lifestyle / Brand warmth**:
> "Young adult couple reviewing documents at kitchen table, warm home environment, soft natural lighting, relaxed and positive expressions, laptop open showing insurance website, brand-safe stock photography aesthetic"

---

## Design Prohibitions

1. **No dark, somber, or fear-invoking imagery** — Progressive's brand is built on anxiety reduction; disaster, accident, or fear-based imagery contradicts this even when accurate to the insurance context. (T4_INFERRED)
2. **No cold institutional blue palette without warm accent** — Pure cold blue without the warm accent palette reverts Progressive's visual identity to generic insurance category language. The warm accents are load-bearing brand differentiators. (T4_INFERRED)
3. **No Flo out of her established visual character** — The Flo persona has a defined visual language (white uniform, specific hair and makeup) established over 17+ years; deviations create brand discontinuity. (T4_INFERRED)
4. **No font substitution for 96 Sans in brand contexts** — Arial is a fallback only; substituting Arial or Helvetica as a deliberate design choice in brand materials loses the custom typographic identity. (T4_INFERRED)
5. **No stock photography of accidents or vehicle damage in acquisition content** — Claims and safety content may require such imagery; acquisition and brand content should not lead with negative outcomes. (T4_INFERRED)
6. **No competitor logos in design materials** — The comparison tool may display competitor rate information in text form, but competitor logos and branding should not appear in Progressive-designed materials outside of the rate comparison interface itself. (T4_INFERRED, legal consideration)
