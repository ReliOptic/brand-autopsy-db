# 06. Channel Playbook — Domino's Pizza, Inc. (DPZ)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, investor presentations, and reputable industry press. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Operational estimates are explicitly marked.

---

## Channel Architecture Overview

Domino's channel strategy is built on a single organizing principle: **own the transaction end-to-end**. Unlike restaurant brands that have ceded the ordering and delivery interface to third-party platforms, Domino's has historically built and maintained its own:

- Ordering infrastructure (app, website, AnyWare)
- Delivery infrastructure (franchisee-operated drivers)
- Tracking and customer communication systems (Domino's Tracker, GPS Driver Tracker)
- Loyalty and CRM system (Domino's Rewards)

This end-to-end ownership means Domino's retains 100% of the customer data, the transaction economics, and the brand relationship at every point in the delivery journey — a structural advantage that compounds over time as the customer database grows.

The late-2023 Uber Eats partnership (official, Domino's press releases October 2023) represents the first significant departure from this model in the U.S. market and signals an evolution (not abandonment) of the channel strategy.

---

## Channel 1 — Owned Digital (Primary)

### Domino's App (iOS / Android)

The app is the primary ordering channel and the highest-priority customer interface.

**Key features**:
- Full menu ordering with customization
- Domino's Tracker (real-time order status)
- GPS Driver Tracker (live driver map)
- Domino's Rewards integration (points balance, redemption)
- Saved orders and reorder functionality
- Carside Delivery activation
- AnyWare-connected (linked to voice assistants and third-party devices)
- Push notification channel for promotions and order updates

(official, App Store and Google Play listings; observed, Domino's app)

**Strategic importance**: The app is simultaneously the ordering interface, the loyalty program container, the CRM communication channel, and the data collection point. Approximately 75%+ of U.S. orders are placed digitally (estimated, company investor communications), making the app the single most important commercial asset in the business after the physical stores.

### Dominos.com

The desktop/mobile web ordering interface. Functionally equivalent to the app for ordering purposes. Serves customers who prefer browser-based ordering and international markets where app adoption may be lower. (observed, dominos.com)

---

## Channel 2 — AnyWare Ordering (15+ Platforms)

Launched in 2015, AnyWare is Domino's multi-platform ordering initiative enabling orders through:

- **Voice assistants**: Amazon Alexa, Google Home
- **Connected home**: Samsung Smart TV, LG Smart TV
- **In-vehicle**: Ford Sync
- **Social media**: Twitter/X (pizza emoji DM), Facebook Messenger
- **Wearables**: Apple Watch
- **Text message**: SMS ordering via saved "Easy Order"
- **Zero-click app**: Domino's Zero Click app (opens, counts down 10 seconds, auto-places saved order)

(official, Domino's press releases 2015–2018)

**Strategic significance**: AnyWare creates ordering touchpoints wherever the customer is, reducing friction between the impulse to order and the completed transaction. Each platform integration generates press coverage as a technology story while serving a real convenience function.

---

## Channel 3 — Physical Store Network (Franchise)

### Store Count and Structure

As of FY2023:
- **Total global stores**: approximately 20,532 (T1_OFFICIAL, SEC 10-K FY2023)
- **U.S. stores**: approximately 6,600 (estimated from SEC 10-K FY2023 segment disclosure; exact figure disclosed annually)
- **International stores**: approximately 13,900 (estimated from SEC 10-K FY2023; 90+ markets)
- **Franchise percentage**: approximately 99% of total stores are franchised (T1_OFFICIAL, SEC 10-K FY2023)
- **Company-owned stores**: approximately 1% (T1_OFFICIAL, SEC 10-K FY2023)

The near-total franchise structure means Domino's, Inc. functions primarily as a **franchise system operator and supply chain business**, not a direct restaurant operator. Revenue flows to the parent primarily through:
1. Franchise royalties (percentage of franchisee sales)
2. Supply chain sales (Domino's operates its own commissary / supply chain centers providing dough, ingredients, and equipment to franchisees)

(T1_OFFICIAL, SEC 10-K FY2023; detailed financial treatment in Layer 7)

### The Fortress Strategy

The fortress strategy is Domino's core store-count philosophy: instead of seeking maximum geographic spread, Domino's concentrates store density within proven delivery markets. Adding a new store in an existing territory ("fortressing") may cannibalize existing franchisee sales in the short term, but it:

- Reduces delivery times (shorter routes = hotter pizza)
- Increases delivery coverage (more households reachable within viable delivery radius)
- Creates a barrier to competitor entry in the same geography
- Increases the total addressable order volume from a market

(T4_INFERRED from company disclosures and investor communications; management has discussed the fortress strategy in earnings calls, T3_SECONDARY_RELIABLE)

Franchisee tension over fortressing is a known operational issue — existing franchisees may resist new stores in their territory that reduce their order volume. This tension is disclosed as a risk factor in the 10-K. (T1_OFFICIAL, SEC 10-K FY2023 risk factors)

### Store Format Types

- **Delivery/Carryout only**: The majority of Domino's U.S. stores — a small footprint, kitchen-focused unit designed for order execution, not dine-in. Low occupancy cost. (T3_SECONDARY_RELIABLE, industry reporting)
- **Domino's NOW (urban express format)**: Smaller, faster-turnover urban stores tested in select markets (T3_SECONDARY_RELIABLE)
- **International market adaptations**: Some international markets include limited dine-in seating based on local consumer behavior; master franchise operators have adaptation flexibility (T4_INFERRED from master franchise structure)

---

## Channel 4 — Supply Chain / Commissary System

Domino's operates its own supply chain organization (Domino's Supply Chain Services). This is a significant channel and revenue stream:

- Domino's supply chain centers prepare dough, sauce, and other ingredients and deliver them to franchisee stores on a regular schedule
- This gives corporate Domino's a revenue stream from franchisees independent of royalty fees — franchisees buy from Domino's supply chain
- It also enforces product consistency across the 99%-franchised network
- Supply chain revenue is one of the largest components of Domino's total reported revenue (see Layer 7 for financial detail)

(T1_OFFICIAL, SEC 10-K FY2023)

---

## Channel 5 — Third-Party Marketplace (Uber Eats Partnership)

In October 2023, Domino's announced a partnership with Uber Eats for U.S. marketplace availability. (official, Domino's press releases October 2023)

**Strategic rationale**: Domino's management cited reaching consumers who habitually use Uber Eats as their primary food discovery interface — customers who would not organically arrive at the Domino's app without the marketplace trigger. (T3_SECONDARY_RELIABLE, press coverage of announcement)

**Strategic constraints**: The partnership does not surrender the Domino's proprietary ordering stack. Orders placed via Uber Eats flow through the Domino's system. However, Uber Eats charges a platform fee, and customer data from Uber Eats orders may be partially retained by the platform rather than flowing fully to Domino's CRM. (T4_INFERRED from standard platform economics)

**Significance**: This is a tactical channel expansion, not an abandonment of the owned-channel strategy. The primary ordering channel remains the Domino's app. The Uber Eats partnership is a customer acquisition tool for the segment that is currently unreachable via owned channels.

---

## Channel 6 — International Master Franchise Model

Internationally, Domino's operates through a master franchise model — a master franchisee (an independent company) purchases the rights to operate and sub-franchise Domino's stores within a defined country or territory. Examples of notable master franchise partners include:

- **Domino's Pizza Enterprises (DPE)** — operates markets including Australia, New Zealand, Belgium, France, the Netherlands, Japan, and others (T3_SECONDARY_RELIABLE, public filings of DPE, listed on ASX as DMP)
- **Jubilant FoodWorks** — operates Domino's in India and Sri Lanka (T3_SECONDARY_RELIABLE, public filings of Jubilant FoodWorks, listed on NSE/BSE)
- Various other master franchisees across 90+ markets

**Channel implication**: Domino's brand standards, menu core, and ordering technology (Domino's Tracker, app) are licensed to master franchisees, but local pricing, product adaptation, and marketing execution are controlled at the master franchise level. This creates significant channel variation internationally. (T1_OFFICIAL, SEC 10-K FY2023 describes master franchise structure; T4_INFERRED for operational detail)

---

## Channel Priority Matrix

| Channel | Order Volume Share (est.) | Revenue to DPZ, Inc. | Customer Data Ownership | Strategic Priority |
|---------|--------------------------|---------------------|------------------------|-------------------|
| Domino's App | ~60%+ of digital (estimated) | Royalty + supply chain | Full | Primary |
| Dominos.com | Remaining digital (estimated) | Royalty + supply chain | Full | High |
| AnyWare (15+ platforms) | Small but growing (estimated) | Royalty + supply chain | Full | Medium (acquisition/PR) |
| Phone / In-store | Declining (estimated) | Royalty + supply chain | Partial | Low |
| Uber Eats (new, 2023) | Early stage (estimated) | Royalty only (reduced) | Partial | Medium (acquisition) |
| International master franchise | ~67% of units (estimated) | Royalty + supply chain fees | Indirect | High (growth vector) |

All share figures are estimates. DPZ does not publicly disclose precise channel mix in SEC filings.

---

*Layer 6 — Channel Playbook | Brand Autopsy DB Project*
*Source tier system: T1_OFFICIAL (SEC filings/official) | T3_SECONDARY_RELIABLE | T4_INFERRED (project analysis)*
