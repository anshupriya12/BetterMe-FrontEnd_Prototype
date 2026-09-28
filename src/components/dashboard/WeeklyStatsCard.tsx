import { Smile, Frown } from "lucide-react";
import { Card } from "../ui/Card";
import type { WeeklyStats } from "../../utils/tasks";

const STAT_ITEMS = (stats: WeeklyStats) => [
  { label: "Tasks Done", value: stats.tasksDone, className: "text-health" },
  { label: "Design Hours", value: stats.designHours, className: "text-design" },
  { label: "Health Activities", value: stats.healthActivities, className: "text-video" },
  { label: "Editing Hours", value: stats.editingHours, className: "text-socials" },
];

export function WeeklyStatsCard({ stats }: { stats: WeeklyStats }) {
  const items = STAT_ITEMS(stats);
  return (
    <Card className="relative overflow-hidden">
      <h3 className="text-[15px] font-semibold text-text">Weekly Stats</h3>

      <div className="mt-5 grid grid-cols-2 gap-y-5 pl-11 pr-11">
        {items.map((item) => (
          <div key={item.label}>
            <p className={`text-2xl font-bold leading-none ${item.className}`}>{item.value}</p>
            <p className="mt-1.5 text-xs font-medium text-text-muted">{item.label}</p>
          </div>
        ))}
      </div>

      <span className="absolute left-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-accent text-white shadow-sm">
        <Smile className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="absolute right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-health text-white shadow-sm">
        <Frown className="h-4 w-4" strokeWidth={2} />
      </span>
    </Card>
  );
}
