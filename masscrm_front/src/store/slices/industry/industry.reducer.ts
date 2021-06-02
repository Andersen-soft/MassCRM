import { handleActions } from 'redux-actions';
import { IIndustryStore } from 'src/interfaces';
import { getIndustriesListAction } from '.';

type S = IIndustryStore;

const initialState: IIndustryStore = {
  data: []
};

export const industryReducer = handleActions(
  {
    [`${getIndustriesListAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
