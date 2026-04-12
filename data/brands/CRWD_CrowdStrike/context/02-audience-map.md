# 02. Audience Map — CrowdStrike Holdings, Inc. (CRWD)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Ideal Customer Profile (ICP)

| Dimension | Description |
|-----------|-------------|
| **Firmographics** | Enterprise and mid-market organizations, 500+ employees; verticals: financial services, healthcare, government, technology, energy. Annual IT/security budget $500K+. (T4_INFERRED from customer case studies on crowdstrike.com and 10-K disclosures) |
| **Tech Stack** | Windows-dominant endpoints; hybrid cloud (AWS, Azure, GCP); SIEM infrastructure; identity providers (Okta, Active Directory). (T4_INFERRED from Falcon integration ecosystem, crowdstrike.com/marketplace) |
| **Security Maturity** | Mid-to-high: dedicated SOC or MSSP; has experienced at least one significant security incident or regulatory audit; evaluating platform consolidation. (T4_INFERRED) |
| **Decision Authority** | CISO as primary economic buyer; CIO and CFO as budget approvers; Security Architect and SOC Manager as technical validators. Multi-stakeholder committee. (T4_INFERRED from go-to-market description in SEC 10-K FY2024) |
| **Pain State** | Alert fatigue from multiple point products; inability to attribute attacks to specific actors; compliance pressure (PCI DSS, HIPAA, SOC 2); board-level scrutiny following sector breach events. (T4_INFERRED) |

---

## Persona Gallery

### Persona 1: The CISO Under Board Scrutiny

**Role**: Chief Information Security Officer, regional bank, ~3,000 employees

**Pain Points**:
- Board demands monthly breach risk reporting in business language, not technical metrics
- Current stack is 9–11 different point products — difficult to demonstrate consolidated posture
- Regulators (OCC, FFIEC) increasing examination scrutiny following sector-wide ransomware incidents
- Career risk: a material breach event could end tenure

**Gain Goals**:
- Single platform producing board-ready dashboards and compliance evidence
- Vendor consolidation reducing annual licensing cost (estimated 20–30% reduction)
- Adversary attribution to brief the board on "who is targeting us and why"

**Trigger Events**:
- A competitor institution suffers a publicized ransomware attack
- Board requests cyber risk quantification tied to business impact
- Regulatory examination finds gaps in endpoint visibility documentation

**CrowdStrike Solution Fit**: Falcon Complete MDR removes operational burden; Falcon Insight XDR provides consolidated dashboard; adversary intelligence enables board-level threat narrative. (official, crowdstrike.com/products)

---

### Persona 2: The Security Architect Evaluating Platform Consolidation

**Role**: Senior Security Architect, SaaS technology company, ~1,800 employees, AWS-native

**Pain Points**:
- 6 separate security tools with no unified data model — alert correlation is manual
- Cloud workload visibility absent: no coverage on ephemeral containers
- SOC team spending majority of time on alert triage rather than investigation (estimated)

**Gain Goals**:
- Single data model across endpoint, cloud, and identity enabling automated correlation
- Coverage for Linux containers and serverless workloads, not just Windows endpoints
- Sensor that does not require kernel module installation in cloud environments

**Trigger Events**:
- A zero-day incident exposes gap between detection and containment speed
- Engineering leadership demands security tooling that does not slow CI/CD pipelines
- Annual contract renewal for existing EDR vendor creates evaluation window

**CrowdStrike Solution Fit**: Falcon Cloud Security (CNAPP) with eBPF support; Falcon Fusion SOAR for automated response; single Threat Graph for cross-domain correlation. (official, crowdstrike.com/cloud-security)

---

### Persona 3: The Government Security Program Manager

**Role**: IT Security Program Manager, federal civilian agency, ~12,000 endpoints

