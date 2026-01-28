import { get } from "country-flag-emoji";

// THIS CAN BE IMPROVED BY USING SOME LIBRARY BUT I DIDNT CARE TOO MUCH IN THIS CASE!
// I TOOK THE RESPONSE A TOLD CHATGPT TO GIVE ME A MAP :D

const CURRENCY_TO_COUNTRY: Record<string, string> = {
  AUD: "AU",
  BRL: "BR",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  DKK: "DK",
  EUR: "EU",
  GBP: "GB",
  HKD: "HK",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  ISK: "IS",
  JPY: "JP",
  KRW: "KR",
  MXN: "MX",
  MYR: "MY",
  NOK: "NO",
  NZD: "NZ",
  PHP: "PH",
  PLN: "PL",
  RON: "RO",
  SEK: "SE",
  SGD: "SG",
  THB: "TH",
  TRY: "TR",
  USD: "US",
  ZAR: "ZA",
  CZK: "CZ",
  XDR: "UN",
};

export const currencyToFlag = (code: string): string => {
  const countryCode = CURRENCY_TO_COUNTRY[code];

  if (!countryCode) return "🏳️";

  const flag = get(countryCode);
  return flag?.emoji || "🏳️";
};
