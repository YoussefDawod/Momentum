import { useCallback, useMemo } from "react";
import { useSettings } from "../context/SettingsContext";
import { useTimerContext } from "../context/TimerContext";
import { useShortcutsModal } from "../context/ShortcutsModalContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import CircularProgress from "../components/Timer/CircularProgress";
import TimerDisplay from "../components/Timer/TimerDisplay";
import PhaseIndicator from "../components/Timer/PhaseIndicator";
import TimerControls from "../components/Timer/TimerControls";
import { METHODS, STATUS } from "../utils/constants";
import styles from "./TimerPage.module.css";

const TimerPage = () => {
  const { settings } = useSettings();
  const { timer, taskLabel, setTaskLabel } = useTimerContext();
  const { open: openShortcuts, isOpen: shortcutsOpen } = useShortcutsModal();

  const methodLabel = useMemo(
    () => METHODS[settings.method]?.label ?? "",
    [settings.method]
  );

  const baseTitle =
    timer.status === STATUS.RUNNING || timer.status === STATUS.PAUSED
      ? null
      : "Momentum — Produktivitäts-Timer";
  useDocumentTitle(baseTitle);

  const toggleRun = useCallback(() => {
    if (timer.status === STATUS.IDLE || timer.status === STATUS.COMPLETED) {
      timer.start();
    } else if (timer.status === STATUS.RUNNING) {
      timer.pause();
    } else if (timer.status === STATUS.PAUSED) {
      timer.resume();
    }
  }, [timer]);

  const shortcuts = useMemo(
    () => ({
      Space: toggleRun,
      r: () => timer.reset(),
      "?": openShortcuts,
    }),
    [toggleRun, timer, openShortcuts]
  );

  useKeyboardShortcuts(shortcuts, { enabled: !shortcutsOpen });

  const inputDisabled =
    timer.status === STATUS.RUNNING || timer.status === STATUS.PAUSED;

  return (
    <div className={styles.page}>
      <div className={styles.stack}>
        <div className={styles.methodTag}>
          <span className={styles.methodDot} aria-hidden="true" />
          <span>{methodLabel}</span>
        </div>

        <label className={styles.taskLabel} htmlFor="task-label">
          <span className={styles.taskLabelText}>Woran arbeitest du?</span>
          <input
            id="task-label"
            name="task-label"
            type="text"
            className={styles.taskInput}
            placeholder="z. B. Kapitel 3 schreiben (optional)"
            value={taskLabel}
            onChange={(e) => setTaskLabel(e.target.value)}
            maxLength={80}
            disabled={inputDisabled}
            autoComplete="off"
            aria-label="Aufgabenbeschreibung"
          />
        </label>

        <CircularProgress
          progress={timer.progress}
          phase={timer.phase}
          isRunning={timer.status === STATUS.RUNNING}
        >
          <PhaseIndicator
            phase={timer.phase}
            cycle={timer.cycle}
            totalCycles={timer.totalCycles}
          />
          <TimerDisplay seconds={timer.timeLeft} />
          {timer.status === STATUS.COMPLETED && (
            <p className={styles.doneText}>Sitzung abgeschlossen</p>
          )}
        </CircularProgress>

        <TimerControls
          status={timer.status}
          onStart={timer.start}
          onPause={timer.pause}
          onResume={timer.resume}
          onReset={timer.reset}
        />
      </div>
    </div>
  );
};

export default TimerPage;