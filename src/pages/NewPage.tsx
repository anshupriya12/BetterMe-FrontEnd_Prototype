import { FilePlus2, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Checkbox } from "../components/ui/Checkbox";
import { CATEGORIES, CATEGORY_ORDER } from "../data/categories";
import { useAppData } from "../store/AppDataContext";
import type { CategoryId, CustomTaskItem } from "../types";

export default function NewPage() {
  const { data, addCustomPage, deleteCustomPage, updateCustomPage } = useAppData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<CategoryId>("other");
  const [notes, setNotes] = useState("");
  const [draftTasks, setDraftTasks] = useState<CustomTaskItem[]>([]);
  const [taskInput, setTaskInput] = useState("");

  function addDraftTask() {
    if (!taskInput.trim()) return;
    setDraftTasks((prev) => [...prev, { id: `${Date.now()}`, title: taskInput.trim(), done: false }]);
    setTaskInput("");
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    addCustomPage({ title: title.trim(), description, category, notes, tasks: draftTasks });
    setTitle("");
    setDescription("");
    setCategory("other");
    setNotes("");
    setDraftTasks([]);
  }

  function toggleSavedTask(pageId: string, taskId: string) {
    const page = data.customPages.find((p) => p.id === pageId);
    if (!page) return;
    updateCustomPage(pageId, {
      tasks: page.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
    });
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-text">New Page</h1>
        <p className="mt-1 text-sm text-text-muted">
          Spin up a custom productivity page with its own tasks and notes.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <FilePlus2 className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <label className="mb-1.5 block text-xs font-medium text-text-muted">Page title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Q4 Portfolio Refresh"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Description</label>
            <Textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this page for?"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Category</label>
            <Select value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}>
              {CATEGORY_ORDER.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORIES[cat].label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Tasks</label>
            <div className="flex gap-2">
              <Input
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addDraftTask();
                  }
                }}
                placeholder="Add a task and press Enter"
              />
              <Button type="button" variant="secondary" onClick={addDraftTask}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {draftTasks.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {draftTasks.map((t) => (
                  <li key={t.id} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm">
                    {t.title}
                    <button
                      type="button"
                      onClick={() => setDraftTasks((prev) => prev.filter((x) => x.id !== t.id))}
                      className="text-text-faint hover:text-bad"
                      aria-label={`Remove ${t.title}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Notes</label>
            <Textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything else to remember…"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save page</Button>
          </div>
        </form>
      </Card>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-text-muted">Your pages ({data.customPages.length})</h2>
        {data.customPages.length === 0 && (
          <p className="text-sm text-text-faint">No custom pages yet — create one above.</p>
        )}
        {data.customPages.map((page) => {
          const meta = CATEGORIES[page.category];
          return (
            <Card key={page.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-text">{page.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.soft} ${meta.text}`}>
                      {meta.label}
                    </span>
                  </div>
                  {page.description && <p className="mt-1 text-sm text-text-muted">{page.description}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => deleteCustomPage(page.id)}
                  aria-label={`Delete ${page.title}`}
                  className="shrink-0 rounded-lg p-1.5 text-text-faint hover:bg-bad/10 hover:text-bad"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {page.tasks.length > 0 && (
                <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
                  {page.tasks.map((t) => (
                    <li key={t.id} className="flex items-center gap-2.5">
                      <Checkbox checked={t.done} onChange={() => toggleSavedTask(page.id, t.id)} size="sm" />
                      <span className={`text-sm ${t.done ? "text-text-faint line-through" : "text-text"}`}>
                        {t.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {page.notes && (
                <p className="mt-3 whitespace-pre-wrap rounded-lg bg-surface px-3 py-2 text-sm text-text-muted">
                  {page.notes}
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
