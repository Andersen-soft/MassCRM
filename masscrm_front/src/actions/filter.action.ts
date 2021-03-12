import { createAction, ActionFunctionAny, Action } from 'redux-actions';
import { Dispatch } from 'redux';
import { ITableRow } from 'src/components/common/Table/interfaces';
import history from 'src/utils/history';
import HTTP from '../utils/http';
import { setNotification } from './notification.action';
import {
  FiltersTypes,
  IContactFilter,
  IFilter,
  ISelectedContacts,
  ISortingObject,
  IStoreState
} from '../interfaces';
import { initialSortingState } from '../reducers/tableSorting.reducer';
import { deleteEmptyFields } from '../utils/form/objectHelpers';

export const getFiltersDataAction = createAction('GET_FILTERS_DATA');
export const setFilterSettingsAction = createAction('SET_FILTER_SETTINGS');
export const setUsersFilterSettingsAction = createAction(
  'SET_USERS_FILTERS_SETTINGS'
);
export const setListFieldAction = createAction('SET_LIST_FIELD');
export const setFilterValuesAction = createAction('SET_FILTER_VALUES');
export const setMultiFilterValuesAction = createAction(
  'SET_MULTI_FILTER_VALUES'
);
export const setUsersFilterValuesAction = createAction(
  'SET_USERS_FILTER_VALUES'
);
export const setSortValuesAction = createAction('SET_SORT_VALUE');
export const setSortAction = createAction('SET_SORT');

export const setSelectedAllContactsAction = createAction(
  'SET_SELECTED_ALL_CONTACTS'
);
export const setSelectedBlacklistContactsAction = createAction(
  'SET_SELECTED_BLACKLIST_CONTACTS'
);
export const setSelectedAddContactsAction = createAction(
  'SET_SELECTED_ADD_CONTACTS'
);
export const setSelectedMyContactsAction = createAction(
  'SET_SELECTED_MY_CONTACTS'
);
export const setSelectedReportContactsAction = createAction(
  'SET_SELECTED_REPORT_CONTACTS'
);

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

export const setFilterValues = (obj?: FiltersTypes) => (
  dispatch: Dispatch,
  state: () => IStoreState
) => {
  const {
    filter: { values }
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
  const isBlacklistParams =
    currentParam.get('filter') &&
    Object.keys(JSON.parse(currentParam.get('filter') as string)).includes(
      'blacklist'
    );

  dispatch(
    setFilterValuesAction(
      isBlacklistParams || obj
        ? currentValues
        : { ...currentValues, blacklist: [] }
    )
  );
};

export const setUsersFilterSettings = (usersSettings: IFilter) => (
  dispatch: Dispatch
) => {
  dispatch(setUsersFilterSettingsAction({ usersSettings }));
};

export const setUsersFilterValues = (obj: FiltersTypes) => (
  dispatch: Dispatch
) => dispatch(setUsersFilterValuesAction(obj));

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

export const setSelectedContacts = (
  selectedContactsFilterName: string,
  setSelectedContactsAction: ActionFunctionAny<Action<any>>
) => ({ data = [], id }: ISelectedContacts) => (
  dispatch: Dispatch,
  state: () => IStoreState
) => {
  if (data.length) {
    const selectedContactsList = data.map(
      ({ id: selectedContactId }: ITableRow) => selectedContactId
    );
    return dispatch(
      setSelectedContactsAction({
        [selectedContactsFilterName]: selectedContactsList
      })
    );
  }

  if (id) {
    const {
      filter: { [selectedContactsFilterName]: selectedContactsList }
    } = state();
    const contactsIds = selectedContactsList.includes(id)
      ? selectedContactsList.filter((item: number) => item !== id)
      : [...selectedContactsList, id];
    return dispatch(
      setSelectedContactsAction({ [selectedContactsFilterName]: contactsIds })
    );
  }

  return dispatch(
    setSelectedContactsAction({ [selectedContactsFilterName]: [] })
  );
};
