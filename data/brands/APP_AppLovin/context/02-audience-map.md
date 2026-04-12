# 02. Audience Map — AppLovin Corporation (APP)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Ideal Customer Profile (ICP)

AppLovin serves a two-sided marketplace: mobile app publishers who monetize through advertising, and app developers/marketers who acquire users through advertising. The Software segment (AXON-powered user acquisition) has grown to represent the majority of AppLovin's revenue and profit as of FY2023. (SEC 10-K FY2023)

| Dimension | Advertiser Side (UA) | Publisher Side (Monetization) |
|-----------|----------------------|-------------------------------|
| **Who they are** | Mobile game studios and app developers with active user acquisition budgets | Mobile game studios and app developers with ad-supported monetization models |
| **Scale** | Mid-to-large studios spending $500K+ monthly on UA (estimated) | Studios with 100K+ DAU generating meaningful ad impression volume (estimated) |
| **Geography** | Global; US, Europe, Japan, South Korea are highest-value UA markets | Global; English-language and East Asian markets dominate premium eCPM |
| **Team profile** | Growth managers, UA managers, mobile marketing teams | Monetization managers, revenue operations teams |
| **Decision metric** | ROAS (D7, D30, D180), CPI, LTV | eCPM, fill rate, ARPDAU |

---

## Three Primary Personas

### Persona 1: Jake Nguyen — The Mobile UA Manager

**Role**: User Acquisition Manager at a mid-size mobile gaming studio, age 29. Manages approximately $2M/month in UA spend across Google UAC, Meta Advantage+, AppLovin, and Unity Ads. Reports to the VP of Growth. (T4_INFERRED representative persona)

**Pain points**:
- iOS 14.5 ATT framework reduced signal fidelity for IDFA-based targeting; attribution accuracy has declined across all channels.
- Campaign performance on incumbent platforms has plateaued; marginal ROAS on incremental budget is declining.
- Proving channel-level incrementality to the finance team is increasingly difficult as attribution models diverge between MMPs and platform-reported metrics.

**Gain triggers**:
- AXON demonstrates measurably higher D7 ROAS versus comparable campaigns on other channels, backed by AppLovin case study data.
- Self-serve campaign setup requires less operational overhead than managed service competitors.
- AppLovin's contextual targeting signals maintain performance in the post-ATT environment.

**Brand touchpoints**: applovin.com/grow, AppLovin developer blog, Mobile Dev Memo newsletter, GDC presentations, AppLovin account manager.

---

### Persona 2: Priya Sharma — The Monetization Lead

**Role**: Head of Monetization at a casual mobile game publisher with 5M MAU, age 34. Manages ad stack architecture: mediation platform selection, demand partner relationships, A/B testing of ad placements. (T4_INFERRED representative persona)

**Pain points**:
- Legacy waterfall mediation leaves revenue on the table; historical network priority ordering does not reflect real-time demand.
- Managing multiple demand partner SDKs creates engineering complexity and app performance risk.
- eCPM pressure from macro ad spending slowdowns reduced yield across mediation platforms in 2022–2023.

**Gain triggers**:
- MAX in-app bidding runs simultaneous real-time auctions; AppLovin's case studies indicate yield improvement over waterfall (observed on applovin.com/max; specific figures not independently verified by this project).
- Single SDK integration simplifies the stack and reduces engineering burden.
- AppLovin's scale as both mediator and demand source creates competitive auction dynamics that may benefit publisher yield.

**Brand touchpoints**: applovin.com/max, industry blog content, App Annie/data.ai reports, AppLovin partner events.

---

### Persona 3: Marcus Albrecht — The CFO of a Mid-Tier Game Studio

**Role**: CFO of a 150-person mobile gaming studio with approximately $80M annual revenue (estimated), age 44. Approves UA budget and monitors blended ROAS across all channels. Primary concern: payback period on UA spend relative to studio cash position. (T4_INFERRED representative persona)

**Pain points**:
- UA spend is the largest variable cost line; ROAS degradation directly impacts profitability.
- Attribution fragmentation makes it difficult to allocate budget with confidence across channels.
- Short-seller analyst commentary about AppLovin's attribution methodology (published 2024) creates board-level questions about channel measurement reliability.

**Gain triggers**:
- AppLovin publishes verifiable case studies showing payback period improvements for comparable studios.
- AppLovin's incrementality measurement tools provide finance-grade evidence of channel contribution.
- Revenue growth of the studio correlates observably with AppLovin spend in the P&L.

**Brand touchpoints**: AppLovin investor relations (as a signal of platform stability), trade press coverage, studio peer network discussions.

---

## AARRR Purchase Journey (Advertiser/UA Side)

| Stage | Description | AppLovin Touchpoint |
|-------|-------------|---------------------|
| **Awareness** | UA manager learns about AXON performance claims from industry peers or trade press | Mobile Dev Memo coverage; GDC session; AppLovin developer blog |
| **Acquisition** | UA manager creates AppLovin Ads account and runs initial test campaign | Self-serve onboarding at ads.applovin.com; AppLovin account manager outreach |
| **Activation** | First campaign achieves target ROAS on a small test budget; UA manager scales spend | AppLovin dashboard metrics; account manager optimization support |
| **Retention** | Studio allocates a sustained share of monthly UA budget to AppLovin | ROAS performance maintenance; automated bidding optimization; account health reviews |
| **Referral** | UA manager presents AppLovin results at industry conference or recommends to peer at another studio | AppLovin case study program; developer community testimonials |

---

## Anti-Persona

**The Brand-Safety-First CMO at a Regulated-Industry App**: A CMO at a consumer finance, healthcare, or regulated-industry app whose primary objective is brand awareness and whose secondary concern is brand safety in adjacent ad placements. AppLovin's network is heavily gaming-oriented; the inventory context, measurement methodology, and optimization objective (ROAS/install) are mismatched with brand awareness objectives in sensitive categories. This persona is better served by premium direct deals or brand-safety-certified private marketplace environments. (T4_INFERRED from AppLovin's disclosed network composition; SEC 10-K FY2023)

---

## Steal Sheet — 3 Transferable Principles

**1. The two-sided platform audience map is always two separate maps.**
AppLovin's publisher and advertiser audiences have different vocabulary, different success metrics, different decision-makers, and different objections. Merging them into one "mobile developer" persona produces messaging that resonates with neither side clearly. Transferable principle: draw the audience map separately for each side of any two-sided marketplace.

**2. The budget approver persona is a silent veto — address them directly.**
In UA-heavy gaming studios, the CFO approves or cuts the UA budget based on ROAS visibility. AppLovin's business narrative — including its public response to short-seller reports — targets this persona even though the CFO never logs into the platform. Transferable principle: identify the budget approver in your customer's org and ensure your brand narrative addresses their concerns explicitly.

**3. Industry-wide signal loss creates brand positioning opportunities.**
iOS 14.5's ATT framework degraded IDFA-based targeting across mobile. AppLovin's pivot to contextual and cohort-based targeting is both a product response and a brand positioning move: the company that solves the post-ATT performance problem owns the narrative in a market where the problem affects every advertiser. Transferable principle: regulatory or platform changes that degrade existing solutions are positioning opportunities for the company that credibly addresses them first.
