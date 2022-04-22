import { createAction, createReducer, on, props } from '@ngrx/store';
import { CustomCard } from 'src/app/shared/models/custom-card.model';
import { VideoResultItem } from 'src/app/shared/models/search-item.model';
import { filterVideos } from '../actions/filtering.actions';
import { loadVideosSuccess } from '../actions/youtube.actions';

export interface State {
  apiVideos: VideoResultItem[];
  customCards: CustomCard[];
  filter: string;
}

const defaultState: State = {
  apiVideos: [],
  customCards: [],
  filter: ''
}

export const reducer = createReducer(defaultState, on(loadVideosSuccess, (state, action) => {
  return { ...state, apiVideos: action.videos };
}), on(filterVideos, (state, action) => {
  return { ...state, filter: action.filter }
}))

