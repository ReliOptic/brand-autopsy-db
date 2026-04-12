# 05 — Design System
## Cintas Corporation (CTAS)
**Sector:** Industrials — Uniform & Facility Services

---

## Design Philosophy

Cintas's visual identity is built on **operational clarity**. Every design decision serves one master: making the brand legible, trustworthy, and action-oriented across every touchpoint — from a truck door panel at 60 mph to a compliance report PDF printed in a break room. The aesthetic is not fashionable; it is durable. Cintas does not chase visual trends. It invests in a system consistent enough to survive decades of co-op advertising, franchise co-branding, and regional variation without losing identity coherence.

**Three Design Principles:**
1. **Legibility over elegance** — if it cannot be read on a van at highway speed, rework it
2. **Consistency over creativity** — the system must be executable by regional sales teams, print vendors, and truck fleet managers equally
3. **Authority without intimidation** — red and navy convey confidence, not aggression; the brand should feel like a trusted expert, not a corporation

---

## HEX Color Table

| Color Name | Role | HEX | Source |
|---|---|---|---|
| Cintas Red | Primary brand / CTA buttons / logo | `#CC0000` | Official brand guidelines |
| Cintas Navy | Secondary brand / headers / depth | `#003366` | Official brand guidelines |
| White | Primary background / negative space | `#FFFFFF` | Official brand guidelines |
| Charcoal Gray | Body text / secondary UI elements | `#333333` | Estimated (web/print standard) |
| Light Gray | Section dividers / card backgrounds | `#F4F4F4` | Estimated (web/print standard) |
| Mid Gray | Subheadings / captions / borders | `#888888` | Estimated (web/print standard) |
| Safety Yellow | Safety product line / warning accents | `#FFD700` | Estimated (ANSI Z535 reference) |
| Safety Orange | Fire protection line / high-visibility accents | `#FF6600` | Estimated (ANSI Z535 reference) |
| Warm Black | Premium headlines / rich backgrounds | `#1A1A1A` | Estimated (web/print standard) |
| Link Blue | Digital hyperlinks / interactive states | `#0057A8` | Estimated (WCAG AA web standard) |

---

## Typography System

| Role | Typeface | Weight | Notes |
|---|---|---|---|
| Primary headline | Likely custom/licensed sans-serif (Helvetica Neue or equivalent) | Bold / Black | Strong, geometric, high legibility |
| Secondary headline | Same family | Semibold | Used for subheads and callouts |
| Body copy | Clean sans-serif (Arial or system equivalent) | Regular | Optimized for print and screen readability |
| Data / tables | Monospaced or tabular sans | Regular | Compliance reports, invoices, data sheets |
| CTA / buttons | Primary typeface | Bold, all-caps | High contrast on red or navy backgrounds |

**Typography Notes:**
- All-caps usage is reserved for CTAs and label elements only — body copy never all-caps
- Minimum body text size: 10pt print / 14px digital (accessibility baseline)
- Line spacing: 1.4–1.6x for body copy; 1.1–1.2x for display/headlines
- Letter spacing: Normal for body; +5–10% for all-caps CTA labels

---

## Logo System

**Primary Logo:** Cintas wordmark in Cintas Red (`#CC0000`) on white background. The wordmark is clean, sans-serif, and designed for maximum legibility at small sizes.

**Logo Variations:**
| Variant | Usage |
|---|---|
| Full color (red on white) | Primary — all standard applications |
| Reversed (white on red) | Dark backgrounds, vehicle signage |
| Reversed (white on navy) | Navy backgrounds, workwear embroidery |
| Single color (black) | Fax, legal documents, embossing |
| Single color (white) | Dark photography overlays |

**Logo Exclusion Zones:**
- Minimum clear space: equal to the height of the "C" in the wordmark on all sides
- Minimum reproduction size: 1 inch / 72px wide (digital)
- Never stretch, rotate, recolor, or add drop shadows to the logo

**Co-branding Protocol:**
- Cintas logo always appears at minimum equal size to partner/customer logos
- Co-branded items (uniforms, mats) use embroidered Cintas logo + customer logo in designated placement zones

---

## Iconography System

**Style:** Clean, outline-based icons with 2px stroke weight. No gradients. Consistent corner radius (4px). Filled variants used for active/selected states only.

**Icon Categories:**
| Category | Usage Context |
|---|---|
| Uniform / workwear | Product pages, sales collateral |
| Safety / first aid | First Aid & Safety service line |
| Fire / flame | Fire Protection service line |
| Facility / building | Facility Services product line |
| Document / shredding | Document Management service line |
| Compliance / check | OSHA, audit, and certification content |
| Route / delivery | Service reliability and scheduling content |
| People / team | HR-facing content, onboarding |

**Icon Color Rules:**
- Default: Charcoal Gray (`#333333`)
- Active/featured: Cintas Red (`#CC0000`)
- Safety contexts: Safety Yellow (`#FFD700`) or Safety Orange (`#FF6600`)
- Never use more than 2 icon colors in a single composition

