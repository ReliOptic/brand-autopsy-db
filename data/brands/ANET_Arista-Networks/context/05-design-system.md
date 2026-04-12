# 05 — Design System
## Arista Networks (ANET)

---

## 1. Design Philosophy

Arista's visual identity reflects its engineering culture: functional clarity over decorative expression. The design system prioritizes information density, scanability, and technical credibility. Marketing materials are built to survive scrutiny from engineers who distrust visual gloss — so every design choice earns its place by serving communication, not aesthetics. (estimated)

---

## 2. Color System

| Color Name | HEX Code | RGB | Usage | Source |
|---|---|---|---|---|
| Arista Blue (Primary) | #005EB8 | rgb(0, 94, 184) | Logo, primary CTAs, section headers, hyperlinks | (estimated) |
| Dark Navy | #002147 | rgb(0, 33, 71) | Footer backgrounds, executive collateral, dark mode headers | (estimated) |
| Sky Blue (Accent) | #4DA8E0 | rgb(77, 168, 224) | Diagram highlights, secondary CTAs, icon fills | (estimated) |
| White | #FFFFFF | rgb(255, 255, 255) | Primary page background, reversed type on dark fields | (official) |
| Light Gray | #F4F4F4 | rgb(244, 244, 244) | Alternating table rows, card backgrounds, sidebar panels | (estimated) |
| Mid Gray | #9E9E9E | rgb(158, 158, 158) | Secondary body text, placeholder copy, disabled states | (estimated) |
| Dark Gray (Body) | #333333 | rgb(51, 51, 51) | Primary body text, technical documentation copy | (estimated) |
| Accent Green | #00A86B | rgb(0, 168, 107) | Success indicators, availability status, positive metrics | (estimated) |
| Alert Orange | #F5820D | rgb(245, 130, 13) | Warning states, highlighted latency metrics, call-out boxes | (estimated) |
| Critical Red | #D32F2F | rgb(211, 47, 47) | Error states, critical alerts, network fault indicators | (estimated) |

> All HEX values are (estimated) unless noted. Derived from analysis of arista.com, product datasheets, and EOS UI screenshots as of 2025. Arista does not publish a public brand guidelines document.

---

## 3. Typography

| Role | Typeface | Weight | Size Range | Source |
|---|---|---|---|---|
| Display / Hero Headline | Inter (or equivalent geometric sans-serif) | Bold (700) | 36–64px | (estimated) |
| Section Headline (H2) | Inter | SemiBold (600) | 24–32px | (estimated) |
| Subheadline (H3) | Inter | Medium (500) | 18–22px | (estimated) |
| Body Text | Source Sans Pro or Inter | Regular (400) | 14–16px | (estimated) |
| Technical Documentation | Source Sans Pro | Regular (400) | 13–15px | (estimated) |
| Code / CLI Snippets | Consolas / JetBrains Mono | Regular (400) | 12–14px | (estimated) |
| Caption / Label | Inter | Regular (400) | 11–12px | (estimated) |
| Data Table Content | Source Sans Pro | Regular / SemiBold | 12–14px | (estimated) |

**Typography Rules:**
- Line height: 1.5x for body text; 1.2x for display (estimated)
- Maximum line length: 75 characters for body copy to maintain readability in technical documentation (estimated)
- All-caps sparingly: section labels and navigation items only (estimated)
- No decorative or serif typefaces in any brand context (estimated)

---

## 4. Logo Usage

