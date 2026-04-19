import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import ThemeToggle from "../ThemeToggle";
import ShortcutsButton from "../ShortcutsButton";
import Logo from "../Logo";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Momentum Startseite">
          <span className={styles.brandName}>Momentum</span>
          <Logo />
        </Link>

        <div className={styles.navWrap}>
          <Navigation />
        </div>

        <div className={styles.actions}>
          <ShortcutsButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
