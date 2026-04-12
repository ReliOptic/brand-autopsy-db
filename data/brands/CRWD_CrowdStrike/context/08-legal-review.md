# 08. Legal Review — CrowdStrike Holdings, Inc. (CRWD)

> **Disclaimer**: This document is prepared solely for brand strategy analysis purposes and does NOT constitute legal advice, legal opinion, or investment guidance. All litigation and regulatory information is sourced from publicly available records: SEC filings, official court dockets, regulatory agency press releases, and reputable journalism. Nothing in this document characterizes any party's conduct as unlawful. Source tier codes follow the T1-T5 system.

---

## IP Portfolio Overview

| Category | Details | Source |
|----------|---------|--------|
| **Trademarks** | "CrowdStrike®", "Falcon®", "Threat Graph®" are registered trademarks. "We stop breaches" and "Fal.Con" are used as brand identifiers. | SEC 10-K FY2024 (T1_OFFICIAL); USPTO trademark database (T1_OFFICIAL) |
| **Patents** | CrowdStrike holds patents relating to malware detection, behavioral AI, cloud-based security analytics, and threat intelligence systems. The company does not publicly disclose the total patent count in SEC filings. | SEC 10-K FY2024 — IP section (T1_OFFICIAL) |
| **Trade Secrets** | The Threat Graph architecture, adversary attribution methodology, and AI model training data are described in SEC filings as proprietary trade secrets protected by contractual and technical measures. | SEC 10-K FY2024 (T1_OFFICIAL) |
| **Copyrights** | Annual Global Threat Report, adversary intelligence profiles, and technical research publications are copyright CrowdStrike, Inc. | Observed on crowdstrike.com (T2_PRIMARY_RELIABLE) |

---

## Major Litigation and Regulatory Matters

### Matter 1: July 2024 Falcon Sensor Update Outage — Civil Claims

**Status**: Post-FY2024 10-K event; litigation activity ongoing as of public reporting in late 2024.

**Summary**: On July 19, 2024, a faulty content configuration update to the Falcon sensor caused approximately 8.5 million Windows devices to enter a boot loop. The incident affected airlines, hospitals, banks, broadcasters, and other critical infrastructure customers globally. Delta Air Lines reported approximately $500 million in losses attributed to the outage. (T3_SECONDARY_RELIABLE, Reuters, Bloomberg, WSJ, July–August 2024; Delta Air Lines public statements)

**Legal activity as publicly reported**:
- Delta Air Lines retained legal counsel and publicly indicated it was pursuing recovery of losses from CrowdStrike and Microsoft. (T3_SECONDARY_RELIABLE, Delta CEO statements, August 2024)
- CrowdStrike disputed the scope of Delta's claimed damages in public statements. (T3_SECONDARY_RELIABLE, CrowdStrike public response, August 2024)
- Multiple shareholder class action lawsuits were filed alleging securities law violations related to disclosures about software quality controls. (T3_SECONDARY_RELIABLE, contemporaneous reporting by Reuters)

**Project writing note**: This is an area of active litigation. Content about this incident must cite only publicly disclosed facts and must not characterize fault or liability. Do NOT write "CrowdStrike caused [dollar amount] in damages" — write "Delta Air Lines publicly reported losses of approximately [amount] attributed to the outage" with citation.

---

### Matter 2: DNC Attribution Context

**Summary**: CrowdStrike's 2016 attribution of the Democratic National Committee breach to Russian intelligence units (APT28 / Fancy Bear) became a subject of public controversy. CrowdStrike has consistently maintained its technical attribution conclusions. No legal action has been brought against CrowdStrike relating to this attribution as a matter of public record. (T3_SECONDARY_RELIABLE, published technical reports; congressional testimony)

**Project writing note**: Attribution of cyberattacks to nation-state actors carries geopolitical sensitivity. When writing about CrowdStrike's attribution work, present it as the company's stated conclusion with the evidence basis described, not as established legal fact.

---

## Regulatory Landscape

| Regulatory Area | Applicable Framework | Relevance to CrowdStrike |
|----------------|---------------------|--------------------------|
| **FedRAMP** | Federal Risk and Authorization Management Program | CrowdStrike Falcon for Government holds FedRAMP High authorization, enabling federal civilian agency deployments. (official, crowdstrike.com/government) |
| **GDPR / EU Privacy** | General Data Protection Regulation | CrowdStrike processes security telemetry data from EU-based customers under Data Processing Agreements and EU Standard Contractual Clauses. SEC 10-K FY2024 identifies EU regulatory compliance as an ongoing operational requirement. (T1_OFFICIAL) |
| **SEC Cybersecurity Disclosure Rules** | Effective December 2023 | As a public company and cybersecurity vendor, CrowdStrike is subject to SEC rules requiring material cybersecurity incident disclosure within 4 business days. The July 2024 outage was disclosed via 8-K. (T1_OFFICIAL, SEC filings) |
| **CISA Coordination** | Cybersecurity and Infrastructure Security Agency | CrowdStrike participates in the Joint Cyber Defense Collaborative (JCDC). (official, cisa.gov) |
| **Export Controls (EAR)** | Export Administration Regulations | Security software with dual-use potential is subject to export controls. SEC 10-K identifies export control compliance as an ongoing legal obligation. (T1_OFFICIAL) |

---

## Project Risk Assessment

