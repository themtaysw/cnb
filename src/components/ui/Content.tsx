import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import styled from "styled-components/native";

export const Content = styled.View`
  flex: 1;
  padding: 0 ${vs(theme.spacing.lg)}px;
`;
