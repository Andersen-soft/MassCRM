import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import HTTP from '../utils/http';
import { setNotification } from './notification.action';

export const getIndustriesListAction = createAction('GET_INDUSTRY_LIST');

export const getIndustriesList = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await HTTP.get(`filters/industries`);
    dispatch(getIndustriesListAction({ data }));
  } catch (error) {
    setNotification(error);
  }
};
