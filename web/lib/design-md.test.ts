import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  type BrandDesignMd,
  calculateDesignReadinessScore,
  classifyVisualArchetype,
  deriveColorTemperature,
  gradeDesignReadiness,
} from "./design-md";
import {
  LEGAL_NOTICE_ADDENDUM_HIGH_RISK,
  LEGAL_NOTICE_BOILERPLATE,
  buildLegalNotice,
} from "./design-md-legal";
import { generateAgentPrompt } from "./agent-prompt";

const longPrompt = `${"Use Apple-like restraint: ".repeat(8)}Prefer spacious product-gallery layouts, crisp neutral surfaces, precise contrast, restrained typography, and implementation-ready component notes. Avoid logo mimicry, proprietary icon shapes, device-frame copying, or any protected trade dress.`;

const aaplDesignMd: BrandDesignMd = {
  ticker: "AAPL",
  brand_name: "Apple",
  version: "0.2.0",
  generated_at: "2026-05-09T00:00:00.000Z",
  source_confidence: "HIGH",
  storage_path: "data/brands/AAPL/design-md/design-md.json",
  is_product_design_md: true,
  awesome_design_md_reference: true,
  visual_theme: {
    summary: "Monochrome product gallery with precise editorial restraint.",
    atmosphere_keywords: ["minimal", "premium", "product-led"],
    density: "low",
    surface_model: "gallery",
    color_temperature: "monochrome",
  },
  color_palette: [
    { token: "black", hex: "#1D1D1F", role: "text", usage: "Primary text", confidence: "HIGH" },
    { token: "white", hex: "#F5F5F7", role: "surface", usage: "Page surface", confidence: "HIGH" },
    { token: "blue", hex: "#0071E3", role: "primary", usage: "Primary action", confidence: "HIGH" },
    { token: "sky", hex: "#2997FF", role: "accent", usage: "Interactive accent", confidence: "HIGH" },
    { token: "gray", hex: "#6E6E73", role: "secondary", usage: "Secondary copy", confidence: "HIGH" },
    { token: "line", hex: "#D2D2D7", role: "semantic", usage: "Keyline", confidence: "MEDIUM" },
  ],
  typography_rules: {
    heading: "SF Pro Display style: large, neutral, high-confidence product headlines.",
    body: "SF Pro Text style: plain-language body copy with generous leading.",
    mono: "SF Mono style only for technical labels and diagnostic snippets.",
    scale_notes: "Use a restrained modular scale where hero text is large, body copy is readable, and supporting labels remain quiet.",
    weight_notes: "Favor regular and semibold weights, reserving bold emphasis for product names or decisive calls to action.",
  },
  component_styling: {
    buttons: "Rounded pills with blue fill for primary actions and quiet text buttons for secondary paths.",
    cards: "Mostly invisible cards; use spacing, product imagery, and faint dividers instead of heavy containers.",
    navigation: "Slim top navigation with muted links, centered grouping, and minimal visual chrome.",
    inputs: "Simple rounded fields with subtle borders and clear focus state.",
    charts: "Sparse monochrome charts with a single blue highlight for the selected series.",
  },
  layout_principles: [
    "Lead with a single product or value proposition per viewport.",
    "Use large negative space around hero elements.",
    "Keep grids symmetrical and predictable.",
    "Let imagery carry hierarchy before decoration.",
    "Separate dense technical content into progressive disclosure panels.",
  ],
  depth_elevation: "Depth should be nearly flat, using soft shadows only for modal focus and product-layer separation.",
  dos: ["Use generous whitespace.", "Keep copy short.", "Prefer neutral surfaces."],
  donts: ["Do not imitate protected device UI.", "Do not use busy gradients.", "Do not crowd product imagery."],
  responsive_behavior: "Collapse galleries into a single-column product story with persistent primary actions.",
  agent_prompt_guide: longPrompt,
  market_visual_positioning: {
    quadrant_description: "Premium sparse product storytelling with high polish and low density.",
    closest_competitors: ["MSFT", "GOOGL"],
    visual_differentiators: { MSFT: "less modular and more product-gallery-led" },
    archetype_market_context: "Product Gallery differentiates through restraint, not feature density.",
  },
  legal_notice: LEGAL_NOTICE_BOILERPLATE,
  visual_archetype: "Product Gallery",
  visual_archetype_confidence: "HIGH",
  design_readiness_score: 0,
  design_readiness_grade: "STUB",
  score_breakdown: {
    color_completeness: 0,
    typography_specificity: 0,
    component_completeness: 0,
    layout_specificity: 0,
    do_dont_clarity: 0,
    agent_prompt_usability: 0,
    source_confidence_score: 0,
  },
};

describe("calculateDesignReadinessScore", () => {
  it("calculates the expected AAPL foundation score and grade", () => {
    expect(calculateDesignReadinessScore(aaplDesignMd)).toEqual({
      design_readiness_score: 98,
      design_readiness_grade: "DESIGN_READY",
      score_breakdown: {
        color_completeness: 13,
        typography_specificity: 15,
        component_completeness: 20,
        layout_specificity: 15,
        do_dont_clarity: 10,
        agent_prompt_usability: 10,
        source_confidence_score: 10,
      },
    });
  });

  it("caps bonus-adjusted scores at 100", () => {
    const result = calculateDesignReadinessScore({
      ...aaplDesignMd,
      color_palette: [
        ...aaplDesignMd.color_palette,
        { token: "c1", hex: "#111111", role: "secondary", usage: "extra", confidence: "HIGH" },
        { token: "c2", hex: "#222222", role: "secondary", usage: "extra", confidence: "HIGH" },
        { token: "c3", hex: "#333333", role: "secondary", usage: "extra", confidence: "HIGH" },
        { token: "c4", hex: "#444444", role: "secondary", usage: "extra", confidence: "HIGH" },
        { token: "c5", hex: "#555555", role: "secondary", usage: "extra", confidence: "HIGH" },
        { token: "c6", hex: "#666666", role: "secondary", usage: "extra", confidence: "HIGH" },
        { token: "c7", hex: "#777777", role: "secondary", usage: "extra", confidence: "HIGH" },
      ],
    }).design_readiness_score;

    expect(result).toBe(100);
  });
});

