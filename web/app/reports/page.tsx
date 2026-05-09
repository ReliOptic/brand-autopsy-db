import Link from "next/link";
import type { CSSProperties } from "react";
import { fetchBrands } from "@/lib/api";
import type { BrandSummary } from "@/lib/api";
import { T } from "@/components/ui-primitives";

export const metadata = {
  title: "Sector Intelligence Reports",
  description:
    "Deep-dive S&P 500 brand analysis packages by sector. PDF reports for strategists, marketers, and competitive intel teams.",
};

interface SectorEntry {
  sector: string;
  count: number;
  topArchetypes: string[];
}

function sectorSlug(sector: string): string {
  return sector.toLowerCase().replace(/\s+/g, "-");
}

function buildSectorEntries(brands: BrandSummary[]): SectorEntry[] {
  const sectorMap: Record<string, BrandSummary[]> = {};
  for (const b of brands) {
    const key = b.sector || "Unknown";
    sectorMap[key] = sectorMap[key] ?? [];
    sectorMap[key].push(b);
  }

  return Object.entries(sectorMap)
    .map(([sector, list]) => {
      const archetypeCounts: Record<string, number> = {};
      for (const b of list) {
        const a = b.archetype_primary;
        if (!a) continue;
        archetypeCounts[a] = (archetypeCounts[a] ?? 0) + 1;
      }
      const topArchetypes = Object.entries(archetypeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([a]) => a);
      return { sector, count: list.length, topArchetypes };
    })
    .sort((a, b) => b.count - a.count);
}

async function loadBrands(): Promise<BrandSummary[]> {
  try {
    const data = await fetchBrands({ limit: 1000 });
    return data.brands;
  } catch {
    return [];
  }
}

function SectorCard({ entry }: { entry: SectorEntry }): JSX.Element {
  const cardStyle: CSSProperties = {
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    background: T.surface,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    minHeight: 280,
  };

  const titleStyle: CSSProperties = {
    fontSize: 20,
    fontWeight: 600,
    color: T.textBright,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
    margin: 0,
  };

  const metaStyle: CSSProperties = {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.textDim,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  };

  const buyButtonStyle: CSSProperties = {
    padding: "9px 14px",
    background: T.accent,
    color: T.textBright,
    border: `1px solid ${T.accent}`,
    borderRadius: 4,
    fontFamily: T.mono,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textDecoration: "none",
    textAlign: "center",
    flex: 1,
  };

  const previewButtonStyle: CSSProperties = {
    padding: "9px 14px",
    background: "transparent",
    color: T.textSecondary,
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    fontFamily: T.mono,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textDecoration: "none",
    textAlign: "center",
  };

  const slug = sectorSlug(entry.sector);

  return (
    <div style={cardStyle}>
      <div>
        <div style={metaStyle}>SECTOR</div>
        <h3 style={titleStyle}>{entry.sector}</h3>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 11,
            color: T.textMuted,
            marginTop: 6,
          }}
        >
          {entry.count} brands · 8-layer analysis
        </div>
      </div>

      <div>
        <div style={{ ...metaStyle, marginBottom: 6 }}>TOP ARCHETYPES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {entry.topArchetypes.length === 0 ? (
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 11,
                color: T.textDim,
              }}
            >
              —
            </span>
          ) : (
            entry.topArchetypes.map((a) => (
              <span
                key={a}
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  padding: "3px 8px",
                  border: `1px solid ${T.border}`,
                  borderRadius: 2,
                  color: T.textSecondary,
                  background: T.bgDeep,
                  letterSpacing: "0.04em",
                }}
              >
                {a}
              </span>
            ))
          )}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          paddingTop: 12,
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={metaStyle}>PDF REPORT</span>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 13,
              color: T.textBright,
              fontWeight: 600,
            }}
          >
            $49 <span style={{ color: T.textDim, fontWeight: 400 }}>/ one-time</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href={`/reports/${slug}`} style={buyButtonStyle}>
            BUY REPORT
          </Link>
          <Link
            href={`/compare?sector=${encodeURIComponent(entry.sector)}`}
            style={previewButtonStyle}
          >
            PREVIEW
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function ReportsPage(): Promise<JSX.Element> {
  const brands = await loadBrands();
  const entries = buildSectorEntries(brands);

  const pageStyle: CSSProperties = {
    color: T.text,
    fontFamily: T.sans,
    minHeight: "100vh",
  };

  const containerStyle: CSSProperties = {
    padding: "32px 28px 60px",
    maxWidth: 1280,
    margin: "0 auto",
  };

  const headerStyle: CSSProperties = {
    paddingBottom: 24,
    borderBottom: `1px solid ${T.border}`,
    marginBottom: 28,
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 16,
  };

  return (
    <div className="app-backdrop" style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.accent,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            ▎ INTELLIGENCE PACKAGES
          </div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: T.textBright,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            SECTOR INTELLIGENCE REPORTS
          </h1>
          <p
            style={{
              marginTop: 10,
              color: T.textMuted,
              fontSize: 14,
              maxWidth: 720,
              lineHeight: 1.5,
            }}
          >
            Deep-dive brand analysis packages by sector. Each report bundles 8-layer
            autopsies of every S&P 500 brand in the sector — Identity, Audience,
            Competitive, Content DNA, Design, Channels, Financials, Legal.
          </p>
        </div>

        {entries.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              border: `1px dashed ${T.border}`,
              borderRadius: 6,
              background: T.surface,
              fontFamily: T.mono,
              fontSize: 12,
              color: T.textMuted,
              letterSpacing: "0.06em",
            }}
          >
            NO SECTORS AVAILABLE · BACKEND OFFLINE
          </div>
        ) : (
          <div style={gridStyle}>
            {entries.map((e) => (
              <SectorCard key={e.sector} entry={e} />
            ))}
          </div>
        )}

        <footer
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: `1px solid ${T.border}`,
            fontFamily: T.mono,
            fontSize: 10,
            color: T.textMuted,
            letterSpacing: "0.04em",
            lineHeight: 1.6,
            maxWidth: 880,
          }}
        >
          Reports are generated PDF exports of all brand analyses in the sector.
          AI-assisted. Not investment advice. Based on publicly available filings
          (SEC EDGAR), official company communications, and reputable third-party
          sources. Data current as of latest analysis run.
        </footer>
      </div>
    </div>
  );
}
