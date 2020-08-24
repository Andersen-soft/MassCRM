import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import HTTP from '../utils/http';
import { setNotification } from './notification.action';
import { IContactFilter, ISortingObject } from '../interfaces';

export const getFiltersDataAction = createAction('GET_FILTER_DATA');
export const setFilterSettingsAction = createAction('SET_FILTER_DATA');
export const setListFieldAction = createAction('SET_LIST_FIELD');
export const setFilterValuesAction = createAction('SET_FILTER_VALUES');
export const setSortValuesAction = createAction('SET_SORT_VALUE');
export const setSortAction = createAction('SET_SORT');

export const getFiltersData = () => async (dispatch: Dispatch) => {
  try {
    const data = await HTTP.get(`filters/`);
    dispatch(getFiltersDataAction({ data }));
  } catch (error) {
    setNotification(error);
  }
};

export const setFilterSettings = (settings: IContactFilter) => (
  dispatch: Dispatch
) => {
  dispatch(setFilterSettingsAction({ settings }));
};

export const setListField = (field: string) => (dispatch: Dispatch) => {
  dispatch(setListFieldAction(field));
};

export const setFilterValues = (obj: {
  [x: number]: string[] | string | number | (number | Date)[] | never[];
}) => (dispatch: Dispatch) => {
  dispatch(setFilterValuesAction(obj));
};

export const setSortValues = (obj: { [x: string]: ISortingObject }) => (
  dispatch: Dispatch
) => {
  dispatch(setSortValuesAction(obj));
};

export const setSort = (obj: ISortingObject) => (dispatch: Dispatch) => {
  dispatch(setSortAction(obj));
};
