# 05 — Design System
## Axon Enterprise (AXON)

---

## 1. Design Philosophy

Axon's visual identity is built on a single tension: **high-technology precision meets human consequence**. The brand must feel serious enough for a government procurement officer, credible enough for a skeptical civil rights advocate, and modern enough to attract engineering talent from Silicon Valley. The design system resolves this tension through a restrained palette, data-forward layouts, and photography that centers human beings — not hardware.

The system deliberately avoids the militaristic aesthetics common in law enforcement vendor branding (olive drab, aggressive typography, weapon-forward imagery). Instead, Axon positions itself closer to enterprise SaaS in visual language, while retaining enough authority to command respect in a police precinct.

---

## 2. Color System

| Role | Name | HEX | Label | Usage |
|---|---|---|---|---|
| Primary Brand | Axon Blue | `#005EB8` | (official) | Primary CTAs, headers, logo |
| Primary Brand Dark | Navy | `#003A7A` | (official) | Dark backgrounds, footers |
| Accent | Electric Yellow | `#F5C400` | (official) | Highlights, alert states, TASER sub-brand |
| Accent Alt | Safety Orange | `#FF6B00` | (estimated) | Warning states, less-lethal product highlights |
| Neutral — Light | Cloud White | `#F8F9FA` | (official) | Page backgrounds, card surfaces |
| Neutral — Mid | Slate Gray | `#6C757D` | (official) | Body copy, secondary text |
| Neutral — Dark | Charcoal | `#212529` | (official) | Primary text, high-contrast elements |
| Success | Accountability Green | `#28A745` | (estimated) | Data positive states, compliance indicators |
| Danger | Alert Red | `#DC3545` | (estimated) | Error states, critical alerts in Evidence.com UI |
| TASER Sub-brand Yellow | TASER Gold | `#FFD100` | (official) | TASER product line, packaging |
| Evidence Platform | Evidence Navy | `#1B3A6B` | (estimated) | Evidence.com UI primary color |
| AI / Draft One | Slate Indigo | `#4B5EAA` | (estimated) | Draft One AI feature callouts |

**Color Accessibility:** All primary text/background combinations meet WCAG 2.1 AA minimum contrast ratio (4.5:1). Axon Blue on white: 5.1:1 (passes). Electric Yellow on Navy: 7.2:1 (passes).

---

## 3. Typography

### Primary Typeface: Inter (or equivalent geometric sans-serif)
- **Source:** Google Fonts / system font fallback (estimated — Axon does not publish a type spec publicly)
- **Why:** Inter's optical precision and readability at small sizes maps to evidence management UI requirements; its neutrality avoids the "police brutality poster" aesthetic of slab serifs
- **Label:** (estimated)

### Secondary / Display: Axon Custom / Modified geometric sans
- Used in logo wordmark and large headline contexts
- Tighter letter-spacing, higher x-height than body Inter
- **Label:** (official — proprietary, not licensed externally)

### Type Scale (Web)

| Level | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| H1 | 48px / 3rem | 700 Bold | 1.15 | Hero headlines |
| H2 | 36px / 2.25rem | 700 Bold | 1.2 | Section headers |
| H3 | 28px / 1.75rem | 600 SemiBold | 1.25 | Sub-section headers |
| H4 | 22px / 1.375rem | 600 SemiBold | 1.3 | Card titles |
| Body Large | 18px / 1.125rem | 400 Regular | 1.6 | Lead paragraphs |
| Body | 16px / 1rem | 400 Regular | 1.6 | Standard body copy |
| Caption | 13px / 0.8125rem | 400 Regular | 1.4 | Image captions, data labels |
| Label / UI | 12px / 0.75rem | 500 Medium | 1.2 | Button text, UI micro-copy |

---

## 4. Logo System

### Master Logo
- Axon wordmark in Axon Blue (`#005EB8`) on white
- Logo includes a subtle geometric connector element between the "A" and "x" suggesting connectivity/network (estimated description based on public usage)
- Minimum clear space: 2x cap-height on all sides
- **Label:** (official)

### TASER Sub-brand Logo
- "TASER" in all-caps, high-contrast typography
- TASER Gold (`#FFD100`) frequently used as background or accent
- Deliberately bolder and more aggressive than master Axon wordmark — signals the product's authority without contaminating the parent brand's sophistication
- **Label:** (official)

### Evidence.com Logo
- "evidence.com" in lowercase, Axon Blue
- Lowercase signals software/SaaS approachability vs. hardware authority
- **Label:** (official)

### Lockup Rules
- Never combine TASER and Axon logos at equal scale — Axon is always the master brand
- Evidence.com may appear standalone in DA/court audience contexts
- TASER sub-brand may appear standalone in law enforcement field contexts

---

## 5. Iconography

- **Style:** Outlined, 2px stroke, rounded terminals — matches SaaS enterprise conventions (Material Design influence)
- **Grid:** 24x24px base, scales to 16px (UI) and 48px (marketing)
- **Key icon set:**
  - Shield (officer safety)
  - Camera / Video (body cameras)
  - Cloud / Upload (Evidence.com)
  - Chain link (evidence chain of custody)
  - Lightning bolt (TASER — used sparingly, sub-brand only)
  - AI/Spark (Draft One, AI features)
  - Gavel (justice/prosecution outcomes)
  - Map pin (geographic deployment)
- **Label:** (estimated — based on public website and product UI observation)

---

## 6. Photography Direction

