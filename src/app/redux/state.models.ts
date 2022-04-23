import { CustomCard } from 'src/app/shared/models/custom-card.model';
import { VideoResultItem } from 'src/app/shared/models/search-item.model';
import { Sorting } from 'src/app/shared/models/search-query.model';

export interface State {
  apiVideos: VideoResultItem[];
  customCards: CustomCard[];
  filter: string;
  sorting?: Sorting;
}

export const defaultState: State = {
  apiVideos: [],
  customCards: [],
  filter: '',
};
