# 05. Design System — Lockheed Martin Corporation (LMT)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

Colors observed via CSS analysis of lockheedmartin.com (observed on website):

| Role | Name | HEX | Usage |
|------|------|-----|-------|
| **Primary Brand Blue** | Lockheed Deep Blue | `#093057` | Primary navigation, corporate headers, anchor brand elements |
| **Action Blue** | LMT Action Blue | `#0260AF` | Primary CTAs, links, interactive elements (high-frequency in CSS: 15+ instances) |
| **Mid Blue** | LMT Corporate Blue | `#0360AE` | Secondary navigation, button states, structural UI elements |
| **Dark Charcoal** | LMT Charcoal | `#414042` | Body text, secondary headings (11 instances observed) |
| **Medium Gray** | LMT Gray | `#626365` | Supporting text, captions, meta information |
| **Dark Neutral** | LMT Dark | `#212529` | Primary body text baseline |
| **Light Background** | LMT Off-White | `#F8F9FA` | Page backgrounds, card surfaces |
| **Divider Gray** | LMT Border | `#DEE2E6` | Horizontal rules, card borders, structural dividers |

**Color Philosophy**: The palette is built around deep navy and corporate blue — a deliberate alignment with the U.S. defense and aerospace institutional color language. The blue family signals trustworthiness, precision, and institutional authority. No warm colors appear in primary brand roles; the palette is cold, deliberate, and authority-coded. (T4_INFERRED from observed CSS data)

**Brand Warning**: The `#DC3545` red and `#28A745` green values observed in the CSS are Bootstrap utility colors used for interface states (alerts, success indicators), not brand colors. They should not be used in editorial brand contexts. (observed on website, T4_INFERRED classification)

---

## Typography

**Primary Font Family** (observed on website):
- **DIN 2014 W01 Demi** — Headers, section titles, program names. DIN (Deutsches Institut für Normung) is an industrial standard typeface with deep aerospace and engineering heritage; used by NASA, Airbus, and multiple aerospace organizations. The choice is not arbitrary — it signals technical precision and institutional authority.
- **DIN 2014 W01 Light** — Subheadings, pull quotes, emphasized body text.
- **DIN W01 Regular** — Standard body copy, navigation labels.
- **DIN_2014 W01 Bold** — High-emphasis calls to action, critical data points.

**Fallback Stack**: Roboto → Noto Sans → Arial → Helvetica Neue → sans-serif (observed in CSS)

**Typography Rules**:
- Headline tracking: tight to normal (DIN was designed for technical signage; wide tracking undermines its character)
- Body line-height: 1.5–1.7 for readability at data-dense technical copy lengths
- Minimum body size: 16px for accessibility compliance in government digital contexts
- All-caps usage: reserved for section labels and navigation items only; not for body copy

---

## Channel Design Specifications

| Channel | Spec Notes |
|---------|-----------|
| **Website (lockheedmartin.com)** | Full-bleed photography with aircraft and space imagery; dark overlay on hero images for text legibility; grid-based content cards with consistent padding. (observed on website) |
| **LinkedIn** | 1200×627px link previews; program milestone imagery; employee spotlight photography follows corporate style guide. |
| **Print / Conference Materials** | AUSA, Paris Air Show, Farnborough — large-format display with platform silhouette photography; minimal copy; QR code to digital capability brief. (T4_INFERRED from observed conference presence) |
| **Video / YouTube** | Cinematic aerial photography; high-dynamic-range footage of aircraft at altitude; voiceover uses institutional male or female narrator voice, measured pace. (observed, LMT YouTube channel) |
| **Digital Advertising** | Rarely used in traditional consumer display contexts; when present, government-affairs-oriented messaging around budget cycles and program milestones. (T4_INFERRED) |

---

## Layout Principles

**1. Horizontal-band structure.**
Lockheedmartin.com organizes content in full-width horizontal bands with alternating light and dark backgrounds. Each band contains a single content theme. This creates a structured reading flow suitable for detailed program information without visual clutter. (observed on website)

