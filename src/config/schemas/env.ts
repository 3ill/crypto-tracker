import { z } from "zod";
import { EnvConfig } from "..";

const envSchema = z.object({
  coingecko: z.object({
    API_KEY: z
      .string()
      .min(1, "API_KEY is required")
      .max(30, "API_KEY must be at most 30 characters"),
  }),
});

export const env = envSchema.parse(EnvConfig.env);
