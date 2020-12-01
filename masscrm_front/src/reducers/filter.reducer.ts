import { Action, handleActions } from 'redux-actions';
import { IFilterStore } from 'src/interfaces/store';
import {
  getFiltersDataAction,
  setFilterSettingsAction,
  setListFieldAction,
  setFilterValuesAction,
  setMultiFilterValuesAction,
  setSortValuesAction,
  setSortAction
} from 'src/actions/';
import {
  initialFiltersState,
  initialMultiFilterState
} from './tableFilters.reducer';
import { initialSortingState } from './tableSorting.reducer';
import history from '../store/history';

const currentParam = new URLSearchParams(history.location.search);
const getDataByJson = (param: string) =>
  JSON.parse(currentParam.get(param) as string) || null;

const sortBy = getDataByJson('sort');
const sorting = getDataByJson('sorting');
const filter = getDataByJson('filter');

const initialState: IFilterStore = {
  data: {},
  settings: {},
  values: { ...initialFiltersState, ...filter },
  multiValues: initialMultiFilterState,
  sort: sorting || initialSortingState,
  sortBy: sortBy || {}
};

export const filterReducer = handleActions(
  {
    [`${getFiltersDataAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setFilterSettingsAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setListFieldAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      settings: { ...state.settings, listField: payload }
    }),
    [`${setFilterValuesAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      values: {
        ...state.values,
        ...payload
      }
    }),
    [`${setMultiFilterValuesAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      multiValues: {
        ...state.multiValues,
        ...payload
      }
    }),
    [`${setSortValuesAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      sort: {
        ...state.sort,
        ...payload
      }
    }),
    [`${setSortAction}`]: (state: IFilterStore, { payload }: Action<any>) => ({
      ...state,
      sortBy: { ...payload }
    })
  },
  initialState
);
