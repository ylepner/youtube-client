/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { loadVideos } from 'src/app/redux/actions/youtube.actions';
import { selectApiVideos, selectFilteredVideos } from 'src/app/redux/selectors/youtube.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  items$ = this.store.select(selectFilteredVideos);
  constructor(private store: Store) {
    this.store.dispatch(loadVideos());
  }
}
