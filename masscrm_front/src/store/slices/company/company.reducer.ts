import { handleActions } from 'redux-actions';
import { ICompanyStore, ICompany } from 'src/interfaces';
import {
  getCompanyListAction,
  getCompanyAction,
  getCompanyAttachmentsAction,
  getCompanyActivityLogAction
} from '.';

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
