import { parseRates } from "../parseRates";

describe("parseRates", () => {
  it("should parse valid CNB rates correctly", () => {
    const input = `27 Jan 2026 #18
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.135
Brazil|real|1|BRL|3.953
Hungary|forint|100|HUF|6.251`;

    const result = parseRates(input);

    expect(result.date).toBe("27 Jan 2026");
    expect(result.rates).toHaveLength(3);
    expect(result.rates[0]).toEqual({
      country: "Australia",
      currency: "dollar",
      amount: 1,
      code: "AUD",
      rate: 14.135,
    });
    expect(result.rates[2]).toEqual({
      country: "Hungary",
      currency: "forint",
      amount: 100,
      code: "HUF",
      rate: 6.251,
    });
  });

  it("should throw error if input has fewer than 3 lines", () => {
    const input = `27 Jan 2026 #18
Country|Currency|Amount|Code|Rate`;
    expect(() => parseRates(input)).toThrow(
      "Invalid CNB rates format: not enough lines",
    );
  });

  it("should skip invalid lines", () => {
    const input = `27 Jan 2026 #18
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.135
Invalid|Line|Here
Brazil|real|1|BRL|3.953`;

    const result = parseRates(input);
    expect(result.rates).toHaveLength(2);
    expect(result.rates[0].code).toBe("AUD");
    expect(result.rates[1].code).toBe("BRL");
  });
});
