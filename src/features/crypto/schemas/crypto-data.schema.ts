import { z } from "zod";

const RoiSchema = z.object({
  times: z.number(),
  currency: z.string(),
  percentage: z.number(),
});

export const CryptDataSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string().url(),
  current_price: z.number(),
  market_cap: z.number(),
  market_cap_rank: z.number(),
  fully_diluted_valuation: z.number().nullable(),
  total_volume: z.number(),
  high_24h: z.number(),
  low_24h: z.number(),
  price_change_24h: z.number(),
  price_change_percentage_24h: z.number(),
  market_cap_change_24h: z.number(),
  market_cap_change_percentage_24h: z.number(),
  circulating_supply: z.number(),
  total_supply: z.number(),
  max_supply: z.number().nullable(),
  ath: z.number(),
  ath_change_percentage: z.number(),
  ath_date: z.string().datetime(),
  atl: z.number(),
  atl_change_percentage: z.number(),
  atl_date: z.string().datetime(),
  roi: RoiSchema.nullable(),
  last_updated: z.string().datetime(),
});

export const CryptoDataListSchema = z.array(CryptDataSchema);

export type CryptoData = z.infer<typeof CryptDataSchema>;
export type CryptoDataList = z.infer<typeof CryptoDataListSchema>;
