import { Feather } from "@expo/vector-icons";
import { ReactNode } from "react";

import { Box } from "@/src/components/ui/Box";
import { Button } from "@/src/components/ui/Button";
import { Text } from "@/src/components/ui/Text";

interface Props {
  type: "connection" | "server" | "custom";
  isLoading?: boolean;
  title?: string;
  text?: string;
  buttonText?: string;
  Icon?: ReactNode;
  style?: any;
  mode?: "light" | "dark";
  onPress?: () => void;
}

export const Error = ({
  type,
  title,
  text,
  buttonText,
  onPress,
  Icon,
  style,
  mode,
  isLoading = false,
}: Props) => {
  const renderIcon = () => {
    if (type === "server" || type === "connection") {
      return <Feather name="wifi-off" size={40} color="black" />;
    }

    return Icon;
  };

  const renderTitle = () => {
    if (type === "server") {
      return "Server error";
    }
    if (type === "connection") {
      return "Connection error";
    }

    return title;
  };

  const renderText = () => {
    if (type === "server") {
      return "Please check your internet connection and try again.";
    }
    if (type === "connection") {
      return "Please check your internet connection and try again.";
    }

    return text;
  };

  return (
    <Box
      flex={1}
      px="lg"
      justifyContent="center"
      alignItems="center"
      bg="primary_bg"
      style={style}
    >
      <Box mb="md">{renderIcon()}</Box>
      <Text variant="h1" textAlign="center" color="primary_text">
        {renderTitle()}
      </Text>
      <Text
        variant="p1"
        fontWeight="500"
        color="primary_text"
        textAlign="center"
      >
        {renderText()}
      </Text>
      {onPress && (
        <Button onPress={onPress} mt="md" isLoading={isLoading} width="auto">
          {buttonText || "Try again"}
        </Button>
      )}
    </Box>
  );
};
