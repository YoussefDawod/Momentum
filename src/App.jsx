import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import CookieNotice from "./components/Layout/CookieNotice";
import WelcomeModal from "./components/Modals/WelcomeModal";
import TimerPage from "./pages/TimerPage";
import { ThemeProvider } from "./hooks/useTheme";
import { SettingsProvider } from "./context/SettingsContext";
import { SessionsProvider } from "./context/SessionsContext";
import { TimerProvider } from "./context/TimerContext";
import { ShortcutsModalProvider } from "./context/ShortcutsModalContext";
import { useOnboarding } from "./hooks/useOnboarding";

const StatsPage = lazy(() => import("./pages/StatsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ImpressumPage = lazy(() => import("./pages/ImpressumPage"));
const DatenschutzPage = lazy(() => import("./pages/DatenschutzPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const RouteFallback = () => (
  <div
    role="status"
    aria-live="polite"
    style={{
      minHeight: "60vh",
      display: "grid",
      placeItems: "center",
      color: "var(--color-text-muted)",
      fontSize: "0.95rem",
    }}
  >
    <span>Lade …</span>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <main className="main-content" key={location.pathname}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/" element={<TimerPage />} />
          <Route path="/statistik" element={<StatsPage />} />
          <Route path="/einstellungen" element={<SettingsPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/stats" element={<Navigate to="/statistik" replace />} />
          <Route path="/settings" element={<Navigate to="/einstellungen" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>
  );
};

const AppShell = () => {
  const { shouldShow, dismiss } = useOnboarding();
  return (
    <div className="app-root">
      <Header />
      <AnimatedRoutes />
      <Footer />
      <CookieNotice />
      <WelcomeModal isOpen={shouldShow} onClose={dismiss} />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <SessionsProvider>
          <TimerProvider>
            <BrowserRouter>
              <ShortcutsModalProvider>
                <AppShell />
              </ShortcutsModalProvider>
            </BrowserRouter>
          </TimerProvider>
        </SessionsProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;