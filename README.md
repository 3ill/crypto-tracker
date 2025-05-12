# Welcome to Crypto Tracker
Crypto tracker is a light weight web application to get real time notifications on crypto currencies

## ⚙ Setup Instructions
#### Step 1: Clone Repo
```Shell
git clone
```

#### Step 2: Install Dependencies
```Shell
npm install
```

#### Step 3: Start Server
```Shell
npm run dev
```
___
## 🤔 Project Structure
This project implements a **Domain-Based Structure** .
```Shell
/src
  /features
    /crypto
      /components
        crypto-card.tsx
        crypto-search.tsx
      /api
        /crypto-data
          route.ts
        /search
          route.ts
      /hooks
        use-crypto-data.ts
        use-crypto-search.ts
      /types
        index.ts
      /utils
      index.ts
  /shared
    /components
    /ui
    /layout
  /app
    /(root)
      layout.tsx
      page.tsx
    /fonts
    /globals.css
  /lib
    /types
    http-client.ts
    react-query.ts
    react-query-client.ts
  /constants
    constants.ts
/public
/README.md
/tsconfig.json
/tailwind.config.js
/next.config.js
```

This approach is useful for keeping related functionality in one place, making it easier to maintain and scale the application.
___

## Configuration
Configuration is an important piece of this project, the config setup leverages `zod`ensuring that critical configuration values are present and properly formatted before the application runs, preventing potential runtime errors and security issues.

```Typescript
export const EnvConfig = {
  env: {
    coingecko: {
      API_KEY: process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "",
      BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
      HEADERS: {
        accept: "application/json",
      },
    },
  },
};
```

```Typescript
import { z } from "zod";
import { EnvConfig } from "..";

const envSchema = z.object({
  coingecko: z.object({
    API_KEY: z
      .string()
      .min(1, "API_KEY is required")
      .max(30, "API_KEY must be at most 30 characters"),
    BASE_URL: z.string().url("BASE_URL must be a valid URL"),
    HEADERS: z.object({
      accept: z.string().default("application/json"),
    }),
  }),
});

export const env = envSchema.parse(EnvConfig.env);

```

## Key Benefits of this configuration pattern

### 1. Fail-Fast Approach

By validating environment variables early in the application lifecycle, we ensure that configuration errors are caught immediately rather than causing subtle runtime issues:

- **Early Error Detection**: Problems are identified during application startup
- **Clear Error Messages**: Zod provides detailed error messages about which validations failed
- **Prevents Partial Operation**: The application won't run with incomplete configuration

### 2. Type Safety and Intellisense Support

Our configuration system provides:

- **TypeScript Integration**: Full type information about available configuration values
- **IDE Autocompletion**: Developers get intellisense support for configuration options
- **Confidence in Usage**: Eliminates uncertainty about the structure of configuration objects

### 3. Centralized Configuration Management

- **Single Source of Truth**: All configuration definitions in one location
- **Consistent Access Pattern**: Standardized way to access configuration values
- **Easy Maintenance**: Configuration changes happen in one place

### 4. Enhanced Security

- **Prevents Missing Credentials**: Required API keys must be present
- **Format Validation**: Ensures URLs and other formatted strings are valid
- **Controlled Defaults**: Sensible fallbacks where appropriate
___

## Standardized HTTP client
This  app utilizes a `HttpClient` class, which is a robust and flexible wrapper around the native Fetch API, designed to standardize and enhance HTTP communication in the Crypto Tracker application.

This custom implementation provides numerous advantages over direct Fetch API usage, including built-in error handling, retries, timeouts, and consistent request configuration.

Benefits of This Approach

### 1. Centralized API Configuration

Our HTTP client provides a single point of configuration for all API interactions:

```Typescript
const client = new HttpClient({
  baseUrl: env.coingecko.BASE_URL,
  defaultHeaders: {
    accept: env.coingecko.HEADERS.accept,
    "x-cg-demo-api-key": env.coingecko.API_KEY,
  },
  retries: 3,
  timeoutMs: 10000,
  logRequests: true,
});
```

