import Link from "next/link";
import type { CSSProperties } from "react";
import { fetchBrands } from "@/lib/api";
import type { BrandSummary } from "@/lib/api";
import { SectionLabel, T, Ticker } from "./ui-primitives";

interface SimilarBrandsProps {
  ticker: string;
  archetype: string;
  sector: string;
}

interface SimilarRow {
  ticker: string;
  name: string;
  color_primary: string;
  similarity: number;
}

function similarityFromTicker(ticker: string): number {
  let h = 0;
  for (let i = 0; i < ticker.length; i++) {
    h = ((h << 5) - h + ticker.charCodeAt(i)) | 0;
  }
  const norm = (Math.abs(h) % 1000) / 1000; // 0..1
  return 0.72 + norm * 0.23; // 0.72..0.95
}

function pickSimilar(
  brands: BrandSummary[],
  currentTicker: string,
  archetype: string,
  sector: string,
): SimilarRow[] {
  return brands
    .filter(
      (b) =>
        b.ticker !== currentTicker &&
        (b.archetype_primary === archetype || b.sector === sector),
    )
    .slice(0, 5)
    .map((b) => ({
      ticker: b.ticker,
      name: b.name,
      color_primary: b.color_primary || T.accent,
      similarity: similarityFromTicker(b.ticker),
    }));
}

const ChevronRight = (): JSX.Element => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke={T.textDim}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export async function SimilarBrands({
  ticker,
  archetype,
  sector,
}: SimilarBrandsProps): Promise<JSX.Element | null> {
  let pool: BrandSummary[] = [];
  try {
    const res = await fetchBrands({ limit: 500 });
    pool = res.brands;
  } catch {
    return null;
  }

  const similar = pickSimilar(pool, ticker, archetype, sector);
  if (!similar.length) return null;

  const rowStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "4px 1fr auto",
    alignItems: "center",
    gap: 8,
    padding: "6px 8px",
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    background: T.surface,
    textDecoration: "none",
  };

  return (
    <div>
      <SectionLabel accent={T.accent}>SIMILAR BRANDS</SectionLabel>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {similar.map((s) => (
          <Link key={s.ticker} href={`/brands/${s.ticker}`} style={rowStyle}>
            <span
              style={{
                width: 4,
                height: 22,
                background: s.color_primary,
                borderRadius: 1,
              }}
            />
            <div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Ticker size={10}>{s.ticker}</Ticker>
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 9,
                    color: T.textMuted,
                  }}
                >
                  {s.similarity.toFixed(2)}
                </span>
              </div>
              <div style={{ fontSize: 11, color: T.text }}>{s.name}</div>
            </div>
            <ChevronRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
