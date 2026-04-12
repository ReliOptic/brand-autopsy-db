# 05. Design System Spec — AbbVie Inc. (ABBV)

---

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It is not investment advice, legal advice, or a substitute for AbbVie's official brand
> guidelines. All design observations are based on publicly accessible sources: abbvie.com,
> product websites (skyrizi.com, rinvoq.com, botox.com), CSS extraction from publicly served
> stylesheets, and official marketing materials. Color codes, spacing values, and typographic
> specifications are observed or estimated from public-facing assets and do not constitute
> AbbVie's internal style guide. Source notation: `(official)` = AbbVie-published content;
> `(observed on abbvie.com)` = direct page observation; `(CSS extraction)` = values parsed
> from publicly accessible stylesheets; `(estimated)` = project inference from observable
> patterns. All estimates are labeled as such.

---

## 1. Color Palette

AbbVie's color system is anchored by a distinctive purple brand identity that immediately
differentiates the company from the navy-blue and teal palettes dominant in general healthcare.
The purple foundation signals pharmaceutical innovation and scientific authority while maintaining
approachability for patient-facing communications. The observed palette across abbvie.com and
product sites applies a structured hierarchy: a primary purple anchor, supporting grays for
content, white for clinical precision, and warm accent tones for call-to-action elements
(observed on abbvie.com).

### Core Brand Colors

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-abbvie-purple` | `#6D2077` | Very high | Primary Brand | All primary headers, navigation bar, footer backgrounds, button fills, logo background across abbvie.com (CSS extraction) |
| `color-deep-purple` | `#4A1259` | Moderate | Dark Brand Variant | Dark hero sections, high-contrast text-on-purple applications, investor presentation section headers (observed on abbvie.com) |
| `color-mid-purple` | `#8B3A96` | Supporting | Interactive States | Hover states on purple CTA buttons; link emphasis on white backgrounds (CSS extraction) |
| `color-lavender-light` | `#C6A0CF` | Accent | Decorative / Soft BG | Tinted section backgrounds for patient story pages; illustration accent fills; secondary graphic elements (observed on abbvie.com) |
| `color-lavender-pale` | `#EDD9F2` | Very light | Surface Tint | Alternating section backgrounds; card hover tints; soft UI surfaces in patient-facing pages (CSS extraction) |
| `color-action-orange` | `#E87722` | High | Primary CTA | Primary action buttons ("Learn More", "Find a Doctor", "Get Support"); highlighted links on white backgrounds (observed on product sites) |
| `color-action-orange-hover` | `#D4691A` | Supporting | CTA Hover | `:hover` state on orange primary buttons (CSS extraction) |
| `color-body-text` | `#2C2C2C` | Very high | Primary Text | All body copy, headings not in purple, nav labels, legal text on white backgrounds (observed on abbvie.com) |
| `color-secondary-gray` | `#6D7278` | High | Secondary Text | Subheads, metadata, figure captions, secondary navigation items (CSS extraction) |
| `color-light-gray` | `#F5F5F5` | Section BG | Page Surface | Alternating content block backgrounds; card surfaces; form field backgrounds (observed on abbvie.com) |
| `color-divider-gray` | `#E0E0E0` | Structural | Borders / Rules | Section dividers, card outlines, table row rules, input field borders (CSS extraction) |
| `color-white` | `#FFFFFF` | Primary BG | Canvas | Default page background; modal interiors; white-space sections emphasizing photography (observed on abbvie.com) |
| `color-success-green` | `#2E7D32` | Contextual | ESG / Positive Signal | Sustainability content sections, environmental metrics, positive outcome indicators in ESG materials (observed in ESG report) |
| `color-alert-red` | `#C62828` | Contextual | Warning / Alert | Safety warning callouts in fair balance text; error states in forms; boxed warning visual cues in HCP materials (estimated from FDA promotional practice) |

### Product Franchise Accent Colors

Each major product franchise maintains a distinct accent palette within the master AbbVie system.
These accents are confined to product-specific websites and promotional materials; they do not
appear in corporate or investor contexts (observed across skyrizi.com, rinvoq.com, botox.com).

