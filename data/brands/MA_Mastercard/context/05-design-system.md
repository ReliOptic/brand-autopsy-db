# 05. Design System Spec — Mastercard Incorporated (MA)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It is not investment advice, legal advice, or a substitute for Mastercard's official brand
> guidelines. All design observations are based on publicly accessible sources: mastercard.com,
> Mastercard's official newsroom, publicly documented brand identity materials, and Mastercard's
> published brand announcements. Mastercard's website returned HTTP 403 during automated CSS
> extraction; color and typography specifications below are therefore sourced from Mastercard's
> official brand announcements, newsroom documentation, and direct visual observation of publicly
> accessible brand materials rather than parsed CSS. Source notation: `(official)` = Mastercard-
> published content; `(observed on mastercard.com)` = direct visual observation; `(brand
> announcement)` = Mastercard official newsroom release; `(estimated)` = project inference from
> observable patterns. All estimates are labeled as such.

---

## 1. Color Palette

Mastercard's color system is built on one of the most recognizable two-color mark constructions
in global branding. The interlocking red and yellow circles — unchanged in hue since 1966 —
represent a deliberate color discipline: the primary brand colors exist only in the logo.
Beyond the logo, Mastercard's layouts employ restraint: black, white, and neutral backgrounds
preserve the optical impact of the circles by ensuring they are never in competition with
environmental color.

### Core Brand Colors

| Token Name | HEX | Role | Specific Usage |
|---|---|---|---|
| `mastercard-red` | `#EB001B` | Primary brand color — Logo left circle | The red circle of the interlocking logo; appears in all brand marks across digital, physical, and OOH contexts. Never used as a background fill, button color, or decorative element outside the logo. (official, Mastercard brand identity, 2016 rebrand) |
| `mastercard-yellow` | `#F79E1B` | Primary brand color — Logo right circle | The yellow/amber circle of the interlocking logo. Same usage constraints as red. Note: in some reproduction contexts described as "Mastercard orange" due to the amber character of the specific hue. (official, Mastercard brand identity) |
| `mastercard-orange` | `#FF5F00` | Overlap zone — emergent brand color | The visual product of the red-yellow overlap in the logo mark. Not independently deployable as a standalone color in most contexts; exists structurally within the logo geometry. (official, Mastercard logo construction) |
| `brand-black` | `#000000` | Primary text and dark surfaces | Used for typography, dark background sections, premium card designs, and monochrome logo applications. (observed on mastercard.com) |
| `brand-white` | `#FFFFFF` | Primary background | Clean layout backgrounds; white card surfaces; product photography backgrounds. (observed on mastercard.com) |
| `ui-dark-navy` | `#1A1F36` | Digital interface backgrounds | Deep background for security-focused UI sections, developer portal interfaces, and dark-mode digital products. (estimated, based on observed digital UI patterns) |
| `neutral-light-grey` | `#F5F5F5` | Secondary background | Section separators, card surfaces, secondary information panels in digital interfaces. (estimated, based on observed mastercard.com layout patterns) |
| `text-secondary-grey` | `#6B7280` | Secondary text | Supporting copy, captions, metadata labels, footnote text. (estimated, based on standard design system conventions and observed mastercard.com patterns) |

### Color Principles

**Principle 1 — The circles' colors are reserved exclusively for the logo mark.**
`#EB001B` and `#F79E1B` appear in Mastercard communications only as the logo itself. Using
either color as a button fill, section background, typographic emphasis, or decorative element
creates visual confusion with the logo and dilutes the recognition power of the circles.
The observable discipline on mastercard.com is: logo colors are in the logo; layouts are
black and white. (observed on mastercard.com; T4_INFERRED from brand discipline analysis)

**Principle 2 — High contrast is achieved through black and white, not through color.**
Mastercard's digital and print layouts achieve visual hierarchy through tonal contrast
(black type on white ground, white type on black ground) rather than color contrast. This
restraint ensures that when the red-yellow logo mark appears, it is the only color in the
composition — maximizing recognition impact. (observed on mastercard.com)

**Principle 3 — The overlap orange is a brand color that must not be faked.**
The orange created by the overlap of `#EB001B` and `#F79E1B` at the logo's center is an
optically specific color, not a generic orange. Substituting a different orange hue in any
context where the overlap color appears would create a subtle but detectable brand inconsistency.
(T4_INFERRED from logo construction analysis; estimated based on standard color mixing physics)