**Pain Points**:
- FedRAMP authorization requirement eliminates most commercial security vendors
- Mandate to replace legacy endpoint security products following DHS advisories
- Zero Trust architecture mandate from OMB M-22-09 requires identity and endpoint integration

**Gain Goals**:
- FedRAMP High authorized platform satisfying FISMA compliance reporting
- Named adversary intelligence specific to nation-state actors targeting federal networks
- CDM (Continuous Diagnostics and Mitigation) program integration

**Trigger Events**:
- Agency included in a Cyber Incident Coordination Policy notification
- Inspector General cybersecurity audit finding with remediation deadline
- New fiscal year budget cycle opening platform modernization procurement

**CrowdStrike Solution Fit**: CrowdStrike Falcon for Government (FedRAMP High authorized); Counter Adversary Operations for nation-state intelligence; Falcon Discover for CDM asset inventory. (official, crowdstrike.com/government)

---

## AARRR Purchase Journey

| Stage | Touchpoint | CrowdStrike Mechanism |
|-------|-----------|----------------------|
| **Awareness** | Industry breach event generates media coverage; CrowdStrike IR team named in reporting | Named in Reuters, WSJ, Bloomberg as IR firm; Threat Report covered in trade media (T3_SECONDARY_RELIABLE) |
| **Acquisition** | CISO reads Global Threat Report; downloads adversary profile for sector-specific threat actor | Gated content on crowdstrike.com; intelligence briefings at Fal.Con |
| **Activation** | 15-day free trial of Falcon tier; Proof of Concept with partner | Free trial on crowdstrike.com; partner-led PoC engagements (official) |
| **Retention** | Module expansion: average customer added 2.4 modules in FY2024; Falcon Complete MDR upsell | SEC 10-K FY2024 |
| **Revenue** | ARR model; $3.44B ARR as of Q4 FY2024; net revenue retention above 120% | SEC 10-K FY2024 |
| **Referral** | Customer case studies; CISO peer network; Gartner Magic Quadrant Leader designation | Gartner MQ Endpoint Protection Platforms 2023 (T3_SECONDARY_RELIABLE); official customer stories |

---

## Anti-Persona — Who CrowdStrike Is NOT For

| Profile | Reason for Exclusion |
|---------|---------------------|
| **SMB under 100 employees, sub-$50K security budget** | Per-endpoint cost at small scale is higher than alternatives. (T4_INFERRED from observed pricing tiers) |
| **Pure Linux environments with kernel module restrictions** | Organizations with objections to closed-source agents may find the Falcon sensor architecture conflicts with security posture. (T4_INFERRED) |
| **On-premise-only deployment requirement** | Falcon is cloud-native and cloud-delivered. Organizations prohibiting cloud telemetry transmission cannot deploy the standard platform. (official, architecture documentation) |
| **Lowest-TCO buyers** | Microsoft Defender for Endpoint at M365 E5 bundle pricing offers lower per-endpoint cost. Organizations optimizing for cost over intelligence depth may find better unit economics elsewhere. (T4_INFERRED) |

---

## Steal Sheet — 3 Transferable Principles

**1. Segment by security maturity, not just company size.**
A 300-person fintech with a CISO and dedicated SOC is a better CrowdStrike prospect than a 5,000-person manufacturer with no security team. Transferable structure: add a maturity dimension to ICP definitions for any B2B product with sophisticated buyer requirements.

**2. Make the anti-persona explicit.**
Explicitly documenting who the product is NOT for preserves go-to-market efficiency. Shared with SDRs, anti-personas reduce bad-fit pipeline volume by focusing qualification on disqualifying signals.

**3. Use trigger events, not demographics, as the primary targeting signal.**
A CISO becomes high-intent not when they reach a revenue threshold, but when their sector experiences a breach, their board demands a risk report, or their incumbent vendor's contract expires. Build trigger-event monitoring into outbound motions — industry breach disclosures, 10-K risk factor updates, and leadership changes are stronger intent signals than firmographic data alone.
