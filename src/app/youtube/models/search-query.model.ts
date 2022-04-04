import { SortingType, SortOrder } from "./constants";

export interface SearchVideoQuery {
  searchText?: string;
}
export interface Sorting {
  field: SortingType;
  sortOrder: SortOrder;
}