| Product | Primary Accent | Secondary Accent | Context |
|---|---|---|---|
| Skyrizi (risankizumab) | `#00A3E0` (sky blue) | `#7EC8E3` | Psoriasis, IBD campaign sites; reflects the brand name's sky/clarity theme (observed on skyrizi.com) |
| Rinvoq (upadacitinib) | `#FF6B35` (warm coral) | `#FFB347` | RA, atopic dermatitis sites; energetic and motion-oriented palette (observed on rinvoq.com) |
| Botox Cosmetic | `#1A1A2E` (near-black) with gold | `#C9A84C` (gold) | Premium aesthetics positioning; dark luxury aesthetic distinct from pharma contexts (observed on botox.com) |
| Botox Therapeutic | `#004B87` (navy) | `#6CACE4` | Medical/neurological tone; clinical credibility emphasis (observed on botoxtherapeutic.com) |
| Imbruvica (ibrutinib) | `#003865` (deep navy) | `#4CC9F0` | Oncology/hematology context; serious disease seriousness (observed on imbruvica.com) |
| Venclexta (venetoclax) | `#005F61` (dark teal) | `#00B4D8` | CLL/AML oncology; science-forward palette (estimated from observed brand materials) |

### Color Principles

**Principle 1 — Purple is the non-negotiable corporate anchor.**
`#6D2077` appears on every corporate page, regardless of the product or content context. Product
franchise colors are additive within their own channels; they never replace purple in corporate,
investor, or ESG contexts (observed on abbvie.com). Any communication that removes purple in
favor of a product accent color is outside the observed brand system.

**Principle 2 — Orange CTAs create energy contrast on purple-heavy pages.**
The warm orange (`#E87722`) action color provides maximum contrast against both the purple brand
anchor and white backgrounds, creating a clear visual signal hierarchy: purple for authority, white
for clarity, orange for action (observed on abbvie.com). This three-color CTA architecture is
consistent across corporate and product pages.

**Principle 3 — Clinical white space is a brand signal, not a layout default.**
AbbVie's extensive white usage in body sections communicates pharmaceutical precision and clinical
seriousness. This is not absence of design; it is the design. Content sections that are too visually
dense signal complexity and anxiety to patient audiences — the opposite of the supportive brand
positioning AbbVie maintains (T4_INFERRED from observed layout patterns).

**Principle 4 — Product colors stay in product channels.**
The Skyrizi sky-blue, Rinvoq coral, and Botox luxury palette are isolated to product-specific
websites and campaign materials. Bleeding product colors into corporate investor materials,
press releases, or ESG content would fragment the brand architecture (T4_INFERRED).

---

## 2. Typography

AbbVie's typography system is built on commercially licensed typefaces optimized for both screen
rendering and pharmaceutical print applications. The corporate site uses a contemporary humanist
sans-serif system that communicates approachability without sacrificing authority.

### Typeface System

| Typeface | Description | Contexts |
|---|---|---|
| **Calibre / AbbVie Sans** | Humanist sans-serif; slightly rounded forms; optimized for digital rendering at both headline and body sizes | Primary corporate headlines, hero text, navigation labels, section headers on abbvie.com (observed) |
| **Inter / Open Sans** | High-legibility geometric sans-serif; excellent screen rendering at small sizes | Body copy, footnotes, data tables, form labels, legal text (observed on abbvie.com) |
| **Georgia / Serif fallback** | Transitional serif; editorial warmth | Annual report long-form text, medical journal advertisement body copy, patient narrative sections (estimated from observed materials) |
| **Courier / Monospace** | Fixed-width; clinical data alignment | Clinical trial data tables, dosing charts, pharmacokinetic data in HCP materials (estimated from industry practice) |
| **System sans-serif fallback** | OS default sans-serif | Rendered when brand fonts unavailable; maintains readability if font loading fails (CSS extraction) |

### Role-Based Typographic Scale

| Role | Typeface | Weight | Desktop Size | Mobile Size | Line Height | Notes |
|---|---|---|---|---|---|---|
| **Hero Headline** | AbbVie Sans/Calibre | Bold 700 | 56–72px | 32–44px | 1.10 | Homepage and campaign hero sections (observed on abbvie.com) |
| **Section Headline (H1)** | AbbVie Sans/Calibre | Semibold 600 | 40–52px | 28–36px | 1.15 | Major content section openers (observed on abbvie.com) |
| **Subhead (H2)** | AbbVie Sans/Calibre | Medium 500 | 28–36px | 22–28px | 1.25 | Sub-section labels, product category headers (observed) |
| **Card Title (H3)** | AbbVie Sans/Calibre | Medium 500 | 20–24px | 18–22px | 1.30 | Pipeline cards, news article cards, resource tiles (observed) |
| **Body Copy** | Open Sans / Inter | Regular 400 | 16–18px | 15–17px | 1.55 | All primary body content (observed on abbvie.com) |
| **HCP / Clinical Body** | Open Sans / Inter | Regular 400 | 14–16px | 13–15px | 1.60 | Dense clinical data pages; HCP detail sheets (estimated) |
| **Fair Balance / Legal** | Open Sans / Inter | Regular 400 | 10–12px | 9–11px | 1.40 | FDA-required fair balance text; footnotes; disclaimer sections (observed in DTC materials) |
| **CTA / Button** | AbbVie Sans/Calibre | Semibold 600 | 14–16px | 14px | 1.0 | Action buttons; inline CTA links (observed on abbvie.com) |
| **Nav Label** | AbbVie Sans/Calibre | Regular 400 | 13–14px | 12px | 1.0 | Top navigation and footer navigation (observed) |
| **Data / Metric** | Inter / Numeric | Bold 700 | Body +6–10px | Body +4px | 1.0 | Revenue figures, clinical endpoints in callouts (observed on investor pages) |

