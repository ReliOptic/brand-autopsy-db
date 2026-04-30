"use client";

import { useState } from "react";
import type { BrandTheme } from "@/lib/brand-theme";
import { T } from "./ui-primitives";

export interface FigmaExportButtonProps {
  ticker: string;
  brandName: string;
  theme: BrandTheme;
  palette: string[];
}

function buildCssTokens(ticker: string, theme: BrandTheme, palette: string[]): string {
  const lines = [
    `/* ${ticker} Brand Tokens — Brand Autopsy DB */`,
    `:root {`,
    `  /* Accent */`,
    `  --brand-accent:          ${theme.accent};`,
    `  --brand-accent-bright:   ${theme.accentBright};`,
    `  --brand-accent-dim:      ${theme.accentDim};`,
    ``,
    `  /* Surface */`,
    `  --brand-bg:              ${theme.bg};`,
    `  --brand-surface:         ${theme.surface};`,
    `  --brand-surface-lift:    ${theme.surfaceLift};`,
    ``,
    `  /* Typography */`,
    `  --brand-text:            ${theme.text};`,
    `  --brand-text-bright:     ${theme.textBright};`,
    `  --brand-text-secondary:  ${theme.textSecondary};`,
    `  --brand-text-muted:      ${theme.textMuted};`,
    ``,
    `  /* Border */`,
    `  --brand-border:          ${theme.border};`,
    `  --brand-radius:          ${theme.radius}px;`,
    ``,
    `  /* Palette */`,
    ...palette.map((hex, i) => `  --brand-color-${i}:         ${hex};`),
    `}`,
  ];
  return lines.join("\n");
}

const CssIcon = (): JSX.Element => (
  <svg width={12} height={12} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M5 4L2 8l3 4M11 4l3 4-3 4M9 3l-2 10"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = (): JSX.Element => (
  <svg width={12} height={12} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8l3.5 3.5L13 4"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function FigmaExportButton({
  ticker,
  brandName: _brandName,
  theme,
  palette,
}: FigmaExportButtonProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = (): void => {
    const css = buildCssTokens(ticker, theme, palette);
    void navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 9px",
        border: `1px solid ${copied ? theme.accent : theme.isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.10)"}`,
        borderRadius: 4,
        background: copied ? theme.accentAlpha15 : "transparent",
        color: copied ? theme.accentBright : theme.textMuted,
        fontFamily: T.sans,
        fontSize: 10,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.04em",
        transition: "all 0.15s ease",
      }}
      aria-label="Copy CSS tokens"
    >
      {copied ? <CheckIcon /> : <CssIcon />}
      {copied ? "Copied!" : "CSS Tokens"}
    </button>
  );
}
