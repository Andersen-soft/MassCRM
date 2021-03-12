import { handleActions } from 'redux-actions';
import history from 'src/utils/history';
import {
  getBlacklistAction,
  setBlacklistFilterSettingsAction,
  setBlacklistFilterValuesAction,
  setFiltersUseAction,
  setShowCountAction
} from '../actions/blacklist.action';
import { IBlacklistStore } from '../interfaces';

const initBlacklistFiltersState = {
  blacklist: '',
  user: '',
  date: []
};

const currentParam = new URLSearchParams(history.location.search);

const getDataByJson = (param: string) =>
  JSON.parse(currentParam.get(param) as string) || null;

const filter = getDataByJson('filter');

const initialState: IBlacklistStore = {
  isFiltersUse: false,
  data: [],
  filterValues: { ...initBlacklistFiltersState, ...filter },
  filterSettings: {},
  showCount: 5
};

export const blacklistReducer = handleActions(
  {
    [`${getBlacklistAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setBlacklistFilterSettingsAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setFiltersUseAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setShowCountAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setBlacklistFilterValuesAction}`]: (state, { payload }) => ({
      ...state,
      filterValues: {
        ...state.filterValues,
        ...payload
      }
    })
  },
  initialState
);
