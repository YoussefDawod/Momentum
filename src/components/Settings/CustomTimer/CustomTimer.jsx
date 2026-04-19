import NumberInput from "../../ui/NumberInput";
import {
  MAX_CYCLES,
  MAX_MINUTES,
  METHOD_KEYS,
  MIN_CYCLES,
  MIN_MINUTES,
} from "../../../utils/constants";
import styles from "./CustomTimer.module.css";

const CustomTimer = ({ custom, onChange, disabled = false, onFocusCustom }) => {
  const handleChange = (key) => (val) => {
    onFocusCustom?.(METHOD_KEYS.CUSTOM);
    onChange({ [key]: val });
  };

  return (
    <div className={styles.grid}>
      <NumberInput
        id="custom-work"
        label="Arbeitszeit"
        value={custom.work}
        onChange={handleChange("work")}
        min={MIN_MINUTES}
        max={MAX_MINUTES}
        suffix="min"
        disabled={disabled}
      />
      <NumberInput
        id="custom-break"
        label="Pausenzeit"
        value={custom.break}
        onChange={handleChange("break")}
        min={MIN_MINUTES}
        max={MAX_MINUTES}
        suffix="min"
        disabled={disabled}
      />
      <NumberInput
        id="custom-cycles"
        label="Zyklen"
        value={custom.cycles}
        onChange={handleChange("cycles")}
        min={MIN_CYCLES}
        max={MAX_CYCLES}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomTimer;
