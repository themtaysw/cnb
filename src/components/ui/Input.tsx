import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import styled from "styled-components/native";

const StyledInput = styled.TextInput`
  padding: ${vs(16)}px;
  border-radius: ${vs(12)}px;
  background-color: ${theme.colors.secondary_bg};
  color: ${theme.colors.primary_text};
  font-size: ${vs(18)}px;
  font-weight: 600;
`;

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "decimal-pad";
  autoFocus?: boolean;
};

export const Input = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoFocus = false,
}: InputProps) => {
  return (
    <StyledInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.secondary_text}
      keyboardType={keyboardType}
      autoFocus={autoFocus}
    />
  );
};
