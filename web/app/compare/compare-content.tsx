"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { CSSProperties } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchBrand, fetchBrands, fetchCompareDesignMd } from "@/lib/api";
import type { BrandDetail, BrandSummary, CompareDesignMdEntry } from "@/lib/api";
import {
  T,
  Ticker,
  SectionLabel,
  VoiceMini,
  ConfidenceBadge,
} from "@/components/ui-primitives";
import type { ConfidenceLevel } from "@/components/ui-primitives";
import { TickerSelector } from "@/components/ticker-selector";
import { CompareTable, exportCSV } from "@/components/compare-table";

const SLOT_LETTERS = ["A", "B", "C", "D"] as const;

const VOICE_KEYS = [
  "formal_casual",
  "authority_peer",
  "emotional_rational",
  "restrained_bold",
] as const;

type Slots = Array<BrandDetail | null>;
type CompareMode = "voice" | "strategy" | "design" | "prompt";

function voiceArray(brand: BrandDetail): number[] {
  return VOICE_KEYS.map((k) => brand.voice_matrix?.[k] ?? 5);
}

function brandPrimaryColor(brand: BrandDetail): string {
  return brand.colors[0]?.hex ?? T.accent;
}

function availableLayers(brand: BrandDetail): number {
  return brand.layers?.filter((l) => l.available).length ?? 0;
}

function brandConfidence(brand: BrandDetail): ConfidenceLevel {
  const layers = availableLayers(brand);
  if (layers >= 7) return "HIGH";
  if (layers >= 4) return "MEDIUM";
  return "LOW";
}

function PlusIcon({ size = 20, color = T.textMuted }: { size?: number; color?: string }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CloseIcon({ size = 11, color = T.textMuted }: { size?: number; color?: string }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CompareIconLg({ size = 28, color = T.textDim }: { size?: number; color?: string }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3h5v5M4 20l16.2-16.2M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </svg>
  );
}

function SparklesIcon({ size = 18, color = T.accentBright }: { size?: number; color?: string }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4z" />
      <path d="M19 15l.7 2L22 18l-2.3.6L19 21l-.7-2.4L16 18l2.3-1z" />
    </svg>
  );
}

interface RadarOverlayProps {
  brands: BrandDetail[];
  size?: number;
}

function RadarOverlay({ brands, size = 280 }: RadarOverlayProps): JSX.Element {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36;
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
  const labels = ["FORMAL↔CASUAL", "AUTHORITY↔PEER", "EMOTIONAL↔RATIONAL", "RESTRAINED↔BOLD"];

  return (
    <svg width={size} height={size}>
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon
          key={s}
          points={angles.map((a) => `${cx + Math.cos(a) * r * s},${cy + Math.sin(a) * r * s}`).join(" ")}
          fill="none"
          stroke={T.border}
          strokeWidth={1}
        />
      ))}
      {angles.map((a, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(a) * r}
          y2={cy + Math.sin(a) * r}
          stroke={T.border}
          strokeWidth={1}
        />
      ))}
      {brands.map((b) => {
        const voice = voiceArray(b);
        const color = brandPrimaryColor(b);
        const points = voice.map((v, i) => {
          const rr = (v / 10) * r;
          const angle = angles[i] ?? 0;
          return [cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr];
        });
        const poly = points.map((p) => p.join(",")).join(" ");
        return (
          <g key={b.ticker}>
            <polygon points={poly} fill={`${color}25`} stroke={color} strokeWidth={2} />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p[0]}
                cy={p[1]}
                r={3}
                fill={color}
                stroke={T.bg}
                strokeWidth={1.5}
              />
            ))}
          </g>
        );
      })}
      {labels.map((lbl, i) => {
        const a = angles[i];
        if (a === undefined) return null;
        const lr = r + 22;
        const x = cx + Math.cos(a) * lr;
        const y = cy + Math.sin(a) * lr;
        const anchor = Math.cos(a) > 0.3 ? "start" : Math.cos(a) < -0.3 ? "end" : "middle";
        return (
          <text
            key={lbl}
            x={x}
            y={y + 3}
            textAnchor={anchor}
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              fill: T.textMuted,
              letterSpacing: "0.04em",
            }}
          >
            {lbl}
          </text>
        );
      })}
    </svg>
  );
}

interface SlotCardProps {
  brand: BrandDetail | null;
  letter: string;
  onAdd: () => void;
  onRemove: () => void;
}

