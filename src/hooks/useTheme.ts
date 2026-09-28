import { useEffect, useState } from "react";
import { useAppData } from "../store/AppDataContext";

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveTheme(preference: "light" | "dark" | "system"): "light" | "dark" {
  return preference === "system" ? (systemPrefersDark() ? "dark" : "light") : preference;
}

/** Read-only: current resolved theme, reactive to preference + OS changes. Safe to call anywhere. */
export function useTheme() {
  const { data, setTheme } = useAppData();
  const [resolved, setResolved] = useState<"light" | "dark">(() => resolveTheme(data.theme));

  useEffect(() => {
    setResolved(resolveTheme(data.theme));
    if (data.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setResolved(e.matches ? "dark" : "light");
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [data.theme]);

  return { preference: data.theme, resolved, setTheme };
}

/** Mounted once at the app root: keeps <html data-theme> in sync with the resolved theme. */
export function useThemeController() {
  const { resolved } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
  }, [resolved]);
}
