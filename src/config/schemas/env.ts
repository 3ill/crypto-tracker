import { z } from "zod";
import { EnvConfig } from "..";

const envSchema = z.object({
  coingecko: z.object({
    API_KEY: z
      .string()
      .min(1, "API_KEY is required")
      .max(30, "API_KEY must be at most 30 characters"),
    BASE_URL: z.string().url("BASE_URL must be a valid URL"),
    HEADERS: z.object({
      accept: z.string().default("application/json"),
    }),
  }),
});

export const env = envSchema.parse(EnvConfig.env);