**Principle 4 — Dark mode must preserve the circles' recognition.**
In dark-surface digital contexts, the logo circles transition to a white-background version
or are shown on the dark surface with the standard red and yellow maintained. Neither circle
is inverted to a different color in dark mode. The circles' identity is colorfast across
surface variations. (observed on mastercard.com developer portal and dark-mode contexts)

---

## 2. Logo System

The Mastercard logo system underwent a significant evolution over two rebrand cycles:

### 2016 Rebrand — "Mastercard" (one word, lowercase c)

In 2016, Mastercard rebranded from "MasterCard" (two words, two capitals) to "Mastercard"
(one word, lowercase c). The circles mark was refined for a more modern geometry. FF Mark
was selected as the brand typeface. The overall visual identity was updated for digital-first
legibility. (official, Mastercard brand newsroom, 2016)

This rebrand also updated the corporate name legally from "MasterCard Incorporated" to
"Mastercard Incorporated."

### 2019 Evolution — Symbol-Only Logo

In January 2019, Mastercard announced that it would remove the word "Mastercard" from its
logo in most consumer and product applications, leaving only the interlocking red and yellow
circles. CEO Ajay Banga stated at the time: "We have become the first company in our industry
to drop our name from our logo and are now recognized as a symbol brand." (official, Mastercard
newsroom press release, January 8, 2019)

This places Mastercard in an elite group of globally recognized symbol brands — Nike (swoosh),
Apple (apple mark), McDonald's (golden arches) — where the symbol alone carries full brand
recognition without verbal reinforcement.

### Logo Variants

| Variant | Description | Application Context |
|---------|-------------|---------------------|
| Symbol Only (primary) | Interlocking circles; no wordmark | Most consumer-facing digital, advertising, packaging, and product contexts (official, Mastercard brand, 2019) |
| Symbol + Wordmark | Circles + "Mastercard" in FF Mark | Formal corporate, legal, institutional, and new-market contexts where symbol recognition cannot be assumed (official) |
| Monochrome — Black | Single-color black circles | Low-color reproduction contexts: black-and-white print, embossed card, engraving (estimated, standard brand practice) |
| Monochrome — White | Single-color white circles | Reversed applications on dark or color backgrounds where color reproduction is not possible (estimated) |
| Physical Card Mark | Circles in bottom-right corner of card | Standardized placement on all Mastercard-branded payment cards, per network card design standards (official, Mastercard card design standards) |

---

## 3. Typography

Mastercard's primary typeface is FF Mark, a geometric sans-serif typeface designed by
FontFont (now part of Monotype) and licensed for exclusive brand use by Mastercard following
the 2016 rebrand. FF Mark was selected for its legibility across languages, cultural
neutrality for global markets, and geometric character that complements the circles motif
of the logo. (official, Mastercard brand newsroom, 2016)

### Typeface System

| Typeface | Description | Contexts |
|---|---|---|
| **FF Mark** | Geometric sans-serif; balanced proportions; excellent multilingual coverage | All primary brand communications: headlines, body copy, UI labels, card branding, campaign typography (official, Mastercard brand identity) |
| **FF Mark Bold** | Heavy weight variant | Campaign headlines, hero display copy, key data callouts |
| **FF Mark Medium** | Mid-weight variant | Subheads, navigation, CTA buttons, card tier designations |
| **FF Mark Regular** | Base weight | Body copy, captions, supporting text |
| **FF Mark Light** | Light weight | Supplementary copy, white-space intensive layouts |
| **Fallback stack** | Arial, Helvetica Neue, sans-serif | Web system fallback when FF Mark licensing cannot be delivered to browser context (estimated, standard licensing practice) |

### Role-Based Typographic Scale (estimated from observed mastercard.com layouts)

| Role | Typeface | Weight | Desktop Size | Mobile Size | Line Height | Notes |
|---|---|---|---|---|---|---|
| **Hero / Campaign Headline** | FF Mark | Bold | 56–80px | 32–48px | 1.10 | Campaign display; Priceless campaign headlines (estimated) |
| **Section Headline (H1)** | FF Mark | Bold / Medium | 36–48px | 24–36px | 1.15 | Page-level section headers (estimated) |
| **Subhead (H2)** | FF Mark | Medium | 24–32px | 18–24px | 1.25 | Content section labels (estimated) |
| **Body Copy** | FF Mark | Regular | 16–18px | 15–16px | 1.60 | Primary readable text (estimated) |
| **UI Label / Button** | FF Mark | Medium | 14–16px | 13–14px | 1.0 | Interactive elements (estimated) |
| **Caption / Legal** | FF Mark | Regular / Light | 12–13px | 11–12px | 1.40 | Footnotes, disclaimers, legal copy (estimated) |
| **Card Tier Name** | FF Mark | Bold | Variable | Variable | 1.0 | "World Elite" / "World" / "Standard" on card face (official, Mastercard card design standards) |

