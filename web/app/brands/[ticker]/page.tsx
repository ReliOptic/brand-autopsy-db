import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { fetchBrand, fetchBrief, fetchLayer } from "@/lib/api";
import type { BrandDetail, BriefData, ColorEntry } from "@/lib/api";
import { deriveBrandTheme, DEFAULT_THEME } from "@/lib/brand-theme";
import type { BrandTheme } from "@/lib/brand-theme";
import {
  ColorSwatches,
  ConfidenceBadge,
  RiskBadge,
  SectionLabel,
  T,
  Ticker,
  VoiceRadar,
} from "@/components/ui-primitives";
import { SimilarBrands } from "@/components/similar-brands";
import { ExportButton } from "@/components/export-button";
import { FigmaExportButton } from "@/components/figma-export-button";
import { VisualOverview } from "@/components/visual-overview";
import { BrandTabs } from "./brand-tabs";

interface PageProps {
  params: Promise<{ ticker: string }>;
  searchParams: Promise<{ layer?: string; view?: string; density?: string }>;
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
      title: `${brand.ticker} — ${brand.name} Brand Analysis`,
      description: `Brand strategy analysis of ${brand.name} (${brand.ticker}). ${brand.sector} · ${brand.industry}. 8-layer deep-dive: Identity, Voice, Competitive, Channels, Financials, Legal.`,
      openGraph: {
        title: `${brand.ticker} — ${brand.name} Brand Analysis`,
        description: `Brand strategy deep-dive: ${brand.name} across 8 strategic layers.`,
      },
    };
  } catch {
    return { title: tickerUp };
  }
}

const btnSecondaryStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: "5px 9px",
  border: `1px solid ${T.border}`,
  borderRadius: 3,
  background: T.surface,
  color: T.text,
  fontFamily: T.mono,
  fontSize: 10,
  cursor: "pointer",
  letterSpacing: "0.06em",
  textDecoration: "none",
};

function btnPrimaryStyle(theme: BrandTheme): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "5px 10px",
    border: `1px solid ${theme.accent}80`,
    borderRadius: 3,
    background: `${theme.accent}25`,
    color: theme.accentBright,
    fontFamily: T.mono,
    fontSize: 10,
    cursor: "pointer",
    letterSpacing: "0.06em",
    fontWeight: 600,
    textDecoration: "none",
  };
}

function deriveTagline(brief: BriefData | null, brand: BrandDetail): string {
  if (brand.tagline) return brand.tagline;
  if (brief && brief.key_messages.length > 0) return brief.key_messages[0];
  if (brief && brief.positioning_statement) {
    const trimmed = brief.positioning_statement.slice(0, 180);
    return trimmed.length < brief.positioning_statement.length
      ? `${trimmed}…`
      : trimmed;
  }
  return brand.slogan ?? "";
}

function colorRoleLabel(idx: number): string {
  if (idx === 0) return "PRIMARY";
  if (idx === 1) return "SECONDARY";
  return `ACCENT ${idx - 1}`;
}

function voiceArrayFromBrief(brief: BriefData | null): number[] {
  if (!brief?.voice_matrix) return [5, 5, 5, 5];
  const m = brief.voice_matrix;
  return [
    m.formal_casual ?? 5,
    m.authority_peer ?? 5,
    m.emotional_rational ?? 5,
    m.restrained_bold ?? 5,
  ];
}


const ArrowLeft = (): JSX.Element => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const BookmarkIcon = (): JSX.Element => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = (): JSX.Element => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const PrintIcon = (): JSX.Element => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

function viewTabStyle(active: boolean, theme: BrandTheme): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 14px",
    border: `1px solid ${active ? theme.accent : theme.isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.10)"}`,
    borderRadius: 5,
    background: active ? theme.accentAlpha15 : "transparent",
    color: active ? theme.accentBright : theme.textMuted,
    fontFamily: T.sans,
    fontSize: 11,
    letterSpacing: "0.04em",
    fontWeight: active ? 700 : 500,
    textDecoration: "none",
    cursor: "pointer",
  };
}

function densityTabStyle(active: boolean, theme: BrandTheme): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 4,
    background: active ? theme.accentAlpha15 : "transparent",
    color: active ? theme.accentBright : theme.textMuted,
    fontFamily: T.sans,
    fontSize: 10,
    fontWeight: active ? 700 : 500,
    textDecoration: "none",
    letterSpacing: "0.04em",
  };
}

