import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import { ExchangeRate } from "@/src/utils/parseRates";
import { useState } from "react";
import { FlatList, Modal, Pressable } from "react-native";
import styled from "styled-components/native";

const PickerButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${vs(16)}px;
  border-radius: ${vs(12)}px;
  background-color: ${theme.colors.secondary_bg};
`;

const PickerText = styled.Text`
  font-size: ${vs(18)}px;
  font-weight: 600;
  color: ${theme.colors.primary_text};
`;

const ChevronText = styled.Text`
  font-size: ${vs(16)}px;
  color: ${theme.colors.secondary_text};
`;

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

const CloseButton = styled.Text`
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

const CurrencyInfo = styled.View``;

const CurrencyCode = styled.Text`
  font-size: ${vs(16)}px;
  font-weight: 600;
  color: ${theme.colors.primary_text};
`;

const CurrencyCountry = styled.Text`
  font-size: ${vs(12)}px;
  color: ${theme.colors.secondary_text};
`;

const Checkmark = styled.Text`
  font-size: ${vs(18)}px;
  color: ${theme.colors.blue};
`;

type CurrencyPickerProps = {
  rates: ExchangeRate[];
  selectedCode: string;
  onSelect: (code: string) => void;
};

export const CurrencyPicker = ({
  rates,
  selectedCode,
  onSelect,
}: CurrencyPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedRate = rates.find((r) => r.code === selectedCode);
  const displayText = selectedRate
    ? `${selectedRate.code} - ${selectedRate.country}`
    : "Select currency";

  const handleSelect = (code: string) => {
    onSelect(code);
    setIsOpen(false);
  };

  return (
    <>
      <PickerButton onPress={() => setIsOpen(true)}>
        <PickerText>{displayText}</PickerText>
        <ChevronText>▼</ChevronText>
      </PickerButton>

      <Modal visible={isOpen} animationType="slide">
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Select Currency</ModalTitle>
            <Pressable onPress={() => setIsOpen(false)}>
              <CloseButton>Close</CloseButton>
            </Pressable>
          </ModalHeader>

          <FlatList
            data={rates}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <CurrencyItem
                isSelected={item.code === selectedCode}
                onPress={() => handleSelect(item.code)}
              >
                <CurrencyInfo>
                  <CurrencyCode>{item.code}</CurrencyCode>
                  <CurrencyCountry>{item.country}</CurrencyCountry>
                </CurrencyInfo>
                {item.code === selectedCode && <Checkmark>✓</Checkmark>}
              </CurrencyItem>
            )}
          />
        </ModalContainer>
      </Modal>
    </>
  );
};
