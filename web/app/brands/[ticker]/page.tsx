import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { fetchBrand, fetchBrief, fetchLayer } from "@/lib/api";
import type { BrandDetail, BriefData, ColorEntry } from "@/lib/api";
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
import { BrandTabs } from "./brand-tabs";

interface PageProps {
  params: Promise<{ ticker: string }>;
  searchParams: Promise<{ layer?: string }>;
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

const btnPrimaryStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: "5px 10px",
  border: `1px solid ${T.accent}80`,
  borderRadius: 3,
  background: `${T.accent}25`,
  color: T.accentBright,
  fontFamily: T.mono,
  fontSize: 10,
  cursor: "pointer",
  letterSpacing: "0.06em",
  fontWeight: 600,
  textDecoration: "none",
};

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

function KV({
  k,
  v,
  mono,
}: {
  k: string;
  v: string;
  mono?: boolean;
}): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 0",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <span
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          color: T.textMuted,
          letterSpacing: "0.06em",
        }}
      >
        {k}
      </span>
      <span
        style={{
          fontFamily: mono ? T.mono : T.sans,
          fontSize: 12,
          color: T.text,
          fontWeight: 500,
        }}
      >
        {v}
      </span>
    </div>
  );
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

export default async function BrandPage({
  params,
  searchParams,
}: PageProps): Promise<JSX.Element> {
  const { ticker } = await params;
  const sp = await searchParams;
  const tickerUp = ticker.toUpperCase();
  const activeLayer = parseInt(sp.layer ?? "1", 10);

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

  return (
    <div
      style={{
        background: T.bg,
        color: T.text,
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
          borderBottom: `1px solid ${T.border}`,
          background: T.bgDeep,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: T.textMuted,
              fontFamily: T.mono,
              fontSize: 11,
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            <ArrowLeft /> ALL BRANDS
          </Link>
          <span
            style={{ color: T.textDim, fontFamily: T.mono, fontSize: 11 }}
          >
            /
          </span>
          <Ticker color={T.accentBright} size={11}>
            {brand.ticker}
          </Ticker>
          <span style={{ color: T.textMuted, fontSize: 12 }}>{brand.name}</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" style={btnSecondaryStyle} aria-label="Bookmark">
            <BookmarkIcon />
          </button>
          <button type="button" style={btnSecondaryStyle} aria-label="Share">
            <ShareIcon />
          </button>
          <ExportButton brand={brand} />
          <Link href={`/brands/${tickerUp}/brief`} style={btnPrimaryStyle}>
            <PrintIcon /> VIEW BRIEF →
          </Link>
        </div>
      </div>

      {/* Hero — color flood */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${colorPrimary} 0%, ${colorPrimary}cc 60%, ${T.bg} 100%)`,
          padding: "32px 24px 28px",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 60px, rgba(0,0,0,0.04) 60px, rgba(0,0,0,0.04) 61px)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
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
              <Ticker color="rgba(255,255,255,0.95)" size={20}>
                {brand.ticker}
              </Ticker>
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.08em",
                }}
              >
                {brand.sector.toUpperCase()} / {brand.industry.toUpperCase()}
              </span>
              <ConfidenceBadge level={confidenceLevel} />
              <RiskBadge level={riskLevel} />
            </div>
            <h1
              style={{
                fontSize: 44,
                fontWeight: 600,
                color: "rgba(255,255,255,0.97)",
                letterSpacing: "-0.025em",
                lineHeight: 1,
                marginBottom: 14,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {brand.name}
            </h1>
            {tagline && (
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.85)",
                  maxWidth: 640,
                  lineHeight: 1.5,
                  marginBottom: 16,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{tagline}&rdquo;
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
              <span
                style={{
                  padding: "3px 8px",
                  background: "rgba(0,0,0,0.35)",
                  borderRadius: 3,
                  fontFamily: T.mono,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.95)",
                  letterSpacing: "0.06em",
                }}
              >
                ARCHETYPE · {brand.archetype_primary.toUpperCase()}
                {brand.archetype_secondary
                  ? ` / ${brand.archetype_secondary.toUpperCase()}`
                  : ""}
              </span>
              {swatchHexes.length > 0 && (
                <ColorSwatches colors={swatchHexes} max={5} size={20} gap={4} />
              )}
            </div>
          </div>
          <div
            style={{
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 6,
              padding: 14,
              backdropFilter: "blur(8px)",
            }}
          >
            <SectionLabel
              color="rgba(255,255,255,0.55)"
              accent={T.accentBright}
            >
              POSITIONING THESIS
            </SectionLabel>
            <p
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.5,
              }}
            >
              {positioning || "Positioning statement not available."}
            </p>
            <div
              style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: `1px solid rgba(255,255,255,0.1)`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 9,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  REVENUE
                </div>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 14,
                    color: "white",
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
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  ANALYZED
                </div>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 14,
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  {analysisDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body — 3-column */}
      <div
        style={{
          padding: "20px 24px 40px",
          display: "grid",
          gridTemplateColumns: "260px 1fr 280px",
          gap: 16,
        }}
      >
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
        <aside
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              padding: 14,
            }}
          >
            <SectionLabel accent={T.accent}>VOICE MATRIX</SectionLabel>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <VoiceRadar voice={voiceArr} size={220} color={T.accent} />
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: T.mono,
                fontSize: 9,
                color: T.textDim,
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
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 6,
                padding: 14,
              }}
            >
              <SectionLabel accent={T.accent}>COLOR SYSTEM</SectionLabel>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {colorList.slice(0, 6).map((cc, i) => (
                  <div
                    key={`${cc.hex}-${i}`}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 3,
                        background: cc.hex,
                        border: `1px solid ${T.border}`,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: T.mono,
                          fontSize: 11,
                          color: T.text,
                        }}
                      >
                        {cc.hex.toUpperCase()}
                      </div>
                      <div
                        style={{
                          fontFamily: T.mono,
                          fontSize: 9,
                          color: T.textDim,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {(cc.role || colorRoleLabel(i)).toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              padding: 14,
            }}
          >
            <SectionLabel accent={T.accent}>METADATA</SectionLabel>
            <div style={{ marginTop: 10 }}>
              <KV k="TICKER" v={brand.ticker} mono />
              <KV k="SECTOR" v={brand.sector} />
              <KV k="REVENUE" v={revenue} mono />
              <KV k="LAYERS" v={`${layerCount}/8`} mono />
              <KV k="ANALYZED" v={analysisDate} mono />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
