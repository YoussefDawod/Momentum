import { Sparkles, Timer, BarChart3, Keyboard } from "lucide-react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button/Button";
import styles from "./WelcomeModal.module.css";

const HIGHLIGHTS = [
  {
    icon: Timer,
    title: "Fokus-Timer mit Methoden",
    text: "Wähle zwischen Klassisch, Tiefenfokus, Sprint oder setze eigene Zeiten.",
  },
  {
    icon: BarChart3,
    title: "Statistiken & Streaks",
    text: "Behalte deine Sitzungen und Fokus-Zeit im Blick – ganz ohne Account.",
  },
  {
    icon: Keyboard,
    title: "Schnell per Tastatur",
    text: "Drücke Space zum Starten, R zum Zurücksetzen, ? für alle Shortcuts.",
  },
];

const WelcomeModal = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="md"
    ariaLabel="Willkommen bei Momentum"
    closeOnBackdrop={false}
  >
    <div className={styles.hero}>
      <div className={styles.iconCircle}>
        <Sparkles size={24} aria-hidden="true" />
      </div>
      <h2 className={styles.title}>Willkommen bei Momentum</h2>
      <p className={styles.lead}>
        Ein minimalistischer Produktivitäts-Timer, der deine Daten
        ausschließlich lokal in deinem Browser speichert.
      </p>
    </div>

    <ul className={styles.list}>
      {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
        <li key={title} className={styles.item}>
          <span className={styles.itemIcon} aria-hidden="true">
            <Icon size={18} />
          </span>
          <div>
            <p className={styles.itemTitle}>{title}</p>
            <p className={styles.itemText}>{text}</p>
          </div>
        </li>
      ))}
    </ul>

    <div className={styles.actions}>
      <Button onClick={onClose}>Los geht&apos;s</Button>
    </div>
  </Modal>
);

export default WelcomeModal;