**Benefits:**
- **Consistent Configuration**: All requests to a particular API use the same base settings
- **DRY Principle**: Eliminates repetition of configuration across API calls
- **Single Point of Change**: Modify API interaction patterns in one place

### 2. Enhanced Reliability

The built-in retry mechanism with exponential backoff significantly improves application resilience:

**Benefits:**
- **Handles Transient Failures**: Automatically recovers from temporary network issues
- **Intelligent Backoff**: Increasing delays between retries prevent overwhelming services
- **Configurable Attempts**: Adjust retry counts based on service importance and stability

### 3. Improved Developer Experience

The client interface simplifies API interactions and reduces boilerplate:

```Typescript
export const fetchCryptoData = async () => {
  const data = await client.get<unknown>({
    path: MARKET_PATH,
  });

  return data;
};
```

**Benefits:**
- **Clean API Surface**: Simplified method calls reduce cognitive load
- **Type Safety**: Generic type parameters ensure correct typing of responses
- **Reduced Boilerplate**: Common request configurations are abstracted away

### 4. Better Error Handling

The standardized error handling approach provides consistent error information:

**Benefits:**
- **Detailed Error Information**: Captures both status codes and error response bodies
- **Consistent Error Format**: Standardized error structure throughout the application
- **Error Traceability**: Easier to track the source and nature of API failures

### 5. Performance Optimization

Automatic timeouts prevent requests from hanging indefinitely:

**Benefits:**
- **Prevents Hung Requests**: No requests left in pending state indefinitely
- **Resource Efficiency**: Frees up connections that would otherwise remain open
- **Improved User Experience**: Faster failure notification instead of indefinite loading

### 6. Simplified Testing

The abstraction layer makes it easier to mock API calls in tests:

**Benefits:**
- **Mock-Friendly Design**: Class-based approach is easier to mock than direct fetch calls
- **Testable Units**: API logic can be tested separately from HTTP implementation
- **Controlled Test Environment**: Simulate various response scenarios without real API calls
___

## Data Fetching and Hydration
Our data fetching architecture combines the best of server-side rendering with client-side state management to create a seamless user experience. By prefetching data on the server and hydrating it to the client, we eliminate initial loading states while maintaining the benefits of React Query's caching, refetching, and state management.

This approach ensures that users see content immediately upon page load, with type-safe data that automatically refreshes in the background. The result is a performant, SEO-friendly application with a consistent and reliable user experience, even in the face of network variability or API inconsistencies.

### Architecture

The data fetching architecture follows a layered approach:

1. **HTTP Client Layer**: Base communication with external APIs
2. **API Routes Layer**: Server-side endpoints that abstract API communication
3. **React Query Layer**: Client-side data fetching with caching and revalidation
4. **Server Hydration Layer**: Pre-fetches data during server-side rendering
5. **Component Layer**: Consumes hydrated data with fallback states

### Server-side Prefetching
```Typescript
const Home = async () => {
  try {
    await queryClient.prefetchQuery({
      queryKey: CRYPTO_DATA_QUERY_KEY,
      queryFn: fetchCryptoData,
    });

    return (
      <section className="section_wrapper">
        <div className="flex-center gap-2">
          <Header>
            <h1>Live Feed</h1>
          </Header>
          <p className="font-grotesk max-w-prose text-center text-sm font-light">
            Monitor your favorite cryptocurrencies in real-time. Click on a coin
            to view insights.
          </p>
        </div>

        <div className="flex w-full flex-col justify-center">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <CryptoCard />
          </HydrationBoundary>
        </div>
      </section>
    );
  } catch (error) {
    return <p>Failed to load crypto prices: {(error as Error).message}</p>;
  }
};

export default Home;

```
___

## Dynamic Search with Sorting
The application implements a robust cryptocurrency search feature with dynamic sorting capabilities. This search functionality provides a responsive and type-safe interface for finding and organizing cryptocurrency data.

### Type-Safe Implementation

