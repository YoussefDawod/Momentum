import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./ThemeToggle.module.css";

const ORDER = ["light", "dark", "system"];
const ICONS = { light: Sun, dark: Moon, system: Monitor };
const LABELS = {
  light: "Heller Modus",
  dark: "Dunkler Modus",
  system: "System",
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    const currentIndex = ORDER.indexOf(theme);
    const nextIndex = (currentIndex + 1) % ORDER.length;
    setTheme(ORDER[nextIndex]);
  };

  const Icon = ICONS[theme] ?? Monitor;

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleClick}
      aria-label={`Theme wechseln - aktuell: ${LABELS[theme]}`}
      title={LABELS[theme]}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
