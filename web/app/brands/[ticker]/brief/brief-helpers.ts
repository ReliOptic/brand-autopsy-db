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

export function voiceDescriptors(arr: number[]): string[] {
  const [fc, ap, er, rb] = arr;
  return [
    fc <= 5 ? "Formal" : "Conversational",
    ap <= 5 ? "Authoritative" : "Peer",
    er <= 5 ? "Emotive" : "Rational",
    rb <= 5 ? "Restrained" : "Bold",
  ];
}

export interface SectionRow { label: string; value: string; }
export interface BriefSectionData {
  num: string;
  iconKey: "target" | "person" | "cube" | "grid" | "chart";
  title: string;
  rows: SectionRow[];
}

export function buildSections(
  brand: BrandDetail,
  brief: BriefData | null,
  colorList: ColorEntry[],
): BriefSectionData[] {
  const voiceArr = brief ? voiceArrayFrom(brief) : [5, 5, 5, 5];
  const tones = voiceDescriptors(voiceArr);
  const palette = colorList.slice(0, 4).map((c) => `${c.role}: ${c.hex}`).join(" · ");

  return [
    {
      num: "01", iconKey: "target", title: "Brand Core",
      rows: [{
        label: "One-liner",
        value: brief?.positioning_statement?.slice(0, 160)
          || brand.tagline || brand.slogan
          || `${brand.archetype_primary} brand in ${brand.sector}.`,
      }],
    },
    {
      num: "02", iconKey: "person", title: "User / Context",
      rows: [
        brief?.audience_segments?.length
          ? { label: "Core Users", value: brief.audience_segments.slice(0, 4).join(" · ") }
          : { label: "Sector", value: `${brand.sector} · ${brand.industry}` },
        ...(brief?.primary_persona
          ? [{ label: "Context", value: brief.primary_persona.slice(0, 140) }]
          : []),
      ],
    },
    {
      num: "03", iconKey: "cube", title: "Product Principles",
      rows: brief?.key_messages?.length
        ? [{ label: "Messages", value: brief.key_messages.slice(0, 3).join(" · ") }]
        : [{ label: "Archetype", value: [brand.archetype_primary, brand.archetype_secondary].filter(Boolean).join(" + ") }],
    },
    {
      num: "04", iconKey: "grid", title: "Visual Language",
      rows: [
        ...(palette ? [{ label: "Palette", value: palette }] : []),
        { label: "Tone", value: tones.join(" · ") },
      ],
    },
    {
      num: "05", iconKey: "chart", title: "Evidence & Signals",
      rows: [
        ...(brief?.financial_headline ? [{ label: "Revenue", value: brief.financial_headline }] : []),
        ...(brief?.top_channels?.length
          ? [{ label: "Channels", value: brief.top_channels.slice(0, 3).join(", ") }]
          : []),
        ...(brief ? [{ label: "Confidence", value: `${brief.data_confidence} · ${brief.layer_count}/8 layers` }] : []),
      ],
    },
  ];
}
