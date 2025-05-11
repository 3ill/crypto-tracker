import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  CryptoDataList,
  CryptoDataListSchema,
} from "../schemas/crypto-data.schema";
import { fetchCryptoData } from "../api/crypto-data/route";

export const CRYPTO_DATA_QUERY_KEY = ["crypto", "data"];

export const useCryptoData = (): UseQueryResult<CryptoDataList, Error> => {
  return useQuery({
    queryKey: CRYPTO_DATA_QUERY_KEY,
    queryFn: async () => {
        try {
          const data = await fetchCryptoData();
          return CryptoDataListSchema.parse(data);
        } catch (error) {
          console.error("Error fetching crypto data:", error);
          throw error;
        }
      },
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    retry: 2,
  });
};
