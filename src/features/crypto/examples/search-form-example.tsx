"use client";

import { CryptoSearchForm } from "@/features/crypto";
import { useState } from "react";

const SearchFormExample = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

  const handleCryptoSelect = (id: string) => {
    setSelectedCrypto(id);
    // In a real application, you might:
    // 1. Navigate to a detail page
    // 2. Fetch detailed information about the selected cryptocurrency
    // 3. Update a filtered list
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cryptocurrency Search with Sorting</h2>
        <p className="text-neutral-400 mb-6">
          Search for cryptocurrencies and sort the results by name or market cap rank.
          The search uses React Hook Form for form state management and React Query for data fetching.
        </p>
        
        <CryptoSearchForm onSelectCrypto={handleCryptoSelect} />
      </div>
      
      {selectedCrypto && (
        <div className="mt-8 p-4 bg-neutral-800 rounded-lg border border-neutral-700">
          <h3 className="text-xl font-semibold mb-2">Selected Cryptocurrency</h3>
          <p className="text-neutral-300">
            You selected: <span className="text-blue-400">{selectedCrypto}</span>
          </p>
          <p className="text-neutral-400 mt-2 text-sm">
            In a real application, this would typically trigger navigation to a 
            details page or display additional information about the selected crypto.
          </p>
        </div>
      )}
      
      <div className="mt-10 bg-neutral-900 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Implementation Features</h3>
        <ul className="list-disc pl-5 space-y-2 text-neutral-300">
          <li>Form state management with React Hook Form</li>
          <li>Debounced input to minimize API calls</li>
          <li>Dynamic search results based on user input</li>
          <li>Sorting options (by name or market cap rank)</li>
          <li>Ascending or descending sort order control</li>
          <li>Loading indicators during search</li>
          <li>Error handling for failed searches</li>
          <li>Mobile-friendly design</li>
        </ul>
      </div>
      
      <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700/30">
        <h3 className="text-lg font-medium mb-2">How the Sorting Works</h3>
        <p className="text-neutral-300 mb-3">
          The sorting functionality demonstrates several key patterns:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-neutral-300">
          <li>Client-side sorting of API response data</li>
          <li>Form fields for controlling sort parameters</li>
          <li>Type-safe sort options using TypeScript's const assertions</li>
          <li>Null-value handling in the sort comparison function</li>
          <li>Conditional display of sort controls only when results are available</li>
          <li>Consistent state management through React Hook Form</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchFormExample;