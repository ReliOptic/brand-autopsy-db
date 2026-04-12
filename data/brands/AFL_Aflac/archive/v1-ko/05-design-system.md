# 05. Design System Spec — Aflac Incorporated (AFL)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for Aflac's official brand guidelines. All design observations are based on publicly accessible sources: aflac.com, official advertising materials, and CSS extraction from aflac.com. Source notation: `(official)` = Aflac-published content; `(observed on aflac.com)` = direct page observation; `(CSS extraction)` = values parsed from publicly accessible stylesheets; `(estimated)` = project inference.

---

## 1. Color Palette

### Core Brand Colors

| Token Name | HEX | Role | Specific Usage |
|---|---|---|---|
| `color-aflac-blue` | `#00A3E0` | Primary Brand Color | Primary blue used across aflac.com headers, CTAs, and brand identity elements (observed on aflac.com) |
| `color-aflac-dark-blue` | `#003B5C` | Dark Accent / Navigation | Navigation bars, footer backgrounds, dark-mode sections (observed on aflac.com) |
| `color-aflac-navy` | `#002A3A` | Deep Dark / Text | Dark text on light backgrounds, footer text (estimated) |
| `color-white` | `#FFFFFF` | Background / Text on Dark | Primary page backgrounds, text on dark sections (observed on aflac.com) |
| `color-light-grey` | `#F5F5F5` | Section Background | Alternating section backgrounds on content pages (observed on aflac.com) |
| `color-mid-grey` | `#6B6B6B` | Secondary Text | Body copy, captions, supporting text (estimated) |
| `color-duck-yellow` | `#FFD100` | Mascot Accent / Highlight | The Aflac Duck's color; used sparingly as an accent in digital materials, CTA hover states (observed on aflac.com, estimated) |
| `color-cta-orange` | `#FF6B00` | Secondary CTA | Secondary action buttons, enrollment prompts (estimated) |
| `color-success-green` | `#00A651` | Positive States | Checkmarks, success confirmations, "covered" indicators (estimated) |

### Color Principles

**Principle 1 — Aflac Blue (#00A3E0) is the dominant brand color.**
Used for primary CTAs, header elements, and brand identity. The blue conveys trust and reliability appropriate for insurance. (observed on aflac.com)

**Principle 2 — Duck Yellow (#FFD100) is an accent, not a primary.**
Despite the duck's prominence, yellow is used sparingly in the digital experience. Overuse would shift the brand from "trustworthy insurer" to "entertainment brand." (T4_INFERRED)

**Principle 3 — White-dominant layouts signal clarity and transparency.**
Aflac.com uses predominantly white backgrounds with blue and dark accents, consistent with the insurance category convention of cleanliness and trustworthiness. (observed on aflac.com)

---

## 2. Typography

| Role | Typeface | Weight | Size Range | Notes |
|---|---|---|---|---|
| **Headlines** | Proxima Nova (or equivalent sans-serif) | Bold 700 | 28–48px desktop | Clean, modern, accessible (estimated from observed rendering) |
| **Body Copy** | Proxima Nova | Regular 400 | 16–18px | High readability for insurance content (estimated) |
| **UI Labels / Buttons** | Proxima Nova | Semibold 600 | 14–16px | Clear, action-oriented (estimated) |
| **Legal / Footnotes** | Proxima Nova | Regular 400 | 12–13px | Required for insurance disclosures (estimated) |

---

## 3. Channel Specifications

| Channel | Asset Type | Dimensions | Key Notes |
|---|---|---|---|
| **aflac.com — Hero** | JPEG / WebP | 1440 × 600 px (estimated) | Duck or lifestyle imagery; blue overlay with white text |
| **Instagram — Feed** | JPEG / PNG | 1080 × 1080 px | Duck content, enrollment reminders, testimonials |
| **YouTube — Thumbnail** | JPEG | 1280 × 720 px | Duck commercial stills; bright, high-contrast |
| **TV — Commercial** | HD / 4K Video | 1920 × 1080 / 3840 × 2160 | Duck campaigns; 15s and 30s formats |
| **Workplace Materials** | PDF / Print | 8.5 × 11 in | Benefits guides, enrollment flyers |

---

## 4. Layout Principles

**Principle 1 — Information hierarchy serves decision-making.**
Aflac.com organizes content to support the enrollment decision: problem awareness → product explanation → enrollment action. (observed on aflac.com)

**Principle 2 — The duck appears in marketing, not in the product experience.**
The duck is prominent in advertising and top-of-funnel content but is reduced or absent in the claims filing and policy management experience, where trust and efficiency are prioritized over entertainment. (T4_INFERRED)

**Principle 3 — Mobile-first for enrollment.**
Workplace enrollment increasingly happens on mobile devices during open enrollment periods. (T4_INFERRED)

**Principle 4 — Legal disclosures are integrated, not hidden.**
Insurance regulations require specific disclosures. Aflac integrates these into page layouts rather than burying them in pop-ups. (observed on aflac.com)

---

## 5. Icon & Illustration Style

- **Icon style**: Clean, outlined, single-color icons in Aflac Blue or dark grey. Functional, not decorative. (observed on aflac.com)
- **The Aflac Duck**: The duck illustration/photography is the primary brand illustration. No other mascot or character appears. (official)
- **Infographic style**: Data visualizations explaining insurance gaps use simplified bar charts and comparison graphics in brand blue and grey. (observed on aflac.com)

---

## 6. AI Image Generation Prompt Guide

### Duck Campaign Shot
```
Professional advertising photography, white Aflac duck (Pekin duck breed) in a realistic office environment, comedic pose, soft studio lighting, shallow depth of field, clean corporate background, insurance brand aesthetic, high production value
```

### Lifestyle Enrollment Scene
```
Candid photography, diverse group of employees at a workplace benefits fair, bright natural lighting, professional but relaxed atmosphere, no visible competitor brand logos, insurance enrollment context, warm color grade
```

---

## 7. Design Prohibitions

1. **No dark or somber color palettes in consumer-facing materials.** Aflac's brand is optimistic and approachable. (T4_INFERRED)
2. **No graphic depictions of illness, injury, or medical procedures.** Content focuses on financial impact, not medical imagery. (T4_INFERRED)
3. **No modification of the Aflac Duck's appearance.** The duck's design is a trademark and must be rendered consistently. (T4_INFERRED)
4. **No use of red as a warning or fear color in marketing.** Red is reserved for error states in UI, not for emotional manipulation in marketing. (T4_INFERRED)
5. **No complex data visualizations in consumer content.** Insurance is already perceived as complex; design must simplify, not add complexity. (T4_INFERRED)
6. **No stock photography of staged, overly cheerful hospital scenes.** Aflac's visual language for claims scenarios uses authentic, documentary-style imagery. (T4_INFERRED)

---

*Layer 5 of 8 — Brand Autopsy: Aflac Incorporated (AFL)*
*Analysis based on publicly accessible sources as of Q1 2025.*
*Source tiers applied throughout: (official), (observed on aflac.com), (CSS extraction), (estimated).*
