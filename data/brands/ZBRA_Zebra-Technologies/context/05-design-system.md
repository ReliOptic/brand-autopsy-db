# 05. Design System Spec — Zebra Technologies Corporation (ZBRA)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for Zebra Technologies' official brand guidelines. All design observations are based on publicly accessible sources: zebra.com, CSS extraction from zebra.com, and official marketing materials. Color codes, spacing values, and typographic specifications are observed or estimated from public-facing assets and do not constitute Zebra's internal style guide. Source notation: `(official)` = company-published content; `(observed on zebra.com)` = direct page observation; `(CSS extraction)` = values parsed from publicly accessible stylesheets; `(estimated)` = project inference from observable patterns.

---

## 1. Color Palette

Zebra's visual identity is built on a high-contrast black-and-white foundation — a direct expression of the company's namesake — with a distinctive electric green accent that signals technology and innovation. The CSS data extracted from zebra.com reveals a Bootstrap-influenced design system with Zebra-specific brand overlays.

### Core Brand Colors

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-zebra-black` | `#212529` | Very high (30x observed) | Primary Text / Brand Foundation | All primary headlines, body copy, navigation labels across zebra.com. This near-black (Bootstrap's `$gray-900`) serves as the primary text color rather than pure `#000000`. (CSS extraction) |
| `color-zebra-dark` | `#343A40` | High (19x observed) | Secondary Dark / Dark Surface | Dark background sections, footer backgrounds, dark-mode navigation panels. Bootstrap's `$gray-800`. (CSS extraction) |
| `color-zebra-green` | `#A8F931` | Low frequency in CSS (1x) | Brand Accent / Innovation Signal | Zebra's signature electric green accent. Used sparingly for brand emphasis — logo accent, key CTAs, and highlight moments. The low CSS frequency indicates this color is applied selectively for maximum impact rather than as a general UI color. (CSS extraction) |
| `color-action-blue` | `#007BFF` | High (34x observed) | Primary CTA / Interactive Elements | All interactive links, primary CTA buttons ("Learn More," "Contact Sales," "Download"), form elements. Standard Bootstrap primary blue. (CSS extraction) |
| `color-enterprise-blue` | `#003FBD` | Low (1x observed) | Deep Blue Accent | Used in enterprise-focused sections and partner program branding. A deeper, more authoritative blue than the standard action blue. (CSS extraction) |
| `color-mid-grey` | `#6C757D` | High (38x observed) | Secondary Text / Muted UI | Secondary text, placeholder text, disabled states, muted icons. Bootstrap's `$gray-600`. The highest-frequency color in the extracted CSS. (CSS extraction) |
| `color-body-grey` | `#495057` | Moderate (13x observed) | Body Text Alternative | Used for body text in certain contexts where slightly lighter weight is desired than the primary `#212529`. (CSS extraction) |
| `color-light-grey` | `#ADB5BD` | Low-moderate (7x observed) | Tertiary Text / Borders | Muted borders, inactive tab labels, tertiary metadata. (CSS extraction) |
| `color-divider` | `#DEE2E6` | High (26x observed) | Border / Divider / Separator | Horizontal rules, card borders, table borders, input field borders. (CSS extraction) |
| `color-surface-light` | `#E9ECEF` | Moderate (16x observed) | Light Surface / Background Accent | Alternating section backgrounds, card hover states, light surface panels. (CSS extraction) |
| `color-surface-lightest` | `#F8F9FA` | Moderate (17x observed) | Page Background | Primary page background, light card surfaces, form input backgrounds. (CSS extraction) |
| `color-surface-white` | `#F2F2F2` | Low (1x observed) | Alternate Light Surface | Used in specific sections requiring slightly warmer light background than `#F8F9FA`. (CSS extraction) |
| `color-highlight-light` | `#E6E6E6` | Low (2x observed) | Highlight / Selected State | Background for selected or highlighted UI states. (CSS extraction) |

