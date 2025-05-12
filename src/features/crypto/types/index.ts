import { SORT_FIELD, SORT_ORDER } from "@/constants/constant";

export type SortFieldValue = (typeof SORT_FIELD)[keyof typeof SORT_FIELD];
export type SortOrderValue = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
