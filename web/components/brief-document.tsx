import type { BriefData } from "@/lib/api";
import type { CSSProperties } from "react";
import {
  ColorSwatches,
  ConfidenceBadge,
  RiskBadge,
  SectionLabel,
  T,
  VoiceRadar,
} from "./ui-primitives";

interface Props {
  brief: BriefData;
}

const VOICE_AXES = [
  { left: "Formal", right: "Casual", key: "formal_casual" as const },
  { left: "Authority", right: "Peer", key: "authority_peer" as const },
  { left: "Emotional", right: "Rational", key: "emotional_rational" as const },
  { left: "Restrained", right: "Bold", key: "restrained_bold" as const },
];

function voiceArrayFrom(brief: BriefData): number[] {
  const m = brief.voice_matrix;
  if (!m) return [5, 5, 5, 5];
  return [
    m.formal_casual ?? 5,
    m.authority_peer ?? 5,
    m.emotional_rational ?? 5,
    m.restrained_bold ?? 5,
  ];
}

function colorRoleLabel(idx: number): string {
  if (idx === 0) return "PRIMARY";
  if (idx === 1) return "SECONDARY";
  return `ACCENT ${idx - 1}`;
}

function riskColor(level: BriefData["legal_risk_level"]): string {
  if (level === "LOW") return T.success;
  if (level === "MEDIUM") return T.warn;
  if (level === "HIGH") return T.error;
  return T.textMuted;
}

interface StatProps {
  label: string;
  value: string;
  valueColor?: string;
  small?: boolean;
}

