import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  CryptoSearchResult,
  cryptoSearchResultSchema,
} from "../schemas/crypto-list.schema";
import { searchCryptoData } from "../api/search/route";

export const getCryptoSearchQueryKey = (query: string) => [
  "crypto",
  "search",
  query,
];

export const useCryptoSearch = (
  query: string,
  enabled = true,
): UseQueryResult<CryptoSearchResult, Error> => {
  return useQuery({
    queryKey: getCryptoSearchQueryKey(query),
    queryFn: async () => {
      try {
        const data = await searchCryptoData(query);
        return cryptoSearchResultSchema.parse(data);
      } catch (error) {
        console.error("Error searching crypto data:", error);
        throw error;
      }
    },
    enabled: enabled && query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};
