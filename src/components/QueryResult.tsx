import { ReactNode } from "react";
import { ActivityIndicator } from "react-native";

import { Box } from "@/src/components/ui/Box";
import { Error } from "@/src/features/error/components/Error";
import colors from "@/src/theme/colors";

export interface QueryLike {
  isLoading?: boolean;
  isFetching?: boolean;
  error?: unknown;
  refetch?: () => void;
}

export interface QueryResultProps {
  children?: ReactNode;
  query: QueryLike | QueryLike[];
  ignoreLoading?: boolean;
  ignoreError?: boolean;
  renderLoading?: () => ReactNode;
  renderError?: (refetch?: () => void) => ReactNode;
}

export const QueryResult = ({
  children,
  query,
  ignoreLoading = false,
  ignoreError = false,
  renderLoading,
  renderError,
}: QueryResultProps) => {
  const queries: QueryLike[] = Array.isArray(query) ? query : [query];

  const isLoading = queries.some((q) => q.isLoading);

  if (!ignoreLoading && isLoading) {
    if (renderLoading) {
      return <>{renderLoading()}</>;
    }

    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="small" color={colors.primary.blue} />
      </Box>
    );
  }

  // Handle error state
  const errorQuery = queries.find((q) => q.error != null);

  if (!ignoreError && errorQuery?.error) {
    if (renderError) {
      return <>{renderError(errorQuery.refetch)}</>;
    }

    return (
      <Error
        type="server"
        onPress={errorQuery.refetch}
        isLoading={errorQuery.isFetching}
      />
    );
  }

  return <>{children}</>;
};
