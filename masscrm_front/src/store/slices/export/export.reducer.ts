import { handleActions } from 'redux-actions';
import { IExportStore } from 'src/interfaces';
import {
  getExportListAction,
  setExportFilterAction,
  setShowCountExportContactsAction
} from '.';

type S = IExportStore;

const initialState: S = {
  filter: {},
  meta: {
    per_page: 10
  }
} as IExportStore;

export const exportReducer = handleActions(
  {
    [`${getExportListAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setExportFilterAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setShowCountExportContactsAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
