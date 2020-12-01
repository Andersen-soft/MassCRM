import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import qs from 'qs';
import HTTP from '../utils/http';
import { setNotification } from './notification.action';
import { IBlacklistSearch } from '../interfaces';

export const getBlacklistAction = createAction('GET_BLACKLIST');
export const setBlacklistFilterAction = createAction('SET_BLACKLIST_FILTER');
export const setFiltersUseAction = createAction('SET_FILTER_USE');
export const setShowCountAction = createAction('SET_SHOW_COUNT');

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
    return await HTTP.get(`blacklists`, {
      params: filter,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
  } catch (error) {
    throw new Error(JSON.stringify(error.data));
  }
};

export const deleteBlacklistItem = async (ids: number[]) => {
  await HTTP.post('blacklists/delete', { ids });
};

export const setBlacklistFilter = (filter: {
  [x: number]: string | (string | Date)[];
}) => (dispatch: Dispatch) => {
  dispatch(setBlacklistFilterAction({ blacklistFilter: filter }));
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
