"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import type {
  BrandSummary,
  FreshnessSummary,
  QualitySummary,
} from "@/lib/api";
import { T } from "@/components/ui-primitives";

type StatusFilter = "ALL" | "HIGH" | "MEDIUM" | "LOW" | "STALE";

interface InventoryTableProps {
  brands: BrandSummary[];
  quality: QualitySummary;
  freshness: FreshnessSummary;
  staleTickers: string[];
}

interface InventoryRow {
  brand: BrandSummary;
  score: number | null;
  layerCount: number;
  freshnessStatus: "FRESH" | "AGING" | "STALE" | "UNKNOWN";
  daysSinceUpdate: number | null;
}

function classifyScore(score: number | null): "HIGH" | "MEDIUM" | "LOW" | "NONE" {
  if (score == null) return "NONE";
  if (score >= 80) return "HIGH";
  if (score >= 60) return "MEDIUM";
  return "LOW";
}

function scoreColor(score: number | null): string {
  const cls = classifyScore(score);
  if (cls === "HIGH") return T.success;
  if (cls === "MEDIUM") return T.warn;
  if (cls === "LOW") return T.error;
  return T.textDim;
}

function freshnessColor(status: InventoryRow["freshnessStatus"]): string {
  if (status === "FRESH") return T.success;
  if (status === "AGING") return T.warn;
  if (status === "STALE") return T.error;
  return T.textDim;
}

function ScoreBar({ score }: { score: number | null }): JSX.Element {
  if (score == null) {
    return (
      <div
        style={{
          width: 60,
          height: 4,
          background: T.border,
          borderRadius: 1,
        }}
      />
    );
  }
  const pct = Math.max(0, Math.min(100, score));
  const c = scoreColor(score);
  return (
    <div
      style={{
        width: 60,
        height: 4,
        background: T.border,
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: c,
          boxShadow: `0 0 4px ${c}80`,
        }}
      />
    </div>
  );
}

function FreshnessBadge({
  status,
  days,
}: {
  status: InventoryRow["freshnessStatus"];
  days: number | null;
}): JSX.Element {
  const c = freshnessColor(status);
  const daysLabel = days == null ? "—" : `${days}d ago`;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: T.mono,
        fontSize: 10,
      }}
    >
      <span
        style={{
          padding: "2px 6px",
          borderRadius: 2,
          border: `1px solid ${c}40`,
          background: `${c}12`,
          color: c,
          fontWeight: 600,
          letterSpacing: "0.06em",
        }}
      >
        {status}
      </span>
      <span style={{ color: T.textDim }}>{daysLabel}</span>
    </span>
  );
}

const FILTERS: StatusFilter[] = ["ALL", "HIGH", "MEDIUM", "LOW", "STALE"];

