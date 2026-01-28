import { QueryResult } from "@/src/components/QueryResult";
import { Container } from "@/src/components/ui/Container";
import { CurrencyPicker } from "@/src/components/ui/CurrencyPicker";
import { Header } from "@/src/components/ui/Header";
import { Input } from "@/src/components/ui/Input";
import { Label } from "@/src/components/ui/Label";
import { Separator } from "@/src/components/ui/Separator";
import { useRates } from "@/src/features/home/api/useRates";
import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import type { ExchangeRate } from "@/src/utils/parseRates";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import styled from "styled-components/native";

const Content = styled.View`
  flex: 1;
  padding: ${vs(theme.spacing.lg)}px;
`;

const ResultContainer = styled.View`
  padding: ${vs(24)}px;
  border-radius: ${vs(16)}px;
  background-color: ${theme.colors.blue}20;
  align-items: center;
`;

const ResultLabel = styled.Text`
  font-size: ${vs(14)}px;
  color: ${theme.colors.secondary_text};
  margin-bottom: ${vs(8)}px;
`;

const ResultAmount = styled.Text`
  font-size: ${vs(32)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
`;

const ResultCurrency = styled.Text`
  font-size: ${vs(16)}px;
  font-weight: 600;
  color: ${theme.colors.blue};
  margin-top: ${vs(4)}px;
`;

const RateInfo = styled.Text`
  font-size: ${vs(12)}px;
  color: ${theme.colors.secondary_text};
  margin-top: ${vs(16)}px;
`;

const getCurrencySymbol = (currencyCode: string) => {
  try {
    const formatted = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(0);
    return formatted.replace(/[\d.,\s]/g, "");
  } catch {
    return currencyCode;
  }
};

const convertCzkToForeign = (czkAmount: number, rate: ExchangeRate): number => {
  // rate.rate = how many CZK for rate.amount units of foreign currency
  // e.g., 1 EUR = 24.27 CZK, 100 HUF = 6.373 CZK
  return (czkAmount / rate.rate) * rate.amount;
};

const formatAmount = (amount: number): string => {
  if (amount >= 1000) {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return amount.toFixed(4).replace(/\.?0+$/, "") || "0";
};

type ConvertScreenProps = {
  initialCode?: string;
};

export const ConvertScreen = ({ initialCode }: ConvertScreenProps) => {
  const query = useRates();
  const rates = query.data?.rates ?? [];

  const [amount, setAmount] = useState("1000");
  const [selectedCode, setSelectedCode] = useState(initialCode || "EUR");

  const selectedRate = useMemo(
    () => rates.find((r) => r.code === selectedCode),
    [rates, selectedCode],
  );

  const convertedAmount = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    if (!selectedRate || numAmount === 0) return 0;
    return convertCzkToForeign(numAmount, selectedRate);
  }, [amount, selectedRate]);

  const handleAmountChange = (text: string) => {
    // Only allow numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, "");
    // Prevent multiple decimal points
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    setAmount(cleaned);
  };

  return (
    <Container>
      <Header title="Convert" onBack={() => router.back()} />

      <QueryResult query={query}>
        <Content>
          <Label style={{ marginBottom: vs(8) }}>Amount in CZK</Label>
          <Input
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="Enter amount"
            keyboardType="decimal-pad"
            autoFocus
          />

          <Separator size={theme.spacing.xl} />

          <Label style={{ marginBottom: vs(8) }}>Convert to</Label>
          <CurrencyPicker
            data={rates.map((r) => ({ code: r.code, country: r.country }))}
            selectedCode={selectedCode}
            onSelect={setSelectedCode}
          />

          <Separator size={theme.spacing["3xl"]} />

          <ResultContainer>
            <ResultLabel>You get approximately</ResultLabel>
            <ResultAmount>
              {getCurrencySymbol(selectedCode)} {formatAmount(convertedAmount)}
            </ResultAmount>
            <ResultCurrency>{selectedRate?.currency}</ResultCurrency>

            {selectedRate && (
              <RateInfo>
                Rate: {selectedRate.amount} {selectedCode} = {selectedRate.rate}{" "}
                CZK
              </RateInfo>
            )}
          </ResultContainer>
        </Content>
      </QueryResult>
    </Container>
  );
};
