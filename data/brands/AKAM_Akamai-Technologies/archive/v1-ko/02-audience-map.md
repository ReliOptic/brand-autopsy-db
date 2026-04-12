# 02. Audience Map — Akamai Technologies, Inc. (AKAM)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Ideal Customer Profile (ICP)

| Dimension | Profile |
|-----------|---------|
| **Core Demographics** | Enterprise IT leaders (CTO, CISO, VP Engineering) at companies with significant web traffic, digital commerce, or SaaS platforms |
| **Company size** | Mid-market to large enterprise; typically $500M+ revenue; highest concentration in Fortune 500 and Global 2000 |
| **Industry verticals** | Media & entertainment, e-commerce, financial services, SaaS/technology, gaming, healthcare, public sector (official, SEC 10-K FY2024) |
| **Technical profile** | Teams managing high-traffic web properties, API infrastructure, application security; evaluating edge computing and zero-trust architectures |
| **Purchase triggers** | Traffic spikes (product launch, live event, Black Friday); DDoS attack or security incident; cloud cost optimization initiative; digital transformation mandate from board level |
| **Budget range** | Annual contracts typically $100K–$10M+ depending on traffic volume and security requirements (estimated) |

---

## Core Personas

### Persona 1 — Sarah, VP of Engineering at a Media Company

- **Company**: Major streaming or news platform; 100M+ monthly users
- **Core pain**: Live events (breaking news, sports streams) create traffic spikes that can overwhelm origin infrastructure. A 2-second latency increase during a live event costs measurable viewer drop-off and advertising revenue.
- **Akamai selection rationale**: Akamai's CDN absorbs traffic spikes at the edge, keeping origin servers stable. The SLA-backed performance is a risk reduction tool. (T4_INFERRED)
- **Brand relationship**: Evaluates Akamai as infrastructure, not as a brand. Technical performance data and customer references drive the procurement decision.
- **Churn risk**: Moderate — multi-CDN strategies are common; CloudFront (AWS), Cloudflare, and Fastly compete for share of traffic. (T4_INFERRED)

### Persona 2 — Michael, CISO at a Financial Services Firm

- **Company**: Regional bank or insurance company; strict regulatory requirements
- **Core pain**: Web application attacks, credential stuffing, bot-driven fraud attempts against customer-facing portals. A successful breach triggers regulatory investigation and reputational damage.
- **Akamai selection rationale**: Akamai's security suite (App & API Protector, Bot Manager, Account Protector) operates at the edge, blocking threats before they reach origin infrastructure. (official, akamai.com/security)
- **Brand relationship**: Values Akamai's threat intelligence derived from observing global traffic patterns. The State of the Internet reports reinforce Akamai's security authority.
- **Churn risk**: Low — security vendor switching in regulated industries is slow due to compliance and integration costs. (T4_INFERRED)

### Persona 3 — Priya, Cloud Architect at a SaaS Startup

- **Company**: Series C SaaS company; 10,000+ enterprise customers globally
- **Core pain**: Cloud costs (AWS/Azure) are the second-largest expense after personnel. Looking for compute alternatives that reduce egress fees and improve latency for globally distributed users.
- **Akamai selection rationale**: Akamai Connected Cloud (powered by Linode acquisition) offers compute at the edge at potentially lower cost than hyperscaler equivalents for certain workloads. (official, akamai.com/cloud-computing)
- **Brand relationship**: New to Akamai; evaluating Connected Cloud as a cost optimization play. Brand trust is lower than for CDN/security products.
- **Churn risk**: High — cloud compute is competitive and price-sensitive; switching costs are lower than for integrated security products. (T4_INFERRED)

---

## Purchase Journey — AARRR Framework

| Stage | Akamai's Mechanism | Key Indicators |
|-------|------------------|----------------|
| **Acquisition** | State of the Internet reports → analyst recognition (Gartner, Forrester) → security incident response → enterprise sales team outreach | MQL volume; analyst positioning (Gartner Magic Quadrant placements) |
| **Activation** | Technical proof of concept → integration with existing infrastructure → traffic routing configuration | POC completion rate; time-to-first-traffic |
| **Retention** | SLA performance → security threat blocking metrics → account management → platform expansion (CDN → security → compute) | Net revenue retention rate; customer expansion revenue |
| **Referral** | Enterprise reference customers → conference presentations → case study publications | Customer reference willingness; conference speaking slots |
| **Revenue** | Annual/multi-year contracts → traffic-based usage fees → security product bundles → Connected Cloud compute consumption | Revenue: ~$3.9B FY2024 (SEC 10-K FY2024); recurring revenue percentage |

---

## Anti-Persona

| Type | Characteristics | Why Akamai Is Not the Match |
|------|----------------|---------------------------|
| **Small website owner** | Personal blog, small business site with <10K monthly visitors | Akamai's enterprise pricing and complexity are disproportionate to need; Cloudflare's free tier or basic CDN serves this segment |
| **All-in hyperscaler customer** | Organization committed to single-cloud strategy (all-AWS or all-Azure) | Bundled CDN and security from the hyperscaler may be "good enough" and operationally simpler |
| **Price-only buyer** | Procurement team evaluating CDN purely on $/GB delivered | Akamai's premium pricing reflects security integration and global reach; commodity CDN buyers will choose lower-cost alternatives |

---

## Steal Sheet — 3 Transferable Principles

**1. Publish unique data to create inbound demand.**
Akamai's State of the Internet reports generate media coverage, analyst citations, and inbound enterprise inquiries. The data is unique because only Akamai sees traffic at that scale. Transferable: identify what data your product uniquely observes, then publish it.

**2. Land with one product, expand with the platform.**
Akamai's typical enterprise journey: CDN first, then security, then compute. Each product deepens the integration and increases switching cost. Transferable: design your product line so the first sale creates natural expansion opportunities.

**3. Sell risk reduction, not features.**
For CISOs, Akamai is a risk reduction tool, not a feature set. "We block 1.5 billion attacks per day" (estimated, based on Akamai public statements) communicates risk reduction more effectively than a feature comparison table.
