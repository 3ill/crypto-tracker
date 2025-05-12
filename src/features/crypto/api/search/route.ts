import { env } from "@/config/schemas/env";
import { SEARCH_PATH } from "@/constants/constant";
import { HttpClient } from "@/lib/http-client";

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

export const searchCryptoData = async (query: string) => {
  if (!query || query.trim() === "") {
    return { coins: [] };
  }

  const data = await client.get<unknown>({
    path: `${SEARCH_PATH}${encodeURIComponent(query)}`,
  });

  return data;
};