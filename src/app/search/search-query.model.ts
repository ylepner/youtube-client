export interface SearchVideoQuery {
  searchText?: string;
}

//export type Sorting = 'date' | 'viewsCount';
export interface Sorting {
  field: Field;
  sortOrder: SortingType;
}
export type Field = 'date' | 'viewsCount';
export type SortingType = 'asc' | 'desc';
