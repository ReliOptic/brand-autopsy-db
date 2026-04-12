# 05. Design System Spec — Airbnb Inc. (ABNB)

---

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It is not investment advice, legal advice, or a substitute for Airbnb's official brand
> guidelines. All design observations are based on publicly accessible sources: airbnb.com,
> Airbnb's publicly documented Design Language System (DLS), CSS extraction from airbnb.com,
> and official marketing materials. Color codes, spacing values, and typographic specifications
> are observed or estimated from public-facing assets and do not constitute Airbnb's internal
> style guide. Source notation: `(official)` = Airbnb-published content; `(observed on airbnb.com)`
> = direct page observation; `(CSS extraction)` = values parsed from publicly accessible
> stylesheets; `(estimated)` = project inference from observable patterns. All estimates are
> labeled as such.

---

## 1. Color Palette

Airbnb's color system is built around a warm coral-red primary paired with neutral grays and white
surfaces. The CSS extraction from airbnb.com reveals a richer palette than traditional DLS
documentation suggests — including multiple gradient stops for the signature Rausch red used across
interactive elements and the Bélo logo mark. The observed CSS palette (Q1 2025) contains
approximately 20+ color values; the 14 documented below represent the core brand system.

### Core Brand Colors

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-primary-text` | `#222222` | Very high (14×) | Primary Text | All primary headlines, body copy, navigation labels across airbnb.com (CSS extraction) |
| `color-rausch-primary` | `#FF5A5F` | High | Primary Brand / CTA | Logo, primary CTA buttons ("Search", "Reserve"), key UI highlights — the Airbnb brand signature (official, Airbnb DLS) |
| `color-rausch-deep` | `#BD1E59` | High (10×) | Deep Rausch Gradient Stop | Gradient mid-point in Bélo logo rendering and hero gradient overlays (CSS extraction) |
| `color-rausch-vivid` | `#D70466` | High (9×) | Vivid Rausch Gradient Stop | Gradient stop used in brand motion and logo animation sequences (CSS extraction) |
| `color-rausch-action` | `#E31C5F` | Moderate (7×) | CTA Active / Hover State | Active and hover state on primary red buttons (CSS extraction) |
| `color-rausch-alert` | `#E61E4D` | Moderate (7×) | Alert / Emphasis Accent | Alert badges, availability warnings, time-sensitive promotional callouts (CSS extraction) |
| `color-arches-orange` | `#C13515` | Moderate (8×) | Warm Accent | Promotional pricing highlights, urgency indicators, "few spots left" callouts (CSS extraction) |
| `color-arches-deep` | `#B32505` | Moderate (6×) | Deep Orange Gradient Stop | Deep stop in orange-to-red gradient used in experience booking CTAs (CSS extraction) |
| `color-babu-purple-deep` | `#460479` | Moderate (8×) | Dark Purple Gradient Stop | Gradient anchor for night-mode hero imagery and luxury tier promotions (CSS extraction) |
| `color-babu-purple-mid` | `#6C0D63` | Moderate (6×) | Mid Purple Gradient Stop | Mid-stop in purple brand gradient sequences (CSS extraction) |
| `color-babu-purple-light` | `#861453` | Moderate (6×) | Light Purple Gradient Stop | Transition stop between red and purple in extended brand gradients (CSS extraction) |
| `color-divider-light` | `#DDDDDD` | High (9×) | Border / Divider Light | Card borders, input field outlines, section dividers (CSS extraction) |
| `color-surface-neutral` | `#EBEBEB` | Moderate (6×) | Neutral Surface | Skeleton loading states, inactive tabs, disabled input backgrounds (CSS extraction) |
| `color-background-light` | `#F7F7F7` | Moderate (7×) | Page Background | Secondary page backgrounds, card hover states, search results container (CSS extraction) |

### DLS Named Colors (Official)

Airbnb's DLS names colors after places — a design decision that embeds the brand's "Belong Anywhere"
ethos directly into engineering infrastructure (official, Airbnb Engineering Blog).

