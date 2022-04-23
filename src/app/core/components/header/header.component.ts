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
import { distinctUntilChanged, filter, Subject, debounceTime } from 'rxjs';
import { loadVideos } from 'src/app/redux/actions/youtube.actions';

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
  queryText$ = new Subject<string>();

  filter$ = this.store.select(selectFilter);
  sorting$ = this.store.select(selectSorting);

  constructor(
    private youtubeService: YoutubeService,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.queryText$.pipe(
      filter((text) => text.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(text => {
      this.store.dispatch(loadVideos({ query: text }));
    })
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  submit() {
    this.queryText$.next(this.searchQuery.searchText || '');
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
