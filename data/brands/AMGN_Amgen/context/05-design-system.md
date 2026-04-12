# 05. Design System — Amgen Inc. (AMGN)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

Observed from amgen.com CSS data capture. Colors are listed by frequency of appearance in the design system.

| Role | Color Name | HEX | Usage |
|------|-----------|-----|-------|
| **Primary Brand Blue** | Amgen Blue | `#0063C3` | Primary CTAs, navigation active states, link text, brand header elements. (observed on amgen.com) |
| **Deep Navy** | Amgen Dark Navy | `#032E44` | Footer backgrounds, formal section headers, dark-mode emphasis. (observed on amgen.com) |
| **Teal Accent** | Amgen Teal | `#15909C` | Secondary CTAs, section dividers, pipeline category tags. (observed on amgen.com) |
| **Light Teal** | Amgen Light Teal | `#89C6CC` | Infographic fills, background washes for science content sections, illustration accents. (observed on amgen.com) |
| **Alert Red** | Signal Red | `#DE232F` | Warning labels, safety alert indicators, important safety information callouts. (observed on amgen.com) |
| **Light Blue Wash** | Background Blue | `#EDF2F8` | Section background tint, card backgrounds, content area differentiation. (observed on amgen.com) |
| **Near-White** | Surface White | `#F7F7F7` | Page background, card surfaces, modal overlays. (observed on amgen.com) |
| **Body Text** | Dark Charcoal | `#222222` | Primary body text, headings. (observed on amgen.com) |
| **Secondary Text** | Medium Gray | `#747474` | Captions, metadata, secondary labels, legal fine print. (observed on amgen.com) |
| **Light Border** | Border Gray | `#D2D2D2` | Card borders, dividers, table lines, form field outlines. (observed on amgen.com) |

**Color System Logic**: The dominant palette is a blue-teal spectrum anchored by the primary Amgen Blue (`#0063C3`) and teal accent (`#15909C`). This palette communicates clinical precision and scientific authority without the coldness of pure monochromatic blue. The alert red is reserved exclusively for safety-related UI elements — a pharmaceutical design convention that prevents the red from being used decoratively. (T4_INFERRED from observed design patterns)

---

## Typography

| Role | Typeface | Weight | Observed Usage |
|------|----------|--------|----------------|
| **Primary Sans-Serif** | Open Sans | Regular (400), SemiBold (600), Bold (700) | Body text, navigation, card copy. (observed on amgen.com) |
| **Extended Display** | Poppins | SemiBold, Bold | Hero headlines, section titles, feature callouts. (observed on amgen.com CSS) |
| **Fallback** | Arial, Helvetica, sans-serif | Various | System fallback stack. (observed on amgen.com CSS) |

**Typography notes**: Amgen does not appear to use a custom proprietary typeface. Open Sans and Poppins are both Google Fonts — a choice that prioritizes cross-platform rendering consistency and accessibility over typographic exclusivity. This is consistent with pharmaceutical web design conventions where legibility and regulatory compliance (required minimum type sizes for safety information) take precedence over typographic branding. (T4_INFERRED)

---

## Channel Specifications

| Channel | Dimensions | Format | Notes |
|---------|-----------|--------|-------|
| Website hero | 1440×680px (desktop) | Photograph + text overlay | Full-bleed imagery; patient or scientist photography dominant (observed on amgen.com) |
| LinkedIn cover | 1128×191px | Brand blue or teal gradient | Corporate communications; science announcements |
| Twitter/X header | 1500×500px | Brand imagery or campaign creative | Congress announcements; pipeline milestones |
| Scientific poster | A0 / 36×48 in | PDF, print-ready | Used at ASCO, ACR, ACC; data-dense two-column layout (T4_INFERRED from pharmaceutical poster conventions) |
| Investor day slides | 16:9 widescreen | PowerPoint/PDF | Corporate blue palette; clean data visualization (observed on amgen.com/investors) |
| Print ad (medical journal) | Full page: 8.5×11 in | Print PDF | FDA-required fair balance (typically full page) runs adjacent or below product ad (T4_INFERRED) |

---

## Layout Principles

