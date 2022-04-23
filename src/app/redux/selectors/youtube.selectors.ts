import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SortingType, SortOrder } from 'src/app/shared/models/constants';
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
export const selectSortedVideos = createSelector(
  selectApiVideos,
  selectSorting,
  (videos, sorting) => {
    if (!sorting) {
      return videos;
    }
    videos = [...videos];
    return sortBy(videos, sorting);
  }
);
export const selectFilteredVideos = createSelector(
  selectSortedVideos,
  selectFilter,
  (videos, filter) => {
    return videos.filter((video) =>
      video.snippet.title
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase())
    );
  }
);

function compareByDateAsc(a: VideoResultItem, b: VideoResultItem) {
  const dateA = new Date(a.snippet.publishedAt);
  const dateB = new Date(b.snippet.publishedAt);
  return dateA.getTime() - dateB.getTime();
}

function compareByDateDesc(a: VideoResultItem, b: VideoResultItem) {
  return compareByDateAsc(b, a);
}

function sortBy(items: VideoResultItem[], sorting: Sorting) {
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
      (a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount)
    );
  }
  return newItems.sort(
    (a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
  );
}
