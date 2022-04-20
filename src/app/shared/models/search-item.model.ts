export interface VideoResultItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

export interface SearchResultItem {
  kind: string;
  etag: string;
  id: SearchItemId;
  snippet: Snippet;
}

export interface SearchItemId {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
  defaultLanguage?: string;
}

export interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface Localized {
  title: string;
  description: string;
}

export interface Thumbnails {
  default: ThumbnailInfo;
  medium: ThumbnailInfo;
  high: ThumbnailInfo;
  standard: ThumbnailInfo;
  maxres: ThumbnailInfo;
}

export interface ThumbnailInfo {
  url: string;
  width: number;
  height: number;
}