| DLS Name | HEX | Named After | Role |
|---|---|---|---|
| **Rausch** | `#FF5A5F` | Rausch Strasse, Berlin | Primary brand / CTA |
| **Babu** | `#00A699` | Babu Beach, Cape Town | Secondary trust accent |
| **Arches** | `#FC642D` | Arches National Park, Utah | Warm promotional accent |
| **Hof** | `#484848` | Hofstraße, Berlin | Primary UI text |
| **Foggy** | `#767676` | Foggy Bay, California | Secondary / metadata text |

---

## 2. Color Principles

**Principle 1 — Rausch (#FF5A5F) is the exclusive interactive signal.**
The Rausch red appears on the Bélo logo, the search button, primary reservation CTAs, and
interactive price elements — nowhere else in UI chrome. This single-color action discipline
means any red element on airbnb.com is immediately understood as tappable without requiring
a hover state label (official, Airbnb DLS; observed on airbnb.com). Applying Rausch to
decorative elements, background panels, or illustrative fills breaks this signal hierarchy.

**Principle 2 — The gradient is the brand system's personality layer.**
Unlike the monochrome restraint of many tech brands, Airbnb's logo and brand identity system
incorporates a warm gradient (red-to-pink-to-orange, observed across the Bélo mark). The CSS
extraction confirms multiple gradient stops (`#BD1E59`, `#D70466`, `#E31C5F`, `#C13515`) are
used in the brand gradient system. This gradient is confined to the logomark and hero brand
moments — it does not bleed into UI chrome, body typography, or card elements (CSS extraction;
observed on airbnb.com).

**Principle 3 — Photography provides all chromatic richness; UI chrome is purposefully restrained.**
Airbnb's product pages operate on white (`#FFFFFF`) and near-white (`#F7F7F7`) backgrounds,
with `#222222` text and Rausch-only accent color. This neutral chrome serves as a deliberate
"empty frame" that allows destination photography to carry the full emotional color load
(observed on airbnb.com). Introducing competing chroma in UI elements would visually compete
with listing photography.

**Principle 4 — Dark surfaces are used for contextual emphasis, not global dark mode.**
Unlike some tech platforms that implement full OS-level dark mode, Airbnb uses dark overlays
selectively — typically over hero photography to ensure white headline text remains legible.
The dark overlay is a semi-transparent black, not a branded dark surface color (observed on
airbnb.com; CSS extraction shows `rgba(0,0,0,0.4)` used on hero image overlays).

---

## 3. Typography

Airbnb employs a proprietary typeface created specifically for the brand, not available for
external licensing without authorization (official, Airbnb Design blog, 2018). All specifications
below are derived from publicly observable rendering on airbnb.com and Airbnb's published
design blog documentation.

### Typeface System

| Typeface | Description | Contexts |
|---|---|---|
| **Cereal** | Custom humanist sans-serif designed by Dalton Maag; commissioned to work across Latin and Cyrillic scripts; four weights: Book, Medium, Bold, ExtraBold | All brand communications — website, app, advertising, print, OOH (official, Airbnb Design blog 2018) |
| **-apple-system / BlinkMacSystemFont** | System font fallback for iOS/macOS rendering where Cereal is unavailable | System UI rendering contexts (CSS extraction, observed on airbnb.com) |
| **Roboto** | Android system fallback | Android native UI fallback stack (CSS extraction) |
| **Circular / Helvetica Neue** | Legacy fallback in some older email templates | Email client fallback where custom fonts unavailable (estimated) |

### Role-Based Typographic Scale

| Role | Typeface | Weight | Desktop Size | Mobile Size | Line Height | Notes |
|---|---|---|---|---|---|---|
| **Hero / Campaign Headline** | Cereal | ExtraBold | 56–80px | 32–48px | 1.05 | Full-bleed campaign headers, app store screenshots (observed on airbnb.com) |
| **Section Headline (H1)** | Cereal | Bold | 36–48px | 24–32px | 1.10 | Product page section openers, destination landing pages (observed on airbnb.com) |
| **Section Subhead (H2)** | Cereal | Medium | 24–32px | 19–24px | 1.20 | Feature descriptions, category headers (observed on airbnb.com) |
| **Body Copy** | Cereal | Book | 16–18px | 15–16px | 1.50 | Listing descriptions, help content, onboarding text (observed on airbnb.com) |
| **UI Label / Button** | Cereal | Medium | 14–16px | 14–15px | 1.0 | CTA button labels, navigation items, filter chips (observed on airbnb.com) |
| **Price Display** | Cereal | Bold | 18–22px | 16–18px | 1.0 | Nightly rate, total price display on listing cards (observed on airbnb.com) |
| **Caption / Metadata** | Cereal | Book | 12–14px | 11–13px | 1.35 | Review counts, location tags, host join date (observed on airbnb.com) |
| **Nav Label** | Cereal | Medium | 12px | 12px | 1.0 | Top navigation, mobile bottom nav bar labels (CSS extraction) |
| **Legal / Disclaimer** | Cereal or system fallback | Book | 11–12px | 10–11px | 1.30 | Terms of service, fee disclosures, legal footnotes (observed on airbnb.com) |

### Typographic Rules

1. **Cereal is the only permissible display face in Airbnb-branded contexts.** Substituting with
   Circular, Helvetica Neue, or any third-party humanist sans-serif introduces optical weight and
   letterform inconsistencies detectable against genuine Airbnb layouts.
2. **Headline hierarchy is weight-based.** ExtraBold is reserved for campaign headlines only —
   applying it to body copy or UI labels creates visual noise inconsistent with the DLS hierarchy.
3. **Minimum body size is 16px on desktop.** This is the observed baseline across airbnb.com
   content pages for accessibility and readability (observed on airbnb.com).
4. **Price display uses Bold weight, not ExtraBold.** The price is a key conversion element;
   Bold provides sufficient emphasis without competing with the booking CTA button (observed on
   airbnb.com listing cards).
5. **Sentence case is the standard headline style.** Airbnb headlines consistently use sentence
   case ("Find your perfect stay") not title case or ALL CAPS — consistent with the brand's
   conversational, peer-to-peer voice (observed on airbnb.com and campaign materials).

---

## 4. Channel Specifications

Pixel dimensions based on observed Airbnb creative assets, Airbnb Newsroom imagery, social
channel inspection, and platform publishing specifications as of Q1 2025.

| Channel | Asset Type | Dimensions (W × H) | Safe Zone | Key Notes |
|---|---|---|---|---|
| **airbnb.com — Hero (Desktop)** | Full-bleed JPEG / WebP | 2560 × 1440 px | Center 1280 × 720 px active | Retina delivery via Airbnb CDN; destination photography with Cereal headline overlay (observed on airbnb.com) |
| **airbnb.com — Hero (Mobile)** | Full-bleed JPEG / WebP | 750 × 1000 px | Center 375 × 500 px active | Cropped from desktop hero; text overlay repositioned for mobile viewport (observed on airbnb.com) |
| **airbnb.com — Listing Card** | JPEG | 720 × 480 px | Full frame usable | 3:2 ratio; no text overlays; host photography standards apply (observed on airbnb.com) |
| **airbnb.com — Category Icon** | PNG / SVG | 128 × 128 px | Full frame | Illustrated icons with rounded style; 2022 category redesign (observed on airbnb.com) |
| **Instagram — Feed Square** | JPEG / PNG | 1080 × 1080 px | 900 × 900 px | Destination or property photography; minimal text overlay (observed on @airbnb Instagram) |
| **Instagram — Feed Portrait (4:5)** | JPEG / PNG | 1080 × 1350 px | 960 × 1200 px | Preferred ratio for feed visibility; lifestyle photography (observed on @airbnb Instagram) |
| **Instagram — Stories / Reels** | MP4 / JPEG | 1080 × 1920 px | 1080 × 1420 px center safe | 9:16; Bélo logomark lower right; host story format (observed on @airbnb Instagram) |
| **YouTube — Thumbnail** | JPEG | 1280 × 720 px | Center 1100 × 620 px | 16:9; host face or destination image; Cereal Bold title overlay (observed on Airbnb YouTube) |
| **YouTube — Channel Art** | JPEG | 2560 × 1440 px | Center 1546 × 423 px safe | Bélo logo centered; destination imagery background (observed on Airbnb YouTube) |
| **Twitter / X — Card Image** | JPEG / PNG | 1200 × 628 px | Center 1100 × 540 px | Announcement or host story imagery; minimal text (observed on @Airbnb X) |
| **LinkedIn — Sponsored Content** | JPEG / PNG | 1200 × 627 px | Center 1100 × 540 px | Corporate data or host economic impact focus; higher text density permissible (observed on Airbnb LinkedIn) |
| **Email — Header Banner** | JPEG | 1200 × 400 px | Center 960 × 340 px | 600px container in email; personalized destination imagery (estimated) |
| **Email — Listing Card** | JPEG | 600 × 400 px | Full frame | Guest-specific recommendations; property photography standard (estimated) |
| **App Store Screenshot — iOS** | PNG | 1290 × 2796 px (iPhone 15 Pro Max) | Top/bottom 80px clear | Real app UI; search results and listing card views (official, App Store guidelines) |
| **OOH / Billboard** | TIFF / EPS | 3:1 or 16:9 (variable) | Headline only | Destination photography; Cereal ExtraBold; Bélo red on white or white on image (estimated) |
| **Paid Social — Dynamic Ad** | JPEG / PNG | 1200 × 628 px | 900 × 470 px text safe | Personalized listing imagery from search intent; Rausch CTA button (estimated) |

---

## 5. Layout Principles

**Principle 1 — Photography is the layout anchor, not the grid.**
Airbnb's product pages and marketing layouts are built outward from destination and property
photography. The listing card grid conforms to 3:2 photography proportions; section backgrounds
use full-bleed imagery cropped for emotional maximum rather than fitting into a predefined box.
This is the inverse of many B2B SaaS design systems where content grids dictate image crops
(observed on airbnb.com).

**Principle 2 — Card-based democracy of inventory.**
All listing cards render at identical dimensions regardless of price tier, property type, or host
tenure. A $50/night shared room card is structurally identical to a $2,000/night luxury villa card.
This design decision signals platform impartiality — the visual system does not editorialize about
quality; photography and reviews do (observed on airbnb.com; T4_INFERRED as design intent).

**Principle 3 — White space as trust signal.**
Airbnb's UI allocates substantial negative space around each listing card, CTA button, and price
element. Estimated 35–50% of listing page vertical height is negative space (estimated from DOM
analysis). Generous margins communicate that Airbnb is not a discount aggregator urgently pushing
conversions — it is a considered platform where the guest takes time to choose (T4_INFERRED from
observed design patterns).

**Principle 4 — The search bar is the primary design element.**
On the airbnb.com homepage, the destination search bar is the dominant visual and functional
element. Every design decision on the hero — photography selection, overlay opacity, headline
placement, CTA position — is made to direct the user's attention toward the search bar first.
This is the one non-photography element given primary visual weight (observed on airbnb.com).

**Principle 5 — Social proof is architecturally embedded, not appended.**
Star ratings, review counts, and Superhost badges are structural components of listing cards, not
optional decorations added in a post-layout pass. They appear at a fixed position within every
card, communicating that trust signals are as fundamental to the design system as price and
photography (observed on airbnb.com listing grid).

**Principle 6 — Mobile-first information hierarchy.**
Airbnb's observed responsive behavior scales from a single-column mobile layout outward to
multi-column desktop grids (estimated breakpoints: 375px, 414px, 768px, 1024px, 1280px, 1440px,
2560px, CSS extraction). On mobile, the search bar, recent searches, and category chips occupy
the first viewport — booking-intent signals surface before any listing imagery.

**Principle 7 — Color is used to guide action, not to brand sections.**
Section backgrounds on airbnb.com are consistently white or `#F7F7F7`. Color does not signal
section type or content category — it only signals interaction. Any red element means "act here."
This prevents color from becoming decorative noise competing with photography (observed on
airbnb.com; consistent with Airbnb DLS documentation).

---

## 6. Icon & Illustration Style

### Product UI Icons

Airbnb's product UI icon set exhibits the following consistent characteristics (observed on
airbnb.com and Airbnb iOS/Android app):

