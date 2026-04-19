/**
 * Momentum - Formatter Utilities
 */

/**
 * Formats seconds into MM:SS display.
 */
export const formatTime = (totalSeconds) => {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

/**
 * Formats minutes into "2h 15min" or "45min".
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes < 1) return "0 min";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} Std`;
  return `${hours} Std ${mins} min`;
};

/**
 * Formats ISO date string into localized German date.
 */
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Formats ISO date string into localized German time (HH:MM).
 */
export const formatClock = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Returns weekday short name (Mo, Di, ...).
 */
export const formatWeekday = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("de-DE", { weekday: "short" });
};

/**
 * Returns tab title for browser tab.
 */
export const formatTabTitle = (timeLeft, phaseLabel, appName = "Momentum") => {
  if (!timeLeft && !phaseLabel) return appName;
  return `${formatTime(timeLeft)} - ${phaseLabel} | ${appName}`;
};
