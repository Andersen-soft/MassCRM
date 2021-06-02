import { handleActions } from 'redux-actions';
import { IReportStore } from 'src/interfaces';
import history from 'src/utils/history';
import { initReportFiltersState } from 'src/constants';
import { urlDeserialize } from 'src/utils';
import { initialReportSortingState } from './constants';
import {
  setReportAction,
  setReportFilterValuesAction,
  setShowCountReportAction,
  setReportFilterSettingsAction,
  setReportSortAction,
  setReportSortValuesAction
} from '.';

type S = IReportStore;

// TODO shift this part to other part after refactoring )
const currentParam = new URLSearchParams(history.location.search);

const getDataByJson = (param: string) =>
  JSON.parse(currentParam.get(param) as string) || null;

const sortBy = getDataByJson('sort');
const sorting = getDataByJson('sorting');

const filter =
  currentParam.get('filter') && urlDeserialize(currentParam.get('filter'));

const initialState: S = {
  data: [],
  filterValues: { ...initReportFiltersState, ...filter },
  filterSettings: {},
  showCount: 10,
  sort: sorting || initialReportSortingState,
  sortBy: sortBy || {}
};

export const reportReducer = handleActions(
  {
    [`${setReportAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setShowCountReportAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setReportFilterSettingsAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setReportFilterValuesAction}`]: (state: S, { payload }): S => ({
      ...state,
      filterValues: {
        ...state.filterValues,
        ...payload
      }
    }),
    [`${setReportSortAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setReportSortValuesAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
