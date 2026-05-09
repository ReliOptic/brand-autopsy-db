"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { LayerViewer } from "@/components/layer-viewer";
import { fetchLayer } from "@/lib/api";
import type { LayerInfo } from "@/lib/api";
import { SectionLabel, T } from "@/components/ui-primitives";

const LAYER_NAMES = [
  "IDENTITY",
  "AUDIENCE",
  "COMPETITIVE",
  "CONTENT DNA",
  "DESIGN SYSTEM",
  "CHANNEL PLAYBOOK",
  "FINANCIALS",
  "LEGAL",
];

interface BrandTabsProps {
  ticker: string;
  layers: LayerInfo[];
  activeLayer: number;
  initialContent: string;
  initialLayerName: string;
  similarSlot?: ReactNode;
}

export function BrandTabs({
  ticker,
  layers,
  activeLayer,
  initialContent,
  initialLayerName,
  similarSlot,
}: BrandTabsProps): JSX.Element {
  const [selectedLayer, setSelectedLayer] = useState<number>(activeLayer);
  const [content, setContent] = useState<string>(initialContent);
  const [layerName, setLayerName] = useState<string>(initialLayerName);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelect = async (num: number): Promise<void> => {
    const target = layers.find((l) => l.num === num);
    if (!target?.available) return;
    setSelectedLayer(num);
    setLoading(true);
    try {
      const data = await fetchLayer(ticker, num);
      setContent(data.content);
      setLayerName(data.layer_name);
    } catch {
      setContent("");
      setLayerName("");
    } finally {
      setLoading(false);
    }
  };

  const layerByNum = (n: number): LayerInfo | undefined =>
    layers.find((l) => l.num === n);

  return (
    <div
      role="tablist"
      aria-label="Brand analysis layers"
      style={{ display: "contents" }}
    >
      <aside style={{ display: "flex", flexDirection: "column", gap: 22 }}>

        <div>
          <SectionLabel accent={T.accent}>PRODUCT TABS</SectionLabel>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 1 }}>
            {["Overview", "Layers", "Visual System", "DESIGN.md", "Similar", "Exports"].map((name) => {
              const href = name === "DESIGN.md" ? `/brands/${ticker}/design-md` : name === "Overview" ? `/brands/${ticker}` : `#brand-layer-panel`;
              return (
                <a key={name} href={href} style={{ padding: "7px 10px", color: name === "DESIGN.md" ? T.accentBright : T.textMuted, fontFamily: T.mono, fontSize: 10, textDecoration: "none", borderLeft: `2px solid ${name === "DESIGN.md" ? T.accent : T.border}` }}>
                  {name.toUpperCase()}
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <SectionLabel accent={T.accent}>8-LAYER ANATOMY</SectionLabel>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {LAYER_NAMES.map((name, i) => {
              const num = i + 1;
              const info = layerByNum(num);
              const available = info?.available ?? false;
              const isActive = num === selectedLayer;
              const btnStyle: CSSProperties = {
                display: "grid",
                gridTemplateColumns: "30px 1fr auto",
                gap: 8,
                alignItems: "center",
                padding: "8px 10px",
                border: 0,
                cursor: available ? "pointer" : "not-allowed",
                background: isActive ? `${T.accent}15` : "transparent",
                borderLeft: isActive
                  ? `2px solid ${T.accent}`
                  : `2px solid transparent`,
                color: !available
                  ? T.textDim
                  : isActive
                  ? T.accentBright
                  : T.text,
                textAlign: "left",
              };
              return (
                <button
                  key={name}
                  role="tab"
                  id={`tab-${num}`}
                  aria-selected={isActive}
                  aria-controls="brand-layer-panel"
                  disabled={!available}
                  onClick={() => handleSelect(num)}
                  style={btnStyle}
                >
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 11,
                      color: isActive ? T.accentBright : T.textMuted,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {String(num).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 1,
                      background: !available ? T.textDim : T.success,
                      boxShadow: available ? `0 0 4px ${T.success}` : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
        {similarSlot}
      </aside>

      <main
        id="brand-layer-panel"
        role="tabpanel"
        aria-labelledby={`tab-${selectedLayer}`}
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 6,
          padding: "20px 24px",
          minHeight: 480,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <SectionLabel accent={T.accent}>
              LAYER {String(selectedLayer).padStart(2, "0")} ·{" "}
              {LAYER_NAMES[selectedLayer - 1] ?? ""}
            </SectionLabel>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 600,
                marginTop: 6,
                color: T.textBright,
                letterSpacing: "-0.01em",
              }}
            >
              {layerName ||
                LAYER_NAMES[selectedLayer - 1]?.toLowerCase() ||
                "Layer"}
            </h2>
          </div>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.textDim,
              letterSpacing: "0.06em",
            }}
          >
            {content
              ? `${content.split("\n").length} LINES`
              : "AWAITING CONTENT"}
          </span>
        </div>

        {loading ? (
          <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: 12,
                  background: T.border,
                  borderRadius: 2,
                  width: `${60 + i * 4}%`,
                  opacity: 0.4,
                }}
              />
            ))}
          </div>
        ) : content ? (
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 12,
              color: T.text,
              background: T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: 4,
              padding: "16px 18px",
              maxHeight: 720,
              overflow: "auto",
            }}
          >
            <LayerViewer content={content} />
          </div>
        ) : (
          <p
            style={{
              fontFamily: T.mono,
              fontSize: 12,
              color: T.textMuted,
            }}
          >
            This layer is not available for {ticker}.
          </p>
        )}
      </main>
    </div>
  );
}
