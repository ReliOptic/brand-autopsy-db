import type { CSSProperties } from "react";
import type { BrandDetail, BriefData, ColorEntry } from "@/lib/api";
import { T, VoiceRadar } from "@/components/ui-primitives";
import { colorRoleLabel } from "./brief-helpers";

const sectionBox: CSSProperties = {
  border: "1px solid #d2d2d7",
  borderRadius: 4,
  padding: "10px 12px",
  background: "#fafafa",
};

export const ArrowLeft = (): JSX.Element => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export function FieldLabel({ children, accent }: { children: string; accent: string }): JSX.Element {
  return (
    <div style={{
      fontFamily: T.mono, fontSize: 8, fontWeight: 600, letterSpacing: "0.12em",
      color: accent, textTransform: "uppercase", marginBottom: 4,
    }}>
      {children}
    </div>
  );
}

export function BriefHeader({ brand, archetype, analysisDate, accent }: {
  brand: BrandDetail; archetype: string; analysisDate: string; accent: string;
}): JSX.Element {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 60%, #f5f5f7 110%)`,
      padding: "18px 24px 14px",
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    }}>
      <div>
        <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.14em", color: "rgba(255,255,255,0.75)", marginBottom: 6 }}>
          BRAND INTELLIGENCE BRIEF
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
          <span style={{ fontFamily: T.mono, fontSize: 20, fontWeight: 700, color: "#ffffff", letterSpacing: "0.04em" }}>
            {brand.ticker}
          </span>
          <span style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
            {brand.name}
          </span>
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em" }}>
          {brand.sector.toUpperCase()} · {brand.industry.toUpperCase()}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <span style={{
          fontFamily: T.mono, fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 3,
          background: "rgba(255,255,255,0.2)", color: "#ffffff", letterSpacing: "0.06em",
        }}>
          {archetype.toUpperCase()}
        </span>
        {analysisDate !== "—" && (
          <span style={{ fontFamily: T.mono, fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}>
            {analysisDate}
          </span>
        )}
      </div>
    </div>
  );
}

export function BriefEssenceCard({ brief, accent, positioning }: {
  brief: BriefData | null; accent: string; positioning: string;
}): JSX.Element {
  const quoteStyle: CSSProperties = {
    fontSize: 11, color: "#1d1d1f", lineHeight: 1.5, fontStyle: "italic",
    paddingLeft: 10, borderLeft: `2px solid ${accent}`, margin: 0,
  };
  return (
    <div style={sectionBox}>
      <FieldLabel accent={accent}>Brand Essence</FieldLabel>
      {positioning ? (
        <p style={quoteStyle}>&ldquo;{positioning}&rdquo;</p>
      ) : (
        <p style={{ ...quoteStyle, color: "#86868b", fontStyle: "normal" }}>Positioning statement not available.</p>
      )}
      {brief?.audience_segments && brief.audience_segments.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <FieldLabel accent={accent}>Core Audience</FieldLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {brief.audience_segments.slice(0, 4).map((seg, i) => (
              <span key={i} style={{
                fontFamily: T.sans, fontSize: 10, padding: "2px 7px", borderRadius: 2,
                border: `1px solid ${accent}40`, background: `${accent}10`, color: "#1d1d1f",
              }}>{seg}</span>
            ))}
          </div>
        </div>
      )}
      {brief?.primary_persona && (
        <div style={{ marginTop: 8 }}>
          <FieldLabel accent={accent}>Primary Persona</FieldLabel>
          <div style={{ fontFamily: T.sans, fontSize: 11, color: "#1d1d1f", lineHeight: 1.4 }}>
            {brief.primary_persona}
          </div>
        </div>
      )}
    </div>
  );
}

export function BriefVoiceCard({ voiceArr, accent }: { voiceArr: number[]; accent: string }): JSX.Element {
  return (
    <div style={sectionBox}>
      <FieldLabel accent={accent}>Voice Positioning</FieldLabel>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <VoiceRadar voice={voiceArr} size={180} color={accent} showLabels={true} />
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 8, color: "#86868b", textAlign: "center", letterSpacing: "0.06em", marginTop: 2 }}>
        {`F:${voiceArr[0]} · A:${voiceArr[1]} · E:${voiceArr[2]} · B:${voiceArr[3]}`}
      </div>
    </div>
  );
}

export function BriefPaletteRow({ colorList, accent }: { colorList: ColorEntry[]; accent: string }): JSX.Element {
  return (
    <div style={sectionBox}>
      <FieldLabel accent={accent}>Color Palette</FieldLabel>
      <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
        {colorList.slice(0, 8).map((cc, i) => (
          <div key={`${cc.hex}-${i}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 18, background: cc.hex,
              border: "1px solid #d2d2d7", boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
            }} />
            <span style={{ fontFamily: T.mono, fontSize: 8, color: "#1d1d1f", letterSpacing: "0.04em" }}>
              {cc.hex.toUpperCase()}
            </span>
            <span style={{ fontFamily: T.sans, fontSize: 8, color: "#86868b" }}>
              {cc.role || colorRoleLabel(i)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BriefMessagesSnapshot({ brief, accent }: { brief: BriefData; accent: string }): JSX.Element {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {brief.key_messages.length > 0 && (
        <div style={sectionBox}>
          <FieldLabel accent={accent}>Key Messages</FieldLabel>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5 }}>
            {brief.key_messages.slice(0, 5).map((m, i) => (
              <li key={i} style={{ display: "flex", gap: 6, fontSize: 11, color: "#1d1d1f", lineHeight: 1.4 }}>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: accent, marginTop: 1, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={sectionBox}>
        <FieldLabel accent={accent}>Snapshot</FieldLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4 }}>
          {[
            { k: "Revenue", v: brief.financial_headline || "—" },
            { k: "Legal Risk", v: brief.legal_risk_level },
            { k: "Confidence", v: brief.data_confidence },
            { k: "Layers", v: `${brief.layer_count}/8` },
            { k: "Top Channels", v: brief.top_channels.slice(0, 2).join(", ") || "—" },
          ].map(({ k, v }) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: T.sans, fontSize: 10, color: "#86868b" }}>{k}</span>
              <span style={{ fontFamily: T.mono, fontSize: 10, color: "#1d1d1f", fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BriefFooter({ analysisDate }: { analysisDate: string }): JSX.Element {
  return (
    <div style={{
      borderTop: "1px solid #d2d2d7", padding: "8px 24px",
      display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f5f5f7",
    }}>
      <span style={{ fontFamily: T.mono, fontSize: 8, color: "#86868b", letterSpacing: "0.08em" }}>
        BRAND AUTOPSY DB · brand-autopsy.com
      </span>
      <span style={{ fontFamily: T.mono, fontSize: 8, color: "#86868b", letterSpacing: "0.06em" }}>
        {analysisDate}
      </span>
      <span style={{ fontFamily: T.mono, fontSize: 8, color: "#c7c7cc", fontStyle: "italic" }}>
        AI-assisted public-source intelligence. Not investment or legal advice.
      </span>
    </div>
  );
}
