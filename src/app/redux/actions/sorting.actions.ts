import { createAction, props } from "@ngrx/store";
import { SortingType, SortOrder } from "src/app/shared/models/constants";

export const sortVideos = createAction(
  '[Sorting] Sort Videos',
  props<{ sorting: SortingType }>()
);
