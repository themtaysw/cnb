import type { IOS } from "@expo/config-types";
import { ConfigContext, ExpoConfig } from "expo/config";

import pkg from "./package.json";

const VERSION = pkg.version;

const environment = process.env.EXPO_PUBLIC_APP_ENV || "dev";

const getEnvironmentInfo = (): {
  name: ExpoConfig["name"];
  appIdentifier: IOS["bundleIdentifier"];
  // optionally we can have different icons for different environments
  //icon: ExpoConfig["icon"];
} => {
  const appIdentifier = "com.matejcp.cnb";
  const appName = "Rates";

  if (environment === "production")
    return {
      name: appName,
      appIdentifier,
    };

  return {
    name: `${appName} ${environment.toUpperCase()}`,
    appIdentifier: `${appIdentifier}.${environment}`,
  };
};

const { name, appIdentifier } = getEnvironmentInfo();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  version: VERSION,
  name,
  slug: "caliplaces",
  scheme: "caliplaces",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  runtimeVersion: VERSION,
  owner: "caliplaces",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  extra: {
    supportsRTL: true,
    router: {
      origin: false,
    },
    eas: {
      projectId: "XXX",
    },
  },
  updates: {
    //enabled: true,
    //url: "https://u.expo.dev/XXX",
  },
  ios: {
    bundleIdentifier: appIdentifier,
    supportsTablet: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      LSApplicationQueriesSchemes: ["itms-apps"],
      NSLocationWhenInUseUsageDescription:
        "We need your location to be able to help you explore nearby places.",
    },
    config: {
      usesNonExemptEncryption: false,
    },
  },
  androidNavigationBar: {
    enforceContrast: true,
  },
  android: {
    runtimeVersion: VERSION,
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      backgroundColor: "#000000",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
    package: "com.matejcp.cnb",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/expo/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
});
