# Welcome to Crypto Tracker
Crypto tracker is a light weight web application to get real time notifications on crypto-currencies.

---

## 📚 Table of Contents

- [✅ Tech Stack](#-tech-stack)

- [⚙ Setup Instructions](#-setup-instructions)

- [🤔 Project Structure](#-project-structure)

- [🛠️ Configuration](#configuration)

    - [Key Benefits](#key-benefits)

- [🔗 Standardized HTTP Client](#standardized-http-client)

    - [Benefits](#benefits)

- [📦 Data Fetching and Hydration](#data-fetching-and-hydration)

    - [Server-side Prefetching](#server-side-prefetching)

- [📈 Scaling for 100+ Coins](#-scaling-for-100-coins)

    - [✅ Use TanStack Virtualization](#-use-tanstack-virtualization)

    - [🧠 Tips for Scaling Further](#-tips-for-scaling-further)

    - [♻ General Scaling Principles](#-general-scaling-principles)

- [🔍 Dynamic Search with Sorting](#-dynamic-search-with-sorting)

    - [Type-Safe Implementation](#type-safe-implementation)

    - [React Hook Form Integration](#react-hook-form-integration)

    - [Optimized Search with Debouncing](#optimized-search-with-debouncing)

    - [Client-Side Sorting](#client-side-sorting)

    - [Advanced Event Handling](#advanced-event-handling)

    - [Benefits of This Approach](#benefits-of-this-approach)

---

## ✅ Tech Stack

- **Next.js App Router**

- **TypeScript**

- **Tailwind CSS**

- **Zod**

- **React Query**

- **CoinGecko API**

## ⚙ Setup Instructions
#### Step 1: Clone Repo
```Shell
git clone https://github.com/3ill/crypto-tracker
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
The configuration layer uses `zod` to validate environment variables, ensuring that required fields are present and correctly formatted before the application runs. This prevents runtime issues and enforces consistency.

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

## Key Benefits

#### 1. Fail-Fast Approach

- Catches missing or malformed configuration early.

- Zod provides clear, readable validation errors.

- Prevents partially configured apps from running.


#### 2. Type Safety and Intellisense Support

- Full TypeScript types for all configuration values.

- Developers benefit from IDE autocompletion.

- Safer usage throughout the app.


#### 3. Centralized Configuration Management

- One source of truth for configuration.

- Easy updates and consistent access patterns.


#### 4. Enhanced Security

- Enforces required keys and formats.

- Avoids accidental exposure or omissions.

- Validates external URLs and headers.
___

## Standardized HTTP client
The HTTP client is a wrapper around the Fetch API that adds retries, timeouts, logging, and consistent headers.


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

### Benefits

#### 1. Centralized API Configuration

- Ensures consistent settings across all requests.

- DRY — no duplicated configuration code.

- Single point of change for headers, timeouts, etc.


#### 2. Enhanced Reliability

- Retry logic with exponential backoff.

- Handles network flakiness gracefully.


#### 3. Improved Developer Experience

- Clean, minimal method signatures.

- Type-safe API responses using generics.


#### 4. Better Error Handling

- Standard error formats across the app.

- Easier debugging with consistent error messages.


#### 5. Performance Optimization

- Built-in timeouts avoid hanging requests.

- Responsive UIs through fast failure feedback.


#### 6. Simplified Testing

- Easy to mock and test independently from business logic.

- Simulate different API responses cleanly
___

## Data Fetching and Hydration

The application uses **server-side prefetching** and **React Query hydration** to provide a fast, cached, and resilient user experience.

### Architecture Layers

1. **HTTP Client Layer**: Handles network calls.

2. **API Routes Layer**: Proxies and sanitizes external APIs.

3. **React Query Layer**: Manages caching, refetching, and hydration.

4. **Server Hydration Layer**: Prefetches data for SSR pages.

5. **Component Layer**: Displays data, handles fallback and error states.

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

## 📈 **Scaling for 100+ Coins**

To render hundreds of coins efficiently:

### ✅ Use TanStack Virtualization

**Why:** Rendering all coin cards at once becomes a performance bottleneck as the list grows.

**How:**

```Typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const parentRef = useRef(null);
const rowVirtualizer = useVirtualizer({
  count: coins.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 80, // Estimated height of each row
});

return (
  <div ref={parentRef} className="overflow-auto h-[600px]">
    <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
      {rowVirtualizer.getVirtualItems().map(virtualRow => {
        const coin = coins[virtualRow.index];
        return (
          <div
            key={coin.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateY(${virtualRow.start}px)`,
              height: `${virtualRow.size}px`,
              width: '100%',
            }}
          >
            <CryptoCard {...coin} />
          </div>
        );
      })}
    </div>
  </div>
);

```

### 🧠 Tips for Scaling Further

- **Pagination or Infinite Scroll**: Use paginated endpoints or `useInfiniteQuery` to fetch data in chunks.

- **Lazy Image Loading**: Only load images that are in the viewport to reduce bandwidth.

- **Debounced Filtering**: When filtering 100+ coins, debounce the filter input.

- **Memoization**: Use `React.memo` for coin cards to prevent unnecessary re-renders.

- **Background Refetching**: Set up automatic background refresh intervals via React Query.


### ♻ General Scaling Principles

- Break large components into smaller, testable parts.

- Use suspense boundaries at domain or route levels.

- Hydrate only essential data on the server; defer the rest to the client.

- Minimize prop drilling by colocating state near the consuming component.
___


## 🔍 Dynamic Search with Sorting
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
