# 05. Design System — Aflac Incorporated (AFL)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Color Palette

The following colors are derived from observed Aflac brand materials including the aflac.com website and official corporate communications. (observed on website)

| Color Name | HEX | RGB | Usage | Source |
|------------|-----|-----|-------|--------|
| **Aflac Blue** | #00A1DF | rgb(0, 161, 223) | Primary brand color; logo, primary CTAs, hero section accents, navigation highlights | observed on aflac.com |
| **Deep Blue** | #003B71 | rgb(0, 59, 113) | Headers, footer backgrounds, secondary emphasis, text on light backgrounds | observed on aflac.com |
| **White** | #FFFFFF | rgb(255, 255, 255) | Primary page background, reversed text, content containers | observed on aflac.com |
| **Light Blue** | #E8F4FD | rgb(232, 244, 253) | Section backgrounds, callout boxes, subtle brand color application | observed on aflac.com |
| **Dark Gray** | #333333 | rgb(51, 51, 51) | Body text, primary content | observed on aflac.com |
| **Mid Gray** | #757575 | rgb(117, 117, 117) | Secondary text, metadata, captions | observed on aflac.com |
| **Aflac Duck Yellow** | #FFD100 | rgb(255, 209, 0) | Duck-related brand content, accent highlights, warmth signals | observed on Aflac brand materials |
| **Success Green** | #008A00 | rgb(0, 138, 0) | Positive states, confirmation messages, benefit highlights | observed on aflac.com |

### Color Usage Rules