function SlotCard({ brand, letter, onAdd, onRemove }: SlotCardProps): JSX.Element {
  if (!brand) {
    const buttonStyle: CSSProperties = {
      width: "100%",
      border: `1px dashed ${T.border}`,
      borderRadius: 6,
      height: 130,
      background: T.surface,
      color: T.textMuted,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      transition: "border-color 120ms",
    };
    return (
      <button
        type="button"
        onClick={onAdd}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = T.accent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = T.border;
        }}
      >
        <PlusIcon />
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            letterSpacing: "0.06em",
          }}
        >
          SLOT {letter} · ADD BRAND
        </span>
      </button>
    );
  }
  const color = brandPrimaryColor(brand);
  return (
    <div
      style={{
        border: `1px solid ${T.border}`,
        borderRadius: 6,
        overflow: "hidden",
        background: T.surface,
        position: "relative",
      }}
    >
      <div style={{ height: 6, background: color }} />
      <div style={{ padding: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              color: T.textDim,
              letterSpacing: "0.1em",
            }}
          >
            SLOT {letter}
          </span>
          <button
            type="button"
            aria-label={`Remove ${brand.ticker}`}
            onClick={onRemove}
            style={{
              border: 0,
              background: "transparent",
              cursor: "pointer",
              color: T.textMuted,
              padding: 2,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <Ticker color={T.accentBright} size={12}>
          {brand.ticker}
        </Ticker>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: T.textBright,
            marginTop: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {brand.name}
        </div>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 9,
            color: T.textMuted,
            marginTop: 4,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {brand.sector || "—"}
        </div>
        <div
          style={{
            marginTop: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <VoiceMini voice={voiceArray(brand)} color={color} size="xs" />
          <ConfidenceBadge level={brandConfidence(brand)} size="xs" />
        </div>
      </div>
    </div>
  );
}

interface CompareContentProps {
  brands: BrandSummary[];
}

export function CompareContent({ brands }: CompareContentProps): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const routerRef = useRef(router);
  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  const [slots, setSlots] = useState<Slots>([null, null, null, null]);
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [compareMode, setCompareMode] = useState<CompareMode>("voice");
  const [designComparison, setDesignComparison] = useState<Record<string, CompareDesignMdEntry>>({});
  const initialLoadRef = useRef(false);

  const updateUrl = useCallback((next: Slots) => {
    const sp = new URLSearchParams();
    const filled = next.filter((b): b is BrandDetail => b !== null);
    if (filled[0]) sp.set("a", filled[0].ticker);
    if (filled[1]) sp.set("b", filled[1].ticker);
    if (filled[2]) sp.set("c", filled[2].ticker);
    if (filled[3]) sp.set("d", filled[3].ticker);
    const qs = sp.toString();
    routerRef.current.replace(qs ? `/compare?${qs}` : "/compare", { scroll: false });
  }, []);

  const loadBrand = useCallback(async (ticker: string): Promise<BrandDetail | null> => {
    try {
      return await fetchBrand(ticker.toUpperCase());
    } catch {
      setError(`Could not load ${ticker.toUpperCase()}.`);
      return null;
    }
  }, []);

  // Initial URL hydration — runs once
  useEffect(() => {
    if (initialLoadRef.current) return;
    initialLoadRef.current = true;
    const tickers = ["a", "b", "c", "d"]
      .map((k) => searchParams.get(k))
      .filter((v): v is string => Boolean(v));
    if (tickers.length === 0) return;
    void (async () => {
      const details = await Promise.all(tickers.map((t) => loadBrand(t)));
      const next: Slots = [null, null, null, null];
      let i = 0;
      for (const d of details) {
        if (d) next[i++] = d;
      }
      setSlots(next);
    })();
  }, [searchParams, loadBrand]);

  const handleAdd = useCallback(
    async (slotIdx: number, brand: BrandSummary) => {
      const detail = await loadBrand(brand.ticker);
      if (!detail) return;
      setSlots((prev) => {
        // place in requested slot if empty, otherwise first empty slot
        const next = [...prev];
        if (next[slotIdx] === null) {
          next[slotIdx] = detail;
        } else {
          const empty = next.findIndex((s) => s === null);
          if (empty === -1) return prev;
          next[empty] = detail;
        }
        updateUrl(next);
        return next;
      });
      setError("");
    },
    [loadBrand, updateUrl],
  );

  const handleRemove = useCallback(
    (idx: number) => {
      setSlots((prev) => {
        const next = [...prev];
        next[idx] = null;
        updateUrl(next);
        return next;
      });
    },
    [updateUrl],
  );

  const handleRemoveByTicker = useCallback(
    (ticker: string) => {
      setSlots((prev) => {
        const idx = prev.findIndex((b) => b?.ticker === ticker);
        if (idx === -1) return prev;
        const next = [...prev];
        next[idx] = null;
        updateUrl(next);
        return next;
      });
    },
    [updateUrl],
  );

  const filled = useMemo(() => slots.filter((b): b is BrandDetail => b !== null), [slots]);
  const hasResults = filled.length >= 2;

  useEffect(() => {
    if (filled.length < 2) {
      setDesignComparison({});
      return;
    }
    let cancelled = false;
    void fetchCompareDesignMd(filled[0].ticker, filled[1].ticker, filled[2]?.ticker, filled[3]?.ticker)
      .then((data) => { if (!cancelled) setDesignComparison(data); })
      .catch(() => { if (!cancelled) setDesignComparison({}); });
    return () => { cancelled = true; };
  }, [filled]);

  const insightLine = useMemo(() => {
    if (filled.length < 2) return null;
    const a = filled[0];
    const b = filled[1];
    const va = a.voice_matrix?.restrained_bold ?? 5;
    const vb = b.voice_matrix?.restrained_bold ?? 5;
    return { a, b, va, vb };
  }, [filled]);

  return (
    <div className="app-backdrop" style={{ color: T.text, fontFamily: T.sans, minHeight: "calc(100vh - 48px)" }}>
      <div style={{ padding: "22px 28px 44px", maxWidth: 1480, margin: "0 auto" }}>
        <div
          className="terminal-panel"
          style={{
            marginBottom: 16,
            padding: "20px 22px",
            borderRadius: 10,
            borderTop: `2px solid ${T.accent}`,
          }}
        >
          <SectionLabel accent={T.accent}>COMPARE · 2-4 BRANDS</SectionLabel>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 600,
              marginTop: 6,
              color: T.textBright,
              letterSpacing: "-0.02em",
            }}
          >
            Side-by-side Brand Comparison
          </h1>
          <p style={{ marginTop: 4, color: T.textMuted, fontSize: 13 }}>
            Stack up to 4 brands. Voice and archetype overlay highlights divergence. Export CSV for executive briefings.
          </p>
        </div>

        {error && (
          <div
            style={{
              marginBottom: 12,
              padding: "8px 12px",
              border: `1px solid ${T.error}40`,
              background: `${T.error}12`,
              color: T.error,
              fontFamily: T.mono,
              fontSize: 11,
              borderRadius: 4,
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginBottom: 18,
          }}
        >
          {slots.map((b, i) => (
            <SlotCard
              key={i}
              brand={b}
              letter={SLOT_LETTERS[i] ?? ""}
              onAdd={() => setPickerSlot(i)}
              onRemove={() => handleRemove(i)}
            />
          ))}
        </div>

        {!hasResults ? (
          <div
            style={{
              border: `1px dashed ${T.border}`,
              borderRadius: 6,
              padding: 60,
              textAlign: "center",
              background: T.surface,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CompareIconLg />
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                marginTop: 10,
                color: T.text,
              }}
            >
              Add at least 2 brands to begin comparison
            </div>
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                color: T.textMuted,
                marginTop: 6,
                letterSpacing: "0.06em",
              }}
            >
              ⌘K TO SEARCH · OR PASTE TICKERS
            </div>
          </div>
        ) : (
          <>
            {insightLine && (
              <div
                style={{
                  border: `1px solid ${T.accent}40`,
                  background: `${T.accent}10`,
                  borderRadius: 6,
                  padding: "12px 16px",
                  marginBottom: 16,
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <SparklesIcon />
                <div>
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 9,
                      color: T.accentBright,
                      letterSpacing: "0.12em",
                      marginBottom: 4,
                    }}
                  >
                    INTELLIGENCE SUMMARY
                  </div>
                  <p style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>
                    <span style={{ color: T.accentBright, fontWeight: 600 }}>
                      {insightLine.a.ticker}
                    </span>{" "}
                    ({insightLine.a.archetype_primary || "—"}) diverges sharply from{" "}
                    <span style={{ color: T.accentBright, fontWeight: 600 }}>
                      {insightLine.b.ticker}
                    </span>{" "}
                    ({insightLine.b.archetype_primary || "—"}) on the{" "}
                    <span style={{ color: T.warn }}>Restrained↔Bold</span> axis ({insightLine.va} vs {insightLine.vb}).
                    {filled.length >= 3 && (
                      <>
                        {" "}
                        All compared brands cluster in the{" "}
                        <span style={{ color: T.success }}>Authority-led</span> messaging quadrant.
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 12,
              }}
            >
              <button
                type="button"
                onClick={() => exportCSV(filled)}
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  color: T.textMuted,
                  padding: "6px 12px",
                  borderRadius: 4,
                  fontFamily: T.mono,
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                }}
              >
                EXPORT CSV
              </button>
            </div>


            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              {([
                ["voice", "Voice Radar"],
                ["strategy", "Strategy Table"],
                ["design", "Design System"],
                ["prompt", "Agent Prompt Diff"],
              ] as const).map(([mode, label]) => (
                <button key={mode} type="button" onClick={() => setCompareMode(mode)} style={{ background: compareMode === mode ? `${T.accent}18` : T.surface, border: `1px solid ${compareMode === mode ? T.accent : T.border}`, color: compareMode === mode ? T.accentBright : T.textMuted, borderRadius: 4, padding: "6px 10px", fontFamily: T.mono, fontSize: 10, cursor: "pointer" }}>
                  {label.toUpperCase()}
                </button>
              ))}
            </div>
            {compareMode === "design" || compareMode === "prompt" ? (
              <DesignSystemCompare brands={filled} designComparison={designComparison} promptMode={compareMode === "prompt"} />
            ) : (
            <div style={{ display: "grid", gridTemplateColumns: compareMode === "voice" ? "320px 1fr" : "1fr", gap: 16 }}>
              {compareMode === "voice" && <div
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 6,
                  padding: 16,
                }}
              >
                <SectionLabel accent={T.accent}>VOICE OVERLAY</SectionLabel>
                <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
                  <RadarOverlay brands={filled} size={280} />
                </div>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {filled.map((b) => (
                    <div
                      key={b.ticker}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: T.mono,
                        fontSize: 10,
                      }}
                    >
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          background: brandPrimaryColor(b),
                          borderRadius: 1,
                        }}
                      />
                      <Ticker size={10}>{b.ticker}</Ticker>
                      <span
                        style={{
                          color: T.text,
                          fontFamily: T.sans,
                          fontSize: 11,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {b.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>}

              <CompareTable brands={filled} onRemove={handleRemoveByTicker} />
            </div>
            )}
          </>
        )}
      </div>

      {pickerSlot !== null && (
        <TickerSelector
          brands={brands.filter(
            (b) => !slots.some((s) => s?.ticker === b.ticker),
          )}
          onSelect={(b) => {
            void handleAdd(pickerSlot, b);
          }}
          onClose={() => setPickerSlot(null)}
        />
      )}
    </div>
  );
}


