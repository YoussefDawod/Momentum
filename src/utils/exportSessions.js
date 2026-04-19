import { APP_NAME } from "./constants";

const formatStamp = (date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Trigger a JSON file download of the given sessions array.
 * @param {Array<object>} sessions
 */
export const exportSessionsAsJson = (sessions) => {
  if (typeof document === "undefined") return;
  const payload = {
    app: APP_NAME,
    exportedAt: new Date().toISOString(),
    version: 1,
    count: Array.isArray(sessions) ? sessions.length : 0,
    sessions: Array.isArray(sessions) ? sessions : [],
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `momentum-sessions-${formatStamp()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
