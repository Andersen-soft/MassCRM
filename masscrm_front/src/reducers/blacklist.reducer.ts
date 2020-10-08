import { handleActions } from 'redux-actions';
import {
  getBlacklistAction,
  setBlacklistFilterAction,
  setFiltersUseAction,
  setErrorsAction,
  setShowCountAction
} from '../actions/blacklist.action';
import { IBlacklistStore } from '../interfaces';

const initialState: IBlacklistStore = {
  isFiltersUse: false,
  data: [],
  blacklistFilter: {
    blacklist: '',
    user: '',
    date: []
  },
  showCount: 5,
  errors: []
};

export const blacklistReducer = handleActions(
  {
    [`${getBlacklistAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setBlacklistFilterAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setFiltersUseAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setErrorsAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setShowCountAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
