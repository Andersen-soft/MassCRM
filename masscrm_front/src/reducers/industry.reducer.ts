import { handleActions } from 'redux-actions';
import { getIndustriesListAction } from 'src/actions';
import { IIndustryStore } from 'src/interfaces/store';

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
