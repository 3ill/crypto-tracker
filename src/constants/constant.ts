export const MARKET_PATH =
  "/coins/markets?vs_currency=usd&ids=&ids=bitcoin%2Cethereum%2Csolana%2Cpolygon%2Cdogecoin";
export const SEARCH_PATH = "/search?query=";

export const SORT_FIELD = {
  NAME: "name",
  RANK: "market_cap_rank",
} as const;

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;
