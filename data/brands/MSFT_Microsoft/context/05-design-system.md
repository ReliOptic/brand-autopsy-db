# 05. Design System — Microsoft Corporation (MSFT)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes
> only. It does not constitute investment advice, legal advice, or a substitute for Microsoft's
> official brand guidelines. All design observations are based on publicly accessible sources.
> CSS data was collected from microsoft.com/ko-kr (status 200). Source notation: (official) =
> company-published content; (observed on website) = direct observation with date noted;
> (CSS data) = extracted from data/raw/MSFT/css_data.json; (estimated) = project inference.
> Source tier codes: T1_OFFICIAL | T2_PRIMARY_RELIABLE | T3_SECONDARY_RELIABLE | T4_INFERRED.

---

## 1. CSS Data Summary

CSS data collected from microsoft.com/ko-kr. The dataset confirms Microsoft's design system
is operational across global regional variants of the microsoft.com domain.

**Primary colors by CSS occurrence count**:

| HEX | Count | Role |
|-----|-------|------|
| `#0067B8` | 100 | Microsoft Blue — primary brand, CTAs, hyperlinks |
| `#3AA0FA` | 88 | Azure Sky Blue — secondary interactive, Azure brand |
| `#757575` | 56 | Fluent Gray — secondary text, icon fills, disabled states |
| `#D2D2D2` | 52 | Light Gray — borders, dividers, subtle backgrounds |
| `#243A5E` | 43 | Microsoft Navy — premium/enterprise sections, dark backgrounds |
| `#50E6FF` | 43 | Fluent Cyan — Azure accent, cloud iconography, data viz |
| `#505050` | 37 | Medium Gray — body text alternative, metadata text |
| `#E6E6E6` | 35 | Near-White Gray — card backgrounds, alternate section fills |
| `#F2F2F2` | 26 | Off-White — section alternation backgrounds |
| `#171717` | 23 | Near-Black — primary body text on light backgrounds |
| `#DC3545` | 14 | Alert Red — error states, high-priority notifications |
| `#858585` | 12 | Light Medium Gray — caption text, timestamps |
| `#FFB900` | 5 | Warning Amber — caution states in security/dashboard UI |
| `#D83B01` | 3 | Error Orange-Red — critical security alerts, destructive confirmations |

**Font families confirmed in CSS**:
Segoe UI, SegoeUI, Arial, Helvetica, Helvetica Neue, Consolas, Courier, Liberation Mono,
MWF-FLUENT-ICONS (custom icon font), Menlo, SFMono-Regular, Times, Times New Roman,
TimesNewRoman.

(All data from data/raw/MSFT/css_data.json, collected from microsoft.com/ko-kr)

---

## 2. Color Palette — Full Analysis

Microsoft's design system is governed by the **Fluent Design System**, officially published
at fluent2.microsoft.design. The Fluent 2 design system (2023 release) is the current
version, succeeding Fluent 1 (formerly Metro). (official, fluent2.microsoft.design)

### 2.1 Primary Brand Colors

| Color | HEX | CSS Count | Usage | Source |
|-------|-----|-----------|-------|--------|
| **Microsoft Blue** | `#0067B8` | 100 | Primary brand color; all primary CTAs; hyperlinks across microsoft.com; Windows flag blue quadrant; corporate identity anchor | (observed on microsoft.com; CSS data) |
| **Azure Sky Blue** | `#3AA0FA` | 88 | Secondary interactive elements; Azure product brand color; hover state treatment; data visualization accent; Azure portal primary action color | (observed on microsoft.com and portal.azure.com; CSS data) |
| **Microsoft Navy** | `#243A5E` | 43 | Dark section backgrounds for premium enterprise positioning; Azure enterprise marketing overlays; gradient start for dark hero sections | (observed on azure.microsoft.com; CSS data) |
| **Fluent Cyan** | `#50E6FF` | 43 | Azure brand accent color; cloud service iconography; data visualization highlight on dark navy backgrounds; Azure marketing gradient end | (observed on azure.microsoft.com; CSS data) |

### 2.2 Neutral and System Colors

