"use client";

import type { CSSProperties } from "react";
import { T } from "@/components/ui-primitives";

const overlayStyle: CSSProperties = {
  position: "fixed",
  top: 12,
  right: 16,
  zIndex: 100,
  display: "flex",
  gap: 8,
  alignItems: "center",
};

const btnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: "6px 12px",
  border: `1px solid ${T.border}`,
  borderRadius: 4,
  background: `${T.surface}e8`,
  backdropFilter: "blur(8px)",
  color: T.textSecondary,
  fontFamily: T.sans,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.04em",
  cursor: "pointer",
  textDecoration: "none",
};

const BackIcon = (): JSX.Element => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const LinkIcon = (): JSX.Element => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export function CardOverlayButtons(): JSX.Element {
  function handleCopy(): void {
    navigator.clipboard.writeText(window.location.href).catch(() => {
      // clipboard write failed silently — no action needed
    });
  }

  function handleBack(): void {
    window.history.back();
  }

  return (
    <div style={overlayStyle}>
      <button type="button" onClick={handleBack} style={btnStyle} aria-label="Go back">
        <BackIcon /> Back
      </button>
      <button type="button" onClick={handleCopy} style={btnStyle} aria-label="Copy link">
        <LinkIcon /> Copy Link
      </button>
    </div>
  );
}
