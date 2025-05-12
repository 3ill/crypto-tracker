import { z } from "zod";

export const SortField = {
  NAME: "name",
  RANK: "market_cap_rank",
} as const;

export const SortOrder = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const searchFormSchema = z.object({
  query: z.string().trim().min(1, "Enter at least one character to search"),
  sortField: z
    .union([z.literal(SortField.NAME), z.literal(SortField.RANK)])
    .default(SortField.RANK),
  sortOrder: z
    .union([z.literal(SortOrder.ASC), z.literal(SortOrder.DESC)])
    .default(SortOrder.ASC),
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;
