import type { BrandDetail, VoiceMatrix } from "@/lib/api";

interface BrandBriefProps {
  brand: BrandDetail;
}

function dataConfidence(layerCount: number): { level: "HIGH" | "MEDIUM" | "LOW"; color: string; description: string } {
  if (layerCount >= 8) return { level: "HIGH", color: "#10B981", description: "All 8 layers available" };
  if (layerCount >= 6) return { level: "MEDIUM", color: "#F59E0B", description: `${layerCount}/8 layers available` };
  return { level: "LOW", color: "#EF4444", description: `${layerCount}/8 layers — limited data` };
}

function interpretVoice(matrix: VoiceMatrix): string[] {
  const insights: string[] = [];
  if (matrix.formal_casual !== null) {
    if ((matrix.formal_casual ?? 5) <= 3) insights.push("Formal, professional tone");
    else if ((matrix.formal_casual ?? 5) >= 7) insights.push("Casual, conversational tone");
    else insights.push("Balanced formal-casual tone");
  }
  if (matrix.authority_peer !== null) {
    if ((matrix.authority_peer ?? 5) <= 3) insights.push("Authority-led messaging");
    else if ((matrix.authority_peer ?? 5) >= 7) insights.push("Peer-to-peer communication style");
  }
  if (matrix.emotional_rational !== null) {
    if ((matrix.emotional_rational ?? 5) <= 3) insights.push("Emotionally-driven brand narrative");
    else if ((matrix.emotional_rational ?? 5) >= 7) insights.push("Rational, evidence-based messaging");
  }
  if (matrix.restrained_bold !== null) {
    if ((matrix.restrained_bold ?? 5) <= 3) insights.push("Restrained, minimal brand expression");
    else if ((matrix.restrained_bold ?? 5) >= 7) insights.push("Bold, expressive brand identity");
  }
  return insights;
}

export function BrandBrief({ brand }: BrandBriefProps) {
  return (
    <section className="mb-8 bg-[#13131A] border border-[#1E1E2E] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-[#64748B] uppercase tracking-wider">
          Brand Intelligence Brief
        </h2>
        {brand.analysis_date && (
          <span className="text-[#374151] text-xs">Analyzed {brand.analysis_date}</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Strategic Identity */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
            Strategic Identity
          </h3>
          {brand.archetype_primary && (
            <div>
              <span className="text-[#94A3B8] text-xs">Archetype: </span>
              <span className="text-[#E2E8F0] text-sm font-medium">{brand.archetype_primary}</span>
              {brand.archetype_secondary && (
                <span className="text-[#64748B] text-xs"> · {brand.archetype_secondary}</span>
              )}
            </div>
          )}
          {brand.tagline && (
            <p className="text-[#94A3B8] text-sm italic">&quot;{brand.tagline}&quot;</p>
          )}
          {brand.sector && (
            <p className="text-[#64748B] text-xs">{brand.sector}{brand.industry ? ` / ${brand.industry}` : ""}</p>
          )}
        </div>

        {/* 2. Voice Profile */}
        {brand.voice_matrix && (
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
              Voice Profile
            </h3>
            <div className="space-y-1.5">
              {interpretVoice(brand.voice_matrix).map((insight, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#6366F1] flex-shrink-0" />
                  <span className="text-[#94A3B8] text-xs">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Color System */}
        {brand.colors.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
              Color System
            </h3>
            <div className="flex gap-2 flex-wrap">
              {brand.colors.slice(0, 5).map((c, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded"
                    style={{ backgroundColor: c.hex }}
                    title={`${c.name}: ${c.hex}`}
                  />
                  <span className="text-[#64748B] text-xs font-mono">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Analysis Coverage */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
            Analysis Coverage
          </h3>
          <div className="grid grid-cols-4 gap-1">
            {brand.layers.map((layer) => (
              <div
                key={layer.num}
                className={`rounded px-1.5 py-1 text-center ${
                  layer.available
                    ? "bg-[#6366F1]/10 border border-[#6366F1]/20"
                    : "bg-[#1E1E2E] border border-transparent"
                }`}
                title={layer.name}
              >
                <span
                  className={`text-xs font-mono ${
                    layer.available ? "text-[#6366F1]" : "text-[#374151]"
                  }`}
                >
                  {String(layer.num).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
          {(() => {
            const availableCount = brand.layers.filter((l) => l.available).length;
            const confidence = dataConfidence(availableCount);
            return (
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full border"
                  style={{
                    color: confidence.color,
                    borderColor: `${confidence.color}40`,
                    backgroundColor: `${confidence.color}10`,
                  }}
                >
                  {confidence.level}
                </span>
                <span className="text-[#374151] text-xs">{confidence.description}</span>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
