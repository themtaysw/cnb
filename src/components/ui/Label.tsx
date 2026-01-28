import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import styled from "styled-components/native";

export const Label = styled.Text`
  font-size: ${vs(10)}px;
  font-weight: 600;
  color: ${theme.colors.secondary_text};
  text-transform: uppercase;
  letter-spacing: 1px;
`;
