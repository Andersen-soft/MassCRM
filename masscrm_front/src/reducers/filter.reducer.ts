import { Action, handleActions } from 'redux-actions';
import { IFilterStore } from 'src/interfaces/store';
import {
  getFiltersDataAction,
  setFilterSettingsAction,
  setUsersFilterSettingsAction,
  setListFieldAction,
  setFilterValuesAction,
  setUsersFilterValuesAction,
  setMultiFilterValuesAction,
  setSortValuesAction,
  setSortAction,
  setSelectedBlacklistContactsAction,
  setSelectedAllContactsAction,
  setSelectedAddContactsAction,
  setSelectedMyContactsAction
} from 'src/actions/';
import {
  initialFiltersState,
  initialMultiFilterState,
  initialUsersFilterState
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
  usersSettings: {},
  values: { ...initialFiltersState, ...filter },
  multiValues: initialMultiFilterState,
  usersValues: initialUsersFilterState,
  sort: sorting || initialSortingState,
  sortBy: sortBy || {},
  selectedAllContacts: [],
  selectedAddContacts: [],
  selectedMyContacts: [],
  selectedBlacklistContacts: []
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
    [`${setUsersFilterSettingsAction}`]: (state, { payload }) => ({
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
    [`${setUsersFilterValuesAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      usersValues: {
        ...state.usersValues,
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
    }),
    [`${setSelectedAllContactsAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      ...payload
    }),
    [`${setSelectedBlacklistContactsAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      ...payload
    }),
    [`${setSelectedMyContactsAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      ...payload
    }),
    [`${setSelectedAddContactsAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
