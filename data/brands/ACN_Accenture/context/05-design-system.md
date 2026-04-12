# 05. Design System — Accenture plc (ACN)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Color Palette

The following colors are derived from observed Accenture brand materials including the accenture.com website and official corporate communications. (observed on website)

| Color Name | HEX | RGB | Usage | Source |
|------------|-----|-----|-------|--------|
| **Accenture Purple** | #A100FF | rgb(161, 0, 255) | Primary brand color; logo, hero accents, CTAs, brand emphasis | observed on accenture.com |
| **Deep Purple** | #7500C0 | rgb(117, 0, 192) | Hover states, secondary emphasis, gradient anchor | observed on accenture.com |
| **Black** | #000000 | rgb(0, 0, 0) | Primary text, headers, footer backgrounds | observed on accenture.com |
| **Dark Gray** | #333333 | rgb(51, 51, 51) | Body text, secondary content areas | observed on accenture.com |
| **Mid Gray** | #757575 | rgb(117, 117, 117) | Tertiary text, metadata, captions | observed on accenture.com |
| **Light Gray** | #F2F2F2 | rgb(242, 242, 242) | Section backgrounds, card backgrounds, dividers | observed on accenture.com |
| **White** | #FFFFFF | rgb(255, 255, 255) | Primary background, reversed text on dark/purple surfaces | observed on accenture.com |
| **Electric Blue** | #0041C2 | rgb(0, 65, 194) | Data visualizations, hyperlinks, informational callouts | observed on accenture.com |

### Color Usage Rules

