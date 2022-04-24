/* eslint-disable no-unused-vars */
import { Component, Input } from '@angular/core';
import { Statistics, VideoResultItem } from '../../../shared/models/search-item.model';
import { getDaysOfPublished, getColorOfItem } from '../../services/utils';

export interface CardView {
  img: string;
  statistics?: Statistics;
  title: string;
  id: string;
  publishedAt: string;
}

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  stripeClass: string = '';

  private _item?: VideoResultItem;
  public get item() {
    return this._item;
  }


  @Input()
  public set item(value: VideoResultItem | undefined) {
    this._item = value;
    if (!value) {
      return;
    }
    const days = getDaysOfPublished(value.snippet.publishedAt);
    this.stripeClass = getColorOfItem(this._item);
  }
}
