import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import styled from "styled-components/native";

type CardProps = {
  centered?: boolean;
};

export const Card = styled.View<CardProps>`
  background-color: ${theme.colors.secondary_bg};
  padding: ${vs(16)}px;
  border-radius: ${vs(12)}px;
  ${({ centered }) => centered && "align-items: center;"}
`;
