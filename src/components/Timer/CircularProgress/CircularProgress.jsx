import styles from "./CircularProgress.module.css";
import { PHASE } from "../../../utils/constants";

const SIZE = 300;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CircularProgress = ({ progress = 0, phase = PHASE.IDLE, isRunning = false, children }) => {
  const clamped = Math.max(0, Math.min(1, progress));
  const offset = CIRCUMFERENCE * (1 - clamped);

  const phaseClass =
    phase === PHASE.WORK
      ? styles.work
      : phase === PHASE.BREAK
      ? styles.break
      : styles.idle;

  return (
    <div
      className={[
        styles.wrapper,
        phaseClass,
        isRunning ? styles.running : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        <circle
          className={styles.track}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          fill="none"
        />
        <circle
          className={styles.progress}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default CircularProgress;
