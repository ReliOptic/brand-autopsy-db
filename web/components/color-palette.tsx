import type { ColorEntry } from "@/lib/api";

interface ColorPaletteProps {
  colors: ColorEntry[];
}

export default function ColorPalette({ colors }: ColorPaletteProps) {
  if (!colors.length) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((c, i) => (
        <div key={i} className="flex items-center gap-2 bg-[#13131A] border border-[#1E1E2E] rounded-lg px-3 py-2">
          <div className="w-8 h-8 rounded-md border border-white/10 flex-shrink-0" style={{ backgroundColor: c.hex }} />
          <div>
            <p className="text-[#E2E8F0] text-xs font-medium">{c.name}</p>
            <p className="text-[#64748B] text-xs font-mono">{c.hex}</p>
            <p className="text-[#64748B] text-xs">{c.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
