import { useMemo, useState } from "react";

import { BASE_COUNTRY, BASE_CURRENCY } from "@/src/common/constants/currencies";
import type { ExchangeRate } from "@/src/utils/parseRates";

export const useCurrencyConversion = (
  rates: ExchangeRate[] = [],
  initialCode?: string,
) => {
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

  return {
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
  };
};
