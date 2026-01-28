import theme from "@/src/theme";
import { currencyToFlag } from "@/src/utils/currencyToEmoji";
import { vs } from "@/src/utils/normalize";
import { useState } from "react";
import styled from "styled-components/native";

import {
  CurrencySelectModal,
  type CurrencyItem,
} from "@/src/components/ui/CurrencySelectModal";

const Container = styled.View`
  background-color: ${theme.colors.secondary_bg};
  border-radius: ${vs(16)}px;
  border-width: 1px;
  border-color: ${theme.colors.secondary_text}30;
  padding: ${vs(16)}px;
`;

const LabelText = styled.Text`
  font-size: ${vs(12)}px;
  color: ${theme.colors.secondary_text};
  margin-bottom: ${vs(8)}px;
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AmountInput = styled.TextInput`
  flex: 1;
  font-size: ${vs(28)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
  padding: 0;
`;

const AmountDisplay = styled.Text`
  flex: 1;
  font-size: ${vs(28)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
`;

const CurrencyButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${vs(6)}px;
  padding: ${vs(8)}px ${vs(12)}px;
  background-color: ${theme.colors.primary_bg};
  border-radius: ${vs(24)}px;
`;

const Flag = styled.Text`
  font-size: ${vs(20)}px;
`;

const CurrencyCode = styled.Text`
  font-size: ${vs(16)}px;
  font-weight: 600;
  color: ${theme.colors.primary_text};
`;

const Chevron = styled.Text`
  font-size: ${vs(12)}px;
  color: ${theme.colors.secondary_text};
`;

type CurrencyInputBoxProps = {
  label: string;
  amount: string;
  onAmountChange?: (text: string) => void;
  currencyCode: string;
  onCurrencyChange: (code: string) => void;
  currencies: CurrencyItem[];
  editable?: boolean;
  autoFocus?: boolean;
};

export const CurrencyInputBox = ({
  label,
  amount,
  onAmountChange,
  currencyCode,
  onCurrencyChange,
  currencies,
  editable = true,
  autoFocus = false,
}: CurrencyInputBoxProps) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const flag = currencyToFlag(currencyCode);

  const handleAmountChange = (text: string) => {
    if (!onAmountChange) return;
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    onAmountChange(cleaned);
  };

  const formatDisplayAmount = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString("cs-CZ", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <Container>
        <LabelText>{label}</LabelText>
        <InputRow>
          {editable ? (
            <AmountInput
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0"
              placeholderTextColor={theme.colors.secondary_text}
              keyboardType="decimal-pad"
              autoFocus={autoFocus}
              numberOfLines={1}
            />
          ) : (
            <AmountDisplay numberOfLines={1} adjustsFontSizeToFit>
              {formatDisplayAmount(amount)}
            </AmountDisplay>
          )}

          <CurrencyButton onPress={() => setIsPickerOpen(true)}>
            <Flag>{flag}</Flag>
            <CurrencyCode>{currencyCode}</CurrencyCode>
            <Chevron>▼</Chevron>
          </CurrencyButton>
        </InputRow>
      </Container>

      <CurrencySelectModal
        visible={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        data={currencies}
        selectedCode={currencyCode}
        onSelect={onCurrencyChange}
      />
    </>
  );
};
