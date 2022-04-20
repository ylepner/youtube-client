/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import {
  SearchVideoQuery,
  Sorting,
} from '../../../shared/models/search-query.model';
import { YoutubeService } from '../../services/youtube.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private youtubeService: YoutubeService,
    private authService: AuthService,
    private router: Router
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
    this.youtubeService.changeFiltering(event || '');
  }

  goToAdmin() {
    this.router.navigate(['admin']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}
