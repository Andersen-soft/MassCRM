import { handleActions } from 'redux-actions';
import { getCompanyListAction } from 'src/actions';
import { ICompanyStore } from 'src/interfaces/store';

type S = ICompanyStore;

const initialState: ICompanyStore = {
  data: []
};

export const companyReducer = handleActions(
  {
    [`${getCompanyListAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
