import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { SortingType, SortOrder } from 'src/app/shared/models/constants';
import { SearchResultItem } from 'src/app/shared/models/search-item.model';
import { Sorting } from 'src/app/shared/models/search-query.model';
import { SearchResultList } from 'src/app/shared/models/search-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  items$ = this.youtubeService.itemsResult$;
  // eslint-disable-next-line no-unused-vars
  constructor(private youtubeService: YoutubeService) {
  }

}
