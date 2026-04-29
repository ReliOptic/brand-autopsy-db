"use client";

import { T, VoiceRadar } from "./ui-primitives";

interface VoiceMatrixData {
  formal_casual: number | null;
  authority_peer: number | null;
  emotional_rational: number | null;
  restrained_bold: number | null;
}

interface VoiceMatrixProps {
  voice_matrix: VoiceMatrixData | null;
  size?: number;
  color?: string;
  showLabels?: boolean;
}

function toVoiceArray(matrix: VoiceMatrixData | null): number[] {
  if (!matrix) return [5, 5, 5, 5];
  return [
    matrix.formal_casual ?? 5,
    matrix.authority_peer ?? 5,
    matrix.emotional_rational ?? 5,
    matrix.restrained_bold ?? 5,
  ];
}

export function VoiceMatrix({
  voice_matrix,
  size = 220,
  color = T.accent,
  showLabels = true,
}: VoiceMatrixProps): JSX.Element {
  const voice = toVoiceArray(voice_matrix);
  return <VoiceRadar voice={voice} size={size} color={color} showLabels={showLabels} />;
}
