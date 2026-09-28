import { useMemo } from "react";
import { WeeklyDayCard } from "../tasks/WeeklyDayCard";
import { useAppData } from "../../store/AppDataContext";
import { tasksForDate } from "../../utils/tasks";
import { todayISO, weekDates } from "../../utils/date";
import { StaggerGroup, StaggerItem } from "./Reveal";

/** The real Monday-to-Sunday board, populated with live task + mood data. */
export function ShowcaseWeekly() {
  const { data } = useAppData();
  const today = todayISO();
  const dates = useMemo(() => weekDates(today), [today]);

  return (
    <StaggerGroup
      className="pointer-events-none grid select-none grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
      stagger={0.07}
    >
      {dates.map((date) => (
        <StaggerItem key={date}>
          <WeeklyDayCard date={date} tasks={tasksForDate(data.tasks, date)} active={date === today} onSelect={() => {}} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
