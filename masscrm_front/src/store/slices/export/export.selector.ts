import { createSelector } from 'reselect';
import { IExportDataTable, IStoreState } from 'src/interfaces';

export const getExportDataTableSelector = createSelector(
  ({
    exportData: {
      data,
      meta: { total, per_page },
      filter
    }
  }: IStoreState): IExportDataTable => ({
    data: data || [],
    total: total || 0,
    show: per_page || 0,
    filter
  }),
  exportData => exportData
);
