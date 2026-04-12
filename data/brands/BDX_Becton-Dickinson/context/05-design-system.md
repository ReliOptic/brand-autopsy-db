# 05. Design System — Becton, Dickinson and Company (BDX)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

> Note: CSS extraction for BD.com returned no color data in automated capture. The following palette is derived from direct visual observation of BD.com and official brand materials. (observed on website)

| Role | Color Name | HEX | Usage |
|------|-----------|-----|-------|
| **Primary Brand** | BD Green | `#00A651` | Logo, primary CTAs, navigation highlights, key brand accents (observed on website) |
| **Primary Dark** | Deep Navy | `#002B5C` | Primary headers, navigation background, corporate sections (observed on website) |
| **Secondary Blue** | Medical Blue | `#0072CE` | Links, secondary CTAs, informational elements (observed on website) |
| **Surface White** | White | `#FFFFFF` | Primary page background, card surfaces, content areas (observed on website) |
| **Light Gray** | Background Gray | `#F4F4F4` | Section backgrounds, sidebar areas, table alternating rows (observed on website) |
| **Mid Gray** | Text Gray | `#666666` | Supporting copy, captions, metadata (observed on website) |
| **Dark Text** | Near Black | `#1A1A1A` | Primary body text (observed on website) |

**Palette rationale**: BD's green-and-navy combination signals clinical trust (navy = institutional authority) and life/health (green = vitality, used in medical contexts globally). This palette is distinctly different from pure-white clinical minimalism and from the red-dominant palettes of some medical technology peers — it is warm enough to convey care while formal enough to convey institutional credibility. (T4_ESTIMATED)

---

## Typography

| Role | Typeface | Weight | Usage |
|------|---------|--------|-------|
| **Primary Display** | Sans-serif (geometric/humanist, custom or licensed) | Bold, SemiBold | Headlines, section titles, product names (observed on website) |
| **Body Text** | Sans-serif | Regular, Medium | Body copy, clinical content, descriptions (observed on website) |
| **Data / Technical** | Monospace fallback | Regular | Specification tables, numerical data (estimated) |
| **Fallback Stack** | Arial, Helvetica, sans-serif | — | System fallbacks (estimated) |

> Note: BD.com CSS extraction did not return font-family declarations. Typography observations are based on visual rendering of the live website. (observed on website)

---

## Channel Design Specifications

| Channel | Dimensions | Key Constraints |
|---------|-----------|----------------|
| LinkedIn post image | 1200 × 628 px | BD green or navy dominant; clinical photography preferred; no consumer lifestyle imagery |
| LinkedIn banner | 1584 × 396 px | Logo left; brand purpose statement right; clean clinical environment photography |
| Email header | 600 px width | BD green accent bar; white background body; clinical headline typography |
| Product data sheet (print/PDF) | A4 / Letter | Two-column layout; green section headers; specification tables; clinical evidence callout boxes |
| Conference booth | Variable | Navy and green dominant; large-format clinical photography; product demonstration stations |
| Patient-facing materials | Variable | Accessible color contrast; simplified language; multilingual capability for global markets |

(estimated, based on observed BD brand application patterns)

---

## Layout Principles

1. **Clinical evidence prominence**: Clinical study results, outcome metrics, and regulatory compliance indicators are placed in primary visual positions — above the fold on product pages, as the lead element in case study layouts. The evidence, not the product name, is the headline. (observed on website)

2. **Segmented navigation by audience**: BD.com organizes content by professional audience (clinical, laboratory, research, pharmacy) rather than purely by product category — reflecting BD's understanding that its buyers have distinct vocabulary, workflow contexts, and decision criteria. (observed on website)

3. **White space as clinical precision signal**: Clinical contexts benefit from visual breathing room — BD layouts use significant whitespace to convey precision and organization, consistent with the aesthetic expectations of clinical and laboratory professionals. (T4_ESTIMATED, observed on website)

4. **Photography of clinical environments, not models**: Product photography shows devices in clinical context (IV catheter in a hospital arm, blood collection tube in a laboratory), not in studio isolation or with lifestyle models. This grounds the brand in functional clinical reality. (observed on website)

5. **Accessibility-first design**: Medical device company communications have heightened accessibility obligations — color contrast ratios, font size minimums, and multilingual support are design requirements, not optional enhancements. (T4_ESTIMATED — regulatory context)

---

## Icon Style

- **Style**: Clean line icons with moderate stroke weight; some filled variants for navigation (observed on website)
- **Color**: BD green on white; white on navy backgrounds
- **Complexity**: Simple, single-concept icons for navigation and feature identification; more detailed diagrams acceptable in clinical education content
- **Application**: Product category navigation, clinical workflow process diagrams, safety feature identification
- **Prohibited**: Skeuomorphic icons, drop shadows, gradient fills (T4_ESTIMATED)

---

## AI Image Prompt Guide

For generating on-brand BD imagery:

**Clinical device photography**:
> "Professional medical photography, [syringe / IV catheter / blood collection tube / infusion pump], clean clinical environment, hospital background blurred, BD green accent, white and navy color palette, precision product shot, soft professional lighting, no people"

**Infection prevention context**:
> "Hospital ward setting, healthcare professional hands in gloves, clinical procedure being performed safely, clean and organized, BD green accent color, professional medical photography, shallow depth of field"

**Laboratory diagnostics context**:
> "Clinical laboratory environment, diagnostic analyzer or specimen tubes, organized lab bench, white and gray tones, scientific precision aesthetic, professional photography, no personal identifying information"

**Prohibited AI image directions**:
- Consumer lifestyle photography (people smiling with devices at home as primary brand imagery)
- Abstract design that does not ground in clinical reality
- Any imagery suggesting specific therapeutic outcomes or patient cure
- Stock photography of generic hospital scenes without BD product context

---

## Design Prohibitions

1. **No consumer lifestyle aesthetic for institutional B2B content** — BD's primary buyer is a clinical professional, not a consumer; lifestyle imagery undermines institutional authority (T4_ESTIMATED)
2. **No uncontrolled use of red** — Red carries emergency/danger connotations in clinical contexts; red used outside of its specific clinical signal context (e.g., sharps warning) creates unintended alarm associations (T4_ESTIMATED)
3. **No low-contrast color combinations** — WCAG accessibility standards apply; text must meet minimum contrast ratios against all background colors (T4_ESTIMATED — accessibility compliance)
4. **No product claims in visual design elements** — Claims that exceed FDA-cleared indications for use must not appear in visual design materials, including infographics and data visualizations (T4_ESTIMATED — regulatory compliance)
5. **No outdated product imagery** — Recalled or discontinued products must be removed from all digital and print materials promptly; using imagery of products under regulatory constraint creates legal exposure (T4_ESTIMATED)
6. **No unauthorized competitor product imagery** — Comparative visual demonstrations using competitor products require explicit legal review before publication (T4_ESTIMATED)
7. **No generic stock photo of patients** — Patient representation requires appropriate consent and diversity representation standards; generic stock photography of patients is insufficient for BD's clinical context (T4_ESTIMATED)
