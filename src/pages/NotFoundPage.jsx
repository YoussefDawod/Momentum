import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  useDocumentTitle("Seite nicht gefunden — Momentum");
  return (
    <div className={styles.page}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Seite nicht gefunden</h1>
      <p className={styles.description}>
        Diese Seite existiert nicht oder wurde verschoben.
      </p>
      <Link to="/" className={styles.link}>
        <Button variant="primary" icon={ArrowLeft}>
          Zurück zum Timer
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
