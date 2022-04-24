/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, tap } from 'rxjs';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { addAllCustomCards, loadVideos, loadVideosSuccess } from '../actions/youtube.actions';
import { selectCustomCards } from '../selectors/youtube.selectors';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiEffects {
  constructor(
    private actions$: Actions,
    private youtubeApiService: YoutubeService,
    private store: Store
  ) {
    const customCardsFromLocalStorage = localStorage.getItem('cards')
    if (customCardsFromLocalStorage) {
      const customCads = JSON.parse(customCardsFromLocalStorage);
      this.store.dispatch(addAllCustomCards({ cards: customCads }))
    }
  }

  loadVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadVideos),
      switchMap((action) => this.youtubeApiService.loadVideos(action.query)),
      map((result) => loadVideosSuccess({ videos: result }))
    );
  });

  saveCustomCards$ = createEffect(() => {
    return this.store.select(selectCustomCards).pipe(
      tap((customCards) => {
        localStorage.setItem('cards', JSON.stringify(customCards))
      })
    )
  }, {
    dispatch: false
  })
}
