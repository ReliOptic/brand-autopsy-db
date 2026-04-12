# 05. Design System Spec — Wynn Resorts, Limited (WYNN)

---

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It is not investment advice, legal advice, or a substitute for Wynn Resorts' official brand
> guidelines. All design observations are based on publicly accessible sources: wynnresorts.com,
> CSS extraction from wynnresorts.com, official marketing materials, and property photography.
> Color codes, spacing values, and typographic specifications are observed or estimated from
> public-facing assets and do not constitute Wynn's internal style guide. Source notation:
> `(official)` = Wynn-published content; `(observed on wynnresorts.com)` = direct page observation;
> `(CSS extraction)` = values parsed from publicly accessible stylesheets via
> `data/raw/WYNN/css_data.json`; `(estimated)` = project inference from observable patterns.

---

## 1. Color Palette

Wynn's color system is built on a foundation of deep teal-green, warm gold/bronze, and neutral
dark tones — a palette that evokes natural luxury materials: aged copper, forest canopy, warm
stone. The observed palette from wynnresorts.com CSS extraction (data/raw/WYNN/css_data.json)
reveals approximately 20 distinct colors. The core brand system is documented below.

### Core Brand Colors (CSS Extraction)

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-wynn-teal` | `#006F62` | High (3x observed) | Primary Brand Color | The signature Wynn green-teal; appears in navigation, header elements, and primary brand identifiers. This is the color most closely associated with the Wynn brand identity. (CSS extraction) |
| `color-wynn-teal-bright` | `#008475` | Moderate (2x observed) | Teal Accent / Hover State | Brighter variant of the primary teal; used for interactive element states and accent applications (CSS extraction) |
| `color-wynn-gold` | `#C37A04` | Moderate (2x observed) | Primary Accent — Gold | Warm gold used for accent elements, highlights, and luxury signifiers. Evokes bronze and warm metal finishes consistent with property interior design. (CSS extraction) |
| `color-wynn-gold-deep` | `#9A6E0B` | High (3x observed) | Deep Gold / Bronze | Darker, richer gold tone; used in text accents and premium section identifiers. More restrained than the primary gold. (CSS extraction) |
| `color-wynn-red` | `#D61C38` | Moderate (2x observed) | Alert / Feature Accent | Crimson red; used sparingly for emphasis elements, promotional callouts, and action indicators (CSS extraction) |
| `color-wynn-green` | `#518313` | Moderate (2x observed) | Natural / Sustainability Accent | Organic green tone; used in sustainability messaging and nature-related content sections (CSS extraction) |
| `color-grey-warm` | `#9CA3AF` | Moderate (2x observed) | Secondary Text | Warm grey for supporting text, captions, and metadata (CSS extraction) |
| `color-grey-light` | `#E5E7EB` | Low (1x observed) | Border / Divider | Light grey for card borders, section dividers, and subtle separators (CSS extraction) |
| `color-surface-warm` | `#F6F3EF` | Low (1x observed) | Warm Surface Background | Cream/warm white for page section backgrounds; warmer than pure white, consistent with the brand's warm material palette (CSS extraction) |
| `color-surface-cool` | `#EBF2F5` | Low (1x observed) | Cool Surface Background | Light blue-grey surface for alternating sections; provides contrast to warm surfaces (CSS extraction) |
| `color-surface-light` | `#F7F7F7` | Low (1x observed) | Neutral Light Surface | Near-white surface for general page backgrounds (CSS extraction) |
| `color-charcoal` | `#3C3C3C` | Low (1x observed) | Body Text — Dark | Dark charcoal for primary body text; softer than pure black (CSS extraction) |
| `color-near-black` | `#2D2D2D` | Low (1x observed) | Dark Mode / Header Text | Near-black for header elements and dark-mode contexts (CSS extraction) |
| `color-dark` | `#1B1C1E` | Low (1x observed) | Footer / Dark Section Background | Deepest dark tone for footer and dark-mode section backgrounds (CSS extraction) |
| `color-true-dark` | `#101010` | Low (1x observed) | Maximum Contrast Dark | Used in highest-contrast dark contexts (CSS extraction) |

