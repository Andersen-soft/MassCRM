import { handleActions } from 'redux-actions';
import {
  getCitiesListByRegionAction,
  getRegionListByCountryAction,
  getCountryListAction
} from 'src/actions';
import { ILocationStore } from 'src/interfaces/store';

type S = ILocationStore;

const initialState: ILocationStore = {};

export const locationReducer = handleActions(
  {
    [`${getCitiesListByRegionAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getRegionListByCountryAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getCountryListAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
