import { createAction, props } from "@ngrx/store";
import { VideoResultItem } from "src/app/shared/models/search-item.model";

export const loadVideos = createAction(
  '[Youtube] Load Videos'
);

export const loadVideosSuccess = createAction(
  '[Youtube] Load Success',
  props<{ videos: VideoResultItem[] }>()
);