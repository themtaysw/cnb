import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: vs(theme.spacing.lg),
  },
});