| Color | HEX | CSS Count | Usage | Source |
|-------|-----|-----------|-------|--------|
| **Fluent Gray** | `#757575` | 56 | Secondary body text; icon fills; disabled/inactive UI states; placeholder text in form fields | (observed on microsoft.com; CSS data) |
| **Light Gray** | `#D2D2D2` | 52 | Borders, dividers between card components; subtle separators; horizontal rules | (observed on microsoft.com; CSS data) |
| **Medium Gray** | `#505050` | 37 | Body text alternative where near-black is too heavy; metadata labels; secondary navigation items | (observed on microsoft.com; CSS data) |
| **Near-White Gray** | `#E6E6E6` | 35 | Card backgrounds within white sections; alternating row fills in tables; subtle lift on content modules | (observed on microsoft.com; CSS data) |
| **Off-White** | `#F2F2F2` | 26 | Section background alternation on long-scroll product pages; full-bleed section background to separate content areas | (observed on microsoft.com; CSS data) |
| **Near-Black** | `#171717` | 23 | Primary body text; high-contrast text on light backgrounds; heading text in body copy contexts | (observed on microsoft.com; CSS data) |
| **Light Medium Gray** | `#858585` | 12 | Caption text; timestamps; fine print; legal footer text | (observed on microsoft.com; CSS data) |

### 2.3 Semantic / State Colors

| Color | HEX | CSS Count | Usage | Source |
|-------|-----|-----------|-------|--------|
| **Warning Amber** | `#FFB900` | 5 | Caution states in Microsoft Defender dashboard and security UI; attention-required indicators; the yellow quadrant of the Windows 4-color logo | (observed on microsoft.com; CSS data) |
| **Alert Red** | `#DC3545` | 14 | Error states in form validation; high-priority notification badges; service health indicators in Azure portal | (observed on microsoft.com; CSS data) |
| **Error Orange-Red** | `#D83B01` | 3 | Critical security alert states; destructive action confirmation dialogs ("Delete resource?" confirmations in Azure portal) | (observed on microsoft.com; CSS data) |

### 2.4 The Windows 4-Color Logo

The four-color Windows flag is a product-specific brand mark, distinct from the corporate
color palette. The four colors are:

| Quadrant | HEX | Product Association |
|----------|-----|---------------------|
| **Red** (top-left) | `#F25022` | Not in corporate palette; Windows product mark only |
| **Green** (bottom-left) | `#7FBA00` | Not in corporate palette; Windows product mark only |
| **Blue** (top-right) | `#00A4EF` | Not in corporate palette; Windows product mark only |
| **Yellow** (bottom-right) | `#FFB900` | Appears in corporate palette as Warning Amber (count: 5) |

(observed on microsoft.com/windows; Windows brand guidelines) The four-color Windows flag
appears exclusively on Windows product pages and retail packaging; it is not used in Azure,
Microsoft 365, or corporate identity contexts. The yellow `#FFB900` is the only overlap
between the Windows product mark and the corporate UI palette.

---

## 3. Typography System

Microsoft's primary typeface system is built around **Segoe UI** — a humanist sans-serif
designed by Steve Matteson and commissioned by Microsoft, introduced system-wide with
Windows Vista (2007) and refined continuously since. Segoe UI is the typographic anchor
for Windows, Office, and all microsoft.com brand surfaces. (official, Microsoft typography
documentation, learn.microsoft.com/typography)

### 3.1 Type Roles

| Role | Typeface | Weight | Optical Size | Notes |
|------|----------|--------|-------------|-------|
| **Display / Hero headings** | Segoe UI | Light (300) at 48px+; Regular (400) at 32–48px | 48–96px | Open letterforms; generous tracking at display scale; conveys approachability without being casual. Used in hero banners and product launch headers. |
| **Section headings (H2–H3)** | Segoe UI | Semibold (600) | 24–36px | Used in product feature sections and documentation headings |
| **Body text** | Segoe UI | Regular (400) | 16–18px | Optimized for screen readability; default across microsoft.com editorial content and Office web apps |
| **UI labels and navigation** | Segoe UI | Semibold (600) for primary labels; Regular (400) for secondary | 12–14px | Windows 11 UI, Microsoft 365 web app labels, navigation bars |
| **Code / monospace** | Consolas | Regular (400) | 14px | Microsoft-designed monospace font; default in Visual Studio, VS Code, Windows Terminal; appears in developer documentation code blocks on learn.microsoft.com |
| **Icon font** | MWF-FLUENT-ICONS | — | Variable | Microsoft Web Framework Fluent icon font; vector icons for navigation, product UI, and marketing materials; confirmed in CSS data |
| **System fallback** | Arial → Helvetica Neue → sans-serif | — | — | Standard web fallback stack; CSS data confirms Arial as first fallback after Segoe UI |

### 3.2 Segoe UI Licensing Note

Segoe UI is a Microsoft proprietary typeface. It is bundled with Windows and licensed for
use within Windows system contexts. Third-party use of Segoe UI in non-Microsoft licensed
environments is not permitted without a separate license. Brand analysis materials referencing
Microsoft's design system use system-safe alternatives (Arial, Helvetica) for any typeset
examples. (T4_INFERRED from Microsoft typeface licensing terms)

