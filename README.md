# CNB Exchange Rates

A React Native mobile app for viewing Czech National Bank (CNB) exchange rates with real-time currency conversion and historical rate graphs.

## Features

- **Currency List** - View all CNB exchange rates with country flags
- **Currency Converter** - Convert between CZK and any available currency with real-time calculations
- **Historical Graphs** - Interactive charts showing exchange rate history from 1991 to present
- **Year Selector** - Browse historical data by year
- **Pull to Refresh** - Always get the latest rates
- **Robust Error Handling** - Global error boundaries and user-friendly API error messages

## Tech Stack

- **React Native** with Expo SDK 54
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **React Query** (@tanstack/react-query) for data fetching and caching
- **Styled Components** for styling
- **Victory Native** with Skia for charts
- **React Native Reanimated** for animations
- **Jest & React Native Testing Library** for unit testing

## Project Structure

```
src/
├── common/           # Shared constants, state, and error handling
├── components/       # Reusable UI components
│   └── ui/           # Base UI components (Button, Input, etc.)
├── features/         # Feature-based modules
│   ├── convert/      # Currency converter logic and screen
│   ├── error/        # Error boundaries and components
│   ├── graph/        # Historical rate graphs
│   └── home/         # Home screen with rates list
├── hooks/            # Custom React hooks
├── theme/            # Colors and theming
└── utils/            # Utility functions and parsers
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- iOS Simulator (macOS) or Android Emulator
- [Maestro](https://maestro.mobile.dev/) for E2E tests

### Installation

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android
```

### Environment

The app uses the CNB public API:

- Daily rates: `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt`
- Yearly rates: `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/year.txt`

## Running Tests

This project uses **Jest** for unit testing and **Maestro** for end-to-end testing.

### Unit Tests

Unit tests cover utility functions (parsers) and critical business logic.

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test -- --watch
```

### E2E Tests (Maestro)

1. **Install Maestro**:

   ```bash
   curl -Ls "https://get.maestro.mobile.dev" | bash
   ```

2. **Run Tests**:

   ```bash
   # Make sure the app is running on a simulator/emulator first
   pnpm ios  # or pnpm android

   # Run all E2E tests
   maestro test maestro/
   ```

## Scripts

| Command        | Description                   |
| -------------- | ----------------------------- |
| `pnpm start`   | Start Expo development server |
| `pnpm ios`     | Run on iOS simulator          |
| `pnpm android` | Run on Android emulator       |
| `pnpm test`    | Run Jest unit tests           |
| `pnpm lint`    | Run ESLint                    |

## API Reference

The app fetches data from the Czech National Bank's public API:

- **Daily Rates** - Current exchange rates updated daily
- **Yearly Rates** - Historical data available from 1991

## License

Private project.
