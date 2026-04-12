# 05. Design System Spec — Gartner, Inc. (IT)

---

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It is not investment advice, legal advice, or a substitute for Gartner's official brand
> guidelines. All design observations are based on publicly accessible sources: gartner.com,
> observed CSS and visual inspection, and official marketing materials. Gartner's website
> returned HTTP 403 for automated CSS extraction; color values marked `(estimated from visual
> observation)` are project inferences from direct gartner.com inspection. Source notation:
> `(official)` = Gartner-published content; `(observed on gartner.com)` = direct page
> observation; `(estimated)` = project inference from observable patterns.

---

## 1. Color Palette

Gartner's visual identity is built on a professional, enterprise-calibrated color system
anchored by a distinctive green that distinguishes the brand in a sector dominated by blue
palettes. Automated CSS extraction was blocked (HTTP 403); all values below are observed
from direct inspection of gartner.com as of Q1 2025 and are marked accordingly.

### Core Brand Colors

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-gartner-green` | `#007a5e` | Very high | Primary Brand / Logo | Gartner wordmark, primary navigation accents, key CTA hover states, section accent bars (estimated from visual observation) |
| `color-gartner-green-dark` | `#005c47` | High | Dark Brand Variant | Hover states on green elements, dark-mode green accents, footer accents (estimated) |
| `color-gartner-green-light` | `#e6f4f0` | Moderate | Light Brand Surface | Light tinted section backgrounds, callout box backgrounds, hover states on white surfaces (estimated) |
| `color-primary-text` | `#1a1a2e` | Very high | Primary Text | All headlines, body copy, navigation labels across gartner.com (estimated from visual observation) |
| `color-action-blue` | `#0052cc` | High | Primary CTA / Link | Interactive links, primary CTA buttons ("Read research," "Subscribe," "Contact us") (estimated from visual observation) |
| `color-text-secondary` | `#5e5e5e` | High | Secondary Text | Subheads, supporting descriptions, metadata labels, article bylines (estimated) |
| `color-caption-grey` | `#767676` | Moderate | Caption / Legal | Footnotes, disclaimer text, date stamps (estimated) |
| `color-divider` | `#e0e0e0` | High | Border / Divider | Horizontal rules, card strokes, section dividers, input field borders (estimated) |
| `color-surface-light` | `#f5f5f5` | High | Page Surface | Alternating section backgrounds, sidebar backgrounds, card surfaces (estimated) |
| `color-white` | `#ffffff` | Very high | Primary Background | Main page background, article containers, modal backgrounds (estimated) |
| `color-alert-orange` | `#e05c00` | Low | Alert / Accent | Event date badges, urgency indicators, expiring content markers (estimated) |
| `color-navy-dark` | `#0a0a3d` | Low | Deep Contrast | Dark hero section backgrounds, footer backgrounds (estimated) |

### Magic Quadrant Quadrant Colors (Research Context)

Gartner's Magic Quadrant uses a standardized color system for quadrant labeling. These colors
appear exclusively in research chart contexts and are not part of the UI chrome system.

| Quadrant | Approximate Color | Context |
|---|---|---|
| Leaders (upper-right) | Deep blue / navy | Highest execution + vision score zone |
| Challengers (upper-left) | Teal / blue-green | High execution, lower vision |
| Visionaries (lower-right) | Purple / violet | High vision, lower execution |
| Niche Players (lower-left) | Grey | Lower scores on both axes |

All Magic Quadrant color values above are `(estimated)` from public MQ sample images visible
on gartner.com and in vendor marketing materials.

---

## 2. Color Principles

**Principle 1 — Green is reserved for Gartner brand identity; blue is reserved for action.**
Gartner's primary brand color (green) appears on the logo, wordmark, and brand-specific
decorative elements — not on CTA buttons. Interactive elements use a distinct blue. This
separation ensures that green reads as "this is Gartner" and blue reads as "this is clickable,"
without ambiguity between brand and action signals (estimated from visual observation).

**Principle 2 — White is the dominant content surface; color is accent, not background.**
Gartner's content-heavy research portal is built on white backgrounds with color used only
for navigation bars, section headers, and specific accents. Inverting this to color-dominant
pages would reduce readability for long-form research content (observed on gartner.com).

