import { LegendList } from "@legendapp/list";
import { useCallback } from "react";
import { RefreshControl } from "react-native";

import { QueryResult } from "@/src/components/QueryResult";
import { Container } from "@/src/components/ui/Container";
import { Header } from "@/src/components/ui/Header";
import { Separator } from "@/src/components/ui/Separator";
import { useRates } from "@/src/features/home/api/useRates";
import SingleRate from "@/src/features/home/components/SingleRate";
import { styles } from "@/src/features/home/styles";
import theme from "@/src/theme";
import { ExchangeRate } from "@/src/utils/parseRates";

export const HomeScreen = () => {
  const query = useRates();

  const renderItem = useCallback(
    ({ item }: { item: ExchangeRate }) => <SingleRate rate={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: ExchangeRate, index: number) => `${item.country}-${index}`,
    [],
  );

  return (
    <Container>
      <Header title="Currencies" />
      <QueryResult query={query}>
        <LegendList
          data={query.data?.rates ?? []}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          recycleItems
          contentContainerStyle={styles.container}
          ListHeaderComponent={() => <Separator size={theme.spacing.lg} />}
          ItemSeparatorComponent={() => <Separator size={theme.spacing.md} />}
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl
              refreshing={query.isLoading}
              onRefresh={query.refetch}
            />
          }
        />
      </QueryResult>
    </Container>
  );
};
