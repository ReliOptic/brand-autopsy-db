# 05. Design System Spec — Alphabet Inc. / Google (GOOG)

> **Disclaimer**: This document is brand strategy analysis based on publicly accessible sources: google.com, Material Design documentation (m3.material.io), and observed marketing materials. Source notation: `(official)` = Google-published; `(observed)` = direct observation; `(estimated)` = project inference.

---

## 1. Color Palette

### Core Brand Colors (Google Four-Color System)

| Token Name | HEX | Role | Usage |
|---|---|---|---|
| `color-google-blue` | `#4285F4` | Primary Blue | Google logo, primary product accent, links (official, Google Brand Guidelines) |
| `color-google-red` | `#EA4335` | Red | Google logo, error states, YouTube (official) |
| `color-google-yellow` | `#FBBC05` | Yellow | Google logo, warning states (official) |
| `color-google-green` | `#34A853` | Green | Google logo, success states, Android (official) |
| `color-surface-white` | `#FFFFFF` | Background | Google.com, product backgrounds (observed) |
| `color-text-primary` | `#202124` | Primary Text | Body copy, headings (observed on google.com) |
| `color-text-secondary` | `#5F6368` | Secondary Text | Captions, metadata, URL text in search results (observed) |
| `color-surface-grey` | `#F8F9FA` | Section Background | Search bar background, card surfaces (observed) |
| `color-divider` | `#DADCE0` | Borders/Dividers | Input borders, card edges (observed) |

### Material Design 3 Extended Palette

Google products implement Material Design 3's dynamic color system, which generates palette variants from a seed color. The four brand colors serve as seed colors for product-specific palettes. (official, m3.material.io)

### Color Principles

**Principle 1 — Four colors, used sparingly.** The Google logo's four colors appear together almost exclusively in the logo itself. Individual products use one or two brand colors as accents on a predominantly white/grey surface. (observed)

**Principle 2 — White space is the dominant design element.** Google.com's homepage is the defining example — over 90% of the viewport is white space. (observed on google.com)

**Principle 3 — Dynamic color in apps; static brand colors in marketing.** Material Design 3 allows apps to adapt color to user wallpaper; marketing materials use fixed brand colors. (official, m3.material.io)

---

## 2. Typography

### Typeface System

| Typeface | Description | Contexts |
|---|---|---|
| **Google Sans** | Proprietary geometric sans-serif; Google's primary display typeface | Product UI headlines, marketing, Google logos for sub-brands (official) |
| **Google Sans Text** | Optimized for body-size reading | Product UI body copy (official) |
| **Roboto** | Open-source neo-grotesque sans-serif | Android system font, Material Design default, Google product body text (official, fonts.google.com) |
| **Noto** | Pan-Unicode typeface family covering 1,000+ languages | Internationalization; ensures every language is visually supported (official, fonts.google.com/noto) |

### Typographic Scale (Material Design 3)

| Role | Typeface | Weight | Size | Line Height |
|---|---|---|---|---|
| **Display Large** | Google Sans | Regular 400 | 57px | 64px |
| **Headline Large** | Google Sans | Regular 400 | 32px | 40px |
| **Title Large** | Google Sans | Regular 400 | 22px | 28px |
| **Body Large** | Roboto | Regular 400 | 16px | 24px |
| **Label Large** | Roboto | Medium 500 | 14px | 20px |

(official, m3.material.io/styles/typography)

---

## 3. Channel Specifications

| Channel | Asset Type | Dimensions | Key Notes |
|---|---|---|---|
| **google.com** | SVG / PNG | Google logo: 272 × 92 px (standard) | Minimal page; logo + search bar dominates (observed) |
| **YouTube** | Various | Per YouTube spec | YouTube has its own sub-brand design system |
| **Google Blog** | JPEG/WebP | 1200 × 628 px header | Clean, minimal, product photography or illustration |
| **Google I/O** | Keynote/Video | 1920 × 1080 / 4K | Colorful, energetic, developer audience |
| **Google Cloud** | Enterprise | Per enterprise spec | Separate design language, more formal |

---

## 4. Layout Principles

**Principle 1 — Radical simplicity.** google.com has remained essentially unchanged since 1998: logo, search bar, two buttons. This is the most successful homepage design in history. (observed)

**Principle 2 — Material Design as the universal design language.** Material Design (now M3) provides a consistent visual and interaction language across all Google products — Android, web, iOS. (official, m3.material.io)

**Principle 3 — Cards as the fundamental content unit.** Google's UI paradigm organizes information into cards — self-contained content containers with consistent shadow, corner radius (28px in M3), and spacing. (official, Material Design)

**Principle 4 — Responsive and adaptive by default.** Material Design 3 includes responsive layout grids for phone, tablet, and desktop. (official)

---

## 5. Icon & Illustration Style

- **Icon system**: Material Symbols — Google's icon library with variable weight, fill, grade, and optical size axes. 3,000+ icons. (official, fonts.google.com/icons)
- **Illustration style**: Google's marketing illustrations use flat, geometric shapes with the four brand colors. Human figures are stylized and diverse. No photorealistic illustration. (observed on blog.google)

---

## 6. AI Image Generation Prompt Guide

### Google-Style Product Interface
```
Clean minimal UI mockup, white (#FFFFFF) background, single Google-blue (#4285F4) accent element, Material Design 3 card with 28px corner radius, subtle shadow, Roboto typography, no text content, product interface aesthetic
```

### Google Marketing Illustration
```
Flat geometric illustration, four-color palette (blue #4285F4, red #EA4335, yellow #FBBC05, green #34A853) on white background, stylized diverse human figures, abstract technology concepts, Google marketing style, playful but professional
```

---

## 7. Design Prohibitions

1. **No gradients on the Google logo.** The logo uses flat, solid brand colors only. (official)
2. **No more than the four brand colors in marketing illustrations.** Extended palette exists but marketing defaults to the quad. (T4_INFERRED)
3. **No skeuomorphic design elements.** Material Design is flat with layered elevation via shadow. (official)
4. **No dense layouts.** Google products default to generous spacing and whitespace. (official, Material Design)
5. **No serif typefaces in product UI.** Google Sans and Roboto are sans-serif; serif use is limited to editorial contexts. (observed)
6. **No inconsistency between platforms.** Material Design ensures visual consistency across Android, iOS, and web. (official)

---

*Layer 5 of 8 — Brand Autopsy: Alphabet Inc. / Google (GOOG)*
