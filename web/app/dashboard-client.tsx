"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, type CSSProperties, type MouseEvent } from "react";
import type { BrandSummary } from "@/lib/api";
import {
  BrandCardHybrid,
  BrandCardIdentity,
  BrandCardRow,
} from "@/components/brand-card";
import { BrandSearch } from "@/components/brand-search";
import { SectionLabel, T } from "@/components/ui-primitives";

type CardVariant = "hybrid" | "row" | "identity";

interface DashboardClientProps {
  brands: BrandSummary[];
  totalBrands: number;
  initialQ: string;
  initialSector: string;
  initialArchetype: string;
  initialView: string;
}

interface ArchetypeCount {
  archetype: string;
  count: number;
}

interface FilterSidebarProps {
  sectorCounts: Record<string, number>;
  archetypeCounts: ArchetypeCount[];
  selectedSector: string | null;
  selectedArchetype: string | null;
  onSelectSector: (s: string | null) => void;
  onSelectArchetype: (a: string | null) => void;
  designReadyOnly: boolean;
  designReadyStrict: boolean;
  selectedVisualArchetype: string;
  visualArchetypes: string[];
  onToggleDesignReadyOnly: () => void;
  onToggleDesignReadyStrict: () => void;
  onSelectVisualArchetype: (a: string) => void;
}

const ChevronDown = (): JSX.Element => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke={T.textDim}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const XIcon = (): JSX.Element => (
  <svg
    width={9}
    height={9}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DownloadIcon = (): JSX.Element => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

function FilterSidebar({
  sectorCounts,
  archetypeCounts,
  selectedSector,
  selectedArchetype,
  onSelectSector,
  onSelectArchetype,
  designReadyOnly,
  designReadyStrict,
  selectedVisualArchetype,
  visualArchetypes,
  onToggleDesignReadyOnly,
  onToggleDesignReadyStrict,
  onSelectVisualArchetype,
}: FilterSidebarProps): JSX.Element {
  const itemBase: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "5px 8px",
    borderRadius: 3,
    border: 0,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: T.mono,
    fontSize: 11,
  };

  const sectionTitle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 8px",
    marginBottom: 6,
  };

  const sectionTitleText: CSSProperties = {
    fontFamily: T.mono,
    fontSize: 9,
    color: T.textDim,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 600,
  };

  const renderItem = (label: string, count: number, selected: boolean, onClick: () => void): JSX.Element => (
    <button
      key={label}
      onClick={onClick}
      style={{
        ...itemBase,
        background: selected ? `${T.accent}15` : "transparent",
        color: selected ? T.accentBright : T.textSecondary,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
        {selected && (
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: 1,
              background: T.accent,
              flexShrink: 0,
            }}
          />
        )}
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </span>
      <span
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          color: selected ? T.accentBright : T.textDim,
          flexShrink: 0,
          marginLeft: 6,
        }}
      >
        {count}
      </span>
    </button>
  );

  const sidebarStyle: CSSProperties = {
    width: 240,
    flexShrink: 0,
    borderRight: `1px solid ${T.border}`,
    background: T.bgDeep,
    padding: "14px 8px",
    overflow: "auto",
  };

  const chip = (label: string, onClear: () => void): JSX.Element => (
    <span
      onClick={onClear}
      style={{
        fontFamily: T.mono,
        fontSize: 10,
        padding: "2px 6px",
        background: `${T.accent}20`,
        color: T.accentBright,
        borderRadius: 2,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
      }}
    >
      {label}
      <XIcon />
    </span>
  );

  const sortedSectors = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1]);

  return (
    <aside style={sidebarStyle} aria-label="Filters">
      <div style={{ padding: "0 8px 12px", borderBottom: `1px solid ${T.border}`, marginBottom: 14 }}>
        <SectionLabel accent={T.accent}>Filters</SectionLabel>
        <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {selectedSector && chip(selectedSector, () => onSelectSector(null))}
          {selectedArchetype && chip(selectedArchetype, () => onSelectArchetype(null))}
          {!selectedSector && !selectedArchetype && !designReadyOnly && !designReadyStrict && !selectedVisualArchetype && (
            <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim }}>No filters active</span>
          )}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={sectionTitle}>
          <span style={sectionTitleText}>SECTOR</span>
          <ChevronDown />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {sortedSectors.map(([s, c]) =>
            renderItem(s, c, selectedSector === s, () => onSelectSector(selectedSector === s ? null : s)),
          )}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={sectionTitle}>
          <span style={sectionTitleText}>DESIGN.md</span>
          <ChevronDown />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 8px" }}>
          <label style={{ fontFamily: T.mono, fontSize: 10, color: T.textSecondary, display: "flex", gap: 6 }}>
            <input type="checkbox" checked={designReadyOnly} onChange={onToggleDesignReadyOnly} /> DESIGN.md Ready only
          </label>
          <label style={{ fontFamily: T.mono, fontSize: 10, color: T.textSecondary, display: "flex", gap: 6 }}>
            <input type="checkbox" checked={designReadyStrict} onChange={onToggleDesignReadyStrict} /> DESIGN_READY only
          </label>
          <select value={selectedVisualArchetype} onChange={(e) => onSelectVisualArchetype(e.target.value)} style={{ background: T.bg, color: T.text, border: `1px solid ${T.border}`, borderRadius: 3, padding: 6, fontFamily: T.mono, fontSize: 10 }}>
            <option value="">All visual archetypes</option>
            {visualArchetypes.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={sectionTitle}>
          <span style={sectionTitleText}>ARCHETYPE</span>
          <ChevronDown />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {archetypeCounts.slice(0, 12).map(({ archetype, count }) =>
            renderItem(archetype, count, selectedArchetype === archetype, () =>
              onSelectArchetype(selectedArchetype === archetype ? null : archetype),
            ),
          )}
        </div>
      </div>
    </aside>
  );
}

