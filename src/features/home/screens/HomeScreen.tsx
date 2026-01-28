import { QueryResult } from "@/src/components/QueryResult";
import { Box } from "@/src/components/ui/Box";
import { Header } from "@/src/components/ui/Header";
import { Text } from "@/src/components/ui/Text";
import { useRates } from "@/src/features/home/api/useRates";

export const HomeScreen = () => {
  const query = useRates();

  return (
    <Box flex={1}>
      <Header title="Home" />
      <QueryResult query={query}>
        <Text>kokot</Text>
      </QueryResult>
    </Box>
  );
};