- **Style**: Primarily outline/stroke-based with occasional filled variants for active states.
  Stroke weight approximately 1.5–2px at 24px display size.
- **Corner treatment**: Rounded caps and corners — no sharp geometric terminations. Consistent
  with the humanist character of the Cereal typeface.
- **Color**: Hof (`#484848`) for standard UI icons; Rausch (`#FF5A5F`) for active/selected states.
- **Grid**: 24×24px base grid with 2px padding within the bounding box (estimated from observed
  rendering proportions).
- **Accessibility**: Interactive icons are accompanied by text labels or aria-label attributes in
  the observed DOM — icon-only interactive elements are not used for primary navigation (observed
  on airbnb.com).

### Category Illustration Icons (2022 Redesign)

The 2022 "Categories" feature introduced a set of expressive illustrated icons for stay types:
beaches, skiing, amazing pools, castles, countryside, trending, and others (official, Airbnb
product announcements, 2022). These icons use a distinct illustrated style:

- **Style**: Soft flat illustration with subtle shading and texture — more expressive than the
  product UI icon set.
- **Palette**: Each category icon uses a 2–3 color palette drawn from warm naturalistic tones;
  not the strict brand palette.
- **Consistency signal**: The illustrated icons share the same rounded, warm character as the
  broader design system — no sharp geometric shapes, no cold corporate aesthetics.

