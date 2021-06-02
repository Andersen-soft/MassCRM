import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { SnackErrorBarData } from 'src/utils';
import HTTP from 'src/utils/http';
import { BACKEND_COMMON_ERROR, SNACKBAR_ERRORS } from 'src/constants';
import { setNotification } from '..';

export const getCountryListAction = createAction('GET_COUNTRY_LIST');
export const getRegionListByCountryAction = createAction('GET_REGION_LIST');
export const getCitiesListByRegionAction = createAction('GET_CITIES_LIST');

export const getCountryList = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await HTTP.get('countries');
    dispatch(getCountryListAction({ country: data }));
  } catch (error) {
    setNotification(error);
  }
};

export const getRegions = (code: string) => {
  return HTTP.get(`countries/${code}/regions`);
};

export const getRegionListByCountry = (code: string) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await getRegions(code);
    dispatch(getRegionListByCountryAction({ region: data }));
  } catch (error) {
    setNotification(error);
  }
};

export const getCitiesListByRegion = (code: string) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await HTTP.get(`countries/regions/${code}`);
    dispatch(getCitiesListByRegionAction({ city: data }));
  } catch (error) {
    setNotification(error);
  }
};

export const addNewCity = async (
  value: { city: string; region: number; country: number }[],
  errorsEventEmitter: any
) => {
  try {
    await HTTP.post('/countries/cities', {
      location: value
    });
  } catch (e) {
    errorsEventEmitter.emit(SNACKBAR_ERRORS, {
      errorsArray: SnackErrorBarData(BACKEND_COMMON_ERROR)
    });
  }
};
