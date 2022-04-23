import { createReducer, on } from '@ngrx/store';
import { SortOrder } from 'src/app/shared/models/constants';
import { CustomCard } from 'src/app/shared/models/custom-card.model';
import { VideoResultItem } from 'src/app/shared/models/search-item.model';
import { Sorting } from 'src/app/shared/models/search-query.model';
import { filterVideos } from '../actions/filtering.actions';
import { sortVideos } from '../actions/sorting.actions';
import { addCustomCard, loadVideosSuccess } from '../actions/youtube.actions';

export interface State {
  apiVideos: VideoResultItem[];
  customCards: CustomCard[];
  filter: string;
  sorting?: Sorting;
}

const defaultState: State = {
  apiVideos: [],
  customCards: [],
  filter: '',
};

export const reducer = createReducer(
  defaultState,
  on(loadVideosSuccess, (state, action): State => {
    return { ...state, apiVideos: action.videos };
  }),
  on(filterVideos, (state, action): State => {
    return { ...state, filter: action.filter };
  }),
  on(sortVideos, (state, action) => {
    let oldSorting = state.sorting;
    let newSorting: Sorting;
    if (!oldSorting || action.sorting !== oldSorting.field) {
      newSorting = {
        field: action.sorting,
        sortOrder: SortOrder.Asc,
      };
    } else {
      newSorting = {
        field: action.sorting,
        sortOrder: toggleSort(oldSorting.sortOrder),
      };
    }
    return { ...state, sorting: newSorting };
  }),
  on(addCustomCard, (state, action): State => {
    return { ...state, customCards: [...state.customCards, action.card] };
  })
);

function toggleSort(order: SortOrder) {
  if (order === SortOrder.Asc) {
    return SortOrder.Desc;
  }
  return SortOrder.Asc;
}
