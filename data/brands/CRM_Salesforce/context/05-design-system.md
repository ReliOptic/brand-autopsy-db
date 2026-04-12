# 05. Design System — Salesforce (CRM)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

CSS data collected from salesforce.com (status 200). Colors and fonts are from observed website CSS. (data available from CSS observation)

---

## Color Palette

| Role | Color Name | HEX | Usage |
|------|-----------|-----|-------|
| **Primary Brand Blue** | Salesforce Blue | `#0176D3` | Primary CTAs, navigation, links — the core brand color (observed on salesforce.com CSS) |
| **Deep Navy** | Midnight Blue | `#032D60` | Dark backgrounds, hero sections, enterprise-grade depth (observed on salesforce.com CSS) |
| **Dark Navy** | Brand Dark | `#001639` | Darkest backgrounds, footer areas (observed on salesforce.com CSS) |
| **Action Blue** | Interactive Blue | `#1B96FF` | Hover states, interactive elements (observed on salesforce.com CSS) |
| **AI Purple** | Agentforce Purple | `#7F56D9` | Agentforce AI product line; signals intelligence and differentiation (observed on salesforce.com CSS) |
| **Deep Purple** | Platform Deep | `#321D71` | AI and Platform deep section backgrounds (observed on salesforce.com CSS) |
| **Accent Cyan** | Innovation Teal | `#00D4FF` | Highlight accents in AI and innovation contexts (observed on salesforce.com CSS) |
| **Success Green** | Status Green | `#2E844A` | Success states, positive metrics, ESG content (observed on salesforce.com CSS) |
| **Light Blue** | Background Wash | `#EAF5FE` | Card backgrounds, section washes (observed on salesforce.com CSS) |
| **Dark Text** | Carbon | `#181818` | Primary body text (observed on salesforce.com CSS) |
| **White** | Pure White | `#FFFFFF` | Backgrounds, clean layouts |

**Design Note**: The Salesforce color system underwent a significant evolution with the Agentforce launch in 2024. Purple and blue-to-purple gradient tones now signal AI capabilities, layered on top of the original Salesforce Blue system. This creates a visual vocabulary where color immediately indicates whether content relates to core CRM or AI capabilities. (T4_INFERRED, observed on salesforce.com)

---

## Typography

| Role | Typeface | Weight | Usage |
|------|----------|--------|-------|
| **Primary Display** | Salesforce Sans (proprietary) | Bold, SemiBold | Headlines, campaign titles, hero text (official, Salesforce Lightning Design System) |
| **Body Text** | Salesforce Sans | Regular, Light | Body copy, UI labels, navigation |
| **Fallback Stack** | Helvetica Neue, Arial, sans-serif | Various | Web fallback (observed on salesforce.com CSS) |
| **UI System Font** | var(--sds-g-font-family) | Various | Lightning Design System UI components (observed on salesforce.com CSS) |

**Note**: Salesforce Sans is a proprietary typeface used across all Salesforce brand and product touchpoints. The Lightning Design System (LDS) — Salesforce's open-source design system — documents all typographic standards and is publicly available at lightningdesignsystem.com. (official, Lightning Design System)

---

## Channel Design Specifications

| Channel | Dimensions | Key Specs |
|---------|-----------|-----------|
| **LinkedIn Post** | 1200×627px | Salesforce Blue hero with white text; research reports use data-forward layout |
| **LinkedIn Document / Carousel** | 1080×1080px | Trailblazer portraits; product feature carousels with step-by-step structure |
| **Twitter / X Header** | 1500×500px | Salesforce Blue gradient; Dreamforce branding during event season |
| **YouTube Thumbnail** | 1280×720px | Face plus bold headline; Salesforce Blue accent bar at bottom |
| **Blog / Resource Hero** | 1440×600px | Customer photography with product UI overlay on right panel |
| **Dreamforce Event Materials** | Multiple | Annual rebrand with San Francisco visual references; Astro mascot prominent |

---

## Layout Principles (min 4)

**1. Benefit-First Hierarchy**
Every page and ad leads with the customer outcome ("Grow revenue faster") before the mechanism ("with Sales Cloud"). The product is never the hero — the customer result is. (observed on salesforce.com)

