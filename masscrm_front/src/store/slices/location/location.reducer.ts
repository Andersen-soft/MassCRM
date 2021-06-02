import { handleActions } from 'redux-actions';
import { LocationStore } from 'src/interfaces';
import {
  getCitiesListByRegionAction,
  getRegionListByCountryAction,
  getCountryListAction
} from '.';

type S = LocationStore;

const initialState: LocationStore = {};

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
