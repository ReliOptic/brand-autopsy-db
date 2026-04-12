# 05. Design System — American Express (AXP)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Color System

| Color Name | HEX | Usage | Source |
|------------|-----|-------|--------|
| AmEx Blue | #006FCF | Primary brand color; digital UI, logo wordmark | observed on americanexpress.com |
| Centurion Black | #000000 | Black Card premium positioning; high-tier product | observed on product imagery |
| Platinum Silver | #B8B8B8 | Platinum card tier; premium metallic effect | observed on product imagery |
| Gold | #C9A84C | Gold card tier; warm premium accent | observed on product imagery |
| White | #FFFFFF | Background; clean digital surfaces | observed on americanexpress.com |
| Light Blue | #E8F1FB | Secondary UI backgrounds; form fields | observed on americanexpress.com |
| Dark Navy | #002663 | Footer, navigation; deep authority tone | observed on americanexpress.com |

---

## Typography

| Role | Typeface | Weight | Notes |
|------|----------|--------|-------|
| **Primary (observed)** | AmericanExpress (proprietary) / sans-serif | Regular, Medium, Bold | Custom typeface family observed in brand materials; (observed on americanexpress.com) |
| **Body text** | System sans-serif stack | Regular | Digital accessibility priority |
| **Headlines** | AmericanExpress / Helvetica Neue fallback | Bold | Clean, institutional tone |
| **Legal/disclosure** | System monospace or condensed sans | Regular, small | Regulatory compliance; high legibility required |

Typography principle: **No decorative or script typefaces**. AmEx typography communicates institutional reliability, not playfulness. (T4_INFERRED from observed brand materials)

---

## Channel Design Specifications

| Channel | Spec | Notes |
|---------|------|-------|
| **Card face** | 85.6 × 54mm (ISO/IEC 7810 ID-1) | Metallic finish on Platinum/Gold (official product specs) |
| **Instagram feed** | 1080×1080px | Blue + white dominant; card product centered |
| **Instagram Stories** | 1080×1920px | Lifestyle photography; minimal text overlay |
| **Email header** | 600px wide | AmEx Blue header; white body; high contrast |
| **OOH / Airport** | Varies | Large format; single benefit headline; card visual |
| **Display ads** | IAB standard units | Blue/white; benefit-forward; clear CTA |

---

## Layout Principles

1. **Hierarchy through whitespace**: Premium brands signal confidence through restraint. AmEx digital pages use generous padding to avoid the cluttered look of mass-market financial products. (observed on americanexpress.com)
2. **Card as hero object**: The physical card product is always rendered at scale and with accurate metallic/material fidelity. The card is an aspirational object, not a utility illustration.
3. **Benefit before product**: Layout sequences lead with what the cardmember receives, then introduces the product name. The customer outcome precedes the brand ask.
4. **Human faces in context**: Photography features real-use scenarios (airport lounge, restaurant, hotel check-in) rather than isolated product shots. The lifestyle context sells the membership, not the plastic.

---

## Icon & Illustration Style

- **Icon style**: Outlined, thin-stroke icons aligned with digital banking UI conventions. No filled flat icons (too casual). (observed on americanexpress.com app screenshots)
- **Card tier illustrations**: Rendered with material accuracy — the Centurion Card is depicted with metal texture; the Green card with matte finish.
- **No mascots or characters**: AmEx does not use brand characters. Institutional identity requires human photography, not illustration-led content.

---

## AI Image Generation Prompt Guide

For brand-consistent AI image generation (T4_INFERRED from observed visual identity):

```
Style: Premium editorial photography, business lifestyle
Color palette: Deep blue (#006FCF), white, warm neutral backgrounds
Lighting: Natural window light or warm interior ambient; no harsh flash
Subjects: Professionals aged 30–55, diverse, in aspirational settings (airport lounge, 
          high-end restaurant, hotel lobby, executive office)
Avoid: Cartoon elements, bright saturated colors outside brand palette, 
       competitors' logos, generic stock photo aesthetics
Card depiction: If showing card, use accurate proportions and render as premium object
Composition: Generous negative space; subject typically occupies 40–60% of frame
```

---

## Design Prohibitions

1. Never render the card with inaccurate tier colors (green card as gold, etc.)
2. Never use fonts with playful or hand-drawn characteristics
3. Never use red in primary compositions — signals urgency/warning, contradicts premium positioning
4. Never crowd layouts with multiple competing CTAs on a single surface
5. Never use generic stock photography featuring anonymous faces — AmEx photography has editorial specificity
6. Never reduce the AmEx blue to a lighter tint for primary elements — dilutes brand authority
7. Never place the centurion figure (Black Card icon) on non-black or non-dark backgrounds
