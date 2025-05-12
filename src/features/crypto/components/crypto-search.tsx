"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCryptoSearch } from "../hooks/use-crypto-search";

interface CryptoSearchProps {
  onSelectCrypto?: (id: string) => void;
}

const CryptoSearch = ({ onSelectCrypto }: CryptoSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError, error } = useCryptoSearch(debouncedQuery);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCryptoSelect = (id: string) => {
    if (onSelectCrypto) {
      onSelectCrypto(id);
      setSearchQuery("");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          className="placeholder:font-grotesk w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-500 placeholder:text-sm placeholder:font-light focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Search cryptocurrencies..."
          value={searchQuery}
          onChange={handleSearchInput}
        />

        {isLoading && searchQuery && (
          <div className="absolute top-2.5 right-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Results dropdown */}
      {debouncedQuery && (
        <div className="mt-2 max-h-80 overflow-y-auto rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg">
          {isError ? (
            <div className="p-3 text-red-500">
              Error: {error?.message || "Failed to search"}
            </div>
          ) : data?.coins.length === 0 ? (
            <div className="p-3 text-neutral-400">No results found</div>
          ) : (
            <ul>
              {data?.coins.map((coin) => (
                <li
                  key={coin.id}
                  className="flex cursor-pointer items-center gap-3 border-b border-neutral-700 p-3 last:border-0 hover:bg-neutral-700"
                  onClick={() => handleCryptoSelect(coin.id)}
                >
                  <Image
                    src={coin.thumb}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-white">{coin.name}</p>
                    <p className="text-sm text-neutral-400 uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                  {coin.market_cap_rank && (
                    <span className="ml-auto rounded-full bg-neutral-700 px-2 py-1 text-xs text-neutral-300">
                      Rank #{coin.market_cap_rank}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CryptoSearch;
