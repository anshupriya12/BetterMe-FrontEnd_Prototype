import { useMemo, useState } from "react";
import { SelectedDayCard } from "../components/dashboard/SelectedDayCard";
import { MoodSelector } from "../components/mood/MoodSelector";
import { NotesPanel } from "../components/notes/NotesPanel";
import { WeeklyDayCard } from "../components/tasks/WeeklyDayCard";
import { useAppData } from "../store/AppDataContext";
import { tasksForDate } from "../utils/tasks";
import { formatDayMonth, todayISO, weekDates } from "../utils/date";

export default function WeeklyView() {
  const { data } = useAppData();
  const today = todayISO();
  const [activeDate, setActiveDate] = useState(today);
  const dates = useMemo(() => weekDates(today), [today]);
  const { day, month } = formatDayMonth(dates[0]);
  const endDay = formatDayMonth(dates[6]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-text">Weekly View</h1>
        <p className="mt-1 text-sm text-text-muted">
          {month} {day} – {endDay.month} {endDay.day}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]">
        <SelectedDayCard date={activeDate} />
        <MoodSelector date={activeDate} title={`How was ${activeDate === today ? "today" : "that day"}?`} />
        <div className="min-h-[190px] lg:w-64">
          <NotesPanel date={activeDate} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {dates.map((date) => (
          <WeeklyDayCard
            key={date}
            date={date}
            tasks={tasksForDate(data.tasks, date)}
            active={date === activeDate}
            onSelect={() => setActiveDate(date)}
          />
        ))}
      </div>
    </div>
  );
}
