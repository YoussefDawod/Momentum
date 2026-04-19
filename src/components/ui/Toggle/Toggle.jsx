import styles from "./Toggle.module.css";

const Toggle = ({ id, label, description, checked, onChange, disabled = false }) => {
  return (
    <label className={styles.wrapper} htmlFor={id}>
      <div className={styles.text}>
        <span className={styles.label}>{label}</span>
        {description && <span className={styles.description}>{description}</span>}
      </div>
      <span className={styles.switch}>
        <input
          id={id}
          type="checkbox"
          className={styles.input}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
      </span>
    </label>
  );
};

export default Toggle;
