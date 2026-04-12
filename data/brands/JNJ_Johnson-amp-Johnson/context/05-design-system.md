# 05. Design System Spec — Johnson & Johnson (JNJ)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It is not investment advice, legal advice, or a substitute for Johnson & Johnson's official
> brand guidelines. All design observations are based on publicly accessible sources: jnj.com,
> CSS extraction from jnj.com (publicly transmitted stylesheets), official marketing materials,
> and the css_data.json extracted dataset for JNJ. Color codes, font names, and typographic
> specifications are observed or estimated from public-facing assets and do not constitute J&J's
> internal brand standards document. Source notation: `(official)` = JNJ-published content;
> `(observed on jnj.com)` = direct page observation; `(CSS extraction)` = values parsed from
> publicly accessible stylesheets; `(estimated)` = project inference from observable patterns.

---

## 1. Color Palette

Johnson & Johnson's color system, as observed on jnj.com, is anchored by the brand's iconic
red — a deeply saturated crimson that carries 138 years of brand equity. The observed palette
applies a warm neutral foundation with the J&J red as the primary action and identity signal.
This stands in deliberate contrast to the clinical blues and cool greys common in pharmaceutical
competitors, positioning J&J as a human-warmth brand within a category that often defaults to
clinical detachment. (T4_INFERRED; colors observed via CSS extraction from jnj.com)

Approximately 20 colors were extracted from jnj.com CSS (estimated). The palette below
documents the core brand system derived from that extraction.

### Core Brand Colors

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-jnj-red-primary` | `#D91500` | Very high (10×) | Brand Red / Primary Identity | J&J logo color, primary CTA buttons, active navigation elements, brand-identified section accents (CSS extraction) |
| `color-jnj-red-alt` | `#EB1700` | High (7×) | Brand Red Variant | Hover states on primary CTAs; section accent bars; icon fill in brand-colored contexts (CSS extraction) |
| `color-jnj-red-dark` | `#CC1400` | Supporting | Dark Red Variant | Pressed/active state on red buttons; red elements on light warm backgrounds (CSS extraction) |
| `color-jnj-red-deeper` | `#AD1100` | Supporting | Deepest Red | High-contrast red contexts; accessibility-driven darkening of brand red on light surfaces (CSS extraction) |
| `color-warm-brown` | `#6E6259` | High (10×) | Secondary Text / Warm Neutral | Secondary body copy, supporting text, icon fills on neutral sections; gives warmth vs. cold grey (CSS extraction) |
| `color-warm-grey-mid` | `#A39992` | Moderate (8×) | Tertiary Text / Subtle UI | Captions, metadata labels, form placeholder text, divider accents (CSS extraction) |
| `color-silver-light` | `#BBBBBB` | Moderate (6×) | Border / Divider | Horizontal rules, card stroke lines, input field borders, inactive states (CSS extraction) |
| `color-warm-off-white` | `#F9F8F7` | Supporting (3×) | Page Surface / Section BG | Alternating warm-toned section backgrounds; primary page surface (CSS extraction) |
| `color-light-warm-1` | `#F1EFED` | Supporting | Subtle Section BG | Secondary alternating section background; card surfaces in warm contexts (CSS extraction) |
| `color-light-warm-2` | `#E8E6E3` | Supporting | Card / Panel Surface | Card backgrounds, modal surfaces, input backgrounds (CSS extraction) |
| `color-light-warm-3` | `#D5CFC9` | Supporting | Warm Divider | Dividers within warm-themed sections; slightly deeper than silver (CSS extraction) |
| `color-near-black-warm` | `#1A1817` | High | Primary Dark Text | Primary headlines and body text on light backgrounds; near-black with warm undertone (CSS extraction) |
| `color-dark-brown-warm` | `#312C2A` | Supporting | Dark Surface Text | Text on dark-section overrides; dark mode content areas (CSS extraction) |
| `color-link-blue` | `#1199FF` | Moderate (2×) | Link / Digital Action | Hyperlinks within body text; less prominent than CTA red; digital information links (CSS extraction) |
| `color-link-blue-dark` | `#0F68B2` | Supporting | Dark-Context Link | Links on dark or dark-warm background sections (CSS extraction) |
| `color-accessibility-blue` | `#B3D4FC` | Supporting (2×) | Focus Ring / Accessibility | Keyboard focus indicator; accessibility-required visible focus state (CSS extraction) |
| `color-sky-blue` | `#69D0FF` | Accent | Digital Accent / Data Viz | Data visualization accents; digital health content; pipeline/science content sections (CSS extraction) |
| `color-success-green` | `#53CE76` | Accent | Success / Positive State | Form success states, positive outcome indicators, sustainability-related content (CSS extraction) |