- **Aflac Blue (#00A1DF)** is the primary brand identifier. It appears in the logo, navigation, CTA buttons, and accent elements. The blue conveys trust, stability, and approachability — critical attributes for an insurance brand. (T4_INFERRED)
- **Duck Yellow (#FFD100)** is reserved for mascot-associated content and warm accent moments. It is not used as a primary UI color. Overuse creates visual confusion with warning states. (T4_INFERRED)
- **Deep Blue (#003B71)** provides gravitas in headers and footers, balancing the lighter, more approachable Aflac Blue. (T4_INFERRED)
- **All text on colored backgrounds** must meet WCAG 2.1 AA contrast ratio minimums. White text on Aflac Blue passes AA for large text. Deep Blue on white passes AA for all text sizes. (T4_INFERRED)

---

## Typography

| Role | Typeface | Weight | Size Range | Notes |
|------|----------|--------|------------|-------|
| **Primary Display** | Aflac Sans (proprietary) / Proxima Nova (web) | Bold (700) | 32–60px | Hero headlines, major section titles (observed on aflac.com) |
| **Secondary Heading** | Aflac Sans / Proxima Nova | Semibold (600) | 20–32px | Section subheadings, card titles, product names (observed on aflac.com) |
| **Body Text** | Aflac Sans / Proxima Nova | Regular (400) | 15–18px | All body copy, product descriptions, educational content (observed on aflac.com) |
| **Caption / Legal** | Aflac Sans / Proxima Nova | Regular (400) | 11–13px | Disclaimers, footnotes, legal disclosures, policy numbers (observed on aflac.com) |
| **Fallback Stack** | -apple-system, "Segoe UI", Helvetica, Arial, sans-serif | — | — | System fallback (T4_INFERRED) |

**Type hierarchy principle**: Aflac typography is clean, rounded, and friendly — reflecting the approachable Caregiver archetype. No sharp serifs, no angular display fonts. The rounded geometric forms of Proxima Nova (or similar) create warmth without sacrificing readability. (T4_INFERRED)

---

## Channel Specifications

| Channel | Dimensions | File Format | Color Profile | Key Constraints |
|---------|-----------|-------------|---------------|-----------------|
| **Website Hero** | 1440 × 600px (desktop) / 375 × 500px (mobile) | WebP, JPEG | sRGB | People-forward photography with blue overlay; headline left-aligned |
| **LinkedIn Post Image** | 1200 × 627px | PNG, JPEG | sRGB | Professional imagery; blue-dominant palette; benefit-focused copy |
| **Twitter/X Post Image** | 1200 × 675px | PNG, JPEG | sRGB | Duck content or stat cards; high-contrast text |
| **Instagram Post** | 1080 × 1080px | PNG, JPEG | sRGB | Duck personality content, CSR imagery, warm and approachable |
| **TV Commercial** | 1920 × 1080px (16:9) | MP4, ProRes | Rec.709 | Duck integration; Aflac Blue lower-third; Aflac logo end card |
| **Print Brochure** | 8.5 × 11" / A4 | PDF/X-1a | CMYK | Pantone 299 C for Aflac Blue; clear product benefit layout |
| **Email Template** | 600px max-width | HTML | sRGB | Single-column, mobile-first; Aflac Blue header; white content area |
| **Enrollment Materials** | Variable (poster, tent card, digital signage) | PDF, PNG | sRGB/CMYK | Must include product-specific disclaimers; employer co-branding allowed |

---

## Layout Principles

**1. People-first imagery**
Aflac's visual system leads with photographs of real or realistic people in everyday life situations — families, workplaces, hospital waiting rooms. The people are the focal point; insurance messaging is the supporting context. This reflects the Caregiver archetype: the brand exists to serve people, so people are visually centered. (observed on aflac.com)

**2. Clean, breathable layouts**
Aflac pages use generous white space and simple content hierarchies. Insurance content is inherently complex; the layout must counterbalance this with visual simplicity. No dense text blocks, no cluttered sidebars, no competing CTAs on the same screen. (observed on aflac.com, T4_INFERRED)

**3. Progressive disclosure for complex content**
Policy details, coverage amounts, and exclusions are presented through expandable sections, tabbed interfaces, and layered pages. The initial view is simple and benefit-focused; detail is available on demand. This respects both the casual browser and the detail-seeking researcher. (observed on aflac.com)

**4. Consistent CTA hierarchy**
Primary CTA (Aflac Blue button, "Get a Quote" or "See Plans") appears once per viewport. Secondary CTAs (text links, "Learn More") support without competing. The visual weight of the primary CTA is always dominant. (observed on aflac.com)

---

## Icon Style

| Attribute | Specification |
|-----------|--------------|
| **Style** | Filled or outlined, rounded, friendly geometry |
| **Stroke weight** | 2px at 24px base size (outlined variants) |
| **Corner radius** | Fully rounded terminals; no sharp corners |
| **Color** | Aflac Blue (#00A1DF) on light backgrounds; white on blue backgrounds |
| **Grid** | 24px base grid |
| **Usage** | Product category indicators (accident, cancer, hospital), benefit highlights, process step illustrations |

Icons reflect the approachable, non-threatening visual language of the brand. Medical/insurance iconography (hospital, stethoscope, shield) is rendered in a friendly, simplified style — not clinical or technical. (observed on aflac.com, T4_INFERRED)

---

## AI Image Prompt Guide

The following prompts are calibrated to produce imagery consistent with Aflac's observed visual identity. (T4_INFERRED)

**Prompt 1: Family Protection Scene**
> "Warm photograph of a diverse family of four (two parents, two children ages 5-10) in a bright, modern living room. Natural light from large windows. Parents are relaxed and smiling, children playing nearby. Color palette: warm neutrals with subtle blue accents (a blue throw pillow, a blue mug). Mood: safe, secure, comfortable. No insurance branding visible. Shot on 35mm, f/2.8, natural light."

**Prompt 2: Workplace Enrollment Moment**
> "Professional photograph of an HR benefits coordinator meeting with an employee at a desk in a modern, open-plan office. Both people are engaged and smiling. A laptop screen shows a benefits enrollment interface (blurred). Lighting is bright and corporate-friendly. Color temperature: warm (5000K). Diverse representation. Business casual attire."

**Prompt 3: Healthcare Support Scene**
> "Sensitive photograph of a woman in her 40s sitting in a hospital waiting area, looking at her phone with a calm, relieved expression. She has just received a notification (implied, not shown). Soft, diffused hospital lighting. Background is clean and modern — not clinical or intimidating. Blue accents in the environment (chairs, signage). Mood: hopeful, supported."

---

## Design Prohibitions

1. **No dark or clinical medical imagery**: Hospital corridors, IV drips, operating rooms, and clinical close-ups create fear rather than reassurance. Aflac's visual system focuses on the person, not the medical environment. (T4_INFERRED)

2. **No complex infographics without progressive disclosure**: Dense data visualizations contradict the simplicity promise. If a visualization requires more than 10 seconds to interpret, it must be simplified or broken into sequential steps. (T4_INFERRED)

3. **No serif or decorative typefaces**: The friendly, approachable brand identity requires rounded sans-serif typography only. Serif fonts read as formal/institutional — the opposite of Aflac's positioning. (T4_INFERRED)

4. **No red as a primary UI color**: Red signals danger and denial in insurance contexts. Red is reserved for error states only and is used minimally. (T4_INFERRED)

5. **No Aflac Duck in serious/clinical contexts**: The duck appears in awareness and brand personality content, not in claims communications, policyholder service interfaces, or cancer-related CSR imagery. (T4_INFERRED)

6. **No stock photography clichés**: Handshakes, thumbs up, crossed arms, pointing at the camera, and exaggerated facial expressions are prohibited. Photography must feel natural, unposed, and authentic. (T4_INFERRED)

7. **No competitor visual references**: Aflac brand materials never reference competitor logos, color schemes, or brand elements, even in comparison contexts. (T4_INFERRED)
