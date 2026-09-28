import { Plus } from "lucide-react";
import { useState } from "react";
import { useAppData } from "../../store/AppDataContext";

export function QuickAddCard({ date }: { date: string }) {
  const { data, addTask } = useAppData();
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim()) return;
    addTask({ title: value.trim(), date, category: data.settings.defaultCategory });
    setValue("");
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="bg-other-soft px-4 py-3">
        <h3 className="text-sm font-semibold text-text-muted">Add New</h3>
      </div>
      <div className="flex flex-1 items-center gap-2.5 px-4 py-4">
        <Plus className="h-4 w-4 shrink-0 text-text-faint" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          onBlur={submit}
          placeholder="add a task"
          className="min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
        />
      </div>
    </div>
  );
}
