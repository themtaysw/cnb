import styled from "styled-components/native";

import { Theme } from "@/src/theme";

type TextVariant = keyof Theme["textVariants"];

type Props = {
  variant?: TextVariant;
  color?: keyof Theme["colors"];
};

export const Text = styled.Text<Props>`
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.primary_text};
  font-size: ${({ theme, variant }) =>
    variant && variant !== "defaults"
      ? theme.textVariants[variant].fontSize
      : theme.textVariants.defaults.fontSize}px;
  font-weight: ${({ theme, variant }) =>
    variant &&
    variant !== "defaults" &&
    "fontWeight" in theme.textVariants[variant]
      ? theme.textVariants[variant].fontWeight
      : "normal"};
`;