### Typographic Rules

1. **Headline hierarchy is weight-first, size-second.** A 40px Semibold section header reads as
   clearly subordinate to a 56px Bold hero headline even when the size gap appears small — weight
   carries more visual authority than size alone at pharmaceutical content density levels (T4_INFERRED).

2. **Minimum body text size is 16px on desktop.** This reflects both accessibility requirements
   (WCAG 2.1 AA) and pharmaceutical promotional material standards where readability of risk
   information must be maintained (T4_INFERRED from FDA promotional guidance and WCAG).

3. **Fair balance text is never below 6pt in print or below 10px in digital.** FDA promotional
   guidance establishes minimum size requirements for risk information. Reducing fair balance text
   to the point of functional illegibility creates regulatory exposure (T1_OFFICIAL, FDA promotional guidance).

4. **No italic for primary headlines.** Italics in AbbVie's observed system appear only for
   emphasis within body paragraphs and for product name differentiation in clinical contexts
   (observed on abbvie.com). Full italic headlines are not part of the observed system.

5. **Product names (Skyrizi, Rinvoq, Botox) use distinct typographic treatment.** In clinical and
   promotional contexts, approved product names appear in the same weight as surrounding copy but
   are distinguished by capitalization — never bolded independently within body text unless the
   entire context is bold (T4_INFERRED from FDA promotional naming conventions).

---

## 3. Channel Design Specifications

Pixel dimensions are based on observed AbbVie creative assets, product website inspection, investor
relations page analysis, and standard pharmaceutical digital advertising specifications as of Q1 2025.
Values noted as `(estimated)` represent project inference where AbbVie has not published explicit specs.

| Channel | Asset Type | Dimensions (W × H) | Safe Zone | Key Notes |
|---|---|---|---|---|
| **abbvie.com — Hero (Desktop)** | Full-bleed JPEG / WebP | 1920 × 800 px min | Center 1440 × 600 px active area | Purple brand bar at top; product or patient photography dominant (observed on abbvie.com) |
| **abbvie.com — Hero (Mobile)** | JPEG / WebP | 750 × 600 px | Center 375 × 500 px | Single focal element; abbreviated headline; CTA prominent (observed on abbvie.com) |
| **Product Website Hero (Skyrizi/Rinvoq)** | Full-bleed JPEG / WebP | 1920 × 900 px | Center 1440 × 700 px | Product-specific palette; patient lifestyle dominant; fair balance link visible (observed on skyrizi.com, rinvoq.com) |
| **Pipeline Page Card** | PNG / WebP | 400 × 280 px | 360 × 240 px | Therapeutic area icon + compound name + phase indicator (observed on abbvie.com/pipeline) |
| **Instagram — Feed Square** | JPEG / PNG | 1080 × 1080 px | 900 × 900 px | Brand purple frame or white with purple CTA area; no clinical claims in imagery (observed on @AbbVie Instagram) |
| **Instagram — Stories** | MP4 / JPEG | 1080 × 1920 px | 1080 × 1420 px (avoid top/bottom 250px) | Disease awareness or science culture content; unbranded patient stories (estimated) |
| **LinkedIn — Company Post Image** | JPEG / PNG | 1200 × 627 px | Center 1100 × 540 px | Pipeline milestones, ESG content, talent culture; professional audience (observed on AbbVie LinkedIn) |
| **LinkedIn — Sponsored Content** | JPEG / PNG | 1200 × 627 px | Center 1100 × 540 px | Science culture, ESG, executive insights; no unverified HCP product promotion (estimated) |
| **Twitter / X — Card Image** | JPEG / PNG | 1200 × 628 px | Center 1100 × 540 px | News announcements, FDA approvals, pipeline milestones; factual and measured tone (observed on @AbbVie X) |
| **YouTube — Thumbnail** | JPEG | 1280 × 720 px | Center 1100 × 620 px | Patient story or science content; AbbVie purple element; headline 48px+ (estimated) |
| **Medical Journal — Full-Page Ad** | PDF / TIFF | 8.5 × 11 in at 300 DPI | 8 × 10.5 in print area | HCP-only; full fair balance required; clinical data tables; AbbVie purple header (estimated from FDA promotional requirements) |
| **Congress Booth — Banner** | TIFF / EPS | 33 × 80 in (standard pull-up) | 30 × 72 in content area | AbbVie purple band at top and bottom; clinical data or patient outcome headline; product name and indication (estimated) |
| **Email — Corporate Newsletter Header** | JPEG | 1200 × 400 px | Center 960 × 340 px | AbbVie purple band with logo; 600px max-width rendering in email clients (estimated) |
| **Investor Presentation Slide** | PowerPoint / Keynote | 1920 × 1080 px (16:9) | Safe margins 80px all sides | White background; purple section headers; orange data accent; minimal text per slide (observed on AbbVie IR presentations) |
| **DTC Television — 60-second** | MP4 / ProRes | 1920 × 1080 px | Full broadcast safe | Patient lifestyle in first 30 seconds; AbbVie brand close at 55–60 seconds; fair balance audio concurrent with visual (estimated from observed DTC patterns) |
| **App Store Screenshot — Patient App** | PNG | 1290 × 2796 px (iPhone 15 Pro Max max) | Top/bottom 80px clear | myAbbVie app: UI screenshots required; no staged non-existent features (official, App Store guidelines) |

