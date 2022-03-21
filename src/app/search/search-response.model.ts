import { Item } from "./search-item.model";

export interface SearchResultList {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item[];
}
export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
