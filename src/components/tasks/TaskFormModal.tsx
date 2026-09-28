import { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
import { Input, Textarea } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { CATEGORIES, CATEGORY_ORDER } from "../../data/categories";
import type { CategoryId, Priority, Task } from "../../types";

export interface TaskFormValues {
  title: string;
  description: string;
  date: string;
  time: string;
  category: CategoryId;
  priority: Priority;
  durationMinutes: string;
}

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
  onDelete?: () => void;
  initial?: Task | null;
  defaultDate: string;
  defaultCategory?: CategoryId;
  title: string;
}

function toFormValues(task: Task | null | undefined, defaultDate: string, defaultCategory: CategoryId): TaskFormValues {
  if (!task) {
    return {
      title: "",
      description: "",
      date: defaultDate,
      time: "",
      category: defaultCategory,
      priority: "medium",
      durationMinutes: "",
    };
  }
  return {
    title: task.title,
    description: task.description ?? "",
    date: task.date,
    time: task.time ?? "",
    category: task.category,
    priority: task.priority,
    durationMinutes: task.durationMinutes ? String(task.durationMinutes) : "",
  };
}

export function TaskFormModal({
  open,
  onClose,
  onSubmit,
  onDelete,
  initial,
  defaultDate,
  defaultCategory = "other",
  title,
}: TaskFormModalProps) {
  const [values, setValues] = useState<TaskFormValues>(() => toFormValues(initial, defaultDate, defaultCategory));

  useEffect(() => {
    if (open) setValues(toFormValues(initial, defaultDate, defaultCategory));
  }, [open, initial, defaultDate, defaultCategory]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.title.trim()) return;
    onSubmit(values);
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">Title</label>
          <Input
            autoFocus
            value={values.title}
            onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
            placeholder="e.g. Upload Behance Post"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-muted">Description (optional)</label>
          <Textarea
            rows={2}
            value={values.description}
            onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
            placeholder="Add more detail…"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Category</label>
            <Select
              value={values.category}
              onChange={(e) => setValues((v) => ({ ...v, category: e.target.value as CategoryId }))}
            >
              {CATEGORY_ORDER.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORIES[cat].label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Priority</label>
            <Select
              value={values.priority}
              onChange={(e) => setValues((v) => ({ ...v, priority: e.target.value as Priority }))}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Date</label>
            <Input
              type="date"
              value={values.date}
              onChange={(e) => setValues((v) => ({ ...v, date: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Time</label>
            <Input
              type="time"
              value={values.time}
              onChange={(e) => setValues((v) => ({ ...v, time: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          {onDelete ? (
            <Button type="button" variant="danger" size="sm" onClick={onDelete}>
              Delete
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {initial ? "Save changes" : "Add task"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