The search component uses TypeScript for robust type definitions:

```Typescript
// Constants for sort options
export const SORT_FIELD = {
  NAME: "name",
  RANK: "market_cap_rank",
} as const;

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

// Type definitions
export type SortFieldValue = (typeof SORT_FIELD)[keyof typeof SORT_FIELD];
export type SortOrderValue = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

// Form values type
interface FormValues {
  query: string;
  sortField: SortFieldValue;
  sortOrder: SortOrderValue;
}
```

### React Hook Form Integration

The component uses React Hook Form for state management:

```Typescript
const form = useForm<FormValues>({
  defaultValues: {
    query: "",
    sortField: SORT_FIELD.RANK,
    sortOrder: SORT_ORDER.ASC,
  },
});

const query = form.watch("query");
const sortField = form.watch("sortField");
const sortOrder = form.watch("sortOrder");
```

### Optimized Search with Debouncing

To prevent excessive API calls, the search implements debouncing:

```Typescript
useEffect(() => {
  const timer = setTimeout(() => {
    if (query) {
      setDebouncedQuery(query);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [query]);
```

### Client-Side Sorting

The search results are sorted dynamically on the client:

```Typescript
const sortedResults = data?.coins
  ? [...data.coins].sort((a, b) => {
      if (sortField === SORT_FIELD.NAME) {
        const comparison = a.name.localeCompare(b.name);
        return sortOrder === SORT_ORDER.ASC ? comparison : -comparison;
      }

      // Handle null market_cap_rank values
      if (a.market_cap_rank === null && b.market_cap_rank === null) return 0;
      if (a.market_cap_rank === null)
        return sortOrder === SORT_ORDER.ASC ? 1 : -1;
      if (b.market_cap_rank === null)
        return sortOrder === SORT_ORDER.ASC ? -1 : 1;

      return sortOrder === SORT_ORDER.ASC
        ? a.market_cap_rank - b.market_cap_rank
        : b.market_cap_rank - a.market_cap_rank;
    })
  : [];
```

### Advanced Event Handling

The component implements sophisticated event handling to ensure a smooth user experience:

```Typescript
// Click outside detection for dropdown
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node) &&
      showResults
    ) {
      setShowResults(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [showResults]);

// Prevent event propagation when interacting with sort controls
const handleSortChange = (
  type: "field" | "order",
  value: SortFieldValue | SortOrderValue,
) => {
  if (type === "field") {
    form.setValue("sortField", value as SortFieldValue);
  } else {
    form.setValue("sortOrder", value as SortOrderValue);
  }
};
```

### Benefits of This Approach

#### 1. Enhanced User Experience

- **Real-time Feedback**: Loading indicators and results appear as users type
- **Contextual UI**: Sort controls only appear when there are results to sort
- **Smooth Interactions**: Dropdown remains open during sorting operations
- **Clear Visual Feedback**: Loading states, empty states, and error states are clearly communicated

#### 2. Performance Optimization

- **Reduced API Calls**: Debouncing prevents unnecessary requests during typing
- **Client-Side Operations**: Sorting happens on the client to avoid network round-trips
- **Efficient DOM Updates**: Component only re-renders what's necessary
- **Smart Event Management**: Prevents unwanted dropdown closures during interaction

#### 3. Developer-Friendly Features

- **Type Safety**: Full TypeScript support throughout the component
- **Reusable Patterns**: The approach can be applied to other search interfaces
- **Clean Code Organization**: Clear separation of concerns and responsibilities
- **Consistent State Management**: React Hook Form provides a reliable form state foundation

#### 4. Future-Proof Implementation

- **Extensible Sorting**: New sort fields can be easily added
- **Accessible Interface**: Built with keyboard navigation and screen readers in mind
- **Mobile-Friendly Design**: Works well on both desktop and mobile devices
- **Responsive UI**: Adapts to different screen sizes and devices

This search and sorting implementation demonstrates how to create advanced user interfaces that combine form state management, API integration, and client-side data manipulation to deliver a polished user experience.
___
