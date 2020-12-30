import { handleActions } from 'redux-actions';
import {
  getContactListAction,
  getContactPlanAction,
  getContactAction,
  getPreviousCompaniesAction,
  getAttachmentsAction,
  getActivityLogAction,
  getRelatedContacts
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
    })
  },
  initialState
);
