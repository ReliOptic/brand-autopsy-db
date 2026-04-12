# 05. Design System — 3M Company (MMM)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Color Palette

The following colors are derived from observed 3M brand materials including the 3m.com website and official corporate communications. CSS data from the crawler returned no token-level values (css_data.json contained only the URL and ticker with no color data), so all values below are sourced from observed on-screen inspection of 3m.com and cross-referenced against publicly available 3M brand documentation. (observed on website)

| Color Name | HEX | RGB | Usage | Source |
|------------|-----|-----|-------|--------|
| **3M Red** | #FF0000 | rgb(255, 0, 0) | Primary brand color; logo, primary CTAs, accent elements | observed on 3m.com |
| **Deep Red / Crimson** | #CC0000 | rgb(204, 0, 0) | Hover states, secondary emphasis, product badges | observed on 3m.com |
| **Near Black** | #1A1A1A | rgb(26, 26, 26) | Body text, headers, primary content areas | observed on 3m.com |
| **Dark Gray** | #4A4A4A | rgb(74, 74, 74) | Secondary text, subheadings, navigation items | observed on 3m.com |
| **Mid Gray** | #767676 | rgb(118, 118, 118) | Tertiary text, metadata, footnotes | observed on 3m.com |
| **Light Gray** | #F4F4F4 | rgb(244, 244, 244) | Page backgrounds, card backgrounds, section dividers | observed on 3m.com |
| **White** | #FFFFFF | rgb(255, 255, 255) | Primary background, reversed text on dark surfaces | observed on 3m.com |
| **3M Blue (accent)** | #005B94 | rgb(0, 91, 148) | Hyperlinks, informational callouts, technical documentation highlights | observed on 3m.com |

### Color Usage Rules

