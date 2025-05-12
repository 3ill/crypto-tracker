import { z } from "zod";

export const cryptoSearchResultSchema = z.object({
  coins: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      api_symbol: z.string(),
      symbol: z.string(),
      market_cap_rank: z.number().nullable(),
      thumb: z.string().url(),
      large: z.string().url(),
    }),
  ),
});

export type CryptoSearchResult = z.infer<typeof cryptoSearchResultSchema>;
