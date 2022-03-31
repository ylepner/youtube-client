import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SearchVideoQuery } from 'src/app/search/search-query.model';
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

}
