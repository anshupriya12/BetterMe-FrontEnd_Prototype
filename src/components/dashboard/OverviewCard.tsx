import { Card } from "../ui/Card";
import { ProgressRing } from "../charts/ProgressRing";
import { CATEGORIES, CATEGORY_ORDER } from "../../data/categories";
import { categoryBreakdown, completionPercent } from "../../utils/tasks";
import { useTheme } from "../../hooks/useTheme";
import type { Task } from "../../types";

export function OverviewCard({ tasks }: { tasks: Task[] }) {
  const breakdown = categoryBreakdown(tasks);
  const overall = completionPercent(tasks);
  const { resolved } = useTheme();

  const segments = CATEGORY_ORDER.map((cat) => {
    const entry = breakdown.find((b) => b.category === cat)!;
    return { id: cat, value: entry.done || 0.001, color: CATEGORIES[cat].ring };
  });

  return (
    <Card>
      <h3 className="text-[15px] font-semibold text-text">Overview</h3>
      <div className="mt-4 flex items-center gap-6">
        <ProgressRing segments={segments} percent={overall} glow={resolved === "dark"} />
        <ul className="flex-1 space-y-2.5">
          {breakdown.map(({ category, percent }) => {
            const meta = CATEGORIES[category];
            return (
              <li key={category} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-text-muted">
                  <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                  {meta.label}
                </span>
                <span className={`font-semibold ${meta.text}`}>{percent}%</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
