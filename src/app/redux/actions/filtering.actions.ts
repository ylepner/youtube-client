import { createAction, props } from "@ngrx/store";

export const filterVideos = createAction(
  '[Filtering] Filter Videos',
  props<{ filter: string }>()
);
