import { ChevronDown, Star } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../ui/Checkbox";
import { CATEGORIES, CATEGORY_ORDER } from "../../data/categories";
import { useAppData } from "../../store/AppDataContext";
import type { Task } from "../../types";
import { formatDayMonth, isToday, weekdayLong } from "../../utils/date";
import { completionPercent } from "../../utils/tasks";

interface WeeklyDayCardProps {
  date: string;
  tasks: Task[];
  active: boolean;
  onSelect: () => void;
}

export function WeeklyDayCard({ date, tasks, active, onSelect }: WeeklyDayCardProps) {
  const { toggleTask, data } = useAppData();
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const { day, month } = formatDayMonth(date);
  const allDone = tasks.length > 0 && tasks.every((t) => t.completed);
  const percent = completionPercent(tasks);
  const mood = data.moods[date];

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    tasks: tasks.filter((t) => t.category === cat),
  })).filter((g) => g.tasks.length > 0);

  function toggleGroup(cat: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-card shadow-[var(--shadow-card)] transition-colors ${
        active ? "border-accent ring-1 ring-accent" : "border-border"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex items-center justify-between gap-2 rounded-t-2xl px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${allDone ? "text-text-faint line-through" : "text-text"}`}>
            {weekdayLong(date)}
          </span>
          {isToday(date) && (
            <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent">
              Today
            </span>
          )}
        </span>
        <span className="text-xs font-medium text-text-faint">
          {month} {day}
        </span>
      </button>

      <div className="flex items-center gap-2 px-4 pb-2 text-xs text-text-muted">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ring-track">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="shrink-0">{percent}%</span>
        {mood && <Star className="h-3.5 w-3.5 shrink-0 fill-socials text-socials" />}
      </div>

      <div className="flex-1 space-y-1 px-2 pb-3">
        {grouped.length === 0 && (
          <p className="px-2 py-3 text-xs text-text-faint">No tasks planned.</p>
        )}
        {grouped.map(({ category, tasks: catTasks }) => {
          const meta = CATEGORIES[category];
          const isCollapsed = collapsed.has(category);
          return (
            <div key={category}>
              <button
                type="button"
                onClick={() => toggleGroup(category)}
                className={`flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold ${meta.soft} ${meta.text}`}
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                />
                {meta.label}
              </button>
              {!isCollapsed && (
                <ul className="mt-1 space-y-1 px-2">
                  {catTasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        label={task.title}
                        size="sm"
                      />
                      <span
                        className={`truncate text-xs ${
                          task.completed ? "text-text-faint line-through" : "text-text"
                        }`}
                      >
                        {task.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
