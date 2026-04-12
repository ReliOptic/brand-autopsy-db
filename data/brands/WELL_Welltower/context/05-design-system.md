# 05. Design System Spec — Welltower Inc. (WELL)

---

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It is not investment advice, legal advice, or a substitute for Welltower's official brand
> guidelines. All design observations are based on publicly accessible sources: welltower.com,
> CSS extraction from welltower.com, and official investor materials. Color codes, spacing values,
> and typographic specifications are observed or estimated from public-facing assets and do not
> constitute Welltower's internal style guide. Source notation: `(official)` = company-published
> content; `(observed on welltower.com)` = direct page observation; `(CSS extraction)` = values
> parsed from publicly accessible stylesheets; `(estimated)` = project inference from observable
> patterns. All estimates are labeled as such.

---

## 1. Color Palette

Welltower's color system, as extracted from welltower.com CSS and observed across investor
materials, reflects a dual identity: corporate-institutional professionalism with a healthcare-
oriented accent palette. The design language is notably more contemporary than typical REIT
corporate sites, suggesting a deliberate brand investment in digital presentation. (T4_INFERRED)

### Core Brand Colors

| Token Name | HEX | Frequency | Role | Specific Usage |
|---|---|---|---|---|
| `color-well-dark` | `#313131` | High | Primary Text | Headlines, body copy, navigation text across welltower.com (CSS extraction) |
| `color-well-charcoal` | `#32373C` | High | Secondary Text / UI | Subtle text variants, form elements, secondary navigation (CSS extraction) |
| `color-well-teal-primary` | `#004A59` | Medium | Brand Primary | Deep teal used as primary brand color in headers, CTAs, and investor presentation title slides. Conveys institutional authority with healthcare warmth. (CSS extraction; observed on welltower.com) |
| `color-well-green-accent` | `#00D084` | Medium | Accent / Growth Signal | Bright green used for positive data indicators, growth metrics, and interactive elements. In financial context, this reads as "positive performance." (CSS extraction) |
| `color-well-blue-link` | `#0693E3` | Medium | Interactive / Link | Hyperlinks, clickable elements, and data visualization accent. Standard corporate blue. (CSS extraction) |
| `color-well-blue-deep` | `#007CBA` | Low-Medium | CTA / Button Primary | Primary action buttons and key navigation elements (CSS extraction) |
| `color-well-blue-darker` | `#006BA1` | Low | Hover / Active State | Button hover states and active navigation indicators (CSS extraction) |
| `color-well-blue-darkest` | `#005A87` | Low | Footer / Dense UI | Footer backgrounds, dense information sections (CSS extraction) |
| `color-well-light` | `#DDDDDD` | Medium | Borders / Dividers | Section dividers, table borders, card outlines (CSS extraction) |

### Extended Palette — Gradient & Accent Colors

| Token Name | HEX | Role | Specific Usage |
|---|---|---|---|
| `color-well-cyan` | `#34E2E4` | Gradient Accent | Used in gradient treatments for hero sections and decorative backgrounds. Paired with teal primary for depth. (CSS extraction) |
| `color-well-cyan-alt` | `#31CDCF` | Gradient Accent Variant | Secondary cyan for gradient endpoints and data visualization (CSS extraction) |
| `color-well-purple-primary` | `#7A00DF` | Innovation / Highlight | Used sparingly for innovation-related content sections and data callouts (CSS extraction) |
| `color-well-purple-deep` | `#330968` | Background Accent | Dark purple for section backgrounds and gradient anchors (CSS extraction) |
| `color-well-indigo` | `#4721FB` | Data Visualization | Chart accent color for financial data presentations (CSS extraction) |
| `color-well-violet` | `#AB1DFE` | Data Visualization | Secondary chart color and gradient component (CSS extraction) |
| `color-well-peach` | `#FAACA8` | Warm Accent | Soft accent for healthcare/wellness-related sections and decorative elements (CSS extraction) |
| `color-well-lavender` | `#DAD0EC` | Background Tint | Light background tint for content sections, creating visual hierarchy (CSS extraction) |
| `color-well-cream` | `#FAFAE1` | Background Tint | Warm background for testimonial or quote sections (CSS extraction) |
| `color-well-sage` | `#67A671` | Healthcare / Nature | Green accent reinforcing healthcare and wellness theme (CSS extraction) |
| `color-well-gold` | `#FDD79A` | Highlight / Award | Used for premium indicators, award badges, and highlight text (CSS extraction) |

