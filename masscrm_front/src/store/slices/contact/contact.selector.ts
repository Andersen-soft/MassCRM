import { createSelector } from 'reselect';
import {
  IStoreState,
  IActivityLog,
  IAttachment,
  IContactResult,
  IPreviousCompany
} from 'src/interfaces';

export const getContacts = createSelector(
  ({ contacts: { data } }: IStoreState): IContactResult[] => data,
  contacts => contacts
);

export const getContactSelector = createSelector(
  ({ contacts: { data } }: IStoreState): IContactResult =>
    data[0] || ({} as IContactResult),
  contacts => contacts
);

export const getContactsLength = createSelector(
  ({ contacts: { total } }: IStoreState): number => total || 0,
  (contactsLength: number) => contactsLength
);

export const getPerPage = createSelector(
  ({ contacts: { per_page } }: IStoreState): number => per_page || 0,
  (per_page: number) => per_page
);

export const getShowContact = createSelector(
  ({ contacts: { data } }: IStoreState): IContactResult[] => data,
  (data: IContactResult[]) => data.length
);

export const getContactsPlan = createSelector(
  ({
    contacts: { plan }
  }: IStoreState): {
    count: string;
    expected: string;
  } => plan,
  plan => plan
);

export const getPreviousCompaniesSelector = createSelector(
  ({ contacts: { previous_companies } }: IStoreState): IPreviousCompany[] =>
    previous_companies || [],
  plan => plan
);

export const getAttachmentsSelector = createSelector(
  ({ contacts: { attachments } }: IStoreState): IAttachment[] =>
    attachments || [],
  plan => plan
);

export const getActivityLogSelector = createSelector(
  ({ contacts: { activity_log } }: IStoreState): IActivityLog =>
    activity_log || ({} as IActivityLog),
  plan => plan
);

export const getContactForBindingToCompany = createSelector(
  ({ contacts: { contactForBindingToCompany } }: IStoreState) =>
    contactForBindingToCompany || ({} as any),
  contacts => contacts
);

export const getIsContactForBindingToCompanyUpdated = createSelector(
  ({ contacts: { isContactForBindingToCompanyUpdated } }: IStoreState) =>
    isContactForBindingToCompanyUpdated,
  contacts => contacts
);

export const getShowCountContacts = createSelector(
  ({ contacts: { showCount } }: IStoreState) => showCount,
  (showCount: number) => showCount || 0
);
