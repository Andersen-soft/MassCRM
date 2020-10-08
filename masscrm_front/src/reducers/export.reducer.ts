import { handleActions } from 'redux-actions';
import { getExportListAction, setExportFilterAction } from 'src/actions';
import { IExportStore } from '../interfaces';

type S = IExportStore;

const initialState: IExportStore = {
  filter: {},
  meta: {
    per_page: 10
  }
} as IExportStore;

export const exportReducer = handleActions(
  {
    [`${getExportListAction}`]: (state: S, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setExportFilterAction}`]: (state: S, { payload }) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
