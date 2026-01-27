import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState } from "react-native";

export const useAppState = (onChange: (status: AppStateStatus) => void) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, [onChange]);
};
