export type VisualArchetype =
  | "Terminal-native"
  | "Enterprise Carbon"
  | "Product Gallery"
  | "Editorial Minimal"
  | "Data-dense Dashboard"
  | "Warm Consumer"
  | "Premium Fintech"
  | "Developer Tooling"
  | "Creative Color Block"
  | "Luxury Sparse"
  | "Healthcare Authority"
  | "Industrial Trust"
  | "Unclassified";

export type ColorTemperature = "cool" | "warm" | "neutral" | "monochrome";
export type SourceConfidence = "HIGH" | "MEDIUM" | "LOW";
export type DesignReadinessGrade = "DESIGN_READY" | "PARTIAL" | "DRAFT" | "STUB";

export interface VisualTheme {
  summary: string;
  atmosphere_keywords: string[];
  density: "low" | "medium" | "high";
  surface_model: "flat" | "card" | "editorial" | "terminal" | "gallery";
  color_temperature: ColorTemperature;
}

export interface ScoreBreakdown {
  color_completeness: number;
  typography_specificity: number;
  component_completeness: number;
  layout_specificity: number;
  do_dont_clarity: number;
  agent_prompt_usability: number;
  source_confidence_score: number;
}

export interface ScoreResult {
  design_readiness_score: number;
  design_readiness_grade: DesignReadinessGrade;
  score_breakdown: ScoreBreakdown;
}

export interface BrandDesignMd {
  ticker: string;
  brand_name: string;
  version: string;
  generated_at: string;
  source_confidence: SourceConfidence;
  storage_path: string;
  is_product_design_md: boolean;
  awesome_design_md_reference: boolean;
  visual_theme: VisualTheme;
  color_palette: Array<{
    token: string;
    hex: string;
    role: "primary" | "secondary" | "surface" | "text" | "semantic" | "accent";
    usage: string;
    confidence: SourceConfidence;
  }>;
  typography_rules: {
    heading: string;
    body: string;
    mono?: string;
    scale_notes: string;
    weight_notes: string;
  };
  component_styling: {
    buttons: string;
    cards: string;
    navigation: string;
    inputs?: string;
    charts?: string;
  };
  layout_principles: string[];
  depth_elevation: string;
  dos: string[];
  donts: string[];
  responsive_behavior: string;
  agent_prompt_guide: string;
  market_visual_positioning?: {
    quadrant_description: string;
    closest_competitors: string[];
    visual_differentiators: Record<string, string>;
    archetype_market_context: string;
  };
  legal_notice: string;
  legal_notice_addendum?: string;
  visual_archetype: VisualArchetype;
  visual_archetype_confidence: SourceConfidence;
  design_readiness_score: number;
  design_readiness_grade: DesignReadinessGrade;
  score_breakdown: ScoreBreakdown;
}

