import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { fetchBrief } from "@/lib/api";
import type { BriefData } from "@/lib/api";
import { BriefDocument } from "@/components/brief-document";
import { PrintButton } from "@/components/print-button";
import { T } from "@/components/ui-primitives";

interface Props {
  params: Promise<{ ticker: string }>;
}

const ArrowLeft = (): JSX.Element => (
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
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const toolbarStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 24px",
  borderBottom: `1px solid ${T.border}`,
  background: T.bgDeep,
};

const backBtnStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  background: 0,
  border: 0,
  cursor: "pointer",
  color: T.textMuted,
  fontFamily: T.mono,
  fontSize: 11,
  textDecoration: "none",
  letterSpacing: "0.06em",
};

export default async function BriefPage({ params }: Props): Promise<JSX.Element> {
  const { ticker } = await params;
  const tickerUp = ticker.toUpperCase();

  let brief: BriefData;
  try {
    brief = await fetchBrief(tickerUp);
  } catch {
    notFound();
  }

  return (
    <div
      style={{
        background: T.bg,
        minHeight: "100vh",
        paddingBottom: 40,
        fontFamily: T.sans,
        color: T.text,
      }}
    >
      <div className="no-print" style={toolbarStyle}>
        <Link href={`/brands/${tickerUp}`} style={backBtnStyle}>
          <ArrowLeft /> BACK TO BRAND
        </Link>
        <PrintButton />
      </div>
      <BriefDocument brief={brief} />
    </div>
  );
}
