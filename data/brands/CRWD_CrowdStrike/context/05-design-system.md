# 05. Design System — CrowdStrike Holdings, Inc. (CRWD)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference. CSS color data sourced from crowdstrike.com via automated extraction.

---

## Color Palette

| Role | Color Name | HEX | CSS Source | Usage |
|------|------------|-----|-----------|-------|
| **Primary Red** | CrowdStrike Red | `#EC0000` | Extracted from crowdstrike.com CSS (count: 12) | Primary CTA buttons, brand accent, falcon icon, alert states |
| **Primary Blue** | CrowdStrike Blue | `#0024FF` | Extracted from crowdstrike.com CSS (count: 9) | Secondary interactive elements, data visualization, link states |
| **Neutral Mid** | Carbon Gray | `#949494` | Extracted from crowdstrike.com CSS (count: 2) | Supporting UI elements, secondary text, dividers |
| **Neutral Dark** | Steel Gray | `#707070` | Extracted from crowdstrike.com CSS (count: 1) | Body text on light backgrounds, form labels |
| **Background Black** | Void Black | `#0D0D0D` | Observed on crowdstrike.com (estimated) | Primary background; reinforces threat/dark theme |
| **Pure White** | White | `#FFFFFF` | Observed on crowdstrike.com | Text on dark backgrounds; headline contrast |

**Color Rationale**: The dominant dark background with CrowdStrike Red as primary accent creates visual associations with urgency and vigilance — aligned with the "We stop breaches" positioning. The red-on-black palette is uncommon in enterprise SaaS (which favors blue-on-white) and functions as a visual differentiator in security trade publication advertising. (T4_INFERRED from observed design system)

---

## Typography

| Role | Font Family | Weight | CSS Source |
|------|------------|--------|-----------|
| **Brand Display** | CrowdStrike Sharp Sans | ExBd (ExtraBold), Bold, SemiBold | Extracted from crowdstrike.com CSS — proprietary typeface |
| **Brand Body** | CrowdStrike Sharp Sans | Book, Light, Medium | Extracted from crowdstrike.com CSS |
| **Display Secondary** | Neue Haas Grotesk Display Pro | Black, Bold, Medium, Roman | Extracted from crowdstrike.com CSS |
| **Display Tertiary** | Haas Grot Display | 75 Bold, 65 Medium, 55 Roman | Extracted from crowdstrike.com CSS |
| **Accent Display** | Tungsten Rounded | Bold, SemiBold, Medium, Book | Extracted from crowdstrike.com CSS |
| **Accent Novelty** | Fatman Light | Light | Extracted from crowdstrike.com CSS |

**Typography Rationale**: CrowdStrike Sharp Sans is a proprietary custom typeface — signaling the same brand investment level as Apple's SF Pro or Google's Product Sans. Custom typefaces are uncommon among cybersecurity vendors and reinforce enterprise-tier positioning. The secondary use of Neue Haas Grotesk Display Pro (a premium grotesque) indicates Swiss design influence: clean, precise, industrial. (T4_INFERRED from font naming conventions and observed layout)

---

## Channel Specifications

| Channel | Dimensions | Format | Primary Color Mode |
|---------|-----------|--------|-------------------|
| **Website hero** | 1440px width, full-bleed | Dark background, red accent CTA | Dark |
| **LinkedIn post image** | 1200 × 627px | Dark card with red headline accent | Dark |
| **Twitter/X card** | 1200 × 675px | Threat intelligence graphic, dark background | Dark |
| **Fal.Con event stage** | 1920 × 1080px | Red gradient on black | Dark |
| **PDF report (Global Threat Report)** | Standard Letter | Dark cover with adversary imagery, red typography | Dark |
| **Display advertising** | 300 × 250, 728 × 90, 160 × 600 | Red CTA on dark background | Dark |

---

## Layout Principles

