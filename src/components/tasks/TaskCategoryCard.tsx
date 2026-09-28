import { Plus } from "lucide-react";
import { useState } from "react";
import { TaskRow } from "./TaskRow";
import { TaskFormModal, type TaskFormValues } from "./TaskFormModal";
import { CATEGORIES } from "../../data/categories";
import { useAppData } from "../../store/AppDataContext";
import type { CategoryId, Task } from "../../types";

interface TaskCategoryCardProps {
  category: CategoryId;
  date: string;
  tasks: Task[];
  labelOverride?: string;
}

export function TaskCategoryCard({ category, date, tasks, labelOverride }: TaskCategoryCardProps) {
  const { addTask, updateTask, deleteTask, toggleTask } = useAppData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const meta = CATEGORIES[category];

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(task: Task) {
    setEditing(task);
    setModalOpen(true);
  }

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
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className={`flex items-center justify-between px-4 py-3 ${meta.header}`}>
        <h3 className={`text-sm font-semibold ${meta.headerText}`}>{labelOverride ?? meta.label}</h3>
        <button
          type="button"
          onClick={openAdd}
          aria-label={`Add task to ${meta.label}`}
          className="rounded-lg p-1 text-white/90 transition-colors hover:bg-white/15"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 divide-y divide-border/60 px-4 py-2">
        {tasks.length === 0 && (
          <p className="py-4 text-sm text-text-faint">No tasks yet — tap + to add one.</p>
        )}
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onEdit={() => openEdit(task)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>

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
        defaultDate={date}
        defaultCategory={category}
        title={editing ? "Edit task" : `Add task · ${meta.label}`}
      />
    </div>
  );
}
