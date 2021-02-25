import { handleActions } from 'redux-actions';
import {
  getContactListAction,
  getContactPlanAction,
  getContactAction,
  getPreviousCompaniesAction,
  getAttachmentsAction,
  getActivityLogAction,
  getRelatedContacts,
  setContactForBindingToCompany,
  setIsContactForBindingToCompanyUpdated
} from 'src/actions';
import { IContactStore } from 'src/interfaces/store';

type S = IContactStore;

const initialState: IContactStore = {
  data: [],
  plan: {
    count: '',
    expected: ''
  }
};

export const contactReducer = handleActions(
  {
    [`${getContactListAction}`]: (state: S, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${getContactPlanAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${getContactAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${getPreviousCompaniesAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${getAttachmentsAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${getActivityLogAction}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${getRelatedContacts}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setContactForBindingToCompany}`]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [`${setIsContactForBindingToCompanyUpdated}`]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
