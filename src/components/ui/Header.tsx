import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { Text } from "@/src/components/ui/Text";
import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";

type Props = {
  title: string;
  onBack?: () => void;
};

const HeaderContainer = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
`;

const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.Text`
  font-size: ${vs(24)}px;
  color: ${theme.colors.blue};
  margin-right: ${vs(12)}px;
`;

export const Header = ({ title, onBack }: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <HeaderContainer style={[styles.container, { paddingTop: top }]}>
      <HeaderContent>
        {onBack && (
          <Pressable onPress={onBack}>
            <BackButton>←</BackButton>
          </Pressable>
        )}
        <Text variant="h1">{title}</Text>
      </HeaderContent>
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: vs(theme.spacing.xl),
  },
});
