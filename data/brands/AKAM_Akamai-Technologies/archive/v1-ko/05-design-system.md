# 05. Design System Spec — Akamai Technologies, Inc. (AKAM)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for Akamai's official brand guidelines. All design observations are based on publicly accessible sources: akamai.com and official marketing materials. Source notation: `(official)` = Akamai-published; `(observed on akamai.com)` = direct observation; `(CSS extraction)` = parsed from public stylesheets; `(estimated)` = project inference.

---

## 1. Color Palette

### Core Brand Colors

| Token Name | HEX | Role | Usage |
|---|---|---|---|
| `color-akamai-blue` | `#009BDE` | Primary Brand Blue | Logo, primary CTAs, brand identity elements (observed on akamai.com) |
| `color-akamai-dark` | `#003B5C` | Dark Blue / Navigation | Header, navigation, dark section backgrounds (observed on akamai.com) |
| `color-akamai-navy` | `#0D274D` | Deep Navy | Footer, deep dark sections (estimated) |
| `color-white` | `#FFFFFF` | Background | Primary page backgrounds (observed on akamai.com) |
| `color-light-grey` | `#F5F6F7` | Section Background | Alternating content sections (observed on akamai.com) |
| `color-text-dark` | `#2B2B2B` | Primary Text | Body copy, headings on light backgrounds (estimated) |
| `color-text-secondary` | `#6B7280` | Secondary Text | Captions, metadata (estimated) |
| `color-security-red` | `#E63946` | Security Alert Accent | Threat indicators, security content accents (estimated) |
| `color-success-green` | `#00A86B` | Positive State | Success indicators, performance metrics (estimated) |

### Color Principles

**Principle 1 — Blue dominance signals trust and technology.**
Akamai's blue palette aligns with enterprise technology conventions. Blue conveys reliability and technical competence. (observed on akamai.com)

**Principle 2 — Dark backgrounds for security content.**
Security-focused pages and threat research content use dark navy backgrounds, creating visual distinction from performance/delivery content on white backgrounds. (observed on akamai.com)

**Principle 3 — Minimal accent color usage.**
The palette is restrained — blue, dark, white, grey. Red and green appear only for functional states (alerts, success). (T4_INFERRED)

---

## 2. Typography

| Role | Typeface | Weight | Size Range | Notes |
|---|---|---|---|---|
| **Headlines** | Inter / system sans-serif | Bold 700 | 28–48px | Clean, modern, highly legible (estimated from rendering) |
| **Body Copy** | Inter / system sans-serif | Regular 400 | 16–18px | Optimized for long-form technical content (estimated) |
| **Code / Technical** | Monospace (system) | Regular 400 | 14–16px | API references, code samples (observed on developer docs) |
| **UI Labels** | Inter | Medium 500 | 14–16px | Navigation, buttons (estimated) |

---

## 3. Channel Specifications

| Channel | Asset Type | Dimensions | Key Notes |
|---|---|---|---|
| **akamai.com — Hero** | JPEG / WebP | 1440 × 600 px (estimated) | Abstract technology imagery; blue/dark gradient overlays |
| **SOTI Report Cover** | PDF / Digital | 8.5 × 11 in / responsive | Data visualization-heavy; Akamai blue accent |
| **LinkedIn — Sponsored** | JPEG / PNG | 1200 × 627 px | Threat data highlights; professional tone |
| **Webinar Thumbnail** | JPEG | 1280 × 720 px | Speaker photo + topic; Akamai blue frame |

---

## 4. Layout Principles

**Principle 1 — Data visualization is a primary layout element.**
Akamai's content relies heavily on charts, maps, and data visualizations to communicate scale and threat intelligence. (observed on akamai.com)

**Principle 2 — Technical content prioritizes scannability.**
Long-form pages use clear heading hierarchy, bullet points, and code blocks to serve engineering audiences who scan before reading. (observed on akamai.com)

**Principle 3 — Product pages follow problem-solution-proof structure.**
Each product page presents: the problem → Akamai's solution → quantified proof (metrics or case study). (observed on akamai.com)

**Principle 4 — Responsive design serves laptop-first audience.**
Enterprise IT buyers primarily access akamai.com from desktop/laptop. Mobile optimization exists but is secondary. (T4_INFERRED)

---

## 5. Icon & Illustration Style

- **Icon style**: Line icons in Akamai blue or dark grey. Functional and technical, not decorative. (observed on akamai.com)
- **Illustration**: Abstract, geometric patterns representing networks, nodes, and data flows. No cartoon illustrations or characters. (observed on akamai.com)
- **Data visualization**: Clean, minimal chart style using brand blue as primary data color with grey for secondary series. (observed in SOTI reports)

---

## 6. AI Image Generation Prompt Guide

### Hero Technology Abstract
```
Abstract digital network visualization, interconnected nodes and data pathways on dark navy (#0D274D) background, accent glow in Akamai blue (#009BDE), no text, no human figures, clean geometric style, enterprise technology aesthetic, 4K resolution
```

### Threat Intelligence Visual
```
World map with highlighted attack vectors, red (#E63946) threat indicators on dark background, data flow lines in blue (#009BDE), cybersecurity operations center aesthetic, clean minimalist style, no branded logos
```

---

## 7. Design Prohibitions

1. **No consumer-friendly or playful design elements.** Akamai's aesthetic is enterprise-technical, not consumer-casual. (T4_INFERRED)
2. **No stock photography of people pointing at screens.** Generic "IT worker" stock imagery undermines technical credibility. (T4_INFERRED)
3. **No gradient text effects.** Text is solid color on solid or dark backgrounds. (observed on akamai.com)
4. **No excessive animation.** Subtle data visualizations are acceptable; decorative motion is not. (T4_INFERRED)
5. **No bright or saturated accent colors beyond the defined palette.** The restrained palette is a trust signal. (T4_INFERRED)
6. **No rounded, friendly UI elements.** Button corners are slightly rounded but not pill-shaped; the aesthetic is precise, not warm. (observed on akamai.com)

---

*Layer 5 of 8 — Brand Autopsy: Akamai Technologies, Inc. (AKAM)*
*Source tiers: (official), (observed on akamai.com), (CSS extraction), (estimated).*
