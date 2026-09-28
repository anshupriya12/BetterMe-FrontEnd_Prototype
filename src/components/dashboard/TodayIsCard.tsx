import { useEffect, useState } from "react";
import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react";
import { Card } from "../ui/Card";
import { weekdayLong, formatDayMonth, parseISODate } from "../../utils/date";

const WEATHER_ICONS = [Sun, CloudSun, Cloud, CloudRain];

export function TodayIsCard({ title = "Today is" }: { title?: string }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  const { day, month } = formatDayMonth(iso);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const WeatherIcon = WEATHER_ICONS[parseISODate(iso).getDay() % WEATHER_ICONS.length];

  return (
    <Card>
      <h3 className="text-[15px] font-semibold text-text">{title}</h3>
      <p className="mt-3 text-base font-medium text-text">{weekdayLong(iso)}</p>
      <p className="mt-1 text-4xl font-bold tracking-tight text-accent">
        {hh}:{mm}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <p className="font-script text-2xl leading-none text-health">
          {month} {day}
        </p>
        <WeatherIcon className="h-6 w-6 text-design" aria-hidden />
      </div>
    </Card>
  );
}