- **Accenture Purple (#A100FF)** is the signature brand color. It is used sparingly to create impact — not as a background fill but as a highlight, accent, and CTA color. Overuse dilutes the distinctiveness. (T4_INFERRED)
- **Purple-to-black gradients** are used in hero sections and immersive content experiences. These gradients move from #A100FF to #000000, creating a depth effect. (observed on accenture.com)
- **All text on colored backgrounds** must meet WCAG 2.1 AA contrast ratio minimums. White text on Accenture Purple passes AA for large text but may require Deep Purple for normal body text. (T4_INFERRED)

---

## Typography

| Role | Typeface | Weight | Size Range | Notes |
|------|----------|--------|------------|-------|
| **Primary Display** | Graphik (licensed) | Bold (700) | 36–80px | Hero headlines, major section titles. Clean geometric sans-serif. (observed on accenture.com) |
| **Secondary Heading** | Graphik | Semibold (600) | 22–36px | Section subheadings, card titles, feature callouts (observed on accenture.com) |
| **Body Text** | Graphik | Regular (400) | 15–18px | All body copy, descriptions, report text (observed on accenture.com) |
| **Caption / Legal** | Graphik | Regular (400) | 11–14px | Footnotes, disclaimers, metadata (observed on accenture.com) |
| **Fallback Stack** | -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif | — | — | Web fallback when Graphik is unavailable (T4_INFERRED) |

**Type hierarchy principle**: Accenture's typography is uniform — single typeface family, hierarchy expressed through weight and scale. No serif fonts, no decorative faces. The typographic restraint communicates institutional seriousness while the geometric forms align with the modern, forward-looking brand identity. (T4_INFERRED)

---

## Channel Specifications

| Channel | Dimensions | File Format | Color Profile | Key Constraints |
|---------|-----------|-------------|---------------|-----------------|
| **Website Hero** | 1440 × 720px (desktop) / 375 × 600px (mobile) | WebP, JPEG | sRGB | Purple gradient overlay on photography; text left-aligned in safe zone |
| **LinkedIn Post Image** | 1200 × 627px | PNG, JPEG | sRGB | Clean composition; report cover or data visualization with purple accent |
| **LinkedIn Banner** | 1128 × 191px | PNG, JPEG | sRGB | Minimal text; logo placement within center-safe area |
| **Twitter/X Post Image** | 1200 × 675px | PNG, JPEG | sRGB | 16:9 ratio; statistic or quote card with purple bar accent |
| **Instagram Post** | 1080 × 1080px | PNG, JPEG | sRGB | People-forward photography for talent brand; purple overlay for thought leadership |
| **Report Cover (PDF)** | A4 / Letter | PDF | sRGB for digital, CMYK for print | Full-bleed purple gradient; report title in Graphik Bold; Accenture logo top-left |
| **Presentation Template** | 16:9 (1920 × 1080px) | PPTX, PDF | sRGB | Dark (black/purple gradient) and light (white with purple accent) variants |
| **Video** | 1920 × 1080px (16:9) | MP4, H.264 | Rec.709 | Purple lower-third title bar; Accenture logo bug corner placement |

---

## Layout Principles

**1. Immersive hero sections**
Accenture's web pages open with full-bleed hero sections featuring large-scale photography overlaid with purple gradients and bold headline text. The hero creates an editorial, magazine-quality first impression that sets Accenture apart from the more utilitarian layouts of technology services competitors. (observed on accenture.com)

**2. Card-based content architecture**
Below the hero, content is organized in card grids — each card representing a case study, research report, or service offering. Cards use consistent dimensions, hover effects (subtle shadow lift), and a purple accent element (line, icon, or tag). This modular system enables consistent presentation across thousands of content pages. (observed on accenture.com)

**3. Generous white space with strategic purple punctuation**
Accenture does not saturate pages with brand color. White and light gray dominate the background; purple appears as thin lines, accent bars, CTA buttons, and icon highlights. This restraint makes each purple element carry more visual weight. (observed on accenture.com, T4_INFERRED)

**4. People-forward photography**
Accenture imagery features real (or realistic) people in professional contexts — not stock photography clichés but composed, well-lit portraits and working environments. Diversity is visually evident and intentional. Photography is the primary visual medium; illustration is secondary. (observed on accenture.com)

---

## Icon Style

| Attribute | Specification |
|-----------|--------------|
| **Style** | Outlined, geometric, consistent stroke weight |
| **Stroke weight** | 1.5–2px at 24px base size |
| **Corner radius** | 2px (slightly rounded, modern) |
| **Color** | Accenture Purple (#A100FF) on light backgrounds; white on dark/purple backgrounds |
| **Grid** | 24px base grid with 2px internal padding |
| **Usage** | Service category indicators, feature callouts, navigation support, infographic elements |

Icons are functional and clean — they support comprehension of service categories and content types. No illustrative, character-based, or emoji-style icons. (observed on accenture.com, T4_INFERRED)

---

## AI Image Prompt Guide

The following prompts are calibrated to produce imagery consistent with Accenture's observed visual identity. (T4_INFERRED)

**Prompt 1: Executive/Professional Portrait**
> "Professional portrait photograph of a confident business executive in a modern, light-filled office environment. The subject is dressed in business attire, looking directly at camera with a slight smile. Background shows a blurred open-plan office with warm natural light from floor-to-ceiling windows. Color palette leans toward neutral tones with a subtle purple accent in the environment (purple chair, purple folder, purple screen element). Shot on 85mm lens, f/2.0, shallow depth of field."

**Prompt 2: Technology + Human Interaction**
> "Wide-angle photograph of a diverse team of 3-4 professionals collaborating around a large interactive screen displaying data visualizations with purple (#A100FF) accent colors. Modern meeting room with glass walls, minimalist furniture, and warm overhead lighting. The mood is focused and collaborative, not posed. Natural interaction between team members. Color temperature: 5500K neutral."

**Prompt 3: Abstract Data/Technology Visual**
> "Abstract digital visualization of interconnected data nodes forming a network graph, rendered in deep purple (#7500C0) to bright purple (#A100FF) gradient against a black (#000000) background. Clean geometric lines connecting nodes. Subtle depth of field blur on background nodes. No text or UI elements. Premium, editorial quality. Suitable for report cover or hero image."

---

## Design Prohibitions

1. **No use of purple as a full-page background color**: Purple is an accent, not a canvas. Full-page purple backgrounds reduce contrast and dilute the brand signal. Dark (black) or light (white/gray) backgrounds with purple accents are the correct application. (T4_INFERRED)

2. **No serif or decorative typefaces**: Graphik (or its fallback sans-serif) is the only permitted typeface. Serif fonts, script fonts, and display faces are inconsistent with the modern, forward-looking brand identity. (T4_INFERRED)

3. **No generic stock photography**: Images of hands shaking over a boardroom table, generic skylines, or clip-art-quality business scenes are prohibited. Photography must feel authentic, composed, and diverse. (T4_INFERRED)

4. **No 3D renders or skeuomorphic elements**: Accenture's design language is flat-to-subtly-dimensional (shadows for card elevation only). Heavy 3D, glossy buttons, or skeuomorphic textures are inconsistent with the brand aesthetic. (T4_INFERRED)

5. **No animated GIFs or low-quality motion graphics on brand channels**: Motion content must meet production quality standards. Auto-playing animations, blinking elements, and loop GIFs are prohibited on professional channels. (T4_INFERRED)

6. **No competitor logos or visual comparisons**: Visual content does not reference competitor brands through logos, screenshots, or visual comparisons. Competitive positioning is expressed through Accenture's own capability narrative. (T4_INFERRED)

7. **No cluttered data visualizations**: Charts and graphs follow the principle of "one insight per visualization." Multi-axis, multi-color, high-density charts are redesigned into focused, purple-accented visualizations that communicate a single point clearly. (T4_INFERRED)
