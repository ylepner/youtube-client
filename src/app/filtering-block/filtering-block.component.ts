import { Component, EventEmitter, Output } from '@angular/core';
import { SortingType, SortOrder } from '../search/common/constants';
import { Sorting } from '../search/search-query.model';

@Component({
  selector: 'app-filtering-block',
  templateUrl: './filtering-block.component.html',
  styleUrls: ['./filtering-block.component.scss'],
})
export class FilteringBlockComponent {
  sorting?: Sorting;
  private _filter?: string;

  public get filter() {
    return this._filter;
  }
  public set filter(value: string | undefined) {
    this._filter = value;
    this.filteringChange.next(value);
  }

  @Output()
  sortingChange = new EventEmitter<Sorting>();

  @Output()
  filteringChange = new EventEmitter<string | undefined>();

  sortByDate() {
    this.updateSorting(SortingType.Date);
  }

  sortByViews() {
    this.updateSorting(SortingType.ViewsCount);
  }

  updateSorting(field: SortingType) {
    if (!this.sorting) {
      this.setSorting({ field: field, sortOrder: SortOrder.Asc });
    } else if (field !== this.sorting.field) {
      this.setSorting({ field: field, sortOrder: SortOrder.Asc });
    } else {
      this.setSorting({
        field: field,
        sortOrder: this.sorting.sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
      });
    }
  }

  setSorting(sorting: Sorting) {
    this.sorting = sorting;
    this.sortingChange.next(sorting);
  }

  filterChange(value: string) {
    this.filteringChange.next(value);
  }
}
