"use client";

import { useState, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import {
  fetchPositioning,
} from "@/lib/api";
import type {
  ArchetypeDistribution,
  BrandSummary,
  PositioningPoint,
  SectorStats,
} from "@/lib/api";
import { T, SectionLabel, Ticker } from "@/components/ui-primitives";
import { Navigation } from "@/components/navigation";

interface AnalyticsClientProps {
  brands: BrandSummary[];
  archetypes: ArchetypeDistribution;
  sectors: SectorStats;
  defaultSector?: string;
}

const SCATTER_W = 560;
const SCATTER_H = 360;
const SCATTER_PAD = 40;

function xPos(v: number): number {
  return SCATTER_PAD + (v / 10) * (SCATTER_W - SCATTER_PAD * 2);
}

function yPos(v: number): number {
  return SCATTER_H - SCATTER_PAD - (v / 10) * (SCATTER_H - SCATTER_PAD * 2);
}

function SparklesSm({ size = 14, color = T.accentBright }: { size?: number; color?: string }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4z" />
      <path d="M19 15l.7 2L22 18l-2.3.6L19 21l-.7-2.4L16 18l2.3-1z" />
    </svg>
  );
}

function statValue(n: number, fractionDigits = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function formatUpdated(d?: string): string {
  if (!d) return "—";
  // expect YYYY-MM-DD or ISO
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return d;
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    const yr = String(dt.getFullYear()).slice(-2);
    return `${m}.${day}.${yr}`;
  } catch {
    return d;
  }
}

interface HeroStat {
  key: string;
  value: string;
}

function buildHeroStats(props: {
  brands: BrandSummary[];
  archetypes: ArchetypeDistribution;
  sectors: SectorStats;
}): HeroStat[] {
  const { brands, archetypes, sectors } = props;
  const layerVals = brands
    .map((b) => b.layer_count ?? 0)
    .filter((n) => n > 0);
  const avgLayers = layerVals.length
    ? layerVals.reduce((s, n) => s + n, 0) / layerVals.length
    : 0;
  const updates = brands
    .map((b) => b.analysis_date)
    .filter((d): d is string => Boolean(d))
    .sort();
  const latest = updates[updates.length - 1];
  return [
    { key: "BRANDS", value: statValue(brands.length) },
    { key: "SECTORS", value: statValue(sectors.sectors.length) },
    { key: "ARCHETYPES", value: statValue(archetypes.archetypes.length) },
    { key: "AVG LAYERS", value: avgLayers.toFixed(1) },
    { key: "UPDATED", value: formatUpdated(latest) },
  ];
}

export function AnalyticsClient({
  brands,
  archetypes,
  sectors,
  defaultSector,
}: AnalyticsClientProps): JSX.Element {
  const router = useRouter();
  const sectorOptions = useMemo(
    () => sectors.sectors.map((s) => s.sector).filter(Boolean),
    [sectors],
  );
  const initialSector = defaultSector && sectorOptions.includes(defaultSector)
    ? defaultSector
    : sectorOptions[0] ?? "Technology";
  const [selectedSector, setSelectedSector] = useState<string>(initialSector);
  const [points, setPoints] = useState<PositioningPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPositioning(selectedSector)
      .then((d) => {
        if (!cancelled) setPoints(d.points);
      })
      .catch(() => {
        if (!cancelled) setPoints([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedSector]);

  const heroStats = useMemo(
    () => buildHeroStats({ brands, archetypes, sectors }),
    [brands, archetypes, sectors],
  );

  // Archetype distribution: prefer server-provided list
  const archetypeBars = useMemo(() => {
    const list = archetypes.archetypes ?? [];
    const max = Math.max(1, ...list.map((a) => a.count));
    return list.map((a) => ({
      archetype: a.archetype || "—",
      count: a.count,
      percentage: a.percentage,
      width: (a.count / max) * 100,
    }));
  }, [archetypes]);

  const sectorTopArchetypes = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const s of sectors.sectors) {
      map.set(s.sector, s.top_archetypes.slice(0, 3));
    }
    return map;
  }, [sectors]);

  const sectorCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of sectors.sectors) {
      map.set(s.sector, s.count);
    }
    return map;
  }, [sectors]);

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.sans, minHeight: "100vh" }}>
      <Navigation />
      <div style={{ padding: "20px 28px" }}>
        <div
          style={{
            marginBottom: 18,
            paddingBottom: 16,
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <SectionLabel accent={T.accent}>ANALYTICS · MARKET INTELLIGENCE</SectionLabel>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 600,
              marginTop: 6,
              color: T.textBright,
              letterSpacing: "-0.02em",
            }}
          >
            Patterns across {statValue(brands.length)} S&amp;P 500 brands
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
              marginTop: 14,
            }}
          >
            {heroStats.map((s) => (
              <div
                key={s.key}
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 4,
                  padding: "10px 14px",
                }}
              >
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 9,
                    color: T.textDim,
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.key}
                </div>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 22,
                    fontWeight: 600,
                    color: T.textBright,
                    marginTop: 2,
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <PositioningCard
            sector={selectedSector}
            sectorOptions={sectorOptions}
            points={points}
            loading={loading}
            onChangeSector={setSelectedSector}
            onOpenBrand={(ticker) => router.push(`/brands/${ticker}`)}
          />
          <ArchetypeDistributionCard bars={archetypeBars} />
        </div>

        <SectorOverviewCard
          selectedSector={selectedSector}
          sectorOptions={sectorOptions}
          sectorCounts={sectorCounts}
          sectorTopArchetypes={sectorTopArchetypes}
          onSelectSector={setSelectedSector}
        />
      </div>
    </div>
  );
}

