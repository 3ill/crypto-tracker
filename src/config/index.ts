export const EnvConfig = {
  env: {
    coingecko: {
      API_KEY: process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "",
      BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://api.coingecko.com/api/v3",
      HEADERS: {
        accept: "application/json",
      },
    },
  },
};