**2. Data Visualization as Content**
Research report pages and thought leadership content use custom data visualizations. Charts, percentage callouts, and data tables are treated as design elements, not merely supporting information — reflecting the Sage archetype's authority positioning. (observed on salesforce.com/research)

**3. Human Photography Over Product Screenshots**
Campaign and homepage imagery prioritizes real people — Trailblazers, customers, executives — over product UI screenshots. Product UI appears in secondary positions as supporting evidence of capability. (observed on salesforce.com)

**4. AI Visual Grammar (2024 onward)**
Agentforce and AI content uses a distinct visual language: dark navy and purple gradients, geometric node-and-connection motifs, and cyan accent lines. This creates an immediate visual signal distinguishing AI content from core CRM content and allows both to coexist on the same platform without visual confusion. (observed on salesforce.com/agentforce)

**5. Progressive Disclosure for Complex Products**
Long-form product pages use progressive disclosure: the hero section leads with a simple benefit statement, followed by tabs or scroll-triggered sections adding increasing technical detail. Designed to serve both quick scanners (CRO) and deep readers (admin or CIO) simultaneously. (observed on salesforce.com)

---

## Icon Style

- **Style**: Flat, outlined, single-weight stroke
- **Shape Language**: Rounded corners; organic curves mixed with geometric forms
- **Color Application**: Salesforce Blue (`#0176D3`) for primary icons; multi-color for cloud product icons (Sales Cloud = blue, Service Cloud = blue-teal, Marketing Cloud = orange-purple)
- **Mascot**: Astro — the Salesforce astronaut character — appears in onboarding, Trailhead, and event contexts. The mascot humanizes technical content and reinforces the Trailblazer exploratory spirit without clashing with enterprise positioning. (official, Salesforce brand characters)
- **Source**: Lightning Design System icon library is publicly available (official, SLDS at lightningdesignsystem.com)

---

## AI Image Prompt Guide

**Trailblazer Portrait**:
"Professional portrait style, diverse individual at a modern office workspace, confident expression, natural window light, shallow depth of field, editorial photography, Salesforce blue accent element in background, no text overlay, authentic not staged"

**Product Dashboard**:
"Clean enterprise SaaS dashboard on a laptop screen, data visualizations in blue and white, modern open-plan office environment, shallow depth of field, professional photography, no competitor logos"

**Dreamforce Event Energy**:
"Large technology conference main stage, audience in foreground, stage lighting in deep blue and purple, energetic atmosphere, people engaged, wide-angle shot, professional event photography"

**AI / Agentforce**:
"Abstract network of glowing nodes and data connections, deep navy and purple gradient background, cyan accent light points, clean geometric forms, technology editorial style, no human faces, no text"

---

## Design Prohibitions (min 6)

1. **No rasterized or stretched Salesforce cloud product logos** — Each cloud product (Sales Cloud, Service Cloud) has a precisely defined logo. Distortion violates brand standards. (official, Salesforce Brand Guidelines)
2. **No off-brand colors adjacent to the Salesforce wordmark** — The Salesforce logo must appear on approved backgrounds. Non-brand colors create unauthorized visual associations. (official, Salesforce Brand Guidelines)
3. **No competitor product UI in Salesforce marketing materials** — Screenshots of competing CRM interfaces in comparison contexts are restricted to sales enablement, not brand-level content. (T4_INFERRED)
4. **No informal or humorous tone in security and compliance content** — The Einstein Trust Layer and data governance messaging requires measured, precise visual and verbal tone. Casual styling in security content undermines enterprise trust. (T4_INFERRED)
5. **No Astro mascot in CFO-facing or financial ROI content** — The character mascot is appropriate for community, learning, and developer contexts. Using it in financial justification or C-suite board materials creates a tone mismatch. (T4_INFERRED, observed contextual mascot usage)
6. **No Agentforce purple in non-AI product contexts** — The AI visual grammar (purple gradient and cyan) is reserved for AI and Agentforce content. Using it for core CRM product content creates confusion about what capabilities are AI-powered. (T4_INFERRED, observed design system separation)
7. **No unauthorized use of customer logos in marketing** — Named customer reference logos require explicit written approval per standard B2B marketing and legal practice. (T4_INFERRED, standard legal requirement)
