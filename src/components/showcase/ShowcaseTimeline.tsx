import { useMemo } from "react";
import { useAppData } from "../../store/AppDataContext";
import { sortByTime, tasksForDate } from "../../utils/tasks";
import { formatTime12h, todayISO } from "../../utils/date";
import { CATEGORIES } from "../../data/categories";
import { StaggerGroup, StaggerItem } from "./Reveal";

/** Oversized, editorial timeline — the day filling up, built from real scheduled tasks. */
export function ShowcaseTimeline() {
  const { data } = useAppData();
  const today = todayISO();
  const tasks = useMemo(
    () => sortByTime(tasksForDate(data.tasks, today)).filter((t) => t.time),
    [data.tasks, today],
  );

  return (
    <StaggerGroup className="pointer-events-none relative select-none" stagger={0.14}>
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border sm:left-[9px]" />
      <div className="flex flex-col gap-8 sm:gap-10">
        {tasks.map((task) => {
          const meta = CATEGORIES[task.category];
          return (
            <StaggerItem key={task.id} className="relative flex items-baseline gap-5 pl-7 sm:gap-8 sm:pl-9">
              <span
                className="absolute left-0 top-1.5 h-4 w-4 rounded-full ring-4 sm:h-[18px] sm:w-[18px]"
                style={{ background: `var(--${task.category})`, boxShadow: `0 0 0 4px var(--bg)` }}
              />
              <span className="w-24 shrink-0 text-xl font-bold tabular-nums tracking-tight text-text sm:w-32 sm:text-3xl">
                {formatTime12h(task.time)}
              </span>
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
                <span
                  className={`truncate text-lg font-semibold sm:text-2xl ${
                    task.completed ? "text-text-faint line-through" : "text-text"
                  }`}
                >
                  {task.title}
                </span>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold sm:text-xs ${meta.soft} ${meta.text}`}>
                  {meta.label}
                </span>
              </span>
            </StaggerItem>
          );
        })}
      </div>
    </StaggerGroup>
  );
}
