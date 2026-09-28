import { Plus, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { TodayIsCard } from "../components/dashboard/TodayIsCard";
import { MoodSelector } from "../components/mood/MoodSelector";
import { NotesPanel } from "../components/notes/NotesPanel";
import { Card } from "../components/ui/Card";
import { Checkbox } from "../components/ui/Checkbox";
import { TaskFormModal, type TaskFormValues } from "../components/tasks/TaskFormModal";
import { CATEGORIES } from "../data/categories";
import { useAppData } from "../store/AppDataContext";
import { sortByTime, tasksForDate } from "../utils/tasks";
import { formatTime12h, todayISO } from "../utils/date";
import type { Task } from "../types";

export default function TimeView() {
  const { data, addTask, updateTask, deleteTask, toggleTask } = useAppData();
  const today = todayISO();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const dayTasks = useMemo(() => sortByTime(tasksForDate(data.tasks, today)), [data.tasks, today]);

  function handleSubmit(values: TaskFormValues) {
    const payload = {
      title: values.title.trim(),
      description: values.description.trim() || undefined,
      date: values.date,
      time: values.time || undefined,
      category: values.category,
      priority: values.priority,
      durationMinutes: values.durationMinutes ? Number(values.durationMinutes) : undefined,
    };
    if (editing) updateTask(editing.id, payload);
    else addTask(payload);
    setModalOpen(false);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-text">Time View</h1>
        <p className="mt-1 text-sm text-text-muted">What's on the schedule for today, in order.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]">
        <TodayIsCard />
        <MoodSelector date={today} />
        <div className="min-h-[190px] lg:w-64">
          <NotesPanel date={today} />
        </div>
      </div>

      <Card padded={false}>
        <div className="flex items-center justify-between px-5 pt-5">
          <h3 className="text-lg font-semibold text-text">What's for the day</h3>
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-1.5 rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:brightness-95"
          >
            <Plus className="h-4 w-4" /> Add task
          </button>
        </div>

        <div className="mt-4 px-2 pb-2 sm:px-5 sm:pb-5">
          <div className="hidden grid-cols-[28px_1fr_120px_140px_72px] gap-3 border-b border-border px-3 pb-3 text-xs font-medium uppercase tracking-wide text-text-muted sm:grid">
            <span />
            <span>Activity</span>
            <span>Time</span>
            <span>Category</span>
            <span />
          </div>

          {dayTasks.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-text-muted">
              Nothing scheduled yet — add your first task for today.
            </p>
          )}

          <div className="divide-y divide-border/60">
            {dayTasks.map((task) => {
              const meta = CATEGORIES[task.category];
              return (
                <div
                  key={task.id}
                  className="grid grid-cols-[28px_1fr_auto] items-center gap-3 px-3 py-3 sm:grid-cols-[28px_1fr_120px_140px_72px]"
                >
                  <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} label={task.title} size="sm" />
                  <span
                    className={`min-w-0 truncate text-sm ${
                      task.completed ? "text-text-faint line-through" : "text-text"
                    }`}
                  >
                    {task.title}
                  </span>

                  <span className="col-start-3 row-start-1 justify-self-end text-sm text-text-muted sm:col-start-3 sm:row-start-auto sm:justify-self-start">
                    {task.time ? (
                      formatTime12h(task.time)
                    ) : task.priority === "high" ? (
                      <Star className="h-4 w-4 fill-socials text-socials" />
                    ) : (
                      <span className="text-text-faint">—</span>
                    )}
                  </span>

                  <span className="col-span-3 sm:col-span-1">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${meta.soft} ${meta.text}`}
                    >
                      {meta.label}
                    </span>
                  </span>

                  <span className="col-span-3 flex justify-end gap-1 sm:col-span-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(task);
                        setModalOpen(true);
                      }}
                      className="rounded px-2 py-1 text-xs font-medium text-text-muted hover:text-accent"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      className="rounded px-2 py-1 text-xs font-medium text-text-muted hover:text-bad"
                    >
                      Delete
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <TaskFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        onDelete={
          editing
            ? () => {
                deleteTask(editing.id);
                setModalOpen(false);
              }
            : undefined
        }
        initial={editing}
        defaultDate={today}
        title={editing ? "Edit task" : "Add task"}
      />
    </div>
  );
}
