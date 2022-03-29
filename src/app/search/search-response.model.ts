import { SearchResultItem } from "./search-item.model";

export interface SearchResultList {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: SearchResultItem[];
}
export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