### Color Strategy Analysis

The palette reveals a design approach notably more vibrant than typical REIT corporate sites (T4_INFERRED):

1. **Deep teal as institutional anchor** (`#004A59`): This is the most brand-distinctive color. Deep teal conveys both the seriousness of institutional finance and the warmth associated with healthcare. It avoids the cold navy blue that dominates financial services design. (T4_INFERRED)

2. **Gradient-forward design**: The presence of multiple cyan, purple, and gradient-endpoint colors (`#34E2E4`, `#31CDCF`, `#4721FB`, `#AB1DFE`) indicates Welltower employs CSS gradient treatments — a contemporary design choice more common in tech startups than REITs. This suggests a deliberate effort to signal modernity and innovation within an otherwise conservative sector. (T4_INFERRED from CSS extraction)

3. **Warm accent layer**: Peach (`#FAACA8`), cream (`#FAFAE1`), and sage (`#67A671`) create a warm, human layer that softens the institutional base palette. These colors likely appear in sections discussing healthcare outcomes, community impact, or ESG content. (T4_INFERRED from color associations)

4. **No red**: The absence of red from the palette is notable. In healthcare contexts, red carries negative associations (emergency, danger, blood). Welltower's palette avoids this entirely, using warm peach as the closest warm-spectrum color. (T4_INFERRED)

---

## 2. Typography

### Primary Typefaces

| Font Name | Classification | Usage | Source |
|-----------|---------------|-------|--------|
| **PP-Formula** | Sans-serif display | Headlines, hero text, section titles. PP-Formula is a contemporary geometric sans-serif from Pangram Pangram Foundry. It is a paid commercial typeface, indicating investment in typographic distinctiveness beyond system fonts. (CSS extraction) |
| **Tobias** | Serif body/accent | Body copy, pull quotes, editorial-style content. Tobias is a serif typeface from Klim Type Foundry, designed by David Jonathan Ross. Its use signals editorial sophistication — a deliberate departure from the sans-serif-only approach typical of corporate/financial websites. (CSS extraction) |
| **slick** | Utility | Associated with the Slick carousel/slider JavaScript library. Used for property image galleries and investor presentation carousels. Not a typographic choice but a UI component dependency. (CSS extraction) |

### Typographic Strategy Analysis

The combination of PP-Formula (geometric sans-serif) and Tobias (humanist serif) is a sophisticated typographic pairing that indicates professional design direction (T4_INFERRED):

1. **PP-Formula for authority**: The geometric, structured forms of PP-Formula project precision and institutional confidence. Its use in headlines establishes visual authority before the reader processes content. (T4_INFERRED)

2. **Tobias for editorial credibility**: Serif typefaces in body copy signal editorial seriousness — newspapers, annual reports, and academic journals use serifs. By pairing a serif body face with a sans-serif display face, Welltower's design system communicates "institutional authority that also has something substantive to say." (T4_INFERRED)

3. **Commercial typeface investment**: Both PP-Formula and Tobias are commercial typefaces requiring licensing fees. This investment distinguishes Welltower from peers that may use system fonts (Arial, Helvetica) or free alternatives (Inter, Open Sans). The choice indicates that brand design is a deliberate strategic investment, not an afterthought. (T4_INFERRED)

### Estimated Typographic Scale

| Element | Font | Weight | Size (estimated) | Line Height (estimated) |
|---------|------|--------|-------------------|------------------------|
| Hero headline | PP-Formula | Bold/Black | 48-64px | 1.1-1.2 |
| Section heading (H2) | PP-Formula | Bold | 32-40px | 1.2-1.3 |
| Subsection heading (H3) | PP-Formula | Semibold | 24-28px | 1.3 |
| Body copy | Tobias | Regular | 16-18px | 1.5-1.6 |
| Caption/metadata | PP-Formula | Regular | 12-14px | 1.4 |
| Navigation | PP-Formula | Medium | 14-16px | 1.0 |

