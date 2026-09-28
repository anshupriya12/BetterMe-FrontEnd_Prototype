import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: () => T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) return JSON.parse(raw) as T;
    } catch {
      // ignore malformed storage
    }
    return initialValue();
  });

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable; fail silently for prototype
    }
  }, [key, value]);

  return [value, setValue] as const;
}
