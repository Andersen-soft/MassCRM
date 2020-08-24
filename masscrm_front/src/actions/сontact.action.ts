import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import { format } from 'date-fns';
import { IContact, IContactFilter } from '../interfaces';
import { setNotification } from './notification.action';
import HTTP from '../utils/http';
import { setLoaderAction } from './loader.action';

export const getContactListAction = createAction('GET_CONTACT_DATA');
export const getContactPlanAction = createAction('GET_CONTACT_PLAN');

export const getContactListRequest = (filter?: IContactFilter) => {
  return HTTP.get(`contacts`, {
    params: { ...filter },
    paramsSerializer(params: IContactFilter) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
};

export const createContact = async (contact: IContact) => {
  await HTTP.post(`contacts`, contact);
};

export const getContactPlan = () => async (dispatch: Dispatch) => {
  try {
    const plan = await HTTP.get(`contacts/counter-daily-plan`);
    dispatch(getContactPlanAction({ plan }));
  } catch (error) {
    setNotification(error);
  }
};

export const getContactListDaily = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await getContactListRequest({
      search: {
        created_at: {
          min: format(new Date(), 'y-LL-dd'),
          max: format(new Date(), 'y-LL-dd')
        }
      }
    });
    await getContactPlan()(dispatch);
    dispatch(getContactListAction({ data }));
  } catch (error) {
    setNotification(error);
  }
};

export const getContactList = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoaderAction({ isLoading: true }));
    const { data, total }: any = await getContactListRequest();
    dispatch(getContactListAction({ data, total }));
  } catch (error) {
    setNotification(error);
  } finally {
    dispatch(setLoaderAction({ isLoading: false }));
  }
};

export const getAutocompleteDate = async (filter: IContactFilter) => {
  try {
    return await HTTP.get('contacts', {
      params: filter,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
};

export const getAddContactList = (filter: IContactFilter) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoaderAction({ isLoading: true }));
    const { data, total, per_page } = await HTTP.get('contacts', {
      params: filter,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
    await getContactPlan()(dispatch);
    dispatch(getContactListAction({ data, total, per_page }));
  } catch (error) {
    setNotification(error);
  } finally {
    dispatch(setLoaderAction({ isLoading: false }));
  }
};

export const deleteContactList = async (ids: Array<number>) => {
  try {
    return await HTTP.post(`contacts/delete-list`, { ids });
  } catch (error) {
    return JSON.stringify(error);
  }
};

export const updateContact = async (contact: IContact, id: number) => {
  try {
    return await HTTP.put(`contacts/${id}`, contact);
  } catch (error) {
    return JSON.stringify(error);
  }
};

export const getContact = async (filter: IContactFilter) => {
  try {
    const { data } = await getContactListRequest(filter);
    return data;
  } catch (error) {
    return JSON.stringify(error);
  }
};
