import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';
import { IImportDataTable, IImportInputFilterValues } from '../interfaces';

export const getImportStatus = createSelector(
  (state: IStoreState): 'none' | 'processing' | 'success' =>
    state.import.importStatus,
  (status: 'none' | 'processing' | 'success') => status
);

export const getImportDataTableSelector = createSelector(
  ({ importData: { data, meta, filter } }: IStoreState): IImportDataTable => ({
    data: data || [],
    total: meta?.total || 0,
    show: meta?.per_page || 0,
    filter: filter || ({} as IImportInputFilterValues)
  }),
  exportData => exportData
);
