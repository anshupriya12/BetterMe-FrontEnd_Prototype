import { useMemo } from "react";
import { TodayIsCard } from "../components/dashboard/TodayIsCard";
import { MoodSelector } from "../components/mood/MoodSelector";
import { NotesPanel } from "../components/notes/NotesPanel";
import { TaskCategoryCard } from "../components/tasks/TaskCategoryCard";
import { QuickAddCard } from "../components/tasks/QuickAddCard";
import { Card } from "../components/ui/Card";
import { ProgressRing } from "../components/charts/ProgressRing";
import { CATEGORIES } from "../data/categories";
import { useAppData } from "../store/AppDataContext";
import { completionPercent, tasksForDate } from "../utils/tasks";
import { todayISO } from "../utils/date";
import { useTheme } from "../hooks/useTheme";

export default function Today() {
  const { data } = useAppData();
  const { resolved } = useTheme();
  const today = todayISO();
  const dayTasks = useMemo(() => tasksForDate(data.tasks, today), [data.tasks, today]);

  const byCategory = (cat: keyof typeof CATEGORIES) => dayTasks.filter((t) => t.category === cat);
  const percent = completionPercent(dayTasks);

  const ringSegments = (Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map((cat) => {
    const catTasks = byCategory(cat);
    return {
      id: cat,
      value: catTasks.filter((t) => t.completed).length || 0.001,
      color: CATEGORIES[cat].ring,
    };
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-text">Today</h1>
        <p className="mt-1 text-sm text-text-muted">Plan the day, log your mood, jot a quick note.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]">
        <TodayIsCard />
        <MoodSelector date={today} />
        <div className="min-h-[190px] lg:w-64">
          <NotesPanel date={today} title="Notes" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <TaskCategoryCard category="other" date={today} tasks={byCategory("other")} labelOverride="Upcoming" />
        <TaskCategoryCard category="design" date={today} tasks={byCategory("design")} />
        <Card className="flex items-center justify-center">
          <ProgressRing segments={ringSegments} percent={percent} glow={resolved === "dark"} />
        </Card>

        <TaskCategoryCard category="health" date={today} tasks={byCategory("health")} />
        <TaskCategoryCard category="socials" date={today} tasks={byCategory("socials")} />
        <QuickAddCard date={today} />
      </div>
    </div>
  );
}
