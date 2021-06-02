import { handleActions } from 'redux-actions';
import { IContactStore } from 'src/interfaces';
import {
  getContactListAction,
  getContactPlanAction,
  getContactAction,
  getPreviousCompaniesAction,
  getAttachmentsAction,
  getActivityLogAction,
  getRelatedContacts,
  setContactForBindingToCompany,
  setIsContactForBindingToCompanyUpdated,
  setShowCountContactsAction
} from '.';

type S = IContactStore;

const initialState: S = {
  data: [],
  plan: {
    count: '',
    expected: ''
  },
  showCount: 50
};

export const contactReducer = handleActions(
  {
    [`${getContactListAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getContactPlanAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getContactAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getPreviousCompaniesAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getAttachmentsAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getActivityLogAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getRelatedContacts}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setContactForBindingToCompany}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setIsContactForBindingToCompanyUpdated}`]: (
      state: S,
      { payload }
    ): S => ({
      ...state,
      ...payload
    }),
    [`${setShowCountContactsAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
