import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import styled from "styled-components/native";

const Button = styled.Pressable`
  width: ${vs(44)}px;
  height: ${vs(44)}px;
  border-radius: ${vs(22)}px;
  background-color: ${theme.colors.blue};
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: ${vs(-12)}px 0;
  z-index: 10;
`;

const Icon = styled.Text`
  font-size: ${vs(20)}px;
  color: ${theme.colors.white};
`;

type SwapButtonProps = {
  onPress: () => void;
};

export const SwapButton = ({ onPress }: SwapButtonProps) => {
  return (
    <Button onPress={onPress}>
      <Icon>⇅</Icon>
    </Button>
  );
};
