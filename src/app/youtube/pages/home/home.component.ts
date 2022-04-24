/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilteredVideos } from 'src/app/redux/selectors/youtube.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  items$ = this.store.select(selectFilteredVideos);
  constructor(private store: Store) { }
}
