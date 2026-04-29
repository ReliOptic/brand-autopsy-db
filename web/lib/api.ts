import { publicEnv } from "@/config/env";

const API_BASE = publicEnv.apiUrl;

export interface VoiceMatrix {
  formal_casual: number | null;
  authority_peer: number | null;
  emotional_rational: number | null;
  restrained_bold: number | null;
}

export interface ColorEntry {
  role: string;
  name: string;
  hex: string;
  usage: string;
}

export interface LayerInfo {
  num: number;
  name: string;
  available: boolean;
}

export interface BrandSummary {
  ticker: string;
  name: string;
  sector: string;
  archetype_primary: string;
  color_primary: string;
  status: string;
  layer_count?: number;
  analysis_date?: string;
}

export interface BrandDetail extends BrandSummary {
  industry: string;
  archetype_secondary: string;
  tagline: string;
  slogan: string;
  analysis_date: string;
  voice_matrix: VoiceMatrix | null;
  colors: ColorEntry[];
  layers: LayerInfo[];
}

export interface BrandsResponse {
  brands: BrandSummary[];
  total: number;
}

export interface LayerResponse {
  content: string;
  layer_name: string;
}

export interface CompareResponse {
  brands: BrandDetail[];
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export interface HealthResponse {
  status: string;
  brands_count: number;
}

export async function fetchHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/api/health");
}

export async function fetchBrands(params: {
  q?: string;
  sector?: string;
  archetype?: string;
  limit?: number;
  offset?: number;
}): Promise<BrandsResponse> {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.sector) sp.set("sector", params.sector);
  if (params.archetype) sp.set("archetype", params.archetype);
  if (params.limit) sp.set("limit", String(params.limit));
  if (params.offset) sp.set("offset", String(params.offset));
  const qs = sp.toString();
  return apiFetch<BrandsResponse>(`/api/brands${qs ? `?${qs}` : ""}`);
}

export async function fetchBrand(ticker: string): Promise<BrandDetail> {
  return apiFetch<BrandDetail>(`/api/brands/${ticker}`);
}

export async function fetchLayer(ticker: string, num: number): Promise<LayerResponse> {
  return apiFetch<LayerResponse>(`/api/brands/${ticker}/layers/${num}`);
}

export async function fetchCompare(a: string, b: string, c?: string, d?: string): Promise<CompareResponse> {
  const sp = new URLSearchParams({ a, b });
  if (c) sp.set("c", c);
  if (d) sp.set("d", d);
  return apiFetch<CompareResponse>(`/api/compare?${sp.toString()}`);
}

export interface ArchetypeDistribution {
  total_brands: number;
  archetypes: Array<{ archetype: string; count: number; percentage: number }>;
  by_sector: Record<string, Record<string, number>>;
}

export interface SectorStats {
  sectors: Array<{
    sector: string;
    count: number;
    top_archetypes: string[];
    tickers_sample: string[];
  }>;
}

export async function fetchArchetypes(): Promise<ArchetypeDistribution> {
  const res = await fetch(`${API_BASE}/api/analytics/archetypes`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch archetypes");
  return res.json();
}

export async function fetchSectors(): Promise<SectorStats> {
  const res = await fetch(`${API_BASE}/api/analytics/sectors`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch sectors");
  return res.json();
}

export interface SimilarBrand {
  ticker: string;
  name: string;
  similarity: number;
  voice_matrix: VoiceMatrix;
}

export interface VoiceSimilarityResult {
  ticker: string;
  voice_matrix: VoiceMatrix;
  similar_brands: SimilarBrand[];
}

export async function fetchVoiceSimilarity(ticker: string): Promise<VoiceSimilarityResult> {
  const res = await fetch(`${API_BASE}/api/analytics/voice-similarity/${ticker}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("voice similarity unavailable");
  return res.json();
}

export interface PositioningPoint {
  ticker: string;
  name: string;
  sector: string;
  archetype: string;
  color: string;
  formal_casual: number;
  authority_peer: number;
  emotional_rational: number | null;
  restrained_bold: number | null;
}

export interface PositioningData {
  sector: string;
  count: number;
  points: PositioningPoint[];
}

export async function fetchPositioning(sector: string): Promise<PositioningData> {
  const res = await fetch(
    `${API_BASE}/api/analytics/positioning?sector=${encodeURIComponent(sector)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("positioning unavailable");
  return res.json();
}

export interface BriefData {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  archetype_primary: string;
  archetype_secondary: string;
  voice_matrix: {
    formal_casual: number | null;
    authority_peer: number | null;
    emotional_rational: number | null;
    restrained_bold: number | null;
  } | null;
  color_primary: string;
  colors: string[];
  layer_count: number;
  analysis_date: string;
  data_confidence: "HIGH" | "MEDIUM" | "LOW";
  positioning_statement: string;
  key_messages: string[];
  top_channels: string[];
  legal_risk_level: "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";
  financial_headline: string;
}

export async function fetchBrief(ticker: string): Promise<BriefData> {
  return apiFetch<BriefData>(`/api/brands/${ticker}/brief`);
}

export interface QualityScoreEntry {
  score: number;
  layer_count: number;
  status: string;
}

export interface QualitySummary {
  total_brands: number;
  avg_score: number;
  high_count: number;
  medium_count: number;
  low_count: number;
  scores: Record<string, QualityScoreEntry>;
}

export interface FreshnessRecord {
  status: string;
  days_since_update: number;
  analysis_date: string | null;
}

export interface FreshnessSummary {
  total_brands: number;
  fresh_count: number;
  aging_count: number;
  stale_count: number;
  records: Record<string, FreshnessRecord>;
}

const EMPTY_QUALITY_SUMMARY: QualitySummary = {
  total_brands: 0,
  avg_score: 0,
  high_count: 0,
  medium_count: 0,
  low_count: 0,
  scores: {},
};

const EMPTY_FRESHNESS_SUMMARY: FreshnessSummary = {
  total_brands: 0,
  fresh_count: 0,
  aging_count: 0,
  stale_count: 0,
  records: {},
};

export async function fetchQualitySummary(): Promise<QualitySummary> {
  try {
    const res = await fetch(`${API_BASE}/api/analytics/quality-summary`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return EMPTY_QUALITY_SUMMARY;
    return (await res.json()) as QualitySummary;
  } catch {
    return EMPTY_QUALITY_SUMMARY;
  }
}

export async function fetchFreshnessSummary(): Promise<FreshnessSummary> {
  try {
    const res = await fetch(`${API_BASE}/api/analytics/freshness-summary`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return EMPTY_FRESHNESS_SUMMARY;
    return (await res.json()) as FreshnessSummary;
  } catch {
    return EMPTY_FRESHNESS_SUMMARY;
  }
}