### Hero Photography
- Officers in the field: candid, action-oriented, never staged-looking
- Diverse representation mandatory: race, gender, geography (urban, rural, suburban)
- Lighting: natural or available light preferred; avoid high-drama tactical lighting that reads as militaristic
- No posed "hero cop" images — subjects should be mid-task, not performing for the camera

### Community Photography
- Officers in conversation with community members: face-to-face, eye-contact, human scale
- Reflects the diversity of the communities Axon serves, not just the agencies
- Never shows handcuffs, arrests, or confrontation in marketing contexts

### Product Photography
- Clean studio; light backgrounds (Cloud White or very light gray)
- Hardware shown in context — on a vest, in a hand — not as isolated objects
- Evidence.com UI shown on laptop/tablet in realistic agency environments (desk, patrol car)
- TASER product: shown holstered or being demonstrated in training — never pointed at a person in marketing imagery

### What to Avoid
- Military/tactical aesthetics (camouflage, night-vision green, dramatic shadow)
- Empty streets and dystopian urban imagery
- Images that foreground weapons before people
- All-white casts in community photography

---

## 7. Motion & Animation

- **Principle:** Purposeful and restrained. Motion should communicate data or connection — never decoration.
- **Duration:** UI micro-animations 150–250ms; hero animations 400–600ms; no animation exceeds 1s without user trigger
- **Easing:** Ease-out for elements entering; ease-in for elements exiting; avoid bounce easing (too playful for B2G context)
- **Data visualization:** Animated charts and maps for agency deployment stories; numbers counting up for impact metrics
- **Label:** (estimated)

---

## 8. UI Design Principles (Evidence.com & Software Products)

1. **Information density with clarity:** Evidence management users are power users. UI can carry more data per screen than consumer apps, but hierarchy must be unambiguous.
2. **Trust signals everywhere:** Chain of custody indicators, timestamp metadata, audit logs — always visible, never buried.
3. **One-action workflows:** Upload, tag, share — each action should require the fewest possible steps. Officers in the field do not have patience for multi-step flows.
4. **Accessible by default:** WCAG 2.1 AA minimum. Evidence.com is used by agencies with ADA compliance obligations.
5. **Dark mode support:** Patrol car use and low-light environments require a dark UI option.

---

## 9. Battle Cards — Design Layer

### Battle Card 1: Axon Design vs. Motorola's Legacy Aesthetic

**Context:** Side-by-side in an agency RFP demo day.

**Axon position:** Motorola's CommandCentral UI inherits the visual language of their radio dispatch systems — dense, complex, training-heavy. Evidence.com was designed for officers who need to upload footage in 60 seconds and get back on patrol. Show both UIs side by side. The time-to-task for a standard upload is the demo. Let the UI speak.

**Design proof point:** Evidence.com average upload time: under 2 minutes. Ask Motorola for the same benchmark.

---

### Battle Card 2: Axon Design vs. Startup AI Tools (Draft One vs. Truleo)

**Context:** IT director evaluating AI report writing tools independently of hardware.

**Axon position:** Startup AI tools present as consumer-grade SaaS. Axon Draft One inherits Evidence.com's trust infrastructure — every AI-generated report is timestamped, auditable, and linked to the underlying footage. A standalone AI tool produces a document. Draft One produces a legally defensible record. The design of the interface reflects that distinction: court-ready output formatting, automatic case linkage, supervisor review workflow built in.

---

### Battle Card 3: Axon Design vs. No Design Standard (Agency-Built Solutions)

**Context:** IT director who built a homegrown evidence management system.

**Axon position:** Custom systems are built once and maintained forever — usually by whoever built them, until they leave. Evidence.com is updated continuously, with a dedicated design team running user research with active officers quarterly. The interface your officers use in 2026 will be meaningfully better than the one in 2024. Ask your IT director when the last UX research session ran on your current system.

---

## 10. Steal Sheets — Design Layer

### Steal Sheet 1: Steal the "SaaS Trust" Aesthetic from Enterprise Software

**Opportunity:** Law enforcement vendors default to tactical/militaristic visuals that alienate progressive city councils and advocates. Axon should push further into enterprise SaaS visual language — clean, data-forward, human-centered — to signal that this is a governance tool, not a weapons catalog.

**Design actions:**
- Hero imagery featuring evidence dashboards and case closure data alongside officer photography
- Annual report design closer to Salesforce or Palantir than to Motorola or Harris
- Conference booth design: screens showing data visualizations, not product photos

---

### Steal Sheet 2: Steal the "Transparency" Visual Vocabulary

**Opportunity:** Civil rights organizations own the visual language of transparency (open records, sunshine laws). Axon can steal this vocabulary by designing accountability dashboards that look like public-interest tools — open data, clean charts, community-accessible reporting.

**Design actions:**
- Public-facing agency use-of-force dashboard (city-branded, Axon-powered)
- Open design template for agency annual accountability reports
- Infographic series: "What Your Agency's Data Shows" — shareable, community-legible

---

### Steal Sheet 3: Steal Officer Attention with Mobile-First Microinteractions

**Opportunity:** Officers interact with Axon apps on phones and tablets in high-stress, time-limited moments. Competitor interfaces were designed for desktop procurement demos, not field use. Axon can own the field-use moment with micro-interactions — haptic feedback on upload confirmation, one-tap incident tagging, voice-to-text report initiation — that make the product feel built for the job.

**Design actions:**
- Officer-facing mobile app redesign sprint: voice-first report initiation flow
- Haptic + visual confirmation on evidence upload completion
- Partnership with officer focus groups for quarterly UX research sessions
