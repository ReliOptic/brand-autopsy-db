import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { fetchBrand, fetchBrief } from "@/lib/api";
import type { BrandDetail, BriefData, ColorEntry } from "@/lib/api";
import { deriveBrandTheme, DEFAULT_THEME } from "@/lib/brand-theme";
import type { BrandTheme } from "@/lib/brand-theme";
import { T } from "@/components/ui-primitives";
import { CardOverlayButtons } from "./card-client";

interface PageProps {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const tickerUp = ticker.toUpperCase();
  try {
    const brand = await fetchBrand(tickerUp);
    return {
      title: `${brand.ticker} — Brand Portrait`,
      description: `Brand portrait card for ${brand.name} (${brand.ticker}).`,
    };
  } catch {
    return { title: tickerUp };
  }
}

function deriveEssenceQuote(brief: BriefData | null, brand: BrandDetail): string {
  if (brief?.positioning_statement) {
    const s = brief.positioning_statement.trim();
    return s.length > 80 ? s.slice(0, 80) + "…" : s;
  }
  return brand.tagline ?? brand.slogan ?? "";
}

function colorRoleLabel(idx: number): string {
  if (idx === 0) return "PRIMARY";
  if (idx === 1) return "SECONDARY";
  return `ACCENT ${idx - 1}`;
}

function voiceLabel(value: number): string {
  return value >= 7 ? "Strong" : value >= 4 ? "Moderate" : "Subtle";
}

function buildColorList(brand: BrandDetail, brief: BriefData | null): ColorEntry[] {
  if (brand.colors.length > 0) return brand.colors;
  return (brief?.colors ?? []).map((hex, i) => ({
    role: colorRoleLabel(i),
    name: "",
    hex,
    usage: "",
  }));
}

function meshBackground(theme: BrandTheme, colorPrimary: string): string {
  if (theme.isLight) {
    return [
      `radial-gradient(ellipse 70% 90% at 15% 50%, ${theme.accent}55 0%, transparent 65%)`,
      `radial-gradient(ellipse 50% 70% at 85% 20%, ${theme.accentBright}44 0%, transparent 60%)`,
      `radial-gradient(ellipse 30% 50% at 50% 90%, ${theme.accentDim}33 0%, transparent 55%)`,
      theme.bg,
    ].join(", ");
  }
  return [
    `radial-gradient(ellipse 70% 90% at 15% 50%, ${theme.accent}35 0%, transparent 65%)`,
    `radial-gradient(ellipse 50% 70% at 85% 20%, ${colorPrimary}cc 0%, transparent 55%)`,
    `radial-gradient(ellipse 30% 50% at 50% 90%, ${theme.accentDim}20 0%, transparent 55%)`,
    theme.bg,
  ].join(", ");
}

export default async function BrandCardPage({ params }: PageProps): Promise<JSX.Element> {
  const { ticker } = await params;
  const tickerUp = ticker.toUpperCase();

  let brand: BrandDetail;
  try {
    brand = await fetchBrand(tickerUp);
  } catch {
    notFound();
  }

  let brief: BriefData | null = null;
  try {
    brief = await fetchBrief(tickerUp);
  } catch {
    brief = null;
  }

  const colorList = buildColorList(brand, brief);
  const swatchHexes = colorList.map((c) => c.hex);
  const colorPrimary = swatchHexes[0] ?? brief?.color_primary ?? T.accent;

  const theme: BrandTheme =
    swatchHexes.length > 0
      ? deriveBrandTheme(swatchHexes, brand.archetype_primary)
      : DEFAULT_THEME;

  const heroText = theme.isLight ? theme.text : "rgba(255,255,255,0.97)";
  const heroSub = theme.isLight ? theme.textSecondary : "rgba(255,255,255,0.65)";
  const heroBg = theme.isLight ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.35)";

  const essenceQuote = deriveEssenceQuote(brief, brand);

  const formalScore = brief?.voice_matrix?.formal_casual ?? null;
  const boldScore = brief?.voice_matrix?.restrained_bold ?? null;
  const hasVoice = formalScore !== null && boldScore !== null;

  const swatchDisplay = colorList.slice(0, 6);

  const wrapStyle: CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: meshBackground(theme, colorPrimary),
    fontFamily: T.sans,
    padding: "40px 24px",
  };

  const cardStyle: CSSProperties = {
    width: "100%",
    maxWidth: 680,
    display: "flex",
    flexDirection: "column",
    gap: 28,
  };

  const tickerStyle: CSSProperties = {
    fontFamily: T.mono,
    fontSize: 14,
    fontWeight: 600,
    color: theme.accent,
    letterSpacing: "0.12em",
  };

  const nameStyle: CSSProperties = {
    fontSize: "clamp(56px, 8vw, 80px)",
    fontWeight: 800,
    color: heroText,
    letterSpacing: "-0.03em",
    lineHeight: 1,
    textShadow: theme.isLight ? "none" : "0 2px 24px rgba(0,0,0,0.45)",
    margin: 0,
  };

  const quoteStyle: CSSProperties = {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: 400,
    color: heroSub,
    lineHeight: 1.55,
    maxWidth: 560,
    margin: 0,
  };

  const chipStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 13px",
    borderRadius: theme.radius / 2,
    background: heroBg,
    border: `1px solid ${theme.isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.12)"}`,
    fontFamily: T.sans,
    fontSize: 11,
    fontWeight: 600,
    color: heroText,
    letterSpacing: "0.04em",
  };

  const creditStyle: CSSProperties = {
    fontFamily: T.mono,
    fontSize: 11,
    color: heroSub,
    letterSpacing: "0.08em",
    opacity: 0.55,
  };

  return (
    <div style={wrapStyle}>
      <CardOverlayButtons />

      <div style={cardStyle}>
        {/* Ticker */}
        <div style={tickerStyle}>{brand.ticker}</div>

        {/* Brand name */}
        <h1 style={nameStyle}>{brand.name}</h1>

        {/* Essence quote */}
        {essenceQuote && (
          <p style={quoteStyle}>"{essenceQuote}"</p>
        )}

        {/* Archetype chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {brand.archetype_primary && (
            <span style={chipStyle}>{brand.archetype_primary}</span>
          )}
          {brand.archetype_secondary && (
            <span style={chipStyle}>{brand.archetype_secondary}</span>
          )}
        </div>

        {/* Voice summary */}
        {hasVoice && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 120,
                height: 4,
                borderRadius: 2,
                background: theme.isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.12)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((formalScore ?? 5) / 10) * 100}%`,
                  background: theme.accent,
                  borderRadius: 2,
                }}
              />
            </div>
            <span
              style={{
                fontFamily: T.sans,
                fontSize: 12,
                color: heroSub,
                fontWeight: 500,
              }}
            >
              Voice: {voiceLabel(formalScore ?? 5)} Formal {formalScore} · {voiceLabel(boldScore ?? 5)} Bold {boldScore}
            </span>
          </div>
        )}

        {/* Color swatches */}
        {swatchDisplay.length > 0 && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {swatchDisplay.map((c, i) => (
              <div
                key={`${c.hex}-${i}`}
                title={`${c.hex.toUpperCase()} · ${c.role || colorRoleLabel(i)}`}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: c.hex,
                  border: `2px solid ${theme.isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)"}`,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        )}

        {/* Credit line */}
        <div style={creditStyle}>
          brandautopsy.com · {brand.sector}
        </div>
      </div>
    </div>
  );
}
