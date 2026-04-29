export interface BrandTheme {
  isLight: boolean;
  bg: string;
  surface: string;
  surfaceLift: string;
  text: string;
  textBright: string;
  textSecondary: string;
  textMuted: string;
  textDim: string;
  border: string;
  accent: string;
  accentBright: string;
  accentDim: string;
  accentAlpha15: string;
  accentAlpha50: string;
  radius: number;
}

export const DEFAULT_THEME: BrandTheme = {
  isLight: false,
  bg: "#07070B",
  surface: "#0F0F17",
  surfaceLift: "#13131D",
  text: "#E2E8F0",
  textBright: "#F4F4F8",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  textDim: "#3F3F55",
  border: "#1E1E2E",
  accent: "#6366F1",
  accentBright: "#818CF8",
  accentDim: "#4F46E5",
  accentAlpha15: "#6366F126",
  accentAlpha50: "#6366F180",
  radius: 8,
};

const ARCHETYPE_RADIUS: Record<string, number> = {
  Creator: 16,
  Caregiver: 16,
  Innocent: 14,
  Lover: 14,
  Jester: 12,
  Explorer: 10,
  Outlaw: 8,
  Hero: 6,
  Magician: 8,
  Everyman: 10,
  Ruler: 2,
  Sage: 2,
};

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function getLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) {
    return [0, 0, l];
  }
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) {
    h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  } else if (max === gn) {
    h = ((bn - rn) / d + 2) / 6;
  } else {
    h = ((rn - gn) / d + 4) / 6;
  }
  return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  const hue2rgb = (p: number, q: number, t: number): number => {
    const tn = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
    if (tn < 1 / 6) return p + (q - p) * 6 * tn;
    if (tn < 1 / 2) return q;
    if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function getSaturation(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  const [, s] = rgbToHsl(r, g, b);
  return s;
}

function adjustLightness(hex: string, deltaPct: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const newL = Math.min(1, Math.max(0, l + deltaPct / 100));
  return hslToHex(h, s, newL);
}

function blendHex(base: string, tint: string, amount: number): string {
  const [br, bg, bb] = hexToRgb(base);
  const [tr, tg, tb] = hexToRgb(tint);
  const r = Math.round(br + (tr - br) * amount);
  const g = Math.round(bg + (tg - bg) * amount);
  const b = Math.round(bb + (tb - bb) * amount);
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function isLightModeBrand(colors: string[]): boolean {
  const hasNearBlack = colors.some((c) => getLuminance(c) < 30);
  const hasNearWhite = colors.some((c) => getLuminance(c) > 200);
  return hasNearBlack && hasNearWhite;
}

function findAccent(colors: string[]): string | null {
  // Primary pass: standard luminance band (excludes near-black and near-white)
  const primary = colors.filter((hex) => {
    const lum = getLuminance(hex);
    return lum > 60 && lum < 220;
  });
  if (primary.length > 0) {
    return [...primary].sort((a, b) => getSaturation(b) - getSaturation(a))[0];
  }
  // Fallback pass: allow darker colors only if they are clearly chromatic (sat > 0.3)
  const fallback = colors.filter((hex) => {
    const lum = getLuminance(hex);
    return lum > 30 && lum < 220 && getSaturation(hex) > 0.3;
  });
  if (fallback.length === 0) return null;
  return [...fallback].sort((a, b) => getSaturation(b) - getSaturation(a))[0];
}

export function deriveBrandTheme(colors: string[], archetype?: string): BrandTheme {
  if (!colors.length) return DEFAULT_THEME;

  const accentColor = findAccent(colors);
  if (accentColor === null) return DEFAULT_THEME;

  const accent = accentColor;
  const accentBright = adjustLightness(accent, 20);
  const accentDim = adjustLightness(accent, -15);
  const accentAlpha15 = `${accent}26`;
  const accentAlpha50 = `${accent}80`;
  const radius = archetype ? (ARCHETYPE_RADIUS[archetype] ?? 8) : 8;

  if (isLightModeBrand(colors)) {
    return {
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
      accent,
      accentBright,
      accentDim,
      accentAlpha15,
      accentAlpha50,
      radius,
    };
  }

  return {
    isLight: false,
    bg: blendHex("#07070B", accent, 0.04),
    surface: blendHex("#0F0F17", accent, 0.04),
    surfaceLift: "#13131D",
    text: "#E2E8F0",
    textBright: "#F4F4F8",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    textDim: "#3F3F55",
    border: "#1E1E2E",
    accent,
    accentBright,
    accentDim,
    accentAlpha15,
    accentAlpha50,
    radius,
  };
}
