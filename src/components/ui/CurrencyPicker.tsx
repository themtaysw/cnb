import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import { useState } from "react";
import { FlatList, Modal, Pressable } from "react-native";
import styled from "styled-components/native";

// Minimal variant (for graph screen - big text)
const MinimalButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${vs(8)}px;
`;

const MinimalText = styled.Text`
  font-size: ${vs(32)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
`;

const MinimalArrow = styled.Text`
  font-size: ${vs(18)}px;
  color: ${theme.colors.secondary_text};
`;

// Box variant (for convert screen - with background)
const BoxButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${vs(16)}px;
  border-radius: ${vs(12)}px;
  background-color: ${theme.colors.secondary_bg};
`;

const BoxText = styled.Text`
  font-size: ${vs(18)}px;
  font-weight: 600;
  color: ${theme.colors.primary_text};
`;

const BoxArrow = styled.Text`
  font-size: ${vs(16)}px;
  color: ${theme.colors.secondary_text};
`;

// Modal (shared)
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

type CurrencyItemData = {
  code: string;
  country?: string;
};

type DataItem = { code: string; country?: string };

type CurrencyPickerProps = {
  /** Array of currency codes or objects with code and country */
  data: string[] | DataItem[];
  selectedCode: string;
  onSelect: (code: string) => void;
  /** "minimal" = big text (graph), "box" = with background (convert) */
  variant?: "minimal" | "box";
};

const normalizeData = (data: string[] | DataItem[]): CurrencyItemData[] => {
  if (data.length === 0) return [];
  if (typeof data[0] === "string") {
    return (data as string[]).map((code) => ({ code }));
  }
  return (data as DataItem[]).map((item) => ({
    code: item.code,
    country: item.country,
  }));
};

export const CurrencyPicker = ({
  data,
  selectedCode,
  onSelect,
  variant = "box",
}: CurrencyPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const normalizedData = normalizeData(data);
  const selectedItem = normalizedData.find(
    (item) => item.code === selectedCode,
  );

  const handleSelect = (code: string) => {
    onSelect(code);
    setIsOpen(false);
  };

  const displayText = selectedItem
    ? selectedItem.country
      ? `${selectedItem.code} - ${selectedItem.country}`
      : selectedItem.code
    : "Select currency";

  return (
    <>
      {variant === "minimal" ? (
        <MinimalButton onPress={() => setIsOpen(true)}>
          <MinimalText>{selectedCode}</MinimalText>
          <MinimalArrow>▼</MinimalArrow>
        </MinimalButton>
      ) : (
        <BoxButton onPress={() => setIsOpen(true)}>
          <BoxText>{displayText}</BoxText>
          <BoxArrow>▼</BoxArrow>
        </BoxButton>
      )}

      <Modal visible={isOpen} animationType="slide">
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Select Currency</ModalTitle>
            <Pressable onPress={() => setIsOpen(false)}>
              <CloseButtonText>Close</CloseButtonText>
            </Pressable>
          </ModalHeader>

          <FlatList
            data={normalizedData}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <CurrencyItem
                isSelected={item.code === selectedCode}
                onPress={() => handleSelect(item.code)}
              >
                <CurrencyInfo>
                  <CurrencyCode>{item.code}</CurrencyCode>
                  {item.country && (
                    <CurrencyCountry>{item.country}</CurrencyCountry>
                  )}
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
