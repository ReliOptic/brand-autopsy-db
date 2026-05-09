# Brand Autopsy DB DESIGN.md

```json
{
  "is_product_design_md": true,
  "ticker": "BRAND_AUTOPSY",
  "brand_name": "Brand Autopsy DB",
  "version": "0.2.0",
  "visual_archetype": "Terminal-native",
  "surface_model": "terminal"
}
```

## 1. Visual Theme

Brand Autopsy DB is a **Dark Intelligence Terminal**: a near-black analytical workspace where verified brand evidence, ticker symbols, confidence levels, and comparison signals glow with controlled precision. The product should feel closer to a Bloomberg Terminal, Carbon-style enterprise dashboard, and low-noise developer console than to a friendly SaaS homepage.

Atmosphere keywords: `terminal-native`, `high-confidence`, `forensic`, `data-dense`, `market-intelligence`, `thin-border`, `single-signal-accent`.

- Density: high, but organized into clean scan lanes.
- Surface model: terminal first; cards are bounded data panes, not lifestyle tiles.
- Visual hierarchy: border, contrast, mono labels, and signal color before shadow.
- Primary emotional state: quiet authority, not excitement.

## 2. Color Palette

| Token | Hex | Role | Usage |
|---|---:|---|---|
| `bg` | `#07070B` | surface | App background; never replace with brand colors. |
| `bgDeep` | `#050508` | surface | Deep terminal wells, hero voids, command-strip backgrounds. |
| `surface` | `#0F0F17` | surface | Primary panels and table bodies. |
| `surfaceLift` | `#13131D` | surface | Raised panels, active filters, selected cards. |
| `border` | `#1E1E2E` | semantic | Default 1px dividers and panel strokes. |
| `borderBright` | `#2A2A3D` | semantic | Active panel borders and hover states. |
| `accent` | `#6366F1` | primary | Product-level interaction and live intelligence signal. |
| `accentBright` | `#818CF8` | accent | Focus rings, selected values, chart highlights. |
| `accentDim` | `#4F46E5` | accent | Pressed/active state. |
| `text` | `#E2E8F0` | text | Primary readable copy. |
| `textBright` | `#F4F4F8` | text | Headlines, key scores, decisive values. |
| `textSecondary` | `#94A3B8` | text | Supporting descriptions and table metadata. |
| `textMuted` | `#64748B` | text | Labels, timestamps, secondary nav. |
| `textDim` | `#3F3F55` | text | Disabled or background labels. |
| `success` | `#10B981` | semantic | HIGH confidence, complete coverage, positive deltas. |
| `warn` | `#F59E0B` | semantic | MEDIUM confidence, partial coverage, watch states. |
| `error` | `#EF4444` | semantic | LOW confidence, legal risk, failed validation. |

Brand-specific colors from analyzed companies may appear only as **identity highlights**: swatches, tiny left borders, selected ticker marks, or chart series accents. They must never flood the Brand Autopsy canvas.

## 3. Typography Rules

- Sans: `Inter, ui-sans-serif, system-ui, sans-serif` for narrative and UI copy.
- Mono: `JetBrains Mono, SF Mono, Menlo, ui-monospace, monospace` for tickers, confidence labels, scores, timestamps, API-ish metadata, and table coordinates.
- Headings: compact, high-contrast, negative tracking at hero scale; never bubbly or oversized for friendliness.
- Body: 13–15px in product surfaces; 16px only for editorial landing copy.
- Labels: 10–11px uppercase with wide tracking; treat them as instrumentation labels.
- Numbers: mono, tabular, and visually isolated; scores should read like terminal output.

## 4. Component Styling

### Buttons
- Primary buttons use `accent` fill, 3–4px radius, mono 11–12px labels, and a restrained glow only on high-value actions.
- Secondary buttons are border-only or `surfaceLift` fills with `borderBright` stroke.
- Avoid rounded SaaS capsules except for compact status pills.

### Cards / Panels
- Panels are flat rectangles with 1px borders and subtle surface shifts.
- Use shadows rarely; hierarchy comes from surface contrast, border brightness, and content density.
- Card headers should include a label, ticker/section identifier, and one status signal.

### Navigation
- Navigation is a command surface: slim, dark, keyed by ticker/route/state.
- Active states use left rails, underline bars, or border brightness rather than large filled tabs.

### Inputs / Filters
- Search and filters should feel like query controls: mono placeholders, compact height, explicit active count, and visible reset affordance.

### Charts
- Use dark backgrounds, thin axes, muted labels, and one primary signal color. Keep chart ink purposeful.

## 5. Layout Principles

