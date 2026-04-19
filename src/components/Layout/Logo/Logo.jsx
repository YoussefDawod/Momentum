import styles from "./Logo.module.css";

/**
 * Minimal brand mark: a soft, warm dot in the primary color.
 * Pairs with the "Momentum" wordmark in the Header.
 */
const Logo = ({ size = 10 }) => {
  return (
    <span
      className={styles.logo}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
};

export default Logo;