# Design System — Block, Inc. (XYZ)

---

## 1. Design Philosophy

Block's design system operates across five distinct product surfaces — Block Corp, Cash App, Square, TIDAL, and Spiral/TBD — each with its own visual identity while sharing a set of master principles derived from the parent brand's mission: **reduce friction, increase access, signal trustworthiness without institutional formality.**

**Master Design Principles:**

| Principle | Description |
|-----------|-------------|
| Radical Simplicity | Every element on screen must earn its place. Remove before adding. |
| Confidence Without Arrogance | Bold type and clear hierarchy signal authority without cold distance. |
| Accessibility First | WCAG 2.1 AA minimum across all products; AAA target for financial critical paths |
| Dark Mode Native | Cash App and TIDAL lead dark-first; Square leads light-first |
| Motion with Meaning | Animations communicate state change, not decoration |

---

## 2. Color Systems

### 2A — Block, Inc. (Corporate / IR)

| Color Name | HEX | Usage | Label |
|------------|-----|-------|-------|
| Block Black | `#000000` | Primary background, wordmark | (official) |
| Block White | `#FFFFFF` | Primary text on dark, backgrounds | (official) |
| Block Green | `#00D632` | Accent, CTA, positive states | (official) |
| Mid Gray | `#6B6B6B` | Secondary text, captions | (estimated) |
| Light Gray | `#F2F2F2` | Surface, card backgrounds (light mode) | (estimated) |

### 2B — Cash App

| Color Name | HEX | Usage | Label |
|------------|-----|-------|-------|
| Cash Green | `#00D632` | Primary brand color, CTA buttons, logo | (official) |
| Cash Black | `#0D0D0D` | App background (dark mode primary) | (official) |
| Cash White | `#FFFFFF` | Text on dark surfaces, light mode base | (official) |
| Cash Dark Surface | `#1C1C1E` | Card surfaces, bottom sheets (dark mode) | (estimated) |
| Cash Mid Surface | `#2C2C2E` | Secondary surfaces, input fields | (estimated) |
| Cash Green Dim | `#00A825` | Pressed/active state for green CTAs | (estimated) |
| Error Red | `#FF3B30` | Failed transactions, error states | (estimated) |
| Success Confirm | `#34C759` | Completed transaction confirmation | (estimated) |
| Bitcoin Orange | `#F7931A` | Bitcoin-specific UI elements, BTC balance | (official — Bitcoin standard) |

### 2C — Square

| Color Name | HEX | Usage | Label |
|------------|-----|-------|-------|
| Square Blue | `#006AFF` | Primary brand color, CTA buttons, links | (official) |
| Square Black | `#1A1A1A` | Wordmark, primary text | (official) |
| Square White | `#FFFFFF` | Backgrounds, card surfaces | (official) |
| Square Light Blue | `#E5EFFF` | Selected states, info banners | (estimated) |
| Square Mid Gray | `#8A8A8E` | Secondary text, placeholder text | (estimated) |
| Square Light Gray | `#F5F5F7` | Page backgrounds, table alternates | (estimated) |
| Square Error | `#D92D20` | Failed payment states, validation errors | (estimated) |
| Square Success | `#039855` | Successful payment confirmation | (estimated) |
| Square Warning | `#F79009` | Pending states, partial refunds | (estimated) |

### 2D — TIDAL

| Color Name | HEX | Usage | Label |
|------------|-----|-------|-------|
| TIDAL Black | `#000000` | Primary background, app chrome | (official) |
| TIDAL White | `#FFFFFF` | Primary text, logo | (official) |
| TIDAL Blue | `#1DB4E3` | Legacy accent (pre-2023 rebrand era) | (estimated) |
| TIDAL Cyan | `#00FFFF` | Current primary accent, active states | (estimated) |
| TIDAL Dark Surface | `#141414` | Card backgrounds, bottom sheets | (estimated) |
| TIDAL Mid Surface | `#282828` | Secondary surfaces, player controls | (estimated) |
| TIDAL Gray | `#B3B3B3` | Secondary text, metadata, timestamps | (estimated) |

### 2E — Spiral / TBD (Developer-Facing)

| Color Name | HEX | Usage | Label |
|------------|-----|-------|-------|
| Spiral Orange | `#FF6600` | Primary Spiral brand color, logo | (estimated) |
| TBD Blue | `#1D4ED8` | Primary TBD brand color | (estimated) |
| Code Background | `#0F172A` | Code block backgrounds, docs dark mode | (estimated) |
| Dev White | `#F8FAFC` | Documentation backgrounds | (estimated) |

