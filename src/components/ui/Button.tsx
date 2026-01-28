import React, { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";
import styled from "styled-components/native";

import { Text } from "@/src/components/ui/Text";
import { Theme } from "@/src/theme";

type Props = PropsWithChildren<{
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  pressedOpacity?: number;
  style?: StyleProp<ViewStyle>;
  color?: keyof Theme["colors"];
}>;

const ButtonContainer = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadii.full}px;
  background-color: ${({ theme }) => theme.colors.primary_bg};
  overflow: hidden;
`;

const DisabledContainer = styled(ButtonContainer)`
  opacity: 0.5;
`;

const ContentWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = ({
  onPress,
  color,
  children,
  isDisabled = false,
  isLoading = false,
  pressedOpacity = 0.8,
  style,
}: Props) => {
  const styleProps = ({ pressed }: PressableStateCallbackType) => [
    pressed ? { opacity: pressedOpacity } : null,
    style,
  ];

  if (isLoading) {
    return (
      <DisabledContainer style={style}>
        <ActivityIndicator />
      </DisabledContainer>
    );
  }

  if (isDisabled) {
    return (
      <DisabledContainer style={style}>
        {typeof children === "object" ? (
          <ContentWrapper>{children}</ContentWrapper>
        ) : (
          <Text variant="button" color={color}>
            {children}
          </Text>
        )}
      </DisabledContainer>
    );
  }

  return (
    <Pressable style={styleProps} onPress={onPress}>
      {typeof children === "object" ? (
        <ContentWrapper>{children}</ContentWrapper>
      ) : (
        <Text variant="button" color={color}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};
