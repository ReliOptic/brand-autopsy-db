# 05. Design System — CVS Health (CVS)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation of cvshealth.com or cvs.com; (estimated) = project inference. CSS data sourced from observed stylesheet tokens on cvshealth.com.

---

## Color Palette

| Role | Color Name | HEX | Usage | Source |
|------|-----------|-----|-------|--------|
| **Primary Brand** | CVS Red | `#CC0000` | Primary CTA buttons, logo wordmark, in-store signage | (observed on website, CSS data) |
| **Primary Dark** | Deep Red | `#A50000` | Hover states, pressed button states, header accents | (observed CSS data) |
| **Primary Accent** | Bright Red | `#DB3321` | Alert states, promotional badges, ExtraCare promotional materials | (observed CSS data) |
| **Background / Neutral** | Near Black | `#262626` | Body text, navigation text, primary typography | (observed CSS data — highest frequency color) |
| **Light Background** | Blush White | `#FFF2F2` | Card backgrounds, section dividers with red tinting | (observed CSS data) |
| **Interactive Blue** | CVS Blue | `#0066CC` | Hyperlinks, secondary interactive elements, informational states | (observed CSS data) |
| **Light Blue** | Sky | `#3399FF` | Hover states on blue interactive elements | (observed CSS data) |
| **Dark Blue** | Navy | `#002B57` | Footer, trust-signaling sections, corporate communications | (observed CSS data) |
| **White** | Pure White | `#FFFFFF` | Page backgrounds, reversed text on red or dark backgrounds | (observed on website) |
| **Error / Warning** | Danger Red | `#EB0000` | Form validation errors, critical health alerts | (observed CSS data) |

**Color Strategy Notes**: CVS's palette is red-dominant — an unusual choice for healthcare, where blue typically signals trust and calm. CVS's red reflects its retail pharmacy origins and functions as a recognition signal rather than a clinical color. The red/white combination creates high-contrast legibility in both retail signage and digital environments. The secondary blue palette (`#0066CC`, `#002B57`) provides the clinical trust color for insurance (Aetna) and informational content where calm authority is required. (T4_INFERRED from palette structure)

---

## Typography

| Role | Font Family | Weight | Usage | Source |
|------|------------|--------|-------|--------|
| **Primary Brand Typeface** | CVS Sans | Regular / Medium / Bold | All brand communications: headings, body, UI elements | (observed CSS data — custom typeface: `CVS Sans Bold`, `CVS Sans Medium`, `CVS Sans Regular`) |
| **System Fallback** | Arial | Regular | Fallback when CVS Sans is unavailable; also used in legacy digital properties | (observed CSS data) |
| **Variable Tokens** | `var(--button-font-family)`, `var(--font-family-bold)` | Variable | CSS custom property tokens indicating theming system; values resolve to CVS Sans stack | (observed CSS data) |

**Typography Notes**: CVS Sans is a custom corporate typeface, indicating investment in brand identity at the typographic level. Custom typefaces signal institutional permanence and prevent competitors from exactly replicating the brand's typographic voice. The Arial fallback is standard corporate practice for environments where the custom font cannot be loaded. The presence of CSS custom property tokens (`var(--font-family-bold)`) indicates a design token system — CVS uses a systematic approach to font management rather than hardcoded values. (T4_INFERRED from CSS architecture)

---

## Channel Design Specifications

