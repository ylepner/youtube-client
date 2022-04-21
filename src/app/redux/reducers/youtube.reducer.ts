import { createReducer } from '@ngrx/store';
import { CustomCard } from 'src/app/shared/models/custom-card.model';
import { VideoResultItem } from 'src/app/shared/models/search-item.model';

export interface State {
  apiVideos: VideoResultItem[];
  customCards: CustomCard[];
}

const defaultState: State = {
  apiVideos: [],
  customCards: []
}

export const reducer = createReducer(defaultState)