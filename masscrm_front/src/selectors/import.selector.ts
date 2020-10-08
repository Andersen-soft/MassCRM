import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';

export const getImportStatus = createSelector(
  (state: IStoreState): 'none' | 'processing' | 'success' =>
    state.import.importStatus,
  (status: 'none' | 'processing' | 'success') => status
);
