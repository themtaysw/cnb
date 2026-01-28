import { Stack } from "expo-router";

import { onAppStateChange } from "@/src/common/appState";
import { Providers } from "@/src/components/Providers";
import { useAppState } from "@/src/hooks/useAppState";
import { useOnlineManager } from "@/src/hooks/useOnlineManager";

export default function RootLayout() {
  useOnlineManager();

  useAppState(onAppStateChange);
  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  );
}
