import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ShortcutsModal from "../components/Modals/ShortcutsModal";

const ShortcutsModalContext = createContext(null);

export const ShortcutsModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <ShortcutsModalContext.Provider value={value}>
      {children}
      <ShortcutsModal isOpen={isOpen} onClose={close} />
    </ShortcutsModalContext.Provider>
  );
};

export const useShortcutsModal = () => {
  const ctx = useContext(ShortcutsModalContext);
  if (!ctx) {
    throw new Error("useShortcutsModal must be used inside ShortcutsModalProvider");
  }
  return ctx;
};