### 3.3 Developer Typography (VS Code Dark Theme)

VS Code's default dark theme (Dark+) uses a monospace stack where Consolas is the primary
recommendation, with Courier New and the OS-default monospace as fallbacks. The syntax
highlighting palette uses:
- Strings: `#CE9178` (muted orange)
- Keywords: `#569CD6` (muted blue — echoing Microsoft Blue family)
- Functions: `#DCDCAA` (muted yellow)
- Comments: `#6A9955` (muted green)
- Variables: `#9CDCFE` (light cyan — echoing Azure Cyan family)
(observed on VS Code, Dark+ default theme; github.com/microsoft/vscode)

---

## 4. Fluent Design System Principles

The Fluent Design System (Fluent 2, 2023) is Microsoft's cross-platform design language,
officially published and open-source. It governs Windows 11 UI, Microsoft 365 web apps,
Azure portal, and microsoft.com marketing surfaces. (official, fluent2.microsoft.design;
github.com/microsoft/fluentui)

### 4.1 The Five Fluent Principles

**1. Coherent**: Interactions across Windows, Teams, Outlook, and Azure portal feel like they
belong to the same system. A calendar interaction in Teams follows the same patterns as a
date picker in Outlook. (official, Fluent Design System documentation)

**2. Familiar**: Fluent 2 builds on established patterns from Windows, Office, and the web.
New UI components maintain cognitive continuity with 30+ years of Windows and Office UI
conventions that 1B+ Windows users (estimated) have internalized. (T4_INFERRED from design
system documentation)

**3. Accessible**: WCAG 2.1 AA compliance is a minimum standard across Microsoft 365
applications. Microsoft has published accessibility conformance reports (VPATs) for all
major Microsoft 365 products. The Fluent color system includes minimum 4.5:1 contrast ratio
guidelines for body text. (official, microsoft.com/accessibility)

**4. Trustworthy**: The visual system signals security and stability — Microsoft Navy
(`#243A5E`) for enterprise contexts, structured layouts without visual noise, conservative
use of animation. For a company managing enterprise identity and financial data, visual
restraint signals reliability. (T4_INFERRED from design pattern analysis)

**5. Purposeful**: Motion, depth, and material effects (the "Mica" translucency material
in Windows 11) are used for orientation and meaning, not decoration. Mica shows the desktop
content beneath the app window, reinforcing the user's spatial context. (official, Windows 11
Fluent Design documentation)

### 4.2 Mica and Acrylic Materials

Windows 11 introduces two translucency materials:
- **Mica**: Subtle, desktop-sampled background blur; used in app title bars and navigation
  rails; tints based on the desktop wallpaper color. Signals "this app belongs to Windows 11."
- **Acrylic**: Stronger blur + noise effect; used in temporary surfaces (flyouts, tooltips,
  context menus). Indicates transient, dismissible UI layer.
(official, Windows 11 design documentation, learn.microsoft.com/windows/apps/design/style)

---

## 5. Layout Principles

### 5.1 Marketing Surface Layout (microsoft.com)

**Left-aligned narrative, visual right**: Microsoft's marketing pages consistently place
the headline and primary CTA on the left, with a product screenshot, illustration, or
photography on the right. This layout mirrors the F-pattern reading path and positions the
primary CTA early in the visual scan. (observed on microsoft.com hero sections, 2024)

**Card-based content architecture**: Product pages and case study listings use card-based
layouts — each card contains an icon, headline, 2–3 sentence description, and a link. The
card grid scales responsively across screen sizes and enables rapid content updates without
layout redesign. (observed on microsoft.com/solutions; microsoft.com/customers)

**Generous whitespace on enterprise pages**: Azure enterprise product pages and Dynamics 365
pages use substantially more whitespace than consumer product pages (Windows, Xbox). The
whitespace signals deliberateness for an audience evaluating multi-year, multi-million-dollar
platform commitments. (observed on azure.microsoft.com vs. xbox.com; T4_INFERRED for
audience-signal interpretation)

### 5.2 Azure Portal Layout (portal.azure.com)

Azure portal uses a **left-rail navigation** pattern with three hierarchical levels:
1. Service category icons (left sidebar — 56px wide)
2. Resource blade panel (primary content area)
3. Properties and settings panel (secondary content area, opens to the right)

This three-panel layout was designed for high-density enterprise workflows where multiple
resource properties must be visible simultaneously. The dark navy sidebar (`#243A5E`)
provides persistent orientation without competing with the white content area. (observed
on portal.azure.com; T4_INFERRED for design rationale)

