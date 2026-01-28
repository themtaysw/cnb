import { router } from "expo-router";
import React, { memo } from "react";
import styled from "styled-components/native";

import { BASE_CURRENCY } from "@/src/common/constants/currencies";
import { Row } from "@/src/components/ui/Row";
import CurrencyDisplay from "@/src/features/home/components/CurrencyDisplay";
import theme from "@/src/theme";
import { currencyToFlag } from "@/src/utils/currencyToEmoji";
import { vs } from "@/src/utils/normalize";
import { ExchangeRate } from "@/src/utils/parseRates";

const RateContainer = styled.Pressable`
  padding: ${vs(16)}px;
  border-radius: ${vs(16)}px;
  background-color: ${theme.colors.secondary_bg};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Flag = styled.Text`
  font-size: ${vs(28)}px;
`;

const InfoContainer = styled.View``;

const CountryName = styled.Text`
  font-size: ${vs(14)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
`;

const CountryCode = styled.Text`
  font-size: ${vs(12)}px;
  font-weight: 400;
  color: ${theme.colors.secondary_text};
`;

type SingleRateProps = {
  rate: ExchangeRate;
  baseCurrency?: string;
};

const SingleRate = ({
  rate,
  baseCurrency = BASE_CURRENCY,
}: SingleRateProps) => {
  const isHighlighted = rate.code === baseCurrency;
  const flag = currencyToFlag(rate.code);

  return (
    <RateContainer
      testID={`currency-item-${rate.code}`}
      onPress={() => router.push(`/convert/${rate.code}`)}
    >
      <Row gap={12}>
        <Flag>{flag}</Flag>
        <InfoContainer>
          <CountryName>{rate.country}</CountryName>
          <CountryCode>{rate.code}</CountryCode>
        </InfoContainer>
      </Row>
      <CurrencyDisplay
        code={rate.code}
        amount={rate.rate}
        isHighlighted={isHighlighted}
      />
    </RateContainer>
  );
};

export default memo(SingleRate);
