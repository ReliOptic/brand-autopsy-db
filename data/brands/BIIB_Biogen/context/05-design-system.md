# 05 — Design System
## Brand: Biogen (BIIB)
## Sector: Health Care — Biotechnology

---

## 1. Design Philosophy

Biogen's visual identity is built on the tension between scientific precision and human warmth. The system does not choose one or the other — it holds both. Clean, data-forward layouts communicate rigor. Warm photography of real patients communicates empathy. The design system is the visual proof that Biogen is both a science company and a human company.

Core design principles:
- **Clarity over decoration** — every visual element must earn its place by aiding comprehension
- **Data as design** — charts, graphs, and endpoints are primary visual elements, not supporting decoration
- **White space as trust** — generous white space signals confidence; cramped layouts signal insecurity
- **Human presence in clinical contexts** — patient photography is not optional; it is the emotional counterweight to data

---

## 2. Color System

### Primary Palette

| Color Name | HEX | RGB | Usage | Source |
|---|---|---|---|---|
| Biogen Blue | `#003057` | 0, 48, 87 | Primary brand color; headers, primary CTAs, corporate identity | (official) |
| Biogen Light Blue | `#0057A8` | 0, 87, 168 | Secondary brand; links, interactive elements, accent | (official) |
| Sky Blue | `#00A3E0` | 0, 163, 224 | Highlights, data visualization accent, infographic elements | (official) |
| Pure White | `#FFFFFF` | 255, 255, 255 | Backgrounds; primary negative space | (official) |
| Warm Gray | `#F4F4F4` | 244, 244, 244 | Secondary backgrounds; card containers; section dividers | (official) |

### Secondary / Therapeutic Palette

| Color Name | HEX | RGB | Usage | Source |
|---|---|---|---|---|
| MS Teal | `#00857C` | 0, 133, 124 | MS franchise branding (Avonex, Vumerity, Tysabri) | (estimated) |
| Alzheimer's Violet | `#6B4C9A` | 107, 76, 154 | Alzheimer's / Leqembi franchise branding | (estimated) |
| SMA Orange | `#E87722` | 232, 119, 34 | Spinraza / SMA rare disease franchise | (estimated) |
| Neuropsychiatry Sage | `#5C8A6B` | 92, 138, 107 | Zurzuvae / neuropsychiatry pipeline | (estimated) |
| Alert Red | `#C8102E` | 200, 16, 46 | Safety warnings; ARIA alerts; adverse event callouts | (estimated) |

### Data Visualization Palette

| Color Name | HEX | Usage | Source |
|---|---|---|---|
| Data Blue 1 | `#003057` | Primary data series | (estimated) |
| Data Blue 2 | `#0057A8` | Secondary data series | (estimated) |
| Data Teal | `#00857C` | Comparator arm | (estimated) |
| Data Gray | `#6D6E71` | Placebo / background arm | (estimated) |
| Data Amber | `#F2A900` | Highlight / p-value callout | (estimated) |

---

## 3. Typography

### Type Scale

| Role | Typeface | Weight | Size (Desktop) | Usage |
|---|---|---|---|---|
| Display / Hero | Helvetica Neue (or licensed sans) | Bold (700) | 48–64px | Campaign headlines; hero statements |
| H1 | Helvetica Neue | Bold (700) | 36–40px | Page titles; report headers |
| H2 | Helvetica Neue | Medium (500) | 28–32px | Section headers |
| H3 | Helvetica Neue | Regular (400) | 22–24px | Sub-section headers; card titles |
| Body | Helvetica Neue | Regular (400) | 16–18px | Primary body copy |
| Caption / Data Label | Helvetica Neue | Light (300) | 12–14px | Chart labels; footnotes; legal |
| Clinical / Data | Courier New or monospace | Regular | 14px | Data tables; endpoint values; p-values |

**Typography Principles:**
- Left-aligned body copy; centered only for hero statements
- Line height minimum 1.5x for body copy; 1.2x for headlines
- Never set body copy below 14px in print; 16px minimum digital
- Clinical data is always set in a visually distinct style (table format or data callout box)