Source: (estimated from observed rendering on welltower.com; exact values may differ from internal specifications)

---

## 3. Layout & Grid System

### Observed Layout Patterns

Based on observation of welltower.com (observed on welltower.com):

| Pattern | Description |
|---------|-------------|
| **Full-width hero** | Homepage opens with a full-viewport hero section, typically featuring property photography or a video background with overlaid headline text in PP-Formula. (observed on welltower.com) |
| **Two-column content** | Interior pages use a primary content column (~65-70% width) with a sidebar or supplementary column (~30-35% width) for navigation, data callouts, or related links. (estimated from observed layout) |
| **Card-based portfolio** | Property portfolio and news sections use card-based layouts with consistent spacing, image-to-text ratios, and subtle shadow/border treatments. (observed on welltower.com) |
| **Data-dense tables** | Investor relations pages present financial data in clean, bordered tables with alternating row colors or subtle background fills for readability. (observed on welltower.com) |
| **Full-bleed section breaks** | Content sections are separated by full-width background color changes (teal-to-white, white-to-light-grey), creating visual rhythm without heavy border elements. (observed on welltower.com) |

### Estimated Spacing System

| Token | Value (estimated) | Usage |
|-------|-------------------|-------|
| Base unit | 8px | Fundamental spacing increment (estimated) |
| Section padding | 80-120px vertical | Space between major content sections (estimated) |
| Card padding | 24-32px | Internal padding within card components (estimated) |
| Grid gutter | 24-32px | Space between grid columns (estimated) |
| Max content width | ~1200-1400px | Maximum width of content container (estimated) |

---

## 4. Imagery & Photography

### Photography Style

| Category | Treatment | Usage |
|----------|-----------|-------|
| **Property exterior** | Clean, daylight photography with blue-sky backgrounds. Properties are photographed at oblique angles to show scale and landscaping. Professional commercial photography quality. (observed on welltower.com) |
| **Property interior** | Bright, naturally-lit interiors showing common spaces (lobbies, dining rooms, activity rooms) in senior housing communities. Furniture is staged; residents may be absent or shown at distance. (observed on welltower.com) |
| **People** | When present, people are shown in healthcare or lifestyle contexts — seniors engaged in activities, healthcare workers providing care. Photography is warm and optimistic in tone. (observed on welltower.com) |
| **Corporate/leadership** | Executive headshots and team photos follow standard corporate photography conventions — professional attire, neutral backgrounds, direct gaze. (observed on welltower.com) |
| **Aerial/landscape** | Some portfolio overview sections use aerial photography of properties or campus-style developments, emphasizing scale. (observed on welltower.com) |

### Photography Principles (T4_INFERRED from observed patterns)

1. **Warmth without sentimentality**: Property interiors are warm and inviting but not overly emotional. The imagery suggests comfort and quality without the saccharine quality that sometimes characterizes senior housing marketing.
2. **Scale signals**: Aerial and wide-angle photography emphasizes portfolio scale — reinforcing the "infrastructure" positioning over individual property marketing.
3. **Healthcare absent from imagery**: Despite being a healthcare REIT, Welltower's photography avoids clinical imagery (hospital beds, medical equipment, clinical staff in scrubs). This positions the brand as "healthcare infrastructure" rather than "healthcare delivery." (T4_INFERRED)

---

## 5. Iconography & UI Elements

### Observed UI Patterns

