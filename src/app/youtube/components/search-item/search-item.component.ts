/* eslint-disable no-unused-vars */
import { Component, Input } from '@angular/core';
import { SearchResultItem } from '../../models/search-item.model';

enum StripeColor {
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
  Red = 'red',
}

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

    if (!value) {
      return;
    }
    const days = getDaysOfPublished(value.snippet.publishedAt);
    if (days <= 7) {
      this.stripeClass = StripeColor.Blue;
    } else if (days <= 30) {
      this.stripeClass = StripeColor.Green;
    } else if (days <= 180) {
      this.stripeClass = StripeColor.Yellow;
    } else {
      this.stripeClass = StripeColor.Red;
    }
  }
}

function getDaysOfPublished(date: string) {
  const now = new Date();
  const datePrev = new Date(date);
  const differenceInDays =
    (now.getTime() - datePrev.getTime()) / (1000 * 3600 * 24);
  return differenceInDays;
}
