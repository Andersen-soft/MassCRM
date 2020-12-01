import { Action, handleActions } from 'redux-actions';
import { getImportListAction, setImportFilterAction } from '../actions';
import { IImportDataStore } from '../interfaces';

type S = IImportDataStore;

const initialState: IImportDataStore = {
  filter: {},
  meta: {
    per_page: 10
  }
} as IImportDataStore;

export const importDataReducer = handleActions(
  {
    [`${getImportListAction}`]: (state: S, { payload }: Action<any>): S => ({
      ...state,
      ...payload
    }),
    [`${setImportFilterAction}`]: (state: S, { payload }: Action<any>): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
