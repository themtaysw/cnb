import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import { ExchangeRate } from "@/src/utils/parseRates";
import { router } from "expo-router";
import styled from "styled-components/native";

import CurrencyDisplay from "@/src/features/home/components/CurrencyDisplay";

const BASE_CURRENCY = "CZK";

const RateContainer = styled.Pressable`
  padding: ${vs(16)}px;
  border-radius: ${vs(16)}px;
  background-color: ${theme.colors.secondary_bg};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

  return (
    <RateContainer onPress={() => router.push(`/convert/${rate.code}`)}>
      <InfoContainer>
        <CountryName>{rate.country}</CountryName>
        <CountryCode>{rate.code}</CountryCode>
      </InfoContainer>
      <CurrencyDisplay
        code={rate.code}
        amount={rate.rate}
        isHighlighted={isHighlighted}
      />
    </RateContainer>
  );
};

export default SingleRate;
