import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces';

export const getCurrentPage = createSelector(
  ({ page: { currentPage } }: IStoreState): number => currentPage,
  page => page || 1
);
