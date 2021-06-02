import { handleActions } from 'redux-actions';
import { IBlacklistStore } from 'src/interfaces';

import { urlDeserialize } from 'src/utils';
import {
  setBlacklistAction,
  setBlacklistFilterSettingsAction,
  setBlacklistFilterValuesAction,
  setFiltersUseAction,
  setShowCountAction
} from '.';

type S = IBlacklistStore;

export const initBlacklistFiltersState = {
  blacklist: '',
  user: '',
  date: []
};

const paramURL = new URLSearchParams(window.location.search);
const filterParamURL = paramURL.get('filter');
const filter = filterParamURL && urlDeserialize(filterParamURL);

const initialState: S = {
  isFiltersUse: false,
  data: [],
  filterValues: { ...initBlacklistFiltersState, ...filter },
  filterSettings: {},
  showCount: 5
};

export const blacklistReducer = handleActions(
  {
    [`${setBlacklistAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setBlacklistFilterSettingsAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setFiltersUseAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setShowCountAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setBlacklistFilterValuesAction}`]: (state: S, { payload }): S => ({
      ...state,
      filterValues: {
        ...state.filterValues,
        ...payload
      }
    })
  },
  initialState
);
