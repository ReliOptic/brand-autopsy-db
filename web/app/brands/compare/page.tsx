import { redirect } from "next/navigation";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { fetchBrand, fetchBrief } from "@/lib/api";
import type { BrandDetail, BriefData } from "@/lib/api";
import { deriveBrandTheme, DEFAULT_THEME } from "@/lib/brand-theme";
import type { BrandTheme } from "@/lib/brand-theme";
import { SectionLabel, T, Ticker } from "@/components/ui-primitives";
import { DualVoiceRadar } from "@/components/dual-voice-radar";
import { CompareClient } from "./compare-client";

interface PageProps {
  searchParams: Promise<{ a?: string; b?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const a = (sp.a ?? "").toUpperCase();
  const b = (sp.b ?? "").toUpperCase();
  return {
    title: `${a} vs ${b} — Brand Comparison`,
    description: `Side-by-side brand strategy comparison: ${a} vs ${b}. Voice, color, archetype, positioning, and financials.`,
  };
}

function voiceArray(brief: BriefData | null): number[] {
  if (!brief?.voice_matrix) return [5, 5, 5, 5];
  const m = brief.voice_matrix;
  return [
    m.formal_casual ?? 5,
    m.authority_peer ?? 5,
    m.emotional_rational ?? 5,
    m.restrained_bold ?? 5,
  ];
}

function resolveTheme(brand: BrandDetail, brief: BriefData | null): BrandTheme {
  const hexes = brand.colors.length
    ? brand.colors.map((c) => c.hex)
    : (brief?.colors ?? []);
  return hexes.length ? deriveBrandTheme(hexes, brand.archetype_primary) : DEFAULT_THEME;
}

function cardStyle(theme: BrandTheme): CSSProperties {
  return {
    background: theme.surface,
    borderRadius: theme.radius,
    padding: 16,
    boxShadow: theme.isLight
      ? "0 2px 8px rgba(0,0,0,0.10)"
      : "0 2px 8px rgba(0,0,0,0.40)",
  };
}

function deriveBg(themeA: BrandTheme, themeB: BrandTheme): string {
  return themeA.isLight || themeB.isLight ? "#f5f5f7" : "#07070B";
}

const ArrowLeft = (): JSX.Element => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

interface MetricRowProps {
  label: string;
  valueA: string;
  valueB: string;
  colorA: string;
  colorB: string;
  textColor: string;
  mutedColor: string;
}

function MetricRow({ label, valueA, valueB, colorA, colorB, textColor, mutedColor }: MetricRowProps): JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontFamily: T.sans, fontSize: 10, color: mutedColor, width: 80, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ fontFamily: T.mono, fontSize: 12, fontWeight: 600, color: colorA, flex: 1, textAlign: "right" }}>
        {valueA}
      </span>
      <span style={{ color: mutedColor, fontFamily: T.mono, fontSize: 10, padding: "0 4px" }}>|</span>
      <span style={{ fontFamily: T.mono, fontSize: 12, fontWeight: 600, color: colorB, flex: 1 }}>
        {valueB}
      </span>
    </div>
  );
}