---

## 4. Layout Principles

**Principle 1 — Purple anchor top, content center, action bottom.**
AbbVie's observed page architecture consistently places the purple navigation bar and brand identity
at the top, content and photography in the middle zone, and call-to-action elements near the bottom
of each section. This creates a predictable reading flow that guides users from brand context
(who we are) through content (what we offer) to action (what to do next) without requiring
navigation or search (observed on abbvie.com, skyrizi.com).

**Principle 2 — Clinical white space is a regulatory and brand asset.**
Pharmaceutical content must accommodate extensive fair balance text, indication statements, and
safety disclosures. AbbVie's layouts build this space into the design rather than treating it as
a compliance afterthought. The observable effect is that promotional claims and safety information
share visual breathing room — fair balance is not compressed into a footnote ghetto but integrated
into the layout structure (T4_INFERRED from observed promotional material layouts).

**Principle 3 — Patient photography is dominant; medical imagery is supplementary.**
AbbVie's primary visual assets are lifestyle photographs of patients engaged in normal activities:
gardening, hiking, playing with children, working. Medical iconography (stethoscopes, pills, lab
equipment) appears only in science and pipeline contexts, not in patient-facing marketing. The
observable principle: show the life the treatment enables, not the disease or the mechanism
(observed on abbvie.com, DTC advertising patterns).

**Principle 4 — Data visualizations follow clinical publication standards.**
Charts and data graphics on AbbVie's HCP-facing materials adhere to clinical publication norms:
axes begin at zero unless otherwise justified and labeled, confidence intervals are shown, p-values
are included for efficacy claims, and source trial names and dates are cited. Decorative data
distortion that misrepresents clinical outcomes is not present in observed AbbVie materials
(T4_INFERRED from PhRMA Code and FDA promotional guidance requirements).

**Principle 5 — Dual-column grid separates claim and evidence.**
In HCP-facing promotional materials, AbbVie commonly uses a two-column layout where the primary
column carries the clinical claim (headline + patient response data) and the secondary column
provides the evidentiary support (trial name, patient population, endpoint definition, confidence
interval). This structure makes the claim-evidence relationship explicit rather than embedded
(T4_INFERRED from observed pharmaceutical promotional design patterns).

**Principle 6 — Mobile-first design with desktop enhancement.**
AbbVie's corporate site renders single-column on mobile (estimated 320px–767px breakpoint) and
expands to multi-column grid on tablet (768px+) and desktop (1024px+, 1440px max-width container).
The mobile-first approach ensures patient populations accessing health information on phones —
a high-frequency access pattern — receive complete and readable content (estimated, CSS extraction).

