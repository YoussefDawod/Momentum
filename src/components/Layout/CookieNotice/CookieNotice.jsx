import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import styles from "./CookieNotice.module.css";

const STORAGE_KEY = "momentum:cookie-notice-dismissed";

const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.wrap} role="dialog" aria-live="polite" aria-label="Datenschutzhinweis">
      <div className={styles.inner}>
        <p className={styles.text}>
          Momentum nutzt <strong>keine Tracking-Cookies</strong>. Deine
          Einstellungen werden lokal in deinem Browser gespeichert. Mehr dazu
          in der{" "}
          <Link to="/datenschutz" className={styles.link}>
            Datenschutzerklärung
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className={styles.button}
          aria-label="Hinweis schließen"
        >
          <X size={16} aria-hidden="true" />
          <span>Verstanden</span>
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;
