# 02. Audience Map — Alphabet Inc. / Google (GOOG)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and third-party research. It does not constitute investment, legal, or strategic advice. Estimates are explicitly marked `(estimated)`.

---

## Ideal Customer Profile (ICP)

| Dimension | Profile |
|-----------|---------|
| **Consumer users** | Everyone with internet access. Google Search, Maps, Gmail, YouTube, and Android collectively reach an estimated 4.3B+ users globally (estimated, T3_SECONDARY_RELIABLE) |
| **Advertiser customers** | Businesses of all sizes purchasing Google Ads (Search, Display, YouTube, Shopping). Google advertising revenue: $264.5B FY2024 (SEC 10-K FY2024) |
| **Enterprise customers** | Organizations using Google Cloud Platform (GCP), Google Workspace. Cloud revenue: $43.8B FY2024 (SEC 10-K FY2024) |
| **Developer ecosystem** | Android developers, Chrome extension developers, Google Cloud developers. Google Play Store hosts 3.5M+ apps (estimated, T3_SECONDARY_RELIABLE) |

---

## Core Personas

### Persona 1 — Everyone (Consumer)

- Google's consumer ICP is literally "everyone with internet access." This is not hyperbole — it is the operational reality of Search, Maps, Gmail, YouTube, and Android.
- **Core pain**: Need to find information, navigate, communicate, watch video, or use a smartphone.
- **Google rationale**: Google products are free, familiar, and integrated. Switching cost is psychological (habit) and practical (data stored in Google ecosystem). (T4_INFERRED)
- **Churn risk**: Low at individual product level; moderate if an alternative ecosystem (Apple) captures the user entirely.

### Persona 2 — Lisa, Digital Marketing Manager

- **Company**: E-commerce retailer, $5M annual ad spend
- **Google products**: Google Ads (Search, Shopping, YouTube), Google Analytics, Google Tag Manager
- **Core pain**: ROI accountability on every ad dollar. Needs to reach high-intent shoppers at the moment of purchase consideration.
- **Google rationale**: Google Search captures intent signals no other platform can match. "People tell Google what they want to buy." (T4_INFERRED)
- **Churn risk**: Low — Search advertising has no equivalent-scale alternative for intent-based marketing. Meta and TikTok serve awareness; Google serves intent.

### Persona 3 — James, CTO at a Tech Startup

- **Company**: Series B AI startup, 50 engineers
- **Google products**: Google Cloud Platform (GKE, BigQuery, Vertex AI), Google Workspace
- **Core pain**: Needs scalable AI/ML infrastructure without building from scratch. Vertex AI and TPU access are differentiators vs. AWS.
- **Google rationale**: Google Cloud's AI/ML capabilities (TPU, Vertex AI, Gemini API) align with AI-native product development. (official, cloud.google.com)
- **Churn risk**: Medium — AWS is larger; Azure has Microsoft 365 integration. Multi-cloud strategies are common.

---

## Purchase Journey — AARRR Framework

| Stage | Mechanism | Indicators |
|-------|----------|------------|
| **Acquisition** | Google products are pre-installed (Android, Chrome) or default (Search in Safari). Users do not "acquire" Google; Google acquires users through ubiquity. | Monthly active users; market share by product |
| **Activation** | First search query, first Gmail account, first YouTube video — activation is near-instant and friction-free. | Account creation; first product use |
| **Retention** | Data accumulation (Gmail history, Google Photos library, Maps saved places, YouTube history) creates switching cost. Each year of use deepens lock-in. | Time spent; data volume per user; multi-product usage |
| **Referral** | "Google it" as cultural verb. Android device gifting. YouTube link sharing. | Organic search share; YouTube share rate |
| **Revenue** | Advertising (85%+ of Alphabet revenue); Cloud subscriptions; Hardware (Pixel); Google One; YouTube Premium | Total revenue: $350.0B FY2024 (SEC 10-K FY2024) |

---

## Anti-Persona

| Type | Why Not Google |
|------|--------------|
| **Privacy absolutist** | Rejects ad-supported models; uses DuckDuckGo, ProtonMail, Signal. Google's business model is fundamentally incompatible with zero-data-collection preferences. |
| **Apple ecosystem loyalist** | Prefers Apple's integrated, privacy-marketed ecosystem. Uses Safari, Apple Maps, iCloud instead of Google equivalents. |
| **Enterprise Microsoft-committed** | All-in on Microsoft 365 + Azure + Teams. Google Workspace is a competitive offering, not a complement. |

---

## Steal Sheet — 3 Transferable Principles

**1. Make activation frictionless to zero.**
Google Search requires no account, no download, no login. Type a query, get an answer. The path from "never used" to "active user" is one keystroke. Transferable: audit your activation flow and remove every step that is not absolutely necessary.

**2. Build switching costs through data accumulation, not contracts.**
Google does not lock users in with contracts. It locks them in with 15 years of email, photos, and search history. The switching cost is the user's own data. Transferable: design products that become more valuable the longer they are used.

**3. Serve the advertiser with user intent data.**
Google's consumer products generate intent signals (search queries, YouTube watches, Maps searches) that are monetized through advertising. The consumer is the product's user; the advertiser is the customer. Transferable: if your product generates valuable behavioral data, consider whether a two-sided business model is appropriate.
