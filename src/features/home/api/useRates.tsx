import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/src/common/constants/api";
import { ApiError } from "@/src/common/errors";
import { ParsedRates, parseRates } from "@/src/utils/parseRates";

const getRates = async (): Promise<ParsedRates> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new ApiError("Failed to fetch rates", response.status);
  }
  const text = await response.text();

  return parseRates(text);
};

export const useRates = () => {
  return useQuery<ParsedRates, ApiError>({
    queryKey: ["rates"],
    queryFn: () => getRates(),
    enabled: !!API_URL,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
