import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { setNotification } from './notification.action';
import HTTP from '../utils/http';

export const getCountryListAction = createAction('GET_COUNTRY_LIST');
export const getRegionListByCountryAction = createAction('GET_REGION_LIST');
export const getCitiesListByRegionAction = createAction('GET_CITIES_LIST');

export const getCountryList = () => async (dispatch: Dispatch) => {
  try {
    const data = await HTTP.get('countries');
    dispatch(getCountryListAction({ country: data }));
  } catch (error) {
    setNotification(error);
  }
};

export const getRegionListByCountry = (code: string) => async (
  dispatch: Dispatch
) => {
  try {
    const data = await HTTP.get(`countries/${code}/regions`);
    dispatch(getRegionListByCountryAction({ region: data }));
  } catch (error) {
    setNotification(error);
  }
};

export const getCitiesListByRegion = (code: string) => async (
  dispatch: Dispatch
) => {
  try {
    const data = await HTTP.get(`countries/regions/${code}`);
    dispatch(getCitiesListByRegionAction({ city: data }));
  } catch (error) {
    setNotification(error);
  }
};
