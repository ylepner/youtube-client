import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../reducers/youtube.reducer";

const selectState = createFeatureSelector<State>('youtube');
export const selectFilter = createSelector(selectState, state => state.filter);
export const selectApiVideos = createSelector(selectState, state => state.apiVideos);
export const selectFilteredVideos = createSelector(selectApiVideos, selectFilter, (videos, filter) => {
  return videos.filter((video) => video.snippet.title.toLowerCase().includes(filter))
})
const selectCustomCards = createSelector(selectState, state => state.customCards);
const selectAllVideos = createSelector(selectApiVideos, selectCustomCards, (a, b) => {

})


