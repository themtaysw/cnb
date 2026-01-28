import { vs } from "@/src/utils/normalize";
import styled from "styled-components/native";

type RowProps = {
  justify?: "flex-start" | "center" | "flex-end" | "space-between";
  gap?: number;
};

export const Row = styled.View<RowProps>`
  flex-direction: row;
  align-items: center;
  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${({ gap }) => gap && `gap: ${vs(gap)}px;`}
`;
