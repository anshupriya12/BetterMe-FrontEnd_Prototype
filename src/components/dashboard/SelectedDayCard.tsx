import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react";
import { Card } from "../ui/Card";
import { formatDayMonth, isToday, parseISODate, weekdayLong } from "../../utils/date";

const WEATHER_ICONS = [Sun, CloudSun, Cloud, CloudRain];

/** Static counterpart to TodayIsCard: shows a chosen date (Weekly/Calendar selection)
 * instead of the live clock, which only makes sense for the real "today". */
export function SelectedDayCard({ date, title = "Selected day" }: { date: string; title?: string }) {
  const { day, month } = formatDayMonth(date);
  const WeatherIcon = WEATHER_ICONS[parseISODate(date).getDay() % WEATHER_ICONS.length];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-text">{title}</h3>
        {isToday(date) && (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
            Today
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-text">{weekdayLong(date)}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="font-script text-2xl leading-none text-health">
          {month} {day}
        </p>
        <WeatherIcon className="h-6 w-6 text-design" aria-hidden />
      </div>
    </Card>
  );
}
