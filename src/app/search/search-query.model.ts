import { SortingType, SortOrder } from "./common/constants";

export interface SearchVideoQuery {
  searchText?: string;
}
export interface Sorting {
  field: SortingType;
  sortOrder: SortOrder;
}
