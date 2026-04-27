# 05. Design System Spec — Apple Inc. (AAPL)

---

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It is not investment advice, legal advice, or a substitute for Apple's official brand
> guidelines. All design observations are based on publicly accessible sources: apple.com,
> Apple's Human Interface Guidelines (developer.apple.com/design), CSS extraction from
apple.com, and official marketing materials. Color codes, spacing values, and typographic
specifications are observed or estimated from public-facing assets and do not constitute
Apple's internal style guide. Source notation: `(official)` = Apple-published content;
`(observed on apple.com)` = direct page observation; `(CSS extraction)` = values parsed
from publicly accessible stylesheets; `(estimated)` = project inference from observable
patterns. All estimates are labeled as such.

---

## 1. Color Palette

Apple's color system is built on a near-monochrome foundation with a single high-chroma
action color. The observed palette on apple.com applies a deliberate reduction strategy:
the fewer the colors, the stronger the brand signal (observed on apple.com). As of Q1 2025,
approximately 20 colors were extracted from apple.com CSS (estimated); the 13 documented
below represent the core brand system.

### Core Brand Colors

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-apple-dark` | `#1d1d1f` | Very high | Primary Text | All primary headlines, body copy, navigation labels, footer text across apple.com (CSS extraction) |
| `color-near-black` | `#161617` | Moderate | Dark Surface Text | Text rendered on dark-background sections; default text on black hero panels (CSS extraction) |
| `color-action-blue` | `#0071e3` | High (6× observed) | Primary CTA | All interactive links, primary CTA buttons ("Buy", "Learn more") across apple.com (CSS extraction) |
| `color-action-blue-hover` | `#0077ed` | Supporting | CTA Hover State | `:hover` state applied to `#0071e3` buttons (CSS extraction) |
| `color-action-blue-active` | `#006edb` | Supporting | CTA Active/Pressed | `:active` state on primary CTA buttons (CSS extraction) |
| `color-action-blue-dark` | `#0066cc` | Supporting | CTA on Dark BG | CTA buttons placed over black or near-black section backgrounds (CSS extraction) |
| `color-accent-blue` | `#2997ff` | Accent | Link Emphasis on Dark | Hyperlinks and emphasis text on dark-mode or black background sections (CSS extraction) |
| `color-mid-grey` | `#6e6e73` | High (6× observed) | Secondary Text | Subheads, supporting descriptions, metadata labels (CSS extraction) |
| `color-caption-grey` | `#86868b` | Moderate (5× observed) | Caption / Legal | Footnotes, legal copy, availability text, disclaimer rows (CSS extraction) |
| `color-divider` | `#e8e8ed` | High (8× observed) | Border / Divider | Horizontal rules, card strokes, input field borders, inactive states (CSS extraction) |
| `color-surface-light` | `#f4f8fb` | Section background | Page Surface | Alternating section backgrounds on product pages (CSS extraction) |
| `color-card-surface` | `#fafafc` | Card / popup | Card Background | Modal backgrounds, floating card surfaces, popover panels (CSS extraction) |
| `color-charcoal` | `#333336` | Very high (13× observed) | Dark Mode Body | Dark mode body text and UI components; used extensively in dark-mode partials (CSS extraction) |

### Product Accent Colors (Official Product Pages)

Product finish colors appear exclusively within photography and product selectors. They
are not part of the UI chrome system and do not bleed into layout, typography, or
interactive elements (observed on apple.com).

| Color Name | HEX | Context |
|---|---|---|
| Product Blue | `#9fc6f4` | iPhone / iPad finish selector background |
| Product Purple | `#7424b5` | iPhone finish / Apple Watch band color indicator |
| Product Orange | `#ec893c` | iPhone finish / AirPods case color indicator |
| Product Pink | `#ea33c0` | iPhone finish color selector |
| Product Teal | `#485b5e` | iPhone / MacBook finish indicator |
| Product Brown | `#604630` | Apple Watch band color indicator |

---

## 2. Color Principles

