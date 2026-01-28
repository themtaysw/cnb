import { Center } from "@/src/components/ui/Center";
import { Container } from "@/src/components/ui/Container";
import { Content } from "@/src/components/ui/Content";
import { CurrencyPicker } from "@/src/components/ui/CurrencyPicker";
import { Row } from "@/src/components/ui/Row";
import {
  useAvailableCurrencies,
  useHistoricalRates,
} from "@/src/features/graph/api/useHistoricalRates";
import theme from "@/src/theme";
import { vs } from "@/src/utils/normalize";
import { Circle, LinearGradient, vec } from "@shopify/react-native-skia";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const CHART_HEIGHT = SCREEN_HEIGHT * 0.5;
const DEFAULT_CURRENCY = "EUR";
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1991;

const PriceContainer = styled.View`
  align-items: center;
  margin-top: ${vs(24)}px;
`;

const PriceDate = styled.Text`
  font-size: ${vs(12)}px;
  color: ${theme.colors.secondary_text};
  margin-bottom: ${vs(4)}px;
`;

const PriceAmount = styled.Text`
  font-size: ${vs(40)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
`;

const StatsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${vs(16)}px;
  margin-top: ${vs(8)}px;
`;

const StatText = styled.Text<{ color?: string }>`
  font-size: ${vs(14)}px;
  font-weight: 500;
  color: ${({ color }) => color || theme.colors.secondary_text};
`;

const YearSelectorRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${vs(16)}px;
  margin-top: ${vs(24)}px;
  padding: ${vs(12)}px;
  background-color: ${theme.colors.secondary_bg};
  border-radius: ${vs(12)}px;
`;

const YearButton = styled.Pressable<{ disabled?: boolean }>`
  width: ${vs(36)}px;
  height: ${vs(36)}px;
  border-radius: ${vs(18)}px;
  background-color: ${({ disabled }) =>
    disabled ? "transparent" : theme.colors.blue};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

const YearButtonText = styled.Text<{ disabled?: boolean }>`
  font-size: ${vs(18)}px;
  font-weight: 600;
  color: ${({ disabled }) =>
    disabled ? theme.colors.secondary_text : theme.colors.white};