### Semantic / State Colors

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-success` | `#28A745` | High (28x observed) | Success State | Form validation success, confirmation messages, positive status indicators. Bootstrap `$green`. (CSS extraction) |
| `color-danger` | `#DC3545` | High (28x observed) | Error / Danger State | Form validation errors, alert banners, destructive action warnings. Bootstrap `$red`. (CSS extraction) |
| `color-warning` | `#FFC107` | Moderate (17x observed) | Warning State | Caution alerts, pending status indicators. Bootstrap `$yellow`. (CSS extraction) |
| `color-info` | `#17A2B8` | Moderate (17x observed) | Info State | Informational banners, tooltip backgrounds. Bootstrap `$cyan`. (CSS extraction) |
| `color-info-light` | `#B3D7FF` | Low (5x observed) | Info Highlight | Light blue backgrounds for informational callouts. (CSS extraction) |
| `color-info-dark` | `#004085` | Low (5x observed) | Info Text on Dark | Text color within dark-background informational alerts. (CSS extraction) |

---

## 2. Color Principles

**Principle 1 — Black and white form the brand's visual foundation.**
Zebra's namesake — the zebra — is a black-and-white animal. The brand's visual system reflects this through heavy use of `#212529` (near-black) and white/light grey backgrounds. This high-contrast foundation creates a professional, authoritative visual identity appropriate for enterprise technology. (T4_INFERRED from observed visual patterns on zebra.com)

