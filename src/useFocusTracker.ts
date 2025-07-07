import { useEffect, useRef } from "react";
import { FocusData } from "./types.js";

interface InternalFocusData extends FocusData {
  _lastFocusedTimestamp?: number;
}

type FocusMap = Map<string, InternalFocusData>;

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

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
        lastFocused: null,
      };

      const now = Date.now();
      focusMap.current.set(id, {
        ...existing,
        focusCount: existing.focusCount + 1,
        lastFocused: formatDate(now),
        _lastFocusedTimestamp: now,
      });
    };

    const handleBlur = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      const id = el.id;
      if (!id) return;

      const data = focusMap.current.get(id);
      if (!data?.lastFocused || !data._lastFocusedTimestamp) return;

      const now = Date.now();
      const delta = now - data._lastFocusedTimestamp;

      focusMap.current.set(id, {
        ...data,
        focusTime: data.focusTime + delta,
        lastFocused: null,
        _lastFocusedTimestamp: undefined,
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
      const { _lastFocusedTimestamp, ...cleanData } = val;
      result[key] = cleanData;
    });
    return result;
  };

  return { report };
}
