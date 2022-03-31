
export interface SearchVideoQuery {
  searchText?: string;
}

//export type Sorting = 'date' | 'viewsCount';
export interface Sorting {
  field: Field;
  type: SortingType;
}
export type Field = 'date' | 'viewsCount'
export type SortingType = 'asc' | 'desc';