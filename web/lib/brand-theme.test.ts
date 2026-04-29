import { describe, it, expect } from "vitest";
import { deriveBrandTheme, DEFAULT_THEME } from "./brand-theme";

describe("deriveBrandTheme", () => {
  it("returns DEFAULT_THEME when given an empty array", () => {
    expect(deriveBrandTheme([])).toEqual(DEFAULT_THEME);
  });

  it("returns DEFAULT_THEME when all colors are near-black (luminance < 25%)", () => {
    // #1d1d1f, #161617, #333336 — all luminance < 30
    const result = deriveBrandTheme(["#1d1d1f", "#161617", "#333336"]);
    expect(result).toEqual(DEFAULT_THEME);
  });

  it("selects #0071e3 as accent from Apple palette", () => {
    const appleColors = ["#1d1d1f", "#0071e3", "#2997ff", "#6e6e73", "#86868b", "#e8e8ed"];
    const result = deriveBrandTheme(appleColors);
    expect(result.accent).toBe("#0071e3");
  });

  it("accentBright has higher luminance than accent", () => {
    const result = deriveBrandTheme(["#1d1d1f", "#0071e3", "#6e6e73"]);
    const getLuminance = (hex: string): number => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    expect(getLuminance(result.accentBright)).toBeGreaterThan(getLuminance(result.accent));
  });

  it("accentDim has lower luminance than accent", () => {
    const result = deriveBrandTheme(["#1d1d1f", "#0071e3", "#6e6e73"]);
    const getLum = (hex: string): number =>
      0.2126 * parseInt(hex.slice(1, 3), 16) +
      0.7152 * parseInt(hex.slice(3, 5), 16) +
      0.0722 * parseInt(hex.slice(5, 7), 16);
    expect(getLum(result.accentDim)).toBeLessThan(getLum(result.accent));
  });

  it("accent is not near-black (luminance > 30)", () => {
    const result = deriveBrandTheme(["#ff0000", "#00ff00", "#0000ff"]);
    const r = parseInt(result.accent.slice(1, 3), 16);
    const g = parseInt(result.accent.slice(3, 5), 16);
    const b = parseInt(result.accent.slice(5, 7), 16);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    expect(lum).toBeGreaterThan(30);
  });

  it("accent is not near-white (luminance < 220)", () => {
    const result = deriveBrandTheme(["#f4f8fb", "#fafafc", "#0071e3"]);
    const r = parseInt(result.accent.slice(1, 3), 16);
    const g = parseInt(result.accent.slice(3, 5), 16);
    const b = parseInt(result.accent.slice(5, 7), 16);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    expect(lum).toBeLessThan(220);
  });
});

describe("deriveBrandTheme — full theme tokens", () => {

  it("Apple 팔레트 → isLight: true", () => {
    const apple = ["#1d1d1f", "#0071e3", "#2997ff", "#6e6e73", "#86868b", "#e8e8ed"];
    const t = deriveBrandTheme(apple);
    expect(t.isLight).toBe(true);
  });

  it("Apple 팔레트 → bg가 near-white (#f5f5f7 계열)", () => {
    const apple = ["#1d1d1f", "#0071e3", "#2997ff", "#6e6e73", "#86868b", "#e8e8ed"];
    const t = deriveBrandTheme(apple);
    // bg는 밝아야 함 (luminance > 200)
    const r = parseInt(t.bg.slice(1,3), 16);
    const g = parseInt(t.bg.slice(3,5), 16);
    const b = parseInt(t.bg.slice(5,7), 16);
    expect(0.2126*r + 0.7152*g + 0.0722*b).toBeGreaterThan(200);
  });

  it("Apple 팔레트 → text가 near-black", () => {
    const apple = ["#1d1d1f", "#0071e3", "#2997ff", "#6e6e73", "#86868b", "#e8e8ed"];
    const t = deriveBrandTheme(apple);
    const r = parseInt(t.text.slice(1,3), 16);
    const g = parseInt(t.text.slice(3,5), 16);
    const b = parseInt(t.text.slice(5,7), 16);
    expect(0.2126*r + 0.7152*g + 0.0722*b).toBeLessThan(50);
  });

  it("다크 크로매틱 팔레트 → isLight: false", () => {
    // Netflix-style: 빨간색 + 검정 (near-white 없음)
    const netflix = ["#e50914", "#000000", "#141414", "#831010"];
    const t = deriveBrandTheme(netflix);
    expect(t.isLight).toBe(false);
  });

  it("다크 크로매틱 팔레트 → bg에 브랜드 틴트 포함 (순수 #07070B 아님)", () => {
    const netflix = ["#e50914", "#141414", "#831010"];
    const t = deriveBrandTheme(netflix);
    expect(t.bg).not.toBe("#07070B");
    // bg는 여전히 어두워야 함 (luminance < 30)
    const r = parseInt(t.bg.slice(1,3), 16);
    const g = parseInt(t.bg.slice(3,5), 16);
    const b = parseInt(t.bg.slice(5,7), 16);
    expect(0.2126*r + 0.7152*g + 0.0722*b).toBeLessThan(30);
  });

  it("DEFAULT_THEME는 isLight: false이고 bg: #07070B", () => {
    expect(DEFAULT_THEME.isLight).toBe(false);
    expect(DEFAULT_THEME.bg).toBe("#07070B");
  });

  it("BrandTheme에 필수 필드 모두 존재", () => {
    const t = deriveBrandTheme(["#0071e3"]);
    const required = ["isLight","bg","surface","surfaceLift","text","textBright","textSecondary","textMuted","textDim","border","accent","accentBright","accentDim","accentAlpha15","accentAlpha50"];
    for (const key of required) {
      expect(t).toHaveProperty(key);
    }
  });
});

describe("deriveBrandTheme — radius", () => {
  it("Creator 아키타입 → radius 16 (부드러운 곡선)", () => {
    const t = deriveBrandTheme(["#0071e3", "#f5f5f7"], "Creator");
    expect(t.radius).toBe(16);
  });

  it("Hero 아키타입 → radius 6 (중간)", () => {
    const t = deriveBrandTheme(["#0071e3", "#f5f5f7"], "Hero");
    expect(t.radius).toBe(6);
  });

  it("Sage 아키타입 → radius 2 (직각)", () => {
    const t = deriveBrandTheme(["#0071e3", "#f5f5f7"], "Sage");
    expect(t.radius).toBe(2);
  });

  it("알 수 없는 아키타입 → radius 8 (기본값)", () => {
    const t = deriveBrandTheme(["#0071e3"], "Unknown");
    expect(t.radius).toBe(8);
  });

  it("아키타입 없으면 → radius 8 (기본값)", () => {
    const t = deriveBrandTheme(["#0071e3"]);
    expect(t.radius).toBe(8);
  });

  it("DEFAULT_THEME radius는 8", () => {
    expect(DEFAULT_THEME.radius).toBe(8);
  });
});