### Color Interpretation Notes

The Wynn palette is notably warmer and more material-referencing than technology brand palettes.
Where Apple uses blue (#0071e3) as its action color, Wynn uses teal-green (#006F62) — a color
that references nature, copper patina, and old-world luxury. The gold (#C37A04 / #9A6E0B)
functions as the secondary accent, reinforcing associations with precious metals and warm
metallics that are physically present in Wynn property interiors. (T4_INFERRED, based on
color-material correlation analysis)

---

## 2. Color Principles

**Principle 1 — Wynn Teal (#006F62) is the brand signature and appears in navigation and
primary identifiers.**
This color anchors the brand's visual identity across digital and physical touchpoints. The teal
appears in the Wynn logo, website header, and primary navigation elements. It is not used for
decorative backgrounds or large surface fills — it signals brand ownership. (CSS extraction;
observed on wynnresorts.com)

**Principle 2 — Gold tones (#C37A04 / #9A6E0B) signal luxury and are used for premium content
markers.**
Gold accents appear in section headers, promotional content borders, and price/rate displays. The
dual gold system (bright gold for interactive/emphasis, deep gold for text/labels) creates
hierarchy within the accent system. (CSS extraction; observed on wynnresorts.com)

**Principle 3 — Pure white is avoided in favor of warm neutrals.**
The surface palette (#F6F3EF, #F7F7F7, #F0F0F0) skews warm rather than clinical. This warmth
aligns with the property's interior design — warm stone, cream fabrics, golden fixtures — and
avoids the sterile association of pure-white backgrounds commonly used by technology brands.
(CSS extraction; observed on wynnresorts.com)

**Principle 4 — Red (#D61C38) is used sparingly for emphasis, not as a primary brand element.**
The crimson appears in limited contexts: promotional callouts, limited-offer indicators, and
alert states. It is not a core brand color and appears at low frequency relative to teal and
gold. (CSS extraction)

**Principle 5 — Dark mode uses near-black (#1B1C1E / #101010), not pure black.**
Consistent with luxury digital design conventions, the darkest tones are slightly warm or
neutral, avoiding the harsh contrast of pure #000000 against light text. (CSS extraction)

---

## 3. Typography

Wynn employs a combination of classic serif and modern sans-serif typefaces. The CSS extraction
reveals the following font stack hierarchy.

### Typeface System (CSS Extraction)

| Typeface | Category | Contexts |
|---|---|---|
| **Big Caslon** | Serif (display) | Hero headlines, section headers, luxury marketing copy. Big Caslon is a classic serif typeface with high contrast and elegant proportions, consistent with traditional luxury branding. (CSS extraction; observed on wynnresorts.com) |
| **AvenirLTStd35Light** | Sans-serif (light weight) | Body copy, captions, supporting text. The light weight creates an airy, refined reading experience. (CSS extraction) |
| **AvenirLTStd65Medium** | Sans-serif (medium weight) | Sub-headers, navigation labels, UI elements. Medium weight provides structure without heaviness. (CSS extraction) |
| **AvenirLTStd85Heavy** | Sans-serif (heavy weight) | Emphasis text, CTA buttons, promotional headlines. Heavy weight used sparingly for maximum impact. (CSS extraction) |
| **Avenir** | Sans-serif (system fallback) | General fallback when Avenir LT Standard variants are unavailable. (CSS extraction) |
| **Noto Sans** | Sans-serif (multilingual) | CJK text, multilingual content support for Macau-facing and international audience content. (CSS extraction) |
| **Roboto** | Sans-serif (system/web) | Additional fallback and mobile-optimized rendering. (CSS extraction) |

### Role-Based Typographic Scale (Estimated from Observation)

| Role | Typeface | Weight | Desktop Size | Mobile Size | Letter Spacing |
|---|---|---|---|---|---|
| **Hero Headline** | Big Caslon | Regular/Bold | 48–72px | 28–40px | 0.02em (estimated) |
| **Section Header (H1)** | Big Caslon | Regular | 32–48px | 24–32px | 0.01em (estimated) |
| **Sub-Header (H2)** | AvenirLTStd65Medium | Medium | 20–28px | 18–24px | 0.01em (estimated) |
| **Body Copy** | AvenirLTStd35Light | Light 300 | 16px | 14–16px | 0em (estimated) |
| **UI Label / Button** | AvenirLTStd65Medium | Medium | 14–16px | 13–15px | 0.05em (estimated) |
| **Caption / Legal** | AvenirLTStd35Light | Light 300 | 12–13px | 11–12px | 0em (estimated) |
| **Navigation** | AvenirLTStd65Medium | Medium | 13–14px | 12–13px | 0.05em (estimated) |

### Typographic Principles

1. **Serif for prestige, sans-serif for function.** Big Caslon carries the brand's emotional
   weight in headlines and marketing copy. Avenir handles utility — navigation, forms, body
   text. This dual-typeface system is a classic luxury branding convention. (observed on
   wynnresorts.com)
2. **Light weight as default body weight.** AvenirLTStd35Light (weight 300) is the default body
   text weight — lighter than typical web body copy (400). This communicates refinement and
   airiness consistent with the brand's aesthetic. (CSS extraction)
3. **Generous letter-spacing in uppercase contexts.** When text appears in uppercase (navigation
   labels, CTA buttons), increased letter-spacing is applied for readability and elegance.
   (estimated from visual observation)
4. **No condensed or compressed typeface variants.** Space is treated as a luxury commodity;
   condensing text to fit more content contradicts the brand's spatial generosity. (T4_INFERRED)

---

## 4. Channel Specifications

Pixel dimensions are based on observed Wynn creative assets, social channel inspection, and
platform publishing specifications. Values noted as `(estimated)` represent project inference.

| Channel | Asset Type | Dimensions (W x H) | Key Notes |
|---|---|---|---|
| **wynnresorts.com — Hero (Desktop)** | Full-bleed JPEG/WebP | 1920 x 1080 px (estimated) | Property photography at warm color temperature; no text overlay in hero images or minimal text overlay in Big Caslon (observed on wynnresorts.com) |
| **wynnresorts.com — Hero (Mobile)** | Full-bleed JPEG | 750 x 1334 px (estimated) | Mobile-optimized crop of desktop hero; subject centered (estimated) |
| **wynnresorts.com — Room/Suite Card** | JPEG | 640 x 480 px (estimated) | Interior photography with warm lighting; bed/window composition standard (observed on wynnresorts.com) |
| **Instagram — Feed Square** | JPEG | 1080 x 1080 px | Property and dining photography; minimal or no text overlay (observed on @wynnlasvegas) |
| **Instagram — Feed Portrait (4:5)** | JPEG | 1080 x 1350 px | Preferred for property exterior and pool photography; fills more feed space (observed on @wynnlasvegas) |
| **Instagram — Stories/Reels** | MP4/JPEG | 1080 x 1920 px | 9:16 vertical; behind-the-scenes, seasonal installation reveals, guest experience (observed on @wynnlasvegas) |
| **YouTube — Thumbnail** | JPEG | 1280 x 720 px | Property photography or cinematic still from video content (estimated) |
| **Email — Header Banner** | JPEG | 600 x 300 px (estimated) | Property exterior or dining imagery; Wynn logo centered or upper-left; warm color palette (estimated) |
| **Print / OOH — Billboard** | TIFF/EPS | Variable (3:1 or 16:9) | Property photography with minimal text; Big Caslon headline only; logo lower-right (estimated) |

---

## 5. Layout Principles

**Principle 1 — Full-bleed photography dominates.**
Wynn's website uses full-width, full-bleed property photography as the primary compositional
element. Text overlays are minimal — often just a headline and a CTA button. The photography
carries the narrative; the copy provides direction. (observed on wynnresorts.com)

**Principle 2 — Warm white space, not cold white space.**
Background surfaces use warm neutrals (#F6F3EF, #F7F7F7) rather than pure white (#FFFFFF). This
warmth is consistent across the website and creates a visual environment that feels like the
interior of the property itself. (CSS extraction; observed on wynnresorts.com)

**Principle 3 — Horizontal scroll for gallery-style content.**
Room types, dining options, and entertainment offerings are presented in horizontal scroll
carousels rather than vertical stacks. This gallery presentation is consistent with art
exhibition conventions and reinforces the brand's curatorial positioning. (observed on
wynnresorts.com)

**Principle 4 — Card-based information architecture for bookable items.**
Rooms, restaurants, and experiences are presented as visual cards with photography, a brief
description, and a CTA. Each card is self-contained and visually equivalent, creating a
sense of curated selection rather than hierarchical listing. (observed on wynnresorts.com)

**Principle 5 — Minimal animation; when used, it is fade-based rather than motion-based.**
Scroll-triggered animations on wynnresorts.com favor fade-in reveals over slide, bounce, or
parallax effects. The animation style is restrained and serves to pace the content consumption
rather than create visual excitement. (observed on wynnresorts.com)

---

## 6. Icon & Illustration Style

### Icon System

Wynn's website uses a minimalist icon system for utility purposes — navigation, amenity
indicators, social media links, and UI controls. Icons are thin-line, monochrome, and
subordinate to photography. (observed on wynnresorts.com)

Key observed characteristics:
- **Thin-line, single-weight stroke**: Icons match the light weight of the Avenir body text
  system. Heavy or filled icons are not observed. (observed on wynnresorts.com)
- **Monochrome rendering**: Icons appear in the charcoal (#3C3C3C) or grey (#9CA3AF) palette.
  Colored icons are not observed outside of social media brand icons. (observed on wynnresorts.com)
- **No illustration or character art**: Wynn does not use illustrated graphics, mascots, or
  character-based visual elements in any observed context. Photography is the exclusive
  visual medium. (observed on wynnresorts.com)

### Photography Style

Photography is Wynn's primary visual medium, not illustration. Observed photographic standards:

- **Warm color temperature**: All property photography skews warm (approximately 3500–4500K
  equivalent), consistent with the golden interior lighting of the properties. (observed on
  wynnresorts.com)
- **Shallow depth of field in detail shots**: Food, floral, and amenity photography uses
  shallow DOF (approximately f/1.8–f/2.8 equivalent) for bokeh effect. (observed on
  wynnresorts.com)
- **No visible guests in property marketing photography**: Common areas and suites are
  photographed empty or with minimal, carefully styled human presence. The space is the
  subject. (observed on wynnresorts.com)
- **Golden hour exterior photography**: Property exterior shots favor late-afternoon or early-
  evening light for warm, flattering facade illumination. (observed on wynnresorts.com)

---

## 7. AI Image Generation Prompt Guide

The following structured prompts are designed to produce visual outputs consistent with
Wynn's publicly observed aesthetic. These are creative reference tools for this project;
they are not Wynn-endorsed prompts and do not reproduce copyrighted Wynn assets.

### Property Exterior (Cinematic)
```
Cinematic wide-angle photography of a curved luxury resort facade at golden hour, warm bronze
and copper-toned glass reflecting sunset light, manicured landscaping with tropical plants in
foreground, ornamental lake with still water reflection, no visible guests, warm color
temperature 4000K, shot on medium format equivalent, 8K resolution, luxury hospitality
aesthetic matching Wynn Las Vegas architectural style
```

### Interior Lobby (Atmospheric)
```
Interior photography of a grand hotel lobby with dramatic floral installation centerpiece,
high-ceiling atrium with natural light streaming through skylights, polished marble floors
reflecting warm overhead lighting, gold and bronze fixture accents, no visible people, warm
color temperature 3800K, editorial quality, shallow depth of field on floral details,
luxury hospitality aesthetic
```

### Fine Dining Plating (Editorial)
```
Overhead editorial food photography, single plated fine dining dish on white porcelain,
garnished with micro-herbs and edible flowers, dramatic rim lighting from upper-left,
dark slate or white marble surface background, shallow depth of field f/2.8, warm color
temperature 4200K, Michelin-quality plating presentation, no text overlays, no props
beyond plate and utensils
```

### Suite Interior (Guest Perspective)
```
Interior photography of a luxury hotel suite viewed from entry, floor-to-ceiling windows
revealing city skyline at twilight, warm ambient lighting from table lamps and recessed
fixtures, king bed with crisp white linens and decorative pillows, neutral cream and
gold color palette, no visible technology or TV screens, no people, editorial quality,
warm color temperature 3500K
```

---

## 8. Design Prohibitions

1. **No cool-white or blue-toned backgrounds.** Wynn's digital palette is warm. Cool white
   (#FFFFFF without warm tinting) or blue-toned backgrounds are inconsistent with the brand's
   material warmth. (CSS extraction; observed on wynnresorts.com)

2. **No neon or electric color accents.** Neon green, electric blue, hot pink, or similarly
   high-saturation synthetic colors are absent from Wynn's palette. All accent colors reference
   natural materials (teal = patina, gold = metal, green = foliage). (CSS extraction)

3. **No stock photography of people in obviously staged poses.** All human figures in Wynn
   marketing appear in naturalistic, unposed contexts. Forced corporate smiles and
   handshake poses are inconsistent with the brand's aesthetic. (observed on wynnresorts.com)

4. **No text-heavy graphics or infographic-style content.** Wynn's visual system is
   photography-dominant. Data visualizations, infographics, and text-heavy social media
   cards are not observed. (observed on wynnresorts.com and Wynn social media)

5. **No sans-serif typefaces in headline marketing contexts.** Big Caslon (serif) is the
   headline standard. Using Avenir or another sans-serif for marketing headlines would
   reduce the brand's traditional luxury signaling. (CSS extraction; observed on wynnresorts.com)

6. **No dark-on-dark or low-contrast text compositions.** Text on dark backgrounds uses
   white or light gold for maximum legibility. Low-contrast design treatments that sacrifice
   readability for aesthetic effect are not observed. (observed on wynnresorts.com)

7. **No gaming imagery (cards, dice, roulette wheels) in brand-level marketing.**
   Property-level marketing does not feature gaming iconography in hero positions. Gaming
   content exists in dedicated casino sections but does not dominate the brand's visual
   identity. (observed on wynnresorts.com)

8. **No competitor property imagery or comparative visual references.** Wynn's visual
   content features only Wynn properties. No competitive property appears in any observed
   marketing context. (observed on wynnresorts.com)

9. **No all-capitals body text.** Uppercase is reserved for navigation labels and short CTA
   text. Extended uppercase copy is not observed. (observed on wynnresorts.com)

10. **No gradients on text elements.** All text is rendered in solid colors from the brand
    palette. Gradient-fill text effects are not present. (observed on wynnresorts.com)

---

*Layer 5 of 8 — Brand Autopsy: Wynn Resorts, Limited (WYNN)*
*Analysis based on publicly accessible sources as of Q1 2025.*
*CSS data source: data/raw/WYNN/css_data.json*
*This is not Wynn Resorts' official Brand Identity Guidelines document.*
*Source tiers applied throughout: (official), (observed on wynnresorts.com), (CSS extraction), (estimated).*
