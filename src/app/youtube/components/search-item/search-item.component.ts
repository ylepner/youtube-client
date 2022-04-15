/* eslint-disable no-unused-vars */
import { Component, Input } from '@angular/core';
import { SearchResultItem } from '../../../shared/models/search-item.model';
import { getDaysOfPublished, getColorOfItem } from '../../services/utils';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  stripeClass: string = '';

  private _item?: SearchResultItem;
  public get item() {
    return this._item;
  }

  @Input()
  public set item(value: SearchResultItem | undefined) {
    this._item = value;
    console.log(this._item)

    if (!value) {
      return;
    }
    const days = getDaysOfPublished(value.snippet.publishedAt);
    this.stripeClass = getColorOfItem(this._item);
  }
}
