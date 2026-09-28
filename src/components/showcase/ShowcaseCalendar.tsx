import { MonthGrid } from "../calendar/MonthGrid";
import { useAppData } from "../../store/AppDataContext";
import { parseISODate, todayISO } from "../../utils/date";

/** The real month calendar, presented large — mood dots and task markers included. */
export function ShowcaseCalendar() {
  const { data } = useAppData();
  const today = todayISO();
  const d = parseISODate(today);

  return (
    <div className="pointer-events-none select-none p-5 sm:p-8">
      <MonthGrid year={d.getFullYear()} month={d.getMonth()} selectedDate={today} onSelect={() => {}} data={data} />
    </div>
  );
}