interface StatCard {
  label: string;
  value: string;
  delta?: string;
}

function StatCards({ cards }: { cards: StatCard[] }): JSX.Element {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {cards.map((s) => (
        <div
          key={s.label}
          style={{
            border: `1px solid ${T.border}`,
            borderRadius: 4,
            padding: "8px 14px",
            minWidth: 90,
            background: T.surface,
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
            {s.label}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 }}>
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 20,
                fontWeight: 600,
                color: T.textBright,
              }}
            >
              {s.value}
            </span>
            {s.delta && (
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.success }}>▲ {s.delta}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function todayStamp(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const min = String(d.getUTCMinutes()).padStart(2, "0");
  return `${mm}.${dd}.${yy} ${hh}:${min} UTC`;
}

function normalizeView(v: string): CardVariant {
  return v === "row" || v === "identity" ? v : "hybrid";
}

export function DashboardClient({
  brands,
  totalBrands,
  initialQ,
  initialSector,
  initialArchetype,
  initialView,
}: DashboardClientProps): JSX.Element {
  const router = useRouter();
  const [searchQ, setSearchQ] = useState(initialQ);
  const [selectedSector, setSelectedSector] = useState<string | null>(initialSector || null);
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(initialArchetype || null);
  const [cardVariant, setCardVariant] = useState<CardVariant>(normalizeView(initialView));
  const [designReadyOnly, setDesignReadyOnly] = useState(false);
  const [designReadyStrict, setDesignReadyStrict] = useState(false);
  const [selectedVisualArchetype, setSelectedVisualArchetype] = useState("");

  // Derived: sector counts
  const sectorCounts = useMemo<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    for (const b of brands) {
      const s = b.sector || "Unknown";
      counts[s] = (counts[s] ?? 0) + 1;
    }
    return counts;
  }, [brands]);

  // Derived: archetype counts
  const archetypeCounts = useMemo<ArchetypeCount[]>(() => {
    const counts: Record<string, number> = {};
    for (const b of brands) {
      const a = b.archetype_primary;
      if (!a) continue;
      counts[a] = (counts[a] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([archetype, count]) => ({ archetype, count }))
      .sort((a, b) => b.count - a.count);
  }, [brands]);

  const visualArchetypes = useMemo(() => Array.from(new Set(brands.map((b) => b.visual_archetype).filter((v): v is string => Boolean(v) && v !== "Unclassified"))).sort(), [brands]);
  const designReadyCount = useMemo(() => brands.filter((b) => b.design_readiness_grade === "DESIGN_READY" || b.design_readiness_grade === "PARTIAL").length, [brands]);

  // Derived: filtered list
  const filtered = useMemo<BrandSummary[]>(() => {
    let list = brands;
    if (selectedSector) list = list.filter((b) => b.sector === selectedSector);
    if (selectedArchetype) list = list.filter((b) => b.archetype_primary === selectedArchetype);
    if (designReadyOnly) list = list.filter((b) => b.design_readiness_grade === "DESIGN_READY" || b.design_readiness_grade === "PARTIAL");
    if (designReadyStrict) list = list.filter((b) => b.design_readiness_grade === "DESIGN_READY");
    if (selectedVisualArchetype) list = list.filter((b) => b.visual_archetype === selectedVisualArchetype);
    if (searchQ) {
      const q = searchQ.toLowerCase();
      list = list.filter(
        (b) =>
          b.ticker.toLowerCase().includes(q) ||
          b.name.toLowerCase().includes(q) ||
          (b.sector || "").toLowerCase().includes(q) ||
          (b.archetype_primary || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [brands, selectedSector, selectedArchetype, designReadyOnly, designReadyStrict, selectedVisualArchetype, searchQ]);

  const openBrand = useCallback(
    (ticker: string): void => {
      router.push(`/brands/${ticker}`);
    },
    [router],
  );

  const handleResetFilters = useCallback((): void => {
    setSelectedSector(null);
    setSelectedArchetype(null);
    setSearchQ("");
    setDesignReadyOnly(false);
    setDesignReadyStrict(false);
    setSelectedVisualArchetype("");
  }, []);

  const stats: StatCard[] = useMemo(
    () => [
      { label: "BRANDS", value: String(totalBrands), delta: "+2 wk" },
      { label: "SECTORS", value: String(Object.keys(sectorCounts).length) },
      { label: "ARCHETYPES", value: String(archetypeCounts.length) },
      { label: "DESIGN.md", value: String(designReadyCount) },
      {
        label: "AVG LAYERS",
        value: brands.length
          ? (
              brands.reduce((acc, b) => acc + (b.layer_count ?? 0), 0) / brands.length
            ).toFixed(1)
          : "0.0",
      },
    ],
    [totalBrands, sectorCounts, archetypeCounts.length, brands, designReadyCount],
  );

  const today = todayStamp();

  const pageStyle: CSSProperties = {
    background: T.bg,
    color: T.text,
    fontFamily: T.sans,
    minHeight: "calc(100vh - 48px)",
  };

  const heroBarStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 18,
    paddingBottom: 16,
    borderBottom: `1px solid ${T.border}`,
    gap: 16,
    flexWrap: "wrap",
  };

  const toolbarStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
    flexWrap: "wrap",
  };

  const variantToggleStyle: CSSProperties = {
    display: "flex",
    gap: 4,
    padding: 2,
    border: `1px solid ${T.border}`,
    borderRadius: 4,
  };

  const exportButtonStyle: CSSProperties = {
    padding: "6px 12px",
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    background: T.surface,
    color: T.text,
    fontFamily: T.mono,
    fontSize: 11,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
  };

  const variants: CardVariant[] = ["hybrid", "row", "identity"];

  return (
    <div style={pageStyle}>
      <div style={{ display: "flex", minHeight: "calc(100vh - 48px)" }}>
        <FilterSidebar
          sectorCounts={sectorCounts}
          archetypeCounts={archetypeCounts}
          selectedSector={selectedSector}
          selectedArchetype={selectedArchetype}
          onSelectSector={setSelectedSector}
          onSelectArchetype={setSelectedArchetype}
          designReadyOnly={designReadyOnly}
          designReadyStrict={designReadyStrict}
          selectedVisualArchetype={selectedVisualArchetype}
          visualArchetypes={visualArchetypes}
          onToggleDesignReadyOnly={() => setDesignReadyOnly((v) => !v)}
          onToggleDesignReadyStrict={() => setDesignReadyStrict((v) => !v)}
          onSelectVisualArchetype={setSelectedVisualArchetype}
        />

        <div style={{ flex: 1, padding: "20px 28px", overflow: "hidden", minWidth: 0 }}>
          {/* Hero / status bar */}
          <div style={heroBarStyle}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    color: T.success,
                    letterSpacing: "0.1em",
                  }}
                >
                  ● LIVE INDEX
                </span>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim }}>
                  / S&P 500 · 8 LAYERS · UPDATED {today}
                </span>
              </div>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: T.textBright,
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Brand Intelligence Console
              </h1>
              <p
                style={{
                  marginTop: 6,
                  color: T.textMuted,
                  fontSize: 13,
                  maxWidth: 540,
                }}
              >
                Search, filter and dissect {totalBrands} S&P 500 brand strategies across 8 layers — Identity,
                Audience, Competitive, Content DNA, Design System, Channels, Financials, Legal. DESIGN.md ready: {designReadyCount}.
              </p>
            </div>
            <StatCards cards={stats} />
          </div>

          {/* Search + toolbar */}
          <div style={toolbarStyle}>
            <div style={{ flex: 1, minWidth: 240, display: "flex" }}>
              <BrandSearch
                value={searchQ}
                onChange={setSearchQ}
                resultLabel={`${filtered.length} of ${totalBrands}`}
              />
            </div>
            <div style={variantToggleStyle}>
              {variants.map((v) => {
                const active = cardVariant === v;
                const variantBtn: CSSProperties = {
                  padding: "5px 9px",
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
                    key={v}
                    type="button"
                    onClick={() => setCardVariant(v)}
                    style={variantBtn}
                    aria-pressed={active}
                  >
                    {v.toUpperCase()}
                  </button>
                );
              })}
            </div>
            <button type="button" style={exportButtonStyle}>
              <DownloadIcon /> EXPORT
            </button>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <EmptyState onReset={handleResetFilters} />
          ) : cardVariant === "row" ? (
            <RowList brands={filtered} onOpen={openBrand} />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  cardVariant === "identity"
                    ? "repeat(auto-fill, minmax(220px, 1fr))"
                    : "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 12,
              }}
            >
              {filtered.map((b) => {
                if (cardVariant === "identity") {
                  return <BrandCardIdentity key={b.ticker} brand={b} onClick={() => openBrand(b.ticker)} />;
                }
                return <BrandCardHybrid key={b.ticker} brand={b} onClick={() => openBrand(b.ticker)} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface RowListProps {
  brands: BrandSummary[];
  onOpen: (ticker: string) => void;
}

function RowList({ brands, onOpen }: RowListProps): JSX.Element {
  const containerStyle: CSSProperties = {
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    background: T.surface,
    overflow: "hidden",
  };

  const headerStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "70px 1fr 130px 120px 130px 90px 100px 80px",
    gap: 10,
    padding: "8px 14px",
    borderBottom: `1px solid ${T.border}`,
    background: T.bgDeep,
    fontFamily: T.mono,
    fontSize: 9,
    color: T.textDim,
    letterSpacing: "0.1em",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span>TICKER</span>
        <span>NAME</span>
        <span>SECTOR</span>
        <span>ARCHETYPE</span>
        <span>VISUAL</span>
        <span>VOICE</span>
        <span>LAYERS</span>
        <span>CONF.</span>
      </div>
      {brands.map((b) => (
        <BrandCardRow key={b.ticker} brand={b} onClick={() => onOpen(b.ticker)} />
      ))}
    </div>
  );
}

interface EmptyStateProps {
  onReset: () => void;
}

function EmptyState({ onReset }: EmptyStateProps): JSX.Element {
  const containerStyle: CSSProperties = {
    border: `1px dashed ${T.border}`,
    borderRadius: 6,
    padding: "60px 20px",
    textAlign: "center",
    background: T.surface,
  };

  const buttonStyle: CSSProperties = {
    padding: "8px 16px",
    border: `1px solid ${T.accent}`,
    borderRadius: 4,
    background: `${T.accent}20`,
    color: T.accentBright,
    fontFamily: T.mono,
    fontSize: 11,
    cursor: "pointer",
  };

  const handleEnter = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.background = `${T.accent}30`;
  };
  const handleLeave = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.background = `${T.accent}20`;
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          fontSize: 36,
          color: T.textDim,
          fontFamily: T.mono,
          marginBottom: 8,
        }}
      >
        —
      </div>
      <div style={{ fontSize: 14, color: T.text, fontWeight: 500, marginBottom: 4 }}>
        No brands match your query
      </div>
      <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 20 }}>
        Try clearing filters or searching by ticker
      </div>
      <button
        type="button"
        onClick={onReset}
        style={buttonStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        RESET FILTERS
      </button>
    </div>
  );
}
