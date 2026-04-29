import type { CSSProperties } from "react";
import {
  fetchBrands,
  fetchFreshnessSummary,
  fetchQualitySummary,
} from "@/lib/api";
import type {
  BrandSummary,
  FreshnessSummary,
  QualitySummary,
} from "@/lib/api";
import { Navigation } from "@/components/navigation";
import { T } from "@/components/ui-primitives";
import { InventoryTable } from "./inventory-table";

export const metadata = {
  title: "Data Inventory · Admin",
  robots: { index: false, follow: false },
};

// Re-fetch quality + freshness summaries on each request so the admin view
// reflects the latest cron output without requiring a redeploy.
export const dynamic = "force-dynamic";

interface InventoryFetchResult {
  brands: BrandSummary[];
  quality: QualitySummary;
  freshness: FreshnessSummary;
}

async function loadInventory(): Promise<InventoryFetchResult> {
  const [brandsRes, quality, freshness] = await Promise.all([
    fetchBrands({ limit: 1000 }).catch(() => ({ brands: [] as BrandSummary[], total: 0 })),
    fetchQualitySummary(),
    fetchFreshnessSummary(),
  ]);
  return { brands: brandsRes.brands, quality, freshness };
}

function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: string;
}): JSX.Element {
  const cardStyle: CSSProperties = {
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    padding: "12px 16px",
    background: T.surface,
    minWidth: 180,
    flex: 1,
  };
  return (
    <div style={cardStyle}>
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 9,
          color: T.textDim,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 26,
          fontWeight: 600,
          color: accent ?? T.textBright,
          marginTop: 4,
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </div>
      {hint && (
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: T.textMuted,
            marginTop: 4,
            letterSpacing: "0.04em",
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

export default async function AdminInventoryPage(): Promise<JSX.Element> {
  const { brands, quality, freshness } = await loadInventory();

  const hasQuality = quality.total_brands > 0 || Object.keys(quality.scores).length > 0;
  const hasFreshness =
    freshness.total_brands > 0 || Object.keys(freshness.records).length > 0;

  const pageStyle: CSSProperties = {
    background: T.bg,
    color: T.text,
    fontFamily: T.sans,
    minHeight: "100vh",
  };

  const containerStyle: CSSProperties = {
    padding: "20px 28px 60px",
    maxWidth: 1480,
    margin: "0 auto",
  };

  const warningStyle: CSSProperties = {
    border: `1px solid ${T.warn}55`,
    background: `${T.warn}12`,
    color: T.warn,
    padding: "10px 14px",
    borderRadius: 4,
    fontFamily: T.mono,
    fontSize: 11,
    letterSpacing: "0.06em",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  const headerStyle: CSSProperties = {
    paddingBottom: 16,
    borderBottom: `1px solid ${T.border}`,
    marginBottom: 20,
  };

  const stalebrandTickers = Object.entries(freshness.records)
    .filter(([, r]) => r.status === "STALE")
    .map(([t]) => t);

  return (
    <div style={pageStyle}>
      <Navigation brandCount={brands.length} />
      <div style={containerStyle}>
        <div style={warningStyle}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 1,
              background: T.warn,
              boxShadow: `0 0 6px ${T.warn}`,
            }}
          />
          INTERNAL — Admin view. Not for external sharing.
        </div>

        <div style={headerStyle}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.textDim,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            ▎ ADMIN / DATA OPS
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: T.textBright,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            DATA INVENTORY
          </h1>
          <p
            style={{
              marginTop: 6,
              color: T.textMuted,
              fontSize: 13,
              fontFamily: T.mono,
              letterSpacing: "0.02em",
            }}
          >
            {brands.length} brands · quality + freshness audit
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
          <StatCard
            label="AVG QUALITY SCORE"
            value={hasQuality ? quality.avg_score.toFixed(1) : "—"}
            hint={hasQuality ? `${quality.total_brands} scored` : "Not generated"}
            accent={
              hasQuality
                ? quality.avg_score >= 80
                  ? T.success
                  : quality.avg_score >= 60
                    ? T.warn
                    : T.error
                : T.textMuted
            }
          />
          <StatCard
            label="HIGH CONFIDENCE"
            value={hasQuality ? String(quality.high_count) : "—"}
            hint={hasQuality ? "score ≥ 80" : "Not generated"}
            accent={hasQuality ? T.success : T.textMuted}
          />
          <StatCard
            label="STALE BRANDS"
            value={hasFreshness ? String(freshness.stale_count) : "—"}
            hint={hasFreshness ? "needs refresh" : "Not generated"}
            accent={hasFreshness && freshness.stale_count > 0 ? T.error : T.textMuted}
          />
        </div>

        {!hasQuality && (
          <div
            style={{
              border: `1px dashed ${T.border}`,
              background: T.surface,
              padding: "12px 16px",
              borderRadius: 4,
              fontFamily: T.mono,
              fontSize: 11,
              color: T.textMuted,
              marginBottom: 16,
            }}
          >
            Quality scores not yet generated. Run{" "}
            <code
              style={{
                color: T.accentBright,
                background: T.bgDeep,
                padding: "2px 5px",
                borderRadius: 2,
              }}
            >
              python scripts/run_quality_check.py
            </code>{" "}
            to generate scores.
          </div>
        )}

        <InventoryTable
          brands={brands}
          quality={quality}
          freshness={freshness}
          staleTickers={stalebrandTickers}
        />
      </div>
    </div>
  );
}
