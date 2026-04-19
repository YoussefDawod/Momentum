import { HelpCircle } from "lucide-react";
import { useShortcutsModal } from "../../../context/ShortcutsModalContext";
import styles from "./ShortcutsButton.module.css";

const ShortcutsButton = () => {
  const { open } = useShortcutsModal();
  return (
    <button
      type="button"
      className={styles.button}
      onClick={open}
      aria-label="Tastaturkürzel anzeigen"
      title="Tastaturkürzel (?)"
    >
      <HelpCircle size={18} aria-hidden="true" />
    </button>
  );
};

export default ShortcutsButton;
