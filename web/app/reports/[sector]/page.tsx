import Link from "next/link";
import type { CSSProperties } from "react";
import { fetchBrands } from "@/lib/api";
import type { BrandSummary } from "@/lib/api";
import { Navigation } from "@/components/navigation";
import { T } from "@/components/ui-primitives";

interface SectorReportPageProps {
  params: Promise<{ sector: string }>;
}

interface ArchetypeBucket {
  archetype: string;
  count: number;
  pct: number;
}

interface SectorReportData {
  sectorLabel: string;
  brands: BrandSummary[];
  archetypeBuckets: ArchetypeBucket[];
}

function unslug(slug: string): string {
  // "information-technology" -> "Information Technology"
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((w) => (w.length === 0 ? w : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join(" ");
}

function matchesSector(brandSector: string, target: string): boolean {
  return (brandSector || "").toLowerCase() === target.toLowerCase();
}

async function loadSectorData(slug: string): Promise<SectorReportData> {
  const sectorLabel = unslug(slug);
  let allBrands: BrandSummary[] = [];
  try {
    const data = await fetchBrands({ limit: 1000 });
    allBrands = data.brands;
  } catch {
    allBrands = [];
  }

  const brands = allBrands.filter((b) => matchesSector(b.sector, sectorLabel));

  const counts: Record<string, number> = {};
  for (const b of brands) {
    const a = b.archetype_primary;
    if (!a) continue;
    counts[a] = (counts[a] ?? 0) + 1;
  }
  const total = brands.length || 1;
  const archetypeBuckets = Object.entries(counts)
    .map(([archetype, count]) => ({
      archetype,
      count,
      pct: (count / total) * 100,
    }))
    .sort((a, b) => b.count - a.count);

  return { sectorLabel, brands, archetypeBuckets };
}

export async function generateMetadata({ params }: SectorReportPageProps) {
  const { sector } = await params;
  const label = unslug(sector);
  return {
    title: `${label} — Sector Intelligence Report`,
    description: `Deep-dive brand analysis report covering S&P 500 brands in the ${label} sector.`,
  };
}

function ArchetypeChart({ buckets }: { buckets: ArchetypeBucket[] }): JSX.Element {
  if (buckets.length === 0) {
    return (
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 11,
          color: T.textDim,
          padding: "12px 0",
        }}
      >
        No archetype data available.
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {buckets.map((b) => (
        <div
          key={b.archetype}
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr 60px",
            gap: 12,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 11,
              color: T.textSecondary,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {b.archetype}
          </span>
          <div
            style={{
              height: 8,
              background: T.border,
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${b.pct}%`,
                height: "100%",
                background: T.accent,
                boxShadow: `0 0 6px ${T.accent}80`,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 11,
              color: T.textBright,
              textAlign: "right",
            }}
          >
            {b.count}
          </span>
        </div>
      ))}
    </div>
  );
}

interface BrandTableProps {
  brands: BrandSummary[];
  freePreviewCount: number;
}

function BrandTable({ brands, freePreviewCount }: BrandTableProps): JSX.Element {
  const headerStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "70px minmax(180px, 1.5fr) 160px 100px 80px",
    gap: 10,
    padding: "10px 14px",
    borderBottom: `1px solid ${T.border}`,
    background: T.bgDeep,
    fontFamily: T.mono,
    fontSize: 9,
    color: T.textDim,
    letterSpacing: "0.1em",
  };

  const rowStyle = (locked: boolean): CSSProperties => ({
    display: "grid",
    gridTemplateColumns: "70px minmax(180px, 1.5fr) 160px 100px 80px",
    gap: 10,
    padding: "10px 14px",
    borderBottom: `1px solid ${T.border}`,
    fontFamily: T.mono,
    fontSize: 11,
    alignItems: "center",
    filter: locked ? "blur(4px)" : "none",
    pointerEvents: locked ? "none" : "auto",
    userSelect: locked ? "none" : "auto",
  });

  return (
    <div
      style={{
        border: `1px solid ${T.border}`,
        borderRadius: 4,
        background: T.surface,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={headerStyle}>
        <span>TICKER</span>
        <span>NAME</span>
        <span>ARCHETYPE</span>
        <span>LAYERS</span>
        <span style={{ textAlign: "right" }}>VIEW</span>
      </div>
      {brands.map((b, i) => {
        const locked = i >= freePreviewCount;
        return (
          <div key={b.ticker} style={rowStyle(locked)}>
            <span style={{ color: T.accentBright, fontWeight: 600 }}>
              {b.ticker}
            </span>
            <span
              style={{
                color: T.textBright,
                fontFamily: T.sans,
                fontSize: 12,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {b.name}
            </span>
            <span
              style={{
                color: T.textSecondary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {b.archetype_primary || "—"}
            </span>
            <span style={{ color: T.textMuted }}>{b.layer_count ?? 0}/8</span>
            <span style={{ textAlign: "right" }}>
              {locked ? (
                <span style={{ color: T.textDim }}>LOCKED</span>
              ) : (
                <Link
                  href={`/brands/${b.ticker}`}
                  style={{
                    color: T.accentBright,
                    textDecoration: "none",
                  }}
                >
                  →
                </Link>
              )}
            </span>
          </div>
        );
      })}
      {brands.length > freePreviewCount && (
        <div
          style={{
            padding: "12px 14px",
            background: T.bgDeep,
            borderTop: `1px solid ${T.border}`,
            fontFamily: T.mono,
            fontSize: 11,
            color: T.textMuted,
            textAlign: "center",
            letterSpacing: "0.06em",
          }}
        >
          {brands.length - freePreviewCount} more brands locked · purchase report
          to unlock
        </div>
      )}
    </div>
  );
}

export default async function SectorReportPage({
  params,
}: SectorReportPageProps): Promise<JSX.Element> {
  const { sector } = await params;
  const { sectorLabel, brands, archetypeBuckets } = await loadSectorData(sector);

  const pageStyle: CSSProperties = {
    background: T.bg,
    color: T.text,
    fontFamily: T.sans,
    minHeight: "100vh",
  };

  const containerStyle: CSSProperties = {
    padding: "32px 28px 60px",
    maxWidth: 1180,
    margin: "0 auto",
  };

  const headerStyle: CSSProperties = {
    paddingBottom: 24,
    borderBottom: `1px solid ${T.border}`,
    marginBottom: 28,
  };

  const sectionStyle: CSSProperties = {
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    background: T.surface,
    padding: 20,
    marginBottom: 20,
  };

  const ctaStyle: CSSProperties = {
    border: `1px solid ${T.accent}`,
    borderRadius: 6,
    background: `linear-gradient(135deg, ${T.accent}18, ${T.surface})`,
    padding: "24px 24px",
    marginBottom: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  };

  const buyButtonStyle: CSSProperties = {
    padding: "12px 22px",
    background: T.accent,
    color: T.textBright,
    border: `1px solid ${T.accent}`,
    borderRadius: 4,
    fontFamily: T.mono,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textDecoration: "none",
  };

  return (
    <div style={pageStyle}>
      <Navigation brandCount={brands.length} />
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
            <Link
              href="/reports"
              style={{ color: T.textMuted, textDecoration: "none" }}
            >
              ← REPORTS
            </Link>{" "}
            / SECTOR
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
            {sectorLabel.toUpperCase()}
          </h1>
          <p
            style={{
              marginTop: 8,
              color: T.textMuted,
              fontSize: 13,
              fontFamily: T.mono,
              letterSpacing: "0.02em",
            }}
          >
            {brands.length} brands · {archetypeBuckets.length} archetype patterns
          </p>
        </div>

        <div style={ctaStyle}>
          <div>
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                color: T.accentBright,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              FULL REPORT · PDF
            </div>
            <div
              style={{
                fontSize: 18,
                color: T.textBright,
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              Unlock all {brands.length} brand autopsies in {sectorLabel}
            </div>
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 11,
                color: T.textMuted,
                marginTop: 4,
              }}
            >
              8 strategic layers per brand · sourced from SEC filings + official channels
            </div>
          </div>
          <Link href="/pricing" style={buyButtonStyle}>
            DOWNLOAD FULL PDF — $49
          </Link>
        </div>

        <div style={sectionStyle}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.textDim,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ▎ ARCHETYPE DISTRIBUTION
          </div>
          <ArchetypeChart buckets={archetypeBuckets} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.textDim,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>▎ BRAND LIST · FREE PREVIEW: FIRST 3</span>
            <span style={{ color: T.warn }}>
              {Math.max(0, brands.length - 3)} LOCKED
            </span>
          </div>
          {brands.length === 0 ? (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                border: `1px dashed ${T.border}`,
                borderRadius: 4,
                background: T.surface,
                fontFamily: T.mono,
                fontSize: 11,
                color: T.textMuted,
                letterSpacing: "0.06em",
              }}
            >
              NO BRANDS FOUND FOR SECTOR &quot;{sectorLabel.toUpperCase()}&quot;
            </div>
          ) : (
            <BrandTable brands={brands} freePreviewCount={3} />
          )}
        </div>

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
          }}
        >
          Brand strategy analysis. AI-assisted. Not investment or legal advice.
          Based on publicly available filings (SEC EDGAR), official company
          communications, and reputable third-party sources. Numbers tagged
          (estimated) are not directly disclosed by the issuer.
        </footer>
      </div>
    </div>
  );
}