---

## 3. Typography

### 3A — Cash App Typography

| Role | Typeface | Weight | Size Range |
|------|----------|--------|------------|
| Display / Hero | Cash App Sans (custom) or SF Pro Display | Bold, Black | 32–56px |
| Heading | Cash App Sans / SF Pro Display | Semibold | 20–28px |
| Body | SF Pro Text (iOS) / Roboto (Android) | Regular, Medium | 14–17px |
| Caption / Legal | SF Pro Text / Roboto | Regular | 11–13px |
| Monospace (amounts) | SF Mono / Roboto Mono | Medium | 14–40px |

**Typography principles:** Dollar amounts always displayed in monospace to prevent layout shift. Large balance displays use tabular numbers. No italics in transaction interfaces.

### 3B — Square Typography

| Role | Typeface | Weight | Size Range |
|------|----------|--------|------------|
| Display / Marketing | Square Market Sans (custom) | Bold | 36–64px |
| Heading | Square Market Sans | Semibold, Bold | 22–32px |
| Body | Inter | Regular | 16–18px |
| UI / Labels | Inter | Medium, Semibold | 12–14px |
| Data / Amounts | Inter Mono | Regular, Medium | 13–24px |

### 3C — TIDAL Typography

| Role | Typeface | Weight | Size Range |
|------|----------|--------|------------|
| Display | Bebas Neue / Custom TIDAL Display | Regular (all-caps) | 40–80px |
| Artist Name | TIDAL Display / Helvetica Neue | Bold | 24–40px |
| Track / Album Info | Helvetica Neue / Arial | Regular, Light | 13–16px |
| UI Labels | Helvetica Neue | Medium | 11–14px |

---

## 4. Iconography

### Cash App
- Icon style: Rounded, filled; minimal stroke weight
- Grid: 24x24px base, 2px corner radius
- Signature icon: The green lightning bolt (send/speed signal)
- $Cashtag identifier: Green dollar sign in rounded square

