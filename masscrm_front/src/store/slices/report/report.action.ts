import qs from 'qs';
import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import {
  ReportData,
  IStoreState,
  IReportFilter,
  ISortingObject,
  IReportSearch
} from 'src/interfaces';
import { deleteEmptyFields } from 'src/utils';
import history from 'src/utils/history';
import HTTP from 'src/utils/http';
import { store } from 'src/store/configureStore';
import { initialReportSortingState } from './constants';
import { setNotification, setLoaderAction, setAutocompleteAction } from '..';

const { search } = history.location;

export const setReportAction = createAction('SET_REPORT');
export const setShowCountReportAction = createAction('SET_SHOW_COUNT_REPORT');
export const setReportFilterValuesAction = createAction(
  'SET_REPORT_FILTER_VALUES'
);
export const setReportFilterSettingsAction = createAction(
  'SET_REPORT_FILTER_SETTINGS'
);
export const setReportSortValuesAction = createAction('SET_REPORT_SORT_VALUES');
export const setReportSortAction = createAction('SET_REPORT_SORT');

export const getReportContactsRequest = (filter?: IReportFilter) => {
  return HTTP.get('report', {
    params: { ...filter },
    paramsSerializer(params: IReportFilter) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
};

export const getReport = (filter?: IReportFilter) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoaderAction({ isLoading: true }));
    const {
      data,
      meta: { total, per_page }
    } = await HTTP.get('report', {
      params: filter,
      paramsSerializer(params: IReportFilter) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
    // TODO remove mock-mapping after Draft Page implementation
    dispatch(
      setReportAction({
        data: data.map((item: ReportData) => ({
          ...item,
          inReview: 0,
          waiting: 0,
          declined: 0,
          totalErrors: 0
        })),
        total,
        per_page
      })
    );
  } catch (error) {
    setNotification(error);
  } finally {
    dispatch(setLoaderAction({ isLoading: false }));
  }
};

export const setShowCountReport = (showCount: number) => async (
  dispatch: Dispatch
) => {
  await dispatch(setShowCountReportAction({ showCount }));
};

export const setReportFilterValues = (obj?: IReportSearch) => (
  dispatch: Dispatch,
  state: () => IStoreState
) => {
  const {
    report: { filterValues: values }
  } = state();
  const initialStateValue = values && deleteEmptyFields(values);
  const currentParam = new URLSearchParams(search);
  const reportQuery = JSON.parse(currentParam.get('reportfilter') as string);
  const currentValues = {
    ...initialStateValue,
    ...reportQuery,
    ...obj
  };
  const unemptifiedFilter = deleteEmptyFields(currentValues);
  currentParam.set(
    'reportfilter',
    JSON.stringify(
      deleteEmptyFields({
        ...reportQuery,
        ...unemptifiedFilter
      })
    )
  );
  // TODO: fix removing empty filter query after release(some rendering problems while cleaning)
  // if (
  //   !(
  //     Object.keys(deleteEmptyFields({ ...obj })).length ||
  //     Object.keys(JSON.parse(currentParam.get('reportfilter') as string))
  //       ?.length
  //   )
  // ) {
  //   currentParam.delete('reportfilter');
  // }
  history.replace({
    search: currentParam.toString()
  });

  dispatch(setReportFilterValuesAction(currentValues));
};

export const getAutocompleteReport = async (filter: IReportFilter) => {
  try {
    store.dispatch(setAutocompleteAction({ isPending: true }));
    return await HTTP.get(`report`, {
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

export const setReportFilterSettings = (filterSettings: IReportFilter) => (
  dispatch: Dispatch
) => {
  dispatch(setReportFilterSettingsAction({ filterSettings }));
};

export const setReportSortValues = (obj?: { [x: string]: ISortingObject }) => (
  dispatch: Dispatch,
  state: () => IStoreState
) => {
  const {
    report: { sort }
  } = state();

  const currentParam = new URLSearchParams(search);
  const currentValues =
    obj ||
    JSON.parse(currentParam.get('sorting') as string) ||
    initialReportSortingState;
  if (obj) {
    currentParam.set('sorting', JSON.stringify(currentValues));
    history.push({
      search: currentParam.toString()
    });
  }
  dispatch(setReportSortValuesAction({ sort: { ...sort, ...currentValues } }));
};

export const setReportSort = (obj?: ISortingObject) => (dispatch: Dispatch) => {
  const currentParam = new URLSearchParams(search);
  const currentValues =
    obj || JSON.parse(currentParam.get('sort') as string) || {};
  if (obj) {
    currentParam.set('sort', JSON.stringify(currentValues));
    history.push({
      search: currentParam.toString()
    });
  }
  dispatch(setReportSortAction({ sortBy: currentValues }));
};
