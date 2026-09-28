const DAY_MS = 24 * 60 * 60 * 1000;

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso: string, days: number): string {
  const d = parseISODate(iso);
  return toISODate(new Date(d.getTime() + days * DAY_MS));
}

/** Monday-based start of week */
export function startOfWeek(iso: string): string {
  const d = parseISODate(iso);
  const dow = d.getDay(); // 0 Sun .. 6 Sat
  const diff = dow === 0 ? -6 : 1 - dow;
  return addDays(iso, diff);
}

export function weekDates(anchorIso: string): string[] {
  const start = startOfWeek(anchorIso);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export const WEEKDAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const WEEKDAY_LONG = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const WEEKDAY_LONG_FROM_JS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTH_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTH_SHORT = MONTH_LONG.map((m) => m.slice(0, 3));

export function weekdayLong(iso: string): string {
  return WEEKDAY_LONG_FROM_JS[parseISODate(iso).getDay()];
}

export function weekdayShort(iso: string): string {
  return weekdayLong(iso).slice(0, 3);
}

export function monthLong(monthIndex: number): string {
  return MONTH_LONG[monthIndex];
}

export function monthShort(monthIndex: number): string {
  return MONTH_SHORT[monthIndex];
}

export function formatDayMonth(iso: string): { day: number; month: string } {
  const d = parseISODate(iso);
  return { day: d.getDate(), month: monthShort(d.getMonth()) };
}

export function isSameDay(a: string, b: string): boolean {
  return a === b;
}

export function isToday(iso: string): boolean {
  return iso === todayISO();
}

export function formatTime12h(time?: string): string {
  if (!time) return "";
  const [hStr, mStr] = time.split(":");
  let h = Number(hStr);
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${mStr} ${period}`;
}

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function firstWeekdayMondayIndex(year: number, monthIndex: number): number {
  const jsDow = new Date(year, monthIndex, 1).getDay(); // 0 Sun..6 Sat
  return jsDow === 0 ? 6 : jsDow - 1; // 0 Mon .. 6 Sun
}
