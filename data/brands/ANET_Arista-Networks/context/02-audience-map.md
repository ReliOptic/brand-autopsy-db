# 02 — Audience Map
## Arista Networks (ANET)

---

## 1. Audience Segmentation Overview

Arista's buyer landscape spans hyperscale cloud operators, large enterprise IT organizations, and financial services firms with extreme latency requirements. The buying motion is predominantly technical-led with executive sponsorship required for seven-figure deals.

---

## 2. Primary Audience Segments

| Segment | Description | Deal Size | Buying Cycle |
|---|---|---|---|
| Hyperscale / Cloud Operators | AWS, Microsoft, Meta, Google network engineering teams | $10M–$500M+ | 12–36 months; multi-year refresh cycles (estimated) |
| Large Enterprise IT | Fortune 1000 data center and campus network teams | $500K–$20M | 9–18 months (estimated) |
| Financial Services | HFT firms, exchanges, tier-1 banks requiring ultra-low latency | $1M–$50M | 6–24 months (estimated) |
| Service Providers / Telcos | Regional and national carriers deploying IP/optical infrastructure | $2M–$100M | 12–36 months (estimated) |
| Federal / Government | Defense and civilian agencies requiring DISA STIG-compliant networking | $500K–$30M | 18–48 months (estimated) |

---

## 3. Buyer Personas

### Persona 1 — Ravi Krishnamurthy
**Title:** Principal Network Architect  
**Company Type:** Hyperscale cloud operator (US West Coast)  
**Location:** Sunnyvale, California, USA  
**Ethnicity / Background:** South Asian-American; first-generation immigrant; BS Computer Engineering from IIT Bombay, MS from UC San Diego  
**Age:** 38  
**Gender:** Male  

**Day-to-Day Reality:**
Ravi owns the spine-leaf fabric design for a 50,000-server data center. He evaluates switching ASICs, writes internal RFCs, and mentors junior network engineers. He attends NANOG and reads IETF drafts before they publish. His Slack is full of BGP EVPN threads.

**Goals:**
- Achieve sub-500ns port-to-port latency for distributed AI training clusters
- Reduce OPEX by consolidating NOS management under a single API-driven platform
- Future-proof fabric for 800G and beyond

**Pain Points:**
- Vendor roadmap opacity around next-gen ASIC availability
- Inconsistent feature parity between software releases on different hardware SKUs
- Difficulty justifying switching costs internally when legacy infrastructure still "works"

**Information Sources:**
NANOG mailing list, IETF working group archives, arista.com/en/eos, internal benchmarking labs, peer recommendations at Interop/Cisco Live

**Buying Authority:** Technical veto power; final recommendation to VP Engineering (estimated)

**Arista Message That Resonates:** "EOS feature parity across all platforms. One codebase. Real streaming telemetry. No forked NOS."

---

### Persona 2 — Amara Osei-Bonsu
**Title:** Director of IT Infrastructure  
**Company Type:** Pan-African commercial bank headquartered in Accra, Ghana with operations across 12 countries  
**Location:** Accra, Ghana  
**Ethnicity / Background:** Ghanaian; MBA from University of Cape Town; CCNP-certified  
**Age:** 44  
**Gender:** Female  

**Day-to-Day Reality:**
Amara oversees network, compute, and storage for 3,200 employees across 12 country offices. She manages a small team of 6 network engineers, reports to the CTO, and must justify every major infrastructure spend to a board risk committee. Regulatory compliance (Bank of Ghana ICT directives) shapes every procurement decision.

**Goals:**
- Modernize branch connectivity to SD-WAN-capable edge while maintaining high availability
- Reduce mean time to resolution (MTTR) for network incidents across distributed offices
- Deploy zero-trust segmentation to meet central bank cybersecurity mandates

**Pain Points:**
- Limited local Arista partner support and professional services presence in West Africa
- Total cost of ownership concerns when USD-denominated equipment is imported
- Skills gap on her team for advanced EOS automation and Python scripting

**Information Sources:**
Gartner Magic Quadrant reports, regional technology summits (AfricaCom), peer CTO networks, Arista partner briefings, LinkedIn

**Buying Authority:** Decision-maker for sub-$2M; escalates above to CTO and board for larger investments (estimated)

**Arista Message That Resonates:** "CloudVision reduces the operational burden on lean teams — AI-driven anomaly detection catches issues before users notice."

---

### Persona 3 — Erik Lindqvist
**Title:** Senior Network Engineer  
**Company Type:** Nordic financial exchange and clearing house  
**Location:** Stockholm, Sweden  
**Ethnicity / Background:** Swedish; MSc in Computer Science from KTH Royal Institute of Technology  
**Age:** 31  
**Gender:** Male  

**Day-to-Day Reality:**
Erik maintains the ultra-low-latency trading fabric that processes millions of order transactions per second. Microseconds matter — a 1µs regression in switching latency directly impacts market maker profitability and client SLAs. He tests switch configurations in a lab environment before any production change and maintains a rigid change management calendar.

**Goals:**
- Maintain consistent cut-through switching latency below 300ns for order routing
- Implement hitless ISSU (In-Service Software Upgrade) to eliminate maintenance windows
- Integrate real-time flow telemetry with in-house risk monitoring dashboards via gRPC

**Pain Points:**
- Complex regulatory approval process for infrastructure changes under ESMA/MiFID II
- Limited flexibility to trial pre-GA EOS releases in regulated production environments
- Vendor support response times that don't match the exchange's 24/7/365 operational model

**Information Sources:**
IEEE 802.1 working groups, internal network performance benchmarking, Arista technical support portal, STAC Research benchmarks, direct engagement with Arista SEs

**Buying Authority:** Strong technical influencer; procurement authority rests with Head of Technology Infrastructure (estimated)

**Arista Message That Resonates:** "7130 Series: deterministic latency, hardware-timestamped telemetry, and ISSU — built for environments where downtime is not an option."

---

## 4. Negative Personas (who Arista does NOT target)

| Persona Type | Reason for Exclusion |
|---|---|
| SMB IT Generalist (< 100 employees) | Arista's price point and complexity exceed SMB requirements; Meraki/UniFi serve this market |
| Consumer / Prosumer Networker | No consumer product line; brand is entirely B2B |
| Managed Service Provider (low-margin, commodity) | Margin structure incompatible with Arista's price tier unless upselling to enterprise clients |

---

## 5. Buying Committee Map (Enterprise Deal)

| Role | Influence Level | Primary Concern | Arista Talking Point |
|---|---|---|---|
| Network Architect / Engineer | High (technical veto) | Feature completeness, EOS quality, API programmability | EOS single codebase, gRPC telemetry, open BGP EVPN |
| VP / Director of IT Infrastructure | High (budget owner) | TCO, vendor risk, operational complexity | CloudVision OPEX reduction, hitless upgrades |
| CISO | Medium (security gate) | Zero-trust, CVE posture, compliance | Arista MSS (Multi-domain Segmentation Service), DANZ |
| CFO / Procurement | Medium (cost control) | CapEx, payment terms, 3-year TCO | Reference customer ROI data, total cost vs. Cisco |
| CEO / CTO | Low (strategic sign-off on large deals) | Strategic vendor alignment, innovation roadmap | AI-driven networks, partnership with hyperscalers |

---

## 6. Audience Insight Summary

> Arista's core buyer is skeptical of marketing, highly technical, and already familiar with competitor architectures. The brand earns trust through engineering credibility — detailed technical documentation, transparent EOS release notes, and NANOG-level discourse — rather than through emotional campaigns. Reaching Ravi, Amara, and Erik requires peer-to-peer channels, not broadcast media. (estimated)
