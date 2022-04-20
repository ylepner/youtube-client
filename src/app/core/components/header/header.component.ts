import { Component } from '@angular/core';
import {
  SearchVideoQuery,
  Sorting,
} from '../../../shared/models/search-query.model';
import { YoutubeService } from '../../services/youtube.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showFilters = false;
  searchQuery: SearchVideoQuery = {};

  // eslint-disable-next-line no-unused-vars
  constructor(
    private youtubeService: YoutubeService,
    private authService: AuthService) { }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  submit() {
    this.youtubeService.submitQuery(this.searchQuery.searchText || '');
  }

  sorting(event: Sorting) {
    this.youtubeService.changeSorting(event);
  }

  filtering(event: string | undefined) {
    this.youtubeService.changeFiltering(event || '');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUserName() {
    return this.authService.getUserName()
  }

}
