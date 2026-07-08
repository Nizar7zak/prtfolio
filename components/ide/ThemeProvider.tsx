"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import {
  applyTheme,
  DEFAULT_THEME_ID,
  getThemeById,
  type IdeTheme,
} from "@/data/ideThemes";

const STORAGE_KEY = "portfolio-ide-theme";

interface ThemeContextValue {
  theme: IdeTheme;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState(DEFAULT_THEME_ID);

  useLayoutEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved ? getThemeById(saved) : getThemeById(DEFAULT_THEME_ID);
    setThemeIdState(initial.id);
    applyTheme(initial);
  }, []);

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
    applyTheme(getThemeById(id));
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme: getThemeById(themeId), setThemeId }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