function hasText(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function countNonEmpty(values: string[]): number {
  return values.filter((value) => value.trim().length > 0).length;
}

function scoreColorCompleteness(data: BrandDesignMd): number {
  const colorCount = data.color_palette.length;
  let score = 0;

  if (colorCount >= 13) score = 18;
  else if (colorCount >= 8) score = 16;
  else if (colorCount >= 4) score = 11;
  else if (colorCount >= 1) score = 6;

  const roles = new Set(data.color_palette.map((color) => color.role));
  const hasCoreRoles = ["primary", "surface", "text", "accent"].every((role) => roles.has(role as BrandDesignMd["color_palette"][number]["role"]));

  return score + (hasCoreRoles ? 2 : 0);
}

function scoreTypographySpecificity(data: BrandDesignMd): number {
  const rules = data.typography_rules;
  return (
    (hasText(rules.heading) ? 4 : 0) +
    (hasText(rules.body) ? 3 : 0) +
    (hasText(rules.mono) ? 2 : 0) +
    (rules.scale_notes.trim().length > 30 ? 3 : 0) +
    (rules.weight_notes.trim().length > 30 ? 3 : 0)
  );
}

function scoreComponentCompleteness(data: BrandDesignMd): number {
  const components = data.component_styling;
  return (
    (hasText(components.buttons) ? 6 : 0) +
    (hasText(components.cards) ? 6 : 0) +
    (hasText(components.navigation) ? 5 : 0) +
    (hasText(components.inputs) ? 2 : 0) +
    (hasText(components.charts) ? 1 : 0)
  );
}

function scoreLayoutSpecificity(data: BrandDesignMd): number {
  const layoutCount = countNonEmpty(data.layout_principles);
  let score = 0;

  if (layoutCount >= 5) score = 13;
  else if (layoutCount >= 3) score = 10;
  else if (layoutCount >= 1) score = 5;

  return score + (data.depth_elevation.trim().length > 20 ? 2 : 0);
}

function scoreAgentPromptUsability(data: BrandDesignMd): number {
  const length = data.agent_prompt_guide.trim().length;
  let score = 0;

  if (length >= 300) score = 8;
  else if (length > 150) score = 6;
  else if (length >= 50) score = 3;

  return score + (data.visual_archetype !== "Unclassified" ? 2 : 0);
}

function scoreSourceConfidence(sourceConfidence: SourceConfidence): number {
  if (sourceConfidence === "HIGH") return 10;
  if (sourceConfidence === "MEDIUM") return 6;
  return 3;
}

export function gradeDesignReadiness(score: number): DesignReadinessGrade {
  if (score >= 85) return "DESIGN_READY";
  if (score >= 65) return "PARTIAL";
  if (score >= 40) return "DRAFT";
  return "STUB";
}

export function calculateDesignReadinessScore(data: BrandDesignMd): ScoreResult {
  const score_breakdown: ScoreBreakdown = {
    color_completeness: scoreColorCompleteness(data),
    typography_specificity: scoreTypographySpecificity(data),
    component_completeness: scoreComponentCompleteness(data),
    layout_specificity: scoreLayoutSpecificity(data),
    do_dont_clarity: (countNonEmpty(data.dos) >= 3 ? 5 : 0) + (countNonEmpty(data.donts) >= 3 ? 5 : 0),
    agent_prompt_usability: scoreAgentPromptUsability(data),
    source_confidence_score: scoreSourceConfidence(data.source_confidence),
  };

  const baseScore = Object.values(score_breakdown).reduce((sum, value) => sum + value, 0);
  const bonus = (data.awesome_design_md_reference ? 3 : 0) + (data.market_visual_positioning ? 2 : 0);
  const design_readiness_score = Math.min(100, baseScore + bonus);

  return {
    design_readiness_score,
    design_readiness_grade: gradeDesignReadiness(design_readiness_score),
    score_breakdown,
  };
}

export function classifyVisualArchetype(theme: VisualTheme): VisualArchetype {
  const { density, surface_model, color_temperature } = theme;

  if (surface_model === "terminal") return "Terminal-native";

  if (density === "high" && surface_model === "flat" && color_temperature === "cool") {
    return "Enterprise Carbon";
  }

  if (density === "low" && surface_model === "gallery" && color_temperature === "monochrome") {
    return "Product Gallery";
  }

  if (density === "low" && surface_model === "editorial" && (color_temperature === "neutral" || color_temperature === "warm")) {
    return "Editorial Minimal";
  }

  if (density === "high" && surface_model === "card" && (color_temperature === "cool" || color_temperature === "neutral")) {
    return "Data-dense Dashboard";
  }

  if ((density === "medium" || density === "low") && surface_model === "card" && color_temperature === "warm") {
    return "Warm Consumer";
  }

  if (density === "medium" && surface_model === "flat" && color_temperature === "cool") {
    return "Premium Fintech";
  }

  if ((density === "low" || density === "medium") && surface_model === "card" && color_temperature === "warm") {
    return "Creative Color Block";
  }

  if (density === "low" && (surface_model === "flat" || surface_model === "gallery") && color_temperature === "monochrome") {
    return "Luxury Sparse";
  }

  if (density === "medium" && surface_model === "flat" && color_temperature === "neutral") {
    return "Healthcare Authority";
  }

  if (density === "high" && surface_model === "flat" && color_temperature === "neutral") {
    return "Industrial Trust";
  }

  return "Unclassified";
}

export function deriveColorTemperature(hex: string): ColorTemperature {
  const [red, green, blue] = hexToRgb(hex);
  const [hue, saturation] = rgbToHsl(red, green, blue);

  if (saturation < 15) return "monochrome";
  if (hue >= 180 && hue <= 270) return "cool";
  if ((hue >= 0 && hue <= 60) || (hue >= 300 && hue <= 360)) return "warm";
  return "neutral";
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}

function rgbToHsl(red: number, green: number, blue: number): [number, number, number] {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;

  if (max === min) {
    return [0, 0, lightness * 100];
  }

  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;

  if (max === r) hue = (g - b) / delta + (g < b ? 6 : 0);
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  return [hue * 60, saturation * 100, lightness * 100];
}