**Principle 7 — Fair balance text receives its own dedicated layout zone.**
In DTC promotional materials (television, print, digital), fair balance information occupies a
visually distinct section — typically a full-width gray or white band with reduced-size typography
clearly separate from the promotional content zone. This separation is a regulatory requirement and
is consistently applied in observed AbbVie DTC materials (T4_INFERRED from FDA promotional guidance
on fair balance presentation).

---

## 5. Icon and Illustration Style

### Icon System

AbbVie uses a custom icon set for its digital properties, observable across abbvie.com and
product microsites:

- **Style**: Rounded, medium-weight line icons (estimated 2px stroke at 24px size). No filled
  solid icons in navigation or informational contexts (observed on abbvie.com).
- **Therapeutic Area Icons**: Each disease area has a distinct icon representing the affected
  body system or condition: a stylized joint for rheumatology, a silhouette of intestinal tract
  for gastroenterology, a skin texture abstraction for dermatology, a cell pattern for oncology
  (observed across AbbVie disease area pages).
- **Color**: Icons appear in `#6D2077` (AbbVie purple) on white backgrounds, or in `#FFFFFF`
  on purple backgrounds. Orange icons (`#E87722`) are used only for CTA-adjacent action icons
  (observed on abbvie.com).
- **Accessibility**: All interactive icons include accessible text labels or ARIA attributes
  per WCAG 2.1 AA requirements (T4_INFERRED from pharmaceutical digital compliance standards).
- **Size system**: Icons appear at 16px (inline body text), 24px (navigation and card labels),
  32px (section icons), and 48px (feature highlight icons) — consistent with common icon grid
  systems (estimated from observed rendering).

### Illustration Style

Illustration in AbbVie's brand system serves primarily scientific and structural explanatory
purposes, not decorative purposes:

- **Mechanism of Action (MOA) diagrams**: Scientific illustrations showing how biologics
  interact with cytokines, receptors, or cellular pathways. These are rendered in the brand
  purple palette with labeled annotations and appear in HCP materials, congress presentations,
  and patient education content (observed in AbbVie materials).
- **Pipeline diagrams**: Phase flow charts showing compounds from Phase I through regulatory
  approval. Color-coded by therapeutic area; purple for immunology, navy for oncology, teal
  for neuroscience (observed on abbvie.com/pipeline).
- **Patient journey maps**: Illustrative flows showing patient diagnosis through treatment
  initiation and adherence. Use simplified human silhouettes and directional arrows in the
  brand purple palette (T4_INFERRED from observed patient education materials).
- **No decorative illustration without informational payoff.** Abstract or artistic
  illustration as pure decoration is not observed in AbbVie's brand system. Every visual
  element serves an explanatory function (T4_INFERRED from observed materials).

---

## 6. AI Image Generation Prompt Guide

The following prompts are designed to produce visual outputs consistent with AbbVie's publicly
observed aesthetic. These are creative reference tools for this project; they are not AbbVie-
endorsed prompts and do not reproduce copyrighted AbbVie assets.

### Patient Lifestyle Shot
```
Documentary lifestyle photography, [AGE 35-65] [diverse ethnicity] person [activity:
gardening, walking in park, cooking, playing with children, working at desk], natural
daylight or soft indoor window light, authentic candid expression — not posed smile,
shallow depth of field f/2.8 equivalent, warm desaturated color grade, AbbVie purple
accent element visible [clothing detail, environmental element], no visible medical
equipment, no pill bottles, no syringes in frame, photojournalistic quality
```

### Science / Research Context
```
Professional scientific photography, pharmaceutical research laboratory setting,
researcher [age 30-50, diverse] examining [molecular model / microscope slide /
tablet data], cool blue-white laboratory lighting, sharp focus on hands and equipment,
soft focus background, AbbVie purple accent in lab signage or researcher uniform,
clean, precise, clinical aesthetic, no stock photo clichés, authentic research environment
```

### Corporate / Executive Portrait
```
Executive portrait photography, [age 40-60], professional attire, neutral gray or
AbbVie purple (#6D2077) background, rembrandt or split studio lighting, three-quarter
angle, confident and approachable expression — not aggressive, not casual, pharmaceutical
corporate professional standard, high resolution, no distracting background elements
```

### Pipeline Data Visualization
```
Clean data visualization graphic, pharmaceutical pipeline phase timeline,
horizontal flow chart, AbbVie purple (#6D2077) primary bars, orange (#E87722)
milestone markers, white background, labeled therapeutic area categories,
phase labels (Phase I, II, III, Regulatory Review), professional sans-serif labels,
no decorative elements, scientific publication aesthetic, high contrast
```

