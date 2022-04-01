import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Field, Sorting } from '../search/search-query.model';

@Component({
  selector: 'app-filtering-block',
  templateUrl: './filtering-block.component.html',
  styleUrls: ['./filtering-block.component.scss']
})
export class FilteringBlockComponent {

  sorting?: Sorting;

  @Output()
  sortingChange = new EventEmitter<Sorting>();

  sortByDate() {
    this.updateSorting('date');
  }

  sortByViews() {
    this.updateSorting('viewsCount');
  }

  updateSorting(field: Field) {
    if (!this.sorting) {
      this.setSorting({ field: field, type: 'asc' });
    }
    else if (field !== this.sorting.field) {
      this.setSorting({ field: field, type: 'asc' })
    }
    else {
      this.setSorting({ field: field, type: this.sorting.type === 'asc' ? 'desc' : 'asc' })
    }
  }

  setSorting(sorting: Sorting) {
    this.sorting = sorting;
    this.sortingChange.next(sorting);
  }
}