### Litigation Posture Rating: HIGH

CrowdStrike is an unusually litigation-sensitive subject for three reasons:
1. The July 2024 outage generated active, ongoing civil litigation and shareholder class actions.
2. CrowdStrike's core business — attributing attacks to nation-state actors — involves public statements that powerful actors may contest.
3. The company has demonstrated willingness to dispute public claims about its liability in the Delta Air Lines matter.

---

### Data Collection Legality

CrowdStrike processes endpoint telemetry data, identity telemetry, and cloud workload telemetry under customer contracts with explicit data processing agreements. For EU customers, GDPR Article 28 (data processor) agreements are in place. The Threat Graph aggregates telemetry cross-customer in anonymized form to improve AI models — this is disclosed in CrowdStrike's privacy policy and customer agreements. (official, crowdstrike.com/privacy-policy)

**For this project**: Content analyzing CrowdStrike's data practices must rely on published privacy policy and SEC disclosures. Do not speculate about data practices that are not publicly documented.

---

### Fair Use Analysis

This brand autopsy document:
- Cites CrowdStrike's publicly available materials (website, SEC filings, published research) for factual claims
- Does not reproduce substantial portions of proprietary research (Global Threat Report)
- Does not claim to be affiliated with, endorsed by, or acting on behalf of CrowdStrike
- Uses registered trademarks "Falcon®" and "CrowdStrike®" in a nominative descriptive context for educational brand analysis
- Does not create commercial competition with CrowdStrike's products or published research

This usage falls within standard nominative fair use for brand analysis. No license from CrowdStrike is required.

---

## Writing Risk Guide

### SAFE TO WRITE

- "CrowdStrike attributed [incident] to [adversary group] based on [published technical indicators]" — with citation to the published report
- "The July 2024 Falcon sensor update caused system instability affecting approximately 8.5 million Windows devices" — citing public reporting (T3_SECONDARY_RELIABLE)
- "Delta Air Lines publicly stated it experienced approximately $500 million in losses attributed to the outage" — citing Delta's public statements (T3_SECONDARY_RELIABLE)
- "CrowdStrike disputed the scope of Delta's claimed damages in public statements" — citing CrowdStrike's public response (T2_PRIMARY_RELIABLE)
- "CrowdStrike holds registered trademarks for 'Falcon' and 'Threat Graph'" — citing USPTO records (T1_OFFICIAL)
- "CrowdStrike reported ARR of $3.44B as of Q4 FY2024" — citing SEC 10-K (T1_OFFICIAL)
- "Shareholder class action lawsuits were filed following the July 2024 incident" — citing public reports (T3_SECONDARY_RELIABLE)

### HEDGE REQUIRED

- Any statement about ongoing litigation outcomes: "As of publicly available reporting through [date], the litigation has not been resolved."
- Any statement comparing CrowdStrike's detection rates to competitors: "Based on [specific benchmark source], CrowdStrike's detection rate in [specific test] was [X]%." Never assert superiority without a cited test.
- Any statement about nation-state attribution accuracy: "CrowdStrike's published attribution for [incident] identified [adversary]; this attribution has [been independently corroborated by / not been publicly disputed by] [source]."
- Any estimate of brand valuation or market premium: "(estimated)" tag required.

### DO NOT WRITE

- "CrowdStrike caused [dollar amount] in damages to Delta Air Lines" — causation and liability are active legal disputes
- "CrowdStrike's outage was caused by negligence" — negligence is a legal determination not yet made by a court
- "CrowdStrike intentionally [any action]" — intent attribution is prohibited
- "The hack was definitely carried out by [nation-state]" — use CrowdStrike's own attribution language with citation; do not independently assert geopolitical conclusions
- "CrowdStrike's customer data was compromised" — no confirmed customer data breach is in the public record as of available information
- "CrowdStrike's AI stops 100% of breaches" — the brand promise is directional; absolute prevention claims are not supported
- Any characterization of the July 2024 outage as a "cyberattack" — it was publicly confirmed as an internal software update error

---

## ESG Indicators

| Area | Status | Source |
|------|--------|--------|
| **Environmental** | CrowdStrike publishes limited environmental reporting; cloud-delivered SaaS model has lower hardware footprint than on-premise software. | SEC 10-K FY2024 — limited disclosure (T1_OFFICIAL) |
| **Social** | CrowdStrike Foundation funds cybersecurity education programs. "Hacking Is Cool" initiative supports underrepresented groups in cybersecurity. | official, crowdstrike.com/crowdstrike-foundation |
| **Governance** | Board includes independent directors; Audit Committee oversees cybersecurity risk as a Board-level function following SEC 2023 rules. | SEC DEF 14A FY2024 proxy statement (T1_OFFICIAL) |

---

## Risk Heatmap

| Risk | Probability (T4_INFERRED) | Impact | Priority |
|------|--------------------------|--------|----------|
| Delta Air Lines litigation resulting in material judgment | Medium | High | HIGH |
| Shareholder class action settlement | Medium | Medium | MEDIUM |
| EU regulatory investigation into Threat Graph cross-customer data | Low | High | MEDIUM |
| Nation-state retaliation for public attribution | Low | Very High | MEDIUM |
| Additional platform outage causing customer churn | Low-Medium | High | HIGH |
| Export control violation finding | Very Low | Medium | LOW |
