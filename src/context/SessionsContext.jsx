import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";

const SessionsContext = createContext(null);

const MAX_SESSIONS = 200;

export const SessionsProvider = ({ children }) => {
  const [sessions, setSessions] = useLocalStorage(STORAGE_KEYS.SESSIONS, []);

  const addSession = useCallback(
    (session) => {
      setSessions((prev) => {
        const entry = {
          id: session.id ?? crypto.randomUUID(),
          date: session.date ?? new Date().toISOString(),
          method: session.method,
          workMinutes: session.workMinutes,
          breakMinutes: session.breakMinutes,
          completedCycles: session.completedCycles,
          totalMinutes: session.totalMinutes,
        };
        const next = [entry, ...(Array.isArray(prev) ? prev : [])];
        return next.slice(0, MAX_SESSIONS);
      });
    },
    [setSessions]
  );

  const clearSessions = useCallback(() => {
    setSessions([]);
  }, [setSessions]);

  const value = useMemo(
    () => ({ sessions: Array.isArray(sessions) ? sessions : [], addSession, clearSessions }),
    [sessions, addSession, clearSessions]
  );

  return <SessionsContext.Provider value={value}>{children}</SessionsContext.Provider>;
};

export const useSessions = () => {
  const ctx = useContext(SessionsContext);
  if (!ctx) throw new Error("useSessions must be used within SessionsProvider");
  return ctx;
};
