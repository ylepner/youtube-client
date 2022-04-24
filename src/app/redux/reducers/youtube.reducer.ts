import { createReducer, on } from '@ngrx/store';
import { SortOrder } from 'src/app/shared/models/constants';
import { filterVideos } from '../actions/filtering.actions';
import { sortVideos } from '../actions/sorting.actions';
import {
  addAllCustomCards as loadAllCustomCards,
  addCustomCard,
  loadVideosSuccess,
} from '../actions/youtube.actions';
import { defaultState, State } from '../state.models';

export const reducer = createReducer(
  defaultState,
  on(loadVideosSuccess, (state, action): State => {
    return { ...state, apiVideos: action.videos };
  }),
  on(filterVideos, (state, action): State => {
    return { ...state, filter: action.filter };
  }),
  on(sortVideos, (state, action) => {
    const oldSorting = state.sorting;
    const field = action.sorting;
    const sortOrder =
      !oldSorting || field !== oldSorting.field
        ? SortOrder.Asc
        : toggleSort(oldSorting.sortOrder);
    return {
      ...state,
      sorting: {
        field,
        sortOrder,
      },
    };
  }),
  on(addCustomCard, (state, action): State => {
    return { ...state, customCards: [...state.customCards, action.card] };
  }),
  on(loadAllCustomCards, (state, action): State => {
    return { ...state, customCards: action.cards };
  })
);

function toggleSort(order: SortOrder) {
  return order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
}
