import { Play, Pause, RotateCcw } from "lucide-react";
import Button from "../../ui/Button";
import { STATUS } from "../../../utils/constants";
import styles from "./TimerControls.module.css";

const TimerControls = ({ status, onStart, onPause, onResume, onReset }) => {
  const isRunning = status === STATUS.RUNNING;
  const isPaused = status === STATUS.PAUSED;
  const isIdle = status === STATUS.IDLE || status === STATUS.COMPLETED;

  const handlePrimary = () => {
    if (isRunning) return onPause();
    if (isPaused) return onResume();
    return onStart();
  };

  const primaryLabel = isRunning ? "Pause" : isPaused ? "Fortsetzen" : "Los geht's";
  const PrimaryIcon = isRunning ? Pause : Play;

  return (
    <div className={styles.controls}>
      <Button
        variant="primary"
        size="lg"
        onClick={handlePrimary}
        icon={PrimaryIcon}
        className={styles.primaryAction}
      >
        {primaryLabel}
      </Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={onReset}
        icon={RotateCcw}
        disabled={isIdle && status !== STATUS.COMPLETED}
      >
        Zurücksetzen
      </Button>
    </div>
  );
};

export default TimerControls;
