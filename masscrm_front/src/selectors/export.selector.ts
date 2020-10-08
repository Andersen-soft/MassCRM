import { createSelector } from 'reselect';
import { IExportDataTable, IStoreState } from 'src/interfaces';

export const getExportDataTableSelector = createSelector(
  ({ exportData: { data, meta, filter } }: IStoreState): IExportDataTable => ({
    data: data || [],
    total: meta?.total || 0,
    show: meta?.per_page || 0,
    filter
  }),
  exportData => exportData
);
