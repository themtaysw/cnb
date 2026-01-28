import {
  BackgroundColorShorthandProps,
  BorderProps,
  LayoutProps,
  PositionProps,
  SpacingShorthandProps,
  VariantProps,
  backgroundColorShorthand,
  border,
  composeRestyleFunctions,
  createRestyleComponent,
  createVariant,
  layout,
  spacingShorthand,
  useRestyle,
} from "@shopify/restyle";
import React, { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { Box } from "@/src/components/ui/Box";
import { Text } from "@/src/components/ui/Text";
import { Theme } from "@/src/theme";

type RestyleProps = VariantProps<Theme, "buttonVariants"> &
  LayoutProps<Theme> &
  SpacingShorthandProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  BorderProps<Theme> &
  PositionProps<Theme>;

type DefaultProps = {
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  pressedOpacity?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  color?: keyof Theme["colors"];
};

type Props = RestyleProps & PropsWithChildren & DefaultProps;

const buttonVariant = createVariant<Theme, "buttonVariants">({
  themeKey: "buttonVariants",
});
const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, "buttonVariants"> & React.ComponentProps<typeof Box>,
  Theme
>([buttonVariant], Box);

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  buttonVariant,
  layout,
  spacingShorthand,
  backgroundColorShorthand,
  //@ts-ignore
  border,
]);

export const Button = ({
  onPress,
  color,
  children,
  contentContainerStyle,
  isDisabled = false,
  isLoading = false,
  pressedOpacity = 0.8,
  ...rest
}: Props) => {
  const restyleProps: typeof rest = {
    ...rest,
    variant: isDisabled ? "disabled" : rest.variant,
  };
  const props = useRestyle(restyleFunctions, restyleProps);

  const styleProps = ({ pressed }: PressableStateCallbackType) => {
    return [
      pressed ? { opacity: pressedOpacity } : null,
      ...(props.style as StyleProp<ViewStyle>[]),
    ];
  };

  if (isLoading) {
    return (
      <ButtonContainer variant="disabled" {...props}>
        <ActivityIndicator />
      </ButtonContainer>
    );
  }

  if (isDisabled) {
    return (
      <ButtonContainer {...props}>
        {typeof children === "object" ? (
          <View style={[styles.childrenWrapper, contentContainerStyle]}>
            {children}
          </View>
        ) : (
          <Text variant="button" color={color} px="lg">
            {children}
          </Text>
        )}
      </ButtonContainer>
    );
  }

  return (
    <Pressable style={styleProps} onPress={onPress}>
      {typeof children === "object" ? (
        <View style={[styles.childrenWrapper, contentContainerStyle]}>
          {children}
        </View>
      ) : (
        <Text variant="button" color={color} px="lg">
          {children}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  childrenWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
