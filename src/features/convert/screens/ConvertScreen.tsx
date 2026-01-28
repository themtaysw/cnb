import { router } from "expo-router";
import styled from "styled-components/native";

import { QueryResult } from "@/src/components/QueryResult";
import { Container } from "@/src/components/ui/Container";
import { Content } from "@/src/components/ui/Content";
import { CurrencyInputBox } from "@/src/components/ui/CurrencyInputBox";
import { Header } from "@/src/components/ui/Header";
import { SwapButton } from "@/src/components/ui/SwapButton";
import { useCurrencyConversion } from "@/src/features/convert/hooks/useCurrencyConversion";
import { useRates } from "@/src/features/home/api/useRates";
import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";

const ConverterContainer = styled.View`
  padding: ${vs(theme.spacing.lg)}px;
  padding-top: ${vs(48)}px;
`;

const RateInfoContainer = styled.View`
  align-items: center;
  margin-bottom: ${vs(24)}px;
`;

const RateText = styled.Text`
  font-size: ${vs(14)}px;
  color: ${theme.colors.secondary_text};
`;

const RateValue = styled.Text`
  font-size: ${vs(16)}px;
  font-weight: 600;
  color: ${theme.colors.primary_text};
  margin-top: ${vs(4)}px;
`;

type ConvertScreenProps = {
  initialCode?: string;
};

export const ConvertScreen = ({ initialCode }: ConvertScreenProps) => {
  const query = useRates();
  const rates = query.data?.rates ?? [];

  const {
    fromAmount,
    setFromAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertedAmount,
    exchangeRateDisplay,
    currencyList,
    handleSwap,
  } = useCurrencyConversion(rates, initialCode);

  return (
    <Container>
      <Header title="Convert" onBack={() => router.back()} />

      <QueryResult query={query}>
        <Content>
          <ConverterContainer>
            <RateInfoContainer>
              <RateText>Exchange Rate</RateText>
              <RateValue>{exchangeRateDisplay}</RateValue>
            </RateInfoContainer>

            <CurrencyInputBox
              testID="from-currency"
              label="Amount"
              amount={fromAmount}
              onAmountChange={setFromAmount}
              currencyCode={fromCurrency}
              onCurrencyChange={setFromCurrency}
              currencies={currencyList}
              editable
              autoFocus
            />

            <SwapButton onPress={handleSwap} />

            <CurrencyInputBox
              testID="to-currency"
              label="Converted to"
              amount={convertedAmount}
              currencyCode={toCurrency}
              onCurrencyChange={setToCurrency}
              currencies={currencyList}
              editable={false}
            />
          </ConverterContainer>
        </Content>
      </QueryResult>
    </Container>
  );
};
