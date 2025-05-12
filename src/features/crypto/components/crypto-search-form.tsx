"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { useCryptoSearch } from "../hooks/use-crypto-search";
import { SortFieldValue, SortOrderValue } from "../types";
import { SORT_FIELD, SORT_ORDER } from "@/constants/constant";

interface FormValues {
  query: string;
  sortField: SortFieldValue;
  sortOrder: SortOrderValue;
}

interface CryptoSearchFormProps {
  onSelectCrypto?: (id: string) => void;
}

const CryptoSearchForm = ({ onSelectCrypto }: CryptoSearchFormProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

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

  const { data, isLoading, isError, error } = useCryptoSearch(
    debouncedQuery,
    !!debouncedQuery,
  );

  const handleCryptoSelect = (id: string) => {
    if (onSelectCrypto) {
      onSelectCrypto(id);
      form.reset({
        ...form.getValues(),
        query: "",
      });
      setShowResults(false);
    }
  };

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

  const sortedResults = data?.coins
    ? [...data.coins].sort((a, b) => {
        if (sortField === SORT_FIELD.NAME) {
          const comparison = a.name.localeCompare(b.name);
          return sortOrder === SORT_ORDER.ASC ? comparison : -comparison;
        }

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

  return (
    <div className="mx-auto w-full max-w-md" ref={componentRef}>
      <Form {...form}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <input
                      {...field}
                      className="placeholder:font-grotesk w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-500 placeholder:text-sm placeholder:font-light focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Search cryptocurrencies..."
                      onClick={() => {
                        if (debouncedQuery) setShowResults(true);
                      }}
                    />
                    {isLoading && debouncedQuery && (
                      <div className="absolute top-2.5 right-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                      </div>
                    )}
                    {!isLoading && field.value && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-1.5 right-1 h-6 w-6 p-0 text-neutral-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          form.setValue("query", "");
                          setShowResults(false);
                        }}
                      >
                        <span className="sr-only">Clear</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-4"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sort Controls */}
          {showResults && sortedResults && sortedResults.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-4 rounded-lg bg-neutral-900 p-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-300">Sort by:</span>
                <select
                  value={sortField}
                  className="rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1 text-sm text-neutral-200"
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSortChange("field", e.target.value as SortFieldValue);
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value={SORT_FIELD.RANK}>Market Cap Rank</option>
                  <option value={SORT_FIELD.NAME}>Name</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-300">Order:</span>
                <select
                  value={sortOrder}
                  className="rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1 text-sm text-neutral-200"
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSortChange("order", e.target.value as SortOrderValue);
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value={SORT_ORDER.ASC}>Ascending</option>
                  <option value={SORT_ORDER.DESC}>Descending</option>
                </select>
              </div>
            </div>
          )}
        </form>
      </Form>

      {/* Results dropdown */}
      {showResults && debouncedQuery && (
        <div className="relative z-10 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg">
          {isError ? (
            <div className="p-3 text-red-500">
              Error: {error?.message || "Failed to search"}
            </div>
          ) : sortedResults && sortedResults.length === 0 ? (
            <div className="p-3 text-neutral-400">No results found</div>
          ) : (
            <ul>
              {sortedResults &&
                sortedResults.map((coin) => (
                  <li
                    key={coin.id}
                    className="flex cursor-pointer items-center gap-3 border-b border-neutral-700 p-3 last:border-0 hover:bg-neutral-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCryptoSelect(coin.id);
                    }}
                  >
                    <Image
                      src={coin.thumb}
                      alt={coin.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-grotesk font-medium text-white">
                        {coin.name}
                      </p>
                      <p className="font-grotesk text-sm text-neutral-400 uppercase">
                        {coin.symbol}
                      </p>
                    </div>
                    {coin.market_cap_rank && (
                      <span className="font-grotesk ml-auto rounded-full bg-neutral-700 px-2 py-1 text-xs text-neutral-300">
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

export default CryptoSearchForm;
