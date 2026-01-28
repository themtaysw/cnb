import { createTheme } from "@shopify/restyle";

import colors from "@/src/theme/colors";
import { vs } from "@/src/utils/normalize";

const palette = {
  ...colors.primary,
  ...colors.secondary,
  ...colors.informational,
  ...colors.prime,
};

export const theme = createTheme({
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
      includeFontPadding: false,
    },
    h1: {
      fontWeight: "bold",
      fontSize: vs(28),
    },
    h2: {
      fontWeight: "bold",
      fontSize: vs(20),
    },
    p1: {
      fontWeight: "500",
      fontSize: vs(16),
    },
    p2: {
      fontWeight: "500",
      fontSize: vs(12),
    },
    title: {
      fontWeight: "700",
      fontSize: vs(14),
    },
    subtitle: {
      fontWeight: "500",
      fontSize: vs(14),
    },
    badge: {
      fontSize: vs(10),
      lineHeight: vs(13.5),
      fontWeight: "700",
    },
    label: {
      fontWeight: "700",
      fontSize: vs(10),
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },
    terms: {
      fontWeight: "500",
      fontSize: vs(12),
    },
    button: {
      color: "primary_text",
      fontWeight: "700",
      fontSize: vs(16),
      lineHeight: vs(21.6),
    },
    small: {
      color: "primary_text",
      fontWeight: "500",
      fontSize: vs(10),
    },
  },
  buttonVariants: {
    defaults: {
      width: "100%",
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "full",
      backgroundColor: "primary_bg",
      paddingHorizontal: 0,
      overflow: "hidden",
    },
    disabled: {
      backgroundColor: "green",
      opacity: 0.5,
    },
    secondary: {
      borderColor: "outline",
      borderWidth: 2,
      backgroundColor: "green",
    },
    textOnly: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    destructive: {
      borderColor: "outline",
      borderWidth: 2,
      backgroundColor: "error",
    },
    warning: {
      borderColor: "outline",
      borderWidth: 2,
      backgroundColor: "warning",
    },
    bordered: {
      borderWidth: 2,
      borderColor: "green",
      backgroundColor: "transparent",
    },
    unstyled: {
      height: undefined,
      backgroundColor: "transparent",
    },
  },
  inputVariants: {
    defaults: {
      borderRadius: "16",
      color: "primary_text",
      justifyContent: "center",
      backgroundColor: "primary_bg",
      fontSize: vs(14),
    },
    large: {
      minHeight: vs(55),
      justifyContent: "center",
      fontSize: vs(16),
      color: "primary_text",
    },
    multiline: {
      minHeight: vs(100),
      height: "auto",
      paddingVertical: 0,
      fontSize: vs(16),
      color: "primary_text",
      lineHeight: "100%",
    },
    bordered: {
      height: "auto",
      borderWidth: 0.3,
      paddingHorizontal: "lg",
    },
  },
  boxVariants: {
    defaults: {
      backgroundColor: "primary_bg",
    },
    disabled: {
      opacity: 0.5,
    },
  },
});

export type Theme = typeof theme;
export default theme;
