import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';

export const getErrorSelector = createSelector(
  ({ errorData }: IStoreState) => errorData.data,
  error => error
);
