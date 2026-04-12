# 05. Design System — Biogen Inc. (BIIB)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## Color Palette

> CSS extraction for Biogen.com returned color data. The following palette is derived from that data combined with direct visual observation. (observed on website; CSS data extracted from biogen.com)

| Role | Color Name | HEX | Count in CSS | Usage |
|------|-----------|-----|-------------|-------|
| **Primary Brand Blue** | Biogen Blue | `#537BAA` | 48 | Primary brand color, navigation elements, CTAs, key accents (observed on website) |
| **Deep Navy** | Biogen Navy | `#1B3982` | 12 | Headers, dark section backgrounds, corporate identity elements (observed on website) |
| **Brand Purple** | Biogen Purple | `#7E0B6D` | 10 | Secondary accent, disease awareness campaigns, visual differentiation (observed on website) |
| **Deep Dark** | Near Black | `#212529` | 32 | Primary body text, dark UI elements (observed on website) |
| **Mid Blue-Gray** | Slate Blue | `#57667E` | 7 | Supporting text, secondary UI elements (observed on website) |
| **Light Blue** | Pale Blue | `#A2BDDD` | 6 | Backgrounds, hover states, light accents (observed on website) |
| **Surface Light** | Light Gray | `#F0F2F5` | 7 | Section backgrounds, card surfaces (observed on website) |
| **White** | White | `#FFFFFF` | — | Primary background, content areas (observed on website) |

**Palette rationale**: The blue-navy-purple combination is distinctively neuroscientific — blue conveys trust and medical authority, while the purple signals the brain and neurological differentiation, distinguishing Biogen from typical pharma blue-on-white palettes. The palette communicates specialized medical authority with scientific depth rather than generic healthcare accessibility. (T4_ESTIMATED)

---

## Typography

CSS extraction identified the following fonts used on Biogen.com: (observed on website, CSS data)

| Role | Typeface | Weight | Usage |
|------|---------|--------|-------|
| **Primary Display** | DIN OT Bold / DIN OT Medium | Bold, Medium | Headlines, product names, key brand statements (observed on website) |
| **Secondary / Body** | proxima-nova | Regular, SemiBold | Body copy, navigation, UI elements (observed on website) |
| **Condensed / Supporting** | franklin-gothic-urw-cond | Regular | Supporting text, labels, compact display (observed on website) |
| **Serif Accent** | baskerville-urw | Regular | Editorial contexts, long-form reading (observed on website) |
| **Body Alternative** | open-sans, poppins | Regular | Supporting body text (observed on website) |
| **System Fallbacks** | Arial, Helvetica, sans-serif | — | Fallback stack (observed on website) |

**Typography rationale**: DIN OT is an industrial modernist typeface with scientific precision associations — widely used in pharmaceutical and technology contexts. Proxima Nova is a humanist geometric sans-serif that balances readability with contemporary design authority. Together, they signal scientific precision (DIN) with human accessibility (Proxima Nova). (T4_ESTIMATED)

---

## Channel Design Specifications

| Channel | Dimensions | Key Constraints |
|---------|-----------|----------------|
| LinkedIn post image | 1200 × 628 px | Biogen blue or navy dominant; brain/neuroscience imagery; scientific or patient photography |
| LinkedIn banner | 1584 × 396 px | Logo left; science or patient imagery right; no promotional claims |
| Email header | 600 px width | Biogen blue bar; DIN OT headline; white background body; ISI (Important Safety Information) formatting for HCP emails |
| HCP detail aid (digital) | iPad-optimized, 1024 × 768 px | Approved promotional content only; ISI must be accessible; all claims sourced to PI/label |
| Disease state website (patient) | Responsive web | Accessible contrast ratios; plain language; multilingual capability; WCAG 2.1 AA compliance |
| Conference materials | Variable | Blue-navy dominant; scientific imagery; data visualization; Biogen and product brand lock-up |

(estimated, based on observed Biogen brand application)

---

## Layout Principles

