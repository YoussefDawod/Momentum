import { useEffect } from "react";

const isTypingTarget = (target) => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
};

/**
 * Register global keyboard shortcuts.
 * @param {Record<string, (event: KeyboardEvent) => void>} shortcuts
 *   Key = KeyboardEvent.key (case-insensitive). Use " " for Space.
 * @param {{ enabled?: boolean }} [options]
 */
export const useKeyboardShortcuts = (shortcuts, { enabled = true } = {}) => {
  useEffect(() => {
    if (!enabled) return undefined;
    const handler = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      const key = event.key === " " ? "Space" : event.key;
      const cb =
        shortcuts[key] ??
        shortcuts[key.toLowerCase()] ??
        shortcuts[key.toUpperCase()];
      if (typeof cb === "function") {
        event.preventDefault();
        cb(event);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts, enabled]);
};
