import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../reducers/youtube.reducer";

const selectState = createFeatureSelector<State>('youtube');
export const selectApiVideos = createSelector(selectState, state => state.apiVideos);
const selectCustomCards = createSelector(selectState, state => state.customCards);
const selectAllVideos = createSelector(selectApiVideos, selectCustomCards, (a, b) => {

})

