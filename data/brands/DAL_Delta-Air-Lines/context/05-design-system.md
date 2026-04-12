# 05. Design System — Delta Air Lines, Inc. (DAL)

> **Disclaimer**: This document is brand strategy analysis for educational and research purposes only. It is not investment advice, legal advice, or a substitute for the company's official brand guidelines. All design observations are based on publicly accessible sources. Source notation: (official) = company-published content; (observed on website) = direct observation; (estimated) = project inference. Note: CSS color extraction for delta.com returned no color data in automated extraction; color palette below is based on direct observation of delta.com and official Delta brand materials.

---

## Color Palette

| Role | Color Name | HEX | Source | Usage |
|------|------------|-----|--------|-------|
| **Primary Blue** | Delta Blue | `#003366` | Observed on delta.com (estimated) | Primary brand color; navigation bars; buttons; logo background |
| **Secondary Red** | Delta Red | `#E51937` | Observed on delta.com (estimated) | Logo widget mark; sale/alert callouts; loyalty tier highlights |
| **Accent Blue** | Sky Blue | `#0066CC` | Observed on delta.com (estimated) | Interactive elements; links; call-to-action buttons |
| **Neutral Light** | Cloud White | `#F7F7F7` | Observed on delta.com (estimated) | Page background; card backgrounds |
| **Neutral Dark** | Slate Gray | `#333333` | Observed on delta.com (estimated) | Body text; navigation labels |
| **Premium Gold** | Medallion Gold | `#B8982E` | Observed in SkyMiles Medallion materials (estimated) | Diamond and Platinum Medallion status indicators; premium upsell elements |

**Color Rationale**: Deep navy blue as primary communicates trust, professionalism, and premium positioning — the same reasoning behind American Express, JP Morgan Chase, and other financial-premium brands. The red widget mark (the "widget" or "delta" symbol in the tail logo) provides a bold accent that differentiates from United's blue-dominant palette. (T4_INFERRED from observed design system)

---

## Typography

| Role | Font Family | Weight | Source |
|------|------------|--------|--------|
| **Primary** | Delta Sans (custom, proprietary) | Regular, Medium, Bold | Observed on delta.com — proprietary typeface (estimated) |
| **Fallback / System** | Arial, Helvetica Neue | Regular, Bold | Standard web fallback (observed in CSS via data extraction) |
| **Display / Headlines** | Delta Sans Bold | Bold | Observed on delta.com hero sections |
| **Body** | Delta Sans Regular | Regular | Observed on delta.com body content |

**Typography Rationale**: Delta Sans is a humanist sans-serif typeface with slightly rounded forms that communicate approachability within a professional context — consistent with the Caregiver/Ruler archetype combination. The rounded forms prevent the design from feeling cold or institutional, differentiating Delta from the more utilitarian sans-serif choices of United and American. (T4_INFERRED from observed letterform characteristics)

---

## Channel Specifications

| Channel | Dimensions | Format | Primary Color Mode |
|---------|-----------|--------|-------------------|
| **Website hero** | 1440px width, full-bleed | Blue-to-sky photography with white headline overlay | Light |
| **Email header** | 600px width | Delta blue header band with logo; white content area | Mixed |
| **Instagram post** | 1080 × 1080px | Destination photography with Delta Blue overlay; white caption | Light |
| **Twitter/X card** | 1200 × 675px | Operational update card: Delta Blue, white text, red alert indicator | Light |
| **Print / Airport** | Full-bleed large format | Premium cabin photography; "Keep Climbing" headline | Light |
| **Delta Sky magazine** | Standard magazine trim | Full-color editorial; destination photography | Light editorial |

---

## Layout Principles

1. **Sky photography as brand canvas**: Delta's primary visual language is aerial and destination photography — clouds, horizon lines, and destination landscapes that evoke the aspiration of travel. Blue sky photography appears across all primary brand touchpoints. (observed on delta.com and @deltaairlines)

2. **White space signals premium**: Delta's website and marketing materials use generous white space, particularly in Delta One product pages. Dense information layouts are reserved for booking flows and operational communications. Premium cabin content breathes. (observed on delta.com/en-us/onboard/cabins/delta-one)

3. **Blue-forward navigation**: Navigation headers and footers anchor in Delta Blue, maintaining brand color consistency across the complexity of a multi-product, multi-route website. (observed on delta.com)

4. **Red as alert and action only**: The red widget mark in the Delta logo and red used in promotional callouts is reserved for urgency (sales, alerts, status indicators). It does not appear in ambient design contexts. (observed on delta.com)

5. **Photography hierarchy — people over product**: Delta's creative direction favors photography of travelers experiencing destinations over photography of aircraft. The aircraft is the mechanism; the destination is the story. (observed on @deltaairlines Instagram)

---

## Icon Style

- **Style**: Rounded, approachable, line-based. Not sharp or angular.
- **Color**: Delta Blue monochrome or white on blue backgrounds.
- **Travel icons**: Standard airport wayfinding conventions (gate, baggage, terminal) adapted to Delta brand colors.
- **SkyMiles icons**: Medallion tier badges use distinct geometric shapes: Medallion (silver), Gold Medallion, Platinum Medallion, Diamond Medallion — progressively more complex visual treatment. (observed on delta.com/skymiles)
- (T4_INFERRED from observed product screenshots and design materials on delta.com)

---

## AI Image Prompt Guide

**Premium Cabin (Delta One)**:
> "Interior of a premium airline lie-flat business class suite, warm ambient lighting, white and navy color palette, champagne glass on the side table, window with sunrise light, no text, photorealistic, ultra-detailed, wide angle"

**Destination Inspiration**:
> "Aerial view of Paris at golden hour from airplane window seat, Seine river visible below, soft clouds on the horizon, no airline branding visible, travel photography style, warm tones, 16:9"

**Sky Club Lounge**:
> "Modern airport lounge interior, high ceilings, floor-to-ceiling windows with runway view, warm lighting, comfortable seating, no visible branding, upscale hospitality design, architectural photography"

**Operational / On-Time**:
> "Wide shot of an airport tarmac at dawn, single aircraft preparing for departure, ground crew visible in orange vests, blue sky with light clouds, hopeful and professional mood, photorealistic"

---

## Design Prohibitions

1. **No low-cost airline visual conventions**: Bright orange (Spirit), yellow (Frontier), or neon-green color schemes evoke budget positioning. Delta's design never references this visual vocabulary. (T4_INFERRED)
2. **No crowded booking-flow design patterns in brand content**: Dense fare comparison grids are confined to the booking engine. Brand marketing materials use generous white space. (T4_INFERRED)
3. **No amateur travel photography**: All travel imagery must be professional-grade. User-generated content in marketing requires curation and rights clearance. (T4_INFERRED from brand quality standards)
4. **No aircraft-forward hero imagery**: The aircraft is not the hero of Delta's visual identity. Destination experiences and people are the visual priority. Aircraft appear as supporting environmental elements. (T4_INFERRED from observed creative direction)
5. **No competitor logos or livery visible in photography**: Background aircraft in photography should not display competitor airline livery. (T4_INFERRED)
6. **No Medallion status misrepresentation**: Visual design for loyalty communications must accurately reflect the customer's actual status tier. Using Diamond Medallion visual treatments in communications to Gold Medallion members creates expectation mismatch. (T4_INFERRED)
