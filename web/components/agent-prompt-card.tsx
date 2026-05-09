"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { BrandDesignMd } from "@/lib/design-md";
import { generateAgentPrompt, type PromptType } from "@/lib/agent-prompt";
import { SectionLabel, T } from "@/components/ui-primitives";

const TYPES: Array<{ type: PromptType; label: string }> = [
  { type: "landing", label: "Landing Page" },
  { type: "dashboard", label: "Dashboard" },
  { type: "brief", label: "Brand Brief" },
  { type: "components", label: "Component Library" },
  { type: "marketing", label: "Marketing Page" },
];

export function AgentPromptCard({ designMd, markdownContent }: { designMd: BrandDesignMd; markdownContent: string }): JSX.Element {
  const [type, setType] = useState<PromptType>("landing");
  const [copied, setCopied] = useState(false);
  const prompt = useMemo(() => generateAgentPrompt(type, designMd, markdownContent), [type, designMd, markdownContent]);
  const buttonStyle = (active: boolean): CSSProperties => ({
    background: active ? `${T.accent}18` : T.bg,
    border: `1px solid ${active ? T.accent : T.border}`,
    color: active ? T.accentBright : T.textMuted,
    borderRadius: 4,
    padding: "6px 9px",
    fontFamily: T.mono,
    fontSize: 10,
    cursor: "pointer",
  });
  const copy = async (): Promise<void> => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <section className="terminal-panel" style={{ borderRadius: 10, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <SectionLabel accent={T.accent}>AGENT PROMPT CARD</SectionLabel>
          <p style={{ margin: "8px 0 0", color: T.textMuted, fontSize: 12 }}>Includes: DESIGN.md + visual system + do/don't rules</p>
        </div>
        <button type="button" onClick={() => void copy()} style={{ ...buttonStyle(true), height: 30 }}>COPY FULL PROMPT</button>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
        {TYPES.map((item) => (
          <button key={item.type} type="button" onClick={() => setType(item.type)} style={buttonStyle(type === item.type)}>{item.label}</button>
        ))}
      </div>
      <textarea readOnly value={prompt} style={{ width: "100%", minHeight: 260, marginTop: 12, background: "rgba(5,5,8,0.82)", color: T.text, border: `1px solid ${T.borderBright}`, borderRadius: 6, padding: 14, fontFamily: T.mono, fontSize: 11, lineHeight: 1.55, boxShadow: "inset 0 1px 18px rgba(0,0,0,0.28)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: T.mono, fontSize: 10 }}>
        <span style={{ color: T.warn }}>Do not copy logos, trademarks, or proprietary assets.</span>
        <span style={{ color: copied ? T.success : T.textDim }}>{copied ? "Copied!" : `${prompt.length.toLocaleString()} chars`}</span>
      </div>
    </section>
  );
}
