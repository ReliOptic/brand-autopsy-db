# 05. Design System — Novo Nordisk (NVO)

> **Disclaimer**: This analysis is based on publicly available information including observed website design, official brand materials, and publicly accessible digital assets. CSS and color data are not available in the project raw data for NVO (data not available — analysis based on publicly known information and direct observation of novonordisk.com). It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Color System

*Note: The following color values are based on direct visual observation of novonordisk.com and official brand materials as publicly observed. Exact HEX values are estimated from visual inspection and publicly referenced brand guidelines. (T4_INFERRED)*

| Color Name | HEX Code | Role | Usage Context |
|------------|----------|------|---------------|
| **Novo Blue (Primary)** | `#002677` | Primary brand color | Headers, primary CTAs, navigation, corporate identity elements |
| **Novo Blue Mid** | `#0047BA` | Secondary blue | Subheadings, link colors, secondary buttons |
| **Novo Blue Light** | `#4A90D9` | Accent blue | Data visualizations, icons, highlight elements |
| **White** | `#FFFFFF` | Background | Primary page backgrounds, clean space |
| **Light Gray** | `#F5F5F5` | Secondary background | Card backgrounds, section dividers |
| **Dark Gray** | `#333333` | Body text | Primary body copy across all channels |
| **Warm Red (Alert)** | `#C8102E` | Alert / Warning | Safety information call-outs, important notices |
| **Green (Success)** | `#00864A` | Positive outcomes | Efficacy data highlights, positive outcome indicators |

*All HEX values are estimated from visual inspection of publicly accessible digital properties. Novo Nordisk has not publicly released a full brand color specification document accessible for this analysis. (T4_INFERRED)*

---

## Typography

| Role | Typeface | Weight | Usage |
|------|----------|--------|-------|
| **Primary Headline** | Maax (or equivalent geometric sans-serif) (estimated) | Bold | Major headlines, hero sections, campaign titles |
| **Body Copy** | Georgia or similar serif / system sans-serif | Regular | Long-form content, patient stories, clinical information |
| **Data / Tables** | System monospace or tabular sans-serif | Regular | Clinical data tables, financial figures, pipeline tables |
| **Legal / Fair Balance** | Helvetica Neue or system sans-serif | Regular, small | Prescribing information references, regulatory disclosures |

*Typography specifications are estimated from visual observation of novonordisk.com. The company has not published a publicly accessible typography specification for this analysis. (T4_INFERRED)*

---

## Channel Design Specifications

| Channel | Dimensions | Primary Color | Typography Scale |
|---------|-----------|---------------|-----------------|
| **Website hero** | 1440 x 600 px (desktop) / 375 x 400 px (mobile) | Novo Blue `#002677` on white | Headline 48px+, subhead 24px |
| **LinkedIn post** | 1200 x 627 px (link preview) | Novo Blue on white background | Headline 28–36px |
| **Conference/Congress material** | Variable (banner: 3x8 ft typical) | Novo Blue with white type | Headline 60–80pt print scale |
| **Patient brochure** | 8.5 x 11 in (US) / A4 (EU) | White background, blue accents | Body 11–12pt, headline 18–24pt |
| **Prescribing information addendum** | 8.5 x 11 in (US regulatory standard) | Black on white, regulatory format | 8pt minimum per FDA requirements |
| **Email newsletter** | 600 px width (standard HTML email) | Novo Blue header, white body | Headline 24px, body 16px |

---

## Layout Principles (4+)

**Principle 1 — Evidence leads, emotion follows.**
In any content unit addressing both clinical data and patient experience, the clinical data or mission statement appears first, and the emotional or narrative element follows. This sequence signals scientific authority before emotional resonance, which is appropriate for a pharmaceutical brand communicating with a professional and regulated audience. (T4_INFERRED from observed novonordisk.com page structures)

**Principle 2 — White space as credibility signal.**
Novo Nordisk's digital and print materials use generous white space — particularly in patient-facing materials — to signal clarity, trustworthiness, and the absence of information hiding. Dense, cluttered layouts are associated with fine-print pharmaceutical advertising; clean layouts signal transparency. (T4_INFERRED from observed design patterns)