function Stat({ label, value, valueColor, small }: StatProps): JSX.Element {
  return (
    <div
      style={{
        border: `1px solid ${T.border}`,
        borderRadius: 3,
        padding: "6px 8px",
        background: T.surface,
      }}
    >
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 8,
          color: T.textDim,
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: T.mono,
          fontSize: small ? 11 : 14,
          fontWeight: 600,
          color: valueColor ?? T.text,
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function BriefDocument({ brief }: Props): JSX.Element {
  const c = brief.color_primary || T.accent;
  const voice = voiceArrayFrom(brief);
  const colors = brief.colors.length ? brief.colors : [c];
  const riskC = riskColor(brief.legal_risk_level);

  const pageStyle: CSSProperties = {
    width: 794,
    margin: "20px auto",
    aspectRatio: "210 / 297",
    background: "#0A0A0F",
    color: T.text,
    fontFamily: T.sans,
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
    border: `1px solid ${T.border}`,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={pageStyle} className="brief-page">
      {/* Color band header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${c} 0%, ${c}dd 70%, #0A0A0F 130%)`,
          padding: "20px 28px 16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px)`,
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                BRAND INTELLIGENCE BRIEF
              </span>
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                · {brief.analysis_date || "—"}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "0.02em",
                }}
              >
                {brief.ticker}
              </span>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: "white",
                  letterSpacing: "-0.02em",
                }}
              >
                {brief.name}
              </span>
            </div>
            <div
              style={{
                marginTop: 4,
                fontFamily: T.mono,
                fontSize: 10,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.05em",
              }}
            >
              {brief.sector.toUpperCase()} · {brief.industry.toUpperCase()}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <ColorSwatches colors={colors} max={5} size={20} />
            <ConfidenceBadge level={brief.data_confidence} />
            <RiskBadge level={brief.legal_risk_level} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "16px 28px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Row 1: Strategic Identity + Voice Profile */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div>
            <SectionLabel accent={T.accent}>01 · STRATEGIC IDENTITY</SectionLabel>
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: 2,
                    fontFamily: T.mono,
                    fontSize: 10,
                    background: `${T.accent}20`,
                    color: T.accentBright,
                    letterSpacing: "0.06em",
                  }}
                >
                  {brief.archetype_primary.toUpperCase()}
                </span>
                {brief.archetype_secondary && (
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: 2,
                      fontFamily: T.mono,
                      fontSize: 10,
                      background: T.surface,
                      color: T.textMuted,
                      letterSpacing: "0.06em",
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    {brief.archetype_secondary.toUpperCase()}
                  </span>
                )}
              </div>
              {brief.positioning_statement && (
                <p
                  style={{
                    fontSize: 11,
                    color: T.text,
                    lineHeight: 1.5,
                    fontStyle: "italic",
                    paddingLeft: 10,
                    borderLeft: `2px solid ${T.accent}`,
                  }}
                >
                  &ldquo;{brief.positioning_statement}&rdquo;
                </p>
              )}
            </div>
          </div>
          <div>
            <SectionLabel accent={T.accent}>02 · VOICE PROFILE</SectionLabel>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <VoiceRadar voice={voice} size={140} color={c} showLabels={false} />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                {VOICE_AXES.map((axis, i) => {
                  const v = voice[i];
                  return (
                    <div key={axis.key}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: T.mono,
                          fontSize: 9,
                          color: T.textMuted,
                          marginBottom: 2,
                        }}
                      >
                        <span>{axis.left}</span>
                        <span style={{ color: T.accentBright }}>{v}/10</span>
                        <span>{axis.right}</span>
                      </div>
                      <div
                        style={{
                          height: 4,
                          background: T.border,
                          borderRadius: 1,
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${v * 10}%`,
                            background: c,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Key Messages + Top Channels */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div>
            <SectionLabel accent={T.accent}>03 · KEY MESSAGES</SectionLabel>
            <ul
              style={{
                marginTop: 8,
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {brief.key_messages.length === 0 && (
                <li
                  style={{
                    fontSize: 11,
                    color: T.textDim,
                    fontStyle: "italic",
                  }}
                >
                  See Layer 01 for brand messaging
                </li>
              )}
              {brief.key_messages.map((m, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    fontSize: 11,
                    color: T.text,
                    lineHeight: 1.4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 9,
                      color: T.accent,
                      marginTop: 2,
                    }}
                  >
                    M.{String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel accent={T.accent}>04 · TOP CHANNELS</SectionLabel>
            <ul
              style={{
                marginTop: 8,
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {brief.top_channels.length === 0 && (
                <li
                  style={{
                    fontSize: 11,
                    color: T.textDim,
                    fontStyle: "italic",
                  }}
                >
                  See Layer 06 for channel strategy
                </li>
              )}
              {brief.top_channels.map((ch, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    fontSize: 11,
                    color: T.text,
                    lineHeight: 1.4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 9,
                      color: T.accent,
                      marginTop: 2,
                    }}
                  >
                    CH.{String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Color System + Financial Snapshot */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 16,
          }}
        >
          <div>
            <SectionLabel accent={T.accent}>05 · COLOR SYSTEM</SectionLabel>
            <div
              style={{
                marginTop: 8,
                display: "grid",
                gridTemplateColumns: `repeat(${Math.max(colors.length, 1)}, 1fr)`,
                gap: 4,
              }}
            >
              {colors.map((cc, i) => (
                <div
                  key={`${cc}-${i}`}
                  style={{
                    border: `1px solid ${T.border}`,
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ height: 38, background: cc }} />
                  <div style={{ padding: 4, background: T.surface }}>
                    <div
                      style={{
                        fontFamily: T.mono,
                        fontSize: 9,
                        color: T.text,
                      }}
                    >
                      {cc.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontFamily: T.mono,
                        fontSize: 8,
                        color: T.textDim,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {colorRoleLabel(i)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel accent={T.accent}>06 · FINANCIAL SNAPSHOT</SectionLabel>
            <div
              style={{
                marginTop: 8,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 6,
              }}
            >
              <Stat label="REVENUE" value={brief.financial_headline || "—"} />
              <Stat
                label="LEGAL RISK"
                value={brief.legal_risk_level}
                valueColor={riskC}
              />
              <Stat label="LAYERS" value={`${brief.layer_count}/8`} />
              <Stat
                label="ANALYZED"
                value={brief.analysis_date || "—"}
                small
              />
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div
          style={{
            borderTop: `1px solid ${T.border}`,
            paddingTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 9,
                color: T.textDim,
                letterSpacing: "0.08em",
              }}
            >
              LAYER COVERAGE
            </span>
            <div style={{ display: "flex", gap: 2 }}>
              {Array.from({ length: 8 }, (_, i) => {
                const active = i < brief.layer_count;
                return (
                  <span
                    key={i}
                    style={{
                      width: 22,
                      height: 18,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: T.mono,
                      fontSize: 9,
                      background: active ? `${T.accent}20` : T.border,
                      color: active ? T.accentBright : T.textDim,
                      border: active
                        ? `1px solid ${T.accent}40`
                        : "1px solid transparent",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                );
              })}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 9,
                color: T.textDim,
                letterSpacing: "0.08em",
              }}
            >
              BAUTOPSY · BRAND AUTOPSY DB · v2.4
            </div>
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 8,
                color: T.textDim,
                marginTop: 2,
                fontStyle: "italic",
              }}
            >
              AI-assisted public-source intelligence. Not investment, legal, or financial advice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
