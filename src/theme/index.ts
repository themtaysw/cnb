import colors from "@/src/theme/colors";
import { vs } from "@/src/utils/normalize";

const palette = {
  ...colors.primary,
  ...colors.secondary,
  ...colors.informational,
  ...colors.prime,
};

export const theme = {
  colors: {
    ...palette,
    transparent: "transparent",
    primary_bg: colors.primary.bg,
    secondary_bg: colors.secondary.bg,
    primary_text: colors.primary.text,
    secondary_text: colors.secondary.text,
  },
  spacing: {
    0: 0,
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 6,
    md: 8,
    "spacer-1": 10,
    lg: 12,
    xl: 16,
    "spacer-2": 18,
    "2xl": 20,
    "3xl": 24,
    "4xl": 32,
    "5xl": 40,
    "6xl": 48,
    "7xl": 64,
    "8xl": 80,
    "9xl": 96,
    "10xl": 128,
    "11xl": 160,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  zIndices: {
    "-1": -1,
    "0": 0,
    "1": 1,
    "4": 4,
    "9": 9,
    "10": 10,
    "50": 50,
    "99": 99,
    "999": 999,
  },
  borderRadii: {
    "0": 0,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "8": 8,
    "10": 10,
    "12": 12,
    "14": 14,
    "15": 15,
    "16": 16,
    "18": 18,
    "20": 20,
    "24": 24,
    "28": 28,
    "30": 30,
    "36": 36,
    "32": 32,
    "40": 40,
    "64": 64,
    full: 200,
  },
  textVariants: {
    defaults: {
      color: "primary_text",
      fontSize: vs(14),
    },
    h1: {
      fontWeight: "bold" as const,
      fontSize: vs(28),
    },
    h2: {
      fontWeight: "bold" as const,
      fontSize: vs(20),
    },
    p1: {
      fontWeight: "500" as const,
      fontSize: vs(16),
    },
    p2: {
      fontWeight: "500" as const,
      fontSize: vs(12),
    },
    title: {
      fontWeight: "700" as const,
      fontSize: vs(14),
    },
    subtitle: {
      fontWeight: "500" as const,
      fontSize: vs(14),
    },
    badge: {
      fontSize: vs(10),
      lineHeight: vs(13.5),
      fontWeight: "700" as const,
    },
    label: {
      fontWeight: "700" as const,
      fontSize: vs(10),
      letterSpacing: 1.5,
      textTransform: "uppercase" as const,
    },
    terms: {
      fontWeight: "500" as const,
      fontSize: vs(12),
    },
    button: {
      fontWeight: "700" as const,
      fontSize: vs(16),
      lineHeight: vs(21.6),
    },
    small: {
      fontWeight: "500" as const,
      fontSize: vs(10),
    },
  },
} as const;

export type Theme = typeof theme;
export default theme;
