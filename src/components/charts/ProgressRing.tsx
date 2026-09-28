interface Segment {
  id: string;
  value: number; // relative weight, any positive number
  color: string; // css color (var(--x) or hex)
}

interface ProgressRingProps {
  segments: Segment[];
  percent: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  glow?: boolean;
}

export function ProgressRing({
  segments,
  percent,
  size = 132,
  strokeWidth = 10,
  label = "Total",
  glow = false,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const gapDeg = segments.length > 1 ? 6 : 0;

  let cumulativeDeg = -90;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-0">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--ring-track)"
          strokeWidth={strokeWidth}
        />
        {total > 0
          ? segments.map((seg) => {
              const fraction = seg.value / total;
              const arcDeg = fraction * 360 - (segments.length > 1 ? gapDeg : 0);
              const dashLength = (arcDeg / 360) * circumference;
              const rotate = cumulativeDeg;
              cumulativeDeg += fraction * 360;
              if (seg.value <= 0) return null;
              return (
                <circle
                  key={seg.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={0}
                  transform={`rotate(${rotate} ${size / 2} ${size / 2})`}
                  style={{
                    filter: glow ? `drop-shadow(0 0 5px ${seg.color}80)` : undefined,
                    transition: "stroke-dasharray 600ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              );
            })
          : null}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[1.7rem] font-bold leading-none text-text">{percent}%</span>
        <span className="mt-1 text-xs font-medium text-text-muted">{label}</span>
      </div>
    </div>
  );
}
