/**
 * Momentum - Application Constants
 */

export const STORAGE_KEYS = {
  SETTINGS: "momentum_settings",
  SESSIONS: "momentum_sessions",
  THEME: "momentum_theme",
};

export const METHOD_KEYS = {
  CLASSIC: "classic",
  LONG: "long",
  SHORT: "short",
  CUSTOM: "custom",
};

export const METHODS = {
  [METHOD_KEYS.CLASSIC]: {
    id: METHOD_KEYS.CLASSIC,
    label: "Klassisch",
    description: "25 Min Arbeit, 5 Min Pause",
    work: 25,
    break: 5,
    cycles: 4,
  },
  [METHOD_KEYS.LONG]: {
    id: METHOD_KEYS.LONG,
    label: "Tiefenfokus",
    description: "50 Min Arbeit, 10 Min Pause",
    work: 50,
    break: 10,
    cycles: 4,
  },
  [METHOD_KEYS.SHORT]: {
    id: METHOD_KEYS.SHORT,
    label: "Sprint",
    description: "15 Min Arbeit, 3 Min Pause",
    work: 15,
    break: 3,
    cycles: 4,
  },
  [METHOD_KEYS.CUSTOM]: {
    id: METHOD_KEYS.CUSTOM,
    label: "Benutzerdefiniert",
    description: "Eigene Zeiten festlegen",
    work: 25,
    break: 5,
    cycles: 4,
  },
};

export const PHASE = {
  WORK: "work",
  BREAK: "break",
  IDLE: "idle",
};

export const PHASE_LABELS = {
  [PHASE.WORK]: "Fokus",
  [PHASE.BREAK]: "Pause",
  [PHASE.IDLE]: "Bereit",
};

export const STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
  COMPLETED: "completed",
};

export const DEFAULT_SETTINGS = {
  theme: "system",
  sound: true,
  method: METHOD_KEYS.CLASSIC,
  custom: { work: 25, break: 5, cycles: 4 },
};

export const MIN_MINUTES = 1;
export const MAX_MINUTES = 120;
export const MIN_CYCLES = 1;
export const MAX_CYCLES = 10;

export const APP_NAME = "Momentum";
export const APP_URL = "https://momentum.yellowdeveloper.de";
