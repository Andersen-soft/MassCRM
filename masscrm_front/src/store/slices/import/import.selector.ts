import { createSelector } from 'reselect';
import {
  IStoreState,
  IImportDataTable,
  IImportInputFilterValues
} from 'src/interfaces';

export const getImportStatus = createSelector(
  ({
    import: { importStatus }
  }: IStoreState): 'none' | 'processing' | 'success' => importStatus,
  (status: 'none' | 'processing' | 'success') => status
);

export const getImportDataTableSelector = createSelector(
  ({
    importData: {
      data,
      meta: { total, per_page },
      filter
    }
  }: IStoreState): IImportDataTable => ({
    data: data || [],
    total: total || 0,
    show: per_page || 0,
    filter: filter || ({} as IImportInputFilterValues)
  }),
  exportData => exportData
);

export const getSelectedDuplicationAction = createSelector(
  ({
    import: {
      formState: { duplicationAction }
    }
  }: IStoreState) => duplicationAction,
  duplicationAction => duplicationAction
);

export const getImportInfo = createSelector(
  ({ import: { info } }: IStoreState) => info,
  info => info
);

export const getIsImportModalOpen = createSelector(
  ({ import: { isImportModalOpen } }: IStoreState): boolean =>
    isImportModalOpen,
  (isImportModalOpen: boolean) => isImportModalOpen
);
