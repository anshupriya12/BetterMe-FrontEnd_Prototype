import type { AppData, MoodLevel, Task } from "../types";
import { addDays, todayISO, weekDates } from "../utils/date";

let seedCounter = 0;
function nextId(prefix: string): string {
  seedCounter += 1;
  return `${prefix}-${seedCounter}-${Date.now().toString(36)}`;
}

interface TaskSeed {
  title: string;
  category: Task["category"];
  time?: string;
  priority?: Task["priority"];
  durationMinutes?: number;
  completed?: boolean;
}

/** Per relative-day templates: index 0 = Monday of the seeded week. */
const WEEK_TEMPLATE: TaskSeed[][] = [
  [
    { title: "80 Crunches", category: "health", time: "07:30", durationMinutes: 15 },
    { title: "60 Push-Ups", category: "health", time: "07:50", durationMinutes: 10 },
    { title: "1 Hour Figma", category: "design", time: "11:00", durationMinutes: 60 },
    { title: "Make Behance Post", category: "design", time: "15:00", durationMinutes: 45 },
  ],
  [
    { title: "80 Crunches", category: "health", time: "07:30", durationMinutes: 15 },
    { title: "Behance Post", category: "design", time: "12:00", durationMinutes: 40 },
    { title: "Video Editing", category: "video", time: "17:00", durationMinutes: 50 },
  ],
  [
    { title: "80 Pushups", category: "health", time: "07:30", durationMinutes: 15 },
    { title: "Create Behance Post", category: "design", time: "11:00", durationMinutes: 45 },
    { title: "12 Pushups", category: "health", time: "13:00", durationMinutes: 10 },
    { title: "Upload Behance Post", category: "socials", time: "18:00", durationMinutes: 10 },
    { title: "30 Crunches", category: "health", time: "18:30", durationMinutes: 12 },
  ],
  [
    { title: "80 Pushups", category: "health", time: "08:00", durationMinutes: 15 },
    { title: "Dribbble Work", category: "design", time: "10:30", durationMinutes: 60 },
    { title: "Video Editing", category: "video", time: "16:00", durationMinutes: 55 },
  ],
  [
    { title: "80 Pushups", category: "health", time: "08:00", durationMinutes: 15 },
    { title: "1 Behance Post", category: "design", time: "12:00", durationMinutes: 40 },
    { title: "Video Editing", category: "video", time: "17:30", durationMinutes: 40 },
  ],
  [
    { title: "80 Crunches", category: "health", time: "09:00", durationMinutes: 15 },
    { title: "80 Push-Ups", category: "health", time: "09:20", durationMinutes: 10 },
    { title: "UI/UX Certification", category: "design", time: "14:00", durationMinutes: 90 },
  ],
  [
    { title: "80 Pushups", category: "health", time: "09:30", durationMinutes: 15 },
    { title: "1 Behance Post", category: "design", time: "13:00", durationMinutes: 40 },
    { title: "Video Editing", category: "video", time: "16:30", durationMinutes: 35 },
  ],
];

const TODAY_EXTRA: TaskSeed[] = [
  { title: "Upload on Instagram", category: "socials", time: "18:00", durationMinutes: 10 },
  { title: "Upload on LinkedIn", category: "socials", time: "18:15", durationMinutes: 10 },
  { title: "Water the Plants", category: "other", priority: "low" },
  { title: "Write Script for Video", category: "other", priority: "high" },
];

function buildTasksForWeek(anchorIso: string): Task[] {
  const dates = weekDates(anchorIso);
  const today = todayISO();
  const todayIdx = dates.indexOf(today);
  const tasks: Task[] = [];

  dates.forEach((date, idx) => {
    const template = WEEK_TEMPLATE[idx % WEEK_TEMPLATE.length];
    const isPast = todayIdx >= 0 ? idx < todayIdx : true;
    const isToday = date === today;

    template.forEach((seed, seedIdx) => {
      let completed = seed.completed ?? false;
      if (isPast) completed = true;
      else if (isToday) completed = seedIdx % 2 === 0; // alternate so "today" looks in-progress
      else completed = false;

      tasks.push({
        id: nextId("task"),
        title: seed.title,
        date,
        time: seed.time,
        category: seed.category,
        completed,
        priority: seed.priority ?? (seedIdx === 0 ? "high" : "medium"),
        durationMinutes: seed.durationMinutes,
        createdAt: new Date().toISOString(),
      });
    });

    if (isToday) {
      TODAY_EXTRA.forEach((seed, seedIdx) => {
        tasks.push({
          id: nextId("task"),
          title: seed.title,
          date,
          time: seed.time,
          category: seed.category,
          completed: seedIdx === 999 ? true : false,
          priority: seed.priority ?? "medium",
          durationMinutes: seed.durationMinutes,
          createdAt: new Date().toISOString(),
        });
      });
    }
  });

  return tasks;
}

function buildMoods(anchorIso: string): Record<string, MoodLevel> {
  const dates = weekDates(anchorIso);
  const today = todayISO();
  const pattern: MoodLevel[] = [4, 3, 5, 4, 2, 5, 4];
  const moods: Record<string, MoodLevel> = {};
  dates.forEach((date, idx) => {
    if (date <= today) moods[date] = pattern[idx % pattern.length];
  });
  return moods;
}

export function generateSeedData(): AppData {
  const anchor = todayISO();
  const tasks = buildTasksForWeek(anchor);
  const moods = buildMoods(anchor);
  const today = todayISO();

  return {
    tasks,
    notes: [
      {
        id: nextId("note"),
        date: today,
        text: "Finish the productivity dashboard",
        createdAt: new Date().toISOString(),
      },
      {
        id: nextId("note"),
        date: today,
        text: "Review DSA for 30 minutes",
        createdAt: new Date().toISOString(),
      },
      {
        id: nextId("note"),
        date: addDays(today, -1),
        text: "Client call moved to 4 PM",
        createdAt: new Date().toISOString(),
      },
    ],
    moods,
    journal: {
      happy: "Creating a page in 10 mins",
      learned: "Colour grading in Resolve",
    },
    customPages: [],
    theme: "system",
    settings: {
      defaultCategory: "other",
      notificationsEnabled: true,
      compactDensity: false,
    },
  };
}
