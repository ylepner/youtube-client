import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SortingType, SortOrder } from 'src/app/shared/models/constants';
import { CardView } from 'src/app/shared/models/custom-card';
import { CustomCard } from 'src/app/shared/models/custom-card.model';
import { VideoResultItem } from 'src/app/shared/models/search-item.model';
import { Sorting } from 'src/app/shared/models/search-query.model';
import { State } from '../state.models';

const selectState = createFeatureSelector<State>('youtube');
export const selectFilter = createSelector(
  selectState,
  (state) => state.filter
);
export const selectSorting = createSelector(
  selectState,
  (state) => state.sorting
);
export const selectApiVideos = createSelector(
  selectState,
  (state) => state.apiVideos
);

export const selectCustomCards = createSelector(
  selectState,
  (state) => state.customCards
);

const selectCardItems = createSelector(selectApiVideos, (apiVideos) =>
  apiVideos.map(transformVideoItemToCardItem)
);

const selectCustomCardsItems = createSelector(
  selectCustomCards,
  (customCards) => customCards.map(transformCardItem)
);

export const selectSortedVideos = createSelector(
  selectCardItems,
  selectCustomCardsItems,
  selectSorting,
  (apiVideos, customCards, sorting) => {
    const allVideos = [...apiVideos, ...customCards];
    return sorting ? sortBy(allVideos, sorting) : allVideos;
  }
);
export const selectFilteredVideos = createSelector(
  selectSortedVideos,
  selectFilter,
  (videos, filter) => {
    return videos.filter((video) =>
      video.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  }
);

function compareByDateAsc(a: CardView, b: CardView) {
  const dateA = new Date(a.publishedAt);
  const dateB = new Date(b.publishedAt);
  return dateA.getTime() - dateB.getTime();
}

function compareByDateDesc(a: CardView, b: CardView) {
  return compareByDateAsc(b, a);
}

function sortBy(items: CardView[], sorting: Sorting) {
  const newItems = [...items];
  const { field, sortOrder } = sorting;
  if (field === SortingType.Date && sortOrder === SortOrder.Asc) {
    return newItems.sort(compareByDateAsc);
  }
  if (field === SortingType.Date && sortOrder === SortOrder.Desc) {
    return newItems.sort(compareByDateDesc);
  }
  if (field === SortingType.ViewsCount && sortOrder === SortOrder.Asc) {
    return newItems.sort(
      (a, b) =>
        toNumber(a.statistics?.viewCount) - toNumber(b.statistics?.viewCount)
    );
  }
  return newItems.sort(
    (a, b) =>
      toNumber(b.statistics?.viewCount) - toNumber(a.statistics?.viewCount)
  );
}

function transformVideoItemToCardItem(videoItem: VideoResultItem): CardView {
  return {
    id: videoItem.id,
    img: videoItem.snippet.thumbnails.high.url,
    publishedAt: videoItem.snippet.publishedAt,
    title: videoItem.snippet.title,
    statistics: videoItem.statistics,
    isCustom: false,
  };
}

function transformCardItem(card: CustomCard): CardView {
  return {
    id: '',
    img: card.img,
    publishedAt: card.creationDate,
    title: card.title,
    isCustom: true,
  };
}

function toNumber(data: string | undefined) {
  const number = Number(data);
  if (isNaN(number)) {
    return 0;
  }
  return number;
}