| Channel | Primary Format | Color Application | Typography | Notes |
|---------|---------------|-------------------|-----------|-------|
| **Website (cvshealth.com / cvs.com)** | Desktop-first responsive; card-based layout | Red CTAs on white background; blue for informational links | CVS Sans throughout | Token-based CSS system observed; dark mode not evident in CSS data |
| **In-store signage** | High-contrast red/white; large display type | Red dominant; white reversed text | CVS Sans or condensed variant | Physical pharmacy wayfinding and promotional signage |
| **Mobile app (CVS Pharmacy)** | iOS and Android native; bottom navigation | Red accent on white; notification badges in red | System fonts with CVS Sans where supported | Prescription management, ExtraCare, MinuteClinic booking |
| **Email (ExtraCare)** | Single-column; large CTA buttons | Red primary CTA; white background; product photography | CVS Sans headings; system body text | High send volume — 74M ExtraCare members (official, CVS Health IR) |
| **Aetna digital properties** | Aetna brand system (distinct from CVS retail) | Aetna blue primary (#007bff-adjacent); CVS red secondary | Aetna uses separate typeface from CVS Sans | Aetna brand is maintained semi-independently from CVS retail brand |
| **Out-of-home / TV** | Mass-market 30-second/15-second spots; billboard | CVS Red dominant; pharmacy photography | CVS Sans headlines | Seasonal campaigns (flu, COVID vaccination) |

---

## Layout Principles

1. **Access-First Information Hierarchy**: The most important action on any CVS digital surface is finding a pharmacy location, scheduling a MinuteClinic visit, or refilling a prescription. Navigation and CTA placement prioritizes these three actions above all secondary content. (observed on cvs.com homepage structure)

2. **Retail Grid Meets Clinical Clarity**: CVS's digital layouts balance the visual density of a retail product grid (ExtraCare deals, OTC products) with the informational clarity required for clinical content (prescription instructions, health condition information). The retail sections use tight grids with promotional imagery; the clinical sections use more white space and structured content. (observed on cvs.com)

3. **Red CTA Isolation**: Primary call-to-action buttons use the CVS Red (`#CC0000`) exclusively and are never placed against red backgrounds. The red CTA is always isolated against white or light backgrounds to maintain click-through contrast. (observed on website)

4. **Trust Anchors in Pharmaceutical Content**: Pages dealing with prescription drugs, MinuteClinic scope, and health conditions consistently include regulatory disclosures, pharmacist attribution, and source citations. This is a legal necessity (FDA, FTC guidelines) as well as a trust signal. (observed on cvs.com drug information pages)

5. **Loyalty Visibility**: The ExtraCare balance and available savings are surfaced prominently in authenticated sessions — the loyalty program balance is a primary navigation element, not buried in an account section. (observed on CVS app and cvs.com logged-in state)

---

## Icon Style

CVS Health uses functional, outline-based iconography in healthcare contexts (pharmacy bags, pill bottles, stethoscopes, location pins) with minimal decoration. Icons in clinical content avoid metaphors that could be misread — a heart icon in a cardiac health section is literal, not decorative. Retail contexts allow more illustrative icons for product categories (beauty, baby, household). (observed on cvs.com and CVS app)

---

## AI Image Prompt Guide

For generating images consistent with CVS Health's visual system:

**Brand-consistent prompts**:
- "Friendly pharmacist in red CVS uniform consulting with a patient at a pharmacy counter, warm retail lighting, natural skin tones, professional but approachable"
- "MinuteClinic examination room with a nurse practitioner and patient, clean clinical setting, white and light blue palette, natural light"
- "Diverse suburban family in a CVS Pharmacy store aisle, shopping for health products, warm and inclusive, not sterile"
- "Close-up of prescription bottles organized with a pill organizer on a kitchen counter, soft morning light, realistic, non-staged"

**Avoid in AI image generation**:
- Stock-photo styled "perfect health" imagery (models who look like athletes in medical contexts)
- Exclusively white or exclusively non-white patient demographics — CVS's audience is explicitly diverse
- Clinical sterility without human warmth — CVS is a retail healthcare brand, not a hospital
- CVS logo or wordmark in generated images (trademark risk)

---

## Design Prohibitions

1. **Do not use red backgrounds with red text**: The red palette must always be used as figure (text, button) against a non-red ground. Red-on-red fails WCAG 2.1 contrast minimums and is not consistent with observed CVS design patterns. (T4_INFERRED from observed design system)
2. **Do not use Aetna blue (`#007bff`-range) for CVS Pharmacy retail content**: The two brands (CVS retail and Aetna insurance) maintain distinct visual identities. Mixing them in retail contexts creates brand confusion. (T4_INFERRED from observed separation of brand systems)
3. **Do not use clinical photography (surgical, procedural) in retail contexts**: CVS's brand is accessible healthcare, not hospital care. Surgical or procedure imagery raises the brand's perceived clinical barrier and conflicts with the "walk in anytime" positioning.
4. **Do not use font weights lighter than CVS Sans Regular for body text**: Pharmaceutical content requires high legibility for patients who may have visual impairments or who are reading drug information under stress. Light or thin weight fonts fail accessibility requirements in this context. (T4_INFERRED from accessibility best practices in healthcare)
5. **Do not present pricing without the insurance/ExtraCare qualifier**: Showing a drug's retail price without the ExtraCare or insurance price creates sticker shock that drives prescription non-adherence. Always pair the retail price with the eligible savings. (T4_INFERRED from ExtraCare program design intent)
6. **Do not use urgency language ("Limited time only!", "Act now!") in clinical content**: Urgency retail language applied to health decisions (vaccination, prescription adherence) creates the wrong decision frame — health decisions should feel informed, not rushed. Urgency language is limited to retail promotions and ExtraCare deals. (observed on CVS content separation between retail and clinical communications)
