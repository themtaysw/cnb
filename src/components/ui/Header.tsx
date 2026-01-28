import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box } from "@/src/components/ui/Box";
import { Text } from "@/src/components/ui/Text";

type Props = {
  title: string;
};

export const Header = (props: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <Box style={{ paddingTop: top }} px="md">
      <Text variant="h1">{props.title}</Text>
    </Box>
  );
};