export function InventoryTable({
  brands,
  quality,
  freshness,
}: InventoryTableProps): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const rows = useMemo<InventoryRow[]>(() => {
    return brands.map((brand) => {
      const qEntry = quality.scores[brand.ticker];
      const fEntry = freshness.records[brand.ticker];
      const status: InventoryRow["freshnessStatus"] =
        fEntry?.status === "FRESH" ||
        fEntry?.status === "AGING" ||
        fEntry?.status === "STALE"
          ? fEntry.status
          : "UNKNOWN";
      return {
        brand,
        score: qEntry ? qEntry.score : null,
        layerCount: qEntry?.layer_count ?? brand.layer_count ?? 0,
        freshnessStatus: status,
        daysSinceUpdate: fEntry?.days_since_update ?? null,
      };
    });
  }, [brands, quality, freshness]);

  const filtered = useMemo<InventoryRow[]>(() => {
    let list = rows;
    if (statusFilter !== "ALL") {
      list = list.filter((r) => {
        if (statusFilter === "STALE") return r.freshnessStatus === "STALE";
        return classifyScore(r.score) === statusFilter;
      });
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.brand.ticker.toLowerCase().includes(q) ||
          r.brand.name.toLowerCase().includes(q) ||
          (r.brand.sector || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [rows, search, statusFilter]);

  const toolbarStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    flexWrap: "wrap",
  };

  const inputStyle: CSSProperties = {
    flex: 1,
    minWidth: 240,
    padding: "8px 12px",
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    color: T.text,
    fontFamily: T.mono,
    fontSize: 12,
    outline: "none",
  };

  const filterGroupStyle: CSSProperties = {
    display: "flex",
    gap: 4,
    padding: 2,
    border: `1px solid ${T.border}`,
    borderRadius: 4,
  };

  const tableContainerStyle: CSSProperties = {
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    background: T.surface,
    overflow: "auto",
    maxHeight: "70vh",
  };

  const headerStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns:
      "70px minmax(180px, 1.5fr) 110px 70px 70px 80px 70px 160px 80px",
    gap: 10,
    padding: "10px 14px",
    borderBottom: `1px solid ${T.border}`,
    background: T.bgDeep,
    fontFamily: T.mono,
    fontSize: 9,
    color: T.textDim,
    letterSpacing: "0.1em",
    position: "sticky",
    top: 0,
    zIndex: 1,
  };

  const rowStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns:
      "70px minmax(180px, 1.5fr) 110px 70px 70px 80px 70px 160px 80px",
    gap: 10,
    padding: "10px 14px",
    borderBottom: `1px solid ${T.border}`,
    fontFamily: T.mono,
    fontSize: 11,
    alignItems: "center",
  };

  return (
    <>
      <div style={toolbarStyle}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ticker, name, sector…"
          style={inputStyle}
        />
        <div style={filterGroupStyle}>
          {FILTERS.map((f) => {
            const active = statusFilter === f;
            const btn: CSSProperties = {
              padding: "6px 10px",
              border: 0,
              borderRadius: 2,
              background: active ? T.surface : "transparent",
              color: active ? T.accentBright : T.textMuted,
              fontFamily: T.mono,
              fontSize: 10,
              cursor: "pointer",
              letterSpacing: "0.06em",
            };
            return (
              <button
                key={f}
                type="button"
                onClick={() => setStatusFilter(f)}
                style={btn}
                aria-pressed={active}
              >
                {f}
              </button>
            );
          })}
        </div>
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: T.textDim,
            letterSpacing: "0.06em",
          }}
        >
          {filtered.length} of {rows.length}
        </span>
      </div>

      <div style={tableContainerStyle}>
        <div style={headerStyle}>
          <span>TICKER</span>
          <span>NAME</span>
          <span>SCORE</span>
          <span>LAYERS</span>
          <span>VOICE</span>
          <span>FINANCIAL</span>
          <span>LEGAL</span>
          <span>FRESHNESS</span>
          <span style={{ textAlign: "right" }}>ACTIONS</span>
        </div>
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              fontFamily: T.mono,
              fontSize: 11,
              color: T.textMuted,
              letterSpacing: "0.06em",
            }}
          >
            NO BRANDS MATCH THE CURRENT FILTER
          </div>
        ) : (
          filtered.map((r) => {
            const c = scoreColor(r.score);
            const layerColor =
              r.layerCount >= 8
                ? T.success
                : r.layerCount >= 6
                  ? T.warn
                  : T.error;
            return (
              <div key={r.brand.ticker} style={rowStyle}>
                <span style={{ color: T.accentBright, fontWeight: 600 }}>
                  {r.brand.ticker}
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
                  title={r.brand.name}
                >
                  {r.brand.name}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: c, fontWeight: 600 }}>
                    {r.score == null ? "—" : r.score.toFixed(0)}
                  </span>
                  <ScoreBar score={r.score} />
                </span>
                <span style={{ color: layerColor }}>{r.layerCount}/8</span>
                <span style={{ color: T.textMuted }}>
                  {r.brand.sector ? "✓" : "—"}
                </span>
                <span style={{ color: T.textMuted }}>
                  {r.layerCount >= 7 ? "✓" : "—"}
                </span>
                <span style={{ color: T.textMuted }}>
                  {r.layerCount >= 8 ? "✓" : "—"}
                </span>
                <span>
                  <FreshnessBadge
                    status={r.freshnessStatus}
                    days={r.daysSinceUpdate}
                  />
                </span>
                <span style={{ textAlign: "right" }}>
                  <Link
                    href={`/brands/${r.brand.ticker}`}
                    style={{
                      color: T.accentBright,
                      textDecoration: "none",
                      fontFamily: T.mono,
                      fontSize: 11,
                    }}
                  >
                    View →
                  </Link>
                </span>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
