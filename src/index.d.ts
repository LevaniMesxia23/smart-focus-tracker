declare module "smart-focus-tracker" {
  export function useFocusTracker(): {
    report: () => Record<string, {
      focusTime: number;
      focusCount: number;
      lastFocused: number | null;
    }>;
  };
}
