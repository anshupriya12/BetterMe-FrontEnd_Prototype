import { useEffect, useRef } from "react";
import { monthLong } from "../../utils/date";

interface MonthListProps {
  activeMonth: number;
  onSelect: (month: number) => void;
}

export function MonthList({ activeMonth, onSelect }: MonthListProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeMonth]);

  return (
    <div className="flex shrink-0 flex-col gap-1 border-b border-border pb-4 sm:w-32 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
      <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-text-faint">Month</p>
      <div className="flex gap-1 overflow-x-auto sm:flex-col sm:overflow-visible">
        {Array.from({ length: 12 }, (_, m) => m).map((m) => (
          <button
            key={m}
            ref={m === activeMonth ? activeRef : undefined}
            type="button"
            onClick={() => onSelect(m)}
            className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
              m === activeMonth ? "bg-accent-soft text-accent" : "text-text-muted hover:text-text"
            }`}
          >
            {monthLong(m)}
          </button>
        ))}
      </div>
    </div>
  );
}