export default async function BrandsComparePage({ searchParams }: PageProps): Promise<JSX.Element> {
  const sp = await searchParams;
  const tickerA = (sp.a ?? "").trim().toUpperCase();
  const tickerB = (sp.b ?? "").trim().toUpperCase();

  if (!tickerA || !tickerB) {
    redirect("/dashboard");
  }

  const [brandAResult, brandBResult] = await Promise.allSettled([
    fetchBrand(tickerA),
    fetchBrand(tickerB),
  ]);
  const [briefAResult, briefBResult] = await Promise.allSettled([
    fetchBrief(tickerA),
    fetchBrief(tickerB),
  ]);

  const brandA: BrandDetail | null =
    brandAResult.status === "fulfilled" ? brandAResult.value : null;
  const brandB: BrandDetail | null =
    brandBResult.status === "fulfilled" ? brandBResult.value : null;
  const briefA: BriefData | null =
    briefAResult.status === "fulfilled" ? briefAResult.value : null;
  const briefB: BriefData | null =
    briefBResult.status === "fulfilled" ? briefBResult.value : null;

  const themeA = brandA ? resolveTheme(brandA, briefA) : DEFAULT_THEME;
  const themeB = brandB ? resolveTheme(brandB, briefB) : DEFAULT_THEME;
  const pageBg = deriveBg(themeA, themeB);
  const isLight = themeA.isLight || themeB.isLight;
  const textColor = isLight ? "#1d1d1f" : T.text;
  const mutedColor = isLight ? "#6e6e73" : T.textMuted;
  const borderColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)";
  const navBg = isLight ? "rgba(245,245,247,0.92)" : "rgba(7,7,11,0.92)";

  const voiceA = voiceArray(briefA);
  const voiceB = voiceArray(briefB);

  const colorsA = brandA?.colors.length
    ? brandA.colors.slice(0, 6).map((c) => c.hex)
    : (briefA?.colors ?? []).slice(0, 6);
  const colorsB = brandB?.colors.length
    ? brandB.colors.slice(0, 6).map((c) => c.hex)
    : (briefB?.colors ?? []).slice(0, 6);

  const nameA = brandA?.name ?? tickerA;
  const nameB = brandB?.name ?? tickerB;

  const metrics: Array<{ label: string; a: string; b: string }> = [
    {
      label: "Revenue",
      a: briefA?.financial_headline ?? "—",
      b: briefB?.financial_headline ?? "—",
    },
    {
      label: "Analyzed",
      a: brandA?.analysis_date ?? briefA?.analysis_date ?? "—",
      b: brandB?.analysis_date ?? briefB?.analysis_date ?? "—",
    },
    {
      label: "Layers",
      a: brandA ? `${brandA.layers.filter((l) => l.available).length}/8` : "—",
      b: brandB ? `${brandB.layers.filter((l) => l.available).length}/8` : "—",
    },
    {
      label: "Risk",
      a: briefA?.legal_risk_level ?? "UNKNOWN",
      b: briefB?.legal_risk_level ?? "UNKNOWN",
    },
  ];

  const surfaceCard: CSSProperties = {
    background: isLight ? "#ffffff" : "#0F0F17",
    borderRadius: 8,
    padding: 16,
    boxShadow: isLight
      ? "0 2px 8px rgba(0,0,0,0.10)"
      : "0 2px 8px rgba(0,0,0,0.40)",
  };

  return (
    <div style={{ background: pageBg, color: textColor, fontFamily: T.sans, minHeight: "100vh" }}>
      {/* Nav bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 24px",
          background: navBg,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${borderColor}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: mutedColor,
              fontFamily: T.sans,
              fontSize: 11,
              textDecoration: "none",
              letterSpacing: "0.04em",
              fontWeight: 500,
            }}
          >
            <ArrowLeft /> All Brands
          </Link>
          <span style={{ color: mutedColor, fontFamily: T.sans, fontSize: 11 }}>/</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Ticker color={themeA.accent} size={13}>{tickerA}</Ticker>
            <span style={{ color: mutedColor, fontFamily: T.sans, fontSize: 13 }}>↔</span>
            <Ticker color={themeB.accent} size={13}>{tickerB}</Ticker>
          </div>
        </div>
        <CompareClient tickerA={tickerA} tickerB={tickerB} />
      </div>

      {/* Hero header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "32px 40px 24px",
          gap: 16,
          borderBottom: `1px solid ${borderColor}`,
          background: isLight
            ? `linear-gradient(135deg, ${themeA.accentAlpha15} 0%, transparent 40%, ${themeB.accentAlpha15} 100%)`
            : `linear-gradient(135deg, ${themeA.accent}18 0%, transparent 40%, ${themeB.accent}18 100%)`,
        }}
      >
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: mutedColor, letterSpacing: "0.1em", marginBottom: 4 }}>
            BRAND A
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", color: themeA.accentBright }}>
            {nameA}
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 11, color: mutedColor, marginTop: 2 }}>
            {tickerA}
            {brandA?.sector ? ` · ${brandA.sector}` : ""}
          </div>
        </div>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 20,
            color: mutedColor,
            fontWeight: 300,
            padding: "0 8px",
          }}
        >
          VS
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: mutedColor, letterSpacing: "0.1em", marginBottom: 4 }}>
            BRAND B
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", color: themeB.accentBright }}>
            {nameB}
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 11, color: mutedColor, marginTop: 2 }}>
            {tickerB}
            {brandB?.sector ? ` · ${brandB.sector}` : ""}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 40px 48px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Color strips */}
        <div style={surfaceCard}>
          <SectionLabel color={mutedColor}>COLOR SYSTEMS</SectionLabel>
          <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
            {/* Brand A colors */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: themeA.accentBright, letterSpacing: "0.08em", marginBottom: 6 }}>
                {tickerA}
              </div>
              {colorsA.length > 0 ? (
                <div style={{ borderRadius: 4, overflow: "hidden", height: 40, display: "flex" }}>
                  {colorsA.map((hex, i) => (
                    <div key={`a-${i}`} title={hex} style={{ flex: 1, background: hex }} />
                  ))}
                </div>
              ) : (
                <div style={{ height: 40, background: "rgba(128,128,128,0.1)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: T.mono, fontSize: 9, color: mutedColor }}>NO DATA</span>
                </div>
              )}
            </div>
            {/* Brand B colors */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: themeB.accentBright, letterSpacing: "0.08em", marginBottom: 6 }}>
                {tickerB}
              </div>
              {colorsB.length > 0 ? (
                <div style={{ borderRadius: 4, overflow: "hidden", height: 40, display: "flex" }}>
                  {colorsB.map((hex, i) => (
                    <div key={`b-${i}`} title={hex} style={{ flex: 1, background: hex }} />
                  ))}
                </div>
              ) : (
                <div style={{ height: 40, background: "rgba(128,128,128,0.1)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: T.mono, fontSize: 9, color: mutedColor }}>NO DATA</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Voice overlay radar */}
        <div style={{ ...surfaceCard, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SectionLabel color={mutedColor}>VOICE OVERLAY</SectionLabel>
          <div style={{ marginTop: 16 }}>
            <DualVoiceRadar
              voiceA={voiceA}
              voiceB={voiceB}
              colorA={themeA.accent}
              colorB={themeB.accent}
              labelA={tickerA}
              labelB={tickerB}
              size={240}
            />
          </div>
        </div>

        {/* Archetype / positioning */}
        <div className="compare-grid">
          <div style={{ ...cardStyle(themeA) }}>
            <SectionLabel color={mutedColor} accent={themeA.accent}>
              {tickerA} ARCHETYPE
            </SectionLabel>
            <div style={{ marginTop: 10 }}>
              {brandA?.archetype_primary ? (
                <div
                  style={{
                    fontFamily: T.sans,
                    fontSize: 18,
                    fontWeight: 700,
                    color: themeA.accentBright,
                    marginBottom: 4,
                  }}
                >
                  {brandA.archetype_primary}
                  {brandA.archetype_secondary ? (
                    <span style={{ fontSize: 13, fontWeight: 500, color: mutedColor, marginLeft: 8 }}>
                      · {brandA.archetype_secondary}
                    </span>
                  ) : null}
                </div>
              ) : (
                <span style={{ fontFamily: T.mono, fontSize: 11, color: mutedColor }}>—</span>
              )}
              {briefA?.positioning_statement && (
                <p style={{ fontFamily: T.sans, fontSize: 11, color: textColor, lineHeight: 1.5, marginTop: 8 }}>
                  {briefA.positioning_statement.slice(0, 180)}
                  {briefA.positioning_statement.length > 180 ? "…" : ""}
                </p>
              )}
            </div>
          </div>

          <div style={{ ...cardStyle(themeB) }}>
            <SectionLabel color={mutedColor} accent={themeB.accent}>
              {tickerB} ARCHETYPE
            </SectionLabel>
            <div style={{ marginTop: 10 }}>
              {brandB?.archetype_primary ? (
                <div
                  style={{
                    fontFamily: T.sans,
                    fontSize: 18,
                    fontWeight: 700,
                    color: themeB.accentBright,
                    marginBottom: 4,
                  }}
                >
                  {brandB.archetype_primary}
                  {brandB.archetype_secondary ? (
                    <span style={{ fontSize: 13, fontWeight: 500, color: mutedColor, marginLeft: 8 }}>
                      · {brandB.archetype_secondary}
                    </span>
                  ) : null}
                </div>
              ) : (
                <span style={{ fontFamily: T.mono, fontSize: 11, color: mutedColor }}>—</span>
              )}
              {briefB?.positioning_statement && (
                <p style={{ fontFamily: T.sans, fontSize: 11, color: textColor, lineHeight: 1.5, marginTop: 8 }}>
                  {briefB.positioning_statement.slice(0, 180)}
                  {briefB.positioning_statement.length > 180 ? "…" : ""}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={surfaceCard}>
          <SectionLabel color={mutedColor}>KEY METRICS</SectionLabel>
          <div style={{ marginTop: 4 }}>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, paddingBottom: 8, borderBottom: `1px solid ${borderColor}` }}>
              <span style={{ fontFamily: T.mono, fontSize: 9, color: mutedColor, width: 80, flexShrink: 0 }} />
              <span style={{ fontFamily: T.mono, fontSize: 10, color: themeA.accentBright, flex: 1, textAlign: "right" }}>
                {tickerA}
              </span>
              <span style={{ width: 18 }} />
              <span style={{ fontFamily: T.mono, fontSize: 10, color: themeB.accentBright, flex: 1 }}>
                {tickerB}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {metrics.map(({ label, a, b }) => (
                <MetricRow
                  key={label}
                  label={label}
                  valueA={a}
                  valueB={b}
                  colorA={themeA.accent}
                  colorB={themeB.accent}
                  textColor={textColor}
                  mutedColor={mutedColor}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href={`/brands/${tickerA}`}
            style={{
              padding: "6px 16px",
              background: `${themeA.accent}22`,
              border: `1px solid ${themeA.accent}50`,
              borderRadius: 4,
              color: themeA.accentBright,
              fontFamily: T.mono,
              fontSize: 11,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            {tickerA} FULL PROFILE →
          </Link>
          <Link
            href={`/brands/${tickerB}`}
            style={{
              padding: "6px 16px",
              background: `${themeB.accent}22`,
              border: `1px solid ${themeB.accent}50`,
              borderRadius: 4,
              color: themeB.accentBright,
              fontFamily: T.mono,
              fontSize: 11,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            {tickerB} FULL PROFILE →
          </Link>
        </div>
      </div>
    </div>
  );
}
