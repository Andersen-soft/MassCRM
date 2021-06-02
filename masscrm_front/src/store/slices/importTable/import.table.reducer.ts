import { Action, handleActions } from 'redux-actions';
import { IImportDataStore } from 'src/interfaces';
import {
  getImportListAction,
  setImportFilterAction,
  setShowCountImportContactsAction
} from '..';

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
    }),
    [`${setShowCountImportContactsAction}`]: (
      state: S,
      { payload }: Action<any>
    ): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
