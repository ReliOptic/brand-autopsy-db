# 05. Design System — Northrop Grumman Corporation (NOC)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

Colors observed via CSS analysis of northropgrumman.com (observed on website):

| Role | Name | HEX | Usage |
|------|------|-----|-------|
| **Primary Brand Blue** | NOC Primary Blue | `#00269A` | Primary navigation, headers, anchor brand elements (122 instances — highest frequency color) |
| **Deep Blue Variant** | NOC Deep Blue | `#002699` | Secondary navigation, button hover states, structural elements (52 instances) |
| **Navy Anchor** | NOC Navy | `#002554` | Dark backgrounds, footer, deep brand contexts (45 instances) |
| **Action Blue** | NOC Interactive | `#194AE0` | CTA buttons, active links, interactive elements (34 instances) |
| **Light Background** | NOC Cloud | `#E9EBED` | Page section backgrounds, card surfaces (132 instances — most common background) |
| **Dark Text** | NOC Charcoal | `#1E1E1E` | Primary body text (87 instances) |
| **Near Black** | NOC Black | `#222222` | Headlines, high-contrast text elements (64 instances) |
| **Mid Gray** | NOC Gray | `#757575` | Supporting text, metadata, captions (37 instances) |
| **Interface Gray** | NOC UI Gray | `#7C878E` | UI component borders and secondary interface elements (26 instances) |

**Color Philosophy**: Northrop Grumman's palette is built around a concentrated navy and royal blue family — deeper and more saturated than most defense primes. The `#00269A` primary blue reads as authoritative and technically precise without the corporate coolness of a lighter blue. The light gray background (`#E9EBED`) creates a clean, almost clinical neutrality that lets platform photography and technical content carry visual weight. (T4_INFERRED from observed CSS data)

**Typography-Color Interaction**: The near-black text on light gray background creates high contrast without the harshness of pure black on white — a subtle refinement consistent with a premium institutional design approach. (T4_INFERRED)

---

## Typography

**Primary Font Family** (observed on website):
- **Futura Maxi** (also `futura-maxi`, `futura-pt`, `futura-pt-bold`, `futura-pt-condensed`) — Primary headline and display typeface. Futura is a geometric sans-serif with strong aerospace design heritage (used historically by NASA and multiple aeronautics organizations). Its geometric precision and technical authority align with Northrop Grumman's engineering brand. Multiple Futura weights and variants are loaded, indicating a comprehensive typographic system.
- **Gobold** — Secondary display typeface for high-impact headers, program names, and campaign contexts. A geometric bold face with strong visual presence.
- **Lato** — Body copy and secondary content. A humanist sans-serif that improves readability at paragraph length compared to geometric faces.
- **Open Sans** — Tertiary readable face for data-dense contexts.

**Fallback Stack**: Helvetica Neue → Helvetica → Arial → sans-serif (observed in CSS)

**Typography Rules**:
- Futura Maxi carries the brand authority in display contexts; Lato/Open Sans handle readability in body content
- Futura's geometric letterforms align with the precision and technical character of Northrop Grumman's brand — the typeface choice is itself a signal of technical sophistication
- All-caps is acceptable for program names and section labels in Futura; body copy should not use all-caps for readability

---

## Channel Design Specifications

| Channel | Spec Notes |
|---------|-----------|
| **Website (northropgrumman.com)** | Full-bleed photography; deep navy and royal blue section bands; Futura display headers over program imagery; clean grid structure. (observed on website) |
| **LinkedIn** | 1200×627px link preview images; program milestone photography; B-21 imagery used extensively for brand authority. (observed, NOC LinkedIn) |
| **Print / Conference** | AFA, Space Symposium, AUSA — large-format displays with platform silhouette or space imagery; Futura headlines; minimal copy. (T4_INFERRED from observed conference presence) |
| **Video / YouTube** | Cinematic aerial footage; deep-space imagery from James Webb; dramatic lighting for aircraft reveals; measured voiceover pace with institutional register. (observed, NOC YouTube) |
| **JWST public imagery** | NASA/ESA/CSA/STScI public domain imagery used with attribution; color-processed deep-field images are NOC's highest-impact visual asset for general audience engagement. (T3_SECONDARY_RELIABLE, NASA image use policy) |

---

## Layout Principles

