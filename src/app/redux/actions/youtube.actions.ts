import { createAction, props } from '@ngrx/store';
import { CustomCard } from 'src/app/shared/models/custom-card.model';
import { VideoResultItem } from 'src/app/shared/models/search-item.model';

export const loadVideos = createAction(
  '[Youtube] Load Videos',
  props<{ query: string }>()
);

export const loadVideosSuccess = createAction(
  '[Youtube] Load Success',
  props<{ videos: VideoResultItem[] }>()
);

export const addCustomCard = createAction(
  '[CustomCard] Add Card',
  props<{
    card: CustomCard;
  }>()
);

export const addAllCustomCards = createAction(
  '[CustomCard] Add All Cards',
  props<{ cards: CustomCard[] }>()
)
