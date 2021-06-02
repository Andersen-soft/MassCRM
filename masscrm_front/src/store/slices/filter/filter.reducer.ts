import { Action, handleActions } from 'redux-actions';
import history from 'src/utils/history';
import { IFilterStore } from 'src/interfaces';
import {
  initialFiltersState,
  initialMultiFilterState,
  initialSortingState,
  initialUsersFilterState
} from 'src/constants';
import { urlDeserialize } from 'src/utils';
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
  setSelectedMyContactsAction,
  setSelectedReportContactsAction
} from '.';

const currentParam = new URLSearchParams(history.location.search);

const getDataByJson = (param: string) =>
  JSON.parse(currentParam.get(param) as string) || null;

const sortBy = getDataByJson('sort');
const sorting = getDataByJson('sorting');

const filter =
  currentParam.get('filter') && urlDeserialize(currentParam.get('filter'));

// setting 'empty' values (according to the initial type of filter), if some of the default filters are removed
const getUpdatedFilter = () => {
  let finalFilter = { ...filter };

  Object.keys(initialFiltersState).forEach(key => {
    if (!filter?.[key]) {
      if (
        typeof initialFiltersState[key] === 'string' &&
        initialFiltersState[key]
      ) {
        finalFilter = { ...finalFilter, [key]: '' };
      } else if (
        Array.isArray(initialFiltersState[key]) &&
        (initialFiltersState[key] as string[]).length
      ) {
        finalFilter = { ...finalFilter, [key]: [] };
      }
    }
  });
  return finalFilter;
};

type S = IFilterStore;

const initialState: IFilterStore = {
  data: {},
  settings: {},
  usersSettings: {},
  values: { ...initialFiltersState, ...(!filter || getUpdatedFilter()) },
  multiValues: initialMultiFilterState,
  usersValues: initialUsersFilterState,
  sort: sorting || initialSortingState,
  sortBy: sortBy || {},
  selectedAllContacts: [],
  selectedAddContacts: [],
  selectedMyContacts: [],
  selectedBlacklistContacts: [],
  selectedReportContacts: []
};

export const filterReducer = handleActions(
  {
    [`${getFiltersDataAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setFilterSettingsAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setUsersFilterSettingsAction}`]: (state: S, { payload }): S => ({
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
    }),
    [`${setSelectedReportContactsAction}`]: (
      state: IFilterStore,
      { payload }: Action<any>
    ) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