**Principle 3 — Blue dominance with purposeful color accents.**
The Novo Blue palette dominates across all touchpoints. Color accents (green for positive outcomes, red for safety alerts) are used functionally, not decoratively, to guide the reader's attention to clinically significant information. This functional use of color is a pharmaceutical industry convention that Novo Nordisk follows consistently. (observed on novonordisk.com)

**Principle 4 — Data visualization as a primary content format.**
Clinical trial data is frequently presented as visual charts (forest plots, line graphs, bar charts) rather than as text descriptions alone. This reflects HCP audience expectations and allows complex statistical information to be parsed quickly. Design templates for data visualization maintain consistent axis labeling, color coding (blue for Novo Nordisk products), and citation placement. (observed in Novo Nordisk HCP materials)

**Principle 5 — Human photography at scale.**
Campaign photography features real patients in naturalistic settings — not stylized or idealized — reflecting the chronic disease reality of the brand's audience. The photographic aesthetic avoids the tropes of pharmaceutical advertising (walking on beaches, overly athletic patients) in favor of recognizable everyday contexts. (T4_INFERRED from observed brand imagery on novonordisk.com)

---

## Icon Style

- **Style**: Clean, minimal line icons; no drop shadows or gradients
- **Weight**: Medium stroke weight (2px equivalent at standard size)
- **Color**: Novo Blue `#002677` on white backgrounds; white on blue backgrounds
- **Application**: Used for navigation elements, section markers in patient education materials, and pipeline category indicators
- **Prohibition**: Decorative icons unrelated to content function are not used. Icons serve wayfinding and categorization purposes only. (T4_INFERRED from observed design patterns)

---

## AI Prompt Guide for Brand-Consistent Visual Generation

When generating images or graphics consistent with the Novo Nordisk visual identity:

**Photography prompts**:
- "Real patient, natural lighting, indoor or outdoor everyday setting, no medical equipment visible, warm but not overly bright, documentary style, age 40 to 65, diverse ethnicity"
- "Healthcare professional in clinical setting, engaged in conversation with patient, warm lighting, no surgical or crisis context, professional but approachable"

**Data visualization prompts**:
- "Clean bar chart, Novo Blue (#002677) primary bars, white background, no 3D effects, minimal gridlines, axis labels in dark gray (#333333), citation footnote at bottom"

**Corporate visual prompts**:
- "Corporate photography, research laboratory setting, scientists reviewing data, blue color tones, professional and purposeful atmosphere, no stock photography clichés"

**Prohibited image types**:
- Before/after body transformation imagery without clinical context
- Overly dramatic medical emergency imagery for a chronic disease brand
- Stereotyped or idealized patient representations inconsistent with lived disease experience

---

## Design Prohibitions (6+)

1. **Gradient backgrounds on clinical data slides**: Clinical data must be presented on plain white or light gray backgrounds. Gradient backgrounds reduce readability and suggest promotional intent over scientific objectivity. (T4_INFERRED)
2. **Unlabeled clinical comparison graphics**: Any visual comparing Novo Nordisk products to competitor products must include trial name, sample size, endpoint definition, and statistical confidence interval. Unlabeled bars or lines in comparison charts are prohibited. (regulatory requirement, FDA comparative advertising guidance)
3. **Stock photography of idealized health**: Images of visually healthy, athletic individuals without any connection to the chronic disease context are prohibited. The brand's patient imagery must be authentic to the lived experience of chronic disease management. (T4_INFERRED)
4. **Competing color hierarchies**: Secondary colors (green, red) must serve functional roles only. Using green as a decorative element in contexts unrelated to positive clinical outcomes creates visual confusion. (T4_INFERRED)
5. **Font sizes below regulatory minimums**: Fair balance text, prescribing information references, and safety information must meet FDA-specified minimum font size requirements (8pt minimum, with specific requirements varying by material type). (regulatory requirement)
6. **Brand mark distortion**: The Novo Nordisk logo must not be stretched, recolored outside brand palette, placed on competing color backgrounds, or used at sizes below minimum legibility thresholds. (T4_INFERRED from standard pharmaceutical brand governance)
7. **Unattributed patient photography**: Any patient photograph used in materials must be consented and attributed as required by applicable privacy regulations (HIPAA in the US, GDPR in the EU). (regulatory requirement)