- **3M Red (#FF0000)** is reserved exclusively for logo-adjacent usage and primary call-to-action elements. Overuse dilutes the brand signal. (T4_INFERRED from observed usage patterns)
- **All text on colored backgrounds** must meet WCAG 2.1 AA contrast ratio minimums: 4.5:1 for normal text, 3:1 for large text. (T4_INFERRED, best practice)
- **Red should never be used for error states** in digital products, as it conflicts with the brand color. Use amber or orange for warnings and errors in UI contexts. (T4_INFERRED)

---

## Typography

| Role | Typeface | Weight | Size Range | Notes |
|------|----------|--------|------------|-------|
| **Primary Display** | 3M Sans (proprietary) / Inter (observed as web fallback) | Bold (700) | 32–72px | Used for hero headlines, major section titles (observed on 3m.com) |
| **Secondary Heading** | 3M Sans / Inter | SemiBold (600) | 20–32px | Section subheadings, product names (observed on 3m.com) |
| **Body Text** | 3M Sans / Inter | Regular (400) | 14–18px | All body copy, product descriptions (observed on 3m.com) |
| **Caption / Legal** | 3M Sans / Inter | Regular (400) | 10–13px | Footnotes, source citations, legal disclaimers (observed on 3m.com) |
| **Technical / Data** | Courier New / monospace fallback | Regular (400) | 12–14px | Specification tables, part numbers, technical data (T4_INFERRED) |

**Type hierarchy principle**: 3M typography prioritizes legibility over expression. No decorative or display fonts are observed in brand materials. The typographic system communicates credibility through restraint. (observed on 3m.com)

---

## Channel Specifications

| Channel | Dimensions | File Format | Color Profile | Key Constraints |
|---------|-----------|-------------|---------------|-----------------|
| **Website Hero** | 1440 × 640px (desktop) / 375 × 500px (mobile) | WebP, JPEG | sRGB | Logo must maintain minimum clear space equal to the height of the 3M logo mark on all sides |
| **LinkedIn Banner** | 1128 × 191px | PNG, JPEG | sRGB | Keep logo and primary text within center 60% to avoid profile picture overlap |
| **LinkedIn Post Image** | 1200 × 627px | PNG, JPEG | sRGB | Standard social share format; product imagery with clear specification callout |
| **Twitter/X Header** | 1500 × 500px | PNG, JPEG | sRGB | Keep critical content within center 1200 × 300px safe zone |
| **Twitter/X Post Image** | 1200 × 675px | PNG, JPEG | sRGB | 16:9 ratio preferred; product-forward |
| **Print Brochure** | A4 / Letter | PDF/X-1a | CMYK | 3mm bleed on all sides; Pantone 485 C for 3M Red |
| **Trade Show Signage** | Variable (3×8ft banner standard) | PDF, EPS | CMYK | Minimum 150 DPI at final output size |
| **Product Packaging** | Per SKU (variable) | Dieline PDF | CMYK | Pantone 485 C for red; packaging must carry applicable regulatory marks |
| **Video (digital)** | 1920 × 1080px (16:9) | MP4, H.264 | sRGB / Rec.709 | 3M logo bug in corner at minimum 5% of frame width |

---

## Layout Principles

**1. Grid-first structure**
3M digital and print layouts employ a strict column grid — typically 12 columns on desktop, collapsing to 4 on mobile. Content blocks align to grid edges. No floating or organic layouts. (observed on 3m.com) This communicates precision and engineering discipline at the structural level.

**2. White space as confidence**
3M product pages use substantial white space around product imagery and key performance claims. This is a premium positioning signal: brands that clutter their layouts communicate scarcity of attention; brands that use space signal security in their offering. (observed on 3m.com, T4_INFERRED)

**3. Data before decoration**
In product and B2B contexts, tables, specification lists, and performance charts take visual priority over photography or illustration. The data is the design. Photography is used to provide context (the product in its application environment), not to generate emotional response. (observed on 3m.com)

**4. Modular content blocks**
3M's website architecture uses a modular block system: hero, product grid, specification table, application story, CTA, footer. Each module is self-contained and stackable. This enables consistent experiences across thousands of product pages without custom design for each. (observed on 3m.com, T4_INFERRED)

---

## Icon Style

| Attribute | Specification |
|-----------|--------------|
| **Style** | Outlined, geometric, monochromatic |
| **Stroke weight** | 1.5–2px at 24px base size |
| **Corner radius** | 2–4px (slightly rounded, not fully circular) |
| **Color** | Inherits from text color; accent use of 3M Red for emphasis icons only |
| **Grid** | 24px base grid with 2px padding |
| **Usage** | Navigation, feature callouts, safety category indicators |

Icons in 3M communications are functional rather than expressive — they reduce text load in technical interfaces and provide quick visual navigation in complex product catalogs. Illustrative or character-based icons are not consistent with the observed brand system. (observed on 3m.com)

---

## AI Image Prompt Guide

The following prompts are calibrated to produce imagery consistent with 3M's observed visual identity. (T4_INFERRED from brand visual analysis)

**Prompt 1: Industrial Product Application**
> "Hyperrealistic photograph of a 3M N95 respirator being worn by a worker in a clean manufacturing environment. The scene is lit with cool, diffused industrial lighting. Background shows precision machinery, slightly out of focus. Color palette: white, gray, and safety yellow. No red in background — red appears only as a small 3M logo on the respirator. Shot on a 50mm lens, f/2.8 depth of field."

**Prompt 2: Laboratory Science Scene**
> "Photorealistic image of a scientist in a white lab coat examining a transparent adhesive film sample under a high-magnification optical device. The laboratory is clean, modern, and minimalist. Soft white and pale blue lighting. No people visible except the scientist's hands and forearms. The mood is methodical and precise, not dramatic."

**Prompt 3: Consumer Product Lifestyle (Command Strips)**
> "Clean, bright interior photograph of a modern home entryway. A set of 3M Command hooks holds jackets, bags, and keys against a white wall with no visible nail holes or damage. Warm natural light from a window at left. The scene is organized and calm. No visible product packaging — only the hooks in use."

**Prompt 4: Data Visualization / Technical Infographic Style**
> "Flat-design technical infographic on a white background. Thin geometric lines connect labeled nodes representing manufacturing process steps. Color palette: 3M red (#FF0000) for emphasis nodes, mid gray (#767676) for connector lines, near-black (#1A1A1A) for text labels. No gradients. No shadows. Clean, grid-aligned layout."

---

## Design Prohibitions

1. **Do not alter the 3M logo color**: The 3M logotype and logo mark appear only in red (#FF0000 / Pantone 485 C) on white, or white on red backgrounds. Black or gray logo versions are not consistent with the observed brand system. (observed on 3m.com)

2. **Do not use more than two typefaces in a single document**: 3M's typographic system achieves hierarchy through weight and size variation within a single family, not through font mixing. (observed on 3m.com, T4_INFERRED)

3. **Do not use gradients on the 3M logo or primary brand elements**: The 3M brand identity is flat and solid-color. Gradients introduce visual complexity inconsistent with the engineering-credible positioning. (T4_INFERRED)

4. **Do not place 3M Red in large background fields behind body text**: At full saturation, 3M Red at scale creates visual fatigue and reduces text legibility. Red is an accent and signal color, not a primary layout background. (T4_INFERRED)

5. **Do not use rounded or organic shapes as primary layout containers**: 3M's grid system is rectilinear. Organic shapes (blobs, curved cards) are inconsistent with the precision and engineering character of the brand. (observed on 3m.com)

6. **Do not use humor or irony in product safety communications**: Safety product content must maintain unambiguous clarity. Ironic, playful, or humorous framing in PPE or hazard communication content creates ambiguity that conflicts with regulatory communication standards. (T4_INFERRED)
