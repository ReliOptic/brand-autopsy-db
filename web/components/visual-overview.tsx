import type { CSSProperties } from "react";
import type { BriefData, BrandDetail } from "@/lib/api";
import { T } from "@/components/ui-primitives";
import {
  ArchetypePhilosophyBanner,
  ColorStrip,
  VoicePositioningGrid,
  CoverageChannelsSource,
  CtaBar,
} from "@/components/visual-overview-parts";
import { DEFAULT_THEME } from "@/lib/brand-theme";
import type { BrandTheme } from "@/lib/brand-theme";

export interface VisualOverviewProps {
  brief: BriefData;
  brand: BrandDetail;
  onUnlockReport?: () => void;
  theme?: BrandTheme;
}

export function VisualOverview({ brief, brand, onUnlockReport, theme = DEFAULT_THEME }: VisualOverviewProps): JSX.Element {
  return (
    <div
      style={{
        "--ov-bg": theme.bg,
        "--ov-surface": theme.surface,
        "--ov-surface-lift": theme.surfaceLift,
        "--ov-text": theme.text,
        "--ov-text-bright": theme.textBright,
        "--ov-text-secondary": theme.textSecondary,
        "--ov-text-muted": theme.textMuted,
        "--ov-text-dim": theme.textDim,
        "--ov-border": theme.border,
        "--ov-accent": theme.accent,
        "--ov-accent-bright": theme.accentBright,
        "--ov-accent-dim": theme.accentDim,
        "--ov-accent-a15": theme.accentAlpha15,
        "--ov-accent-a50": theme.accentAlpha50,
        background: theme.bg,
        color: theme.text,
        fontFamily: T.sans,
        borderRadius: 8,
        padding: "4px 0",
      } as CSSProperties}
    >
      <ColorStrip brief={brief} brand={brand} theme={theme} />
      <ArchetypePhilosophyBanner brief={brief} brand={brand} theme={theme} />
      <VoicePositioningGrid brief={brief} brand={brand} theme={theme} />
      <CoverageChannelsSource brief={brief} brand={brand} theme={theme} />
      <CtaBar brief={brief} onUnlockReport={onUnlockReport} theme={theme} />
    </div>
  );
}