| Element | Style | Source |
|---------|-------|--------|
| Navigation | Horizontal top navigation with dropdown menus; clean, minimal design with PP-Formula typeface. (observed on welltower.com) |
| Buttons | Rounded-rectangle buttons with fill colors from the primary palette (teal, blue). Text in white or light color. (observed on welltower.com) |
| Icons | Minimal icon usage; when present, icons are simple line-style representations (location pins, phone, email, document). (observed on welltower.com) |
| Data indicators | Financial metrics presented with large numerals in PP-Formula, often accompanied by trend arrows or percentage badges in green (#00D084). (observed on welltower.com) |
| Carousel/slider | Property galleries use a carousel component (Slick library), with dots or arrows for navigation. (CSS extraction, slick font reference) |

---

## 6. Investor Presentation Design

Welltower's investor presentations follow a distinct design system that differs from the website:

| Element | Treatment | Source |
|---------|-----------|--------|
| Slide backgrounds | Mix of white, deep teal (#004A59), and gradient treatments using the extended palette. (T2_PRIMARY_RELIABLE, observed in public investor presentations) |
| Data visualization | Bar charts, line charts, and pie charts use the blue-green-purple palette. Charts are clean with minimal gridlines. (T2_PRIMARY_RELIABLE, investor presentations) |
| Typography | Presentation decks use sans-serif typefaces (likely PP-Formula or a presentation-compatible alternative). Headlines are bold; data labels are regular weight. (T2_PRIMARY_RELIABLE) |
| Portfolio maps | Geographic portfolio distribution shown on US/international maps with color-coded dots by property type. (T2_PRIMARY_RELIABLE, investor presentations) |
| Operator logos | Operator partner logos (Sunrise, Cogir, etc.) arranged in grid format to signal partnership breadth. (T2_PRIMARY_RELIABLE, investor presentations) |
| Demographic charts | Population growth projections shown in large, branded chart formats — often the opening slides, establishing the investment thesis visually. (T2_PRIMARY_RELIABLE) |

---

## 7. Design System Assessment

### Strengths (T4_INFERRED)

1. **Typographic investment**: The use of commercial typefaces (PP-Formula, Tobias) signals brand seriousness and distinguishes Welltower from commodity corporate design.
2. **Contemporary palette**: The gradient treatments and vibrant accent colors position Welltower as a modern company, counteracting the "boring REIT" perception.
3. **Healthcare-institutional balance**: The teal-based palette successfully bridges healthcare warmth and financial authority.
4. **Photography quality**: Property photography is professionally executed and consistently styled.

### Areas for Development (T4_INFERRED)

1. **Design system documentation**: There is no publicly available design system or brand guidelines document. For a company of Welltower's scale, a public brand asset library would support consistent partner communications.
2. **Investor presentation consistency**: Presentation designs vary somewhat across quarters and conferences, suggesting opportunities for greater template standardization.
3. **Accessibility**: The contrast ratio of some color combinations (e.g., light text on gradient backgrounds) may not meet WCAG 2.1 AA standards (estimated, not tested).
4. **Dark mode**: welltower.com does not appear to offer a dark mode variant, which is increasingly expected in modern web design (estimated from observation).

---

## 8. Competitor Design Comparison

| Design Element | Welltower (WELL) | Ventas (VTR) | Healthpeak (DOC) |
|----------------|------------------|--------------|------------------|
| Primary brand color | Deep teal (#004A59) | Navy blue | Green/teal |
| Typography | Commercial (PP-Formula + Tobias) | Standard sans-serif (estimated) | Standard sans-serif (estimated) |
| Gradient usage | Extensive | Minimal (estimated) | Minimal (estimated) |
| Photography style | Warm, property-focused | Similar, property-focused (estimated) | Similar, property-focused (estimated) |
| Overall design quality | Above healthcare REIT average | Average for sector (estimated) | Average for sector (estimated) |

Source: (observed on respective company websites; T4_INFERRED for comparative assessments; competitor observations are estimated based on general observation)

Welltower's digital design investment appears to exceed the healthcare REIT sector norm, suggesting that brand presentation is treated as a strategic priority rather than a compliance necessity. (T4_INFERRED)

---

*Layer 5 — Design System Spec | Brand Autopsy DB Project*
*Source tier system: T1_OFFICIAL (SEC filings/official) | T2_PRIMARY_RELIABLE | T3_SECONDARY_RELIABLE | T4_INFERRED (project analysis)*
*CSS color data extracted from publicly accessible stylesheets on welltower.com. All design observations are from public-facing assets.*
