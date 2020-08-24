import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';
import { ICompany } from '../interfaces';

export const getCompanies = createSelector(
  ({ companies }: IStoreState): Array<ICompany> => companies.data,
  data => data
);
