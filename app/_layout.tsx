import { Stack } from "expo-router";

import { onAppStateChange } from "@/src/common/appState";
import { Providers } from "@/src/components/Providers";
import { ErrorBoundary } from "@/src/features/error/components/ErrorBoundary";
import { useAppState } from "@/src/hooks/useAppState";
import { useOnlineManager } from "@/src/hooks/useOnlineManager";

export default function RootLayout() {
  useOnlineManager();

  useAppState(onAppStateChange);
  return (
    <Providers>
      <ErrorBoundary>
        <Stack screenOptions={{ headerShown: false }} />
      </ErrorBoundary>
    </Providers>
  );
}
