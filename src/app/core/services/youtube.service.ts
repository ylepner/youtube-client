import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Subject, switchMap } from 'rxjs';
import { SortingType, SortOrder } from 'src/app/shared/models/constants';
import { SearchResultItem } from 'src/app/shared/models/search-item.model';
import { Sorting } from 'src/app/shared/models/search-query.model';
import { SearchResultList } from 'src/app/shared/models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private readonly searchText$ = new Subject<string>();
  private readonly items$ = this.searchText$.pipe(
    switchMap((text) =>
      this.httpClient.get<SearchResultList>(
        `assets/data/data.json?query=${text}`
      )
    ),
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
      items = filter(items, filtering);
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
      .get<SearchResultList>(`assets/data/data.json`)
      .pipe(map((result) => result.items));
  }

  getById(id: string) {
    return this.getAllItems().pipe(
      map((items) => items.find((item) => item.id === id))
    );
  }
}

function compareByDateAsc(a: SearchResultItem, b: SearchResultItem) {
  const dateA = new Date(a.snippet.publishedAt);
  const dateB = new Date(b.snippet.publishedAt);
  return dateA.getTime() - dateB.getTime();
}

function compareByDateDesc(a: SearchResultItem, b: SearchResultItem) {
  return compareByDateAsc(b, a);
}

function sortBy(items: SearchResultItem[], sorting: Sorting) {
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

function filter(items: SearchResultItem[], filter: string): SearchResultItem[] {
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
