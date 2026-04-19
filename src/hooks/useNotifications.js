import { useCallback, useEffect, useState } from "react";

const isSupported =
  typeof window !== "undefined" && "Notification" in window;

/**
 * Thin wrapper over the Web Notifications API.
 * Returns current permission state + helpers to request and send notifications.
 */
export const useNotifications = () => {
  const [permission, setPermission] = useState(
    isSupported ? Notification.permission : "unsupported"
  );

  useEffect(() => {
    if (!isSupported) return;
    setPermission(Notification.permission);
  }, []);

  const request = useCallback(async () => {
    if (!isSupported) return "unsupported";
    if (Notification.permission === "granted") {
      setPermission("granted");
      return "granted";
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const notify = useCallback((title, options = {}) => {
    if (!isSupported || Notification.permission !== "granted") return null;
    try {
      return new Notification(title, {
        icon: "/favicon.svg",
        badge: "/favicon.svg",
        silent: false,
        ...options,
      });
    } catch {
      return null;
    }
  }, []);

  return {
    supported: isSupported,
    permission,
    request,
    notify,
  };
};
