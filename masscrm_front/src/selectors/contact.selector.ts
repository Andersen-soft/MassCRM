import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';
import { IContactResult } from '../interfaces';

export const getContacts = createSelector(
  (state: IStoreState): Array<IContactResult> => state.contacts.data || [],
  contacts => contacts
);

export const getContactsLength = createSelector(
  (state: IStoreState): number => state.contacts?.total || 0,
  (contactsLength: number) => contactsLength
);

export const getPerPage = createSelector(
  (state: IStoreState): number => state?.contacts?.per_page || 0,
  (per_page: number) => per_page
);

export const getShowContact = createSelector(
  (state: IStoreState): Array<IContactResult> => state.contacts.data || [],
  (data: Array<IContactResult>) => data.length
);

export const getContactsPlan = createSelector(
  (
    state: IStoreState
  ): {
    count: string;
    expected: string;
  } => state.contacts?.plan,
  plan => plan
);
