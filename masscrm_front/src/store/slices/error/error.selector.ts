import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces';

export const getErrorSelector = createSelector(
  ({ errorData: { data } }: IStoreState) => data || '',
  error => error
);
