import type { AppData } from "../../types";
import { daysInMonth, firstWeekdayMondayIndex, isToday, toISODate } from "../../utils/date";
import { tasksForDate } from "../../utils/tasks";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface MonthGridProps {
  year: number;
  month: number; // 0-based
  selectedDate: string;
  onSelect: (iso: string) => void;
  data: AppData;
}

function moodDotColor(level?: number): string | null {
  if (!level) return null;
  if (level <= 2) return "bg-bad";
  if (level === 3) return "bg-warn";
  return "bg-good";
}

export function MonthGrid({ year, month, selectedDate, onSelect, data }: MonthGridProps) {
  const total = daysInMonth(year, month);
  const leadingBlanks = firstWeekdayMondayIndex(year, month);
  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5 pb-2">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-xs font-semibold text-accent">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((dayNum, idx) => {
          if (dayNum === null) return <div key={`blank-${idx}`} />;
          const iso = toISODate(new Date(year, month, dayNum));
          const isSelected = iso === selectedDate;
          const dot = moodDotColor(data.moods[iso]);
          const hasTasks = tasksForDate(data.tasks, iso).length > 0;

          return (
            <button
              key={iso}
              type="button"
              onClick={() => onSelect(iso)}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-accent text-white shadow-sm"
                  : isToday(iso)
                    ? "bg-accent-soft text-accent"
                    : "text-text hover:bg-card-hover"
              }`}
            >
              {dayNum}
              <span className="absolute bottom-1.5 flex h-1.5 items-center gap-0.5">
                {dot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
                {!dot && hasTasks && (
                  <span
                    className={`h-1 w-1 rounded-full ${isSelected ? "bg-white/70" : "bg-text-faint"}`}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