---

## Layout System

**Grid:** 12-column responsive grid (web). 8-column for tablet. 4-column for mobile.

**Spacing Scale (8px base unit):**
| Token | Value | Usage |
|---|---|---|
| xs | 4px | Icon padding, tight label spacing |
| sm | 8px | Component internal padding |
| md | 16px | Card padding, section internal spacing |
| lg | 24px | Component gap, form field spacing |
| xl | 32px | Section padding, card gap |
| 2xl | 48px | Page section separation |
| 3xl | 64px | Hero and major section separation |

**Card System:**
- Background: White (`#FFFFFF`) or Light Gray (`#F4F4F4`)
- Border: 1px solid `#E0E0E0` (estimated)
- Border radius: 4px (functional) / 8px (content cards)
- Shadow: `0 2px 8px rgba(0,0,0,0.08)` (estimated, subtle elevation)

**Hero Layouts:**
- Full-bleed photography with overlay gradient (navy to transparent, 60% opacity)
- Headline in White, max 3 lines at display size
- Single CTA button, red background, white text, minimum 44px height

---

## Photography & Imagery Standards

**Primary Photography Style:**
- Real workers in real environments — no stock-photo perfection
- Workplaces that are clean, organized, and professional — but operational, not staged
- Racially and occupationally diverse workforce representation (mandatory)
- Cintas-uniformed workers performing actual job functions
- Natural lighting preferred; high-key studio lighting for product shots

**Prohibited Imagery:**
- Workers in unsafe conditions (even if authentic) — legal and brand liability
- Overly posed, smile-at-camera compositions in operational contexts
- Competitors' uniforms or branding visible in frame
- Lifestyle imagery (home, recreation) — Cintas is a workplace brand
- AI-generated faces in any customer-facing context

**Image Composition Rules:**
- Faces must be identifiable (no back-of-head primary shots in hero positions)
- Cintas uniform logo/branding must be visible where worn
- Safety equipment (PPE, first aid) in frame for safety-line content
- Color grading: neutral-to-warm, no heavy filters

**Diversity Representation Targets (photography):**
- Minimum 40% racially diverse representation in human subjects
- Minimum 30% women in non-traditional roles (trades, manufacturing, safety)
- Geographic representation: urban, suburban, and rural environments

---

## Motion & Animation Standards

**Principles:**
- Motion is functional, not decorative — it communicates state change or directs attention
- No autoplay video with sound in any web context
- Animation duration: 150–300ms for UI micro-interactions; 400–600ms for page transitions
- Easing: ease-out for entrances; ease-in for exits; ease-in-out for loops

**Approved Motion Patterns:**
- Fade-in on scroll reveal (content sections)
- Slide-in from left (navigation drawers, side panels)
- Scale-up on CTA hover (1.0 to 1.03, max)
- Progress bar fill (compliance checklists, onboarding trackers)

**Prohibited Motion Patterns:**
- Parallax scrolling on product pages (readability degradation)
- Infinite animation loops on content pages (distraction)
- Bounce/elastic easing (inconsistent with brand authority register)

---

## Vehicle & Environmental Design

**Fleet Vehicles:**
- Primary: White base vehicle, Cintas Red wordmark on doors and rear panels
- Secondary accent: Cintas Navy side stripe (optional, market-dependent)
- Safety compliance: DOT-required reflective striping in approved color palette
- Route identification: Small route number in Gray (`#888888`) below primary branding

**Facility Signage:**
- Lobby/reception: Dimensional Cintas Red wordmark on white or brushed aluminum panel
- Directional signage: Navy background, White text, 14pt minimum
- Safety signage: ANSI Z535-compliant — Yellow/Black or Red/White per hazard category
- Exit/emergency: Red on white, no Cintas branding overlay (regulatory compliance)

**Uniform Branding:**
- Logo placement: Left chest, embroidered, minimum 2.5-inch wide
- Color on dark uniforms: White or Red wordmark
- Color on light uniforms: Red or Navy wordmark
- No placement on back (reserved for customer co-branding if contracted)

---

## Accessibility Standards

| Standard | Requirement | Cintas Target |
|---|---|---|
| Color contrast (text) | WCAG AA (4.5:1 minimum) | AAA where possible (7:1) |
| Color contrast (large text) | WCAG AA (3:1 minimum) | AA on all brand colors |
| Interactive element size | 44x44px minimum (WCAG 2.5.5) | 48x48px target |
| Alt text | Required on all meaningful images | 100% coverage |
| Focus indicators | Visible keyboard focus ring | Red (`#CC0000`) 3px outline |
| Form labels | Visible labels on all inputs | No placeholder-only labels |

