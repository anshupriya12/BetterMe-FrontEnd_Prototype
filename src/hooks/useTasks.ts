import { useMemo } from "react";
import { useAppData } from "../store/AppDataContext";
import { sortByTime, tasksForDate } from "../utils/tasks";

/** Convenience hook: all tasks plus tasks scoped to a given date, sorted chronologically. */
export function useTasks(date?: string) {
  const { data, addTask, updateTask, deleteTask, toggleTask } = useAppData();

  const forDate = useMemo(
    () => (date ? sortByTime(tasksForDate(data.tasks, date)) : []),
    [data.tasks, date],
  );

  return {
    tasks: data.tasks,
    tasksForDate: forDate,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