| Scenario | Treatment |
|---|---|
| Light background | Arista Blue (#005EB8) wordmark on white or light gray |
| Dark background | White wordmark on Dark Navy (#002147) or Arista Blue |
| Minimum clear space | Equal to the height of the "A" in "Arista" on all sides |
| Minimum size (digital) | 120px wide |
| Minimum size (print) | 1.5 inches wide |
| Prohibited uses | Stretching, recoloring outside brand palette, adding drop shadows, placing on busy photographic backgrounds |

> All logo usage guidelines are (estimated) based on standard enterprise brand practice and observed usage across arista.com and official materials.

---

## 5. Iconography & Illustration Style

| Element | Style | Notes |
|---|---|---|
| Network topology icons | Flat, single-color or two-tone; geometric | Switches, routers, servers depicted with clean outlines — no gradients (estimated) |
| UI icons | Outlined style; 2px stroke weight | Consistent with Material Design conventions in CloudVision UI (estimated) |
| Illustration | Rare; when used, flat vector with brand colors | Avoided in technical documentation; used only in executive presentation decks (estimated) |
| Data visualization | High-contrast line graphs, bar charts; Arista Blue primary series | Latency graphs, throughput charts, bandwidth utilization heatmaps (estimated) |
| Diagram connectors | 1–2px lines; directional arrows with filled arrowheads | Used in reference architecture diagrams (estimated) |

---

## 6. Layout & Grid System

| Attribute | Value | Source |
|---|---|---|
| Primary grid | 12-column grid; 24px gutters | (estimated) |
| Max content width | 1280px | (estimated) |
| Section padding (desktop) | 80px top/bottom | (estimated) |
| Card border radius | 4–8px | (estimated) |
| Table row height | 48px minimum | (estimated) |
| CTA button border radius | 4px (slightly rounded; not pill-shaped) | (estimated) |
| Whitespace philosophy | Generous in marketing collateral; dense in technical documentation | (estimated) |

---

## 7. Photography Style

| Category | Style | Notes |
|---|---|---|
| Data center imagery | Clean, high-contrast; blue-tinted LED lighting | Emphasizes scale, precision, and modernity (estimated) |
| People / team | Candid engineering environments; lab settings preferred over staged portraits | Reinforces engineer-first brand identity (estimated) |
| Product hardware | Clean white or dark background; professional lighting | Switch and router photography emphasizes port density and form factor (estimated) |
| Abstract / conceptual | Avoided | Arista does not use abstract "digital connection" stock imagery common in IT marketing (estimated) |

---

## 8. Motion & Animation (Digital)

| Context | Approach | Notes |
|---|---|---|
| Website transitions | Subtle fade or slide; 150–250ms duration | No heavy parallax or scroll-jacking (estimated) |
| Data visualization | Animated on scroll-into-view; single smooth transition | Used in CloudVision marketing pages (estimated) |
| Video production | Minimalist motion graphics; Arista Blue accents on dark backgrounds | Product demo videos follow clean, technical aesthetic (estimated) |
| Presentation slides | Static or minimal animation; data-forward layouts | Executive decks use Arista Blue headers, white backgrounds, dense tables (estimated) |

---

## 9. Design System Anti-Patterns

| Anti-Pattern | Why It Conflicts with Arista Brand |
|---|---|
| Gradient backgrounds | Decorative gradients signal consumer brand; Arista is enterprise-technical |
| Rounded pill buttons | Too soft; Arista's CTA language is direct, and button shape should match |
| Hero sections with stock "handshake" photography | Generic enterprise cliche — Arista's credibility comes from engineering imagery |
| Animated hero video backgrounds | Performance cost conflicts with the operational efficiency the brand claims to deliver |
| Multi-color icon sets | Visual noise; reduces scanability in data-dense technical layouts |
| Serif display type | Conflicts with modern, precise, engineering-first brand character |

---

## 10. CloudVision UI Design Patterns (Product Design)

| Pattern | Implementation |
|---|---|
| Dashboard layout | Left nav rail; primary content area; collapsible detail panel (estimated) |
| Color coding for network state | Green = healthy, Orange = warning, Red = fault — consistent with Arista brand alert colors (estimated) |
| Telemetry charts | Dark background time-series charts; Arista Blue primary line with alert threshold overlays (estimated) |
| Configuration diff views | Side-by-side code diff with syntax highlighting; monospace font (estimated) |
| Topology maps | Force-directed graph; nodes colored by device type and health state (estimated) |