**Principle 3 — Enterprise-calibrated neutrality; no consumer-bright accent colors.**
Gartner's palette avoids the high-saturation accent colors common in consumer technology
marketing. The green and navy tones signal institutional credibility rather than consumer
excitement — appropriate for the CxO audience evaluating six-figure subscription decisions
(T4_INFERRED from observed palette characteristics).

**Principle 4 — Color contrast meets WCAG AA for accessibility.**
Gartner's text colors against white and light surface backgrounds appear to meet WCAG AA
contrast ratios (4.5:1 for normal text). Enterprise software accessibility standards apply
to Gartner's research portal as a professional platform (estimated from visual inspection).

---

## 3. Typography

Gartner's digital properties use a clean sans-serif type system appropriate for long-form
research content and executive-level brand communications.

### Typeface System

| Typeface | Description | Contexts |
|---|---|---|
| **Graphik** | Humanist geometric sans-serif; clean, professional, slightly warmer than pure geometric sans | Primary brand typeface: headlines, navigation, CTA buttons, marketing content (estimated from visual observation — Graphik characteristics match observed letterforms on gartner.com) |
| **Georgia / Serif fallback** | Serif fallback for long-form article body in some research contexts | Long-form research article body text; editorial contexts where reading comfort at length is prioritized (estimated) |
| **System Sans (Arial, Helvetica)** | Standard system font stack | Email communications, documentation, fallback contexts (estimated) |

### Role-Based Typographic Scale

| Role | Typeface | Weight | Desktop Size | Mobile Size | Line Height |
|---|---|---|---|---|---|
| **Hero / Display Headline** | Graphik | Bold 700 | 48–64px | 32–48px | 1.10 (estimated) |
| **Section Headline (H1)** | Graphik | Semibold 600 | 32–40px | 24–32px | 1.15 (estimated) |
| **Section Subhead (H2)** | Graphik | Medium 500 | 22–28px | 18–24px | 1.25 (estimated) |
| **Body Copy** | Graphik / Georgia | Regular 400 | 16–18px | 15–16px | 1.55 (estimated) |
| **UI Label / Button** | Graphik | Medium 500 | 14–16px | 13–15px | 1.0 (estimated) |
| **Caption / Footnote** | Graphik | Regular 400 | 12–13px | 11–12px | 1.40 (estimated) |
| **Nav Label** | Graphik | Regular 400 | 13–14px | 13px | 1.0 (estimated) |

### Typographic Rules

1. **Brand headlines use sentence case, not title case or ALL CAPS.** Gartner's research
   content and marketing headlines observe sentence-case capitalization, consistent with
   editorial and research publishing conventions (observed on gartner.com).
2. **Minimum body size is 16px on desktop.** Long-form research content requires generous
   body sizing for readability across extended reading sessions (estimated).
3. **Research data callouts use numeric weight emphasis.** Key statistics within research
   content (e.g., "67% of CIOs say...") are visually emphasized through larger size or
   heavier weight to create scannable data hierarchy within articles (observed on gartner.com).
4. **Line height for body copy is generous (1.5–1.6).** Research articles are read in full,
   unlike landing page copy. Line height supports reading comfort at length (estimated).

---

## 4. Channel Specifications

| Channel | Asset Type | Dimensions (W × H) | Safe Zone | Key Notes |
|---|---|---|---|---|
| **gartner.com — Hero (Desktop)** | JPEG / WebP | 1920 × 700 px (estimated) | Center 1200 × 600 px active | Research-contextual imagery; no stock-photo feel; data visualization or event photography preferred (observed on gartner.com) |
| **gartner.com — Hero (Mobile)** | JPEG / WebP | 768 × 480 px (estimated) | Center 600 × 360 px | Responsive breakpoint; text overlay readability critical (estimated) |
| **Research Report Cover** | PDF / JPEG | 8.5 × 11 in / 816 × 1056 px | Margins: 0.75 in all sides | Magic Quadrant chart, report title, Gartner wordmark; clean corporate layout (estimated) |
| **Magic Quadrant Chart** | PNG / SVG | 900 × 900 px (estimated) | Full bleed; vendor labels within chart | Standardized 2×2 grid; vendor dots with name labels; axis labels (observed on public MQ samples) |
| **LinkedIn — Sponsored Content** | JPEG / PNG | 1200 × 627 px | Center 1100 × 540 px | Research highlight; key statistic callout; Gartner wordmark lower-right (estimated) |
| **Twitter/X — Card Image** | JPEG / PNG | 1200 × 628 px | Center 1100 × 540 px | Prediction callout; event promotion; analyst quote card (estimated) |
| **Email — Header Banner** | JPEG | 600 × 200 px | Center 520 × 160 px | Green accent bar; Gartner wordmark; event or report title (estimated) |
| **Conference Signage — Event Banner** | Print / JPEG | 2 × 6 ft vertical | Headline visible at 30 ft | Gartner IT Symposium branding; venue signage at CIO conference venues (observed) |
| **Webinar Slide Deck** | PowerPoint / Keynote | 1920 × 1080 px | 100px margin all sides | Research data visualization; analyst headshot; Gartner template (estimated) |
| **YouTube — Thumbnail** | JPEG | 1280 × 720 px | Center 1100 × 620 px | Analyst headshot or event visual; research topic title; Gartner green accent (estimated) |

