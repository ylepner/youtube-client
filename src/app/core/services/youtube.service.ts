import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { SortingType, SortOrder } from 'src/app/shared/models/constants';
import { VideoResultItem } from 'src/app/shared/models/search-item.model';
import { Sorting } from 'src/app/shared/models/search-query.model';
import {
  SearchResultList,
  VideoList,
} from 'src/app/shared/models/search-response.model';

const URL_API_SEARCH = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=15`;
const URL_API_VIDEO = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics`;

const TIME = 1000;
@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private readonly searchText$ = new Subject<string>();
  private readonly items$ = this.searchText$.pipe(
    filter((text) => text.length > 2),
    debounceTime(TIME),
    distinctUntilChanged(),
    switchMap((text) =>
      this.httpClient.get<SearchResultList>(`${URL_API_SEARCH}&q=${text}`)
    ),
    switchMap((searchResult) => {
      return this.httpClient.get<VideoList>(
        `${URL_API_VIDEO}&id=${searchResult.items
          .map((item) => item.id.videoId)
          .join(',')}`
      );
    }),
    map((result) => result.items)
  );
  private readonly sorting$ = new BehaviorSubject<Sorting | undefined>(
    undefined
  );
  private readonly filter$ = new BehaviorSubject<string>('');

  readonly itemsResult$ = combineLatest([
    this.items$,
    this.sorting$,
    this.filter$,
  ]).pipe(
    map(([items, sorting, filtering]) => {
      if (sorting) {
        items = sortBy(items, sorting);
      }
      items = filterVideoResult(items, filtering);
      return items;
    })
  );

  // eslint-disable-next-line no-unused-vars
  constructor(private httpClient: HttpClient) { }

  submitQuery(text: string) {
    this.searchText$.next(text);
  }

  changeSorting(sorting: Sorting) {
    this.sorting$.next(sorting);
  }

  changeFiltering(filtering: string) {
    this.filter$.next(filtering);
  }

  getAllItems() {
    return this.httpClient
      .get<VideoList>(URL_API_SEARCH)
      .pipe(map((result) => result.items));
  }

  getById(id: string): Observable<VideoResultItem | undefined> {
    return this.httpClient
      .get<VideoList>(`${URL_API_VIDEO}&id=${id}`)
      .pipe(map((list) => list.items[0]));
  }

  loadVideos(text: string): Observable<VideoResultItem[]> {
    return this.httpClient
      .get<SearchResultList>(`${URL_API_SEARCH}&q=${text}`)
      .pipe(
        switchMap((videoResult) => {
          return this.httpClient.get<VideoList>(
            `${URL_API_VIDEO}&id=${videoResult.items
              .map((item) => item.id.videoId)
              .join(',')}`
          );
        }),
        map((videoList) => videoList.items)
      );
  }
}

function compareByDateAsc(a: VideoResultItem, b: VideoResultItem) {
  const dateA = new Date(a.snippet.publishedAt);
  const dateB = new Date(b.snippet.publishedAt);
  return dateA.getTime() - dateB.getTime();
}

function compareByDateDesc(a: VideoResultItem, b: VideoResultItem) {
  return compareByDateAsc(b, a);
}

function sortBy(items: VideoResultItem[], sorting: Sorting) {
  const newItems = [...items];
  const { field, sortOrder } = sorting;
  if (field === SortingType.Date && sortOrder === SortOrder.Asc) {
    return newItems.sort(compareByDateAsc);
  }
  if (field === SortingType.Date && sortOrder === SortOrder.Desc) {
    return newItems.sort(compareByDateDesc);
  }
  if (field === SortingType.ViewsCount && sortOrder === SortOrder.Asc) {
    return newItems.sort(
      (a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount)
    );
  }
  return newItems.sort(
    (a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
  );
}

function filterVideoResult(
  items: VideoResultItem[],
  filter: string
): VideoResultItem[] {
  if (!filter) {
    return items;
  }
  items = items.filter((el) => {
    if (el.snippet.title.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    }
    return false;
  });
  return items;
}
