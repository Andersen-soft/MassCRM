import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import { deleteEmptyFields } from 'src/utils/form/objectHelpers';
import { IContact, IContactFilter, IContactResult } from 'src/interfaces';
import HTTP, { HTTPFile } from 'src/utils/http';
import { store } from 'src/store/configureStore';
import { transformContactForUpdate } from 'src/utils/map';
import { setNotification } from './notification.action';
import { setLoaderAction } from './loader.action';
import { setAutocompleteAction } from '.';

export const setShowCountContactsAction = createAction(
  'SET_SHOW_COUNT_CONTACTS'
);
export const setContactForBindingToCompany = createAction(
  'SET_CONTACT_FOR_BINDING_TO_COMPANY'
);
export const setIsContactForBindingToCompanyUpdated = createAction(
  'SET_IS_CONTACT_FOR_BINDING_TO_COMPANY_UPDATED'
);
export const getContactListAction = createAction('GET_CONTACT_DATA');
export const getContactPlanAction = createAction('GET_CONTACT_PLAN');
export const getContactAction = createAction('GET_CONTACT');
export const getAttachmentsAction = createAction('GET_ATTACHMENTS');
export const getActivityLogAction = createAction('GET_ACTIVITY_LOG');
export const getPreviousCompaniesAction = createAction(
  'GET_PREVIOUS_COMPANIES'
);
export const getRelatedContacts = createAction('GET_RELATED_CONTACTS');

export const getContactListRequest = (filter?: IContactFilter) => {
  return HTTP.get(`contacts`, {
    params: { ...filter },
    paramsSerializer(params: IContactFilter) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
};

export const getOneContactRequest = (id: number) => (dispatch: Dispatch) => {
  HTTP.get(`contacts/${id}`).then(({ data }) => {
    dispatch(getContactAction({ data }));
  });
};

export const getActivityLog = (
  id: number,
  page?: number,
  limit?: number,
  query?: string,
  from?: string,
  to?: string
) => async (dispatch: Dispatch) => {
  const data = await HTTP.get(`activity-log/contact?id=${id}`, {
    params: { page, limit, search: { query, from, to } },
    paramsSerializer(params: IContactFilter) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
  dispatch(getActivityLogAction({ activity_log: { ...data } }));
};

export const getAttachments = (id: number) => async (dispatch: Dispatch) => {
  const { data } = await HTTP.get(`attachment-files/contact?id=${id}`);
  dispatch(getAttachmentsAction({ attachments: data }));
};

export const deleteAttachment = (id: number, contactId: number) => async (
  dispatch: Dispatch
) => {
  await HTTP.delete(`/attachment-files/contact/${id}`);
  await getAttachments(contactId)(dispatch);
  await getActivityLog(contactId)(dispatch);
};

export const uploadContactFile = (file: File, contactId: number) => async (
  dispatch: Dispatch
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', `${contactId}`);
    dispatch(setLoaderAction({ isLoading: true }));
    await HTTPFile.post(`attachment-files/contact`, formData);
    await getAttachments(contactId)(dispatch);
    await getActivityLog(contactId)(dispatch);
    dispatch(setLoaderAction({ isLoading: false }));
  } catch (e) {
    dispatch(setLoaderAction({ isLoading: false }));
  }
};

export const createContact = async (contact: IContact) => {
  try {
    await HTTP.post('contacts', contact);
  } catch (error) {
    throw JSON.stringify(error);
  }
};

export const getContactPlan = () => async (dispatch: Dispatch) => {
  try {
    const { data: plan } = await HTTP.get(`contacts/counter-daily-plan`);
    dispatch(getContactPlanAction({ plan }));
  } catch (error) {
    setNotification(error);
  }
};

export const getAutocompleteData = async (filter: IContactFilter) => {
  try {
    store.dispatch(setAutocompleteAction({ isPending: true }));
    return await HTTP.get('contacts', {
      params: filter,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
  } catch (error) {
    store.dispatch(setAutocompleteAction({ isPending: false }));
    throw new Error(JSON.stringify(error.response.data));
  } finally {
    store.dispatch(setAutocompleteAction({ isPending: false }));
  }
};

export const getAddContactList = (filter: IContactFilter) => async (
  dispatch: Dispatch,
  state: Function
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
    const { roles } = state().users.userData;
    if (!roles?.manager && !roles?.superAdmin) {
      await getContactPlan()(dispatch);
    }
    dispatch(getContactListAction({ data, total, per_page }));
  } catch (error) {
    setNotification(error);
  } finally {
    dispatch(setLoaderAction({ isLoading: false }));
  }
};

export const deleteContactList = async (
  ids: Array<number>,
  filter?: IContactFilter
) => {
  try {
    const search = filter?.search
      ? deleteEmptyFields(filter?.search)
      : undefined;
    return await HTTP.post(`contacts/delete-list`, {
      ids,
      search
    });
  } catch (error) {
    return JSON.stringify(error);
  }
};

export const changeContactsResponsible = async (
  ids: Array<number>,
  responsibleId?: number,
  filter?: IContactFilter
) => {
  try {
    const search = filter?.search
      ? deleteEmptyFields(filter?.search)
      : undefined;

    return await HTTP.put('contacts/change-responsible', {
      ids,
      responsibleId,
      search
    });
  } catch (error) {
    throw JSON.stringify(error);
  }
};

export const updateContact = async (contact: IContact, contactID: number) => {
  try {
    const contactToUpdate = store
      .getState()
      ?.contacts?.data?.find(({ id }) => id === contactID);

    const currentContact = contactToUpdate
      ? transformContactForUpdate(contactToUpdate)
      : ({} as IContactResult);

    await HTTP.put(`contacts/${contactID}`, {
      ...currentContact,
      ...contact
    });
  } catch (error) {
    throw JSON.stringify(error);
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

export const getPreviousCompanies = (id: number) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await HTTP.get(`contacts/previous-companies/${id}`);
    dispatch(getPreviousCompaniesAction({ previous_companies: data }));
  } catch (error) {
    setNotification(error);
  }
};

export const setShowCountContacts = (showCount: number) => async (
  dispatch: Dispatch
) => {
  await dispatch(setShowCountContactsAction({ showCount }));
};
