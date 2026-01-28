import styled from "styled-components/native";

export const Separator = styled.View<{ size: number }>`
  height: ${({ size }) => size}px;
`;