interface DesignSystemCompareProps {
  brands: BrandDetail[];
  designComparison: Record<string, CompareDesignMdEntry>;
  promptMode: boolean;
}

function DesignSystemCompare({ brands, designComparison, promptMode }: DesignSystemCompareProps): JSX.Element {
  const cols = `170px repeat(${brands.length}, 1fr)`;
  const rows: Array<[string, (entry: CompareDesignMdEntry | undefined) => JSX.Element | string]> = promptMode
    ? [["Agent Prompt", (e) => e?.agent_prompt_guide || "N/A"]]
    : [
        ["Visual Archetype", (e) => e?.visual_archetype || "N/A"],
        ["Color Temperature", (e) => e?.color_temperature || "N/A"],
        ["Density", (e) => e?.density || "N/A"],
        ["Surface Model", (e) => e?.surface_model || "N/A"],
        ["Primary Color", (e) => e?.primary_color ? <><span style={{ width: 14, height: 14, background: e.primary_color, borderRadius: 2, display: "inline-block" }} /> {e.primary_color}</> : "N/A"],
        ["Design Readiness", (e) => e?.has_design_md ? `${e.design_readiness_score} ${e.design_readiness_grade}` : "N/A"],
      ];
  const a = designComparison[brands[0]?.ticker ?? ""];
  const b = designComparison[brands[1]?.ticker ?? ""];
  const insight = a?.visual_archetype && b?.visual_archetype && a.visual_archetype !== b.visual_archetype
    ? `${brands[0].ticker} opts for ${a.visual_archetype}, while ${brands[1].ticker} uses ${b.visual_archetype}.`
    : "Compared brands share similar design-system authority signals or lack DESIGN.md coverage.";
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div style={{ padding: 14, borderBottom: `1px solid ${T.border}`, background: T.bgDeep }}>
        <SectionLabel accent={T.accent}>{promptMode ? "AGENT PROMPT DIFF" : "DESIGN SYSTEM COMPARISON"}</SectionLabel>
        <p style={{ margin: "8px 0 0", color: T.textSecondary, fontSize: 12 }}>{insight}</p>
      </div>
      {rows.map(([label, render], i) => (
        <div key={label} style={{ display: "grid", gridTemplateColumns: cols, gap: 10, padding: 12, borderBottom: `1px solid ${T.border}`, background: i % 2 ? T.bgDeep : "transparent", fontFamily: T.mono, fontSize: 11 }}>
          <span style={{ color: T.textMuted }}>{label}</span>
          {brands.map((brand) => <span key={brand.ticker} style={{ color: T.text, display: "inline-flex", gap: 6, alignItems: "flex-start", lineHeight: 1.5 }}>{render(designComparison[brand.ticker])}</span>)}
        </div>
      ))}
    </div>
  );
}
