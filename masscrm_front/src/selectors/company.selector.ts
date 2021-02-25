import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';
import { ICompany, IAttachment, IActivityLog, IContacts } from '../interfaces';

export const getCompany = createSelector(
  ({ companies }: IStoreState): ICompany => companies.data || ({} as ICompany),
  companies => companies
);

export const getCompanyRelatedContacts = createSelector(
  ({ companies }: IStoreState): IContacts =>
    companies.data.contacts || ({} as IContacts),
  companies => companies
);

export const getCompanyAttachmentsSelector = createSelector(
  ({ companies }: IStoreState): Array<IAttachment> =>
    companies?.attachments ?? [],
  companies => companies
);

export const getCompanyActivityLogSelector = createSelector(
  ({ companies }: IStoreState): IActivityLog =>
    companies?.activity_log || ({} as IActivityLog),
  companies => companies
);
