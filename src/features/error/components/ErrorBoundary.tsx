import { Center } from "@/src/components/ui/Center";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Error } from "./Error";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Center style={styles.container}>
          <Error
            type="custom"
            title="Something went wrong"
            text={this.state.error?.message || "An unexpected error occurred."}
            buttonText="Try Again"
            onPress={this.handleRetry}
          />
        </Center>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
