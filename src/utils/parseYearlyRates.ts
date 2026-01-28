export interface HistoricalRate {
  date: string;
  rate: number;
}

export interface YearlyRatesResult {
  currencyCode: string;
  amount: number;
  rates: HistoricalRate[];
}

/**
 * Parses CNB yearly exchange rate data for a specific currency.
 *
 * Input format:
 * Date|1 AUD|1 BRL|1 CAD|1 CHF|1 CNY|1 DKK|1 EUR|...
 * 02.01.2026|13.797|3.789|15.014|25.997|2.947|3.236|24.170|...
 * 05.01.2026|13.835|3.807|15.036|26.063|2.970|3.239|24.195|...
 */
export const parseYearlyRates = (
  text: string,
  currencyCode: string,
): YearlyRatesResult | null => {
  const lines = text.trim().split("\n");

  if (lines.length < 2) {
    return null;
  }

  // Parse header to find currency column
  const header = lines[0].split("|");
  let columnIndex = -1;
  let amount = 1;

  for (let i = 1; i < header.length; i++) {
    const col = header[i].trim();
    // Format is like "1 EUR", "100 HUF", "1000 IDR"
    const match = col.match(/^(\d+)\s+(\w+)$/);
    if (match && match[2] === currencyCode) {
      columnIndex = i;
      amount = parseInt(match[1], 10);
      break;
    }
  }

  if (columnIndex === -1) {
    console.warn(`Currency ${currencyCode} not found in yearly data`);
    return null;
  }

  const rates: HistoricalRate[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Skip if it's a new header (contains text like "AUD")
    if (line.includes(" AUD") || line.startsWith("Date")) continue;

    const parts = line.split("|");
    if (parts.length <= columnIndex) continue;

    const date = parts[0];
    const rateStr = parts[columnIndex];
    const rate = parseFloat(rateStr);

    if (!isNaN(rate)) {
      rates.push({ date, rate });
    }
  }

  return {
    currencyCode,
    amount,
    rates,
  };
};

/**
 * Extracts all available currency codes from the header.
 */
export const extractCurrencyCodes = (text: string): string[] => {
  const lines = text.trim().split("\n");
  if (lines.length === 0) return [];

  const header = lines[0].split("|");
  const codes: string[] = [];

  for (let i = 1; i < header.length; i++) {
    const col = header[i].trim();
    const match = col.match(/^(\d+)\s+(\w+)$/);
    if (match) {
      codes.push(match[2]);
    }
  }

  return codes;
};
