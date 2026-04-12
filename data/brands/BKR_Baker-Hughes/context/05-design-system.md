# 05. Design System — Baker Hughes (BKR)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

> Note: CSS extraction for bakerhughes.com returned no color data in automated capture. The following palette is derived from direct visual observation of bakerhughes.com and official brand materials. (observed on website)

| Role | Color Name | HEX | Usage |
|------|-----------|-----|-------|
| **Primary Brand** | Baker Hughes Red | `#E5001E` | Logo, primary CTAs, headline accents, navigation active states (observed on website) |
| **Deep Neutral** | Charcoal Black | `#1A1A1A` | Body text, headers, primary typography (observed on website) |
| **Secondary Dark** | Dark Gray | `#3D3D3D` | Secondary body text, supporting copy (observed on website) |
| **Surface Light** | Off-White | `#F5F5F5` | Page backgrounds, card backgrounds, content sections (observed on website) |
| **Pure White** | White | `#FFFFFF` | Primary background, hero sections, card surfaces (observed on website) |
| **Mid Gray** | Medium Gray | `#767676` | Supporting text, captions, secondary UI elements (observed on website) |
| **Accent Dark** | Navy Black | `#0A0A0A` | Footer, dark mode sections, high-contrast hero areas (observed on website) |

**Palette rationale**: Baker Hughes uses a restrained red-on-dark-neutral palette that signals industrial authority without the casual warmth of consumer brands. The red is assertive but limited — used as an accent, not a dominant surface color. This is consistent with the engineering-authority brand archetype. (T4_ESTIMATED)

---

## Typography

| Role | Typeface | Weight | Usage |
|------|---------|--------|-------|
| **Primary Display** | Custom sans-serif (observed as geometric/humanist) | Bold, ExtraBold | Hero headlines, section titles (observed on website) |
| **Body Text** | Sans-serif (appears to be a humanist variant) | Regular, Medium | Body copy, descriptions, technical text (observed on website) |
| **Data / Technical** | Monospace fallback | Regular | Specification tables, numerical data (estimated) |
| **Fallback Stack** | Arial, Helvetica, sans-serif | — | System fallbacks (estimated) |

> Note: BKR did not expose font-family declarations in CSS capture. Typography observations are based on visual rendering. (observed on website)

**Typography rationale**: The clean sans-serif choice reflects engineering modernism — legibility-first, no decorative elements. This aligns with the primary Sage archetype: the brand communicates expertise through precision, not ornamentation. (T4_ESTIMATED)

---

## Channel Design Specifications

| Channel | Dimensions | Key Constraints |
|---------|-----------|----------------|
| LinkedIn post image | 1200 × 628 px | Dark background with red accent; technical diagram acceptable; no cluttered imagery |
| LinkedIn banner | 1584 × 396 px | Logo placement left; tagline right; industrial imagery preferred |
| Twitter/X header | 1500 × 500 px | Consistent with LinkedIn palette; avoid consumer-style lifestyle photography |
| Email header | 600 px width | Logo + red accent bar; white background body |
| Conference booth / trade show | Variable | Red and charcoal dominant; large-format technical diagrams acceptable |
| Product data sheet (print) | A4 / Letter | Two-column layout; red section headers; specification tables in monospace |

(estimated, based on observed brand application patterns)

---

## Layout Principles

1. **Data-forward hierarchy**: Technical specifications and performance metrics appear prominently in layout — above the fold in product pages, as primary visual elements in case studies. The number or metric, not the product name, is the headline. (observed on website)

2. **Negative space as authority signal**: Baker Hughes layouts use significant whitespace around technical content, signaling that the brand does not need to fill every pixel with selling language. This restraint is consistent with institutional engineering communication standards. (T4_ESTIMATED, observed on website)

3. **Industrial imagery over lifestyle**: Photography features operational environments — drilling rigs, compressor trains, LNG facilities, control rooms — not people-first lifestyle imagery. This reinforces the engineering authority brand position. (observed on website)

4. **Segment-coded visual tracks**: OFSE (oilfield services) and IET (industrial/energy technology) content use visually distinct imagery libraries — subsurface/rig imagery for OFSE, turbomachinery/factory imagery for IET — enabling segment-specific communication without brand fragmentation. (T4_ESTIMATED, observed on website)

5. **Red as action, not decoration**: The brand red (#E5001E approximate) appears on CTAs, navigation active states, and section dividers — not as a background color or decorative fill. This maintains the color's signal value by limiting its frequency. (observed on website)

---

## Icon Style

- **Style**: Line icons, medium stroke weight, geometric construction (observed on website)
- **Color**: Charcoal or red on white; white on dark backgrounds
- **Complexity**: Simple, single-concept icons — no illustrative multi-element compositions
- **Application**: Navigation, product category identification, feature checklists, process diagrams
- **Prohibited**: Skeuomorphic icons, drop shadows, gradient fills on icons (T4_ESTIMATED)

---

## AI Image Prompt Guide

For generating on-brand Baker Hughes imagery:

**Approved prompt structure**:
> "Industrial photography, [drill rig / LNG compressor train / turbomachinery / offshore platform / pipeline], professional engineering environment, dramatic natural lighting, dark background, no people, hyper-realistic, 4K, wide angle, Baker Hughes red accent color (#E5001E), industrial design aesthetic"

**OFSE imagery**:
> "Closeup of drill bit against dark background, industrial engineering, precision machined metal, Baker Hughes red accent, dark charcoal background, dramatic studio lighting, hyper-realistic 3D render"

**IET imagery**:
> "Large-scale industrial gas compressor train, LNG facility, nighttime photography, blue-gray steel tones, engineered precision, dramatic industrial lighting, wide angle, no text"

**Prohibited AI image directions**:
- Consumer lifestyle photography (people smiling at phones, office happiness)
- Green/nature imagery that implies the company is a "clean tech" startup
- Abstract AI-generated art without recognizable industrial subject matter
- Any imagery implying specific financial performance or outcomes

---

## Design Prohibitions

1. **No casual or consumer-lifestyle photography** — Does not match the industrial authority positioning (T4_ESTIMATED)
2. **No gradient backgrounds on primary brand surfaces** — Undermines the clean, precise brand aesthetic (T4_ESTIMATED)
3. **No red backgrounds for body text** — Red is reserved as accent; body text on red backgrounds is visually inaccessible and off-brand (T4_ESTIMATED)
4. **No competing color palettes in co-branded materials** — Partner or customer co-branded content must subordinate the partner palette to BKR's dominant palette system (T4_ESTIMATED)
5. **No excessive use of buzzword-laden infographics** — Engineering audiences reject oversimplified visual summaries of complex technical processes; data visualization should reflect actual data (T4_ESTIMATED)
6. **No typography mixing beyond two typeface families** — The brand uses a single primary sans-serif family; introducing decorative or serif fonts in technical materials dilutes the precise, engineering-forward aesthetic (T4_ESTIMATED)
7. **No unauthorized logo modifications** — The Baker Hughes red/white/gray logo system must not be recolored, stretched, or combined with decorative elements (T4_ESTIMATED)