### Typographic Rules

1. **FF Mark is the exclusive brand typeface across all channels.** Substituting with Arial,
   Helvetica Neue, Inter, or other geometric sans-serifs introduces optical weight and spacing
   inconsistencies. Layouts mixed between FF Mark and generic system fonts are immediately
   distinguishable from genuine Mastercard brand work (T4_INFERRED based on optical comparison).

2. **Headline hierarchy is weight-based.** A 36px Bold section header reads as clearly
   subordinate to a 56px Bold hero headline because they share the same weight; the scale
   differential alone carries the hierarchy. Weight mixing within a headline is not observed
   in Mastercard's primary campaign typography (observed on mastercard.com).

3. **All-caps is used selectively and sparingly.** Unlike brands that use all-caps for premium
   signaling, Mastercard's campaign typography primarily uses title case or sentence case for
   warmth and accessibility. ALL CAPS may appear in card tier labels ("WORLD ELITE") but not
   in consumer-facing campaign headlines (estimated, based on observed Mastercard advertising).

4. **White on black or black on white is the primary typographic contrast model.** Color
   typography (red or yellow copy) is not observed in Mastercard's primary web or campaign
   typography, preserving those colors exclusively for the logo mark (observed on mastercard.com).

---

## 4. Channel Specifications

Asset dimensions are based on observed Mastercard creative assets, official newsroom imagery,
social channel inspection, and platform publishing specifications as of Q1 2025. Values noted
as `(estimated)` represent project inference where Mastercard has not published explicit specs.

| Channel | Asset Type | Dimensions (W × H) | Safe Zone | Key Notes |
|---|---|---|---|---|
| **mastercard.com — Hero (Desktop)** | Full-bleed JPEG / WebP | 2560 × 1440 px | Center 1280 × 720 px active | High-resolution experiential photography; logo in lower quadrant (estimated) |
| **mastercard.com — Hero (Mobile)** | JPEG / WebP | 750 × 1200 px | Center 375 × 600 px | Mobile-first responsive breakpoint; single message per viewport (estimated) |
| **mastercard.com — Module Image** | JPEG / PNG | 800 × 600 px | Center 720 × 540 px | Content module photography; Priceless experience imagery (estimated) |
| **Physical Payment Card** | Per ISO/IEC 7810 ID-1 | 85.6 × 53.98 mm | Logo circles: bottom-right 25mm × 16mm area | Mastercard circles in bottom-right corner; tier designation (World/Standard) upper area (official, Mastercard card design standards) |
| **Instagram — Feed Square** | JPEG / PNG | 1080 × 1080 px | 900 × 900 px safe | Experience photography; minimal text; logo in lower corner (observed on Mastercard Instagram) |
| **Instagram — Feed Portrait (4:5)** | JPEG / PNG | 1080 × 1350 px | 960 × 1200 px | Preferred feed ratio; more vertical real estate for experience imagery (estimated) |
| **Instagram — Stories / Reels** | MP4 / JPEG | 1080 × 1920 px | 1080 × 1420 px (avoid top/bottom 250px) | 9:16; sonic branding integrated in video closings (estimated) |
| **YouTube — Thumbnail** | JPEG | 1280 × 720 px | Center 1100 × 620 px | 16:9; Priceless campaign moment as primary visual; minimal text overlay (estimated) |
| **YouTube — Channel Art** | JPEG | 2560 × 1440 px | Center safe zone 1546 × 423 px | Logo circles centered in safe zone (estimated) |
| **Twitter / X — Card Image** | JPEG / PNG | 1200 × 628 px | Center 1080 × 540 px | Brand moment or Priceless campaign image; minimal copy (observed on Mastercard Twitter/X) |
| **LinkedIn — Sponsored Content** | JPEG / PNG | 1200 × 627 px | Center 1080 × 540 px | Corporate/institutional tone; data-forward or inclusion-focused imagery (observed on Mastercard LinkedIn) |
| **LinkedIn — Document/Report Cover** | JPEG | 1600 × 900 px | Center 1400 × 780 px | SpendingPulse / Economics Institute reports; data visualization cover (estimated) |
| **Display Ad — Leaderboard** | JPEG / GIF | 728 × 90 px | Center 650 × 70 px | Logo + Priceless tagline; minimal copy; high recognition at small size (estimated) |
| **Display Ad — Medium Rectangle** | JPEG / GIF | 300 × 250 px | Center 260 × 210 px | Experience photography; single message; logo mark prominent (estimated) |
| **OOH / Billboard** | TIFF / EPS vector | Variable (3:1 or 16:9) | Headline only; no body copy | FF Mark Bold equivalent; minimal copy at scale; circles mark as sole brand element (estimated) |
| **Email — Header Banner** | JPEG | 1200 × 400 px | Center 960 × 340 px | Max 600px container width in email clients; Priceless campaign creative or security messaging (estimated) |
| **Keynote / Presentation Slide** | Keynote / PPT / PNG | 1920 × 1080 px (standard) | Safe margins 100px all sides | Single idea per slide; FF Mark typography; minimal animation (estimated) |

