import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces';

export const getReportTotalCount = createSelector(
  ({ report }: IStoreState): number => report.total || 0,
  (total: number) => total
);

export const getShowCountReport = createSelector(
  ({ report }: IStoreState): number => report.showCount,
  (showCount: number) => showCount
);

export const getReportSelector = createSelector(
  // TODO TS
  ({ report }: IStoreState): any => report.data || [],
  report => report
);

export const getReportFilter = createSelector(
  ({ report }: IStoreState): any => report.filterValues,
  (filter: any) => filter
);
