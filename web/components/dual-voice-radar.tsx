import { T } from "@/components/ui-primitives";

export interface DualVoiceRadarProps {
  voiceA: number[];
  voiceB: number[];
  colorA: string;
  colorB: string;
  labelA: string;
  labelB: string;
  size?: number;
}

export function DualVoiceRadar({
  voiceA,
  voiceB,
  colorA,
  colorB,
  labelA,
  labelB,
  size = 220,
}: DualVoiceRadarProps): JSX.Element {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36;
  const labels = [
    "Formal ↔ Casual",
    "Authority ↔ Peer",
    "Emotional ↔ Rational",
    "Restrained ↔ Bold",
  ];
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
  const GRID_COLOR = "rgba(128,128,128,0.2)";

  function toPoints(voice: number[]): Array<[number, number]> {
    return voice.map((v, i) => {
      const rr = (v / 10) * r;
      const angle = angles[i] ?? 0;
      return [cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr];
    });
  }

  const pointsA = toPoints(voiceA);
  const pointsB = toPoints(voiceB);
  const polygonA = pointsA.map((p) => p.join(",")).join(" ");
  const polygonB = pointsB.map((p) => p.join(",")).join(" ");

  return (
    <div>
      <svg
        width={size}
        height={size}
        overflow="visible"
        style={{ display: "block" }}
      >
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon
            key={s}
            points={angles
              .map((a) => `${cx + Math.cos(a) * r * s},${cy + Math.sin(a) * r * s}`)
              .join(" ")}
            fill="none"
            stroke={GRID_COLOR}
            strokeWidth={1}
          />
        ))}
        {/* Axis lines */}
        {angles.map((a, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(a) * r}
            y2={cy + Math.sin(a) * r}
            stroke={GRID_COLOR}
            strokeWidth={1}
          />
        ))}
        {/* Polygon A — solid */}
        <polygon
          points={polygonA}
          fill={colorA}
          fillOpacity={0.15}
          stroke={colorA}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        {/* Polygon B — dashed */}
        <polygon
          points={polygonB}
          fill={colorB}
          fillOpacity={0.15}
          stroke={colorB}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeDasharray="5 3"
        />
        {/* Dots A */}
        {pointsA.map((p, i) => (
          <circle
            key={`a${i}`}
            cx={p[0]}
            cy={p[1]}
            r={4}
            fill={colorA}
            stroke="white"
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
        ))}
        {/* Dots B */}
        {pointsB.map((p, i) => (
          <circle
            key={`b${i}`}
            cx={p[0]}
            cy={p[1]}
            r={4}
            fill={colorB}
            stroke="white"
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
        ))}
        {/* Axis labels */}
        {angles.map((a, i) => {
          const lr = r + 20;
          const x = cx + Math.cos(a) * lr;
          const y = cy + Math.sin(a) * lr;
          const anchor =
            Math.cos(a) > 0.3 ? "start" : Math.cos(a) < -0.3 ? "end" : "middle";
          return (
            <text
              key={i}
              x={x}
              y={y + 3}
              textAnchor={anchor}
              style={{
                fontFamily: T.sans,
                fontSize: 8,
                fill: GRID_COLOR,
                letterSpacing: "0.03em",
              }}
            >
              {labels[i]}
            </text>
          );
        })}
      </svg>
      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 10,
          fontFamily: T.sans,
          fontSize: 10,
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: colorA,
              display: "inline-block",
            }}
          />
          {labelA}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: colorB,
              display: "inline-block",
              opacity: 0.8,
            }}
          />
          {labelB}
        </span>
      </div>
    </div>
  );
}
