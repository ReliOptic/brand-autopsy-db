# 05. Design System — Baxter International (BAX)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Color System

| Color Name | HEX | Usage | Source |
|------------|-----|-------|--------|
| Baxter Blue | #003087 | Primary brand color; logo, digital UI, corporate materials | observed on baxter.com |
| Light Blue | #00A3E0 | Secondary accent; digital highlights, patient-facing content | observed on baxter.com |
| White | #FFFFFF | Primary background; clinical clarity | observed on baxter.com |
| Dark Gray | #333333 | Body text; secondary content | observed on baxter.com |
| Light Gray | #F4F4F4 | Section backgrounds; form fields | observed on baxter.com |
| Green | #78BE20 | Sustainability; positive outcomes; home dialysis content | observed on baxter.com sustainability |
| Vantive (renal spinoff) | TBD | Vantive brand colors to be established post-spinoff | (data not available — spinoff brand in development) |

---

## Typography

| Role | Typeface | Weight | Notes |
|------|----------|--------|-------|
| **Headline** | Sans-serif (Baxter proprietary or equivalent) | Bold | Clean, clinical, professional |
| **Body** | System sans-serif | Regular | Legibility in clinical documentation context |
| **Clinical data** | Monospace or condensed | Regular | Tables, clinical study references |
| **Patient materials** | Slightly warmer sans | Regular | Accessible; larger size; patient literacy considerations |

Typography principle: All typography must support legibility in clinical contexts — high-contrast, generous line spacing, no decorative elements. Regulatory disclosure text must meet minimum size requirements. (T4_INFERRED from FDA labeling requirements)

---

## Channel Design Specifications

| Channel | Spec | Notes |
|---------|------|-------|
| **baxter.com** | Full-width; 1440px design | Blue/white; clinical photography |
| **Clinical monographs** | PDF; letter size | High-density data; scientific formatting |
| **Patient materials** | PDF; letter or A4 | Accessible design; larger fonts; simple language |
| **Trade show (ASHP, HealthTrust)** | Large format displays | Product photography; clinical data callouts |
| **LinkedIn** | 1200×627px | Corporate and clinical achievement content |
| **IR materials** | PDF; professional design | Financial data; segment visualization |

---

## Layout Principles

1. **Clarity over creativity**: Medical communications prioritize clarity and legibility. Design choices that reduce comprehension — decorative fonts, low-contrast color pairings, small type — are prohibited.
2. **Data visualization as communication**: Clinical data is communicated through charts, graphs, and tables designed for fast comprehension by busy clinicians. Data viz is a core clinical communications competency.
3. **Regulatory compliance built-in**: All promotional materials for FDA-regulated products must include appropriate indications, warnings, and fair balance. Design must accommodate regulatory requirements, not work around them.
4. **Patient materials at 6th–8th grade reading level**: Health literacy research indicates that patient materials should target 6th–8th grade reading level; design must support plain language. (T4_INFERRED from health literacy best practices)

---

## Icon Style

- **Style**: Simple, functional line icons; medical and healthcare-standard iconography
- **Color**: Baxter blue on white; white on blue backgrounds
- **Medical icons**: Standard medical symbols (IV drip, kidney, heartbeat monitor) used for navigation and category identification
- **No anthropomorphic characters**: Clinical context requires professional imagery

---

## AI Image Generation Prompt Guide

(T4_INFERRED from observed visual identity):

```
Style: Clinical documentary photography; warm but professional
Color palette: Baxter blue (#003087), white, light clinical backgrounds
Subjects: Clinical settings (hospital rooms, dialysis centers, home treatment settings);
          healthcare professionals at work; patients engaged in home dialysis with dignity;
          IV bags and medical equipment in clinical context
Lighting: Clean, bright, clinical — natural light where possible
Composition: Patient-centered or clinician-centered; products visible but not dominant
Avoid: Graphic medical content (wounds, procedures); generic stock hospital imagery;
       emotional distress imagery; anything that could constitute a medical claim
Accessibility: Diverse patient and HCP representation; multiple age groups
```

---

## Design Prohibitions

1. Never use imagery that depicts medical procedures in graphic detail
2. Never use red as a primary brand color — clinical connotation of emergency/blood
3. Never make font sizes smaller than accessibility minimums in patient-facing materials
4. Never use color combinations that fail WCAG AA contrast standards — clinical contexts require maximum legibility
5. Never depict products in ways that imply uses not approved by FDA (off-label depiction risk)
6. Never use before/after medical imagery without clinical study context and regulatory review
7. Never use competitor product imagery in Baxter materials without legal review
