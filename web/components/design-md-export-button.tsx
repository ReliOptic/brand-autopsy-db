"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { T } from "@/components/ui-primitives";

interface DesignMdExportButtonProps {
  ticker: string;
  markdown: string;
}

function extractAgentPrompt(markdown: string): string {
  const marker = "## Agent Prompt Guide";
  const start = markdown.indexOf(marker);
  if (start === -1) return markdown;
  const rest = markdown.slice(start + marker.length).trim();
  const next = rest.indexOf("\n## ");
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

export function DesignMdExportButton({ ticker, markdown }: DesignMdExportButtonProps): JSX.Element {
  const [status, setStatus] = useState<string>("");
  const agentPrompt = useMemo(() => extractAgentPrompt(markdown), [markdown]);

  const baseStyle: CSSProperties = {
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    background: T.bg,
    color: T.text,
    fontFamily: T.mono,
    fontSize: 10,
    padding: "7px 10px",
    cursor: "pointer",
    letterSpacing: "0.06em",
  };

  const copy = async (value: string, label: string): Promise<void> => {
    await navigator.clipboard.writeText(value);
    setStatus(label);
    window.setTimeout(() => setStatus(""), 1400);
  };

  const download = (): void => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ticker.toUpperCase()}-DESIGN.md`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded");
    window.setTimeout(() => setStatus(""), 1400);
  };

  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
      <button type="button" style={baseStyle} onClick={() => void copy(markdown, "Copied!")}>
        COPY MARKDOWN
      </button>
      <button type="button" style={baseStyle} onClick={download}>
        DOWNLOAD DESIGN.md
      </button>
      <button type="button" style={baseStyle} onClick={() => void copy(agentPrompt, "Prompt copied!")}>
        COPY AGENT PROMPT
      </button>
      {status && <span style={{ fontFamily: T.mono, fontSize: 10, color: T.success }}>{status}</span>}
    </div>
  );
}
