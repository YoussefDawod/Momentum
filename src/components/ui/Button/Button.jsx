import styles from "./Button.module.css";

const variantClass = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  danger: styles.danger,
};

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const Button = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  children,
  className = "",
  type = "button",
  ...rest
}) => {
  const classes = [
    styles.button,
    variantClass[variant] ?? styles.primary,
    sizeClass[size] ?? styles.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {Icon && iconPosition === "left" && <Icon className={styles.icon} aria-hidden="true" />}
      {children && <span className={styles.label}>{children}</span>}
      {Icon && iconPosition === "right" && <Icon className={styles.icon} aria-hidden="true" />}
    </button>
  );
};

export default Button;
