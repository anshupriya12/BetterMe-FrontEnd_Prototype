import type { Note, Task } from "../types";

export interface SearchResult {
  id: string;
  kind: "task" | "note";
  title: string;
  subtitle: string;
  date: string;
}

export function runSearch(tasks: Task[], notes: Note[], query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const taskResults: SearchResult[] = tasks
    .filter((t) => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q))
    .map((t) => ({
      id: t.id,
      kind: "task" as const,
      title: t.title,
      subtitle: `Task · ${t.category} · ${t.date}`,
      date: t.date,
    }));

  const noteResults: SearchResult[] = notes
    .filter((n) => n.text.toLowerCase().includes(q))
    .map((n) => ({
      id: n.id,
      kind: "note" as const,
      title: n.text,
      subtitle: `Note · ${n.date}`,
      date: n.date,
    }));

  return [...taskResults, ...noteResults].slice(0, 8);
}
