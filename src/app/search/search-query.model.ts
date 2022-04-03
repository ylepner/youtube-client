import { SortOrder } from "./common/constants";

export interface SearchVideoQuery {
  searchText?: string;
}

//export type Sorting = 'date' | 'viewsCount';
export interface Sorting {
  field: Field;
  sortOrder: SortOrder;
}
export type Field = 'date' | 'viewsCount';
