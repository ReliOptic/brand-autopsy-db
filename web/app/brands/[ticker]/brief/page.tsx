import "./print.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchBrand, fetchBrief } from "@/lib/api";
import type { BrandDetail, BriefData } from "@/lib/api";
import { T } from "@/components/ui-primitives";
import { PrintButton } from "@/components/print-button";
import { buildTheme, resolveColors, buildSections } from "./brief-helpers";
import { BriefMeta, RamsHero, RamsSection, BriefFooter } from "./brief-sections";

interface Props {
  params: Promise<{ ticker: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }): Promise<Metadata> {
  const { ticker } = await params;
  const up = ticker.toUpperCase();
  try {
    const brand = await fetchBrand(up);
    return { title: `${brand.ticker} Brand Brief — ${brand.name}` };
  } catch {
    return { title: `${up} Brief` };
  }
}

export default async function BriefPage({ params }: Props): Promise<JSX.Element> {
  const { ticker } = await params;
  const up = ticker.toUpperCase();

  let brand: BrandDetail;
  try {
    brand = await fetchBrand(up);
  } catch {
    notFound();
  }

  let brief: BriefData | null = null;
  try { brief = await fetchBrief(up); } catch { brief = null; }

  const colorList = resolveColors(brand, brief);
  const theme = buildTheme(colorList.map((c) => c.hex), brand.archetype_primary);
  const accent = theme.accent;
  const analysisDate = brand.analysis_date || brief?.analysis_date || "—";
  const sections = buildSections(brand, brief, colorList);

  // Hero: tagline as the "why the brand exists" headline
  const headline = brand.tagline || brand.slogan || brand.name;
  const subtitle = (() => {
    const pos = brief?.positioning_statement ?? "";
    if (pos && pos !== headline) return pos.slice(0, 180);
    return brief?.key_messages?.[0] ?? "";
  })();

  return (
    <div style={{ background: T.bg, minHeight: "100vh", paddingBottom: 40, fontFamily: T.sans }}>
      {/* Toolbar */}
      <div className="no-print" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 24px", borderBottom: `1px solid ${T.border}`, background: T.bgDeep,
      }}>
        <Link href={`/brands/${up}`} style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          color: T.textMuted, fontFamily: T.mono, fontSize: 11, textDecoration: "none", letterSpacing: "0.06em",
        }}>
          ← BACK TO BRAND
        </Link>
        <PrintButton />
      </div>

      {/* A4 page — pure white, Rams-style */}
      <div style={{
        width: 794, maxWidth: "100%", margin: "24px auto",
        background: "#ffffff", color: "#1d1d1f", fontFamily: T.sans,
        boxShadow: "0 2px 24px rgba(0,0,0,0.10)", border: "1px solid #e5e5e5",
        borderRadius: 2, overflow: "hidden",
      }}>
        <BriefMeta name={brand.name} date={analysisDate} />
        <RamsHero brand={brand} headline={headline} subtitle={subtitle} accent={accent} />
        {sections.map((s, i) => (
          <RamsSection key={s.num} section={s} accent={accent} isLast={i === sections.length - 1} />
        ))}
        <BriefFooter analysisDate={analysisDate} />
      </div>
    </div>
  );
}
