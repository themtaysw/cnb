import theme from "@/src/theme";
import { currencyToFlag } from "@/src/utils/currencyToEmoji";
import { vs } from "@/src/utils/normalize";
import { useState } from "react";
import styled from "styled-components/native";

import {
  CurrencySelectModal,
  type CurrencyItem,
} from "@/src/components/ui/CurrencySelectModal";

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

const MinimalFlag = styled.Text`
  font-size: ${vs(28)}px;
`;

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

type DataItem = { code: string; country?: string };

type CurrencyPickerProps = {
  data: string[] | DataItem[];
  selectedCode: string;
  onSelect: (code: string) => void;
  variant?: "minimal" | "box";
};

const normalizeData = (data: string[] | DataItem[]): CurrencyItem[] => {
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

  const displayText = selectedItem
    ? selectedItem.country
      ? `${selectedItem.code} - ${selectedItem.country}`
      : selectedItem.code
    : "Select currency";

  return (
    <>
      {variant === "minimal" ? (
        <MinimalButton onPress={() => setIsOpen(true)}>
          <MinimalFlag>{currencyToFlag(selectedCode)}</MinimalFlag>
          <MinimalText>{selectedCode}</MinimalText>
          <MinimalArrow>▼</MinimalArrow>
        </MinimalButton>
      ) : (
        <BoxButton onPress={() => setIsOpen(true)}>
          <BoxText>{displayText}</BoxText>
          <BoxArrow>▼</BoxArrow>
        </BoxButton>
      )}

      <CurrencySelectModal
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        data={normalizedData}
        selectedCode={selectedCode}
        onSelect={onSelect}
      />
    </>
  );
};
