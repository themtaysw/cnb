import { LegendList } from "@legendapp/list";
import { RefreshControl } from "react-native";

import { QueryResult } from "@/src/components/QueryResult";
import { Container } from "@/src/components/ui/Container";
import { Header } from "@/src/components/ui/Header";
import { Separator } from "@/src/components/ui/Separator";
import { useRates } from "@/src/features/home/api/useRates";
import SingleRate from "@/src/features/home/components/SingleRate";
import { styles } from "@/src/features/home/styles";
import theme from "@/src/theme";

export const HomeScreen = () => {
  const query = useRates();

  return (
    <Container>
      <Header title="Currencies" />
      <QueryResult query={query}>
        <LegendList
          data={query.data?.rates ?? []}
          keyExtractor={(item, index) => `${item.country}-${index}`}
          renderItem={({ item }) => <SingleRate rate={item} />}
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