### Bélo Logo Mark

The Bélo is Airbnb's registered trademark logomark, introduced 2014 (official, Airbnb Press). It
is constructed from geometric overlapping curves suggesting a person, a heart, a location pin, and
the letter "A" simultaneously — a multi-reading mark designed to express belonging and place
simultaneously. The mark is rendered in the Rausch-to-Babu gradient for brand contexts, or in
solid Rausch red, white, or black for monochrome applications (official, Airbnb Brand guidelines
as observed in press kit materials).

---

## 7. AI Image Generation Prompt Guide

The following structured prompts are designed to produce visual outputs consistent with Airbnb's
publicly observed aesthetic. These are creative reference tools; they are not Airbnb-endorsed
prompts and do not reproduce copyrighted Airbnb assets.

### Destination Lifestyle (Primary Campaign Format)
```
Warm lifestyle travel photography, [PROPERTY TYPE: coastal villa / mountain cabin / urban loft /
countryside farmhouse], natural golden hour light streaming through large windows, lived-in
authentic atmosphere with personal touches visible — books, plants, art — not staged hotel
perfection, [DEMOGRAPHIC: mixed-age group / couple / solo traveler / family] in candid relaxed
moment, shallow depth of field f/2.8 equivalent, warm color grade (lifted shadows, slight
desaturation -5, warm highlights +10), photographic not illustration style, genuine human
presence implying recent habitation
```

