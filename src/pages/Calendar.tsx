import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Checkbox } from "../components/ui/Checkbox";
import { MonthGrid } from "../components/calendar/MonthGrid";
import { MonthList } from "../components/calendar/MonthList";
import { NotesPanel } from "../components/notes/NotesPanel";
import { MoodSelector } from "../components/mood/MoodSelector";
import { TaskFormModal, type TaskFormValues } from "../components/tasks/TaskFormModal";
import { CATEGORIES } from "../data/categories";
import { useAppData } from "../store/AppDataContext";
import { parseISODate, todayISO, weekdayLong } from "../utils/date";
import { sortByTime, tasksForDate } from "../utils/tasks";

export default function CalendarPage() {
  const { data, selectedDate, setSelectedDate, addTask, toggleTask } = useAppData();
  const today = todayISO();
  const initial = parseISODate(selectedDate || today);
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!selectedDate) setSelectedDate(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToday() {
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setSelectedDate(today);
  }

  function shiftMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  }

  const dayTasks = sortByTime(tasksForDate(data.tasks, selectedDate || today));

  function handleSubmit(values: TaskFormValues) {
    addTask({
      title: values.title.trim(),
      description: values.description.trim() || undefined,
      date: values.date,
      time: values.time || undefined,
      category: values.category,
      priority: values.priority,
      durationMinutes: values.durationMinutes ? Number(values.durationMinutes) : undefined,
    });
    setModalOpen(false);
  }

  const activeDate = selectedDate || today;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text">Calendar</h1>
          <p className="mt-1 font-script text-2xl text-health">
            {weekdayLong(activeDate)}, {parseISODate(activeDate).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={goToday}>
            Today
          </Button>
          <div className="flex items-center rounded-xl border border-border bg-surface">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous month"
              className="rounded-l-xl p-2 text-text-muted hover:bg-card-hover hover:text-text"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-sm font-medium text-text">
              {new Date(viewYear, viewMonth).toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
              className="rounded-r-xl p-2 text-text-muted hover:bg-card-hover hover:text-text"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <Card padded={false}>
        <div className="flex flex-col gap-5 p-5 sm:flex-row">
          <MonthList activeMonth={viewMonth} onSelect={setViewMonth} />
          <div className="min-w-0 flex-1">
            <MonthGrid
              year={viewYear}
              month={viewMonth}
              selectedDate={activeDate}
              onSelect={setSelectedDate}
              data={data}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr_auto]">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-text">
              Tasks for {parseISODate(activeDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </h3>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1 rounded-lg bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent hover:brightness-95"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {dayTasks.length === 0 && (
              <p className="text-sm text-text-faint">Nothing scheduled for this day yet.</p>
            )}
            {dayTasks.map((task) => {
              const meta = CATEGORIES[task.category];
              return (
                <div key={task.id} className="flex items-center gap-2.5">
                  <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} label={task.title} size="sm" />
                  <span
                    className={`min-w-0 flex-1 truncate text-sm ${
                      task.completed ? "text-text-faint line-through" : "text-text"
                    }`}
                  >
                    {task.title}
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.soft} ${meta.text}`}>
                    {meta.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <MoodSelector date={activeDate} title="Mood that day" />

        <div className="min-h-[220px] lg:w-64">
          <NotesPanel date={activeDate} />
        </div>
      </div>

      <TaskFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        defaultDate={activeDate}
        title="Add task"
      />
    </div>
  );
}
