import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces';

export const getAutocomplete = createSelector(
  ({ autocomplete: { isPending } }: IStoreState) => isPending,
  autocomplete => autocomplete
);
