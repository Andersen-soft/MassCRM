import { handleActions } from 'redux-actions';
import { setSelectedRepContactsAction } from 'src/actions';
import history from 'src/utils/history';
import { IReportStore } from '../interfaces/store';

const currentParam = new URLSearchParams(history.location.search);

const getDataByJson = (param: string) =>
  JSON.parse(currentParam.get(param) as string) || null;

const filter = getDataByJson('filter');

// TODO ts
const initialState: IReportStore = {
  isFiltersUse: false,
  data: [],
  filterValues: { ...filter },
  filterSettings: {},
  showCount: 5
};

export const reportReducer = handleActions(
  {
    [`${setSelectedRepContactsAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