---

## 4. Iconography & Illustration

**Icon System:**
- Line-weight icons only; no filled icons in primary interface elements
- Stroke weight: 1.5pt at 24px base size
- Icon library covers: neuron/brain, molecule/cell, patient figure, caregiver pair, clinical chart, infusion, pill/capsule, DNA helix
- Icons are always Biogen Blue (#003057) on white, or white on Biogen Blue

**Illustration Style:**
- Scientific illustration: anatomical accuracy; cross-sectioned brain diagrams; amyloid plaque visualization; myelin sheath diagrams
- Style is editorial-scientific, not cartoonish — similar to New England Journal of Medicine illustration standards
- Color palette for scientific illustration uses primary palette only; no decorative colors

---

## 5. Photography Direction

### HCP-Facing Photography
- Setting: clinical environment (hospital corridor, neurology consultation room, research lab)
- Subjects: physicians in clinical attire; multi-ethnic representation mandatory
- Mood: focused, intelligent, purposeful
- Avoid: stock photo cliches (handshake, pointing at clipboard, overly posed)
- Color treatment: slightly cooled; high contrast; clean backgrounds

### Patient-Facing Photography
- Setting: real life — home, outdoors, family moments; NOT clinical settings
- Subjects: patients living, not suffering; showing agency and presence
- Racial / ethnic diversity: mandatory; must reflect actual MS and Alzheimer's patient demographics
- Mood: dignified, warm, authentic — not inspirational-poster-generic
- Avoid: tragedy porn; patients looking frail or victimized; overly staged "happy patient" stock
- Color treatment: warm tones; natural light; lifestyle authenticity

### Caregiver Photography
- Show the caregiver relationship without reducing either party to a role
- Caregivers are shown as active partners, not background figures
- Intergenerational family dynamics represented (adult child caring for parent; spouse caregiving)

---

## 6. Layout & Grid System

| Layout Element | Specification |
|---|---|
| Grid | 12-column; 24px gutter; 80px margin (desktop) |
| Max content width | 1200px |
| Section spacing | 80px vertical between major sections |
| Card padding | 32px internal |
| Data table row height | 48px minimum |
| CTA button height | 48px; 16px horizontal padding minimum |

**Layout Principles:**
- Data tables occupy full-width columns; never floated or embedded in text flow
- Patient photography occupies minimum 40% of any patient-facing layout
- White space is structural, not decorative — used to create hierarchy and breathing room
- Clinical disclaimer text is always present and legible; never below 10pt equivalent

---

## 7. Data Visualization Standards

Biogen's clinical data is a primary design asset. Charts and graphs follow strict standards:

| Standard | Requirement |
|---|---|
| Chart type | Bar, line, Kaplan-Meier survival curve, forest plot — no pie charts in clinical data |
| Axis labels | Always present; never truncated; units always labeled |
| P-value display | Always displayed with exact value (not just "p<0.05"); prominently placed |
| Confidence intervals | Always shown in clinical charts; error bars or shaded regions |
| Sample size | N= always visible in chart title or subtitle |
| Comparator arms | Visually distinct; always labeled with drug name, not code |
| Source citation | Always present; journal, year, doi when available |

---

## 8. Design Anti-Patterns

| Anti-Pattern | Why It Fails | Correct Approach |
|---|---|---|
| Stock neuron imagery (generic blue brain) | Visually generic; every pharma uses it | Commission original scientific illustration; use real MRI imagery |
| All-blue color blocking | Monotonous; reduces visual hierarchy | Break blue with white space; use therapeutic palette accents deliberately |
| Data tables without visual callout | Key endpoints get lost | Use callout boxes or bold formatting to surface primary endpoint data |
| Patient photography without clinical context | Disconnects emotion from science | Pair patient imagery with a data callout in the same layout |
| Small footnote/ISI text as design afterthought | Regulatory risk; also signals patient disrespect | Treat ISI as a design element with consistent styling |

---

## 9. Battle Cards

### Battle Card 1: Biogen Design vs. Roche/Genentech Design
| Dimension | Biogen | Roche/Genentech |
|---|---|---|
| Visual identity | Conservative; institutional blue | Warmer; more modern; stronger patient-centered visual language |
| Data visualization | Functional; clinical-grade | More polished; infographic-quality data presentation |
| Patient photography | Present but generic | More diverse, more authentic, better art direction |
| Digital experience | Functional; dated UX | More modern; better mobile optimization |
| Exploit: | Biogen's scientific illustration depth | Roche's patient photography and digital UX are clearly better invested |

### Battle Card 2: Biogen Design vs. Eli Lilly Design (Alzheimer's)
| Dimension | Biogen / Leqembi | Eli Lilly / Kisunla |
|---|---|---|
| Brand color | Biogen Blue (corporate); Violet (Alzheimer's) | Lilly's brand red; Kisunla warm palette |
| Consumer DTC visual | Limited DTC investment; cooler palette | Warmer, more approachable consumer aesthetic |
| Caregiver representation | Underweighted in visual assets | Lilly explicitly features caregiver pairs in Alzheimer's imagery |
| Scientific diagram quality | Strong amyloid plaque visualization | Strong; comparable clinical illustration quality |
| Exploit: | Leqembi's scientific visual language is more credible for HCPs | Lilly's consumer-facing Alzheimer's visuals are warmer and more accessible |

### Battle Card 3: Biogen Design vs. Patient Advocacy Organization Design (NMSS, Alzheimer's Association)
| Dimension | Biogen | NMSS / Alzheimer's Association |
|---|---|---|
| Trust signal | Pharmaceutical brand; commercial perception | Non-profit; perceived as neutral and patient-centered |
| Visual warmth | Secondary to scientific authority | Primary; patient community and hope are design drivers |
| Accessibility (WCAG) | Meets standard; not a differentiator | Often better; community-first design ethos |
| Community iconography | Limited; brand-controlled | Extensive; orange butterfly (MS); purple (Alzheimer's) with deep community equity |
| Exploit: | Biogen should co-brand with advocacy orgs' visual identity for patient-facing materials — trust transfer by association | Advocacy org visual equity cannot be purchased; it must be earned through genuine partnership |

---

## 10. Steal Sheets

### Steal Sheet 1: Steal the Data-as-Design Principle
**What Biogen does:** Clinical data — Kaplan-Meier curves, forest plots, endpoint tables — is treated as primary visual content, not supporting footnotes. It is sized generously, styled consistently, and given the visual hierarchy of a hero element.
**How to steal:** Redesign your HCP materials so that the primary endpoint data is the largest, most prominent visual element on the page. Strip the decorative imagery. Let the curve do the persuading. The HCP has seen 1,000 brochures with stock neuron images; they have not seen your trial data presented at this scale and quality.

### Steal Sheet 2: Steal the Therapeutic Sub-Brand Color System
**What Biogen does:** Each disease franchise has a distinct color within the Biogen palette system — MS Teal, Alzheimer's Violet, SMA Orange — that creates visual differentiation across franchises while maintaining corporate coherence. A physician can visually identify which disease area a piece of content comes from without reading the headline.
**How to steal:** If you have a multi-franchise portfolio, build a color taxonomy that creates instant visual franchise identification. The parent brand color anchors corporate identity; therapeutic colors differentiate and orient the audience immediately.

### Steal Sheet 3: Steal the Patient Photography Standard
**What Biogen does (partially):** Patient photography shows patients in their life — not in hospital beds — depicting agency, relationship, and ordinary moments disrupted by disease and restored by treatment. The best Biogen patient photography is indistinguishable from editorial lifestyle photography.
**How to steal:** Commission original patient photography with a brief that prohibits hospitals, white backgrounds, and posed smiles. Brief the art director on disease-specific visual metaphors — a hand gripping a railing (MS), a family photo being viewed (Alzheimer's), a child reaching a milestone (SMA). Authenticity in patient photography cannot be stock-sourced.
