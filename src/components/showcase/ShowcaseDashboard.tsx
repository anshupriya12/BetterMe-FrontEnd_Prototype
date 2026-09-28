import { useMemo } from "react";
import { OverviewCard } from "../dashboard/OverviewCard";
import { UpcomingCard } from "../dashboard/UpcomingCard";
import { TodayIsCard } from "../dashboard/TodayIsCard";
import { WeeklyStatsCard } from "../dashboard/WeeklyStatsCard";
import { JournalCard } from "../dashboard/JournalCard";
import { ProductivityChart } from "../charts/ProductivityChart";
import { Card } from "../ui/Card";
import { useAppData } from "../../store/AppDataContext";
import { productivitySeries, sortByTime, tasksForDate, weeklyStats } from "../../utils/tasks";
import { todayISO } from "../../utils/date";

/** The real Dashboard page content, without page chrome — used as a live product mockup. */
export function ShowcaseDashboard() {
  const { data } = useAppData();
  const today = todayISO();

  const todaysTasks = useMemo(() => sortByTime(tasksForDate(data.tasks, today)), [data.tasks, today]);
  const upcoming = useMemo(
    () => todaysTasks.filter((t) => !t.completed).concat(todaysTasks.filter((t) => t.completed)),
    [todaysTasks],
  );
  const stats = useMemo(() => weeklyStats(data.tasks, today), [data.tasks, today]);
  const series = useMemo(() => productivitySeries(data.tasks, today), [data.tasks, today]);

  return (
    <div className="pointer-events-none flex select-none flex-col gap-5 p-5 sm:p-7">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <OverviewCard tasks={data.tasks} />
        <UpcomingCard tasks={upcoming} />
        <TodayIsCard />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="md:col-span-5">
          <WeeklyStatsCard stats={stats} />
        </div>
        <div className="md:col-span-7">
          <Card>
            <h3 className="text-[15px] font-semibold text-text">Productivity Graph</h3>
            <div className="mt-2">
              <ProductivityChart data={series} />
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <JournalCard title="This Made Me Happy" value={data.journal.happy} onChange={() => {}} placeholder="" />
        <JournalCard title="New Thing Learned" value={data.journal.learned} onChange={() => {}} placeholder="" />
      </div>
    </div>
  );
}
