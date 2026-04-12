# 06. Channel Playbook — Abbott Laboratories (ABT)

> **Disclaimer**: This analysis is based on publicly available information including SEC filings, official company communications, and observed brand materials. It does not constitute investment, legal, or strategic advice. All interpretations are labeled as such. Estimates are explicitly marked `(estimated)`.

---

## Channel Matrix

| Channel | Primary Audience | Content Type | Regulatory Constraint |
|---------|----------------|--------------|----------------------|
| **abbott.com** | All stakeholders | Corporate, product, investor, career | FDA/SEC disclosure rules |
| **freestylelibre.com** | Patients, HCPs | CGM product, clinical data, access | FDA device promotional rules |
| **LinkedIn** | Investors, HCPs, talent | Pipeline, innovation, ESG, corporate milestones | Limited product promotion |
| **X (Twitter)** | Media, investors | News, approvals, ESG milestones | Conservative promotional use |
| **YouTube** | Patients, HCPs | Device tutorials, patient stories, clinical education | FDA promotional rules apply |
| **Medical Congresses** (ADA, AHA, AACC) | HCPs, KOLs | Clinical data, device demonstrations | Full FDA compliance |
| **Field Sales / Clinical Specialists** | HCPs, laboratory directors | Device detailing, clinical data | PhRMA/AdvaMed Code; FDA promotional rules |
| **DTC Advertising** (TV, digital) | Patients, caregivers | FreeStyle Libre, Similac, Ensure branded ads | FDA fair balance (device), FTC (food/nutrition) |
| **Investor Relations** | Institutional investors | Earnings, pipeline, strategic guidance | SEC Regulation FD |
| **Scientific Publications** | HCPs, researchers | Clinical trial results, real-world evidence | Journal editorial standards |

---

## Tone Variations by Channel

| Channel | Tone | Example |
|---------|------|---------|
| **Corporate (abbott.com)** | Institutional, purposeful | "Together, we accelerate life through breakthrough science and innovation." |
| **FreeStyle Libre DTC** | Empowering, free, lifestyle-positive | "Freedom from finger sticks. Real-time glucose readings. FreeStyle Libre 3." |
| **LinkedIn** | Professional, innovation-forward | "Our diagnostics platform helped identify over 400 million COVID-19 infections. Science at work." |
| **Medical congress** | Clinical precision | "In the REFLECT-1 trial, FreeStyle Libre demonstrated mean absolute relative difference of X% vs. reference." |
| **Investor Relations** | Financial precision | "FreeStyle Libre global revenue grew X% year-over-year to $X.XB in FY2023." |
| **YouTube — patient** | Warm, accessible, real | "Here's what it's like to wear FreeStyle Libre for the first time." |
| **Nutrition (Similac)** | Caring, science-backed, parental | "Nourishing from the start. Science you can trust." |

---

## Cross-Channel Synergy Routes

**Route 1: FDA Clearance → Commercial Launch**

```
FDA 510(k) Clearance Received (e.g., FreeStyle Libre 3)
        |
        +---> Press release (abbott.com/newsroom)
        |           |
        |           +---> Investor alert (Form 8-K)
        |           +---> Media briefing (embargoed advance)
        |
        +---> HCP channel: Updated clinical materials, field force briefing
        |
        +---> Patient website update: Product page, access info, sensor ordering
        |
        +---> DTC advertising: TV spot air date, digital campaign launch
        |
        +---> LinkedIn: Innovation milestone post with patient outcome framing
        |
        +---> YouTube: "How it works" video for new device generation
```

**Route 2: Clinical Study Publication → Commercial Pull-Through**

```
Phase III / Real-World Study Published (peer-reviewed journal)
        |
        +---> Congress presentation (ADA, AHA, AACC)
        |
        +---> Press release: "Study shows X outcome improvement"
        |
        +---> Field force: Updated detail materials incorporating data
        |
        +---> Website: Clinical evidence page updated with citation
        |
        +---> LinkedIn: "New evidence for FreeStyle Libre in Type 2 diabetes"
        |
        +---> Payer submissions: Evidence dossier updated for formulary negotiations
```

**Route 3: Global Health Impact → ESG Reporting → Investor Narrative**

