# 05. Design System — Bank of America (BAC)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Color System

| Color Name | HEX | Usage | Source |
|------------|-----|-------|--------|
| BofA Red | #E31837 | Primary brand color; logo, CTAs, primary accents | observed on bankofamerica.com |
| Dark Navy | #012169 | Secondary brand color; headers, navigation, authority elements | observed on bankofamerica.com |
| White | #FFFFFF | Primary background; clean financial presentation | observed on bankofamerica.com |
| Light Gray | #F5F5F5 | Section backgrounds; card containers | observed on bankofamerica.com |
| Medium Gray | #666666 | Body text; secondary content | observed on bankofamerica.com |
| Light Red | #FDECEA | Alert backgrounds; soft red usage | observed on bankofamerica.com |
| Merrill Blue | #0072CE | Merrill Lynch brand integration; investment content | observed on merrill.com |

---

## Typography

| Role | Typeface | Weight | Notes |
|------|----------|--------|-------|
| **Primary headline** | BofA Sans (proprietary) / Helvetica Neue equivalent | Bold | Clean institutional sans-serif (observed on bankofamerica.com) |
| **Body** | System sans-serif | Regular | Legibility priority; financial disclosure context |
| **Erica interface** | Sans-serif, conversational | Regular | Conversational AI context; slightly warmer tone |
| **Legal/disclosure** | Condensed sans or system font | Regular, small | Regulatory compliance; maximum legibility |

---

## Channel Design Specifications

| Channel | Spec | Notes |
|---------|------|-------|
| **Web hero** | Full-width, 1440px design width | Red + navy + human photography |
| **Mobile app** | iOS/Android standard; BofA design system | Erica chat interface; card-based layout |
| **Email** | 600px wide | Red header; white body; navy footer |
| **Instagram** | 1080×1080; 1080×1920 Stories | Life moment photography; minimal product |
| **Financial center** | Physical signage; digital display | Red exterior; consistent nationwide |
| **ATM interface** | 800×600 touchscreen standard | High-contrast; accessibility-compliant |

---

## Layout Principles

1. **People-first photography**: BofA imagery leads with human subjects in life moments (family at home purchase, graduate receiving diploma, business owner at storefront) — not product or abstract imagery. (observed on bankofamerica.com)
2. **Red as action signal**: The brand red is reserved for CTAs, key data highlights, and logo. It is not used as background at scale — this preserves its urgency/action signal function.
3. **Information hierarchy**: Financial products require clear information hierarchy — monthly fee, then waiver conditions, then benefits. Layout sequences information in decision-support order.
4. **Accessibility-first**: As a regulated institution serving all demographics including elderly customers, BofA design systems must meet WCAG AA accessibility standards. (T4_INFERRED from ADA compliance requirements for financial institutions)

---

## Icon Style

- **Style**: Solid/filled icons; clean geometric style; consistent weight
- **Color**: Navy or red on white backgrounds; white on colored backgrounds
- **Function**: Icons support financial categories (account types, transaction categories) and navigation — always functional, never decorative
- **Erica avatar**: Stylized circular avatar; branded but not hyper-realistic — approachable, not humanoid

---

## AI Image Generation Prompt Guide

(T4_INFERRED from observed visual identity):

```
Style: Lifestyle documentary photography; warm and authentic
Color palette: BofA red accents (#E31837), navy (#012169), warm neutral backgrounds
Subjects: Diverse Americans across age groups; life milestone moments (home purchase,
          business launch, family, retirement); financial confidence expressed through
          body language and setting, not through money/wealth symbols
Lighting: Warm natural light; daytime; optimistic
Composition: Human-centered; subject at 50–70% of frame; environmental context visible
Avoid: Abstract finance imagery (coins, graphs alone), generic stock photo aesthetics,
       luxury signaling, competitor branding
```

---

## Design Prohibitions

1. Never use red as a large-area background — high anxiety signal; reserved for accents and CTAs
2. Never mix Merrill Lynch blue with BofA red in ways that create visual confusion between brands
3. Never use imagery of distressed financial situations (credit card debt, overdraft) in acquisition content
4. Never violate WCAG AA contrast ratios — regulatory and accessibility compliance is non-negotiable
5. Never use cartoon or mascot characters — institutional trust requires authentic human imagery
6. Never reproduce customer financial data or account information in any brand material
7. Never design CTAs in colors that could be confused with warning states (orange, yellow)
