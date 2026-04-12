# 05. Design System — AppLovin Corporation (APP)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

Observed from applovin.com CSS data capture. Colors listed by frequency of appearance.

| Role | Color Name | HEX | Usage |
|------|-----------|-----|-------|
| **Primary Dark Background** | Deep Indigo | `#181625` | Hero backgrounds, dark-mode sections, navigation bar. Dominant background color establishing the dark, technical aesthetic. (observed on applovin.com) |
| **Primary Accent Purple** | AppLovin Purple | `#A15AF0` | Primary CTA buttons, highlighted elements, brand accent. The most distinctive brand color — signals AI/tech energy. (observed on applovin.com) |
| **Primary Accent Blue** | Electric Blue | `#105FFB` | Secondary CTAs, links, interactive elements, gradient starts. (observed on applovin.com) |
| **Mid Blue** | Brand Blue | `#3B5EF8` | Gradient midpoints, hover states, icon fills. (observed on applovin.com) |
| **Light Background** | Off-White | `#F7F8FC` | Light-mode section backgrounds, card surfaces. (observed on applovin.com) |
| **Teal Accent** | Data Teal | `#099AC6` | Data visualization accents, secondary highlights, chart fills. (observed on applovin.com) |
| **Light Blue** | Sky Blue | `#68A7FF` | Gradient endpoints, illustrative highlights, secondary accent. (observed on applovin.com) |
| **Light Border** | Cool Gray | `#D3D9E7` | Card borders, dividers, form outlines on light backgrounds. (observed on applovin.com) |
| **Body Text Dark** | Near-Black | `#212121` | Primary body text on light backgrounds. (observed on applovin.com) |
| **Secondary Text** | Slate | `#4A5568` | Captions, metadata, secondary copy on light backgrounds. (observed on applovin.com) |

**Color System Logic**: AppLovin's palette is a dark-tech aesthetic — deep indigo backgrounds with purple-to-blue gradient accents. This positions the brand visually alongside AI/ML-forward technology companies (Figma, Linear, Vercel) rather than the warmer, consumer-friendly palettes of conventional ad platforms. The purple accent (`#A15AF0`) is the brand's most distinctive and recognizable color element. (T4_INFERRED from observed design system)

---

## Typography

| Role | Typeface | Weight | Observed Usage |
|------|----------|--------|----------------|
| **Primary Brand Font** | Mont (custom/licensed) | ExtraLight through Black (full range) | Headlines, hero copy, display text. The Mont family variants (MontBold, MontSemiBold, MontHeavy) are the primary brand typeface. (observed on applovin.com CSS) |
| **Secondary Sans** | DM Sans | Regular, Medium, Bold | Body text, UI copy, product documentation. (observed on applovin.com CSS) |
| **Code/Monospace** | SFMono-Regular, Consolas, Courier New | Regular | Developer documentation, API references, code samples. (observed on applovin.com CSS) |
| **Fallback** | Arial, Helvetica, sans-serif | Various | System fallback stack. (observed on applovin.com CSS) |

**Typography notes**: The Mont typeface family — a geometric sans-serif with strong optical weight variation — gives AppLovin's headlines a distinctive visual identity. The combination of Mont for display and DM Sans for body creates a clear hierarchy: bold geometric statements at the headline level, clean readable text in the body. This is a common pattern among growth-stage tech brands establishing visual identity. (T4_INFERRED from observed design patterns)

---

## Channel Specifications

| Channel | Dimensions | Format | Notes |
|---------|-----------|--------|-------|
| Website hero | 1440×800px (desktop) | Dark background + gradient + headline | Full-width; deep indigo or gradient background (observed on applovin.com) |
| LinkedIn cover | 1128×191px | Brand gradient | Corporate communications; product announcements |
| Twitter/X header | 1500×500px | Brand dark + product imagery | Product announcements; industry commentary |
| Presentation slides | 16:9 widescreen | Dark theme; brand gradient accents | Investor presentations; conference sessions; GDC materials |
| Developer documentation | — | Light mode; code blocks; structured layout | SDK integration guides; API documentation (observed on dev.applovin.com) |
| Display advertising | Various IAB standard sizes | Dark background + purple/blue gradient CTA | Performance marketing for B2B developer audience |

---

