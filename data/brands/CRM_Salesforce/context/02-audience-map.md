# 02. Audience Map — Salesforce (CRM)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Ideal Customer Profile (ICP)

| Dimension | Primary ICP (Enterprise) | Secondary ICP (SMB) |
|-----------|--------------------------|---------------------|
| **Company Size** | 500–50,000+ employees; mid-market to enterprise (SEC 10-K FY2024 revenue mix skews enterprise) | 10–500 employees; Salesforce Essentials and Starter tiers |
| **Industry** | Financial services, technology, healthcare, retail, manufacturing, professional services — Salesforce has industry-specific clouds for each | Any industry with customer-facing sales or service teams |
| **Decision Maker** | Chief Revenue Officer, VP of Sales, Chief Customer Officer, CIO — typically multi-stakeholder enterprise sale | Business owner, Sales Manager, Head of Operations |
| **Tech Maturity** | Existing CRM in place (often legacy Siebel, SAP, or Microsoft Dynamics) being displaced or expanded | First CRM implementation; migrating from spreadsheets |
| **Pain Point** | Fragmented customer data across systems; inability to forecast revenue accurately; high cost of legacy CRM maintenance | No unified customer view; manual sales processes; lost deals from poor follow-up |

---

## Persona 1 — The Enterprise CRO (Champion Buyer)

**Profile**: Chief Revenue Officer or VP of Sales at a 2,000+ employee company. Has a quota, a board to report to, and a team of 50–500 sales reps using CRM daily.

**Pain**: Revenue forecast accuracy is poor; reps are spending a disproportionate share of time on data entry; leadership lacks a single source of truth for pipeline. (estimated, based on Salesforce State of Sales research findings; T3_SECONDARY_RELIABLE)

**Gain**: Real-time pipeline visibility; AI-powered forecasting (Einstein/Agentforce); rep productivity gains from automation; board-ready reporting dashboards.

**Triggers**:
- Missed quarterly revenue target attributed to poor pipeline visibility
- Board request for more accurate forecasting
- Competitor sales team outperforming using better tooling

**Salesforce Response**: Sales Cloud and Revenue Cloud directly address forecast accuracy and pipeline management. Einstein AI forecasting is positioned as the solution to human-error-prone manual pipeline review. (official, salesforce.com)

---

## Persona 2 — The Salesforce Admin (Power User / Internal Champion)

**Profile**: Internal Salesforce administrator, typically 28–42 years old, at a 200–5,000 person company. Often self-taught via Trailhead; holds multiple Salesforce certifications. Acts as the internal advocate for Salesforce expansion and the primary barrier to competitive displacement.

**Pain**: Constantly asked to build new workflows with limited developer resources; needs to demonstrate ROI of Salesforce investment to CFO; concerns about platform complexity when adding new clouds.

**Gain**: Trailhead community for peer learning; new certifications to advance career; low-code tools (Flow, Lightning App Builder) to build without full developer support.

**Triggers**:
- Dreamforce announcement of new platform features
- Trailhead badge or certification completion
- Executive team request for a new integration or automation

**Salesforce Response**: Trailhead provides free certification prep, community forums, and hands-on learning trails. The Salesforce admin is treated as a hero persona in all community and event marketing. (official, Trailhead.salesforce.com; Dreamforce)

---

## Persona 3 — The Digital-Transformation CIO (Economic Buyer)

**Profile**: CIO or CTO at an enterprise company undertaking a digital transformation initiative. Age 45–58. Has budget authority and is evaluating Salesforce as a platform — potentially including MuleSoft, Tableau, and Slack alongside the CRM.

**Pain**: Fragmented technology stack with dozens of point solutions; high total cost of ownership for legacy systems; board pressure to show digital transformation ROI.

**Gain**: A unified platform reducing vendor count; Salesforce's Einstein Trust Layer for AI governance; MuleSoft integration reducing middleware complexity; executive-level partnership from Salesforce account team.

**Triggers**:
- Enterprise architecture review or legacy system end-of-life
- M&A activity requiring systems consolidation
- Board mandate to establish AI-first operations

**Salesforce Response**: Salesforce Platform and MuleSoft Anypoint Platform are positioned as integration and API management solutions. Salesforce's enterprise account teams provide C-suite engagement as part of the sales process. (official, salesforce.com)

---

## AARRR Purchase Journey (Enterprise)

| Stage | Trigger | Salesforce Touchpoint |
|-------|---------|----------------------|
| **Acquisition** | RFP for CRM replacement; analyst report (Gartner Magic Quadrant) | Gartner MQ "Leader" recognition; State of Sales report; SDR outbound; paid search |
| **Activation** | Proof of concept or trial environment | Salesforce free trial; Trailhead Playground sandbox; account executive demo |
| **Retention** | Annual contract renewal; expansion to additional clouds | Customer Success team; Trailhead for ongoing training; Dreamforce attendance |
| **Referral** | Peer recommendation; Trailblazer community stories | Published case studies; Gartner Peer Insights reviews; Trailblazer community posts |
| **Revenue** | Expansion to new clouds, additional user seats | Customer Success expansion motion + account executive upsell |

---

## Anti-Persona

**The IT-Controlled Cost-Center Organization**: A company where all technology decisions are made by a centralized IT department focused exclusively on total cost of ownership and on-premise infrastructure preference. These organizations may favor SAP, Microsoft Dynamics (with an existing Microsoft Enterprise Agreement), or Oracle. Salesforce's ROI arguments and business-user empowerment messaging do not resonate in environments where technology is treated as a cost center rather than a revenue driver. (T4_INFERRED)

---

## Steal Sheet — 3 Transferable Audience Principles

**1. The internal champion is a distinct persona — invest in them separately.**
Salesforce's Trailhead platform exists primarily to serve the admin persona. Free certifications, gamified learning, and community events create a class of internal advocates who become the primary force opposing competitive displacement. The economic buyer signs the contract; the admin makes it irreplaceable.

**2. Turn learning into loyalty.**
Trailhead has issued millions of badges and certifications. Each certification represents a sunk investment of time for the individual — a reason to remain on the platform. Free education is among the most effective retention mechanisms in B2B software because it creates competence lock-in layered on top of technical lock-in. (T4_INFERRED, based on observed Trailhead model)

**3. Segment by transformation stage, not just company size.**
A 500-person company in active digital transformation is a higher-priority target than a 5,000-person company satisfied with legacy tools. Salesforce's growth motion prioritizes companies undergoing transformation — a behavioral segment, not a demographic one.