describe("gradeDesignReadiness", () => {
  it("maps score thresholds to the confirmed grades", () => {
    expect(gradeDesignReadiness(85)).toBe("DESIGN_READY");
    expect(gradeDesignReadiness(65)).toBe("PARTIAL");
    expect(gradeDesignReadiness(40)).toBe("DRAFT");
    expect(gradeDesignReadiness(39)).toBe("STUB");
  });
});

describe("classifyVisualArchetype", () => {
  it("gives terminal surfaces top priority", () => {
    expect(
      classifyVisualArchetype({
        summary: "Dense warm terminal",
        atmosphere_keywords: [],
        density: "high",
        surface_model: "terminal",
        color_temperature: "warm",
      }),
    ).toBe("Terminal-native");
  });

  it("splits high-density cool themes by surface model", () => {
    expect(
      classifyVisualArchetype({
        summary: "Flat cool enterprise UI",
        atmosphere_keywords: [],
        density: "high",
        surface_model: "flat",
        color_temperature: "cool",
      }),
    ).toBe("Enterprise Carbon");

    expect(
      classifyVisualArchetype({
        summary: "Card cool dashboard UI",
        atmosphere_keywords: [],
        density: "high",
        surface_model: "card",
        color_temperature: "cool",
      }),
    ).toBe("Data-dense Dashboard");
  });

  it("classifies the AAPL sample as Product Gallery", () => {
    expect(classifyVisualArchetype(aaplDesignMd.visual_theme)).toBe("Product Gallery");
  });
});

describe("deriveColorTemperature", () => {
  it("derives HSL-based color temperature buckets", () => {
    expect(deriveColorTemperature("#0071E3")).toBe("cool");
    expect(deriveColorTemperature("#FF3B30")).toBe("warm");
    expect(deriveColorTemperature("#34C759")).toBe("neutral");
    expect(deriveColorTemperature("#6E6E73")).toBe("monochrome");
  });

  it("rejects invalid hex colors", () => {
    expect(() => deriveColorTemperature("not-a-color")).toThrow("Invalid hex color");
  });
});


describe("design-md fixtures", () => {
  const fixturePaths = [
    ["AAPL", "../data/brands/AAPL_Apple-Inc/design-md/design-md.json", "Product Gallery"],
    ["MSFT", "../data/brands/MSFT_Microsoft/design-md/design-md.json", "Enterprise Carbon"],
    ["MMM", "../data/brands/MMM_3M/design-md/design-md.json", "Industrial Trust"],
  ] as const;

  it.each(fixturePaths)("%s matches the scoring and archetype engine", (_ticker, fixturePath, expectedArchetype) => {
    const fixture = JSON.parse(readFileSync(join(process.cwd(), fixturePath), "utf8")) as BrandDesignMd;

    expect(fixture.market_visual_positioning).toBeDefined();
    expect(classifyVisualArchetype(fixture.visual_theme)).toBe(expectedArchetype);
    expect(fixture.design_readiness_score).toBeGreaterThanOrEqual(65);
    expect(calculateDesignReadinessScore(fixture)).toEqual({
      design_readiness_score: fixture.design_readiness_score,
      design_readiness_grade: fixture.design_readiness_grade,
      score_breakdown: fixture.score_breakdown,
    });
  });

  it("MSFT and MMM use different visual archetypes and competitor sets", () => {
    const msft = JSON.parse(
      readFileSync(join(process.cwd(), "../data/brands/MSFT_Microsoft/design-md/design-md.json"), "utf8"),
    ) as BrandDesignMd;
    const mmm = JSON.parse(
      readFileSync(join(process.cwd(), "../data/brands/MMM_3M/design-md/design-md.json"), "utf8"),
    ) as BrandDesignMd;

    expect(msft.visual_archetype).not.toBe(mmm.visual_archetype);
    expect(msft.market_visual_positioning?.closest_competitors).not.toEqual(
      mmm.market_visual_positioning?.closest_competitors,
    );
  });
});

describe("buildLegalNotice", () => {
  it("returns boilerplate only for non-high litigation risk", () => {
    expect(buildLegalNotice("MEDIUM")).toEqual({ legal_notice: LEGAL_NOTICE_BOILERPLATE });
    expect(buildLegalNotice("LOW")).toEqual({ legal_notice: LEGAL_NOTICE_BOILERPLATE });
  });

  it("adds the high-risk legal addendum only for HIGH litigation risk", () => {
    expect(buildLegalNotice("HIGH")).toEqual({
      legal_notice: LEGAL_NOTICE_BOILERPLATE,
      legal_notice_addendum: LEGAL_NOTICE_ADDENDUM_HIGH_RISK,
    });
  });
});

describe("generateAgentPrompt", () => {
  it("wraps DESIGN.md content with task framing and legal guardrails", () => {
    const markdown = "# Apple DESIGN.md\n\nUse neutral surfaces.";
    const prompt = generateAgentPrompt("landing", aaplDesignMd, markdown);

    expect(prompt).toContain("Build a landing page");
    expect(prompt).toContain("Apple (AAPL)");
    expect(prompt).toContain(aaplDesignMd.agent_prompt_guide);
    expect(prompt).toContain(markdown);
    expect(prompt).toContain("Do not copy logos, trademarks");
    expect(prompt).toContain("protected trade dress");
  });
});
