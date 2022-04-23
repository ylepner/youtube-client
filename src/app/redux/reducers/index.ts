/* eslint-disable no-undef */
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { State as YoutubeState } from '../state.models';
import { storeFreeze } from 'ngrx-store-freeze';
import { isDevMode } from '@angular/core';
import * as fromYoutube from './youtube.reducer';
export interface State {
  youtube: YoutubeState;
}
export const reducers: ActionReducerMap<State> = {
  youtube: fromYoutube.reducer,
};
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}
export const metaReducers: MetaReducer<State>[] = isDevMode()
  ? [logger, storeFreeze]
  : [];
