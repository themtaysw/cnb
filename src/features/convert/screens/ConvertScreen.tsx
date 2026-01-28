import { BASE_COUNTRY, BASE_CURRENCY } from "@/src/common/constants/currencies";
import { QueryResult } from "@/src/components/QueryResult";
import { Container } from "@/src/components/ui/Container";
import { Content } from "@/src/components/ui/Content";
import { CurrencyInputBox } from "@/src/components/ui/CurrencyInputBox";
import { Header } from "@/src/components/ui/Header";
import { SwapButton } from "@/src/components/ui/SwapButton";
import { useRates } from "@/src/features/home/api/useRates";
import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import type { ExchangeRate } from "@/src/utils/parseRates";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import styled from "styled-components/native";

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

  const [fromAmount, setFromAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState(BASE_CURRENCY);
  const [toCurrency, setToCurrency] = useState(initialCode || "EUR");

  const currencyList = useMemo(() => {
    const list = rates.map((r) => ({ code: r.code, country: r.country }));
    if (!list.find((c) => c.code === BASE_CURRENCY)) {
      return [{ code: BASE_CURRENCY, country: BASE_COUNTRY }, ...list];
    }
    return list;
  }, [rates]);

  const fromRate = useMemo(
    () => rates.find((r) => r.code === fromCurrency),
    [rates, fromCurrency],
  );

  const toRate = useMemo(
    () => rates.find((r) => r.code === toCurrency),
    [rates, toCurrency],
  );

  const toCzk = (amount: number, rate: ExchangeRate | undefined): number => {
    if (!rate) return amount;
    return (amount * rate.rate) / rate.amount;
  };

  const fromCzk = (
    czkAmount: number,
    rate: ExchangeRate | undefined,
  ): number => {
    if (!rate) return czkAmount;
    return (czkAmount / rate.rate) * rate.amount;
  };

  const convertedAmount = useMemo(() => {
    const numAmount = parseFloat(fromAmount) || 0;
    if (numAmount === 0) return "0";

    const inCzk =
      fromCurrency === BASE_CURRENCY ? numAmount : toCzk(numAmount, fromRate);
    const result =
      toCurrency === BASE_CURRENCY ? inCzk : fromCzk(inCzk, toRate);

    return result.toFixed(2);
  }, [fromAmount, fromCurrency, toCurrency, fromRate, toRate]);

  const exchangeRateDisplay = useMemo(() => {
    if (fromCurrency === toCurrency) return "1 = 1";

    const oneUnit = 1;
    const inCzk =
      fromCurrency === BASE_CURRENCY ? oneUnit : toCzk(oneUnit, fromRate);
    const result =
      toCurrency === BASE_CURRENCY ? inCzk : fromCzk(inCzk, toRate);

    return `1 ${fromCurrency} = ${result.toFixed(4)} ${toCurrency}`;
  }, [fromCurrency, toCurrency, fromRate, toRate]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(convertedAmount);
  };

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