**1. Deep blue anchoring.**
Northrop Grumman uses deeper, more saturated blues than most defense primes — the `#00269A` primary is closer to royal blue than corporate slate. This creates a more visually distinctive presence at events and in digital contexts where LMT's lighter blues and Boeing's blue-and-orange are competing visual languages. (T4_INFERRED from observed CSS data)

**2. Photography-led layout with technical depth below the fold.**
Hero sections lead with full-bleed platform or space photography; technical specification content and capability detail appear in structured bands below. This serves both audiences: the mission-narrative audience engages at the visual level; the procurement-evaluation audience reads deeper. (observed on northropgrumman.com)

**3. Program-organized information architecture.**
The site navigation organizes content primarily by capability/program rather than by market vertical, reflecting an audience that thinks in terms of programs and mission areas rather than industry sectors. (observed on northropgrumman.com)

**4. Consistent white-space discipline.**
Despite the information density appropriate for a defense prime's program content, layout maintains consistent margins and padding — signaling organizational discipline that mirrors the precision claimed for its engineering. (observed on northropgrumman.com)

**5. Space imagery as visual culture.**
Northrop Grumman's use of James Webb Space Telescope imagery in its corporate and social media communications gives it a visual identity element that no other defense prime can replicate: scientifically accurate, publicly recognized, inherently dramatic photography that simultaneously serves as proof of engineering capability. (T4_INFERRED from observed NOC social media strategy)

---

## Icon Style

- **Style**: Technical, precise, geometric — consistent with the Futura typeface language.
- **Weight**: Medium to medium-heavy stroke weight; not hairline.
- **Sources**: OasisIcons (custom NOC icon set observed in CSS), Font Awesome (standard UI elements), proprietary segment/capability iconography.
- **Custom icons**: NOC appears to maintain a bespoke iconographic system for segment and capability navigation, following the geometric visual language of Futura. (observed on northropgrumman.com)
- **Prohibited**: Rounded, playful, or consumer-app icon aesthetics are incompatible with the institutional precision design language.

---

## AI Image Prompt Guide

**B-21 Raider / Stealth Aircraft**:
> "B-21 Raider flying-wing stealth bomber in flight over high desert terrain, dawn lighting, long-lens compression, dramatic cloud formation background, photorealistic, cinematic aviation photography style, no visible markings beyond standard USAF roundel"

**Space Systems / James Webb Heritage**:
> "Deep space nebula rendered in James Webb Space Telescope color palette — infrared-mapped to visible spectrum, dense star field, luminous gas clouds, extreme resolution, no text overlays, scientific visualization style"

**Engineering / Manufacturing**:
> "Aerospace technician in Northrop Grumman cleanroom working on composite aircraft panel, blue NOC brand color workplace signage visible in background, professional documentary photography style, shallow depth of field, safety equipment visible"

**Abstract / Brand**:
> "Geometric abstract visualization of stealth aircraft radar cross-section, dark background, NOC brand blue (#00269A) tone, technical diagram aesthetic, no text, precision line work"

---

## Design Prohibitions

1. **No warm color primary elements** — Red, orange, and yellow are absent from Northrop Grumman's primary brand palette; their use in editorial brand contexts conflicts with the cold-precision visual language. (T4_INFERRED)
2. **No consumer illustration or cartoon styles** — Incompatible with the institutional register of the brand and its government audience expectations. (T4_INFERRED)
3. **No unauthorized use of James Webb imagery** — JWST imagery is NASA/ESA/CSA public domain but requires proper attribution; misattribution creates legal and reputational risk. (T3_SECONDARY_RELIABLE, NASA image use policy)
4. **No competitor platform imagery** — Including Boeing, Lockheed Martin, or other competitor aircraft or space systems in NOC brand content creates confusion and legal exposure. (T4_INFERRED)
5. **No Futura substitution with generic sans-serif** — Helvetica or Arial as a substitute for Futura loses the geometric precision signal that the typeface carries; it should not be substituted in brand-critical headline contexts. (T4_INFERRED)
6. **No low-resolution classified-adjacent imagery** — Any imagery that could suggest classified program content but is not officially released creates security and legal risk. (operational security consideration)
7. **No stock photography with obvious inauthenticity** — Northrop Grumman's photography uses actual facilities, actual platforms, and actual employees. Generic stock imagery undermines the credibility signals built through authentic documentation. (T4_INFERRED)