---

## 5. Layout Principles

**Principle 1 — The circles are the compositional anchor.**
Every Mastercard layout resolves toward the circles mark. In advertising, this manifests
in the composition's final visual beat: the eye travels through the narrative and arrives
at the two circles, which close the story. Layout hierarchies are built to guide the viewer
to this final destination. The circles are never buried or peripheral in primary compositions.
(T4_INFERRED from observed Mastercard campaign layout patterns)

**Principle 2 — Generous negative space signals premium and preserves logo impact.**
Mastercard's digital and print layouts consistently allocate significant white space around
imagery and typographic elements. This is not unused capacity — it is the mechanism that
gives the circles logo its visual authority when it arrives. Compressed layouts reduce the
logo's impact by placing it in competition with surrounding elements. (observed on mastercard.com)

**Principle 3 — One idea per viewport in primary brand contexts.**
Consistent with the Priceless campaign's structural discipline — one emotional beat per spot,
one payoff per execution — mastercard.com's primary product and campaign sections present
one message per visual field: one headline, one image, one logo, one optional CTA.
(estimated, based on observed mastercard.com page structure)

**Principle 4 — Experience photography is the hero; the card is the supporting character.**
In consumer-facing Priceless campaign layouts, the experiential moment (the dinner, the
concert, the travel destination) is the primary visual element. The Mastercard card, if it
appears at all, is secondary — a prop or a watermark, not the subject. This is the reverse
of most financial product advertising, which centers the product. (observed in Mastercard
campaign creative; T4_INFERRED from Priceless campaign visual structure)

**Principle 5 — Color restraint outside the logo is a brand discipline, not a limitation.**
The absence of red and yellow from Mastercard's layout environments is a strategic choice:
every composition that avoids using those colors ensures that when the logo appears, the
brand colors land with full impact. The discipline requires resisting the impulse to use
the brand palette for decoration. (T4_INFERRED from observed design discipline)

**Principle 6 — Responsive design must preserve circles' legibility at every breakpoint.**
The interlocking circles must be reproduced at sufficient size to be recognizable across
all responsive breakpoints. A minimum reproduction size of approximately 30px × 19px is
required for digital contexts to maintain circle separation legibility (estimated, based on
standard logo minimum reproduction guidelines and observed Mastercard web implementation).

**Principle 7 — Asymmetric layouts signal emotional or narrative weight.**
The default compositional mode is centered or balanced. Asymmetric layouts — image filling
two-thirds of the frame with type in the remaining third — appear primarily in high-emotion
Priceless campaign moments or in the financial inclusion storytelling, where the subject of
the story deserves visual dominance. (estimated, based on observed Mastercard campaign layouts)

---

## 6. Icon and Illustration Style

### Icon System

Mastercard's digital product interfaces (the Mastercard app, developer portal, B2B platforms)
use a clean, geometric icon system consistent with the following characteristics observed in
public-facing digital products:

- **Stroke-based, medium weight**: Icons use consistent stroke weight without fill, matching
  the visual weight of FF Mark body text at equivalent sizes (estimated).
- **Circular and geometric forms**: Icon shapes echo the circles motif of the logo — rounded
  corners, circular structures, contained forms rather than angular or complex illustrations
  (observed on mastercard.com developer portal).
