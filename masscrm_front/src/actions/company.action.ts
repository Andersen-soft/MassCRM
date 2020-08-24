import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import HTTP from '../utils/http';
import { setNotification } from './notification.action';
import { ICompanyFilter, ICompanyUpdate } from '../interfaces';

export const getCompanyListAction = createAction('GET_INDUSTRY_LIST');

export const getCompanyListRequest = (filter: ICompanyFilter) => {
  return HTTP.get(`companies`, {
    params: { ...filter },
    paramsSerializer(params: ICompanyFilter) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
};

export const getCompanyList = (filter: ICompanyFilter) => async (
  dispatch: Dispatch
) => {
  try {
    const data = await getCompanyListRequest(filter);
    dispatch(getCompanyListAction({ data: data.data }));
  } catch (error) {
    setNotification(error);
  }
};

export const createCompany = async (company: ICompanyUpdate) => {
  const data: ICompanyUpdate = await HTTP.post(`companies`, company);
  return data.id;
};

export const updateCompany = async (id: number, company: ICompanyUpdate) => {
  await HTTP.put(`companies/${id}`, company);
};
