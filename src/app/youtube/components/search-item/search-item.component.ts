/* eslint-disable no-unused-vars */
import { Component, Input } from '@angular/core';
import { CardView } from 'src/app/shared/models/custom-card';
import { getColorOfItem } from '../../services/utils';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  stripeClass: string = '';

  private _item?: CardView;
  public get item() {
    return this._item;
  }

  @Input()
  public set item(value: CardView | undefined) {
    this._item = value;
    if (!value) {
      return;
    }
    this.stripeClass = getColorOfItem(this._item?.publishedAt);
  }
}
