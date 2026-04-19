import { PHASE, PHASE_LABELS } from "../../../utils/constants";
import styles from "./PhaseIndicator.module.css";

const PhaseIndicator = ({ phase, cycle, totalCycles }) => {
  const label = PHASE_LABELS[phase] ?? PHASE_LABELS[PHASE.IDLE];
  const phaseClass =
    phase === PHASE.WORK ? styles.work : phase === PHASE.BREAK ? styles.break : styles.idle;

  return (
    <div className={[styles.wrapper, phaseClass].join(" ")}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      {phase !== PHASE.IDLE && totalCycles > 0 && (
        <span className={styles.cycle}>
          Zyklus {Math.min(cycle + 1, totalCycles)} von {totalCycles}
        </span>
      )}
    </div>
  );
};

export default PhaseIndicator;