1. **Science-first visual hierarchy**: Clinical data, trial endpoints, and biomarker graphics are primary visual elements — not product photography. The scientific evidence is the hero of HCP-directed materials. (T4_ESTIMATED, observed on Biogen.com HCP sections)

2. **Patient humanity as counterweight to scientific formalism**: Patient photography and caregiver imagery balance the scientific visual register — the human impact of neurological disease is always present alongside the data. (observed on Biogen.com)

3. **Brain and neuroscience imagery as category signal**: Stylized brain visualizations, neuron network graphics, and MRI-inspired imagery establish the neuroscience category consistently across brand touchpoints. (observed on Biogen.com)

4. **Purple as the Alzheimer's/neurodegeneration visual marker**: Within the Biogen palette, the purple (#7E0B6D) functions as the neurodegeneration/Alzheimer's visual signal — distinct from the MS blue, creating visual segmentation within the neuroscience portfolio. (T4_ESTIMATED, based on observed Biogen brand application)

5. **Important Safety Information accessibility**: All promotional digital and print materials must display ISI (Important Safety Information) in a format that is clearly visible and accessible — not buried in fine print. This is both regulatory requirement and brand trust signal. (T4_ESTIMATED — FDA promotional material requirements)

---

## Icon Style

- **Style**: Clean geometric line icons; some filled variants for navigation (observed on website)
- **Color**: Biogen blue (#537BAA) or white on dark backgrounds
- **Complexity**: Simple, single-concept icons for navigation; more complex data visualization graphics acceptable in clinical content
- **Application**: Disease area identification, pipeline stage indicators, patient resource navigation, feature identification
- **Prohibited**: Overly clinical iconography that creates a sterile rather than human brand feel (T4_ESTIMATED)

---

## AI Image Prompt Guide

For generating on-brand Biogen imagery:

**Neuroscience science imagery**:
> "Abstract neural network visualization, blue and purple tones, deep navy background, glowing synaptic connections, scientific data aesthetic, 4K, photorealistic render, no text, Biogen blue (#537BAA) and purple (#7E0B6D) color palette"

**Patient and caregiver imagery**:
> "Elderly person with family member in a warm indoor setting, natural light, hopeful mood, candid photography style, diverse representation, no medical equipment in frame, soft focus background, human warmth"

**Clinical science imagery**:
> "MRI brain scan visualization, blue gradient, scientific analysis context, clinical precision, dark background, data visualization overlay, no personally identifiable information"

**Prohibited AI image directions**:
- Any imagery suggesting specific patient outcomes or treatment success
- Stock imagery of obviously staged "patient testimonials"
- Generic pharmaceutical stock photos of pill bottles or syringes (not relevant to Biogen's biologic therapies)
- Brain imagery that implies fear or horror (avoid horror-genre neural imagery)

---

## Design Prohibitions

1. **No promotional claims without ISI** — All HCP-directed promotional materials require Important Safety Information; omitting ISI violates FDA promotional requirements (T4_ESTIMATED — regulatory compliance)
2. **No off-label indication imagery** — Imagery suggesting patient populations or disease indications not included in FDA-approved labeling cannot appear in promotional materials (T4_ESTIMATED — FDA compliance)
3. **No mixing Aduhelm and Leqembi brand identities** — These are distinct products with distinct approval histories; visual conflation creates regulatory and credibility risk (T4_ESTIMATED)
4. **No accessibility violations** — Color combinations must meet WCAG 2.1 AA minimum contrast ratios; patient-facing content must be screen-reader accessible (T4_ESTIMATED — accessibility compliance)
5. **No competitor product imagery without legal review** — Comparative visual demonstrations require legal and regulatory review before use in promotional materials (T4_ESTIMATED)
6. **No use of fear-based brain degeneration imagery in consumer-facing content** — Imagery of brain decay or severe neurological deterioration in patient-facing advertising creates anxiety without serving the informational purpose; clinical context only (T4_ESTIMATED)
7. **No purple (Alzheimer's palette) in MS-specific materials** — Palette segmentation between disease areas must be maintained to avoid patient confusion about indication specificity (T4_ESTIMATED)
