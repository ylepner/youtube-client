import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs";
import { YoutubeService } from "src/app/core/services/youtube.service";
import { loadVideos, loadVideosSuccess } from "../actions/youtube.actions";

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiEffects {
  constructor(private actions$: Actions, private youtubeApiService: YoutubeService) { }

  loadVideos$ = createEffect(() => this.actions$.pipe(
    ofType(loadVideos),
    switchMap(() => this.youtubeApiService.loadVideos('')),
    map((result) => loadVideosSuccess({ videos: result }))
  ))
}