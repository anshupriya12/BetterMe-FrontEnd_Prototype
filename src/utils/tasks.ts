import { CATEGORY_ORDER } from "../data/categories";
import type { CategoryId, Task } from "../types";
import { WEEKDAY_SHORT, weekDates } from "./date";

export function tasksForDate(tasks: Task[], date: string): Task[] {
  return tasks.filter((t) => t.date === date);
}

export function sortByTime(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.time && b.time) return a.time.localeCompare(b.time);
    if (a.time) return -1;
    if (b.time) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function completionPercent(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.completed).length;
  return Math.round((done / tasks.length) * 100);
}

export interface CategoryBreakdownEntry {
  category: CategoryId;
  total: number;
  done: number;
  percent: number;
}

export function categoryBreakdown(tasks: Task[]): CategoryBreakdownEntry[] {
  return CATEGORY_ORDER.map((category) => {
    const catTasks = tasks.filter((t) => t.category === category);
    return {
      category,
      total: catTasks.length,
      done: catTasks.filter((t) => t.completed).length,
      percent: completionPercent(catTasks),
    };
  });
}

export interface WeeklyStats {
  tasksDone: number;
  designHours: number;
  healthActivities: number;
  editingHours: number;
}

export function weeklyStats(tasks: Task[], anchorIso: string): WeeklyStats {
  const dates = new Set(weekDates(anchorIso));
  const weekTasks = tasks.filter((t) => dates.has(t.date));
  const done = weekTasks.filter((t) => t.completed);

  const minutes = (cat: CategoryId) =>
    done.filter((t) => t.category === cat).reduce((sum, t) => sum + (t.durationMinutes ?? 0), 0);

  return {
    tasksDone: done.length,
    designHours: Math.round((minutes("design") / 60) * 10) / 10,
    healthActivities: done.filter((t) => t.category === "health").length,
    editingHours: Math.round((minutes("video") / 60) * 10) / 10,
  };
}

export interface ProductivityPoint {
  day: string;
  value: number;
}

export function productivitySeries(tasks: Task[], anchorIso: string): ProductivityPoint[] {
  const dates = weekDates(anchorIso);
  return dates.map((date, idx) => ({
    day: WEEKDAY_SHORT[idx],
    value: completionPercent(tasksForDate(tasks, date)),
  }));
}

export function searchTasks(tasks: Task[], query: string): Task[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return tasks.filter(
    (t) => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q),
  );
}
