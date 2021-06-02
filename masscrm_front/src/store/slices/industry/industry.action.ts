import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import HTTP from 'src/utils/http';
import { setNotification } from '..';

export const getIndustriesListAction = createAction('GET_INDUSTRY_LIST');

export const fetchIndustriesList = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await HTTP.get(`filters/industries`);
    dispatch(getIndustriesListAction({ data }));
  } catch (error) {
    setNotification(error);
  }
};

export const createNewIndustry = async (value: string) => {
  try {
    await HTTP.post('/industries', { name: value });
  } catch (error) {
    throw JSON.stringify(error);
  }
};
