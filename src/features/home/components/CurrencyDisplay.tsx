import React, { memo } from "react";
import styled from "styled-components/native";

import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";

const getCurrencySymbol = (currencyCode: string) => {
  try {
    const formatted = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(0);
    return formatted.replace(/[\d.,\s]/g, "");
  } catch {
    return currencyCode;
  }
};

const Container = styled.View<{ isHighlighted: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${vs(1)}px;
  background-color: ${({ isHighlighted }) =>
    isHighlighted ? theme.colors.blue : theme.colors.blue + "90"};
  padding: ${vs(2)}px ${vs(8)}px;
  border-radius: ${vs(8)}px;
`;

const CurrencyText = styled.Text`
  font-size: ${vs(14)}px;
  font-weight: 600;
  color: ${theme.colors.white};
`;

type CurrencyDisplayProps = {
  code: string;
  amount: number;
  isHighlighted?: boolean;
};

const CurrencyDisplay = ({
  code,
  amount,
  isHighlighted = false,
}: CurrencyDisplayProps) => {
  return (
    <Container isHighlighted={isHighlighted}>
      <CurrencyText>{getCurrencySymbol(code)}</CurrencyText>
      <CurrencyText>{amount.toFixed(2)}</CurrencyText>
    </Container>
  );
};

export default memo(CurrencyDisplay);
