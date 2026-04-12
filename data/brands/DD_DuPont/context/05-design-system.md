# 05. Design System Spec — DuPont (DD)

---

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It is not investment advice, legal advice, or a substitute for DuPont's official brand
> guidelines. All design observations are based on publicly accessible sources: dupont.com,
> CSS extraction from dupont.com, and official marketing materials. Color codes and typographic
> specifications are observed or estimated from public-facing assets and do not constitute
> DuPont's internal style guide. Source notation: `(official)` = DuPont-published content;
> `(observed on dupont.com)` = direct page observation; `(CSS extraction)` = values parsed
> from publicly accessible stylesheets; `(estimated)` = project inference from observable
> patterns. All estimates are labeled as such.

---

## 1. Color Palette

DuPont's visual identity, as observed on dupont.com, reflects the company's positioning as a
science and specialty materials leader. The palette is anchored by a bold red — historically
one of the most recognizable industrial brand colors in the materials sector — supported by
blues and neutral greys that signal technical authority and precision.

### Core Brand Colors

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-brand-red` | `#E4001C` | High (2× extracted) | Primary Brand Color | DuPont logo mark, primary brand accent, key CTA buttons and emphasis elements (CSS extraction) |
| `color-action-blue` | `#009BE3` | High (4× extracted) | Interactive / CTA | Links, primary buttons, interactive navigation elements (CSS extraction) |
| `color-action-blue-dark` | `#0D88C1` | Supporting (3× extracted) | CTA Hover / Depth | Hover states for primary action elements; depth accent in technical content (CSS extraction) |
| `color-dark-text` | `#303030` | High (5× extracted) | Primary Text | Body copy, headlines, navigation labels across dupont.com (CSS extraction) |
| `color-light-grey` | `#D0D0D0` | Very high (8× extracted) | Border / Divider | Section dividers, card borders, table lines, input field outlines (CSS extraction) |
| `color-medium-grey` | `#D6D6D6` | Supporting (2× extracted) | Secondary Border | Secondary dividers, subtle separators in content grids (CSS extraction) |
| `color-slate-blue` | `#495C68` | Supporting (2× extracted) | Tertiary Text / UI | Subnavigation labels, supporting metadata, technical specification labels (CSS extraction) |
| `color-mid-grey-text` | `#869791` | Supporting (2× extracted) | Caption / Metadata | Footnotes, date stamps, secondary labels in content listings (CSS extraction) |
| `color-neutral-grey` | `#808080` | Supporting (2× extracted) | Disabled / Inactive | Inactive form fields, disabled UI states, decorative rule lines (CSS extraction) |
| `color-soft-grey` | `#F2F2F2` | Moderate (3× extracted) | Page Surface | Section background alternation; light card surfaces (CSS extraction) |
| `color-accent-salmon` | `#FF5268` | Supporting (2× extracted) | Alert / Notification | Warning states, alert badges, error indicators (CSS extraction) |
| `color-muted-text` | `#888888` | Supporting (2× extracted) | Secondary Text | Timestamps, breadcrumb separators, helper text (CSS extraction) |

### Product / Application Accent Colors

DuPont's product lines and application areas may carry secondary color associations
in marketing materials. These are not part of the primary UI chrome system.

| Color Name | HEX | Context |
|---|---|---|
| Technology Blue | `#009BE3` | Electronics & Imaging product line visual identity |
| Engineering Dark | `#303030` | Engineering materials brand materials |
| Alert Red | `#FF5268` | Safety information, hazard communication context |

---

## 2. Color Principles

