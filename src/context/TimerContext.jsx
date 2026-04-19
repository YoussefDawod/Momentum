import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useSettings } from "./SettingsContext";
import { useSessions } from "./SessionsContext";
import { useTimer } from "../hooks/useTimer";
import { useSound } from "../hooks/useSound";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useNotifications } from "../hooks/useNotifications";
import { APP_NAME, PHASE, PHASE_LABELS, STATUS } from "../utils/constants";
import { formatTabTitle } from "../utils/formatters";

const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const { settings, activeMethod } = useSettings();
  const { addSession } = useSessions();
  const { play } = useSound(settings.sound);
  const { notify, permission } = useNotifications();
  const [taskLabel, setTaskLabel] = useState("");

  const handlePhaseChange = useCallback(
    ({ finishedPhase }) => {
      if (finishedPhase === PHASE.WORK || finishedPhase === PHASE.BREAK) {
        play();
        if (permission === "granted") {
          const goingToBreak = finishedPhase === PHASE.WORK;
          notify(
            goingToBreak ? "Zeit für eine Pause" : "Weiter geht's mit dem Fokus",
            {
              body: goingToBreak
                ? "Die Fokus-Phase ist abgeschlossen."
                : "Die Pause ist vorbei.",
              tag: "momentum-phase",
            }
          );
        }
      }
    },
    [play, notify, permission]
  );

  const handleComplete = useCallback(
    ({ totalCycles, workSeconds, breakSeconds }) => {
      addSession({
        method: settings.method,
        workMinutes: workSeconds / 60,
        breakMinutes: breakSeconds / 60,
        completedCycles: totalCycles,
        totalMinutes: (totalCycles * (workSeconds + breakSeconds)) / 60,
        task: taskLabel.trim() || null,
      });
      play();
      if (permission === "granted") {
        notify("Sitzung abgeschlossen 🎉", {
          body: taskLabel.trim()
            ? `Großartig! Du hast "${taskLabel.trim()}" geschafft.`
            : "Großartige Arbeit. Du hast alle Zyklen abgeschlossen.",
          tag: "momentum-complete",
        });
      }
    },
    [addSession, play, notify, permission, settings.method, taskLabel]
  );

  const timer = useTimer({
    workMinutes: activeMethod.work,
    breakMinutes: activeMethod.break,
    cycles: activeMethod.cycles,
    onPhaseChange: handlePhaseChange,
    onComplete: handleComplete,
  });

  const tabTitle = useMemo(() => {
    if (timer.status === STATUS.RUNNING || timer.status === STATUS.PAUSED) {
      return formatTabTitle(timer.timeLeft, PHASE_LABELS[timer.phase], APP_NAME);
    }
    return null;
  }, [timer.status, timer.timeLeft, timer.phase]);

  useDocumentTitle(tabTitle);

  const value = useMemo(
    () => ({ timer, taskLabel, setTaskLabel }),
    [timer, taskLabel]
  );

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimerContext = () => {
  const ctx = useContext(TimerContext);
  if (!ctx) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return ctx;
};
