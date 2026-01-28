import { useQuery } from "@tanstack/react-query";

import { HISTORICAL_RATES_BASE_URL } from "@/src/common/constants/api";
import { ApiError } from "@/src/common/errors";
import {
  extractCurrencyCodes,
  parseYearlyRates,
  YearlyRatesResult,
} from "@/src/utils/parseYearlyRates";

const getYearlyRates = async (year: number): Promise<string> => {
  const response = await fetch(
    `${HISTORICAL_RATES_BASE_URL}/year.txt?year=${year}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to fetch historical rates", response.status);
  }
  return response.text();
};

export const useHistoricalRates = (currencyCode: string, year?: number) => {
  const currentYear = year ?? new Date().getFullYear();

  return useQuery<YearlyRatesResult | null, ApiError>({
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

  return useQuery<string[], ApiError>({
    queryKey: ["availableCurrencies", currentYear],
    queryFn: async () => {
      const text = await getYearlyRates(currentYear);
      return extractCurrencyCodes(text);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