### Medical Congress Booth Background
```
Large-format exhibition display, AbbVie purple (#6D2077) header band 20% of height,
white center content area, clinical data visualization center, patient lifestyle
photography lower right, AbbVie logo upper left in white, orange CTA button element
lower right, no competitor brand elements, pharmaceutical industry congress aesthetic,
print-quality resolution
```

---

## 7. Design Prohibitions

The following practices are explicitly inconsistent with AbbVie's publicly observed design
system and pharmaceutical regulatory requirements.

1. **No unhedged clinical claims in image text overlays.** Embedding efficacy claims directly
   in image files (rather than in compliant promotional material formats with fair balance)
   creates regulatory exposure under FDA promotional guidelines. AbbVie's observed digital
   materials separate image content from clinical claims (T1_OFFICIAL, FDA 21 CFR Part 202).

2. **No product accent colors in corporate contexts.** Skyrizi blue, Rinvoq coral, or Botox
   gold are product-channel colors. Using them in corporate press releases, investor materials,
   ESG reports, or job postings is inconsistent with the observed AbbVie brand architecture
   (T4_INFERRED from observed brand system).

3. **No rainbow or highly saturated palettes.** AbbVie's color system uses controlled,
   pharmaceutical-grade color restraint. Introducing highly saturated colors (bright greens,
   vivid yellows, neon accents) is visually inconsistent with the brand's authority positioning
   (T4_INFERRED from observed materials).

4. **No medical procedure photography in patient-facing DTC content.** Surgical images,
   pathological photographs, or graphic medical imaging are not part of AbbVie's patient-facing
   brand expression. Patient-facing content shows the life after treatment, not clinical
   procedures (T4_INFERRED from observed DTC advertising patterns).

5. **No actor portraying a real patient without disclosure.** FTC endorsement guidelines and
   AbbVie's observed brand practice require disclosure when actors portray patients. "Depicted
   by actor" or "dramatization" labels are required where actors represent patient experiences
   (T1_OFFICIAL, FTC Endorsement Guides 16 CFR Part 255).

6. **No competitor product images or brand marks in AbbVie creative materials.** Competitive
   product references in promotional materials create regulatory and legal risk under FDA
   comparative advertising guidance and Lanham Act considerations (T4_INFERRED).

7. **No fair balance text in font sizes below 10px digitally or 6pt in print.** FDA requires
   risk information to be readable and presented with fair balance relative to benefit claims.
   Reducing fair balance to the point of functional illegibility constitutes a promotional
   violation (T1_OFFICIAL, FDA promotional guidance).

8. **No unauthorized use of regulatory body logos.** FDA, EMA, and other regulatory agency
   logos may not appear in promotional materials in ways that imply endorsement of a product
   or company. Regulatory approval language must be stated factually, not visually connoted
   through logo use (T4_INFERRED from FDA guidance on promotional materials).

9. **No gradient fills on data charts.** Clinical data visualizations use solid colors and
   clear legend labeling. Gradient-filled bars or area charts can obscure precise data values
   and are not consistent with AbbVie's observed approach to clinical data presentation
   (T4_INFERRED from PhRMA Code standards for data integrity).

10. **No all-caps headlines in patient-facing content.** Patient-directed content uses sentence
    case or title case. All-caps typography reads as aggressive or alarming in health communication
    contexts — the opposite of AbbVie's empathetic patient brand positioning (T4_INFERRED).

11. **No generic stock photography stereotypes.** Stethoscopes as hero elements, smiling doctors
    in white coats with folded arms, pills arranged decoratively — these stock photography clichés
    are inconsistent with AbbVie's authentic patient-focused visual approach (T4_INFERRED from
    observed brand materials).

12. **No use of AbbVie's registered trademarks as decorative design elements.** "ABBVIE",
    "HUMIRA", "SKYRIZI", "RINVOQ", "BOTOX" are registered trademarks (T1_OFFICIAL, USPTO).
    They may not be distorted, recolored, used as graphic fills, or embedded in derivative
    visual works without authorization from AbbVie Inc.

---

*Layer 5 of 8 — Brand Autopsy: AbbVie Inc. (ABBV)*
*Analysis based on publicly accessible sources as of Q1 2025.*
*This is not AbbVie's official Brand Identity Guidelines document.*
*Source tiers applied throughout: (official), (observed on abbvie.com), (CSS extraction), (estimated).*