---

## 5. Layout Principles

**Principle 1 — Content density is high; whitespace serves navigation, not decoration.**
Unlike consumer brand design systems where whitespace signals premium positioning, Gartner's
research portal serves an audience that wants information density. Section padding is generous
enough for readability but pages are not sparse. A CIO reading a Magic Quadrant analysis
wants dense, organized information — not a minimalist layout (observed on gartner.com).

**Principle 2 — Left-rail navigation supports research portal depth.**
Gartner's research portal uses persistent left-rail navigation that allows subscribers to
browse research categories while reading. This is a functional enterprise software layout
pattern, not a marketing page pattern. Navigation depth supports the ~2,000+ category
breadth of Gartner's research library (observed on gartner.com subscriber portal).

**Principle 3 — Data visualizations are primary content, not decorative.**
Magic Quadrant charts, Hype Cycle curves, market size bar charts, and survey result
infographics function as primary content delivery mechanisms in Gartner's research — not
as visual accessories to text. Each visualization communicates a complete, standalone
insight (observed on gartner.com and public research samples).

**Principle 4 — Event marketing pages follow a distinct visual register.**
Gartner conference pages (IT Symposium/Xpo, Data & Analytics Summit) use a higher-energy
visual style — speaker headshots, event photography, dark hero sections — compared to the
clean white of research content pages. The event brand maintains Gartner green as an anchor
while operating in a more visually dynamic mode (observed on gartner.com/conferences).

**Principle 5 — Print layout standards apply to PDF research.**
Full Magic Quadrant and Hype Cycle reports are delivered as PDF documents with print-quality
layout standards: clear section hierarchy, consistent margin widths, print-safe color values,
and page numbers. Many subscribers print or PDF-archive key research reports; the layout
must function on paper as well as on screen (estimated from observed PDF delivery format).

**Principle 6 — Mobile-first considerations apply to marketing content, not research portal.**
Gartner's primary research content is consumed on desktop by enterprise workers. Mobile
optimization is relevant for gartner.com marketing pages, press releases, and "Smarter with
Gartner" editorial content. The subscriber research portal prioritizes desktop experience
(estimated from audience behavior patterns, T4_INFERRED).

---

## 6. Icon & Illustration Style

### Icon Usage

Gartner's UI uses functional icons drawn from standard enterprise web icon libraries (estimated
from observation of gartner.com UI elements). No proprietary icon system equivalent to Apple
SF Symbols or Google Material Icons is observable. Icons appear as:
- Navigation and wayfinding (search, account, menu)
- Content type indicators (research note, webinar, conference)
- Data visualization labels