### Host Story Portrait
```
Documentary portrait photography, [AGE RANGE] [ETHNICITY] person in their home environment,
natural daylight from window camera-left, warm residential setting visible in background — not
a backdrop, genuine relaxed smile (not posed corporate expression), Airbnb host aesthetic:
authentic domestic space, 50mm equivalent lens, slight film grain at ISO 400, warm color grade,
no props suggesting tourism or hospitality industry, person wearing casual everyday clothing
```

### Property Hero Shot (Exterior)
```
Architectural lifestyle photography of [PROPERTY: beach house / cabin / apartment / villa],
golden hour warm light, no HDR tone mapping, documentary quality — appears genuinely lived-in
not freshly staged, surrounding environment visible for location context, human element implied
(open door, light on inside, bicycle leaned against wall), warm natural color grade, no filter
effects, medium format camera aesthetic
```

### Social Stories Format (9:16 Vertical)
```
Vertical 9:16 format travel photography, [DESTINATION TYPE] in soft natural light, sense of
discovery and arrival — suitcase in foreground or traveler at window looking out at view, warm
and inviting color grade, Airbnb community feeling: authentic not aspirationally perfect, space
for text overlay at top and bottom of frame with clear non-cluttered sky or surface, no visible
brand logos, photographic quality not illustration
```

### Airbnb Experiences Format
```
Candid action photography of [EXPERIENCE TYPE: cooking class / hiking tour / art workshop /
local market visit], small group of 3-6 diverse participants engaged in activity with local
host, genuine expressions of engagement and learning — not posed for camera, natural light
preferred or flattering soft studio light, warm color grade, documentary aesthetic, host
teaching or guiding visible in frame, local cultural context visible in background
```

---

## 8. Design Prohibitions

