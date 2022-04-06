import { Component, EventEmitter, Output } from '@angular/core';
import { SearchVideoQuery, Sorting } from '../../../shared/models/search-query.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showFilters = false;
  searchQuery: SearchVideoQuery = {};

  constructor(private youtubeService: YoutubeService) {

  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  submit() {
    this.youtubeService.submitQuery(this.searchQuery.searchText || '')
  }

  sorting(event: Sorting) {
    this.youtubeService.changeSorting(event)
  }

  filtering(event: string | undefined) {
    this.youtubeService.changeFiltering(event || '');
  }
}
