import { useMemo } from "react";
import { OverviewCard } from "../components/dashboard/OverviewCard";
import { UpcomingCard } from "../components/dashboard/UpcomingCard";
import { TodayIsCard } from "../components/dashboard/TodayIsCard";
import { WeeklyStatsCard } from "../components/dashboard/WeeklyStatsCard";
import { JournalCard } from "../components/dashboard/JournalCard";
import { ProductivityChart } from "../components/charts/ProductivityChart";
import { Card } from "../components/ui/Card";
import { useAppData } from "../store/AppDataContext";
import { productivitySeries, sortByTime, tasksForDate, weeklyStats } from "../utils/tasks";
import { todayISO } from "../utils/date";

export default function Dashboard() {
  const { data, setJournal } = useAppData();
  const today = todayISO();

  const todaysTasks = useMemo(() => sortByTime(tasksForDate(data.tasks, today)), [data.tasks, today]);
  const upcoming = useMemo(
    () => todaysTasks.filter((t) => !t.completed).concat(todaysTasks.filter((t) => t.completed)),
    [todaysTasks],
  );
  const stats = useMemo(() => weeklyStats(data.tasks, today), [data.tasks, today]);
  const series = useMemo(() => productivitySeries(data.tasks, today), [data.tasks, today]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="mt-1 text-sm text-text-muted">A snapshot of how your day and week are going.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <OverviewCard tasks={data.tasks} />
        <UpcomingCard tasks={upcoming} />
        <TodayIsCard />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <WeeklyStatsCard stats={stats} />
        </div>
        <div className="lg:col-span-7">
          <Card>
            <h3 className="text-[15px] font-semibold text-text">Productivity Graph</h3>
            <div className="mt-2">
              <ProductivityChart data={series} />
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <JournalCard
          title="This Made Me Happy"
          value={data.journal.happy}
          onChange={(v) => setJournal("happy", v)}
          placeholder="What made you smile today?"
        />
        <JournalCard
          title="New Thing Learned"
          value={data.journal.learned}
          onChange={(v) => setJournal("learned", v)}
          placeholder="What did you pick up today?"
        />
      </div>
    </div>
  );
}