Icon style: Outline/stroke icons at approximately 20–24px; neutral grey (#767676 estimated);
no colored fills on navigational icons (observed on gartner.com).

### Illustration and Photography

Gartner's visual content uses two primary modes:

**Mode 1 — Research data visualization**: Bar charts, line graphs, quadrant matrices, and
Hype Cycle curves are the primary "illustration" form in Gartner's research content. These
follow a consistent visual system with Gartner branding on each chart (observed on public
research samples).

**Mode 2 — Event and speaker photography**: Gartner's conference marketing uses professional
photography of analyst speakers, keynote stages, and attendee networking moments. This
photography is warm, professional, and authentic — not stock-photo generic (observed on
gartner.com/conferences).

**What Gartner does not use prominently** (observed on gartner.com): abstract geometric
illustration, cartoon or mascot characters, consumer-style lifestyle photography.

---

## 7. AI Image Generation Prompt Guide

The following prompts produce visual outputs consistent with Gartner's publicly observed
aesthetic. These are creative reference tools; they are not Gartner-endorsed prompts.

### Research Report Cover
```
Corporate research report cover, clean white background, professional green accent bar
at top (approximately #007a5e), serif or clean sans-serif typography, report title in
dark navy text, "Gartner" wordmark placement lower-right, data chart thumbnail element
lower-left, enterprise publishing aesthetic, A4 portrait format, no stock photography,
no decorative illustration, PDF-quality rendering
```

### Conference Hero Image
```
Professional corporate conference photography, large auditorium with 3000+ seated
enterprise executives, keynote stage with LED backdrop showing green brand accent,
speaker silhouette at podium, warm stage lighting, sharp foreground audience bokeh,
enterprise IT summit aesthetic, no visible brand logos except implied stage backdrop,
photojournalistic quality
```

### Research Data Visualization (Magic Quadrant Style)
```
Clean 2x2 matrix chart on white background, four quadrant labels in grey ("Leaders",
"Challengers", "Visionaries", "Niche Players"), scattered labeled dots representing
vendors, x-axis labeled "Completeness of Vision", y-axis labeled "Ability to Execute",
professional data visualization style, enterprise research aesthetic, no decorative
elements, Gartner-style research chart
```

### LinkedIn Content Card
```
Professional social media card, 1200x627px, white background with green left accent bar,
large bold statistic ("67% of CIOs...") in dark navy, smaller supporting text below,
"Gartner Research" attribution lower-right in green, clean enterprise B2B aesthetic,
no photography, no decorative elements
```

---

## 8. Design Prohibitions

The following practices are inconsistent with Gartner's publicly observed design system.

1. **No consumer-lifestyle photography in research contexts.** Gartner's research content
   uses data visualizations and event photography — not stock images of smiling professionals
   at laptops. Stock-photo aesthetics undermine the research authority positioning (observed
   on gartner.com research content; stock-style images absent).

2. **No competitor names in visual content without proper research context.** Vendor names
   appearing in Gartner visuals should only appear in properly contextualized Magic Quadrant
   or research chart formats, not in comparative marketing graphics (T4_INFERRED from
   Gartner's research methodology standards).

3. **No green (#007a5e equivalent) on CTA buttons.** Brand green is reserved for identity
   elements; CTA buttons use blue to maintain the action-signal differentiation described
   in Color Principle 1 (estimated from visual observation).

4. **No ALL CAPS headlines.** Gartner's research and marketing headlines consistently use
   sentence case. All-caps formatting is inconsistent with the academic/research publishing
   register Gartner occupies (observed on gartner.com).

5. **No decorative gradients on research content backgrounds.** Content pages use flat white
   or light grey surfaces. Gradient backgrounds are a consumer-digital aesthetic inconsistent
   with the research publishing context (observed on gartner.com).

6. **No more than one data visualization per content slide or card.** Each visualization
   communicates one insight. Stacking multiple charts in a single LinkedIn card or slide
   overloads the communication unit and reduces clarity for the CxO audience (T4_INFERRED).

7. **No Gartner Magic Quadrant brand elements in third-party marketing without license.**
   The MQ "Leader" badge is a licensed brand asset. Use of MQ visual elements by vendors
   without proper licensing constitutes trademark infringement (T1_OFFICIAL, Gartner
   trademark policies; observed on official Gartner vendor licensing program).

8. **No prediction language in marketing creative without research backing.** Creative
   assets using "Gartner predicts..." must reference a specific published research note.
   Fabricating or paraphrasing Gartner predictions in creative without citation misrepresents
   Gartner's research output (T4_INFERRED from Gartner's stated research attribution policies).

---

*Layer 5 of 8 — Brand Autopsy: Gartner, Inc. (IT)*
*Analysis based on publicly accessible sources as of Q1 2025.*
*This is not Gartner's official Brand Identity Guidelines document.*
*Source tiers applied throughout: (official), (observed on gartner.com), (estimated).*
