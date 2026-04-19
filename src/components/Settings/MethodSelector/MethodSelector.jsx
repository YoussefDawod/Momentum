import { METHODS, METHOD_KEYS } from "../../../utils/constants";
import styles from "./MethodSelector.module.css";

const ORDER = [
  METHOD_KEYS.CLASSIC,
  METHOD_KEYS.LONG,
  METHOD_KEYS.SHORT,
  METHOD_KEYS.CUSTOM,
];

const MethodSelector = ({ value, onChange, disabled = false }) => {
  return (
    <div className={styles.grid} role="radiogroup" aria-label="Timer-Methode">
      {ORDER.map((key) => {
        const method = METHODS[key];
        const isActive = value === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={disabled}
            onClick={() => onChange(key)}
            className={[styles.card, isActive ? styles.active : ""]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={styles.label}>{method.label}</span>
            <span className={styles.description}>{method.description}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MethodSelector;
