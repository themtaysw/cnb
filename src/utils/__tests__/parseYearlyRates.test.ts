import { extractCurrencyCodes, parseYearlyRates } from "../parseYearlyRates";

const SAMPLE_DATA = `Date|1 AUD|1 BRL|100 HUF|1 USD
02.01.2026|13.797|3.789|6.251|22.450
05.01.2026|13.835|3.807|6.260|22.500
`;

describe("parseYearlyRates", () => {
  it("should parse rates for a specific currency", () => {
    const result = parseYearlyRates(SAMPLE_DATA, "AUD");

    expect(result).not.toBeNull();
    expect(result?.currencyCode).toBe("AUD");
    expect(result?.amount).toBe(1);
    expect(result?.rates).toHaveLength(2);
    expect(result?.rates[0]).toEqual({
      date: "02.01.2026",
      rate: 13.797,
    });
  });

  it("should handle currencies with amount > 1", () => {
    const result = parseYearlyRates(SAMPLE_DATA, "HUF");

    expect(result).not.toBeNull();
    expect(result?.currencyCode).toBe("HUF");
    expect(result?.amount).toBe(100);
    expect(result?.rates[0].rate).toBe(6.251);
  });

  it("should return null for unknown currency", () => {
    const result = parseYearlyRates(SAMPLE_DATA, "XYZ");
    expect(result).toBeNull();
  });

  it("should return null if not enough lines", () => {
    expect(parseYearlyRates("Date|1 AUD", "AUD")).toBeNull();
  });
});

describe("extractCurrencyCodes", () => {
  it("should extract all currency codes", () => {
    const codes = extractCurrencyCodes(SAMPLE_DATA);
    expect(codes).toEqual(["AUD", "BRL", "HUF", "USD"]);
  });

  it("should return empty array for empty input", () => {
    expect(extractCurrencyCodes("")).toEqual([]);
  });
});