```
100M HIV tests deployed in sub-Saharan Africa (cumulative milestone)
        |
        +---> ESG Report: Featured impact story with country-level data
        |
        +---> Press release: Impact milestone announcement
        |
        +---> LinkedIn: Global health milestone content
        |
        +---> Investor presentation: "Social value creation" section
        |
        +---> Policy engagement: Brief to health ministries and NGO partners
```

---

## Channel Prohibitions

1. **No off-label device or diagnostic promotion** across any channel — FDA clearance scope limits what can be promoted. (T1_OFFICIAL, FDA promotional regulations)
2. **No absolute diagnostic accuracy claims** in promotional channels — sensitivity, specificity, and interference profiles must be documented. (T4_INFERRED from FDA IVD promotional guidance)
3. **No material non-public information** disclosed to select investors without simultaneous broad disclosure — SEC Regulation FD. (T1_OFFICIAL, SEC Regulation FD)
4. **No nutrition health claims** without FDA-compliant structure/function or health claim authorization. (T1_OFFICIAL, FDA 21 CFR Part 101)
5. **No social media responses to specific patient medical questions** that could constitute medical device or medical advice. (T4_INFERRED from FDA social media guidance)

---

## Crisis Protocol

**Scenario 1 — Medical Device Safety Signal or Recall**
1. Notify FDA within required timeframes (MDR reporting within 30 days for serious injuries, 5 days for deaths). (T1_OFFICIAL, FDA MDR requirements 21 CFR Part 803)
2. Activate field force communications: representatives notify HCP customers of affected lot numbers.
3. Patient communication: direct outreach where device registration enables contact; clear instructions for device return or continued safe use.
4. External communications: factual, patient-safety-first, no minimization. Provide recall hotline.
5. Manufacturing remediation: FDA cooperates; facility inspection results disclosed as required.
*(Reference: Abbott's 2022 Similac/Sturgis facility response as a documented case study in public record)*

**Scenario 2 — Infant Formula Quality/Safety Issue**
1. FDA notification and cooperation with recall procedures. (T1_OFFICIAL, FDA infant formula recall authority)
2. Retail partner notification for product removal.
3. Consumer-facing communication: factual lot numbers, clear return/disposal instructions, parent helpline.
4. Pediatrician and hospital communication: guidance on transitional feeding options.
5. No promotional content in proximity to safety communications.
*(T4_INFERRED from Abbott's documented Similac recall response, 2022)*

**Scenario 3 — Data Breach Affecting Patient CGM Data**
1. Notify affected users within GDPR (72 hours) and applicable U.S. state law timeframes.
2. FDA notification if breach affects device function or patient safety.
3. External communication: factual, specific to what data was affected, remediation steps taken.
4. Provide affected users with credit monitoring or identity protection support.
5. Legal and regulatory counsel engaged immediately.
*(T4_INFERRED from GDPR/HIPAA breach response requirements)*

---

## Steal Sheet — 3 Transferable Principles

**1. The connected device creates a channel that the company owns.**
FreeStyle Libre's LibreView platform and the FreeStyle Libre app give Abbott a direct, consent-based communication channel to millions of diabetes patients — a channel that bypasses the physician gatekeeper for adherence support and product upgrade communications. The device creates the relationship; the app sustains it. Transferable for any IoT or connected device business: the companion app is not a feature — it is a CRM system that the product earns permission to operate.

**2. Scientific publication as the highest-trust marketing channel.**
A peer-reviewed publication in the New England Journal of Medicine or Diabetes Care is, for a physician audience, more influential than any advertising. Abbott's investment in clinical studies is simultaneously R&D and marketing — the data generated serves regulatory approval, physician adoption, and payer formulary inclusion. Transferable for B2B products where buyers have technical sophistication: invest in generating third-party-validated evidence (academic studies, independent audits, analyst reports) and treat these as your primary marketing assets.

**3. Segment the portfolio visually so customers can find their lane.**
Abbott's website architecture and sub-brand design system (FreeStyle Libre teal vs. Alinity diagnostics blue vs. Similac warm palette) allows each audience to navigate to their relevant content without being confused by the portfolio's breadth. Each sub-brand has design autonomy within the Abbott master identity. Transferable for any multi-product company: invest in sub-brand design differentiation that allows different customer types to self-select their experience without explicit segmentation prompts.