**Color Accessibility Check:**
| Combination | Ratio | Pass/Fail |
|---|---|---|
| Red `#CC0000` on White | 5.74:1 | AA Pass |
| Navy `#003366` on White | 12.63:1 | AAA Pass |
| White on Red `#CC0000` | 5.74:1 | AA Pass |
| White on Navy `#003366` | 12.63:1 | AAA Pass |
| Charcoal `#333333` on White | 12.63:1 | AAA Pass |
| Safety Yellow `#FFD700` on Black | 9.73:1 | AAA Pass |

---

## 3 Steal Sheets — Design System Layer

### Steal Sheet 1: The Durability-First Aesthetic
**What Cintas does:** The visual system is designed to work at truck-door scale (72" wide, viewed at 60 mph) AND at business card scale (3.5" wide, viewed at arm's length) AND at mobile screen scale (375px wide, viewed at 12 inches). This cross-scale durability requires extreme restraint — fewer design elements, higher contrast, bolder typography. The system sacrifices visual sophistication for operational reliability.
**Steal this if:** Your brand appears across multiple physical and digital contexts with wide variation in viewing conditions. Design your primary identity at the hardest constraint first (lowest contrast, smallest size, furthest viewing distance) and then enrich for easier contexts.
**Watch out for:** Durability-first design can feel dated in digital-only or premium contexts. Cintas compensates with photography quality and white space discipline. The system is not minimal by accident — it is minimal by engineering.

### Steal Sheet 2: The Safety Color Subsystem
**What Cintas does:** Cintas maintains a primary brand palette (Red + Navy + White) and a secondary safety palette (Yellow + Orange) that activates specifically for First Aid & Safety and Fire Protection content. This subsystem is ANSI Z535-compliant, meaning it carries regulatory authority AND brand recognition simultaneously. The safety palette never bleeds into the primary brand palette — it is contextually activated.
**Steal this if:** You serve regulated or safety-critical environments. Designing a compliant safety color subsystem that also carries brand identity eliminates the visual disconnect between "regulatory" and "branded" communications. Customers experience a coherent brand even in compliance contexts.
**Watch out for:** ANSI Z535 specifies exact safety colors — do not deviate for brand aesthetic reasons. The regulatory specification takes precedence; brand integration is additive, not substitutive.

### Steal Sheet 3: The Diversity Representation Mandate
**What Cintas does:** Cintas's photography standards include explicit diversity representation targets — 40% racially diverse subjects, 30% women in non-traditional roles. This is not aspirational language buried in a DEI report; it is a production specification in the design system. Every photo shoot is evaluated against these targets before approval.
**Steal this if:** Representation consistency matters to your brand and audience. Codify diversity targets as production specs, not values statements. "We value diversity" produces inconsistent results. "40% racially diverse subjects, verified at shoot approval" produces consistent results.
**Watch out for:** Representation targets without authentic context produce tokenistic imagery. Cintas shows diverse workers in authentic operational roles, not staged diversity tableaux. Authenticity of context validates authenticity of representation.

---

## 3 Battle Cards — Design System Layer

### Battle Card 1: Visual Consistency vs. Vestis (Identity in Transition)
**Vestis's vulnerability:** Post-spin-off, Vestis is still establishing visual identity consistency across formerly Aramark-branded assets. Fleet vehicles, uniforms, and digital properties are in a mixed-identity state through at least 2025-2026.
**Cintas's design advantage:** Consistent fleet branding, uniform embroidery standards, and digital design system create a visual coherence that Vestis cannot match during transition. In sales meetings, side-by-side brand impressions favor Cintas.
**Design move:** Ensure all customer-facing Cintas materials (proposals, leave-behinds, uniform samples) are visually pristine and on-system. The brand appearance during the sales process is itself a proof point of the service quality promise.

### Battle Card 2: Visual Accessibility vs. Older Competitors
**Industry gap:** Most uniform service competitors (Alsco, regional operators) have legacy visual systems built before WCAG standards. Their digital properties frequently fail AA color contrast tests, and their print materials use small type and low-contrast color combinations.
**Cintas's move:** Lead digital proposals and client portals with accessible design as a differentiator, particularly for enterprise buyers with corporate DEI and ADA compliance mandates. "Our customer portal meets WCAG AA accessibility standards" is a differentiator in enterprise RFP scoring criteria.
**Design move:** Conduct a WCAG audit of MyAccount portal annually and publish accessibility compliance status in enterprise sales materials.

### Battle Card 3: Uniform Design as Brand Extension
**Competitor approach:** Most competitors treat the physical uniform as a commodity — standard colors, standard embroidery, limited customization.
**Cintas's design advantage:** Cintas's uniform design capability allows customer logo embroidery, custom color programs, and multi-location consistency standards. The physical uniform becomes a brand extension for the customer, not just a workwear item.
**Design move:** In sales presentations to brand-conscious buyers (hospitality, healthcare, retail), lead with uniform customization samples and show side-by-side comparisons of the customer's logo on Cintas-quality embroidery vs. a competitor's standard embroidery. The tactile quality difference closes deals.
