import { Menu, Search, FileText, ListChecks } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../store/AppDataContext";
import { runSearch } from "../../utils/search";
import { Avatar } from "../ui/Avatar";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data, setSelectedDate } = useAppData();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => runSearch(data.tasks, data.notes, query), [data.tasks, data.notes, query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSelect(result: (typeof results)[number]) {
    setSelectedDate(result.date);
    navigate(result.kind === "task" ? "/app/time-view" : "/app/calendar");
    setQuery("");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 flex h-[72px] shrink-0 items-center gap-4 bg-header px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="rounded-lg p-2 text-header-text lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <a href="/app" className="shrink-0 select-none text-xl font-bold tracking-tight text-white sm:w-56">
        Better<span className="text-accent">Me.</span>
      </a>

      <div ref={containerRef} className="relative mx-auto w-full max-w-md flex-1">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search tasks & notes"
            aria-label="Search tasks and notes"
            className="h-10 w-full rounded-xl border border-white/10 bg-white/10 pl-4 pr-10 text-sm text-white placeholder:text-header-text-muted outline-none transition-colors focus:border-accent focus:bg-white/[0.14]"
          />
          <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-header-text-muted" />
        </div>

        {open && query.trim() && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] max-h-80 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-[var(--shadow-pop)] animate-pop-in">
            {results.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-text-muted">
                No tasks or notes match "{query}"
              </p>
            ) : (
              results.map((r) => (
                <button
                  key={`${r.kind}-${r.id}`}
                  onClick={() => handleSelect(r)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-card-hover"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    {r.kind === "task" ? (
                      <ListChecks className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-text">{r.title}</span>
                    <span className="block truncate text-xs text-text-muted">{r.subtitle}</span>
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
        <Avatar name="John Doe" />
        <span className="text-sm font-medium text-header-text">John Doe</span>
      </div>
      <div className="shrink-0 sm:hidden">
        <Avatar name="John Doe" size={34} />
      </div>
    </header>
  );
}
