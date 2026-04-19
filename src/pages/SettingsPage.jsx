import { Sparkles } from "lucide-react";
import PageWrapper from "../components/Layout/PageWrapper";
import Card, { CardHeader, CardTitle, CardSubtitle, CardBody } from "../components/ui/Card";
import Toggle from "../components/ui/Toggle";
import Button from "../components/ui/Button";
import MethodSelector from "../components/Settings/MethodSelector";
import CustomTimer from "../components/Settings/CustomTimer";
import { useSettings } from "../context/SettingsContext";
import { useTheme } from "../hooks/useTheme";
import { useNotifications } from "../hooks/useNotifications";
import { useOnboarding } from "../hooks/useOnboarding";
import { METHOD_KEYS } from "../utils/constants";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import styles from "./SettingsPage.module.css";

const THEME_OPTIONS = [
  { value: "light", label: "Hell" },
  { value: "dark", label: "Dunkel" },
  { value: "system", label: "System" },
];

const SettingsPage = () => {
  useDocumentTitle("Einstellungen — Momentum");
  const { settings, updateSettings, updateCustom } = useSettings();
  const { theme, setTheme } = useTheme();
  const { supported: notifSupported, permission, request: requestNotif } = useNotifications();
  const { reset: resetOnboarding } = useOnboarding();

  const handleNotifToggle = async (enabled) => {
    if (enabled && permission !== "granted") {
      await requestNotif();
    }
  };

  return (
    <PageWrapper
      title="Einstellungen"
      description="Passe Momentum an deinen Arbeitsstil an. Alle Änderungen werden automatisch gespeichert."
    >
      <Card>
        <CardHeader>
          <CardTitle>Timer-Methode</CardTitle>
          <CardSubtitle>
            Wähle einen Preset oder definiere eigene Zeiten.
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          <MethodSelector
            value={settings.method}
            onChange={(method) => updateSettings({ method })}
          />
          {settings.method === METHOD_KEYS.CUSTOM && (
            <div className={styles.customSection}>
              <CustomTimer
                custom={settings.custom}
                onChange={(patch) => updateCustom(patch)}
              />
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benachrichtigungen</CardTitle>
          <CardSubtitle>Erinnerungen bei Phasenwechsel.</CardSubtitle>
        </CardHeader>
        <CardBody>
          <Toggle
            id="sound-toggle"
            label="Sound bei Phasenwechsel"
            description="Ein akustisches Signal wenn eine Phase endet."
            checked={settings.sound}
            onChange={(val) => updateSettings({ sound: val })}
          />
          <Toggle
            id="notif-toggle"
            label="System-Benachrichtigungen"
            description={
              !notifSupported
                ? "Dein Browser unterstützt keine Benachrichtigungen."
                : permission === "denied"
                ? "In den Browser-Einstellungen blockiert."
                : permission === "granted"
                ? "Aktiv — du bekommst eine Meldung, wenn eine Phase endet."
                : "Erlaube Benachrichtigungen, um bei Phasenwechseln informiert zu werden."
            }
            checked={permission === "granted"}
            onChange={handleNotifToggle}
            disabled={!notifSupported || permission === "denied"}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Erscheinungsbild</CardTitle>
          <CardSubtitle>Wähle das Theme das dir gefällt.</CardSubtitle>
        </CardHeader>
        <CardBody>
          <div className={styles.themeGroup} role="radiogroup" aria-label="Theme-Auswahl">
            {THEME_OPTIONS.map(({ value, label }) => {
              const isActive = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setTheme(value)}
                  className={[styles.themeOption, isActive ? styles.themeActive : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Willkommen-Dialog</CardTitle>
          <CardSubtitle>
            Zeigt beim nächsten Laden die Einführung erneut an.
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          <Button variant="secondary" size="sm" icon={Sparkles} onClick={resetOnboarding}>
            Willkommen erneut anzeigen
          </Button>
        </CardBody>
      </Card>
    </PageWrapper>
  );
};

export default SettingsPage;