**Principle 2 — Electric green (#A8F931) is the signature accent — reserved for brand moments.**
The Zebra green appears in the logo and selectively in campaign materials to signal innovation and energy. Its low frequency in the extracted CSS (1x) indicates disciplined application — this color is not a general-purpose UI element but a brand-level signal. Using it broadly would dilute its impact. (CSS extraction; T4_INFERRED for usage rationale)

**Principle 3 — Blue (#007BFF) is reserved for interactive elements and CTAs.**
All clickable elements — buttons, links, form actions — use the standard blue. This establishes a consistent interactive affordance across the site. The blue is functional, not decorative. (CSS extraction)

**Principle 4 — The color system is Bootstrap-based with brand overlays.**
Zebra's web design system uses Bootstrap's standard color variables as the foundation, with Zebra-specific brand colors (`#A8F931` green, `#003FBD` enterprise blue) layered on top. This pragmatic approach reflects a B2B enterprise technology company prioritizing development efficiency and cross-team consistency over bespoke visual design. (CSS extraction; T4_INFERRED)

**Principle 5 — Gradients are minimal; the visual system is flat.**
Zebra's web design uses solid color fills. Gradient backgrounds, decorative color transitions, and glossy surface effects are not observed on zebra.com's primary product and solution pages. (observed on zebra.com)

---

## 3. Typography

Zebra employs a combination of its proprietary ZebraSans typeface and the commercially available Proxima Nova family, with standard system font fallbacks.

### Typeface System

| Typeface | Description | Contexts |
|---|---|---|
| **ZebraSans** | Zebra's proprietary custom sans-serif typeface. Present in the CSS font stack. (CSS extraction) | Brand-level headlines, logo lockups, campaign materials. Carries the brand's visual DNA — geometric, clean, modern industrial aesthetic. |
| **Proxima Nova** | Commercially licensed geometric sans-serif by Mark Simonson. Used as the primary web body typeface. Three variants detected in CSS: `proxima-nova`, `proxima-nova-condensed`, `proxima-nova-extra-condensed`. (CSS extraction) | Body copy, subheads, navigation labels, UI elements, data tables, product specifications |
| **Noto Sans** | Google's open-source sans-serif. Present in the CSS font stack as a fallback. (CSS extraction) | Fallback for international character sets and environments where Proxima Nova is unavailable |
| **Roboto** | Google's Android system font. Present in the CSS font stack. (CSS extraction) | Fallback for Android device rendering and developer documentation contexts |
| **System Stack** | Arial, Helvetica, Helvetica Neue, Segoe UI, Liberation Sans — standard system font fallbacks. (CSS extraction) | Final fallback when custom fonts fail to load |
| **Monospace** | SFMono-Regular, Consolas, Liberation Mono, Menlo, Monaco. (CSS extraction) | Code samples, developer documentation, API references, technical specifications requiring monospaced rendering |

### Role-Based Typographic Scale (estimated from observed rendering on zebra.com)

| Role | Typeface | Weight | Desktop Size | Mobile Size | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| **Hero / Campaign Headline** | ZebraSans or Proxima Nova | Bold 700 | 40-56px | 28-36px | 1.10-1.15 | 0em (estimated) |
| **Section Headline (H1)** | Proxima Nova | Bold 700 | 32-40px | 24-32px | 1.15-1.20 | 0em (estimated) |
| **Section Subhead (H2)** | Proxima Nova | Semibold 600 | 24-28px | 20-24px | 1.25 | 0em (estimated) |
| **Body Copy** | Proxima Nova | Regular 400 | 16px | 14-16px | 1.50-1.60 | 0em (observed on zebra.com) |
| **UI Label / Button** | Proxima Nova | Semibold 600 | 14-16px | 13-14px | 1.0-1.20 | 0em (observed on zebra.com) |
| **Caption / Footnote** | Proxima Nova | Regular 400 | 12-13px | 11-12px | 1.40 | 0em (estimated) |
| **Product Spec Table** | Proxima Nova or Proxima Nova Condensed | Regular 400 | 14px | 12-14px | 1.30-1.40 | 0em (estimated) |
| **Nav Label** | Proxima Nova | Semibold 600 | 14px | 14px | 1.0 | 0.02em (estimated) |

### Condensed Variants

Zebra's CSS includes `proxima-nova-condensed` and `proxima-nova-extra-condensed` — indicating usage of narrower typeface variants for space-constrained contexts such as data tables, comparison charts, product specification matrices, and dense informational layouts. This is consistent with a B2B technology company that must present detailed technical specifications in compact formats. (CSS extraction; T4_INFERRED for usage rationale)

### Typographic Rules

1. **ZebraSans is reserved for brand-level contexts.** Product data sheets, solution pages, and general web body copy use Proxima Nova. ZebraSans appears in campaign materials, hero sections, and logo lockups. (T4_INFERRED from observed patterns)
2. **Headline hierarchy uses both size and weight differentiation.** H1 uses Bold 700; H2 uses Semibold 600 — the weight change reinforces the size-based hierarchy. (estimated from observed rendering)
3. **Body text minimum size is 16px on desktop.** This is consistent with modern web accessibility standards and WCAG recommendations. (observed on zebra.com)
4. **Condensed variants are used for data-dense layouts, not for general headlines.** The condensed and extra-condensed weights serve a functional purpose (fitting more data in product comparison tables) rather than an aesthetic one. (T4_INFERRED)
5. **Monospace is used exclusively in developer documentation contexts.** Code samples, API endpoint references, and device configuration examples use the monospace stack. (observed on developer.zebra.com)

---

## 4. Channel Specifications

Pixel dimensions are estimated from observed Zebra creative assets, social channel inspection, and standard B2B platform specifications as of 2024.

| Channel | Asset Type | Dimensions (W x H) | Safe Zone | Key Notes |
|---|---|---|---|---|
| **zebra.com — Hero (Desktop)** | Full-bleed JPEG / WebP | 1920 x 800 px (estimated) | Center 1440 x 700 px active content area | Typically features a product photograph on one side with headline text on the other; B2B enterprise aesthetic (observed on zebra.com) |
| **zebra.com — Hero (Mobile)** | Responsive JPEG / WebP | 750 x 900 px (estimated) | Center 375 x 667 px active | Stacked layout: headline above, product/scene image below (observed on zebra.com) |
| **zebra.com — Product Card** | PNG with background | 640 x 480 px (estimated) | 560 x 400 px usable | Product photography on white or light grey background; consistent product-on-white style across catalog (observed on zebra.com) |
| **LinkedIn — Feed Image** | JPEG / PNG | 1200 x 627 px | Center 1100 x 540 px | Primary B2B social channel; thought leadership graphics, study data infographics, event promotions (observed on Zebra LinkedIn) |
| **LinkedIn — Carousel** | PDF / Multi-image | 1080 x 1080 px per slide | 960 x 960 px per slide | Used for multi-point data presentations from annual studies (estimated) |
| **Twitter/X — Card Image** | JPEG / PNG | 1200 x 628 px | Center 1100 x 540 px | Product announcements, event coverage, study data highlights (observed on @ZebraTechnology Twitter) |
| **YouTube — Thumbnail** | JPEG | 1280 x 720 px | Center 1100 x 620 px | Product name + key visual; Zebra black/green brand colors in text overlay (observed on Zebra YouTube channel) |
| **YouTube — Channel Art** | JPEG | 2560 x 1440 px | Safe: 1546 x 423 px center | "Your Edge" campaign visual with Zebra logo (observed on Zebra YouTube channel) |
| **Trade Show — Booth Graphics** | TIFF / EPS vector | Variable (10x8 ft typical) | N/A | Black background with Zebra green accents; product displays; demo stations; large-format Zebra wordmark (estimated from trade show photography) |
| **Email — Header Banner** | JPEG | 1200 x 400 px (estimated) | Center 960 x 340 px | Product feature or event promotion; Zebra black header bar with green accent (estimated) |
| **Solution Brief — PDF Cover** | PDF | 8.5 x 11 in (US Letter) | 0.75 in margins | Black header bar with Zebra logo; product photography; industry-specific imagery (observed on zebra.com downloadable PDFs) |
| **Data Sheet — PDF** | PDF | 8.5 x 11 in (US Letter) | 0.5 in margins | Product photograph upper-left; specification table format; Zebra green accent line separating sections (observed on zebra.com downloadable data sheets) |

---

## 5. Layout Principles

**Principle 1 — Information density is higher than consumer tech brands.**
Zebra's web pages contain more text, more data tables, and more specification details per viewport than consumer technology brands. This reflects the B2B buyer's need for comprehensive technical information during evaluation. Product pages include specification tables, feature comparison matrices, and compatibility charts. (observed on zebra.com)

**Principle 2 — Two-column layouts are the default composition.**
Zebra's product and solution pages consistently use a two-column structure: image or video on one side, text content on the other. This contrasts with the single-column, full-viewport approach of consumer brands and reflects the B2B preference for efficiency — presenting visual and textual information simultaneously. (observed on zebra.com)

**Principle 3 — Product photography is functional, not aspirational.**
Zebra product images show devices at standard angles — front, side, in-hand with a worker wearing gloves — against white or light grey backgrounds. Products are photographed in their operational context: mounted on a forklift, held by a nurse in scrubs, used at a retail checkout. The photography serves identification and evaluation, not emotional aspiration. (observed on zebra.com product pages)

**Principle 4 — Navigation is solution-centric, not product-centric.**
Zebra's primary navigation organizes content by industry ("Retail," "Healthcare," "Warehouse") and solution type ("Mobile Computers," "Scanners," "Printers") rather than by product model number. This guides the buyer from business need to product solution rather than requiring prior knowledge of Zebra's product nomenclature. (observed on zebra.com navigation structure)

**Principle 5 — CTAs are action-specific, not generic.**
Zebra's CTAs specify the action outcome: "Download the Data Sheet," "Contact a Zebra Expert," "Request a Demo," "View Compatible Accessories." Generic CTAs ("Learn More") appear less frequently than action-specific alternatives. (observed on zebra.com)

**Principle 6 — Whitespace is moderate — functional, not dramatic.**
Unlike Apple's 40-60% whitespace allocation, Zebra's pages use approximately 20-30% whitespace (estimated). Content sections are separated by dividers (`#DEE2E6`) and alternating background colors (`#F8F9FA` and white) rather than large expanses of negative space. This reflects the B2B audience's expectation of information density. (estimated; observed on zebra.com)

---

## 6. Icon & Illustration Style

### Icon System

Zebra uses a simple, stroke-based icon set on zebra.com for navigation, feature callouts, and industry vertical identification. (observed on zebra.com)

Key characteristics:
- **Line weight**: Consistent medium-weight strokes, approximately 2px at standard display size (estimated)
- **Style**: Outlined / stroke-based, not filled. Clean geometric forms consistent with Proxima Nova's geometric character. (observed on zebra.com)
- **Color**: Typically rendered in `#212529` (near-black) or `#007BFF` (action blue) on light backgrounds. White on dark backgrounds. (observed on zebra.com)
- **Subject matter**: Industry-specific (warehouse rack, shopping cart, hospital bed, factory gear, barcode, RFID tag, mobile device, printer) — functional icons that communicate use case context. (observed on zebra.com)

### Illustration Style

Zebra uses minimal illustration. When present:
- **Infographic / data visualization style**: Flat vector graphics with Zebra's brand colors (black, green, blue). Used in annual study reports and solution architecture diagrams. (observed on zebra.com resources)
- **Architecture diagrams**: Technical line drawings showing device-to-software-to-cloud integration flows. Clean, schematic style with labeled components. (observed on zebra.com solution pages)
- **No character illustrations or mascots**: Zebra does not use illustrated human figures or brand mascots. Human presence is exclusively photographic. (observed on zebra.com)

---

## 7. AI Image Generation Prompt Guide

### Enterprise Product Shot (Catalog)
```
Professional product photography of [ZEBRA DEVICE NAME], front-facing on pure white
(#FFFFFF) background, even studio lighting with soft shadows, sharp focus across full
device surface, device screen showing operational UI (barcode scan result or workflow
screen), no human hands, no props, industrial technology product aesthetic,
high-resolution catalog quality
```

### Frontline Worker In-Context Shot
```
Documentary-style photography, [WORKER ROLE: warehouse associate, nurse, retail store
employee] using [ZEBRA DEVICE] while [ACTIVITY: scanning packages on conveyor belt,
scanning patient wristband, checking inventory on retail floor], operational environment
lighting (warehouse fluorescent, hospital hallway, retail store), medium depth of field
f/4.0 equivalent, authentic working expression — focused and competent, safety gear
visible if warehouse context, no visible non-Zebra brand logos on devices, professional
B2B marketing aesthetic
```

### Solution Architecture Diagram
```
Clean technical diagram, white background, flat vector style, showing [WORKFLOW:
warehouse receiving to shipping / hospital medication administration / retail inventory
to fulfillment], Zebra devices (scanner, printer, mobile computer) as labeled nodes,
cloud connection to enterprise software (WMS/EMR/POS), directional arrows showing data
flow, Zebra brand colors (black #212529, green #A8F931, blue #007BFF), no gradients,
no 3D effects, schematic engineering aesthetic
```

### Trade Show Environment
```
Wide-angle photography of technology trade show booth, black (#212529) booth structure
with Zebra green (#A8F931) accent lighting, product display pedestals with [ZEBRA
DEVICES] on white surfaces, large-format screens showing operational video, demo
stations with live devices, professional trade show lighting, NRF/HIMSS/ProMat
conference environment, attendees in business casual interacting with devices
```

---

## 8. Design Prohibitions

1. **No use of Zebra green (#A8F931) as a background fill for large areas.** The electric green is an accent color, not a surface color. Large green areas would overwhelm the black-and-white brand foundation. (T4_INFERRED from observed usage patterns)

2. **No gradient fills on interactive elements.** Buttons and CTAs use solid color fills consistent with the flat design system. (observed on zebra.com)

3. **No consumer-tech visual language.** Lifestyle photography with casual settings (coffee shops, living rooms), aspirational portraiture, or consumer device aesthetic treatments are inconsistent with Zebra's enterprise industrial positioning. (T4_INFERRED)

4. **No decorative use of the zebra stripe pattern.** While the Zebra name evokes the animal's stripe pattern, the brand's actual visual system uses a clean geometric treatment of the Zebra wordmark — not literal animal stripe patterns as decorative backgrounds. (observed on zebra.com, official brand materials)

5. **No use of product imagery without operational context.** When devices appear outside of catalog-style white-background shots, they should be shown in operational environments (warehouses, hospitals, stores) — not in abstract or artistic compositions. (observed on zebra.com)

6. **No mixing of ZebraSans with other display typefaces.** ZebraSans carries brand-level authority. Mixing it with other decorative or display typefaces in the same layout dilutes its brand signal. (T4_INFERRED)

7. **No rounded or pill-shaped buttons in enterprise portal contexts.** Zebra's web UI uses standard Bootstrap-style rectangular buttons with modest corner radius (approximately 4px, estimated). Fully rounded or pill-shaped buttons are not observed. (observed on zebra.com)

8. **No stock photography with generic corporate subjects.** If humans appear in Zebra marketing, they should be identifiable as frontline workers (warehouse associates, nurses, store employees) in operational settings — not generic stock photo subjects in business suits shaking hands. (T4_INFERRED from observed photography direction)

9. **No use of competitor product imagery or logos.** Competitive comparison content uses specification tables and TCO calculations, not visual comparisons of physical products. (T4_INFERRED)

10. **No animation or motion effects that delay content access.** Zebra's web experience prioritizes information access speed for time-constrained enterprise buyers. Decorative animations that delay page interaction are not consistent with the B2B audience's expectations. (T4_INFERRED)

---

*Layer 5 of 8 — Brand Autopsy: Zebra Technologies Corporation (ZBRA)*
*Analysis based on publicly accessible sources as of 2024.*
*This is not Zebra Technologies' official Brand Identity Guidelines document.*
*Source tiers applied throughout: (official), (observed on zebra.com), (CSS extraction), (estimated).*
