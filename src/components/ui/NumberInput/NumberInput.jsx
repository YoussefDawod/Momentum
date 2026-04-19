import { Minus, Plus } from "lucide-react";
import styles from "./NumberInput.module.css";

const NumberInput = ({
  id,
  label,
  value,
  onChange,
  min = 1,
  max = 999,
  step = 1,
  suffix,
  disabled = false,
}) => {
  const clamp = (n) => Math.min(max, Math.max(min, n));

  const handleDecrement = () => onChange(clamp(Number(value) - step));
  const handleIncrement = () => onChange(clamp(Number(value) + step));
  const handleInput = (e) => {
    const n = Number(e.target.value);
    if (!Number.isNaN(n)) onChange(clamp(n));
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputGroup}>
        <button
          type="button"
          className={styles.stepButton}
          onClick={handleDecrement}
          disabled={disabled || Number(value) <= min}
          aria-label="Verringern"
        >
          <Minus size={16} aria-hidden="true" />
        </button>
        <div className={styles.inputWrap}>
          <input
            id={id}
            type="number"
            className={styles.input}
            value={value}
            onChange={handleInput}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            inputMode="numeric"
          />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        <button
          type="button"
          className={styles.stepButton}
          onClick={handleIncrement}
          disabled={disabled || Number(value) >= max}
          aria-label="Erhöhen"
        >
          <Plus size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
