import { Component, EventEmitter, Output } from '@angular/core';
import { SearchVideoQuery, Sorting } from '../../../shared/models/search-query.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showFilters = false;
  searchQuery: SearchVideoQuery = {};

  @Output()
  querySubmitted = new EventEmitter<SearchVideoQuery>();

  @Output()
  sortingChange = new EventEmitter<Sorting>();

  @Output()
  filteringChange = new EventEmitter<string | undefined>();

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  submit() {
    this.querySubmitted.next(this.searchQuery);
  }

  sorting(event: Sorting) {
    this.sortingChange.next(event);
  }

  filtering(event: string | undefined) {
    this.filteringChange.next(event);
  }
}
