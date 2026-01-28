import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/src/common/constants/api";
import { ParsedRates, parseRates } from "@/src/utils/parseRates";

const getRates = async (): Promise<ParsedRates> => {
  const response = await fetch(API_URL);
  const text = await response.text();
  if (!response.ok) {
    throw new Error("Failed to fetch rates");
  }

  return parseRates(text);
};

export const useRates = () => {
  return useQuery<ParsedRates, Error>({
    queryKey: ["rates"],
    queryFn: () => getRates(),
    enabled: !!API_URL,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