**1. White space as a credibility signal.**
Amgen's web pages use generous margins and padding. Dense information is never stacked without visual breathing room. This open layout signals scientific rigor — the opposite of a crowded promotional page. (observed on amgen.com)

**2. Data visualization over decorative graphics.**
Charts, trial result infographics, and molecular diagrams replace stock photography in scientific content sections. The visuals carry informational weight; they are not decorative. (observed on amgen.com/science)

**3. The safety information anchor.**
All prescription product pages carry Important Safety Information (ISI) in a fixed section that is visually distinct from promotional content — typically a light gray background, smaller type, and a clear "IMPORTANT SAFETY INFORMATION" header. This is a regulatory requirement that has become a design convention. (T4_INFERRED from FDA direct-to-consumer advertising guidance; observed on product pages)

**4. Photography: scientists and patients in real settings.**
Amgen's editorial photography favors images of actual scientists in laboratory environments and patients in daily life contexts — not stock-style posed models in white coats. This authenticity convention is a deliberate brand signal that the science is real and the patients are real. (observed on amgen.com/stories; amgen.com/science)

**5. Dual-portal navigation.**
amgen.com separates HCP and patient pathways in primary navigation. The HCP portal requires professional identity confirmation. This structural separation reflects the regulatory boundary between promotional content for professionals (allowed to reference clinical data in full) and consumer-directed content (subject to fair balance requirements). (observed on amgen.com navigation)

---

## Icon Style

- **Style**: Line icons with rounded endpoints; minimal fill; 2px stroke weight at standard size.
- **Color**: Primary blue (`#0063C3`) or teal (`#15909C`) on white backgrounds; white icons on dark backgrounds.
- **Application**: Navigation icons, disease area category markers, pipeline status indicators (Phase I, II, III circles), patient support program step indicators.
- **Prohibitions**: Flat color cartoon icons, isometric 3D icons, and emoji-style icons are inconsistent with Amgen's clinical-grade visual positioning. (T4_INFERRED from observed icon system)

---

## AI Image Prompt Guide

When generating visual assets in the Amgen brand context:

**For patient content**:
> "Photorealistic photograph of a [age group] [gender] person engaged in a daily life activity ([cooking/hiking/playing with children]). Natural light. Warm but not sentimental. Lifestyle, not medical. No visible medical devices or clinical settings. Expression: genuinely content, not posed-happy. Background: domestic or outdoor. Color temperature: neutral to warm."

**For science content**:
> "Professional photograph of a scientist in a modern laboratory setting. Lab coat, safety glasses. Equipment in background: centrifuge, bioreactor, pipettes. Lighting: cool blue-white, clinical. Expression: focused, engaged with equipment. NOT stock photo style. Documentary photography aesthetic."

**For infographics**:
> "Clean minimal data visualization. Color palette: #0063C3 (primary), #15909C (accent), #032E44 (dark), white background. No shadows or gradients. Sans-serif font (Open Sans or similar). Clinical precision aesthetic."

---

## Design Prohibitions

1. **Red outside safety contexts**: The alert red (`#DE232F`) must not appear in decorative, branding, or promotional elements. It is a signal color reserved for safety communications. (T4_INFERRED from observed design system)
2. **Dense promotional layouts**: Crowded layouts with multiple CTAs competing for attention conflict with the clinical credibility positioning and may create regulatory concerns about minimizing safety information. (T4_INFERRED)
3. **Comic or cartoon illustration styles**: Inconsistent with scientific authority positioning. Medical illustration is acceptable; cartoons are not. (T4_INFERRED)
4. **Unattributed before/after imagery**: Any patient transformation imagery must be accompanied by proper IRB-reviewed patient consent, clinical context, and fair balance disclosures. (T4_INFERRED from FDA guidance on patient testimonials)
5. **Molecular models as decorative elements**: Using DNA helices, protein structures, or molecular diagrams as purely decorative graphic elements without informational purpose is inconsistent with Amgen's science-first positioning — it signals that science is decoration, not substance. (T4_INFERRED)
6. **Off-palette accent colors**: Introducing colors outside the established blue-teal spectrum without strategic rationale fragments the clinical brand identity. (T4_INFERRED)
