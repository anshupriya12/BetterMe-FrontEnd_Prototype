import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type {
  AppData,
  CategoryId,
  CustomPage,
  MoodLevel,
  Note,
  Priority,
  SettingsState,
  Task,
  ThemePreference,
} from "../types";
import { generateSeedData } from "../data/mockData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { todayISO } from "../utils/date";

const STORAGE_KEY = "betterme:data:v1";

function makeId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;
}

export interface NewTaskInput {
  title: string;
  date: string;
  time?: string;
  category: CategoryId;
  priority?: Priority;
  description?: string;
  durationMinutes?: number;
}

interface AppDataValue {
  data: AppData;
  selectedDate: string;
  setSelectedDate: (iso: string) => void;

  addTask: (input: NewTaskInput) => Task;
  updateTask: (id: string, patch: Partial<Omit<Task, "id">>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;

  addNote: (date: string, text: string) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;

  setMood: (date: string, level: MoodLevel) => void;

  setJournal: (field: "happy" | "learned", value: string) => void;

  addCustomPage: (page: Omit<CustomPage, "id" | "createdAt">) => void;
  updateCustomPage: (id: string, patch: Partial<Omit<CustomPage, "id">>) => void;
  deleteCustomPage: (id: string) => void;

  setTheme: (theme: ThemePreference) => void;
  updateSettings: (patch: Partial<SettingsState>) => void;

  resetDemoData: () => void;
  clearAllData: () => void;
}

const AppDataContext = createContext<AppDataValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useLocalStorage<AppData>(STORAGE_KEY, generateSeedData);
  const [selectedDate, setSelectedDate] = useState<string>(todayISO());

  const addTask = useCallback(
    (input: NewTaskInput): Task => {
      const task: Task = {
        id: makeId("task"),
        title: input.title,
        description: input.description,
        date: input.date,
        time: input.time,
        category: input.category,
        completed: false,
        priority: input.priority ?? "medium",
        durationMinutes: input.durationMinutes,
        createdAt: new Date().toISOString(),
      };
      setData((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
      return task;
    },
    [setData],
  );

  const updateTask = useCallback(
    (id: string, patch: Partial<Omit<Task, "id">>) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      }));
    },
    [setData],
  );

  const deleteTask = useCallback(
    (id: string) => {
      setData((prev) => ({ ...prev, tasks: prev.tasks.filter((t) => t.id !== id) }));
    },
    [setData],
  );

  const toggleTask = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      }));
    },
    [setData],
  );

  const addNote = useCallback(
    (date: string, text: string) => {
      if (!text.trim()) return;
      const note: Note = { id: makeId("note"), date, text: text.trim(), createdAt: new Date().toISOString() };
      setData((prev) => ({ ...prev, notes: [...prev.notes, note] }));
    },
    [setData],
  );

  const updateNote = useCallback(
    (id: string, text: string) => {
      setData((prev) => ({
        ...prev,
        notes: prev.notes.map((n) => (n.id === id ? { ...n, text } : n)),
      }));
    },
    [setData],
  );

  const deleteNote = useCallback(
    (id: string) => {
      setData((prev) => ({ ...prev, notes: prev.notes.filter((n) => n.id !== id) }));
    },
    [setData],
  );

  const setMood = useCallback(
    (date: string, level: MoodLevel) => {
      setData((prev) => ({ ...prev, moods: { ...prev.moods, [date]: level } }));
    },
    [setData],
  );

  const setJournal = useCallback(
    (field: "happy" | "learned", value: string) => {
      setData((prev) => ({ ...prev, journal: { ...prev.journal, [field]: value } }));
    },
    [setData],
  );

  const addCustomPage = useCallback(
    (page: Omit<CustomPage, "id" | "createdAt">) => {
      const newPage: CustomPage = { ...page, id: makeId("page"), createdAt: new Date().toISOString() };
      setData((prev) => ({ ...prev, customPages: [newPage, ...prev.customPages] }));
    },
    [setData],
  );

  const updateCustomPage = useCallback(
    (id: string, patch: Partial<Omit<CustomPage, "id">>) => {
      setData((prev) => ({
        ...prev,
        customPages: prev.customPages.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      }));
    },
    [setData],
  );

  const deleteCustomPage = useCallback(
    (id: string) => {
      setData((prev) => ({ ...prev, customPages: prev.customPages.filter((p) => p.id !== id) }));
    },
    [setData],
  );

  const setTheme = useCallback(
    (theme: ThemePreference) => {
      setData((prev) => ({ ...prev, theme }));
    },
    [setData],
  );

  const updateSettings = useCallback(
    (patch: Partial<SettingsState>) => {
      setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
    },
    [setData],
  );

  const resetDemoData = useCallback(() => {
    setData(generateSeedData());
  }, [setData]);

  const clearAllData = useCallback(() => {
    setData((prev) => ({
      tasks: [],
      notes: [],
      moods: {},
      journal: { happy: "", learned: "" },
      customPages: [],
      theme: prev.theme,
      settings: prev.settings,
    }));
  }, [setData]);

  const value = useMemo<AppDataValue>(
    () => ({
      data,
      selectedDate,
      setSelectedDate,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      addNote,
      updateNote,
      deleteNote,
      setMood,
      setJournal,
      addCustomPage,
      updateCustomPage,
      deleteCustomPage,
      setTheme,
      updateSettings,
      resetDemoData,
      clearAllData,
    }),
    [
      data,
      selectedDate,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      addNote,
      updateNote,
      deleteNote,
      setMood,
      setJournal,
      addCustomPage,
      updateCustomPage,
      deleteCustomPage,
      setTheme,
      updateSettings,
      resetDemoData,
      clearAllData,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
