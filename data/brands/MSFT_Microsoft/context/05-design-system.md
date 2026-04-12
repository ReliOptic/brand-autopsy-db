# 05. Design System — Microsoft (MSFT)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference.

---

## CSS Data Summary

CSS data collected from microsoft.com/ko-kr. Primary colors extracted include Microsoft Blue (#0067B8, count: 100), Azure Sky Blue (#3AA0FA, count: 88), Fluent Gray (#757575, count: 56), and Microsoft Navy (#243A5E, count: 43). Full font stack confirmed: primary typeface is Segoe UI with Arial/Helvetica system fallbacks. (data/raw/MSFT/css_data.json, status 200)

---

## Color Palette

Microsoft's design system is governed by the Fluent Design System, officially published and available to developers and partners. (official, fluent2.microsoft.design)

| Color | HEX | Usage | Source |
|-------|-----|-------|--------|
| **Microsoft Blue** | `#0067B8` | Primary brand color; primary CTAs; hyperlinks; product logos; Windows flag blue segment | (observed on microsoft.com; CSS data count: 100) |
| **Azure Sky Blue** | `#3AA0FA` | Secondary interactive elements; Azure product brand; hover states; data visualization accent | (observed on microsoft.com; CSS data count: 88) |
| **Fluent Gray** | `#757575` | Body text secondary; icon fills; disabled states | (observed on microsoft.com; CSS data count: 56) |
| **Microsoft Navy** | `#243A5E` | Dark backgrounds; premium positioning sections; Azure enterprise marketing | (observed on microsoft.com; CSS data count: 43) |
| **Fluent Cyan** | `#50E6FF` | Azure brand accent; cloud service iconography; highlight elements | (observed on microsoft.com; CSS data count: 43) |
| **Near-Black** | `#171717` | Primary body text; high-contrast text on light backgrounds | (observed on microsoft.com; CSS data count: 23) |
| **Warning Amber** | `#FFB900` | Caution states in security dashboard UI; attention indicators | (observed on microsoft.com; CSS data count: 5) |
| **Error Red** | `#D83B01` | Error states; critical security alerts; destructive action confirmations | (observed on microsoft.com; CSS data count: 3) |
| **Off-White** | `#F2F2F2` | Section background alternation; card backgrounds on white pages | (observed on microsoft.com; CSS data count: 26) |

**Note on the Windows logo**: The four-color Windows flag (blue, red, yellow, green) is a product-specific brand mark, not part of the corporate color system. It appears on Windows product pages and retail packaging. (observed on microsoft.com/windows)

---

## Typography

Microsoft's primary typeface system is built around **Segoe UI** — a humanist sans-serif designed by Steve Matteson and commissioned by Microsoft for use across Windows and Office beginning with Vista (2007). (official, Microsoft typography documentation)

| Role | Typeface | Weight / Style | Notes |
|------|----------|----------------|-------|
| **Display headings** | Segoe UI | Light (300) or Regular (400) at large sizes | Large, open letterforms; generous tracking; conveys approachability at display scale |
| **Body text** | Segoe UI | Regular (400) | Optimized for screen readability; used across microsoft.com and Office applications |
| **UI elements** | Segoe UI | Semibold (600) for labels; Regular for body | Consistent across Windows 11, Microsoft 365 web apps |
| **Code / monospace** | Consolas | Regular (400) | Microsoft-designed monospace font; default in Visual Studio and VS Code; also appears in developer documentation |
| **System fallback** | Arial → Helvetica Neue → sans-serif | — | Standard web fallback stack; CSS data confirms Arial as first fallback |
| **Icon font** | MWF-FLUENT-ICONS | Custom | Microsoft Web Framework icon font; vector icons for navigation, product UI, and marketing materials. (CSS data confirmed) |

---

## Channel Specifications

| Channel | Dimensions | Specifications |
|---------|------------|----------------|
| **LinkedIn (Microsoft)** | 1200×627px posts; 1128×191px banner | Fluent-consistent blue gradient or product screenshot; Segoe UI type treatment |
| **YouTube (Microsoft)** | 1280×720px or 1920×1080px thumbnails | Azure blue or product-specific color treatment; white Segoe UI headline |
| **Twitter/X** | 1200×675px | News-format cards; blue primary; minimal photography |
| **microsoft.com hero** | 1600×600px (estimated) | Full-bleed photography with gradient overlay; left-aligned headline in Segoe UI Light |
| **Azure marketing** | Various; dark navy (#243A5E) dominant | Data visualization heavy; cyan (#50E6FF) accent on dark background |
| **Print / Event (Ignite, Build)** | A0 poster, banner stands | Microsoft Blue primary; large Segoe UI display; product icon grids |
| **Developer documentation** | Web responsive | White background; left navigation; Consolas code blocks; minimal imagery |

---

## Layout Principles

1. **Fluent Design: depth, motion, material, light**: Microsoft's Fluent Design System (officially published at fluent2.microsoft.design) governs all product and marketing design. The four principles are: depth (layering and shadow), motion (purposeful animation), material (translucency in UI), and light (adaptive lighting effects). (official, Microsoft Fluent Design System documentation)

2. **Left-aligned narrative with visual right**: Microsoft's marketing pages consistently place headline and CTA on the left, with a product screenshot, illustration, or photography on the right. This layout mirrors F-pattern reading and positions the call-to-action early in the visual scan path. (observed on microsoft.com hero sections)

3. **Card-based content architecture**: Microsoft.com and all Microsoft 365 product pages use card-based layouts for feature displays, case studies, and resource libraries. Each card is visually independent with an icon, headline, short description, and link. This modular architecture scales across screen sizes and allows rapid content updates without layout redesign. (observed on microsoft.com)

4. **Data visualization as a product feature signal**: Azure's marketing pages use live-looking dashboard screenshots and animated data visualizations as primary product imagery. The message is implicit: the product produces clarity from data. (observed on azure.microsoft.com)

5. **Whitespace as enterprise trust signal**: Microsoft's enterprise product pages (Azure, Microsoft 365 Enterprise, Dynamics 365) use more generous whitespace than consumer product pages. Whitespace signals deliberateness and quality in enterprise contexts where buyers are evaluating multi-year commitments. (observed on microsoft.com/enterprise vs. microsoft.com/store)

---

## Icon Style

- **Fluent Icons**: Microsoft's open-source Fluent Icon set (available on GitHub at github.com/microsoft/fluentui-system-icons) contains 1,800+ icons in filled and regular variants. Style: rounded corners, consistent stroke weight, optimized for 20px and 24px sizes. (official, GitHub microsoft/fluentui-system-icons)
- **Product logos**: Microsoft 365, Teams, OneDrive, Azure, and Xbox each have distinct product mark designs within the Fluent visual language. All use the Microsoft color palette and share the Segoe typeface for wordmarks. (observed on microsoft.com products)
- **The Windows flag**: Four colored squares (blue, red, green, yellow) in a perspective grid form. Registered trademark; used exclusively for Windows product branding. (official, Windows brand guidelines)

---

## AI Image Prompt Guide

For generating brand-consistent imagery in research and analysis contexts:

**Corporate Microsoft / Empowerment**:
> "Professional photograph of a diverse team collaborating around a large monitor showing a Microsoft Teams meeting, modern office environment with natural light, Microsoft Blue accent colors in branding visible in background, editorial documentary style"

**Azure / Cloud Technology**:
> "Abstract digital visualization of interconnected data nodes over a dark navy (#243A5E) background, cyan (#50E6FF) accent light trails, representing cloud infrastructure, no text, cinematic wide-angle, technology editorial style"

**Developer / GitHub**:
> "Young software engineer at dual monitors with VS Code IDE open showing green syntax highlighting, dark theme editor, casual office environment, authentic candid photography style, no staged poses"

---

## Design Prohibitions

1. **No use of Segoe UI in non-Microsoft licensed contexts**: Segoe UI is a Microsoft proprietary typeface and is not licensed for use by third parties outside of Windows system contexts. Brand analysis materials referencing Microsoft's design use system-safe alternatives. (T4_INFERRED from Microsoft typeface licensing terms)
2. **No rainbow or consumer-playful color treatments on Azure or enterprise pages**: Azure's enterprise positioning uses a restrained blue-navy-cyan palette. Injecting consumer-playful color treatments undermines the enterprise trust signal. (T4_INFERRED from observed design pattern separation)
3. **No mixing of product logos across product contexts**: The Teams icon should not appear in Azure product materials unless the integration is explicit and accurate. Cross-product logo mixing creates false product capability claims. (T4_INFERRED from brand standards)
4. **No unauthorized Copilot character imagery**: Microsoft's Copilot AI product uses a specific butterfly/sparkle icon. Unauthorized derivative or parody versions of this mark in brand analysis materials could create trademark liability. (T4_INFERRED from trademark protection standards)
5. **No competitor product screenshots in comparative marketing materials**: Placing a Google Workspace or Slack screenshot alongside Microsoft 365 in a direct visual comparison creates advertising claim liability unless the comparison is independently verified and labeled as a comparison. (T4_INFERRED from advertising standards)
6. **No dark patterns in UI design that conflict with Microsoft's accessibility commitments**: Microsoft has published accessibility commitments (WCAG 2.1 AA compliance across Microsoft 365) and has a Disability Answer Desk. Design that contradicts these commitments creates reputational risk. (official, Microsoft Accessibility documentation)