The following practices are explicitly inconsistent with Airbnb's publicly observed design
system and DLS documentation. These prohibitions apply to Airbnb-adjacent creative work
produced under this project.

1. **No hotel-aesthetic photography.** Uniformly made beds photographed from the foot of the
   bed, minibar close-ups, corridor shots, and staged "waiting for guests" setups are the
   visual language Airbnb's brand actively opposes. Every Airbnb photograph should imply
   recent, authentic human habitation (observed on airbnb.com host photography guidelines;
   T4_INFERRED as brand intent from anti-hotel positioning).

2. **No non-Cereal typefaces in brand communications.** Substituting with Circular, Helvetica
   Neue, Inter, or any geometric sans-serif introduces letterform and spacing inconsistencies
   immediately detectable against genuine Airbnb layouts (T4_INFERRED from observed brand
   typographic consistency).

3. **No CTA buttons in colors other than Rausch (#FF5A5F) or approved system variants.**
   Introducing secondary CTA colors (green, blue, purple) creates competing action signals
   that undermine the single-color action discipline of the Airbnb UI system (observed on
   airbnb.com; consistent with Airbnb DLS principles).

4. **No gradient fills applied to UI chrome elements.** The Rausch gradient is confined to the
   Bélo logomark and brand hero moments — applying brand gradients to buttons, cards, section
   backgrounds, or navigation elements is inconsistent with the observed flat UI system (CSS
   extraction; observed on airbnb.com).

5. **No overly saturated or HDR-processed photography.** Airbnb's photographic aesthetic is
   warm and naturalistic — lifted shadows, gentle warmth, slight desaturation. HDR-processed,
   oversaturated, or heavily filtered images are visually inconsistent with the platform's
   documentation quality standard (observed on airbnb.com listing photography).

6. **No text-heavy layouts for consumer-facing content.** Airbnb communicates visually first;
   copy closes the action. Layouts where copy occupies more than 30% of the visual area
   violate the photography-first composition principle (T4_INFERRED from observed design
   patterns across airbnb.com and campaigns).

7. **No use of the Bélo logo mark in derivative works or as a decorative element.** The Bélo
   is a registered trademark (official, USPTO). It may not be recolored outside the approved
   system, distorted, applied as a watermark in third-party creative, or used to imply official
   Airbnb endorsement without authorization (official, Airbnb legal guidelines).

8. **No ALL CAPS headlines.** Airbnb's headline style is consistently sentence case across
   campaign materials, product pages, and the app — ALL CAPS is not observed in any primary
   Airbnb consumer-facing typography (observed on airbnb.com and @airbnb social channels).

9. **No competing brand logos or marks.** Any Airbnb-produced content must not feature
   competitor platform marks, hotel chain logos, or alternative booking platform branding
   in proximity to the Bélo or Airbnb wordmark (T4_INFERRED from standard brand protection
   guidelines).

10. **No income guarantee language in host acquisition content.** Income calculator estimates
    and host earnings figures must carry explicit disclaimers that actual earnings vary and
    are not guaranteed — this is both a brand standard and a legal requirement under FTC
    guidelines on income claims (T4_INFERRED from FTC guidance; observed in Airbnb host
    acquisition content disclaimer practice).

11. **No sharp-corner rectangular buttons.** Airbnb's button system uses fully rounded pill
    shapes for primary CTAs (observed on airbnb.com) and moderately rounded corners (8–12px)
    for secondary and filter buttons. Sharp rectangular buttons are inconsistent with the
    Airbnb UI system.

12. **No stock photography for people.** Airbnb's brand voice depends on authentic human
    presence — real hosts, real guests, real experiences. Generic stock photo expressions
    (posed corporate smiles, forced diversity optics) are inconsistent with the documentary,
    community aesthetic the Airbnb brand requires (observed on Airbnb campaign materials
    and official photography guidelines).

---

*Layer 5 of 8 — Brand Autopsy: Airbnb Inc. (ABNB)*
*Analysis based on publicly accessible sources as of Q1 2025.*
*This is not Airbnb's official Brand Identity Guidelines document.*
*Source tiers applied throughout: (official), (observed on airbnb.com), (CSS extraction), (estimated).*
