import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import HTTP, { HTTPFile } from '../utils/http';
import { setNotification } from './notification.action';
import { setLoaderAction } from './loader.action';
import {
  ICompany,
  ICompanyFilter,
  ICompanyUpdate,
  IContactFilter
} from '../interfaces';
import { getCompanyForUpdate } from '../utils/map';
import { store } from '../store/configureStore';

export const getCompanyListAction = createAction('GET_COMPANY_LIST');
export const getCompanyAction = createAction('GET_COMPANY');
export const getCompanyAttachmentsAction = createAction(
  'GET_COMPANY_ATTACHMENTS'
);
export const getCompanyActivityLogAction = createAction(
  'GET_COMPANY_ACTIVITY_LOG'
);

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
  try {
    const {
      data: [{ id }]
    } = await HTTP.post(`companies`, company);
    return id;
  } catch (error) {
    throw JSON.stringify(error);
  }
};

export const deleteCompany = async (id: number) => {
  await HTTP.delete(`companies/${id}`);
};

export const updateCompany = async (
  idCompany: number,
  company: ICompanyUpdate,
  contactID?: number
) => {
  try {
    const currentCompany = getCompanyForUpdate(
      store.getState()?.contacts?.data?.find(({ id }) => id === contactID)
        ?.company || ({} as ICompany)
    );
    await HTTP.put(`companies/${idCompany}`, {
      ...currentCompany,
      ...company
    });
  } catch (error) {
    throw JSON.stringify(error);
  }
};

export const getCompanyRequest = (id: number) => (dispatch: Dispatch) => {
  HTTP.get(`companies/${id}`)
    .then(({ data: [data] }) => {
      dispatch(setLoaderAction({ isLoading: true }));
      dispatch(getCompanyAction({ data }));
    })
    .finally(() => dispatch(setLoaderAction({ isLoading: false })));
};

export const getCompanyWithRelatedContactsRequest = (id: number) => (
  dispatch: Dispatch
) => {
  HTTP.get(`companies/${id}/contacts`)
    .then(({ data: [data] }) => {
      dispatch(setLoaderAction({ isLoading: true }));
      dispatch(getCompanyAction({ data }));
    })
    .finally(() => dispatch(setLoaderAction({ isLoading: false })));
};

export const getCompanyAttachments = (id: number) => async (
  dispatch: Dispatch
) => {
  const { data } = await HTTP.get(`attachment-files/company?id=${id}`);
  dispatch(getCompanyAttachmentsAction({ attachments: data }));
};

export const getCompanyActivityLog = (
  id: number,
  page?: number,
  limit?: number,
  query?: string,
  from?: string,
  to?: string
) => async (dispatch: Dispatch) => {
  const data = await HTTP.get(`activity-log/company?id=${id}`, {
    params: { page, limit, search: { query, from, to } },
    paramsSerializer(params: IContactFilter) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
  dispatch(getCompanyActivityLogAction({ activity_log: { ...data } }));
};

export const uploadCompanyFile = (file: File, companyId: number) => async (
  dispatch: Dispatch
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', `${companyId}`);
    dispatch(setLoaderAction({ isLoading: true }));
    await HTTPFile.post(`attachment-files/company`, formData);
    await getCompanyAttachments(companyId)(dispatch);
    await getCompanyActivityLog(companyId)(dispatch);
    dispatch(setLoaderAction({ isLoading: false }));
  } catch (e) {
    dispatch(setLoaderAction({ isLoading: false }));
  }
};

export const deleteCompanyAttachment = (
  id: number,
  companyId: number
) => async (dispatch: Dispatch) => {
  await HTTP.delete(`/attachment-files/company/${id}`);
  await getCompanyAttachments(companyId)(dispatch);
  await getCompanyActivityLog(companyId)(dispatch);
};
