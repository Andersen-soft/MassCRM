import { createSelector } from 'reselect';
import {
  IStoreState,
  IActivityLog,
  IAttachment,
  IContactResult,
  IPreviousCompany
} from 'src/interfaces';

export const getContacts = createSelector(
  (state: IStoreState): Array<IContactResult> => state.contacts.data || [],
  contacts => contacts
);

export const getContact = createSelector(
  (state: IStoreState): IContactResult =>
    state.contacts.data[0] || ({} as IContactResult),
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

export const getPreviousCompaniesSelector = createSelector(
  ({ contacts }: IStoreState): Array<IPreviousCompany> =>
    contacts?.previous_companies || [],
  plan => plan
);

export const getAttachmentsSelector = createSelector(
  ({ contacts }: IStoreState): Array<IAttachment> =>
    contacts?.attachments || [],
  plan => plan
);

export const getActivityLogSelector = createSelector(
  ({ contacts }: IStoreState): IActivityLog =>
    contacts?.activity_log || ({} as IActivityLog),
  plan => plan
);

export const getContactForBindingToCompany = createSelector(
  ({ contacts }: IStoreState) =>
    contacts?.contactForBindingToCompany || ({} as any),
  contacts => contacts
);

export const getIsContactForBindingToCompanyUpdated = createSelector(
  ({ contacts }: IStoreState) => contacts?.isContactForBindingToCompanyUpdated,
  contacts => contacts
);

export const getShowCountContacts = createSelector(
  ({ contacts }: IStoreState) => contacts?.showCount,
  (showCount: number) => showCount
);
