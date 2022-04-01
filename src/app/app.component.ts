import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResultList } from './search/search-response.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'youtube-client';
}
