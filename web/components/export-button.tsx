"use client";

import type { CSSProperties } from "react";
import type { BrandDetail } from "@/lib/api";
import { T } from "./ui-primitives";

interface ExportButtonProps {
  brand: BrandDetail;
}

const btnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: "5px 9px",
  border: `1px solid ${T.border}`,
  borderRadius: 3,
  background: T.surface,
  color: T.text,
  fontFamily: T.mono,
  fontSize: 10,
  cursor: "pointer",
  letterSpacing: "0.06em",
};

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

export function ExportButton({ brand }: ExportButtonProps): JSX.Element {
  const handleExport = (): void => {
    const json = JSON.stringify(brand, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brand-${brand.ticker}-autopsy.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" onClick={handleExport} style={btnStyle}>
      <DownloadIcon /> JSON
    </button>
  );
}
