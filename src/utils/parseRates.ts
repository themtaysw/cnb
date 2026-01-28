export interface ExchangeRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface ParsedRates {
  date: string;
  rates: ExchangeRate[];
}

/**
 * Parses the CNB exchange rate text format into structured data.
 *
 * Input format:
 * 27 Jan 2026 #18
 * Country|Currency|Amount|Code|Rate
 * Australia|dollar|1|AUD|14.135
 * ...
 */
export const parseRates = (text: string): ParsedRates => {
  const lines = text.trim().split("\n");

  if (lines.length < 3) {
    throw new Error("Invalid CNB rates format: not enough lines");
  }

  const dateLine = lines[0];
  const date = dateLine.replace(/#\d+$/, "").trim();
  const rates: ExchangeRate[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split("|");
    if (parts.length !== 5) {
      console.warn(`Skipping invalid line: ${line}`);
      continue;
    }

    const [country, currency, amountStr, code, rateStr] = parts;

    rates.push({
      country,
      currency,
      amount: parseInt(amountStr, 10),
      code,
      rate: parseFloat(rateStr),
    });
  }

  return {
    date,
    rates,
  };
};
