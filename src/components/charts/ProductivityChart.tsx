import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ProductivityPoint } from "../../utils/tasks";

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-[var(--shadow-pop)]">
      <p className="font-semibold text-text">{label}</p>
      <p className="text-text-muted">{payload[0].value}% completed</p>
    </div>
  );
}

export function ProductivityChart({ data }: { data: ProductivityPoint[] }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="productivityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="0" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12, fontFamily: "Poppins" }}
            dy={8}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 50, 100]}
            tickFormatter={(v) => `${v}%`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12, fontFamily: "Poppins" }}
            width={44}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--border-strong)" }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--accent)"
            strokeWidth={2.5}
            fill="url(#productivityFill)"
            dot={{ r: 4, fill: "var(--accent)", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "var(--accent)", strokeWidth: 0 }}
            animationDuration={600}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