- **Monochrome in UI contexts**: Icons appear in black or white in primary interface contexts;
  brand-color icons are not observed in UI chrome (estimated from observed mastercard.com UI).
- **Two-color in brand content**: In marketing contexts, icons may appear in the brand's
  black/white palette with selective use of circles-derived forms (estimated).

### Illustration Style

Mastercard's primary content visual strategy is photography, not illustration. When
illustration appears, the following patterns are observed in publicly accessible brand materials:

- **Flat vector, limited palette**: 2–4 colors maximum; no shading or texture fills.
  Data visualizations and infographics for SpendingPulse and Economics Institute reports
  use clean flat charting with the brand's neutral palette. (observed on mastercard.com/
  insights)
- **Network visualization aesthetic**: Technology and cybersecurity content uses abstract
  network graphs — glowing nodes and connections on dark backgrounds — representing the
  payment network infrastructure. Palette is dark navy with white and occasional accent
  of amber/orange. (observed on mastercard.com technology pages)
- **Human figures in photography, not illustration**: Financial inclusion and Priceless
  campaign human moments are expressed through authentic photography, not illustrated
  characters. Illustrated people are not observed in primary Mastercard brand assets.
  (T4_INFERRED from observed brand creative)

---

## 7. AI Image Generation Prompt Guide

The following structured prompts are designed to produce visual outputs consistent with
Mastercard's publicly observed aesthetic. These are creative reference tools for this project;
they are not Mastercard-endorsed prompts and do not reproduce copyrighted Mastercard assets.

### Priceless Moment — Intimate Dining

```
Warm candlelit restaurant interior, couple or family sharing a meal, genuine laughter
or emotional connection — not staged smiling, soft bokeh background with amber and warm
white tones, editorial food photography quality, no visible branded items or logos, natural
practical lighting from candles and ambient sources, shallow depth of field equivalent to
f/1.8, film grain at ISO 800 level, Leica M aesthetic, horizontal 16:9 framing
```

### Travel / Cultural Experience

```
Documentary travel photography, [ETHNICITY] traveler in [CITY/LANDMARK] at golden hour
or late afternoon light, authentic moment of discovery or joy — not posed, medium shot
with subject occupying left third, right third open for typography placement, warm color
grade (lifted highlights +10, slight saturation reduction -5), no visible corporate branding,
cinematic aspect ratio 2.39:1
```

### Financial Inclusion — Emerging Market Small Business

```
Documentary photography style, small business owner in a vibrant [MARKET/STREET SETTING:
Accra market, Mumbai bazaar, São Paulo fair], natural daylight, genuine focused expression
engaged in commerce, mobile payment device visible as secondary element, earth tones and
natural color palette, no artificial lighting, photojournalistic quality, medium wide shot
showing business context, hopeful but not saccharine mood
```

### Security / Technology Abstract

```
Abstract visualization of a payment network, glowing node-and-edge graph on deep navy
(#1A1F36) background, nodes in pure white with faint amber (#F79E1B) accent on central
hub node, connection lines in light blue-white, no human faces, no text overlays,
cinematic lens flare on central node only, 16:9 horizontal composition, clean and
precise rendering — not chaotic
```

### Physical Card Product Shot

```
Minimalist product photography, payment card floating on pure white background, single
directional soft key light from upper-left at 45 degrees, subtle ambient fill from right,
sharp focus across card surface, slight card angle (20 degrees from horizontal) to show
premium card weight and finish, no props, no human hands, no background texture,
studio quality, medium format rendering, 1:1 square composition
```

### Sonic Brand Moment (Video Frame)

```
Single frame from a high-quality video: two overlapping circles — one deep red (#EB001B),
one amber-yellow (#F79E1B) — on pure black (#000000) background, centered composition with
generous negative space, no typography, no other elements, photorealistic rendering of
circles with subtle surface texture suggesting physical card material, ultra-sharp, 16:9
```

---

## 8. Design Prohibitions

1. **No distortion, recoloring, or special effects on the interlocking circles logo.**
   The geometry, color values (`#EB001B` and `#F79E1B`), and proportional relationship of
   the two circles are precisely defined. Stretching, drop-shadowing, gradient-filling, or
   altering either circle's hue violates the brand mark's integrity and, as a registered
   trademark, its legal protection. (official, Mastercard trademark registrations; T4_INFERRED
   from standard brand guideline practice)

