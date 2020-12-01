import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import HTTP from '../utils/http';
import { setNotification } from './notification.action';
import { FiltersTypes, IContactFilter, ISortingObject } from '../interfaces';
import history from '../store/history';
import { initialFiltersState } from '../reducers/tableFilters.reducer';
import { initialSortingState } from '../reducers/tableSorting.reducer';
import { deleteEmptyFields } from '../utils/form/objectHelpers';

export const getFiltersDataAction = createAction('GET_FILTER_DATA');
export const setFilterSettingsAction = createAction('SET_FILTER_DATA');
export const setListFieldAction = createAction('SET_LIST_FIELD');
export const setFilterValuesAction = createAction('SET_FILTER_VALUES');
export const setMultiFilterValuesAction = createAction(
  'SET_MULTI_FILTER_VALUES'
);
export const setSortValuesAction = createAction('SET_SORT_VALUE');
export const setSortAction = createAction('SET_SORT');

export const getFiltersData = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await HTTP.get(`filters/`);
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

export const setListField = (field: (string | undefined)[]) => (
  dispatch: Dispatch
) => {
  dispatch(setListFieldAction(field));
};

export const setFilterValues = (obj?: FiltersTypes) => (dispatch: Dispatch) => {
  const currentParam = new URLSearchParams(history.location.search);
  const currentValues =
    obj ||
    JSON.parse(currentParam.get('filter') as string) ||
    initialFiltersState;
  if (obj) {
    currentParam.set(
      'filter',
      JSON.stringify(
        deleteEmptyFields({
          ...JSON.parse(currentParam.get('filter') as string),
          ...currentValues
        })
      )
    );
    history.push({
      search: currentParam.toString()
    });
  }
  dispatch(setFilterValuesAction(currentValues));
};

export const setMultiFilterValues = (obj: FiltersTypes) => (
  dispatch: Dispatch
) => {
  dispatch(setMultiFilterValuesAction(obj));
};

export const setSortValues = (obj?: { [x: string]: ISortingObject }) => (
  dispatch: Dispatch
) => {
  const currentParam = new URLSearchParams(history.location.search);
  const currentValues =
    obj ||
    JSON.parse(currentParam.get('sorting') as string) ||
    initialSortingState;
  if (obj) {
    currentParam.set('sorting', JSON.stringify(currentValues));
    history.push({
      search: currentParam.toString()
    });
  }
  dispatch(setSortValuesAction(currentValues));
};

export const setSort = (obj?: ISortingObject) => (dispatch: Dispatch) => {
  const currentParam = new URLSearchParams(history.location.search);
  const currentValues =
    obj || JSON.parse(currentParam.get('sort') as string) || {};
  if (obj) {
    currentParam.set('sort', JSON.stringify(currentValues));
    history.push({
      search: currentParam.toString()
    });
  }
  dispatch(setSortAction(currentValues));
};
