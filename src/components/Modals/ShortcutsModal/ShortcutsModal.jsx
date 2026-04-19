import Modal from "../../ui/Modal";
import styles from "./ShortcutsModal.module.css";

const SHORTCUTS = [
  { keys: ["Space"], description: "Timer starten / pausieren / fortsetzen" },
  { keys: ["R"], description: "Timer zurücksetzen" },
  { keys: ["?"], description: "Diese Übersicht öffnen" },
  { keys: ["Esc"], description: "Dialog schließen" },
];

const ShortcutsModal = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Tastaturkürzel"
    size="sm"
    ariaLabel="Übersicht Tastaturkürzel"
  >
    <ul className={styles.list}>
      {SHORTCUTS.map(({ keys, description }) => (
        <li key={description} className={styles.row}>
          <span className={styles.keys}>
            {keys.map((k) => (
              <kbd key={k} className={styles.kbd}>
                {k}
              </kbd>
            ))}
          </span>
          <span className={styles.description}>{description}</span>
        </li>
      ))}
    </ul>
  </Modal>
);

export default ShortcutsModal;