**Principle 1 — Apple Blue (#0071e3) is reserved exclusively for interactive elements.**
This color appears only on links and buttons — never on decorative elements, illustration
fills, or background panels. The result is that any blue element on an apple.com page is
immediately understood as tappable or clickable, without requiring a hover state or label
(official, Apple Human Interface Guidelines; observed on apple.com). Applying `#0071e3`
to non-interactive contexts would degrade the signal clarity of the entire action system.

**Principle 2 — Pure black (#000000) is not used for body text; #1d1d1f is the maximum
contrast text color.**
This distinction reduces eye strain on white backgrounds while maintaining WCAG AA contrast
ratios. The practical difference is subtle at standard viewing distances but is maintained
with engineering precision across apple.com (official, observed on apple.com CSS analysis).

**Principle 3 — Dark mode is architecturally first-class, not a visual override.**
Apple's operating systems enforce dark mode at the OS level (official, Apple HIG). Apple.com
implements `@media (prefers-color-scheme: dark)` to invert surface tokens: `#f4f8fb` and
`#fafafc` resolve to near-black equivalents; `#1d1d1f` inverts to near-white. Critically,
the near-monochrome aesthetic is preserved in both modes — the brand identity does not shift
when the color scheme switches (CSS extraction).

**Principle 4 — Gradients are confined to product photography; UI chrome is flat.**
Subtle vignettes may appear in product image staging backgrounds (a very soft off-white to
mid-grey gradient under a hardware product). However, UI elements — buttons, cards, nav bars,
section backgrounds — are never rendered with gradient fills (observed on apple.com).

---

## 3. Typography

Apple employs proprietary typefaces created and owned by Apple Inc., not available for
external licensing (official, Apple Legal). All specifications below are derived from
publicly observable rendering on apple.com and Apple's published Human Interface Guidelines.

### Typeface System

| Typeface | Description | Contexts |
|---|---|---|
| **SF Pro Display** | Optical size ≥ 20pt; designed for large-format rendering; tight default tracking at headline sizes | Hero headlines, keynote titles, product page section headers, large-format OOH advertising (official, Apple HIG) |
| **SF Pro Text** | Optical size < 20pt; optimized for reading at body sizes; slightly wider letter shapes than Display | Body copy, captions, navigation labels, UI button labels, legal footnotes (official, Apple HIG) |
| **SF Mono** | Monospaced variant; consistent character width for code alignment | Developer documentation, code samples, terminal interfaces, API references (official, Apple HIG) |
| **New York** | Serif companion typeface; editorial warmth | Apple Books, Apple News+ longform articles, select editorial marketing (official, Apple HIG) |
| **SF Pro KR** | Korean-optimized variant of SF Pro; confirmed present in apple.com/kr CSS | Korean-locale body and headline text on apple.com/kr (CSS extraction, observed on apple.com/kr) |

### Role-Based Typographic Scale

| Role | Typeface | Weight | Desktop Size | Mobile Size | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| **Hero / Display Headline** | SF Pro Display | Bold 700 | 56–96px | 32–56px | 1.05 | −0.01em (estimated) |
| **Section Headline (H1)** | SF Pro Display | Semibold 600 | 40–56px | 28–40px | 1.10 | −0.005em (estimated) |
| **Section Subhead (H2)** | SF Pro Display | Regular 400 | 24–32px | 19–28px | 1.20 | 0em (estimated) |
| **Body Copy** | SF Pro Text | Regular 400 | 17px | 15–17px | 1.47 | 0em (observed on apple.com) |
| **UI Label / Button** | SF Pro Text | Medium 500 / Semibold 600 | 15–17px | 13–15px | 1.0 | 0em (observed on apple.com) |
| **Caption / Footnote** | SF Pro Text | Regular 400 | 12–13px | 11–12px | 1.38 | 0em (observed on apple.com) |
| **Price / Numeric Emphasis** | SF Pro Display Numeric | Bold 700 | Body +4–8px | Body +2–4px | 1.0 | 0em (estimated) |
| **Nav Label** | SF Pro Text | Regular 400 | 12px | 12px | 1.0 | 0em (CSS extraction) |

### CJK Fallback Stack

When SF Pro is unavailable in CJK rendering contexts, apple.com applies the following
font stack (CSS extraction; confirmed on apple.com, apple.co.jp, apple.com/kr):

**Simplified Chinese:**
```
font-family: "SF Pro Display", "PingFang SC", "Hiragino Sans GB",
             "Noto Sans CJK SC", "Microsoft YaHei", sans-serif;
```

**Japanese:**
```
font-family: "SF Pro Display", "Hiragino Kaku Gothic ProN",
             "Noto Sans CJK JP", "Yu Gothic", sans-serif;
```

**Korean:**
```
font-family: "SF Pro KR", "Apple SD Gothic Neo", "Noto Sans KR",
             "Malgun Gothic", sans-serif;
```

### Typographic Rules

1. **SF Pro is the only permissible display face in Apple-branded contexts.** Substituting
   with Helvetica Neue, Inter, or any third-party geometric sans-serif introduces optical
   weight and spacing inconsistencies immediately detectable against genuine Apple layouts.
2. **Headline hierarchy is weight-based, not size-only.** A 40px Semibold section header
   reads as clearly subordinate to a 56px Bold hero even at matching optical scale.
3. **Minimum body size is 17px on desktop.** This is enforced consistently across apple.com
   as an accessibility baseline (observed on apple.com).
4. **Bold weight is reserved for emphasis within a text block, not for all-over application.**
   Rendering an entire body paragraph in Bold is not consistent with the observed Apple
   typographic system (observed on apple.com).
5. **Dynamic Type must be respected in app contexts.** User-level text size preferences are
   system-level requirements on iOS and macOS (official, Apple HIG Accessibility).

---

## 4. Channel Specifications

Pixel dimensions are based on observed Apple creative assets, Apple Newsroom imagery, Apple
social channel inspection, and platform publishing specifications as of Q1 2025. Values noted
as `(estimated)` represent project inference where Apple has not published explicit specs.

| Channel | Asset Type | Dimensions (W × H) | Safe Zone | Key Notes |
|---|---|---|---|---|
| **apple.com — Hero (Desktop)** | Full-bleed JPEG / WebP | 2880 × 1620 px | Center 1440 × 900 px active content area | Retina 2× delivery via Apple CDN; max file ~400 KB (observed on apple.com) |
| **apple.com — Hero (Mobile)** | Full-bleed JPEG / WebP | 750 × 1334 px | Center 375 × 667 px active | @2× srcset; served via Apple CDN; mobile-first breakpoint (observed on apple.com) |
| **apple.com — Product Card** | PNG with transparency | 640 × 640 px | 560 × 560 px usable | Product on white; ambient reflection only; no added drop shadow (observed on apple.com) |
| **apple.com — Nav Bar Logo Area** | SVG / PNG | 48 × 48 px | 40 × 40 px | Apple logo in system black or white only (observed on apple.com) |
| **Instagram — Feed Square** | JPEG / PNG | 1080 × 1080 px | 900 × 900 px | No text overlay within 90px of edge (observed on @apple Instagram) |
| **Instagram — Feed Portrait (4:5)** | JPEG / PNG | 1080 × 1350 px | 960 × 1200 px | Preferred ratio for feed; fills more screen real estate (observed on @apple Instagram) |
| **Instagram — Stories / Reels** | MP4 / JPEG | 1080 × 1920 px | 1080 × 1420 px (avoid top/bottom 250px for UI overlay) | 9:16 ratio; "Shot on iPhone" credit lower-right in white SF Pro style (official campaign pattern) |
| **YouTube — Thumbnail** | JPEG | 1280 × 720 px | Center 1100 × 620 px | 16:9; headline text ≥ 72px weight 700 equivalent; near-black or white background (observed on Apple YouTube) |
| **YouTube — Channel Art** | JPEG | 2560 × 1440 px | Safe across all devices: 1546 × 423 px center | Logo centered in safe zone; no product photography bleeding into unsafe zones (observed on Apple YouTube) |
| **YouTube — Pre-roll (16:9)** | MP4 | 1920 × 1080 px min | Full frame | Brand signal in first 2 seconds; no spoken CTA until after 5-second skip point (estimated) |
| **Twitter / X — Card Image** | JPEG / PNG | 1200 × 628 px | Center 1100 × 540 px | Minimal text; product on neutral background; no hashtag clutter (observed on @Apple Twitter/X) |
| **LinkedIn — Sponsored Content** | JPEG / PNG | 1200 × 627 px | Center 1100 × 540 px | Corporate / developer audience; slightly higher copy density permissible (observed on Apple LinkedIn) |
| **Apple TV+ — Key Art (Landscape)** | JPEG | 3840 × 2160 px | Per-title specification | 4K delivery; Apple wordmark must not overlap with title logo (observed on Apple TV+) |
| **Apple Newsroom — Header Image** | JPEG | 2048 × 1024 px | Center 1800 × 900 px | Factual product or event photography; no marketing headlines embedded (observed on newsroom.apple.com) |
| **Email Newsletter — Header Banner** | JPEG | 1200 × 400 px | Center 960 × 340 px | Max 600px container width in email clients; text must not be image-only for accessibility (estimated) |
| **OOH / Digital Billboard** | TIFF / EPS vector | 3:1 or 16:9 (variable) | Headline only; no body copy | Minimum 72pt SF Pro Display equivalent at final output resolution (estimated) |
| **Keynote Slide (Presentation)** | Keynote / PNG export | 3840 × 2160 px (4K) | Safe margins 200px all sides | Single image + single message per slide; text minimized to ≤ 7 words per headline (observed on Apple keynote videos, official) |
| **App Store Screenshot — iPhone** | PNG | 1290 × 2796 px (max, iPhone 15 Pro Max) | Content: top/bottom 80px clear | Real UI screenshots required; text overlays permitted; no staged non-existent UI (official, App Store guidelines) |

---

## 5. Layout Principles

**Principle 1 — Whitespace is the primary design element, not a side effect.**
Apple's product page layouts consistently allocate an estimated 40–60% of vertical scroll
height to negative space (estimated, based on apple.com DOM analysis). This is not unused
capacity; it is the mechanism that delivers each content block with undivided visual
attention before the next block enters the viewport. Reducing padding to fit more content
is the single most common error in Apple-adjacent design work.

**Principle 2 — One idea per viewport (the 100vh rule).**
Each full-viewport section on apple.com product pages communicates exactly one product
benefit or feature. The structure is consistently: one headline (≤ 7 words), one supporting
sentence, one visual element, one optional CTA. Stacking two messages in a single viewport
section is not observed in primary product pages (observed on apple.com). This constraint
forces creative prioritization — the team must decide what matters most, not present
everything simultaneously.

**Principle 3 — Product photography sets the composition; the grid conforms to the object.**
Rather than placing products into a predefined column-based grid, apple.com product pages
use the physical silhouette and proportions of the hardware as the compositional anchor. The
grid adapts to the product, not the reverse. This requires bespoke art direction per product
SKU rather than template-fill execution (observed on apple.com).

**Principle 4 — Animation serves information revelation, not decoration.**
Scroll-triggered animations on apple.com (implemented via `IntersectionObserver` + CSS
`transform` transitions) reveal product details that would require deliberate user interaction
to discover: rotating a device to show its profile depth, zooming into a chip die photograph,
separating material layers to show engineering construction. Every animation on apple.com
corresponds to a product claim being demonstrated (observed on apple.com, JavaScript
inspection). Animations without informational payloads are not used.

**Principle 5 — Asymmetry is introduced selectively, for editorial emphasis only.**
The default compositional mode is centered symmetry. Asymmetric layouts (image left / text
right; full-bleed photography with text overlay) are deployed selectively to signal that a
section carries higher emotional or narrative weight — typically brand philosophy segments,
environmental commitment storytelling, or privacy messaging (observed on apple.com).

**Principle 6 — Responsive design expands from single-column; it does not collapse from
multi-column.**
Apple's observed responsive breakpoints include: 320px (iPhone SE), 375px, 390px (iPhone 16),
428px (Plus / Max), 768px (iPad), 1024px (iPad Pro), 1280px, 1440px, and 2560px (estimated,
CSS extraction). Sections are designed mobile-first as single-column units and expanded for
wider viewports. This prevents the reflow inconsistencies common in desktop-first grids
collapsing to mobile.

**Principle 7 — Typography functions as layout on text-only sections.**
When a section contains no photography or illustration, typographic scale contrast alone
creates visual hierarchy. A 96px Bold headline ("iPhone 16 Pro") paired with a 28px Regular
subhead ("Hello, Apple Intelligence.") forms a compositionally complete section without
additional visual elements (observed on apple.com). Size ratio of approximately 3:1 to 4:1
between display and body creates sufficient vertical tension.

---

## 6. Icon & Illustration Style

### Icon System: SF Symbols

SF Symbols is Apple's proprietary icon library of over 5,000 glyphs engineered to integrate
with SF Pro at matching optical weight and metrics (official, Apple SF Symbols documentation,
developer.apple.com/sf-symbols).

Key observed characteristics:
- **Variable weight axes:** Icons share weight axes with SF Pro (Ultralight through Black),
  enabling icon and adjacent text to be optically matched at any size (official).
- **Optical size variants:** Icons are redrawn at small (< 20px), medium, and large optical
  sizes — not simply scaled. This prevents stroke-weight distortion at display sizes (official,
  Apple HIG).
- **Stroke-based rendering in marketing contexts:** Most SF Symbol usage in apple.com marketing
  is thin-stroke outline on transparent or white backgrounds, consistent with the brand's
  restraint preference over visual density (observed on apple.com).
- **Multicolor and hierarchical color variants available:** SF Symbols supports palette
  color, hierarchical color, and multicolor rendering modes — but Apple's marketing contexts
  primarily use monochrome (official, SF Symbols documentation).

Third-party icon libraries (Font Awesome, Heroicons, Phosphor, Lucide) are incompatible
with the Apple brand aesthetic due to optical weight mismatches, differing stroke termination
styles, and inconsistent grid alignment with SF Pro text (estimated).

### Illustration Style

Apple rarely uses illustrated graphics as primary marketing elements on apple.com or in
campaigns. When illustration does appear, the following patterns are consistently observed:

- **Flat vector with limited palette:** 2–4 colors maximum, drawn from the core brand palette.
  No shading, no drop shadows, no textured fills (observed on Apple Education and Apple
  Fitness+ marketing assets).
- **No gradient fills on icon or illustration shapes:** Gradients are reserved for product
  photography staging and video frame backgrounds (observed on apple.com).
- **Human figures are abstract, silhouetted, or represented by hands only.** Realistic
  illustrated facial features are not observed in Apple's privacy campaign or general
  marketing illustration work — a choice that may reflect the brand's privacy positioning
  (observed on Apple Privacy campaign assets; note: this analysis does not assert intent).
- **Data visualizations** (as seen in Health app marketing, Apple Intelligence explanations)
  use iOS chart aesthetics: rounded bar graphs, smooth line charts, `#0071e3` as primary
  data-series color, generous whitespace between data elements (observed on
  apple.com/apple-intelligence).

---

## 7. AI Image Generation Prompt Guide

The following structured prompts are designed to produce visual outputs consistent with
Apple's publicly observed aesthetic. These are creative reference tools for this project;
they are not Apple-endorsed prompts and do not reproduce copyrighted Apple assets.

### Hero Product Shot (Studio)
```
Studio product photography of [PRODUCT NAME], floating on pure white (#ffffff) background,
single directional soft key light from upper-left at 45 degrees, no harsh cast shadows,
subtle ambient fill from right, ultra-sharp focus across full product surface, no props,
no human hands, no text overlays, no reflective table surface, minimalist Apple aesthetic,
Hasselblad medium-format rendering quality, 8K resolution
```

### Lifestyle Human Shot (Authentic Use)
```
Candid documentary photography, [AGE RANGE] [ETHNICITY] person using [PRODUCT] while
[ACTIVITY: composing music, sketching, outdoor hiking, working in minimal studio],
natural window light or overcast daylight, shallow depth of field f/2.0 equivalent,
neutral color grade (slight desaturation -10, lifted shadows +5), authentic focused
expression — not a posed smile, no visible non-Apple brand logos, Shot on iPhone 16 Pro
aesthetic, film grain at ISO 400 level
```

### Material / Texture Close-up
```
Extreme macro photography of [MATERIAL: titanium, ceramic glass, brushed aluminum,
polished stainless steel], 1:1 aspect ratio, flat matte black (#000000) or flat white
(#ffffff) background, no artificial sheen or specular highlight, no lens flare,
industrial precision rendering, engineering aesthetic, ISO 64 equivalent noise floor,
Apple material design reference
```

### Social Story Format (9:16 Vertical)
```
Vertical 9:16 format, [PRODUCT] centered on pure black (#000000) background with
generous negative space above and below the product, single clean sans-serif headline
at top in weight-700 equivalent (simulate SF Pro Display Bold), headline text in white
(#ffffff), one word or phrase in Apple blue (#0071e3) for emphasis, no border, no frame,
no watermark, no background texture
```

### Environmental Campaign (Sustainability)
```
Wide-angle environmental landscape photography, [LOCATION: renewable energy facility,
reforested area, ocean coastline, urban green space], golden hour or blue hour lighting,
no people, Apple hardware product placed in foreground as small compositional element,
emphasis on scale of natural environment versus device, photojournalistic quality,
muted earth tones, no saturated color grading
```

---

## 8. Design Prohibitions

The following practices are explicitly inconsistent with Apple's publicly observed design
system. These prohibitions apply to Apple-adjacent and Apple-referencing creative work
produced under this project.

1. **No gradient fills on text elements.** Gradient-fill headlines (gold-to-silver,
   rainbow, iridescent) are not present anywhere in Apple's primary marketing typography.
   All text is rendered in solid `#1d1d1f`, `#000000`, `#ffffff`, `#0071e3`, or neutral
   greys. Text gradients are visually inconsistent with the brand system (observed on
   apple.com).

2. **No post-production drop shadows on hardware product imagery.** Apple product images
   are staged with ambient surface reflection only. Hard or soft drop shadows added in
   post-production are not present in apple.com product photography (observed on apple.com
   product pages).

3. **No third-party typefaces in Apple-branded or Apple-adjacent creative.** Substituting
   SF Pro with Helvetica Neue, Inter, Gill Sans, or any geometric sans-serif introduces
   letter-spacing, optical weight, and x-height inconsistencies that are detectable against
   genuine Apple layouts (estimated, based on optical comparison).

4. **No busy or textured backgrounds behind product hardware shots.** Photographic
   environments, geometric patterns, gradient color fields, or textured paper surfaces
   as product shot backgrounds are not observed in Apple's hero-level hardware photography.
   Products appear on white, near-black, or a single-tone soft gradient (observed on
   apple.com).

5. **No use of red (#ff3b30 or adjacent) outside product-finish and alert-state contexts.**
   System red is reserved for PRODUCT(RED) edition marketing and iOS UI error states. Using
   red as a decorative accent color in layouts, as an emphasis highlight, or in
   non-alert contexts is inconsistent with the observed Apple color system (CSS extraction).

6. **No all-capitals (ALL CAPS) in headlines.** Apple product headlines consistently use
   title case or sentence case. ALL CAPS is not observed in any primary Apple marketing
   typography, even for short emphasis phrases (observed on apple.com). This is a direct
   contrast with many competitor brands that use all-caps for premium signaling.

7. **No mixing of typographic weights within a single headline string.** A headline
   is rendered in a single weight. Mixing Bold and Regular within the same headline element
   (e.g., bolding only the product name while the descriptor remains regular) is not
   observed in Apple headline typography (observed on apple.com).

8. **No more than one chromatic accent color per viewport section.** Beyond the neutral
   base color (`#f4f8fb` or `#000000`) and primary text (`#1d1d1f` or `#ffffff`), a
   maximum of one accent color appears per section. Two competing accent colors in the
   same viewport is not consistent with the observed Apple layout system (observed on
   apple.com).

9. **No ambient looping animations without informational content.** Decorative motion —
   looping particle effects, floating object animations, parallax backgrounds with no
   product-information payoff — is not present on apple.com. Apple's animation timing
   observed is approximately `transition: 0.3s ease` for UI transitions and up to
   `0.5–0.8s` for scroll-reveal sequences (CSS extraction).

10. **No use of the Apple logo () as a decorative or composited design element.** The
    Apple logo is a registered trademark (official, USPTO). It may not be recolored,
    distorted, used as a bullet point, applied as a watermark in third-party creative,
    or embedded in derivative works without explicit written authorization from Apple Inc.
    (official, Apple Legal guidelines). This project cites the logo only in descriptive
    analysis contexts.

11. **No stock photography for human subjects.** All human figures in Apple advertising
    are real users, professional models cast through official channels, or hands-only shots.
    Stock photo expressions (forced smiles, generic corporate postures) are visually
    inconsistent with the observational, documentary aesthetic Apple uses for people in
    its marketing (observed on Apple campaigns).

12. **No CTA button with sharp rectangular corners.** Apple's HIG specifies corner radius
    of 10–12px for standard buttons on iOS and equivalent rounding in web contexts. Fully
    rectangular buttons are inconsistent with the Apple UI system (official, Apple HIG).

---

*Layer 5 of 8 — Brand Autopsy: Apple Inc. (AAPL)*
*Analysis based on publicly accessible sources as of Q1 2025.*
*This is not Apple's official Brand Identity Guidelines document.*
*Source tiers applied throughout: (official), (observed on apple.com), (CSS extraction), (estimated).*
