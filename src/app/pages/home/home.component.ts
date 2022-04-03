import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SortOrder } from 'src/app/search/common/constants';
import { SearchResultItem } from 'src/app/search/search-item.model';
import { Sorting } from 'src/app/search/search-query.model';
import { SearchResultList } from 'src/app/search/search-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  result?: SearchResultList;

  items?: SearchResultItem[];
  // eslint-disable-next-line no-unused-vars
  constructor(private httpClient: HttpClient) { }

  querySubmitted() {
    this.httpClient
      .get<SearchResultList>('assets/data/data.json')
      .subscribe((r) => {
        this.result = r;
        this.items = this.result.items;
      });
  }

  sortingChange(event: Sorting) {
    if (event.field === 'date' && event.sortOrder === SortOrder.Asc) {
      this.items?.sort(compareByDateAsc);
    } else if (event.field === 'date' && event.sortOrder === SortOrder.Desc) {
      this.items?.sort(compareByDateDesc);
    } else if (event.field === 'viewsCount' && event.sortOrder === SortOrder.Asc) {
      this.items?.sort(
        (a, b) =>
          Number(a.statistics.viewCount) - Number(b.statistics.viewCount)
      );
    } else {
      this.items?.sort(
        (a, b) =>
          Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
      );
    }
  }

  filteringChange(event: string | undefined) {
    if (!event) {
      this.items = this.result?.items;
      return;
    }
    this.items = this.result?.items.filter((el) => {
      if (el.snippet.title.toLowerCase().includes(event.toLowerCase())) {
        return true;
      }
      return false;
    });
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
