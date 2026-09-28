import { Card } from "../ui/Card";
import { Checkbox } from "../ui/Checkbox";
import type { Task } from "../../types";
import { formatTime12h } from "../../utils/date";
import { useAppData } from "../../store/AppDataContext";
import { CalendarCheck2 } from "lucide-react";

export function UpcomingCard({ tasks }: { tasks: Task[] }) {
  const { toggleTask } = useAppData();
  const nextIncomplete = tasks.find((t) => !t.completed && t.time);
  const items = tasks.slice(0, 4);

  return (
    <Card>
      <h3 className="text-[15px] font-semibold text-text">Upcoming</h3>

      {nextIncomplete?.time ? (
        <p className="mt-3 text-sm">
          <span className="font-semibold text-accent">at {formatTime12h(nextIncomplete.time)}</span>
        </p>
      ) : (
        <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-good">
          <CalendarCheck2 className="h-4 w-4" /> All caught up
        </p>
      )}

      <ul className="mt-3 space-y-2.5">
        {items.length === 0 && <li className="text-sm text-text-muted">No tasks scheduled yet.</li>}
        {items.map((task) => (
          <li key={task.id} className="flex items-center gap-3">
            <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} label={task.title} />
            <span
              className={`truncate text-sm ${
                task.completed ? "text-text-faint line-through" : "text-text"
              }`}
            >
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
