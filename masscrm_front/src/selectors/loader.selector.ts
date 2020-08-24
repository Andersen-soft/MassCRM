import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';

export const getLoader = createSelector(
  ({ loader }: IStoreState) => loader.isLoading,
  loader => loader
);
