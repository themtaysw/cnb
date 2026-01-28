import { Card } from "@/src/components/ui/Card";
import { Center } from "@/src/components/ui/Center";
import { Container } from "@/src/components/ui/Container";
import { Content } from "@/src/components/ui/Content";
import { CurrencyPicker } from "@/src/components/ui/CurrencyPicker";
import { Header } from "@/src/components/ui/Header";
import { Label } from "@/src/components/ui/Label";
import { Row } from "@/src/components/ui/Row";
import { Separator } from "@/src/components/ui/Separator";
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
import styled from "styled-components/native";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const CHART_HEIGHT = SCREEN_HEIGHT * 0.55;

const StatValue = styled.Text`
  font-size: ${vs(16)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
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

const InfoDate = styled.Text`
  font-size: ${vs(12)}px;
  color: ${theme.colors.secondary_text};
  margin-bottom: ${vs(4)}px;
`;

const InfoRate = styled.Text`
  font-size: ${vs(24)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
`;

const InfoHint = styled.Text`
  font-size: ${vs(12)}px;
  color: ${theme.colors.secondary_text};
  margin-top: ${vs(4)}px;
`;

const YearButton = styled.Pressable<{ disabled?: boolean }>`
  width: ${vs(32)}px;
  height: ${vs(32)}px;
  border-radius: ${vs(16)}px;
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.secondary_bg : theme.colors.blue};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const YearButtonText = styled.Text<{ disabled?: boolean }>`
  font-size: ${vs(16)}px;
  font-weight: 600;
  color: ${({ disabled }) =>
    disabled ? theme.colors.secondary_text : theme.colors.white};
`;

const YearText = styled.Text`
  font-size: ${vs(18)}px;
  font-weight: 700;
  color: ${theme.colors.primary_text};
  min-width: ${vs(50)}px;
  text-align: center;
`;

const DEFAULT_CURRENCY = "EUR";
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1991; // CNB data available from 1991

export const GraphScreen = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(DEFAULT_CURRENCY);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const { state, isActive } = useChartPressState({ x: 0, y: { rate: 0 } });

  const currenciesQuery = useAvailableCurrencies(selectedYear);
  const ratesQuery = useHistoricalRates(selectedCurrency, selectedYear);

  const canGoBack = selectedYear > MIN_YEAR;
  const canGoForward = selectedYear < CURRENT_YEAR;

  const currencies = currenciesQuery.data ?? [DEFAULT_CURRENCY];
  const ratesData = ratesQuery.data;

  // Transform data for the chart
  const chartData = useMemo(() => {
    if (!ratesData?.rates) return [];

    return ratesData.rates.map((item, index) => ({
      index,
      rate: item.rate,
      date: item.date,
    }));
  }, [ratesData]);

  // Calculate stats
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

  // Track active index with Reanimated for real-time updates
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useAnimatedReaction(
    () => state.x.value.value,
    (currentValue) => {
      const idx = Math.round(currentValue);
      runOnJS(setActiveIndex)(idx);
    },
  );

  // Reset active index when touch ends
  useEffect(() => {
    if (!isActive) {
      setActiveIndex(null);
    }
  }, [isActive]);

  // Get the active data point
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

  return (
    <Container>
      <Header title="Exchange Rate" />

      <Content>
        <Row justify="space-between">
          <CurrencyPicker
            data={currencies}
            selectedCode={selectedCurrency}
            onSelect={setSelectedCurrency}
            variant="minimal"
          />

          <Row gap={24}>
            <View>
              <Label>Min</Label>
              <StatValue>{stats.min.toFixed(2)}</StatValue>
            </View>
            <View>
              <Label>Max</Label>
              <StatValue>{stats.max.toFixed(2)}</StatValue>
            </View>
            <View>
              <Label>Change</Label>
              <StatValue
                style={{
                  color:
                    stats.change >= 0
                      ? theme.colors.success
                      : theme.colors.error,
                }}
              >
                {stats.change >= 0 ? "+" : ""}
                {stats.change.toFixed(2)}%
              </StatValue>
            </View>
          </Row>
        </Row>

        <Separator size={theme.spacing.lg} />

        {!isLoading && !hasError && chartData.length > 0 && (
          <Card centered style={{ marginTop: vs(16) }}>
            {activeDataPoint ? (
              <>
                <InfoDate>{activeDataPoint.date}</InfoDate>
                <InfoRate>
                  {ratesData?.amount} {selectedCurrency} ={" "}
                  {activeDataPoint.rate.toFixed(3)} CZK
                </InfoRate>
              </>
            ) : (
              <>
                <InfoDate>
                  Latest: {chartData[chartData.length - 1]?.date}
                </InfoDate>
                <InfoRate>
                  {ratesData?.amount} {selectedCurrency} ={" "}
                  {chartData[chartData.length - 1]?.rate.toFixed(3)} CZK
                </InfoRate>
                <InfoHint>Touch graph to explore</InfoHint>
              </>
            )}
          </Card>
        )}

        <Row justify="flex-end" gap={8} style={{ marginTop: vs(12) }}>
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
        </Row>

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
            <View style={{ height: CHART_HEIGHT }}>
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