### 5.3 Developer Documentation Layout (learn.microsoft.com)

- White background; maximum line length ~70 characters for reading comfort
- Left navigation table of contents (sticky on desktop)
- In-page anchor links for multi-section articles
- Consolas-font code blocks with copy-to-clipboard button
- "Tip," "Note," "Warning," and "Important" callout boxes with distinct background colors
  (`#F2F2F2` for Note; `#FFB900`-tinted for Warning)
- No photography or illustration — documentation pages are functional, not branded
(observed on learn.microsoft.com, 2024)

---

## 6. Icon System

### 6.1 Fluent Icons (Open Source)

Microsoft's open-source Fluent Icon set is published at github.com/microsoft/fluentui-system-icons.
As of 2024, the library contains 2,000+ icons in:
- **Filled** variant: solid fill, higher visual weight; for selected or active states
- **Regular** variant: outline style, lower weight; for inactive/default states
- **Light** variant: thinner strokes; for use on dense layouts or premium brand contexts
- Sizes: optimized for 16px, 20px, 24px, 28px, 32px, 48px

Icon style characteristics: rounded corners (consistent 2px radius), consistent 1.5px stroke
weight in Regular variant, friendly curves rather than sharp angles. The style is more
approachable than the sharp geometric icons of earlier Windows versions (Segoe MDL2,
Windows 8 era). (official, github.com/microsoft/fluentui-system-icons)

### 6.2 Product Mark Icons

