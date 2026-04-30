import { deriveBrandTheme, DEFAULT_THEME } from "@/lib/brand-theme";
import type { BrandTheme } from "@/lib/brand-theme";
import type { BrandDetail, BriefData, ColorEntry } from "@/lib/api";

export const PRINT_LIGHT: BrandTheme = {
  ...DEFAULT_THEME,
  isLight: true,
  bg: "#f5f5f7",
  surface: "#ffffff",
  surfaceLift: "#fafafa",
  text: "#1d1d1f",
  textBright: "#000000",
  textSecondary: "#6e6e73",
  textMuted: "#86868b",
  textDim: "#c7c7cc",
  border: "#d2d2d7",
};

export function buildTheme(colors: string[], archetype: string): BrandTheme {
  if (colors.length === 0) return PRINT_LIGHT;
  const derived = deriveBrandTheme(colors, archetype);
  return {
    ...PRINT_LIGHT,
    accent: derived.accent,
    accentBright: derived.accentBright,
    accentDim: derived.accentDim,
    accentAlpha15: derived.accentAlpha15,
    accentAlpha50: derived.accentAlpha50,
    radius: derived.radius,
  };
}

export function colorRoleLabel(idx: number): string {
  if (idx === 0) return "PRIMARY";
  if (idx === 1) return "SECONDARY";
  return `ACCENT ${idx - 1}`;
}

export function voiceArrayFrom(brief: BriefData): number[] {
  const m = brief.voice_matrix;
  if (!m) return [5, 5, 5, 5];
  return [
    m.formal_casual ?? 5,
    m.authority_peer ?? 5,
    m.emotional_rational ?? 5,
    m.restrained_bold ?? 5,
  ];
}

export function resolveColors(brand: BrandDetail, brief: BriefData | null): ColorEntry[] {
  if (brand.colors.length > 0) return brand.colors;
  if (brief && brief.colors.length > 0) {
    return brief.colors.map((hex, i) => ({
      role: colorRoleLabel(i),
      name: "",
      hex,
      usage: "",
    }));
  }
  return [];
}