interface PositioningCardProps {
  sector: string;
  sectorOptions: string[];
  points: PositioningPoint[];
  loading: boolean;
  onChangeSector: (s: string) => void;
  onOpenBrand: (ticker: string) => void;
}

function PositioningCard({
  sector,
  sectorOptions,
  points,
  loading,
  onChangeSector,
  onOpenBrand,
}: PositioningCardProps): JSX.Element {
  const cardStyle: CSSProperties = {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    padding: 16,
  };
  const insight = useMemo(() => {
    if (points.length === 0) return null;
    const lead = points[0];
    if (!lead) return null;
    const avgX =
      points.reduce((s, p) => s + (p.formal_casual ?? 5), 0) / points.length;
    const avgY =
      points.reduce((s, p) => s + (p.restrained_bold ?? 5), 0) / points.length;
    const xLabel = avgX >= 5.5 ? "casual" : avgX <= 4.5 ? "formal" : "balanced";
    const yLabel = avgY >= 5.5 ? "bold" : avgY <= 4.5 ? "restrained" : "balanced";
    return { lead, xLabel, yLabel };
  }, [points]);

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <SectionLabel accent={T.accent}>
          POSITIONING MAP · {sector.toUpperCase()}
        </SectionLabel>
        <select
          value={sector}
          onChange={(e) => onChangeSector(e.target.value)}
          style={{
            background: T.bg,
            color: T.text,
            border: `1px solid ${T.border}`,
            borderRadius: 3,
            padding: "4px 8px",
            fontFamily: T.mono,
            fontSize: 10,
            cursor: "pointer",
          }}
        >
          {sectorOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div style={{ position: "relative", opacity: loading ? 0.5 : 1, transition: "opacity 120ms" }}>
        <svg width="100%" viewBox={`0 0 ${SCATTER_W} ${SCATTER_H}`} role="img">
          <line
            x1={SCATTER_W / 2}
            y1={SCATTER_PAD}
            x2={SCATTER_W / 2}
            y2={SCATTER_H - SCATTER_PAD}
            stroke={T.border}
            strokeDasharray="3 3"
          />
          <line
            x1={SCATTER_PAD}
            y1={SCATTER_H / 2}
            x2={SCATTER_W - SCATTER_PAD}
            y2={SCATTER_H / 2}
            stroke={T.border}
            strokeDasharray="3 3"
          />
          <text
            x={SCATTER_PAD}
            y={SCATTER_H - 12}
            style={{ fontFamily: T.mono, fontSize: 10, fill: T.textMuted }}
          >
            FORMAL
          </text>
          <text
            x={SCATTER_W - SCATTER_PAD - 50}
            y={SCATTER_H - 12}
            style={{ fontFamily: T.mono, fontSize: 10, fill: T.textMuted }}
          >
            CASUAL
          </text>
          <text
            x={10}
            y={SCATTER_PAD}
            style={{ fontFamily: T.mono, fontSize: 10, fill: T.textMuted }}
          >
            BOLD
          </text>
          <text
            x={10}
            y={SCATTER_H - SCATTER_PAD}
            style={{ fontFamily: T.mono, fontSize: 10, fill: T.textMuted }}
          >
            RESTRAINED
          </text>
          <text
            x={SCATTER_W * 0.75}
            y={SCATTER_PAD + 16}
            textAnchor="middle"
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              fill: T.textDim,
              letterSpacing: "0.1em",
            }}
          >
            BOLD CHALLENGER
          </text>
          <text
            x={SCATTER_W * 0.25}
            y={SCATTER_PAD + 16}
            textAnchor="middle"
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              fill: T.textDim,
              letterSpacing: "0.1em",
            }}
          >
            FORMAL DISRUPTOR
          </text>
          <text
            x={SCATTER_W * 0.25}
            y={SCATTER_H - SCATTER_PAD - 6}
            textAnchor="middle"
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              fill: T.textDim,
              letterSpacing: "0.1em",
            }}
          >
            INSTITUTIONAL
          </text>
          <text
            x={SCATTER_W * 0.75}
            y={SCATTER_H - SCATTER_PAD - 6}
            textAnchor="middle"
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              fill: T.textDim,
              letterSpacing: "0.1em",
            }}
          >
            EVERYDAY
          </text>
          {points.map((p) => {
            const fc = p.formal_casual ?? 5;
            const rb = p.restrained_bold ?? 5;
            const cx = xPos(fc);
            const cy = yPos(rb);
            const color = p.color || T.accent;
            return (
              <g
                key={p.ticker}
                style={{ cursor: "pointer" }}
                onClick={() => onOpenBrand(p.ticker)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={9}
                  fill={`${color}30`}
                  stroke={color}
                  strokeWidth={1.5}
                />
                <text
                  x={cx + 13}
                  y={cy + 3}
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    fill: T.text,
                  }}
                >
                  {p.ticker}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div
        style={{
          marginTop: 8,
          padding: "8px 12px",
          border: `1px solid ${T.accent}40`,
          background: `${T.accent}10`,
          borderRadius: 4,
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
        }}
      >
        <SparklesSm />
        <span style={{ fontSize: 11, color: T.text, lineHeight: 1.4 }}>
          <span style={{ color: T.accentBright, fontFamily: T.mono }}>INSIGHT · </span>
          {insight ? (
            <>
              {sector} brands cluster in the{" "}
              <span style={{ color: T.accentBright }}>
                {insight.yLabel}-{insight.xLabel}
              </span>{" "}
              quadrant.{" "}
              <Ticker size={11}>{insight.lead.ticker}</Ticker> occupies the strongest
              voice position.
            </>
          ) : (
            "No positioning data available for this sector."
          )}
        </span>
      </div>
    </div>
  );
}

interface ArchetypeBar {
  archetype: string;
  count: number;
  percentage: number;
  width: number;
}

function ArchetypeDistributionCard({ bars }: { bars: ArchetypeBar[] }): JSX.Element {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 6,
        padding: 16,
      }}
    >
      <SectionLabel accent={T.accent}>ARCHETYPE DISTRIBUTION</SectionLabel>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {bars.map((a) => (
          <div
            key={a.archetype}
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 50px",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                color: T.text,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {a.archetype}
            </span>
            <div
              style={{
                height: 14,
                background: T.bg,
                border: `1px solid ${T.border}`,
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${a.width}%`,
                  background: `linear-gradient(90deg, ${T.accent}, ${T.accentBright})`,
                  boxShadow: `inset 0 0 8px ${T.accent}80`,
                }}
              />
            </div>
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                color: T.textMuted,
                textAlign: "right",
              }}
            >
              {a.count} · {a.percentage.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SectorOverviewCardProps {
  selectedSector: string;
  sectorOptions: string[];
  sectorCounts: Map<string, number>;
  sectorTopArchetypes: Map<string, string[]>;
  onSelectSector: (s: string) => void;
}

function SectorOverviewCard({
  selectedSector,
  sectorOptions,
  sectorCounts,
  sectorTopArchetypes,
  onSelectSector,
}: SectorOverviewCardProps): JSX.Element {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 6,
        padding: 16,
      }}
    >
      <SectionLabel accent={T.accent}>SECTOR OVERVIEW</SectionLabel>
      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
        }}
      >
        {sectorOptions.map((s) => {
          const isActive = s === selectedSector;
          const top = sectorTopArchetypes.get(s) ?? [];
          const count = sectorCounts.get(s) ?? 0;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onSelectSector(s)}
              style={{
                background: isActive ? `${T.accent}10` : T.bg,
                border: `1px solid ${isActive ? `${T.accent}60` : T.border}`,
                borderRadius: 4,
                padding: 12,
                textAlign: "left",
                cursor: "pointer",
                color: T.text,
                transition: "border-color 120ms, background 120ms",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    color: T.textMuted,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {s}
                </span>
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 16,
                    fontWeight: 600,
                    color: T.textBright,
                  }}
                >
                  {count}
                </span>
              </div>
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 9,
                  color: T.textDim,
                  letterSpacing: "0.04em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                TOP: {top.length > 0 ? top.join(" · ") : "—"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
