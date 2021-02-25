import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import qs from 'qs';
import { deleteEmptyFields } from 'src/utils/form/objectHelpers';
import history from 'src/store/history';
import { store } from 'src/store/configureStore';
import { FiltersTypes, IBlacklistSearch, IStoreState } from 'src/interfaces';
import HTTP from '../utils/http';
import { setNotification } from './notification.action';
import { setAutocompleteAction } from '.';

export const getBlacklistAction = createAction('GET_BLACKLIST');
export const setBlacklistFilterSettingsAction = createAction(
  'SET_BLACKLIST_FILTER_SETTINGS'
);
export const setFiltersUseAction = createAction('SET_FILTER_USE');
export const setShowCountAction = createAction('SET_SHOW_COUNT');
export const setBlacklistFilterValuesAction = createAction(
  'SET_BLACKLIST_FILTER_VALUES'
);

export const addToBlacklist = async (list: string[]) => {
  const listArray = list.filter(item => !!item);
  try {
    return await HTTP.post('/blacklists', { domains: listArray });
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export const getBlacklist = (filter?: IBlacklistSearch) => async (
  dispatch: Dispatch
) => {
  const {
    data,
    meta: { total, per_page }
  } = await HTTP.get(`blacklists`, {
    params: filter,
    paramsSerializer(params: IBlacklistSearch) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
  dispatch(getBlacklistAction({ data, total, per_page }));
};

export const getAutocompleteBlacklist = async (filter: IBlacklistSearch) => {
  try {
    store.dispatch(setAutocompleteAction({ isPending: true }));
    return await HTTP.get(`blacklists`, {
      params: filter,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
  } catch (error) {
    store.dispatch(setAutocompleteAction({ isPending: false }));
    throw new Error(JSON.stringify(error.data));
  } finally {
    store.dispatch(setAutocompleteAction({ isPending: false }));
  }
};

export const deleteBlacklistItem = async (ids: number[]) => {
  await HTTP.post('blacklists/delete', { ids });
};

export const setBlacklistFilterSettings = (
  filterSettings: IBlacklistSearch
) => (dispatch: Dispatch) => {
  dispatch(setBlacklistFilterSettingsAction({ filterSettings }));
};

export const setBlacklistFilterValues = (obj?: FiltersTypes) => (
  dispatch: Dispatch,
  state: () => IStoreState
) => {
  const {
    blacklist: { filterValues: values }
  } = state();

  const initialStateValue = values && deleteEmptyFields(values);
  const currentParam = new URLSearchParams(history.location.search);

  const currentValues =
    obj ||
    JSON.parse(currentParam.get('filter') as string) ||
    initialStateValue;

  if (obj && !!Object.keys(obj).length) {
    currentParam.set(
      'filter',
      JSON.stringify(
        deleteEmptyFields({
          ...JSON.parse(currentParam.get('filter') as string),
          ...currentValues
        })
      )
    );
  } else {
    currentParam.set('filter', JSON.stringify(currentValues));
  }
  history.push({
    search: currentParam.toString()
  });

  dispatch(setBlacklistFilterValuesAction(currentValues));
};

export const setFiltersUse = (value: boolean) => (dispatch: Dispatch) => {
  dispatch(setFiltersUseAction({ isFiltersUse: value }));
};

export const startExport = async (filter: IBlacklistSearch) => {
  try {
    await HTTP.get('blacklists/export', {
      params: filter,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
  } catch (error) {
    setNotification(error);
  }
};

export const setShowCount = (showCount: number) => async (
  dispatch: Dispatch
) => {
  await dispatch(setShowCountAction({ showCount }));
};
