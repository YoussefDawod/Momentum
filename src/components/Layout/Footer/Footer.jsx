import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.legal} aria-label="Rechtliches">
          <Link to="/impressum" className={styles.legalLink}>
            Impressum
          </Link>
          <span className={styles.separator} aria-hidden="true">·</span>
          <Link to="/datenschutz" className={styles.legalLink}>
            Datenschutz
          </Link>
        </nav>

        <span className={styles.text}>
          Entwickelt mit
          <Heart size={14} className={styles.heart} aria-hidden="true" />
          von Youssef Dawod
        </span>

        <span className={styles.copy}>© {year} Momentum</span>
      </div>
    </footer>
  );
};

export default Footer;