import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';
import { ICompany, IAttachment, IActivityLog } from '../interfaces';

export const getCompanies = createSelector(
  ({ companies }: IStoreState): Array<ICompany> => companies.data,
  data => data
);

export const getCompany = createSelector(
  ({ companies }: IStoreState): ICompany =>
    companies.data[0] || ({} as ICompany),
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