`;

const YearText = styled.Text`
  font-size: ${vs(18)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
  min-width: ${vs(60)}px;
  text-align: center;
`;

const ChartContainer = styled.View`
  flex: 1;
  margin-horizontal: -${vs(theme.spacing.lg)}px;
  justify-content: flex-end;
`;

const ErrorText = styled.Text`
  font-size: ${vs(14)}px;
  color: ${theme.colors.secondary_text};
  text-align: center;
`;

export const GraphScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [selectedCurrency, setSelectedCurrency] = useState(DEFAULT_CURRENCY);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const { state, isActive } = useChartPressState({ x: 0, y: { rate: 0 } });

  const currenciesQuery = useAvailableCurrencies(selectedYear);
  const ratesQuery = useHistoricalRates(selectedCurrency, selectedYear);

  const canGoBack = selectedYear > MIN_YEAR;
  const canGoForward = selectedYear < CURRENT_YEAR;

  const currencies = currenciesQuery.data ?? [DEFAULT_CURRENCY];
  const ratesData = ratesQuery.data;

  const chartData = useMemo(() => {
    if (!ratesData?.rates) return [];

    return ratesData.rates.map((item, index) => ({
      index,
      rate: item.rate,
      date: item.date,
    }));
  }, [ratesData]);

  const stats = useMemo(() => {
    if (!ratesData?.rates || ratesData.rates.length === 0) {
      return { min: 0, max: 0, avg: 0, change: 0 };
    }

    const rates = ratesData.rates.map((r) => r.rate);
    const min = Math.min(...rates);
    const max = Math.max(...rates);
    const avg = rates.reduce((a, b) => a + b, 0) / rates.length;
    const first = rates[0];
    const last = rates[rates.length - 1];
    const change = ((last - first) / first) * 100;

    return { min, max, avg, change };
  }, [ratesData]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useAnimatedReaction(
    () => state.x.value.value,
    (currentValue) => {
      const idx = Math.round(currentValue);
      runOnJS(setActiveIndex)(idx);
    },
  );

  useEffect(() => {
    if (!isActive) {
      setActiveIndex(null);
    }
  }, [isActive]);

  const activeDataPoint = useMemo(() => {
    if (activeIndex === null || !isActive || chartData.length === 0)
      return null;
    if (activeIndex >= 0 && activeIndex < chartData.length) {
      return chartData[activeIndex];
    }
    return null;
  }, [activeIndex, isActive, chartData]);

  const isLoading = currenciesQuery.isLoading || ratesQuery.isLoading;
  const hasError = ratesQuery.error || !ratesData;

  const displayRate = activeDataPoint
    ? activeDataPoint.rate
    : (chartData[chartData.length - 1]?.rate ?? 0);
  const displayDate = activeDataPoint
    ? activeDataPoint.date
    : (chartData[chartData.length - 1]?.date ?? "");

  const changeAmount = useMemo(() => {
    if (chartData.length === 0) return 0;
    const first = chartData[0].rate;
    return displayRate - first;
  }, [chartData, displayRate]);

  return (
    <Container>
      <Content style={{ paddingTop: top * 2 }}>
        <Row justify="center">
          <CurrencyPicker
            data={currencies}
            selectedCode={selectedCurrency}
            onSelect={setSelectedCurrency}
            variant="minimal"
          />
        </Row>

        {!isLoading && !hasError && chartData.length > 0 && (
          <PriceContainer>
            <PriceDate>{displayDate}</PriceDate>
            <PriceAmount>Kč {displayRate.toFixed(2)}</PriceAmount>
            <StatsRow>
              <StatText
                color={
                  changeAmount >= 0 ? theme.colors.success : theme.colors.error
                }
              >
                {changeAmount >= 0 ? "+" : ""}
                {changeAmount.toFixed(2)} Kč
              </StatText>
              <StatText
                color={
                  stats.change >= 0 ? theme.colors.success : theme.colors.error
                }
              >
                {stats.change >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(stats.change).toFixed(2)}%
              </StatText>
              <StatText>Min {stats.min.toFixed(2)}</StatText>
              <StatText>Max {stats.max.toFixed(2)}</StatText>
            </StatsRow>
          </PriceContainer>
        )}

        <YearSelectorRow>
          <YearButton
            disabled={!canGoBack}
            onPress={() => canGoBack && setSelectedYear((y) => y - 1)}
          >
            <YearButtonText disabled={!canGoBack}>‹</YearButtonText>
          </YearButton>
          <YearText>{selectedYear}</YearText>
          <YearButton
            disabled={!canGoForward}
            onPress={() => canGoForward && setSelectedYear((y) => y + 1)}
          >
            <YearButtonText disabled={!canGoForward}>›</YearButtonText>
          </YearButton>
        </YearSelectorRow>

        <ChartContainer>
          {isLoading ? (
            <Center>
              <ActivityIndicator size="large" color={theme.colors.blue} />
            </Center>
          ) : hasError || chartData.length === 0 ? (
            <Center>
              <ErrorText>No data available for {selectedCurrency}</ErrorText>
            </Center>
          ) : (
            <View style={{ height: CHART_HEIGHT, marginBottom: bottom * 2 }}>
              <CartesianChart
                data={chartData}
                xKey="index"
                yKeys={["rate"]}
                chartPressState={state}
                axisOptions={{
                  tickCount: { x: 0, y: 0 },
                  labelColor: "transparent",
                  lineColor: "transparent",
                }}
                padding={{ left: 0, right: 0, top: 40, bottom: 0 }}
              >
                {({ points, chartBounds }) => (
                  <>
                    <Area
                      points={points.rate}
                      y0={chartBounds.bottom}
                      curveType="natural"
                      animate={{ type: "timing", duration: 500 }}
                    >
                      <LinearGradient
                        start={vec(0, chartBounds.top)}
                        end={vec(0, chartBounds.bottom)}
                        colors={[`${theme.colors.blue}50`, "transparent"]}
                      />
                    </Area>
                    <Line
                      points={points.rate}
                      color={theme.colors.blue}
                      strokeWidth={2}
                      curveType="natural"
                      animate={{ type: "timing", duration: 500 }}
                    />
                    {isActive && (
                      <Circle
                        cx={state.x.position}
                        cy={state.y.rate.position}
                        r={8}
                        color={theme.colors.blue}
                      />
                    )}
                  </>
                )}
              </CartesianChart>
            </View>
          )}
        </ChartContainer>
      </Content>
    </Container>
  );
};