**2. Photography as primary communicator.**
Platform photography — F-35 at altitude, Orion in space, THAAD launcher at exercise — carries the primary emotional and informational payload. Copy functions as caption and specification, not as the lead narrative device. (observed on website)

**3. Information density calibrated to audience expertise.**
Unlike consumer brands that minimize text, Lockheed Martin maintains moderate-to-high information density on program pages. The audience — procurement officers, engineers, journalists — reads for substance. Oversimplification signals that the brand does not respect the audience's expertise. (T4_INFERRED from observed page structure)

**4. Consistent grid discipline.**
Content cards and data tables follow a strict grid; misaligned elements are absent from the primary website. The visual precision mirrors the precision claimed for the physical products. (observed on website)

**5. Navigation depth over breadth.**
The site architecture prioritizes deep navigation trees by business segment over broad flat menus. This reflects the complexity of the product portfolio and the need for specialized audiences to self-route to relevant program content. (observed on website)

---

## Icon Style

- **Style**: Technical, line-based iconography. No playful or illustrative icons.
- **Weight**: Medium stroke weight; not hairline (unsuitable for dense technical contexts) and not bold (would feel heavy against technical body copy).
- **Sources**: Font Awesome 5 (both Free and Brands sets) observed in CSS — used for standard UI elements (navigation arrows, social media links).
- **Custom icons**: Segment and capability icons on lockheedmartin.com appear to use a bespoke set following the DIN/technical visual language. (observed on website)
- **Prohibited**: Rounded, cartoon, or consumer-app-style icons are incompatible with the institutional design language.

---

## AI Image Prompt Guide

For generating brand-consistent Lockheed Martin imagery:

**Aircraft / Aeronautics**:
> "F-35 Lightning II in flight over mountainous terrain at dusk, dramatic low-angle perspective, motion blur on wingtips, atmospheric haze, photorealistic, cinematic lens compression, no visible markings beyond standard USAF roundel, professional aerospace photography style"

**Space Systems**:
> "Orion spacecraft in deep space against star field, Earth limb visible in background upper left, high-contrast lighting from simulated sun source, photorealistic CGI render, no text overlays, NASA/Lockheed Martin mission imagery style"

**Engineering / Skunk Works**:
> "Aerospace engineer in cleanroom environment examining aircraft component, shallow depth of field, blue-toned industrial lighting, professional documentary photography, safety equipment visible, no faces clearly identifiable"

**Abstract / Technology**:
> "Digital data visualization of sensor fusion network over dark background, blue and white node connections, deep space aesthetic, no human figures, technical diagram style, Lockheed Martin brand blue palette (#093057, #0260AF)"

---

## Design Prohibitions

1. **No warm color brand elements** — Red and orange do not appear in Lockheed Martin's primary brand palette; their use in editorial contexts conflicts with the cold-precision visual language. (T4_INFERRED)
2. **No consumer-style illustration** — Flat design characters, cartoon illustration, or lifestyle photography with consumer aesthetic are incompatible with the institutional brand register. (T4_INFERRED)
3. **No unofficial font substitution** — Using Arial or Helvetica as a DIN substitute in brand materials undermines the typographic authority of the design system. (T4_INFERRED)
4. **No low-resolution platform imagery** — Aircraft and space systems photography must be high-resolution and technically accurate; composited or obviously CGI imagery without high production values signals low institutional quality. (T4_INFERRED)
5. **No busy or cluttered layouts** — Information density is appropriate, but visual clutter (too many competing elements in a single viewport) is inconsistent with the precision brand claim. (observed on website as negative example avoidance)
6. **No stock photography of generic business people** — Corporate people photography at Lockheed Martin uses actual employees in actual working environments (cleanrooms, hangars, test facilities). Generic stock imagery is inconsistent with the authenticity claim of the brand. (T4_INFERRED from observed LMT photography style)
7. **No competitor platform imagery in any brand context** — Including imagery of Boeing, Northrop Grumman, or other competitor systems in LMT content creates confusion and legal exposure. (T4_INFERRED)
