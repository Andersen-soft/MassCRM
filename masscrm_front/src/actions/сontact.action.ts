import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import { IContact, IContactFilter, IContactResult } from '../interfaces';
import { setNotification } from './notification.action';
import HTTP, { HTTPFile } from '../utils/http';
import { setLoaderAction } from './loader.action';
import { store } from '../store/configureStore';
import { getContactForUpdate } from '../utils/map';
import {
  IOneContactData,
  IOneContactActivityLogItem,
  IOneContactAttachmentItem
} from '../interfaces/IOneContactData';

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

export const GET_ONE_CONTACT_SUCCESS = 'GET_ONE_CONTACT_SUCCESS';
export const getOneContactSuccess = (oneContactData: IOneContactData) => {
  return {
    type: GET_ONE_CONTACT_SUCCESS,
    payload: oneContactData
  };
};

export const getOneContactRequest = (id: number) => {
  return (dispatch: Dispatch) => {
    HTTP.get(`contacts/${id}`).then(responseData => {
      const oneContactData = responseData.data;
      dispatch(getOneContactSuccess(oneContactData));
    });
  };
};

export const GET_ACTIVITY_LOG_SUCCESS = 'GET_ACTIVITY_LOG_SUCCESS';
export const getActivityLogSuccess = (
  activityLogDataArray: Array<IOneContactActivityLogItem>
) => {
  return {
    type: GET_ACTIVITY_LOG_SUCCESS,
    payload: activityLogDataArray
  };
};

export const getOneContactActivityLog = (id: number) => {
  return (dispatch: Dispatch) => {
    HTTP.get(`activity-log/contact?id=${id}`).then(({ data }) => {
      dispatch(getActivityLogSuccess(data));
    });
  };
};

export const GET_ATTACHMENT_SUCCESS = 'GET_ATTACHMENT_SUCCESS';
export const getAttachmentSuccess = (
  attachmentDataArray: Array<IOneContactAttachmentItem>
) => {
  return {
    type: GET_ATTACHMENT_SUCCESS,
    payload: attachmentDataArray
  };
};

export const getOneContactAttachment = (id: number) => {
  return (dispatch: Dispatch) => {
    HTTP.get(`attachment-files/contact?id=${id}`).then(({ data }) => {
      dispatch(getAttachmentSuccess(data));
    });
  };
};

export const uploadContactFile = async (
  file: File,
  contactId: number
): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('id', `${contactId}`);

  await HTTPFile.post(`attachment-files/contact`, formData);
};

export const createContact = async (contact: IContact) => {
  await HTTP.post('contacts', contact);
};

export const getContactPlan = () => async (dispatch: Dispatch) => {
  try {
    const { data: plan } = await HTTP.get(`contacts/counter-daily-plan`);
    dispatch(getContactPlanAction({ plan }));
  } catch (error) {
    setNotification(error);
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
    const {
      data,
      meta: { total, per_page }
    } = await HTTP.get('contacts', {
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

export const updateContact = async (contact: IContact, contactID: number) => {
  try {
    const currentContact = getContactForUpdate(
      store.getState()?.contacts?.data?.find(({ id }) => id === contactID) ||
        ({} as IContactResult)
    );
    return await HTTP.put(`contacts/${contactID}`, {
      ...currentContact,
      ...contact
    });
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