### Color Principles

**Principle 1 — J&J Red (#D91500) is the brand's primary identity signal and is not
decorative.**
The J&J red appears in the logo mark, the primary CTA button, and navigation active states.
It is not applied to illustration fills, background panels, or decorative elements at full
saturation. The red's high chroma ensures that any element rendered in #D91500 is immediately
associated with J&J action or identity. Diluting it across decorative contexts reduces its
signaling clarity. (CSS extraction; T4_INFERRED for principle)

**Principle 2 — Warm neutrals replace cold greys across the neutral system.**
Unlike the pharmaceutical industry convention of clinical steel-greys and cool blues, J&J's
neutral palette uses warm-undertoned browns and warm off-whites (#6E6259, #A39992, #F9F8F7).
This is a deliberate humanizing choice that distinguishes J&J's warmth signal from the clinical
detachment of competitor visual languages. (T4_INFERRED from comparative palette analysis;
CSS extraction for color values)

**Principle 3 — Blue is reserved for digital information and accessibility — not for brand
identity.**
The blues in the J&J palette (#1199FF, #0F68B2, #B3D4FC) serve digital-specific functions:
hyperlinks, focus rings, and pipeline or data visualization content. Blue does not function as
a brand color on jnj.com — the brand identity is entirely warm-spectrum. (CSS extraction)

**Principle 4 — The warm off-white (#F9F8F7) is the default page surface.**
Rather than pure white (#FFFFFF), J&J's primary surface is a warm, slightly tinted off-white
that reinforces the brand's warmth signal even at the background level. This is a subtle but
consistently applied signal across jnj.com page templates. (CSS extraction; observed on jnj.com)

---

## 2. Typography

Johnson & Johnson operates a proprietary typeface system built on custom fonts developed for
the brand. The CSS extraction from jnj.com confirms the presence of two proprietary typefaces
that do not appear on public font licensing platforms, supplemented by system fallback stacks
for accessibility and performance.

### Typeface System

| Typeface | Type | Description | Contexts |
|---|---|---|---|
| **Johnson Display** | Proprietary | Custom display typeface created for J&J brand; used for large-format headline rendering; optical characteristics observed suggest humanist serif or display sans characteristics | Hero headlines, large section headers, campaign display text, keynote/presentation titles (CSS extraction; confirmed font-family in jnj.com stylesheet) |
| **Johnson Text** | Proprietary | Custom text typeface optimized for body-size readability; companion to Johnson Display at smaller optical sizes | Body copy, navigation labels, UI button text, caption text, form labels (CSS extraction; confirmed in jnj.com stylesheet) |
| **Arial / Helvetica / Helvetica Neue** | System fallback | Standard system sans-serif fallback stack; engaged when proprietary fonts fail to load | Fallback body text; email contexts; non-brand digital environments (CSS extraction) |
| **Roboto / Roboto Mono** | System fallback | Android and cross-platform system font; included in fallback stack | Cross-platform fallback; technical documentation; developer-facing content (CSS extraction) |
| **Segoe UI / Segoe UI Emoji** | System fallback | Windows system font; included for Windows compatibility | Windows platform fallback rendering (CSS extraction) |

*Note: Johnson Display and Johnson Text are custom typefaces; specifications below are observed
and estimated from rendered output on jnj.com, not from internal brand guidelines.*

### Role-Based Typographic Scale

| Role | Typeface | Weight | Desktop Size | Mobile Size | Line Height | Notes |
|---|---|---|---|---|---|---|
| **Hero / Display Headline** | Johnson Display | Bold 700 | 56–80px | 32–48px | 1.05–1.10 | Campaign-level hero text; observed on jnj.com landing sections (estimated) |
| **Section Headline (H1)** | Johnson Display | Semibold 600 | 40–56px | 28–40px | 1.10–1.15 | Major section openers; observed on jnj.com (estimated) |
| **Section Subhead (H2)** | Johnson Display | Regular 400 | 28–36px | 22–28px | 1.20 | Supporting section headers; observed on jnj.com (estimated) |
| **Body Copy** | Johnson Text | Regular 400 | 16–18px | 15–17px | 1.50–1.60 | Standard article and page body text (estimated) |
| **UI Label / Button** | Johnson Text | Medium 500 / Semibold 600 | 14–16px | 13–15px | 1.0 | CTA button labels, navigation items (estimated) |
| **Caption / Legal Footnote** | Johnson Text | Regular 400 | 12–13px | 11–12px | 1.40 | Regulatory disclaimers, image captions, footnote text (estimated) |
| **Nav Label** | Johnson Text | Regular 400 | 13–14px | 13px | 1.0 | Global navigation items (estimated, observed on jnj.com) |

### CSS Variable Typography System

jnj.com employs CSS custom property (variable) references for its typographic stack, as
confirmed in the CSS extraction. The following variable names were observed:

```css
--font-1: [Johnson Display / Display stack]
--font-2: [Johnson Text / Text stack]
--font-description: [Body description contexts]
--font-list-titles: [List heading contexts]
--font-page-titles: [Page-level title rendering]
--font-promo-titles: [Promotional campaign headlines]
--font-quote: [Pull-quote and testimonial contexts]
```

*These variable names are extracted from publicly transmitted CSS and represent the naming
architecture of J&J's design token system, not internal documentation. (CSS extraction)*

### System Fallback Font Stack

For contexts where Johnson Display and Johnson Text are unavailable (email, external embeds,
accessibility tools), jnj.com applies the following observed fallback stack (CSS extraction):

```css
font-family: "Johnson Display", "Johnson Text", "Helvetica Neue", Helvetica, Arial,
             "Segoe UI", Roboto, "Droid Sans", Oxygen, Ubuntu, Cantarell,
             "Fira Sans", sans-serif;
```

---

## 3. Channel Specifications

| Channel | Asset Type | Dimensions (W × H) | Safe Zone | Key Notes |
|---|---|---|---|---|
| **jnj.com — Hero (Desktop)** | Full-bleed JPEG / WebP | 2560 × 1440 px (estimated) | Center 1440 × 800 px active | Warm-toned photography; patient/physician/surgeon subjects; no pure white backgrounds (observed on jnj.com) |
| **jnj.com — Hero (Mobile)** | JPEG / WebP | 750 × 1000 px (estimated) | Center 375 × 500 px active | Mobile-first delivery; image subject centered for portrait crop (estimated) |
| **jnj.com — Product / Drug Card** | PNG / JPEG | 640 × 480 px (estimated) | 560 × 400 px usable | Product photography on warm white (#F9F8F7) or clinical clean backgrounds (observed on jnj.com) |
| **LinkedIn — Feed Image** | JPEG / PNG | 1200 × 627 px | Center 1100 × 540 px | Corporate professional register; J&J red accent permitted in headline overlays (observed on JNJ LinkedIn) |
| **LinkedIn — Document / Carousel** | PDF / PNG slides | 1080 × 1080 px per slide | 900 × 900 px content area | Pipeline and ESG content; infographic format; Johnson Display headline style (estimated) |
| **Twitter / X — Card Image** | JPEG / PNG | 1200 × 628 px | Center 1100 × 540 px | News and earnings announcements; minimal text on image; J&J logo lower-right (estimated, observed) |
| **YouTube — Thumbnail** | JPEG | 1280 × 720 px | Center 1100 × 620 px | Patient story thumbnails use warm photography; MedTech thumbnails use surgical/clinical imagery (observed on JNJ YouTube) |
| **YouTube — Channel Art** | JPEG | 2560 × 1440 px | Safe across devices: 1546 × 423 px center | J&J red accent bar or logo in safe zone; warm background preferred (estimated) |
| **Email — Header Banner** | JPEG | 600 × 200 px | Center 520 × 160 px | Max 600px email container; J&J red header bar above image is a consistent pattern (observed in JNJ email communications) |
| **Email — Patient / HCP Newsletter** | JPEG / inline HTML | 600px container width | Full-width content at 600px | CarePath and HCP-directed emails; regulatory disclaimer block required in footer (T4_INFERRED) |
| **Medical Congress — Digital Display** | JPEG / MP4 loop | 1920 × 1080 px | Center 1600 × 900 px | Booth and symposium digital displays; clinical data visualization; J&J branding consistent with jnj.com standards (estimated) |
| **Annual Report — Digital (PDF)** | PDF vector | A4 / Letter (8.5 × 11 in) | 0.75 in margins | Johnson Display for chapter headers; warm neutral section dividers; patient photography as section openers (observed, JNJ Annual Report) |
| **Press Release — Newsroom Header** | JPEG | 1200 × 400 px (estimated) | Full width at 1200px | Clinical milestone imagery; FDA approval announcement photography (observed on investor.jnj.com) |
| **OOH / Awareness Campaign** | TIFF / EPS | Variable; 16:9 or 4:1 | Headline + J&J logo only at minimum | J&J red required; patient/caregiver photography; Our Credo territory (estimated) |

---

## 4. Layout Principles

**Principle 1 — Warm photography anchors every major layout section.**
Unlike pharmaceutical brands that default to isolated product shots or clinical stock imagery,
J&J's layout system consistently places photographs of real patients, caregivers, physicians,
and surgeons as the primary visual element in each major section. The photography carries the
human warmth signal that the Credo establishes in language. Layout grids are built around the
photographic subjects, not the reverse. (observed on jnj.com; T4_INFERRED for principle)

**Principle 2 — The J&J red functions as a structural accent, not a fill.**
On jnj.com, the brand red appears as a thin accent bar above hero sections, as the fill color
for primary CTA buttons, and as a text highlight for key phrases. It does not fill large
background panels or section areas. This restraint preserves the red's signaling power — every
instance of #D91500 on the page carries deliberate brand or action authority. (CSS extraction;
observed on jnj.com)

**Principle 3 — Content density increases with audience technical expertise.**
Pages designed for general corporate/patient audiences use a low-density, large-type, generous-
whitespace layout consistent with the brand's approachability. Pages designed for healthcare
professionals (prescribing information, clinical data sections, pipeline tables) apply higher
information density appropriate to clinical decision-making contexts. The layout adapts to
audience sophistication without breaking the typographic system. (observed on jnj.com; T4_INFERRED)

**Principle 4 — The Credo earns its own visual space.**
Our Credo content on jnj.com is presented in a distinct layout format — typically full-width,
minimal visual clutter, large-format Johnson Display type, and a warm background (#F9F8F7 or
#F1EFED). The Credo text is never crowded by adjacent content. This layout signals that the
document has constitutional authority within the brand — it is not treated as marketing copy.
(observed on jnj.com)

**Principle 5 — Mobile-first responsive scaling preserves warmth signal.**
At mobile breakpoints, jnj.com maintains the warm off-white surface, the J&J red accent bar,
and the Johnson typeface system. The responsive behavior does not default to generic system
fonts or cold background colors. Brand warmth is preserved across all viewport widths.
(observed on jnj.com mobile rendering; estimated for specific breakpoint values)

**Principle 6 — Clinical data sections break the warmth pattern for legibility.**
When presenting clinical trial data tables, pipeline status charts, or financial figures,
jnj.com shifts to a higher-contrast, more information-dense layout using cooler supporting
colors (the blue data visualization palette). This intentional pattern break signals to the
reader that the content register has shifted from brand storytelling to clinical evidence.
The shift is purposeful, not accidental. (observed on jnj.com; T4_INFERRED for principle)

---

## 5. Icon & Illustration Style

### Icon System

J&J's jnj.com employs a custom icon set consistent with the brand's warmth-first aesthetic.
Observable characteristics from jnj.com page inspection:

- **Stroke-based, rounded terminations**: Icons use consistent stroke weights with rounded
  line endings — no sharp corners. This maintains visual warmth consistent with the typeface
  system. (observed on jnj.com)
- **Monochrome in UI contexts**: Navigation icons, informational icons, and UI-state icons
  are rendered in single-color (typically #6E6259 warm brown or #1A1817 near-black). Brand-red
  icon use is reserved for CTA-adjacent contexts. (observed on jnj.com)
- **Warm color fills for category indicators**: Disease area icons, segment icons (Innovative
  Medicine, MedTech), and pipeline category indicators use the warm palette — red or warm
  brown fills — to maintain brand consistency within structured content areas. (observed on jnj.com)

### Illustration & Data Visualization Style

- **Pipeline visualization**: J&J's pipeline displays use a phase-by-phase horizontal layout
  with warm brand colors indicating phase status. Red (#D91500) indicates approved/launched;
  blue (#69D0FF) or neutral indicates earlier phases. (observed on jnj.com pipeline pages)
- **Financial data charts**: Bar charts and trend lines use J&J red as the primary data series
  color on JNJ investor presentations, with warm greys as secondary series. (observed on
  investor.jnj.com)
- **Patient journey diagrams**: Illustrated patient pathways use warm, low-contrast illustration
  style — no clinical imagery or harsh medical photography. Consistent with the brand's
  accessibility and warmth signal in patient-directed content. (observed on jnj.com)

---

## 6. AI Image Generation Prompt Guide

The following prompts are designed to produce visual outputs consistent with J&J's publicly
observed aesthetic. These are creative reference tools; they do not reproduce copyrighted J&J
assets and are not J&J-endorsed.

### Patient Warmth Photography
```
Documentary photography of [patient description: adult living with psoriasis / patient
receiving infusion / caregiver supporting family member], warm natural window light,
golden-hour color grade with lifted shadows +10 and slight warm shift +5, shallow depth
of field f/2.0 equivalent, authentic engaged expression — not posed, clothing in neutral
warm tones, no brand logos visible, medical setting or home setting, photojournalistic
quality, Johnson & Johnson brand warmth aesthetic
```

### Surgeon / Clinical Professional Shot
```
Clean editorial photography of [surgeon / nurse / physician] in [operating room / clinic /
consultation], professional medical environment with modern equipment, soft diffused
institutional lighting, focused engaged expression, warm white background element visible,
high detail on subject, no harsh shadows, medical professional confidence without
artificiality, corporate healthcare brand aesthetic
```

### MedTech Product Shot (Device)
```
Studio product photography of [medical device: orthopedic implant / surgical instrument /
electrophysiology catheter] on warm white (#F9F8F7) background, soft directional key light
from upper-left, secondary ambient fill, ultra-sharp focus on device mechanism, clinical
precision aesthetic, no props, no hands, no text overlay, engineering clarity
```

### Data / Pipeline Infographic Background
```
Clean flat design background for medical data visualization, warm off-white (#F9F8F7) base,
subtle warm grey (#D5CFC9) horizontal rule elements, accent bar in Johnson & Johnson red
(#D91500) along top edge, minimal geometric grid structure, no photography, no gradients,
suitable for overlaying clinical trial data tables or pipeline status charts
```

### Corporate / Purpose Campaign (Credo-Aligned)
```
Wide-angle environmental portrait, diverse group of [patients / healthcare workers /
researchers] in [hospital atrium / medical research facility / community health setting],
natural warm light, documentary authenticity, expressions of purposeful engagement rather
than staged joy, warm color grade, suitable for corporate brand campaign, no product
placement, human impact as primary subject
```

---

## 7. Design Prohibitions

1. **No use of pure cold blue (#0000FF or equivalent) as a primary design element.**
   J&J's identity is warm-spectrum. Cold blues belong to competitor pharmaceutical brands
   (notably Pfizer's Pfizer Blue). Using a dominant cold blue in J&J-branded or J&J-adjacent
   creative would introduce a visual register inconsistent with the observed brand system.
   (T4_INFERRED from observed palette analysis; CSS extraction)

2. **No gradient fills on the J&J red (#D91500).**
   The brand red appears as a solid fill — never as a gradient from red to orange, red to
   dark, or red to another color. Gradient application dilutes the precise chromatic identity
   of the J&J red and is not observed in any jnj.com context. (observed on jnj.com)

3. **No clinical stock photography clichés.** Generic stock photography featuring overly
   posed physicians, staged patient handshakes, or syringe-and-stethoscope compositions is
   inconsistent with J&J's authentic, documentary-leaning photography approach. (T4_INFERRED
   from observed photography style on jnj.com)

4. **No J&J logo recoloring.** The Johnson & Johnson logo — rendered in the brand red script —
   may not be recolored to black, white (except in monochrome brand contexts where official
   mono variants are authorized), or any other color. (T4_INFERRED from standard trademark
   usage guidelines; logo color is a trademark element)

5. **No mixing of Johnson Display / Johnson Text with competing display typefaces in the same
   layout.** Introducing a second display typeface (e.g., a geometric sans-serif, a script, or
   a condensed face) into a layout that uses Johnson Display creates optical inconsistency.
   The proprietary typeface system is self-contained. (T4_INFERRED from typographic system
   analysis)

6. **No ALL CAPS in patient-directed content.** All-caps typography carries an authoritarian
   visual register inconsistent with J&J's warmth and accessibility signals in patient
   communications. Title case is the observed standard for J&J patient-facing content.
   (observed on jnj.com patient sections)

7. **No sharp rectangular CTA buttons.** J&J's interactive elements on jnj.com use rounded
   corners consistent with a warm, approachable UI aesthetic. Fully rectangular buttons signal
   coldness inconsistent with the brand's human warmth positioning. (observed on jnj.com)

8. **No use of the Our Credo text as decorative typographic treatment.** The Credo text may
   be displayed in large-format display type for emphasis, but it must not be treated as a
   decorative background pattern, a watermark, or a typographic wallpaper effect. The Credo
   carries constitutional authority; decorative use would trivialize it. (T4_INFERRED)

9. **No data visualization using competitor brand colors.** Clinical comparison charts that
   include competitor drugs must use neutral colors (greys, the warm neutral palette) for
   competitor data series — not the competitor's brand color. Applying a competitor's brand
   color in our charts would constitute an unauthorized reproduction of their brand identity.
   (T4_INFERRED from trademark and fair use considerations)

10. **No photography featuring unattributed patient identities without release context.** Any
    creative work depicting identifiable individuals in patient contexts must reference an
    appropriate content release framework. This project's analytical content uses descriptive
    references only — no reproduction of photographs depicting real identified patients.
    (T4_INFERRED from applicable privacy and image rights considerations)

---

*Layer 5 of 8 — Brand Autopsy: Johnson & Johnson (JNJ)*
*Analysis based on publicly accessible sources as of Q1 2025.*
*CIK: 0000200406 | Headquarters: New Brunswick, NJ | CEO: Joaquin Duato (since Jan 2022)*
*CSS data source: data/raw/JNJ/css_data.json (project extraction from jnj.com)*
*Source tiers: T1_OFFICIAL | T2_PRIMARY_RELIABLE | T3_SECONDARY_RELIABLE | T4_INFERRED | (CSS extraction) | (estimated)*
