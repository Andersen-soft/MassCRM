import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';

export const getCurrentPage = createSelector(
  ({ page }: IStoreState): number => page.currentPage,
  page => page
);
