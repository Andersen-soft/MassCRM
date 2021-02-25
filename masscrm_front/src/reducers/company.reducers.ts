import { handleActions } from 'redux-actions';
import {
  getCompanyListAction,
  getCompanyAction,
  getCompanyAttachmentsAction,
  getCompanyActivityLogAction
} from 'src/actions';
import { ICompany } from 'src/interfaces';
import { ICompanyStore } from 'src/interfaces/store';

type S = ICompanyStore;

const initialState: ICompanyStore = {
  data: {} as ICompany
};

export const companyReducer = handleActions(
  {
    [`${getCompanyListAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getCompanyAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getCompanyAttachmentsAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getCompanyActivityLogAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