**Principle 1 — DuPont Red (#E4001C) is the primary brand signal, reserved for brand
identification and primary calls to action.**
This color appears in the DuPont logo and is applied to primary action elements. Its high
chroma and historical brand association make it immediately recognizable in industrial and
B2B contexts. Diluting this color across decorative uses would reduce its signaling power
(observed on dupont.com; T4_INFERRED).

**Principle 2 — Action blue (#009BE3) is distinct from the brand red, creating a clear
interactive layer.**
By separating brand identification (red) from interactive affordance (blue), DuPont's digital
system ensures users can distinguish brand messaging from navigational and functional elements.
This two-color system is observed consistently in the primary navigation and CTA buttons
(CSS extraction; observed on dupont.com).

**Principle 3 — Neutral grey tones dominate content areas, allowing product imagery and
technical specifications to carry visual weight.**
The high frequency of grey tones (`#D0D0D0`, `#D6D6D6`, `#F2F2F2`) in the extracted CSS
palette indicates a deliberate restraint in the content system. This is appropriate to a
materials and specialty chemicals company whose primary communication is technical rather
than lifestyle-oriented (CSS extraction; T4_INFERRED).

**Principle 4 — Dark text (#303030) is preferred over pure black for body rendering.**
Like many sophisticated digital brand systems, DuPont avoids pure black (`#000000`) for
body text, using a near-black dark grey that reduces the harshness of black-on-white rendering
while maintaining WCAG AA contrast ratios (CSS extraction; estimated).

**Principle 5 — Alert colors are reserved for functional communication only.**
The salmon/red accent (`#FF5268`) appears in functional alert and notification contexts.
Its use in decorative or marketing contexts would create visual confusion with the safety and
hazard communication conventions of the materials industry (T4_INFERRED).

---

## 3. Typography

DuPont's digital properties employ a typographic system appropriate to its positioning as
a science and engineering brand. Specific typeface identification is based on CSS extraction
and visual inspection of dupont.com.

### Typeface System

| Typeface | Description | Contexts |
|---|---|---|
| **Primary Sans-Serif (Gotham / similar geometric)** | Clean geometric or humanist sans-serif; confident, engineered appearance consistent with industrial brand conventions | Headlines, navigation labels, product section headers, primary CTAs (observed on dupont.com) |
| **Secondary / Body Sans-Serif** | Slightly wider, more legible body-weight variant; optimized for extended reading | Body copy, product descriptions, technical specification text, IR communications (observed on dupont.com) |
| **Monospaced / Technical** | Fixed-width variant for data and specification display | Technical data tables, chemical formula notation, material specification sheets (estimated) |
| **System Fallback Stack** | Arial, Helvetica, sans-serif | Email communications, legacy platforms, browser compatibility contexts (estimated) |

### Role-Based Typographic Scale

| Role | Weight | Desktop Size | Mobile Size | Line Height | Notes |
|---|---|---|---|---|---|
| **Hero / Display Headline** | Bold 700 | 48–72px | 32–48px | 1.10 | Product and campaign hero sections (observed on dupont.com) |
| **Section Headline (H1)** | Semibold 600 | 32–44px | 24–32px | 1.15 | Application area and product category headers (observed on dupont.com) |
| **Section Subhead (H2)** | Regular 400 / Medium 500 | 22–28px | 18–22px | 1.25 | Supporting section headers, sidebar heads (estimated) |
| **Body Copy** | Regular 400 | 16–18px | 15–16px | 1.55 | Product descriptions, technical content, IR communications (observed on dupont.com) |
| **UI Label / Button** | Medium 500 / Semibold 600 | 14–16px | 13–15px | 1.0 | Navigation labels, CTA button text (CSS extraction) |
| **Technical Spec / Table** | Regular 400 | 13–15px | 12–14px | 1.40 | Data tables, material property specifications (estimated) |
| **Caption / Legal** | Regular 400 | 11–13px | 11–12px | 1.35 | Footnotes, legal disclaimers, photo captions (estimated) |

### Typographic Rules

1. **Headline hierarchy is established through size contrast, not decoration.** DuPont's
   typographic system uses scale differentiation — not color, underline, or other emphasis —
   to establish visual hierarchy across content areas.
2. **Technical content uses tighter line-height.** Data tables, material specifications, and
   chemical data are presented in condensed line-height to facilitate scanning, not extended
   reading (estimated).
3. **Legal and compliance text maintains minimum 11px size.** DuPont's status as a public
   company subject to SEC disclosure requirements means that legal text in IR materials must
   remain legible, not footnoted to invisibility (T4_INFERRED).
4. **Mixing typefaces within a single content block is not observed.** Section headers and
   body text may use weight variants of the same typeface family but do not mix geometric
   and serif faces in the same paragraph (observed on dupont.com).

---

## 4. Channel Specifications

| Channel | Asset Type | Dimensions (W × H) | Safe Zone | Key Notes |
|---|---|---|---|---|
| **dupont.com — Hero (Desktop)** | JPEG / WebP | 1920 × 800 px | Center 1280 × 640 px | Full-bleed hero; responsive via CSS background-size; retina delivery (observed on dupont.com) |
| **dupont.com — Hero (Mobile)** | JPEG / WebP | 768 × 500 px | Center 600 × 400 px | Separate mobile asset for performance; focal-point-safe composition (estimated) |
| **dupont.com — Product Card** | PNG / JPEG | 600 × 400 px | 500 × 320 px | Product imagery on neutral background; technical application context (observed on dupont.com) |
| **LinkedIn — Company Post** | JPEG / PNG | 1200 × 627 px | Center 1100 × 540 px | Professional B2B audience; brand red accent permissible in CTA bar (observed on DuPont LinkedIn) |
| **LinkedIn — Document / Report Cover** | JPEG / PNG | 1128 × 635 px | Center 1000 × 560 px | White papers, sustainability reports, technical guides (estimated) |
| **Twitter / X — Card Image** | JPEG / PNG | 1200 × 628 px | Center 1100 × 540 px | Concise; brand mark lower-right; no dense technical copy (estimated) |
| **YouTube — Channel Art** | JPEG | 2560 × 1440 px | Safe zone: 1546 × 423 px center | Brand mark centered; no product photography in unsafe zones (estimated) |
| **YouTube — Thumbnail** | JPEG | 1280 × 720 px | Center 1100 × 620 px | 16:9; headline ≥ 60px weight 700; dark background with brand red accent (estimated) |
| **Email — Header Banner** | JPEG | 1200 × 300 px | Center 900 × 260 px | 600px max email container; text must not be image-only for accessibility (estimated) |
| **Trade Publication — Full Page** | PDF/TIFF | 8.5 × 11 in at 300 DPI | 7 × 10 in live area | Materials sector trade publications; brand red headline (estimated) |
| **Conference / Event Banner** | TIFF / EPS | 8 × 3 ft or 10 × 8 ft | 80% live area | Exhibition hall displays; DuPont red as dominant accent (estimated) |
| **Investor Day — Presentation** | PPTX / Keynote export | 1920 × 1080 px | 120px margin all sides | White background; precise data tables; red and blue accent bars (estimated) |

---

## 5. Layout Principles

**Principle 1 — Scientific precision extends to layout geometry.**
DuPont's page layouts consistently use structured grid systems that reflect the brand's
engineering identity. Content sections are organized with clear column alignment,
mathematical spacing ratios, and predictable section-to-section transitions. Asymmetric
or organic layouts are not observed in primary product or corporate pages (observed on
dupont.com; T4_INFERRED).

**Principle 2 — Application storytelling anchors product pages.**
DuPont's product and material pages lead with application context — showing the material
in use in an industrial, construction, or electronics setting — before moving to technical
specifications. This structure positions the product as a solution, not a commodity
(observed on dupont.com).

**Principle 3 — Data visualization is a primary layout element, not supplementary.**
Chemical and material data tables, performance charts, and specification comparisons are
given prominent layout positions equal to imagery and headline copy. Technical audiences
expect quantified evidence; DuPont's layout structure accommodates this expectation
(observed on dupont.com; T4_INFERRED).

**Principle 4 — Content modules stack vertically in predictable sequence.**
The page structure follows a top-to-bottom narrative: hero statement → application context
→ product specifications → related products → CTA / contact. This predictable module
sequence reduces cognitive load for returning technical purchasers (observed on dupont.com;
T4_INFERRED).

**Principle 5 — Whitespace is calibrated, not minimal.**
Unlike consumer brands that use extreme whitespace for luxury signaling, DuPont's layout
balances information density with breathing room. Technical buyers need sufficient data
proximity to make comparisons; pure minimalism would impede rather than aid decision-making
(observed on dupont.com; T4_INFERRED).

**Principle 6 — Responsive design maintains data table integrity at mobile breakpoints.**
Material specifications and performance data tables are critical for B2B purchasers on
mobile devices. DuPont's responsive implementation prioritizes horizontal scrollability
for data tables rather than collapsing columns that obscure comparative data (estimated
based on observed mobile layout patterns on dupont.com).

---

## 6. Icon & Illustration Style

### Icon System

DuPont's iconography, as observed on dupont.com, uses a utilitarian icon system:

- **Flat line icons:** Thin-stroke outline style in neutral grey or brand blue (`#009BE3`).
  Used for navigation, product category identification, and process flow diagrams (observed
  on dupont.com).
- **Application icons:** Industry-sector pictograms (automotive, electronics, construction,
  packaging) rendered in a consistent geometric flat style. Weight and scale are matched
  to adjacent body text (observed on dupont.com).
- **No decorative illustration:** DuPont's primary visual language is photography and data
  visualization. Decorative illustrated graphics are not observed in the primary web
  marketing system (observed on dupont.com).

### Photography Style

- **Industrial environment photography:** Real-world application contexts — manufacturing
  floors, construction sites, automotive assembly — provide authentic technical credibility.
  Staged stock imagery is not consistent with the observed DuPont visual language
  (observed on dupont.com).
- **Material close-up photography:** Macro-scale imagery of materials, surfaces, and
  substrates demonstrates the physical properties of DuPont products. These shots use
  controlled studio lighting with neutral backgrounds (observed on dupont.com).
- **People in professional contexts only:** Human subjects appear as engineers, scientists,
  or skilled operators in authentic working environments. Consumer lifestyle photography
  is not consistent with the DuPont brand context (observed on dupont.com).

---

## 7. AI Image Generation Prompt Guide

The following prompts are designed to produce visual outputs consistent with DuPont's
publicly observed aesthetic. These are creative reference tools; they are not DuPont-
endorsed and do not reproduce copyrighted DuPont assets.

### Industrial Application Hero
```
Wide-angle industrial photography of [MATERIAL APPLICATION: automotive parts, circuit boards,
building panels, protective packaging] in a modern manufacturing environment, neutral industrial
lighting — bright overhead fluorescent or diffused factory windows, sharp focus on material
surface, human operator in background slightly out of focus, no brand logos on equipment,
clean professional aesthetic, photojournalistic quality, color grade: slightly desaturated
with lifted blacks, DuPont industrial visual language
```

### Material Close-Up / Macro
```
Extreme macro studio photography of [MATERIAL: polymer film, engineering resin, specialty fiber,
protective coating surface], flat matte white or light grey (#F2F2F2) seamless background,
controlled directional light from upper-left, emphasis on texture and surface properties,
ultra-sharp detail across full frame, no props, no contextual clutter, science and engineering
aesthetic, 100mm macro lens equivalent, 5K resolution
```

### Technical Diagram / Process Flow
```
Clean vector-style technical diagram of [PROCESS: material manufacturing stages, product
application layers, supply chain flow], white background (#FFFFFF), line art in dark grey
(#303030) with accent in DuPont blue (#009BE3), geometric precision, no decorative elements,
no shadows or gradients, technical drawing aesthetic consistent with industrial engineering
documentation, clear typographic labels in sans-serif
```

### Sustainability / Environmental Campaign
```
Wide environmental landscape photography, [LOCATION: renewable energy infrastructure,
sustainable agriculture field, urban green building], morning or overcast natural light,
no harsh shadows, one small DuPont product element visible in foreground as minor compositional
accent, emphasis on scale of natural environment, photojournalistic quality, muted natural
color palette, no saturated color grading, clean and science-grounded aesthetic
```

---

## 8. Design Prohibitions

The following practices are inconsistent with DuPont's publicly observed design system.

1. **No use of DuPont Red (#E4001C) on non-interactive decorative elements.** The brand
   red functions as a primary brand signal and attention anchor. Decorating background
   panels, illustration fills, or decorative borders with this color would dilute its
   signaling function and reduce contrast with interactive elements (T4_INFERRED; observed
   on dupont.com).

2. **No consumer-lifestyle photography as primary brand imagery.** DuPont is a B2B
   materials company. Photography of aspirational lifestyle scenes (families, outdoor
   recreation, luxury interiors) without a direct material application context is
   inconsistent with the brand's technical and industrial identity (observed on dupont.com;
   T4_INFERRED).

3. **No gradient fills on primary headline text.** DuPont's observed typography uses solid
   color fills — dark grey (`#303030`) or white — for all headline and body text. Gradient-
   fill text treatments are not observed in the primary digital or print brand system
   (observed on dupont.com).

4. **No decorative drop shadows on product imagery.** Material and product photography
   uses controlled studio or environmental lighting without post-production drop shadow
   additions. Shadows added in compositing introduce a visual artificiality inconsistent
   with the precision aesthetic (T4_INFERRED).

5. **No unattributed claims in marketing materials.** DuPont's science-based brand
   positioning requires that product performance claims be traceable to test data or
   specifications. Marketing copy that makes unverifiable superlative claims is inconsistent
   with the brand's credibility requirements (official, DuPont brand standards; T4_INFERRED).

6. **No sans-serif headline substitution with serif typefaces.** DuPont's headline
   typography is geometric/humanist sans-serif. Serif typefaces in primary marketing
   contexts introduce a consumer editorial aesthetic inconsistent with the engineering
   brand identity (T4_INFERRED based on observed dupont.com typography).

7. **No more than two chromatic accent colors per page section.** The red-and-blue dual
   accent system requires restraint. Introducing a third chromatic accent in a single
   viewport section creates visual competition that undercuts the system's clarity
   (T4_INFERRED).

8. **No political or cause-marketing associations in primary brand content without
   official company position.** DuPont's communications focus on science, materials,
   and sustainability with traceable metrics. Cause associations that cannot be
   substantiated with operational data are inconsistent with the brand's evidential
   standards (T4_INFERRED).

9. **No all-caps body text.** Technical content requires high legibility. All-caps
   formatting reduces reading speed and is not observed in DuPont's product description
   or specification text (estimated).

10. **No stock photography of scientists in generic lab coats without product context.**
    Generic laboratory imagery without a clear material-science application context
    conveys inauthenticity to technical audiences who work in real laboratory environments
    (T4_INFERRED; observed on dupont.com).

---

*Layer 5 of 8 — Brand Autopsy: DuPont (DD)*
*Analysis based on publicly accessible sources as of Q1 2025.*
*This is not DuPont's official Brand Identity Guidelines document.*
*Source tiers applied throughout: (official), (observed on dupont.com), (CSS extraction), (estimated).*
