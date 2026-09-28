export type CategoryId = "health" | "design" | "video" | "socials" | "other";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  time?: string; // "HH:MM" 24h, optional (unscheduled)
  category: CategoryId;
  completed: boolean;
  priority: Priority;
  durationMinutes?: number;
  createdAt: string; // ISO timestamp
}

export interface Note {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  createdAt: string;
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface CustomTaskItem {
  id: string;
  title: string;
  done: boolean;
}

export interface CustomPage {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  notes: string;
  tasks: CustomTaskItem[];
  createdAt: string;
}

export type ThemePreference = "light" | "dark" | "system";

export interface JournalState {
  happy: string;
  learned: string;
}

export interface SettingsState {
  defaultCategory: CategoryId;
  notificationsEnabled: boolean;
  compactDensity: boolean;
}

export interface AppData {
  tasks: Task[];
  notes: Note[];
  moods: Record<string, MoodLevel>;
  journal: JournalState;
  customPages: CustomPage[];
  theme: ThemePreference;
  settings: SettingsState;
}
