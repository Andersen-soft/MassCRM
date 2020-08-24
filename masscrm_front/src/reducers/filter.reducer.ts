import { Action, handleActions } from 'redux-actions';
import { IFilterStore } from 'src/interfaces/store';
import {
  getFiltersDataAction,
  setFilterSettingsAction,
  setListFieldAction,
  setFilterValuesAction,
  setSortValuesAction,
  setSortAction
} from 'src/actions/';
import { initialFiltersState } from './tableFilters.reducer';
import { initialSortingState } from './tableSorting.reducer';

const initialState: IFilterStore = {
  data: {},
  settings: {},
  values: initialFiltersState,
  sort: initialSortingState
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
    ) => {
      const list = state.settings?.listField || [];
      const listField: Array<string> = list.includes(payload)
        ? list?.filter(element => payload !== element)
        : [...list, payload];
      return {
        ...state,
        settings: { ...state.settings, listField }
      };
    },
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
