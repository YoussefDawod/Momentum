import { NavLink } from "react-router-dom";
import { Timer, BarChart3, Settings as SettingsIcon } from "lucide-react";
import styles from "./Navigation.module.css";

const NAV_ITEMS = [
  { to: "/", label: "Timer", icon: Timer, end: true },
  { to: "/statistik", label: "Statistik", icon: BarChart3 },
  { to: "/einstellungen", label: "Einstellungen", icon: SettingsIcon },
];

const Navigation = () => {
  return (
    <nav className={styles.nav} aria-label="Hauptnavigation">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            [styles.link, isActive ? styles.active : ""].filter(Boolean).join(" ")
          }
        >
          <Icon className={styles.icon} size={18} aria-hidden="true" />
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
