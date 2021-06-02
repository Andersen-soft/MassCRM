import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces';

export const getLoader = createSelector(
  ({ loader: { isLoading } }: IStoreState) => isLoading,
  loader => loader
);
