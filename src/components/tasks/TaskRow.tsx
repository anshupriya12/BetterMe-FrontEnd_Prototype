import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "../ui/Checkbox";
import type { Task } from "../../types";
import { formatTime12h } from "../../utils/date";

interface TaskRowProps {
  task: Task;
  onToggle: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showTime?: boolean;
}

export function TaskRow({ task, onToggle, onEdit, onDelete, showTime = true }: TaskRowProps) {
  return (
    <div className="group flex items-center gap-2.5 py-1.5">
      <Checkbox checked={task.completed} onChange={onToggle} label={task.title} size="sm" />
      <span
        className={`min-w-0 flex-1 truncate text-sm ${
          task.completed ? "text-text-faint line-through" : "text-text"
        }`}
      >
        {task.title}
      </span>
      {showTime && task.time && (
        <span className="shrink-0 text-xs font-medium text-text-faint">{formatTime12h(task.time)}</span>
      )}
      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${task.title}`}
            className="rounded p-1 text-text-faint hover:text-accent"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${task.title}`}
            className="rounded p-1 text-text-faint hover:text-bad"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
