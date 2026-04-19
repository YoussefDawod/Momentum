import { useCallback, useEffect, useState } from "react";
import { storage } from "../utils/storage";

/**
 * Persistent state that syncs with LocalStorage.
 * Syncs across tabs via the storage event.
 */
export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = storage.get(key, null);
    return stored !== null ? stored : initialValue;
  });

  const setPersistedValue = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        storage.set(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== key || event.newValue === null) return;
      try {
        setValue(JSON.parse(event.newValue));
      } catch {
        // ignore malformed external writes
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [value, setPersistedValue];
};
