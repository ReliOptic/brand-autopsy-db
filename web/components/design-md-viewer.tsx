"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CSSProperties } from "react";
import type { DesignMdResponse } from "@/lib/api";
import { SectionLabel, T, Ticker } from "@/components/ui-primitives";
import { DesignMdExportButton } from "@/components/design-md-export-button";

const SECTION_TITLES = [
  "Metadata",
  "Visual Theme",
  "Color Palette",
  "Typography Rules",
  "Component Styling",
  "Layout Principles",
  "Depth & Elevation",
  "Do",
  "Don't",
  "Responsive Behavior",
  "Market Visual Positioning",
  "Legal & Usage Notice",
] as const;

function slug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function gradeColor(grade: string): string {
  if (grade === "DESIGN_READY") return T.success;
  if (grade === "PARTIAL") return T.warn;
  return T.textMuted;
}

interface DesignMdViewerProps {
  data: DesignMdResponse;
}

export function DesignMdViewer({ data }: DesignMdViewerProps): JSX.Element {
  const cardStyle: CSSProperties = {
    background: "linear-gradient(180deg, rgba(19,19,29,0.96), rgba(15,15,23,0.92))",
    border: `1px solid ${T.borderBright}`,
    borderRadius: 6,
    overflow: "hidden",
    boxShadow: "0 18px 60px rgba(0,0,0,0.22)",
  };

  return (
    <div className="design-md-layout">
      <aside className="design-md-toc" style={{ ...cardStyle, padding: 14, alignSelf: "start", position: "sticky", top: 64 }}>
        <SectionLabel accent={T.accent}>DESIGN.md TOC</SectionLabel>
        <nav style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          {SECTION_TITLES.map((title, i) => (
            <a
              key={title}
              href={`#${slug(title)}`}
              style={{
                display: "grid",
                gridTemplateColumns: "24px 1fr",
                gap: 6,
                textDecoration: "none",
                color: T.textMuted,
                fontFamily: T.mono,
                fontSize: 10,
                padding: "7px 8px",
                borderRadius: 4,
                borderLeft: `2px solid ${T.border}`,
              }}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      <main style={cardStyle}>
        <div
          style={{
            borderTop: `2px solid ${T.accentBright}`,
            borderBottom: `1px solid ${T.border}`,
            padding: "14px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <Ticker color={T.accentBright}>{data.ticker}</Ticker>
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  color: T.warn,
                  border: `1px solid ${T.warn}55`,
                  background: `${T.warn}12`,
                  padding: "3px 7px",
                  borderRadius: 3,
                  letterSpacing: "0.08em",
                }}
              >
                Unofficial analytical design summary
              </span>
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  color: gradeColor(data.design_readiness_grade),
                  border: `1px solid ${gradeColor(data.design_readiness_grade)}55`,
                  background: `${gradeColor(data.design_readiness_grade)}12`,
                  padding: "3px 7px",
                  borderRadius: 3,
                }}
              >
                {data.design_readiness_grade} · {data.design_readiness_score}
              </span>
            </div>
            <div style={{ marginTop: 5, fontFamily: T.mono, fontSize: 10, color: T.textDim }}>
              VERSION {data.version} · GENERATED {data.generated_at || "—"}
            </div>
          </div>
          <DesignMdExportButton ticker={data.ticker} markdown={data.markdown} />
        </div>

        <article
          style={{
            padding: "22px 28px 32px",
            color: T.text,
            fontSize: 14,
            lineHeight: 1.68,
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 style={{ color: T.textBright, fontSize: 28 }}>{children}</h1>,
              h2: ({ children }) => {
                const text = String(children);
                return (
                  <h2
                    id={slug(text.replace(/^\d+\.\s*/, ""))}
                    style={{
                      borderTop: `1px solid ${T.border}`,
                      paddingTop: 18,
                      marginTop: 24,
                      color: text.includes("Legal") ? T.warn : T.textBright,
                      fontSize: 18,
                    }}
                  >
                    {children}
                  </h2>
                );
              },
              table: ({ children }) => (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.mono, fontSize: 11 }}>
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => <th style={{ border: `1px solid ${T.border}`, padding: 6, color: T.textMuted }}>{children}</th>,
              td: ({ children }) => <td style={{ border: `1px solid ${T.border}`, padding: 6 }}>{children}</td>,
              code: ({ children }) => <code style={{ fontFamily: T.mono, color: T.accentBright }}>{children}</code>,
              blockquote: ({ children }) => (
                <blockquote style={{ borderLeft: `3px solid ${T.accent}`, marginLeft: 0, paddingLeft: 12, color: T.textSecondary }}>
                  {children}
                </blockquote>
              ),
            }}
          >
            {data.markdown}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