## Layout Principles

**1. Dark-first aesthetic with purposeful light-mode sections.**
AppLovin's primary web aesthetic is dark backgrounds with gradient overlays. Light-mode sections appear for content-dense areas (blog posts, documentation) where readability requires it. The contrast between dark brand sections and light content sections creates visual hierarchy and navigation clarity. (observed on applovin.com)

**2. Gradient as the brand motion signal.**
Purple-to-blue gradients (`#A15AF0` → `#105FFB` → `#3B5EF8`) appear on hero backgrounds, CTA buttons, and section transitions. The gradient is not merely decorative — it signals energy, forward motion, and the "AI magic" brand narrative. It is AppLovin's visual equivalent of Apple's product photography: the distinctive element that makes the brand identifiable at a glance. (T4_INFERRED from observed design patterns)

**3. Metric callouts as hero visual elements.**
Large-format numbers (DAU scale, publisher count, revenue growth statistics) are used as visual anchors in hero and feature sections. These are not buried in body copy — they are typographically dominant. This converts AppLovin's scale into a design element. (observed on applovin.com)

**4. Developer documentation uses opposing visual language.**
The developer portal (dev.applovin.com) uses a lighter, more neutral design — consistent with developer tool conventions (GitHub, Stripe Docs, Twilio) — that differs from the brand marketing site. This dual-aesthetic approach is appropriate: developers trust utility design; marketers respond to brand design. (observed on dev.applovin.com)

---

## Icon Style

- **Style**: Filled geometric icons with rounded corners; gradient fills matching brand palette; minimal detail.
- **Color**: Purple-to-blue gradient fills for primary icons; white outline on dark backgrounds.
- **Application**: Feature section icons, product category markers, navigation indicators, app store category representations.
- **Prohibitions**: Flat monochrome icons without gradient treatment appear off-brand; overly complex line icons dilute the bold visual identity. (T4_INFERRED from observed icon system)

---

## AI Image Prompt Guide

When generating visual assets in the AppLovin brand context:

**For hero/brand content**:
> "Digital art / abstract 3D visualization. Dark indigo background (#181625). Glowing purple and blue geometric shapes — spheres, data nodes, connecting lines suggesting neural network or data flow. Gradient color transitions: purple (#A15AF0) to electric blue (#105FFB). High contrast. Futuristic, clean, not cluttered. Tech company aesthetic. NOT stock photo. No human figures."

**For product/platform content**:
> "Clean UI mockup screenshot style. Dark mode interface. Purple accent buttons. Data visualization dashboard with metrics: ROAS, eCPM, install count. Clean sans-serif typography (Mont or similar geometric). Professional ad tech product aesthetic."

**For developer/documentation content**:
> "Light background. Code editor aesthetic. Clean layout. Neutral color palette with purple accent (#A15AF0) for highlights. Technical, utility-first. Developer tool visual language — similar to Stripe or GitHub documentation aesthetics."

---

## Design Prohibitions

1. **Warm color palettes**: Orange, red, or yellow accents are inconsistent with AppLovin's cold-tech indigo/purple/blue system and suggest consumer brand aesthetics that conflict with the B2B developer positioning. (T4_INFERRED)
2. **Stock photography of generic "technology" subjects**: Hands on keyboards, glowing server racks, or abstract circuit boards as decorative elements signal generic tech branding. AppLovin's visual identity is abstract-geometric and data-visualization-based. (T4_INFERRED from observed design preferences)
3. **Light backgrounds as primary brand surfaces**: Light-mode backgrounds in brand/hero contexts conflict with the dark aesthetic that defines AppLovin's visual identity. Light mode is reserved for content-heavy functional contexts. (T4_INFERRED)
4. **Off-brand typography**: Using fonts outside the Mont / DM Sans system in brand contexts fragments visual consistency. (T4_INFERRED)
5. **Flat unweighted metrics presentation**: AppLovin's key metrics (network scale, publisher count, ROAS benchmarks) carry brand weight; presenting them in small, unemphasized type undermines the scale narrative. (T4_INFERRED)
6. **Cluttered layouts with multiple competing CTAs**: AppLovin's conversion architecture is designed around a single primary action per section; competing CTAs reduce conversion clarity. (T4_INFERRED from observed web layout structure)
