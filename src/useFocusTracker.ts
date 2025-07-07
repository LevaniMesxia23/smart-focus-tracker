import { useEffect, useRef } from "react";
import { FocusData } from "./types";

type FocusMap = Map<string, FocusData>;

export function useFocusTracker() {
  const focusMap = useRef<FocusMap>(new Map());

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      const id = el.id;
      if (!id) return;

      const existing = focusMap.current.get(id) || {
        focusTime: 0,
        focusCount: 0,
        lastFocused: null
      };

      focusMap.current.set(id, {
        ...existing,
        focusCount: existing.focusCount + 1,
        lastFocused: Date.now()
      });
    };

    const handleBlur = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      const id = el.id;
      if (!id) return;

      const data = focusMap.current.get(id);
      if (!data?.lastFocused) return;

      const now = Date.now();
      const delta = now - data.lastFocused;

      focusMap.current.set(id, {
        ...data,
        focusTime: data.focusTime + delta,
        lastFocused: null
      });
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  const report = () => {
    const result: Record<string, FocusData> = {};
    focusMap.current.forEach((val, key) => {
      result[key] = val;
    });
    return result;
  };

  return { report };
}
