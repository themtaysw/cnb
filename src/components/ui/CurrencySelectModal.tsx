import theme from "@/src/theme";
import { currencyToFlag } from "@/src/utils/currencyToEmoji";
import { vs } from "@/src/utils/normalize";
import { FlatList, Modal, Pressable } from "react-native";
import styled from "styled-components/native";

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

export type CurrencyItem = {
  code: string;
  country?: string;
};

type CurrencySelectModalProps = {
  visible: boolean;
  onClose: () => void;
  data: CurrencyItem[];
  selectedCode: string;
  onSelect: (code: string) => void;
  title?: string;
};

export const CurrencySelectModal = ({
  visible,
  onClose,
  data,
  selectedCode,
  onSelect,
  title = "Select Currency",
}: CurrencySelectModalProps) => {
  const handleSelect = (code: string) => {
    onSelect(code);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <Pressable onPress={onClose}>
            <CloseButtonText>Close</CloseButtonText>
          </Pressable>
        </ModalHeader>

        <FlatList
          data={data}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <CurrencyItem
              isSelected={item.code === selectedCode}
              onPress={() => handleSelect(item.code)}
            >
              <CurrencyInfo>
                <ItemFlag>{currencyToFlag(item.code)}</ItemFlag>
                <CurrencyDetails>
                  <CurrencyCode>{item.code}</CurrencyCode>
                  {item.country && (
                    <CurrencyCountry>{item.country}</CurrencyCountry>
                  )}
                </CurrencyDetails>
              </CurrencyInfo>
              {item.code === selectedCode && <Checkmark>✓</Checkmark>}
            </CurrencyItem>
          )}
        />
      </ModalContainer>
    </Modal>
  );
};
