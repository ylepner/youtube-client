import { Component, Input } from '@angular/core';
import { SearchResultItem } from '../search-item.model';
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
      this.stripeClass = 'blue';
    } else if (days <= 30) {
      this.stripeClass = 'green';
    } else if (days <= 180) {
      this.stripeClass = 'yellow';
    } else {
      this.stripeClass = 'red';
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
