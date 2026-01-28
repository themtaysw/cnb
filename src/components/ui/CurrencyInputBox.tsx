import theme from "@/src/theme";
import { currencyToFlag } from "@/src/utils/currencyToEmoji";
import { vs } from "@/src/utils/normalize";
import { useState } from "react";
import { FlatList, Modal, Pressable } from "react-native";
import styled from "styled-components/native";

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

// Modal styles
const ModalContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.primary_bg};
  padding-top: ${vs(60)}px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${vs(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.secondary_bg};
`;

const ModalTitle = styled.Text`
  font-size: ${vs(18)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
`;

const CloseButtonText = styled.Text`
  font-size: ${vs(16)}px;
  font-weight: 600;
  color: ${theme.colors.blue};
`;

const CurrencyItem = styled.Pressable<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${vs(16)}px;
  background-color: ${({ isSelected }) =>
    isSelected ? theme.colors.blue + "20" : "transparent"};
`;

const CurrencyInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${vs(12)}px;
`;

const ItemFlag = styled.Text`
  font-size: ${vs(24)}px;
`;

const CurrencyDetails = styled.View``;

const ItemCode = styled.Text`
  font-size: ${vs(16)}px;
  font-weight: 600;
  color: ${theme.colors.primary_text};
`;

const ItemCountry = styled.Text`
  font-size: ${vs(12)}px;
  color: ${theme.colors.secondary_text};
`;

const Checkmark = styled.Text`
  font-size: ${vs(18)}px;
  color: ${theme.colors.blue};
`;

type CurrencyData = {
  code: string;
  country?: string;
};

type CurrencyInputBoxProps = {
  label: string;
  amount: string;
  onAmountChange?: (text: string) => void;
  currencyCode: string;
  onCurrencyChange: (code: string) => void;
  currencies: CurrencyData[];
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

  const handleSelect = (code: string) => {
    onCurrencyChange(code);
    setIsPickerOpen(false);
  };

  const handleAmountChange = (text: string) => {
    if (!onAmountChange) return;
    // Only allow numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, "");
    // Prevent multiple decimal points
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    onAmountChange(cleaned);
  };

  // Format display amount with spaces for thousands
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
            />
          ) : (
            <AmountDisplay>{formatDisplayAmount(amount)}</AmountDisplay>
          )}

          <CurrencyButton onPress={() => setIsPickerOpen(true)}>
            <Flag>{flag}</Flag>
            <CurrencyCode>{currencyCode}</CurrencyCode>
            <Chevron>▼</Chevron>
          </CurrencyButton>
        </InputRow>
      </Container>

      <Modal visible={isPickerOpen} animationType="slide">
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Select Currency</ModalTitle>
            <Pressable onPress={() => setIsPickerOpen(false)}>
              <CloseButtonText>Close</CloseButtonText>
            </Pressable>
          </ModalHeader>

          <FlatList
            data={currencies}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <CurrencyItem
                isSelected={item.code === currencyCode}
                onPress={() => handleSelect(item.code)}
              >
                <CurrencyInfo>
                  <ItemFlag>{currencyToFlag(item.code)}</ItemFlag>
                  <CurrencyDetails>
                    <ItemCode>{item.code}</ItemCode>
                    {item.country && <ItemCountry>{item.country}</ItemCountry>}
                  </CurrencyDetails>
                </CurrencyInfo>
                {item.code === currencyCode && <Checkmark>✓</Checkmark>}
              </CurrencyItem>
            )}
          />
        </ModalContainer>
      </Modal>
    </>
  );
};
