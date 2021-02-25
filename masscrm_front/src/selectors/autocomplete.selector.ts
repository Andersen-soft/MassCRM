import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';

export const getAutocomplete = createSelector(
  ({ autocomplete }: IStoreState) => autocomplete.isPending,
  autocomplete => autocomplete
);
