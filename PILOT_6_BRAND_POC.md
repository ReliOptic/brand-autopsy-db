# Pilot 6 Brand PoC

## Goal

Test whether the project can reliably produce `AAPL gold-reference-grade` outputs across
multiple sectors before attempting full overnight expansion.

This document is intentionally practical:

- pick 6 brands from 6 different sectors
- compare them against the current Apple benchmark
- identify what is broken right now
- estimate whether gold-reference quality is realistically reachable

---

## Benchmark Definition

For this PoC, `gold-reference-grade` means output that is close to the current Apple set in all
of the following dimensions:

1. English-only output
2. mandatory disclaimer present
3. explicit source discipline
4. coherent editorial voice across layers
5. non-generic brand-specific insight
6. legal defensibility under the current validator
7. usable Layer 7 and Layer 8 structure

The Apple reference is:

- `data/brands/AAPL_Apple-Inc/context/01-brand-identity.md`
- `data/brands/AAPL_Apple-Inc/context/03-competitive-landscape.md`
- `data/brands/AAPL_Apple-Inc/context/07-financial-anatomy.md`
- `data/brands/AAPL_Apple-Inc/context/08-legal-review.md`

---

## Selected Brands

The six pilot brands below are already present in the repository and cover different sectors:

| Sector | Ticker | Brand Folder |
|--------|--------|--------------|
| Communication Services | GOOGL | `GOOGL_Alphabet-Inc-Class-A` |
| Consumer Discretionary | ABNB | `ABNB_Airbnb` |
| Financials | AFL | `AFL_Aflac` |
| Health Care | ABT | `ABT_Abbott-Laboratories` |
| Industrials | MMM | `MMM_3M` |
| Utilities | AES | `AES_AES-Corporation` |

These six are a valid PoC set because they stress different failure modes:

- platform / AI narrative complexity
- consumer brand warmth and community language
- regulated financial messaging
- medical/regulatory claim sensitivity
- industrial B2B abstraction
- utility / transition narrative with lower cultural brand signal

---

## Current Assessment

### 1. GOOGL — Communication Services

Current state:

- still written in Korean in Layer 1 and Layer 3
- structurally informative but not close to Apple-grade editorial density
- strong market framing, weak legal-safe source discipline in the writing itself

Gap vs Apple:

- major language mismatch
- disclaimer absent in the Apple-style sense
- Voice Matrix is generic and over-scored rather than evidence-led
- competitive analysis is useful but reads like notes, not publication-grade research prose

Verdict:

- `reachable`
- requires full English rewrite, not minor editing

### 2. ABNB — Consumer Discretionary

Current state:

- Korean output
- brand intuition is decent
- emotional and community framing fits the category

Gap vs Apple:

- too template-like
- too little source-backed narrative density
- does not yet show the same “one controlling editorial mind” that Apple has

Verdict:

- `good candidate for first rewrite`
- likely one of the easiest non-AAPL brands to bring close to gold-reference quality

### 3. AFL — Financials

Current state:

- Korean output
- positioning is clear
- category mechanics are understood

Gap vs Apple:

- financial/insurance sector requires more disciplined legal-safe wording than the current text shows
- current copy is punchy, but not defensible enough for open publication
- would need careful separation of fact, interpretation, and comparative claims

Verdict:

- `reachable but medium risk`
- good test of whether the editorial system can stay strong in regulated sectors

### 4. ABT — Health Care

Current state:

- Korean output
- stronger than average data awareness
- category and product segmentation are clear

Gap vs Apple:

- this sector has almost no tolerance for sloppy efficacy language
- current structure is useful, but not yet at gold-reference legal precision
- would need tighter evidence tagging than current text

Verdict:

- `reachable but high editorial burden`
- must be in the pilot because this is where weak quality will be exposed first

### 5. MMM — Industrials

Current state:

- Korean output
- coherent category understanding
- brand logic is relatively straightforward

Gap vs Apple:

- too abstract and generic in places
- not enough sharp differentiating insight
- competitive sections still feel like broad notes rather than argument-driven analysis

Verdict:

- `reachable`
- useful test for B2B / diversified industrial language

### 6. AES — Utilities

Current state:

- Korean output
- category framing is directionally correct
- energy transition narrative is present

Gap vs Apple:

- lower natural brand signal means weak writers fall back into generic ESG prose
- current text risks sounding like sector summary rather than brand autopsy
- this is a strong test of whether the method can extract brand specificity from a lower-drama category

Verdict:

- `reachable but likely hardest to make vivid`
- important as a realism check for the broader archive

---

## Feasibility Judgment

Can the project produce Apple-grade results for these six brands?

Short answer:

- `yes for a PoC`
- `not by simple batch expansion`

The current repository already proves one important thing:

- Apple is not an accident
- the system can produce at least one high-grade result

But the six sampled sectors also show the limit of the current pipeline:

- existing non-AAPL outputs are mostly still Korean
- many are structurally useful but editorially thinner
- legal-safe evidence discipline is inconsistent outside the Apple set

So the realistic claim is:

- `AAPL-grade output is achievable for 6 pilot brands with controlled human-quality prompting and rewrite discipline`
- `AAPL-grade output is not yet proven at scale for unattended 500-brand overnight generation`

---

## Recommended PoC Order

If the goal is to demonstrate capability quickly and credibly, the best sequence is:

1. `ABNB` — easiest emotional consumer rewrite after AAPL
2. `MMM` — strong B2B/industrial contrast case
3. `AFL` — regulated financial messaging test
4. `GOOGL` — platform/AI complexity test
5. `ABT` — medical/legal precision test
6. `AES` — low-signal sector specificity test

This order balances:

- visible quality wins early
- increasing legal/editorial complexity later

---

## PoC Success Standard

The 6-brand pilot should be considered successful only if:

1. all six produce English Layer 1, 3, 7, and 8 outputs
2. all selected layers pass `legal_validator`
3. all six read materially closer to Apple than to the current Korean/template-like outputs
4. at least two regulated categories (`AFL`, `ABT`) hold up under manual review
5. one low-signal category (`AES`) still feels brand-specific rather than sector-generic

---

## Honest Conclusion

If the user asks whether the system can produce Apple-grade output outside Apple, the honest answer is:

`Yes, but only if we treat it as an editorial pilot, not as a blind batch job.`

This six-brand set is enough to prove or falsify that claim.
