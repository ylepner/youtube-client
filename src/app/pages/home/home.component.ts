import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SearchResultItem } from 'src/app/search/search-item.model';
import { SearchVideoQuery, Sorting } from 'src/app/search/search-query.model';
import { SearchResultList } from 'src/app/search/search-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  result?: SearchResultList;

  constructor(private httpClient: HttpClient) {
  }

  querySubmitted(event: SearchVideoQuery) {
    this.httpClient.get<SearchResultList>('assets/data/data.json').subscribe(r => {
      this.result = r;
    })
  }

  sortingChange(event: Sorting) {

    if (event.field === 'date' && event.type === 'asc') {
      this.result?.items.sort(compareByDateAsc);
    }
    else if (event.field === 'date' && event.type === 'desc') {
      this.result?.items.sort(compareByDateDesc);
    }
    else if (event.field === 'viewsCount' && event.type === 'asc') {
      this.result?.items.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
    }
    else {
      this.result?.items.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
    }
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

