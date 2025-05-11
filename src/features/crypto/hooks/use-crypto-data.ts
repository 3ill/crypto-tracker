import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CryptoDataList } from "../schemas/crypto-data.schema";
import { fetchCryptoData } from "../api/fetch-crypto-data";

export const CRYPTO_DATA_QUERY_KEY = ["crypto", "data"];

export const useCryptoData = (): UseQueryResult<CryptoDataList, Error> => {
  return useQuery({
    queryKey: CRYPTO_DATA_QUERY_KEY,
    queryFn: fetchCryptoData,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    retry: 2,
  });
};
