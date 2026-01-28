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
    <Box style={style}>
      <Box>{renderIcon()}</Box>
      <Text variant="h1">{renderTitle()}</Text>
      <Text variant="p1" color="primary_text">
        {renderText()}
      </Text>
      {onPress && (
        <Button onPress={onPress} isLoading={isLoading}>
          {buttonText || "Try again"}
        </Button>
      )}
    </Box>
  );
};
