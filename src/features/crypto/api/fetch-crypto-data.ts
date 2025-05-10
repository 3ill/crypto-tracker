import { env } from "@/config/schemas/env";
import { HttpClient } from "@/lib/http-client";
import {
  CryptoPriceList,
  CryptoPriceListSchema,
} from "../schemas/crypto-price.schema";
import { MARKET_PATH } from "@/constants/constant";

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

export const fetchCryptoPrices = async (): Promise<CryptoPriceList> => {
  const data = await client.get<unknown>({
    path: MARKET_PATH,
  });

  return CryptoPriceListSchema.parse(data);
};