1. Lead every page with an intelligence claim or operational context, not decorative brand copy.
2. Use dense grids only when scan paths are clear: left label rail, right evidence area, top metric strip.
3. Keep high-value metrics above the fold: coverage, confidence, risk, freshness, and compare deltas.
4. Use whitespace as grouping space, not luxury space; this is a terminal, not a gallery.
5. Tables need sticky identifiers, mono values, and visible state changes.
6. Brand detail pages should feel like opening a dossier: identity header, evidence tabs, risk markers, then longform context.
7. Compare pages should expose deltas visually before prose explanation.
8. Analytics pages should pair every chart with a one-sentence readout of what changed or matters.

## 6. Depth & Elevation

Depth is almost flat. Use elevation in this order:

1. Surface contrast (`bg` → `surface` → `surfaceLift`).
2. Border contrast (`border` → `borderBright`).
3. Accent rails and status dots.
4. Very soft glow on live/high-confidence signal only.
5. Shadow only for modal overlays or command palettes.

Do not use large blurred SaaS shadows, glassmorphism cards, or decorative gradient depth.

## 7. Do

1. Do make data glow against a disciplined near-black canvas.
2. Do render ticker, score, confidence, risk, date, and layer numbers in monospace.
3. Do use border and surface contrast before shadow.
4. Do keep brand colors constrained to identity highlights.
5. Do expose source confidence and legal risk near claims.
6. Do make filters, tabs, and compare controls feel like analytical instruments.
7. Do write UI copy in short operational fragments.
8. Do preserve Korean readability with generous line-height when localizing explanatory copy.

## 8. Don't

1. Don't flood the app background with the analyzed brand's primary color.
2. Don't make every card visually unique; consistency is how dense intelligence stays readable.
3. Don't overuse mobile-first SaaS CTA styling, giant pills, mascots, or playful illustrations.
4. Don't hide low-confidence or legal-risk states behind neutral badges.
5. Don't use decorative gradients as a substitute for evidence hierarchy.
6. Don't turn long markdown layers into undifferentiated text walls.
7. Don't make charts colorful by default; one strong signal beats twelve loud colors.
8. Don't present generated guidance as official brand guidelines.

## 9. Responsive Behavior

Mobile layouts should become stacked dossiers, not simplified marketing cards. Preserve the sequence: identity header → key metrics → filters/tabs → evidence content. Tables can become horizontally scrollable if ticker/metric headers remain sticky. Compare views should collapse into per-brand columns followed by delta callouts. Do not remove confidence, coverage, or legal-risk badges on small screens.

## 10. Product Design Rationale

Brand Autopsy DB sells compressed research time and evidence-backed brand judgment. The interface therefore needs to prove three things immediately:

- **Trust**: every claim has confidence, source tier, or legal posture nearby.
- **Speed**: users can move from ticker to insight in seconds.
- **Depth**: the product contains more structured intelligence than a normal brand profile, but it remains navigable.

Dark Intelligence Terminal is the correct product posture because it frames the database as a professional instrument. Linear contributes the near-black precision and thin hierarchy. VoltAgent contributes terminal-native darkness and single-signal accent discipline. ClickHouse contributes high-voltage data-tool confidence. IBM Carbon contributes square, flat, enterprise trust.

## 11. Brand Design Rationale

Brand Autopsy is a forensic metaphor: it dissects public brand evidence and turns it into operational strategy. The design language should not look like a creative agency portfolio; it should look like a diagnostic cockpit. The product brand is strongest when it lets customer brands appear as specimens inside a controlled analytical environment.

Core translation rules:

- Autopsy → anatomy panels, layer coverage, evidence trails.
- Database → tables, query controls, structured metadata.
- Intelligence → live signals, confidence indicators, compare deltas.
- Brand → color swatches and archetypes used as evidence, never decoration.

## 12. Legal & Usage Notice

Brand Autopsy DB analyzes publicly observable brand signals for research, education, and strategic planning. It does not publish official brand guidelines for third-party companies, does not imply endorsement or affiliation, and does not grant trademark, copyright, trade dress, or publicity rights. All brand names, logos, product names, and related marks remain the property of their respective owners.

When implementing UI from Brand Autopsy outputs, treat generated design-md artifacts as reference analysis, not as permission to copy protected assets. Avoid reproducing logos, distinctive trade dress, proprietary product UI, protected marketing copy, or confusingly similar visual systems.

## Agent Prompt Guide

Use this prompt when asking an agent to build Brand Autopsy UI:

> Build in the Brand Autopsy DB Dark Intelligence Terminal style. Use a near-black canvas (`#07070B`), flat rectangular panels (`#0F0F17` / `#13131D`), thin borders (`#1E1E2E`), and one controlled indigo signal accent (`#6366F1`). Render tickers, layer numbers, confidence, risk, and scores in monospace. Prioritize scan efficiency, source confidence, legal-risk visibility, and data density. Use brand-specific colors only as tiny identity highlights such as swatches, rails, or chart series accents. Avoid playful SaaS styling, large rounded CTA pills, mascot/illustration motifs, decorative gradients, and heavy shadows. Make hierarchy with border brightness, surface contrast, mono labels, and concise operational copy.