| Product | Icon Style |
|---------|-----------|
| **Microsoft Teams** | Purple (#6264A7) speech bubble with three dots; distinct brand color outside corporate palette |
| **OneDrive** | Blue cloud with white fill; uses Azure Blue family |
| **SharePoint** | Teal (#03787C) angular mark; distinct product color |
| **Azure** | Blue A-frame composed of triangles; uses Microsoft Blue family |
| **GitHub** | Octocat — black/white silhouette; retained from pre-Microsoft acquisition; open-source identity preserved |
| **LinkedIn** | Blue square with "in" wordmark (`#0A66C2`); retained LinkedIn brand color, slightly darker than Microsoft Blue |
| **Xbox** | Green sphere with X (`#107C10` — Xbox Green); entirely separate consumer brand palette |

(observed on microsoft.com/products; respective product websites)

---

## 7. Photography and Visual Storytelling

### 7.1 Microsoft Corporate Photography Style

**Enterprise/productivity context**:
- Racially and generationally diverse teams in contemporary office environments
- Natural light preferred over studio lighting; cinematic documentary feel over staged poses
- Subjects are in motion — working, collaborating, looking at screens — not posed
- Microsoft Blue (`#0067B8`) appears as an accent in the environment (branding, screen content)
- No stock-photo clichés: no handshakes, no pointing at whiteboards with markers, no forced smiles at laptops

**Azure/Cloud technology context**:
- Abstract data visualization renders: interconnected nodes, light trails, geometric patterns
- Dark navy (`#243A5E`) dominant background
- Cyan (`#50E6FF`) accent light elements suggesting data flow
- Wide cinematic aspect ratios (16:9 or wider)
- No literal cloud imagery — the metaphor is expressed through abstract data topology

**Developer context**:
- Authentic working environments: dual monitors, dark-mode VS Code visible
- Casual, focused; not aspirational lifestyle photography
- Code visible on screen — a signal of technical legitimacy to developer audiences
- GitHub Octocat merch occasionally visible as a community authenticity signal

(observed on microsoft.com, azure.microsoft.com, github.blog image styles, 2024)

### 7.2 AI Image Prompt Guide

For generating brand-consistent imagery in analysis and research contexts:

**Corporate Microsoft / Empowerment**:
> "Diverse team of four professionals collaborating around a large curved monitor showing a
> Microsoft Teams meeting, modern glass office with natural daylight, Microsoft Blue accent
> visible in background signage, editorial documentary photography style, candid authentic
> poses, no staged handshakes"

**Azure / Cloud Infrastructure**:
> "Abstract cinematic render of interconnected data nodes with light trails over dark navy
> background (#243A5E), cyan (#50E6FF) glowing accent lines suggesting data flow between
> node clusters, no text, ultra-wide 21:9 aspect ratio, technology editorial style"

**Developer / GitHub**:
> "Software engineer in late 20s at dual-monitor workstation, VS Code open with dark theme
> and green syntax highlighting, casual home office environment, focused working posture,
> authentic candid photography, no staged poses, warm desk lamp light"

**Windows 11 / Consumer**:
> "Person in early 30s using a Surface Laptop 5 at a coffee shop, bright airy environment,
> screen shows Windows 11 Start menu with Fluent translucency effects, lifestyle editorial
> photography, shallow depth of field"

---

## 8. Channel Design Specifications

| Channel | Dimensions | Design Treatment | Notes |
|---------|------------|-----------------|-------|
| **LinkedIn (Microsoft corporate)** | 1200×627px posts; 1128×191px banner | Microsoft Blue gradient or product screenshot; Segoe UI or Arial type treatment | Corporate brand only — no Xbox or gaming content on this channel |
| **YouTube (Microsoft)** | 1280×720px thumbnail minimum; 1920×1080px preferred | Azure Blue or product-specific color; white headline on dark background | Thumbnails must read at 60px thumbnail size |
| **Twitter/X** | 1200×675px | News-format cards; Microsoft Blue primary; minimal photography in product news | Gaming account (@Xbox) uses entirely different visual treatment |
| **microsoft.com hero** | 1600×600px (observed, estimated) | Full-bleed photography with gradient overlay; left-aligned headline in Segoe UI Light/300 | Hero CTA button: `#0067B8` fill, white text |
| **Azure marketing** | Various; dark navy dominant | Data visualization heavy; `#50E6FF` cyan accent on `#243A5E` navy background | Different palette from corporate Microsoft — more technical-premium in character |
| **Developer documentation** | Web responsive; content max-width 960px | White background; `#F2F2F2` code blocks; `#0067B8` link color | Segoe UI body; Consolas code |
| **Print / Event (Ignite, Build)** | A0 poster; 8ft banner stands; 16:9 digital signage | Microsoft Blue primary; large Segoe UI display; product icon grid on white | Conference booth materials follow corporate brand guidelines |
| **Xbox Wire** | 1920×1080px game art crops | Game key art; Xbox Green (`#107C10`) accent; no Microsoft corporate brand | Separate consumer gaming brand; zero overlap with enterprise visual language |

---

## 9. Design Prohibitions

1. **No use of Segoe UI in non-Microsoft-licensed third-party contexts.** Segoe UI is a
   Microsoft proprietary typeface; third-party use requires a license. Brand analysis
   materials use Arial or Helvetica as system-safe alternatives. (T4_INFERRED from Microsoft
   typeface licensing terms)

2. **No consumer-playful color treatment on Azure or enterprise product pages.** Azure's
   enterprise positioning uses a restrained navy-blue-cyan palette. Injecting consumer
   primary colors (Xbox Green, red) undermines the enterprise trust signal that the design
   system works to establish. (T4_INFERRED from observed design pattern separation)

3. **No cross-product logo mixing without explicit product integration documentation.**
   The Teams icon should not appear in Azure-only materials; the Dynamics 365 mark should
   not appear in GitHub developer materials unless the integration is explicit, documented,
   and accurate. Cross-product logo mixing creates false product capability claims. (T4_INFERRED
   from brand standards practice)

4. **No unauthorized reproduction of the Copilot visual identity.** Microsoft's Copilot
   brand uses a specific butterfly/sparkle icon and gradient color system. Unauthorized
   derivative versions in third-party materials could create trademark liability. Describe
   the visual system without reproducing the registered mark in non-transformative contexts.
   (T4_INFERRED from trademark protection standards)

5. **No competitor product screenshots in comparative marketing materials** without
   independent verification and clear editorial labeling. Placing a Google Workspace or
   Slack screenshot in direct visual comparison with Microsoft 365 creates advertising claim
   liability unless independently verified and labeled as a comparison. (T4_INFERRED from
   advertising standards)

6. **No design patterns that contradict Microsoft's published accessibility commitments.**
   Microsoft has committed to WCAG 2.1 AA compliance across Microsoft 365 and maintains
   a Disability Answer Desk and accessibility conformance reports. Design or analysis
   materials that misrepresent Microsoft's accessibility standards undermine a documented
   brand commitment. (official, microsoft.com/accessibility)

---

*Layer 5 — Design System | Brand Autopsy DB Project*
*CSS data source: data/raw/MSFT/css_data.json (collected from microsoft.com/ko-kr, status 200)*
*Source tier system: T1_OFFICIAL | T2_PRIMARY_RELIABLE | T3_SECONDARY_RELIABLE | T4_INFERRED | T5_LLM_DRAFT*
*All HEX codes are from observed CSS data unless noted. Segoe UI and Fluent Design System
are proprietary Microsoft intellectual property. This document is descriptive brand analysis,
not a reproduction of Microsoft's confidential design documentation.*
