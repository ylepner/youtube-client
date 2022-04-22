/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import {
  SearchVideoQuery,
  Sorting,
} from '../../../shared/models/search-query.model';
import { YoutubeService } from '../../services/youtube.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectFilter, selectFilteredVideos, selectSortedVideos, selectSorting } from 'src/app/redux/selectors/youtube.selectors';
import { filterVideos } from 'src/app/redux/actions/filtering.actions';
import { sortVideos } from 'src/app/redux/actions/sorting.actions';
import { SortingType } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showFilters = false;
  searchQuery: SearchVideoQuery = {};

  isLoggedIn$ = this.authService.isLoggedIn$;
  getUserName$ = this.authService.getUserName$;


  filter$ = this.store.select(selectFilter);
  sorting$ = this.store.select(selectSorting);

  constructor(
    private youtubeService: YoutubeService,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) { }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  submit() {
    this.youtubeService.submitQuery(this.searchQuery.searchText || '');
  }

  sorting(event: SortingType) {
    this.store.dispatch(sortVideos({ sorting: event }));
  }

  filtering(event: string | undefined) {
    this.store.dispatch(filterVideos({ filter: event || '' }))
  }

  goToAdmin() {
    this.router.navigate(['admin']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}
