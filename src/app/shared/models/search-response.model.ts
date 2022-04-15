import { SearchResultItem, VideoResultItem } from './search-item.model';

export interface VideoList {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: VideoResultItem[];
}

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
