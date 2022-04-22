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
import { selectFilter, selectFilteredVideos } from 'src/app/redux/selectors/youtube.selectors';
import { filterVideos } from 'src/app/redux/actions/filtering.actions';

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

  sorting(event: Sorting) {
    this.youtubeService.changeSorting(event);
  }

  filtering(event: string | undefined) {
    this.store.dispatch(filterVideos({ filter: event?.toLocaleLowerCase() || '' }))
  }

  goToAdmin() {
    this.router.navigate(['admin']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}
