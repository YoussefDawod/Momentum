import { createContext, useContext, useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";

const ThemeContext = createContext(null);

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const resolveTheme = (preference) =>
  preference === "system" ? getSystemTheme() : preference;

export const ThemeProvider = ({ children }) => {
  const [preference, setPreference] = useLocalStorage(STORAGE_KEYS.THEME, "system");

  // Apply to <html> whenever preference or system change.
  useEffect(() => {
    const apply = () => {
      document.documentElement.setAttribute("data-theme", resolveTheme(preference));
    };
    apply();

    if (preference !== "system") return undefined;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [preference]);

  const setTheme = useCallback(
    (next) => setPreference(next),
    [setPreference]
  );

  const value = useMemo(
    () => ({
      theme: preference,
      resolvedTheme: resolveTheme(preference),
      setTheme,
    }),
    [preference, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
