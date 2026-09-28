import { useMemo } from "react";
import { TaskCategoryCard } from "../tasks/TaskCategoryCard";
import { useAppData } from "../../store/AppDataContext";
import { tasksForDate } from "../../utils/tasks";
import { todayISO } from "../../utils/date";
import { StaggerGroup, StaggerItem } from "./Reveal";

const ORDER = ["health", "design", "video", "socials"] as const;

/** Live category boards (Health / Design / Video / Socials) from the real product data. */
export function ShowcaseCategories() {
  const { data } = useAppData();
  const today = todayISO();
  const dayTasks = useMemo(() => tasksForDate(data.tasks, today), [data.tasks, today]);

  return (
    <StaggerGroup className="pointer-events-none grid select-none grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.12}>
      {ORDER.map((cat) => (
        <StaggerItem key={cat}>
          <TaskCategoryCard category={cat} date={today} tasks={dayTasks.filter((t) => t.category === cat)} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