export default async function BrandPage({
  params,
  searchParams,
}: PageProps): Promise<JSX.Element> {
  const { ticker } = await params;
  const sp = await searchParams;
  const tickerUp = ticker.toUpperCase();
  const activeLayer = parseInt(sp.layer ?? "1", 10);
  const view = sp.view === "report" ? "report" : "overview";
  const density = sp.density === "scan" ? "scan" : "deep";

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

  let layerContent = "";
  let layerName = "";
  try {
    const data = await fetchLayer(tickerUp, activeLayer);
    layerContent = data.content;
    layerName = data.layer_name;
  } catch {
    // layer not available
  }

  const colorPrimary: string =
    brand.colors[0]?.hex ?? brief?.color_primary ?? T.accent;
  const tagline = deriveTagline(brief, brand);
  const positioning =
    brief?.positioning_statement ?? brand.tagline ?? brand.slogan ?? "";
  const revenue = brief?.financial_headline ?? "—";
  const analysisDate = brand.analysis_date || brief?.analysis_date || "—";
  const confidenceLevel = brief?.data_confidence ?? "MEDIUM";
  const riskLevel = brief?.legal_risk_level ?? "UNKNOWN";
  const layerCount = brand.layers.filter((l) => l.available).length;
  const voiceArr = voiceArrayFromBrief(brief);
  const colorList: ColorEntry[] = brand.colors.length
    ? brand.colors
    : (brief?.colors ?? []).map((hex, i) => ({
        role: colorRoleLabel(i),
        name: "",
        hex,
        usage: "",
      }));
  const swatchHexes: string[] = colorList.map((c) => c.hex);
  const brandTheme: BrandTheme = swatchHexes.length > 0
    ? deriveBrandTheme(swatchHexes, brand.archetype_primary)
    : DEFAULT_THEME;

  const heroText = brandTheme.isLight ? brandTheme.text : "rgba(255,255,255,0.97)";
  const heroSub = brandTheme.isLight ? brandTheme.textSecondary : "rgba(255,255,255,0.65)";
  const heroBg = brandTheme.isLight ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.35)";
  const heroBorder = brandTheme.isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)";

  return (
    <div
      style={{
        background: brandTheme.bg,
        color: brandTheme.text,
        fontFamily: T.sans,
        minHeight: "100vh",
      }}
    >
      {/* Breadcrumb / sticky bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 24px",
          background: brandTheme.isLight
          ? `${brandTheme.surface}f0`
          : `${brandTheme.bg}e8`,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${brandTheme.isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)"}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: brandTheme.textMuted,
              fontFamily: T.sans,
              fontSize: 11,
              textDecoration: "none",
              letterSpacing: "0.04em",
              fontWeight: 500,
            }}
          >
            <ArrowLeft /> All Brands
          </Link>
          <span
            style={{ color: brandTheme.textDim, fontFamily: T.sans, fontSize: 11 }}
          >
            /
          </span>
          <Ticker color={brandTheme.accent} size={11}>
            {brand.ticker}
          </Ticker>
          <span style={{ color: brandTheme.textSecondary, fontFamily: T.sans, fontSize: 12 }}>{brand.name}</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Link href={`/brands/${tickerUp}?view=overview`} style={viewTabStyle(view === "overview", brandTheme)}>
            Overview
          </Link>
          <Link href={`/brands/${tickerUp}?view=report`} style={viewTabStyle(view === "report", brandTheme)}>
            Full Report
          </Link>
          {view === "overview" && (
            <div style={{ display: "flex", gap: 4 }}>
              <Link
                href={`/brands/${tickerUp}?view=overview&density=scan`}
                style={densityTabStyle(density === "scan", brandTheme)}
              >
                Scan
              </Link>
              <Link
                href={`/brands/${tickerUp}?view=overview&density=deep`}
                style={densityTabStyle(density === "deep", brandTheme)}
              >
                Deep
              </Link>
            </div>
          )}
          <button type="button" style={btnSecondaryStyle} aria-label="Bookmark">
            <BookmarkIcon />
          </button>
          <Link href={`/brands/${tickerUp}/card`} style={btnSecondaryStyle} aria-label="Share">
            <ShareIcon />
          </Link>
          <FigmaExportButton
            ticker={tickerUp}
            brandName={brand.name}
            theme={brandTheme}
            palette={swatchHexes}
          />
          <ExportButton brand={brand} />
          <Link href={`/brands/${tickerUp}/brief`} style={btnPrimaryStyle(brandTheme)}>
            <PrintIcon /> VIEW BRIEF →
          </Link>
        </div>
      </div>

      {/* Hero — mesh gradient */}
      <div
        className="brand-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          background: brandTheme.isLight
            ? [
                `radial-gradient(ellipse 70% 90% at 15% 50%, ${brandTheme.accent}55 0%, transparent 65%)`,
                `radial-gradient(ellipse 50% 70% at 85% 20%, ${brandTheme.accentBright}44 0%, transparent 60%)`,
                `radial-gradient(ellipse 30% 50% at 50% 90%, ${brandTheme.accentDim}33 0%, transparent 55%)`,
                brandTheme.bg,
              ].join(", ")
            : [
                `radial-gradient(ellipse 70% 90% at 15% 50%, ${brandTheme.accent}35 0%, transparent 65%)`,
                `radial-gradient(ellipse 50% 70% at 85% 20%, ${colorPrimary}cc 0%, transparent 55%)`,
                `radial-gradient(ellipse 30% 50% at 50% 90%, ${brandTheme.accentDim}20 0%, transparent 55%)`,
                brandTheme.bg,
              ].join(", "),
          borderBottom: `1px solid ${brandTheme.border}`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: view === "report" ? "1fr 280px" : "1fr",
            gap: 32,
            position: "relative",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <Ticker color={heroText} size={13}>
                {brand.ticker}
              </Ticker>
              <span
                style={{
                  fontFamily: T.sans,
                  fontSize: 12,
                  color: heroSub,
                  letterSpacing: "0.01em",
                  fontWeight: 500,
                }}
              >
                {brand.sector} · {brand.industry}
              </span>
              <ConfidenceBadge level={confidenceLevel} />
              <RiskBadge level={riskLevel} />
            </div>
            <h1
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: 800,
                color: heroText,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: 16,
                textShadow: brandTheme.isLight ? "none" : "0 2px 20px rgba(0,0,0,0.4)",
              }}
            >
              {brand.name}
            </h1>
            {tagline && (
              <p
                style={{
                  fontSize: 17,
                  color: heroSub,
                  maxWidth: 600,
                  lineHeight: 1.55,
                  marginBottom: 20,
                  fontWeight: 400,
                }}
              >
                {tagline}
              </p>
            )}
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {brand.archetype_primary && (
                <span
                  style={{
                    padding: "5px 12px",
                    background: heroBg,
                    borderRadius: brandTheme.radius / 2,
                    fontFamily: T.sans,
                    fontSize: 11,
                    fontWeight: 600,
                    color: heroText,
                    letterSpacing: "0.04em",
                  }}
                >
                  {brand.archetype_primary}
                  {brand.archetype_secondary ? ` · ${brand.archetype_secondary}` : ""}
                </span>
              )}
              {swatchHexes.length > 0 && (
                <ColorSwatches colors={swatchHexes} max={5} size={20} gap={4} />
              )}
            </div>
          </div>
          {view === "report" && (
            <div
              style={{
                background: heroBg,
                border: `1px solid ${heroBorder}`,
                borderRadius: 6,
                padding: 14,
                backdropFilter: "blur(8px)",
              }}
            >
              <SectionLabel
                color={heroSub}
                accent={T.accentBright}
              >
                POSITIONING THESIS
              </SectionLabel>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: heroText,
                  lineHeight: 1.5,
                }}
              >
                {positioning || "Positioning statement not available."}
              </p>
              <div
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTop: `1px solid ${heroBorder}`,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 9,
                      color: heroSub,
                    }}
                  >
                    REVENUE
                  </div>
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 14,
                      color: heroText,
                      fontWeight: 600,
                    }}
                  >
                    {revenue}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 9,
                      color: heroSub,
                    }}
                  >
                    ANALYZED
                  </div>
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 14,
                      color: heroText,
                      fontWeight: 600,
                    }}
                  >
                    {analysisDate}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="brand-body">
        {view === "overview" && brief ? (
          <VisualOverview brief={brief} brand={brand} theme={brandTheme} density={density} />
        ) : view === "overview" && !brief ? (
          <div
            style={{
              padding: 32,
              textAlign: "center",
              fontFamily: T.mono,
              fontSize: 12,
              color: T.textMuted,
              letterSpacing: "0.06em",
            }}
          >
            BRIEF DATA NOT AVAILABLE — <Link href={`/brands/${tickerUp}?view=report`} style={{ color: T.accent }}>VIEW FULL REPORT</Link>
          </div>
        ) : (
          <div className="brand-report-grid">
            <BrandTabs
              ticker={brand.ticker}
              layers={brand.layers}
              activeLayer={activeLayer}
              initialContent={layerContent}
              initialLayerName={layerName}
              similarSlot={
                <SimilarBrands
                  ticker={brand.ticker}
                  archetype={brand.archetype_primary}
                  sector={brand.sector}
                />
              }
            />

            {/* Right: voice + color + metadata */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  background: brandTheme.surface,
                  borderRadius: brandTheme.radius,
                  padding: 16,
                  boxShadow: brandTheme.isLight
                    ? "0 2px 8px rgba(0,0,0,0.10)"
                    : "0 2px 8px rgba(0,0,0,0.40)",
                }}
              >
                <SectionLabel accent={brandTheme.accent}>VOICE MATRIX</SectionLabel>
                <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
                  <VoiceRadar voice={voiceArr} size={220} color={brandTheme.accent} />
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: T.mono,
                    fontSize: 9,
                    color: brandTheme.textDim,
                    textAlign: "center",
                    letterSpacing: "0.06em",
                  }}
                >
                  {`F:${voiceArr[0]} · A:${voiceArr[1]} · E:${voiceArr[2]} · B:${voiceArr[3]}`}
                </div>
              </div>

              {colorList.length > 0 && (
                <div
                  style={{
                    background: brandTheme.surface,
                    borderRadius: brandTheme.radius,
                    padding: 16,
                    boxShadow: brandTheme.isLight
                      ? "0 2px 8px rgba(0,0,0,0.10)"
                      : "0 2px 8px rgba(0,0,0,0.40)",
                  }}
                >
                  <SectionLabel accent={brandTheme.accent}>COLOR SYSTEM</SectionLabel>
                  <div style={{ marginTop: 12, display: "flex", borderRadius: brandTheme.radius / 2, overflow: "hidden", height: 56 }}>
                    {colorList.slice(0, 6).map((cc, i) => (
                      <div
                        key={`${cc.hex}-${i}`}
                        title={`${cc.hex} · ${cc.role || colorRoleLabel(i)}`}
                        style={{ flex: 1, background: cc.hex }}
                      />
                    ))}
                  </div>
                  <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                    {colorList.slice(0, 4).map((cc, i) => (
                      <div key={`kv-${cc.hex}-${i}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: cc.hex, flexShrink: 0 }} />
                        <span style={{ fontFamily: T.mono, fontSize: 10, color: brandTheme.text }}>{cc.hex.toUpperCase()}</span>
                        <span style={{ fontFamily: T.sans, fontSize: 9, color: brandTheme.textMuted, marginLeft: "auto" }}>
                          {(cc.role || colorRoleLabel(i))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  background: brandTheme.surface,
                  borderRadius: brandTheme.radius,
                  padding: 16,
                  boxShadow: brandTheme.isLight
                    ? "0 2px 8px rgba(0,0,0,0.10)"
                    : "0 2px 8px rgba(0,0,0,0.40)",
                }}
              >
                <SectionLabel accent={brandTheme.accent}>METADATA</SectionLabel>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { k: "Ticker", v: brand.ticker, mono: true },
                    { k: "Sector", v: brand.sector, mono: false },
                    { k: "Revenue", v: revenue, mono: true },
                    { k: "Layers", v: `${layerCount}/8`, mono: true },
                    { k: "Analyzed", v: analysisDate, mono: true },
                  ].map(({ k, v, mono }) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontFamily: T.sans, fontSize: 10, color: brandTheme.textMuted }}>{k}</span>
                      <span style={{ fontFamily: mono ? T.mono : T.sans, fontSize: 11, color: brandTheme.text, fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
