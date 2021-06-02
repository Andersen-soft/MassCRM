import { createSelector } from 'reselect';
import {
  ICompany,
  IAttachment,
  IActivityLog,
  Contacts,
  IStoreState
} from 'src/interfaces';

export const getCompany = createSelector(
  ({ companies: { data } }: IStoreState): ICompany => data || ({} as ICompany),
  companies => companies
);

export const getCompanyRelatedContacts = createSelector(
  ({
    companies: {
      data: { contacts }
    }
  }: IStoreState): Contacts => contacts || ({} as Contacts),
  companies => companies
);

export const getCompanyAttachmentsSelector = createSelector(
  ({ companies: { attachments } }: IStoreState): IAttachment[] =>
    attachments ?? [],
  companies => companies
);

export const getCompanyActivityLogSelector = createSelector(
  ({ companies: { activity_log } }: IStoreState): IActivityLog =>
    activity_log || ({} as IActivityLog),
  companies => companies
);