1. **Dark-first by default**: CrowdStrike's primary web and marketing environment is dark-background. Light mode is used only for specific data-dense contexts (PDF white papers, compliance briefs) where print legibility requires it. Consistent across crowdstrike.com, Fal.Con event materials, and advertising. (observed on crowdstrike.com)

2. **Data density as authority signal**: Information-dense layouts — threat statistics, module counts, performance benchmarks — are preferred over sparse aspirational imagery. The design communicates that the brand has substance to show, not just a visual to project. (T4_INFERRED from observed layout patterns)

3. **Red as action, not decoration**: CrowdStrike Red (`#EC0000`) is reserved for CTAs, alerts, and brand marks. It is not used as a background fill or decorative element. This maintains color hierarchy: red means "act now." (observed on crowdstrike.com)

4. **The Falcon symbol as single icon**: The CrowdStrike falcon mark appears as the sole iconographic element for brand identification. No secondary mascots or character marks. The icon is rendered in brand red or white — never in a muted or altered color. (observed on crowdstrike.com and product materials)

5. **Motion used for threat data, not decoration**: Animated elements on crowdstrike.com are data visualizations — threat telemetry counters, attack map animations — not decorative motion. Animation signals live threat activity, not brand personality. (observed on crowdstrike.com homepage)

---

## Icon Style

- **Style**: Sharp-edged, geometric, monoline. Not rounded or playful.
- **Color**: Monochromatic. Red on dark, or white on dark. No multi-color icons in product UI.
- **Size system**: Product UI uses 16px, 24px, 32px grid.
- **Forbidden**: Gradients on product UI icons; drop shadows; decorative fills.
- (T4_INFERRED from observed product screenshots and design materials on crowdstrike.com)

---

## AI Image Prompt Guide

For generating on-brand imagery for CrowdStrike-adjacent contexts:

**Hero / Threat Intelligence**:
> "Dark abstract digital landscape, deep black background with faint hexagonal grid pattern, single red accent light source from the left, no human figures, no text, cinematic lighting, hyperrealistic, 16:9 aspect ratio"

**Adversary / Nation-State**:
> "Abstract visualization of a network intrusion: dark navy background, red and white node-and-edge graph showing lateral movement, glowing red node as origin point, motion blur on connecting edges, no faces, no identifiable logos"

**Platform Architecture**:
> "Clean isometric diagram of a cloud security architecture: dark background, white and red wireframe nodes labeled endpoint, identity, cloud workload, connected by glowing lines, minimal design, no stock photo elements"

**Event / Fal.Con**:
> "Stage photography: dark auditorium, red lighting on stage, presenter silhouette at podium, audience in foreground, dramatic side lighting, corporate event, photorealistic"

---

## Design Prohibitions

1. **No light background as primary**: CrowdStrike's brand operates in dark environments. Using a white or light background for primary brand touchpoints breaks visual identity. (T4_INFERRED)
2. **No red as background fill**: Red is a signal color reserved for action and alerting. Using it as a background fill dilutes its urgency value. (T4_INFERRED from observed color hierarchy)
3. **No rounded-corner logos or soft illustration styles**: These evoke consumer-SaaS brand language. CrowdStrike's security-industrial identity requires sharp geometry. (T4_INFERRED)
4. **No stock photography of smiling office workers**: Human-centric lifestyle photography is absent from CrowdStrike's brand. The visual language centers on threat data and platform architecture. (observed on crowdstrike.com)
5. **No competing custom fonts**: CrowdStrike Sharp Sans is the proprietary typeface. Third-party system fonts are not used in brand materials. (T4_INFERRED from CSS extraction showing Sharp Sans as primary)
6. **No unsourced threat statistics in visual format**: Infographics that display threat data must cite the source (e.g., "Source: 2024 CrowdStrike Global Threat Report"). (T4_INFERRED from legal compliance requirements)
7. **No green or yellow as brand accents**: These colors introduce associations with "safe" or "warning" states that conflict with the brand's alert-state color system. (T4_INFERRED from observed palette)
