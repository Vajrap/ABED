import { useEffect } from "react";

interface KeyboardShortcutsCallbacks {
  onNewsOpen: () => void;
  onScheduleOpen: () => void;
}

export function useGameKeyboardShortcuts(callbacks: KeyboardShortcutsCallbacks) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "c":
          // Focus chat - placeholder for now
          break;
        case "s":
          console.log("Skills clicked - S key");
          break;
        case "i":
          console.log("Inventory clicked - I key");
          break;
        case "n":
          callbacks.onNewsOpen();
          break;
        case "t":
          callbacks.onScheduleOpen();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [callbacks]);
}

