"use client";

import type { CSSProperties } from "react";
import { T } from "./ui-primitives";

const btnStyle: CSSProperties = {
  padding: "5px 10px",
  border: `1px solid ${T.accent}80`,
  borderRadius: 3,
  background: `${T.accent}25`,
  color: T.accentBright,
  fontFamily: T.mono,
  fontSize: 10,
  cursor: "pointer",
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  letterSpacing: "0.06em",
};

const PrintIcon = (): JSX.Element => (
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
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

export function PrintButton(): JSX.Element {
  return (
    <button
      type="button"
      onClick={(): void => window.print()}
      className="no-print"
      style={btnStyle}
    >
      <PrintIcon /> PRINT
    </button>
  );
}
