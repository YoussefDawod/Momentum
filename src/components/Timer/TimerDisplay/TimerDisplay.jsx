import { formatTime } from "../../../utils/formatters";
import styles from "./TimerDisplay.module.css";

const TimerDisplay = ({ seconds }) => {
  return (
    <time className={styles.time} dateTime={`PT${seconds}S`} aria-live="polite">
      {formatTime(seconds)}
    </time>
  );
};

export default TimerDisplay;
