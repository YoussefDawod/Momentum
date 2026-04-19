import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DEFAULT_SETTINGS, METHODS, METHOD_KEYS, STORAGE_KEYS } from "../utils/constants";

const SettingsContext = createContext(null);

const mergeSettings = (stored) => ({
  ...DEFAULT_SETTINGS,
  ...(stored ?? {}),
  custom: {
    ...DEFAULT_SETTINGS.custom,
    ...((stored && stored.custom) ?? {}),
  },
});

export const SettingsProvider = ({ children }) => {
  const [raw, setRaw] = useLocalStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const settings = useMemo(() => mergeSettings(raw), [raw]);

  const updateSettings = useCallback(
    (patch) => {
      setRaw((prev) => ({ ...mergeSettings(prev), ...patch }));
    },
    [setRaw]
  );

  const updateCustom = useCallback(
    (patch) => {
      setRaw((prev) => {
        const merged = mergeSettings(prev);
        return { ...merged, custom: { ...merged.custom, ...patch } };
      });
    },
    [setRaw]
  );

  const activeMethod = useMemo(() => {
    const method = METHODS[settings.method] ?? METHODS[METHOD_KEYS.CLASSIC];
    if (settings.method === METHOD_KEYS.CUSTOM) {
      return {
        ...method,
        work: settings.custom.work,
        break: settings.custom.break,
        cycles: settings.custom.cycles,
      };
    }
    return method;
  }, [settings]);

  const value = useMemo(
    () => ({ settings, updateSettings, updateCustom, activeMethod }),
    [settings, updateSettings, updateCustom, activeMethod]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
};
