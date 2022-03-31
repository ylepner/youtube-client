import { Component, EventEmitter, Output } from '@angular/core';
import { SearchVideoQuery } from '../search/search-query.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showFilters = false;
  // привязать это значение к инпуту через ngModel в две стороны
  searchQuery: SearchVideoQuery = {}

  @Output()
  querySubmitted = new EventEmitter<SearchVideoQuery>();

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  submit() {
    this.querySubmitted.next(this.searchQuery);
  }
}
