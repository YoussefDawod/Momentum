import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "momentum:onboarding-seen";

export const useOnboarding = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    try {
      setShouldShow(window.localStorage.getItem(STORAGE_KEY) !== "1");
    } catch {
      setShouldShow(false);
    }
  }, []);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setShouldShow(false);
  }, []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setShouldShow(true);
  }, []);

  return { shouldShow, dismiss, reset };
};
