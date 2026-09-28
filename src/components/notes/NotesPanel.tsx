import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAppData } from "../../store/AppDataContext";

export function NotesPanel({ date, title = "Notes" }: { date: string; title?: string }) {
  const { data, addNote, updateNote, deleteNote } = useAppData();
  const [draft, setDraft] = useState("");
  const notes = data.notes.filter((n) => n.date === date);

  function submitDraft() {
    if (!draft.trim()) return;
    addNote(date, draft);
    setDraft("");
  }

  return (
    <div className="flex h-full overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex w-9 shrink-0 items-center justify-center bg-accent">
        <span className="rotate-180 text-xs font-semibold tracking-wide text-white [writing-mode:vertical-lr]">
          {title}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        {notes.length === 0 && (
          <p className="pt-2 text-sm text-text-faint">No notes yet — add your first one below.</p>
        )}
        {notes.map((note) => (
          <div key={note.id} className="group flex items-center gap-2 border-b border-border pb-1.5">
            <input
              value={note.text}
              onChange={(e) => updateNote(note.id, e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-text outline-none"
            />
            <button
              type="button"
              onClick={() => deleteNote(note.id)}
              aria-label="Delete note"
              className="shrink-0 rounded p-1 text-text-faint opacity-0 transition-opacity hover:text-bad group-hover:opacity-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        <div className="mt-1 flex items-center gap-2 border-b border-dashed border-border-strong pb-1.5">
          <Plus className="h-3.5 w-3.5 shrink-0 text-text-faint" />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitDraft()}
            onBlur={submitDraft}
            placeholder="Add a note…"
            className="min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
          />
        </div>
      </div>
    </div>
  );
}