2. **No use of Mastercard Red (#EB001B) or Mastercard Yellow (#F79E1B) as design elements
   outside the logo mark.**
   Using either brand color as a button fill, background section, typographic emphasis, or
   illustration accent creates visual confusion with the logo and destroys the circles' unique
   recognition signal. Both colors are reserved exclusively for the logo. (T4_INFERRED from
   observed mastercard.com design discipline)

3. **No logo placement that competes with photographic subject matter.**
   In Priceless campaign layouts, the circles mark closes the composition — it does not compete
   with the experience photography. Placing the logo over a human face, over the primary
   emotional subject of a photograph, or in the visual center of the composition breaks the
   compositional hierarchy that makes the campaign work. (T4_INFERRED)

4. **No third-party typefaces in Mastercard-branded creative.**
   FF Mark is the exclusive brand typeface. Substituting with Helvetica Neue, Inter, Gill Sans,
   Futura, or any other geometric sans-serif introduces optical weight, spacing, and x-height
   inconsistencies detectable in any direct comparison with genuine Mastercard layouts.
   (T4_INFERRED from typographic analysis)

5. **No cluttered or information-dense layouts in consumer-facing brand contexts.**
   The Priceless content platform requires visual breathing room. Layouts that stack multiple
   messages, product claims, or calls-to-action in a single viewport conflict with the
   emotional simplicity the campaign requires. Dense information design belongs in institutional
   and B2B contexts only. (T4_INFERRED from observed campaign quality)

6. **No stock photography tropes in Priceless campaign creative.**
   Recognizable stock imagery — staged family smiles, generic business handshakes, posed
   romantic dinners with unnatural eye contact — undermines the authenticity claim that makes
   the Priceless platform credible. The "this could be your life" believability of the campaign
   depends on photography that feels observed, not manufactured. (T4_INFERRED)

7. **No competitor brand colors adjacent to the Mastercard logo.**
   Placing Visa blue (#1434CB), American Express blue-green, or other payment brand colors
   in close compositional proximity to the Mastercard circles creates unintentional visual
   associations. In comparative contexts (e.g., acceptance signage showing multiple networks),
   maintain clear visual separation between marks. (T4_INFERRED)

8. **No low-resolution reproduction of the symbol-only logo.**
   Since 2019, the circles mark alone carries the brand's full identity in primary consumer
   contexts. At small reproduction sizes, the circles must maintain clear separation between
   red and yellow fields. Minimum recommended reproduction size: approximately 24px height
   in digital contexts to preserve the overlap zone's visibility (estimated).

9. **No use of the circles mark as a decorative pattern or background texture.**
   The interlocking circles are a registered trademark and a protected brand asset. Repeating
   the circles as a wallpaper pattern, background texture, or decorative motif — separate from
   its logo function — may constitute trademark misuse and is not observed in any Mastercard-
   authorized brand material. (T4_INFERRED from standard trademark protection principles)

10. **No promotional content claiming specific acceptance figures without current sourcing.**
    "Accepted everywhere" and "100 million merchant locations" figures are updated in SEC filings
    and official brand materials. Creative that embeds specific acceptance numbers must reference
    the current 10-K or official fact sheet figure, as acceptance data changes quarterly.
    (T4_INFERRED from disclosure accuracy requirements)

11. **No card design using non-standard circle placement.**
    The Mastercard circles mark on physical payment cards has standardized placement: bottom-
    right corner of the card face. Non-standard placement (centered, upper-left, or on the
    card back) violates card design standards and network membership requirements. (official,
    Mastercard card design standards)

12. **No application of gradient fills to FF Mark typography.**
    Gold-to-silver gradient text, rainbow fills, or iridescent effects on headline typography
    are not present in any observed Mastercard brand creative. All text is rendered in solid
    color: black (#000000), white (#FFFFFF), or secondary greys. (T4_INFERRED from observed
    mastercard.com and campaign typography)

---

*Layer 5 of 8 — Brand Autopsy: Mastercard Incorporated (MA)*
*CIK: 0001141391 | Exchange: NYSE (MA) | Headquarters: Purchase, New York*
*Analysis based on publicly accessible sources as of Q1 2025.*
*Source tiers: (official) = Mastercard-published | (observed on mastercard.com) = direct visual | (estimated) = project inference*
*This is not Mastercard's official Brand Identity Guidelines document.*
