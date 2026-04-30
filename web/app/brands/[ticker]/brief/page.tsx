import "./print.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchBrand, fetchBrief } from "@/lib/api";
import type { BrandDetail, BriefData } from "@/lib/api";
import { T } from "@/components/ui-primitives";
import { PrintButton } from "@/components/print-button";
import { buildTheme, voiceArrayFrom, resolveColors } from "./brief-helpers";
import {
  ArrowLeft,
  BriefHeader,
  BriefEssenceCard,
  BriefVoiceCard,
  BriefPaletteRow,
  BriefMessagesSnapshot,
  BriefFooter,
} from "./brief-sections";

interface Props {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }): Promise<Metadata> {
  const { ticker } = await params;
  const tickerUp = ticker.toUpperCase();
  try {
    const brand = await fetchBrand(tickerUp);
    return {
      title: `${brand.ticker} Brand Brief — ${brand.name}`,
      description: `1-page brand brief for ${brand.name} (${brand.ticker}). ${brand.sector} · ${brand.industry}.`,
    };
  } catch {
    return { title: `${tickerUp} Brief` };
  }
}

export default async function BriefPage({ params }: Props): Promise<JSX.Element> {
  const { ticker } = await params;
  const tickerUp = ticker.toUpperCase();

  let brand: BrandDetail;
  try {
    brand = await fetchBrand(tickerUp);
  } catch {
    notFound();
  }

  let brief: BriefData | null = null;
  try {
    brief = await fetchBrief(tickerUp);
  } catch {
    brief = null;
  }

  const colorList = resolveColors(brand, brief);
  const theme = buildTheme(colorList.map((c) => c.hex), brand.archetype_primary);
  const accent = theme.accent;
  const voiceArr = brief ? voiceArrayFrom(brief) : [5, 5, 5, 5];
  const analysisDate = brand.analysis_date || brief?.analysis_date || "—";
  const positioning = brief?.positioning_statement ?? brand.tagline ?? brand.slogan ?? "";
  const archetype = brand.archetype_primary
    ? brand.archetype_primary + (brand.archetype_secondary ? ` · ${brand.archetype_secondary}` : "")
    : "—";

  return (
    <div style={{ background: T.bg, minHeight: "100vh", paddingBottom: 40, fontFamily: T.sans }}>
      <div className="no-print" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 24px", borderBottom: `1px solid ${T.border}`, background: T.bgDeep,
      }}>
        <Link href={`/brands/${tickerUp}`} style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          color: T.textMuted, fontFamily: T.mono, fontSize: 11, textDecoration: "none", letterSpacing: "0.06em",
        }}>
          <ArrowLeft /> BACK TO BRAND
        </Link>
        <PrintButton />
      </div>

      <div style={{
        width: 794, maxWidth: "100%", margin: "24px auto",
        background: "#ffffff", color: "#1d1d1f", fontFamily: T.sans,
        boxShadow: "0 4px 32px rgba(0,0,0,0.14)", border: "1px solid #d2d2d7",
        borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column",
      }} className="brief-page-wrapper">

        <BriefHeader brand={brand} archetype={archetype} analysisDate={analysisDate} accent={accent} />

        <div style={{ padding: "16px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 12, background: "#ffffff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <BriefEssenceCard brief={brief} accent={accent} positioning={positioning} />
            <BriefVoiceCard voiceArr={voiceArr} accent={accent} />
          </div>
          {colorList.length > 0 && <BriefPaletteRow colorList={colorList} accent={accent} />}
          {brief && <BriefMessagesSnapshot brief={brief} accent={accent} />}
          <div style={{ flex: 1 }} />
        </div>

        <BriefFooter analysisDate={analysisDate} />
      </div>
    </div>
  );
}
