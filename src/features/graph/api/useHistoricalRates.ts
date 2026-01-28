import { useQuery } from "@tanstack/react-query";

import {
  extractCurrencyCodes,
  parseYearlyRates,
  YearlyRatesResult,
} from "@/src/utils/parseYearlyRates";

const BASE_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing";

const getYearlyRates = async (year: number): Promise<string> => {
  const response = await fetch(`${BASE_URL}/year.txt?year=${year}`);
  if (!response.ok) {
    throw new Error("Failed to fetch historical rates");
  }
  return response.text();
};

export const useHistoricalRates = (currencyCode: string, year?: number) => {
  const currentYear = year ?? new Date().getFullYear();

  return useQuery<YearlyRatesResult | null, Error>({
    queryKey: ["historicalRates", currentYear, currencyCode],
    queryFn: async () => {
      const text = await getYearlyRates(currentYear);
      return parseYearlyRates(text, currencyCode);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - rates only update once per day
    enabled: !!currencyCode,
  });
};

export const useAvailableCurrencies = (year?: number) => {
  const currentYear = year ?? new Date().getFullYear();

  return useQuery<string[], Error>({
    queryKey: ["availableCurrencies", currentYear],
    queryFn: async () => {
      const text = await getYearlyRates(currentYear);
      return extractCurrencyCodes(text);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
