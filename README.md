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
        CryptoList.tsx
        CryptoCard.tsx
        SearchBar.tsx
        SortControls.tsx
      /api
        fetchCryptoPrices.ts
      /hooks
        useCryptoPrices.ts
      /types
        crypto.types.ts
      /utils
        formatPriceChange.ts
      index.ts
  /shared
    /components
      LoadingSpinner.tsx
      ErrorMessage.tsx
    /ui
    /layout
  /app
    /page.tsx
    /globals.css
  /lib
    react-query-client.ts
  /constants
    coins.ts

/public
/README.md
/tsconfig.json
/tailwind.config.js
/next.config.js
```

This approach is useful for keeping related functionality in one place, making it easier to maintain and scale the application.
___
