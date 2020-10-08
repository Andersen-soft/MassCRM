import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import HTTP from '../utils/http';
import { setNotification } from './notification.action';
import { ICompany, ICompanyFilter, ICompanyUpdate } from '../interfaces';
import { getCompanyForUpdate } from '../utils/map';
import { store } from '../store/configureStore';

export const getCompanyListAction = createAction('GET_COMPANY_LIST');

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
    const { data } = await getCompanyListRequest(filter);
    dispatch(getCompanyListAction({ data }));
  } catch (error) {
    setNotification(error);
  }
};

export const createCompany = async (company: ICompanyUpdate) => {
  const { data } = await HTTP.post(`companies`, company);
  return data.id;
};

export const updateCompany = async (
  idCompany: number,
  company: ICompanyUpdate,
  contactID?: number
) => {
  const currentCompany = getCompanyForUpdate(
    store.getState()?.contacts?.data?.find(({ id }) => id === contactID)
      ?.company || ({} as ICompany)
  );
  await HTTP.put(`companies/${idCompany}`, { ...currentCompany, ...company });
};