### Square
- Icon style: Geometric, square-corner leaning; professional utility
- Grid: 24x24px, 4px corner radius on containers
- Signature icon: The white square on black background (the original logo's geometry)
- POS hardware icons: Simplified line art of Reader, Stand, Terminal

### TIDAL
- Icon style: Bold, music-forward; wave/tide motifs
- Signature icon: Interlocking wave mark (the "T" as a wave)
- Play/pause controls: Oversized for dark interface; high contrast white on dark

---

## 5. Spacing & Layout

### Grid System

| Product | Base Unit | Column Grid | Gutter | Margin |
|---------|-----------|-------------|--------|--------|
| Cash App (mobile) | 4px | 4-column | 16px | 16px |
| Square Dashboard (web) | 4px | 12-column | 24px | 32px |
| TIDAL (mobile) | 4px | 4-column | 16px | 24px |
| Square Marketing Site | 8px | 12-column | 32px | 64px |

### Spacing Scale (shared across Block products)
`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px`

---

## 6. Component Patterns

### Buttons

| Type | Cash App | Square |
|------|----------|--------|
| Primary | Green fill, black text, 48px height, 24px radius | Blue fill, white text, 44px height, 8px radius |
| Secondary | Black outline, white text | White fill, blue stroke |
| Destructive | Red fill or red text | Red fill |
| Disabled | Opacity 0.4 overlay | Gray fill |

### Cards
- Cash App: Dark surface (`#1C1C1E`), 16px radius, no stroke, subtle shadow
- Square: White surface, 8px radius, 1px gray stroke (`#E5E5EA`), medium shadow
- TIDAL: Black surface (`#141414`), 8px radius, album art dominant

### Transaction List Items
- Amount: Right-aligned, monospace, color-coded (green for received, white/gray for sent)
- Merchant name: Left-aligned, semibold, 16px
- Date/time: Left-aligned, secondary text, 13px
- Icon: 40px rounded square with merchant logo or category icon

---

## 7. Motion & Animation

| Animation Type | Duration | Easing | Usage |
|----------------|----------|--------|-------|
| Screen transitions | 300ms | Ease-in-out | Page-level navigation |
| Button press feedback | 100ms | Ease-out | Haptic + scale (0.97) |
| Success confirmation | 500ms | Spring | Payment completion |
| Number count-up (balance) | 600ms | Ease-out | Balance reveal on load |
| Loading skeleton | Loop 1.5s | Linear | Content loading states |
| Toast notification | 200ms in / 150ms out | Ease | System messages |

**Motion principles:**
- Never animate for decoration alone
- Financial state changes (send complete, payment failed) require distinct motion signatures
- Respect `prefers-reduced-motion` — all animations must have a static fallback

---

## 8. Dark Mode Strategy

| Product | Default Mode | Rationale |
|---------|-------------|-----------|
| Cash App | Dark | Youth demographic preference; Bitcoin wallet precedent |
| TIDAL | Dark | Music/media industry standard; album art pops on dark |
| Square POS | Light | Merchant countertop legibility; customer-facing display |
| Square Dashboard | System-adaptive | Office use; follows OS preference |
| Block.xyz (corporate) | Dark | Premium / tech credibility for investor audience |

---

## 9. Accessibility Standards

| Standard | Requirement | Cash App | Square | TIDAL |
|----------|-------------|----------|--------|-------|
| Color contrast (text) | WCAG 2.1 AA (4.5:1) | Met | Met | Met |
| Color contrast (large text) | WCAG 2.1 AA (3:1) | Met | Met | Met |
| Touch target size | 44x44px minimum | Met | Met | Partial |
| Screen reader support | Full VoiceOver / TalkBack | Met | Met | Partial |
| Keyboard navigation | Full tab order | Met (web) | Met | Partial |
| Error identification | Text + icon (not color alone) | Met | Met | Met |

---

## 10. Battle Cards

### Battle Card 1 — Cash App Design vs. Venmo Design

| Dimension | Cash App | Venmo |
|-----------|----------|-------|
| Default mode | Dark | Light |
| Primary CTA color | Green | Blue |
| Social elements | None (removed) | Public feed, emoji reactions |
| Amount display | Center-stage, monospace, large | Secondary to social context |
| Brand personality in UI | Minimal, confident | Playful, social, bubbly |
| **Design Win Condition** | Privacy-first, money-forward UX | Social-first, casual payments |

### Battle Card 2 — Square Design vs. Shopify Design

| Dimension | Square | Shopify |
|-----------|--------|---------|
| Primary color | Blue | Green |
| Typography | Square Market Sans (custom) | Inter (system-adjacent) |
| Dashboard density | Medium; merchant-ergonomic | High; data-rich |
| Hardware design language | Premium matte black/white | Minimal; hardware secondary |
| Brand feel | Professional but accessible | E-commerce operator confidence |
| **Design Win Condition** | Physical retail, food, services | E-commerce first, DTC brands |

### Battle Card 3 — TIDAL Design vs. Spotify Design

| Dimension | TIDAL | Spotify |
|-----------|-------|---------|
| Album art prominence | Maximum; hero treatment | Standard; grid-based |
| Typography personality | Editorial, bold display type | Functional, circular/rounded |
| Color system | Black-dominant, cyan accent | Black + green; high brand recognition |
| Playlist visual identity | Photography-driven | Gradient + typography mix |
| Artist photography | High-fashion, studio quality | Candid + professional mix |
| **Design Win Condition** | Premium feel, artist identity | Discoverability, playlist culture |

---

## 11. Steal Sheets

### Steal Sheet 1 — Dollar Amount as Hero Element
**What Block does:** In Cash App, the dollar amount being sent is always the largest element on screen — displayed in bold, monospace, often 48px+. The amount is never secondary to buttons or navigation. This creates an emotional weight to financial action.
**How to steal it:** In any transactional UI, identify the number that matters most to the user in that moment. Make it the largest element on screen. Everything else is support.

### Steal Sheet 2 — Dark Mode as Brand Identity, Not Just Preference
**What Block does:** Cash App and TIDAL shipped dark-first before dark mode was a mainstream OS feature. The darkness is not a setting — it is the identity. Green on black is Cash App. Cyan on black is TIDAL. The color system only works in dark mode.
**How to steal it:** If your target audience skews under 35 or is in a night-use context (music, nightlife, finance), design dark-first. Let the dark background become part of the brand signature, not an afterthought.

### Steal Sheet 3 — Sub-Brand Visual Independence Within Master Color Logic
**What Block does:** Each sub-brand has its own primary color (Cash App green, Square blue, TIDAL cyan) but all operate within the same neutral foundation (black/white/gray). This creates brand family recognition without visual collision.
**How to steal it:** For house-of-brands architecture, assign each sub-brand one distinct primary color. Enforce shared neutrals (black, white, grays) across all. The primary color is the differentiator; the neutrals are the unifier.
