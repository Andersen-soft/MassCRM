import { createSelector } from 'reselect';
import {
  IReportFilter,
  IReportSearch,
  IReportSortingState,
  ISortingObject,
  IStoreState
} from 'src/interfaces';
import { initialReportSortingState } from './constants';

export const getReportTotalCount = createSelector(
  ({ report: { total } }: IStoreState): number => total || 0,
  (total: number) => total
);

export const getShowCountReport = createSelector(
  ({ report: { showCount } }: IStoreState): number => showCount || 0,
  (showCount: number) => showCount
);

export const getReportSelector = createSelector(
  // TODO ts
  ({ report: { data } }: IStoreState): any => data,
  report => report
);

export const getReportFilter = createSelector(
  ({ report: { filterValues } }: IStoreState): IReportSearch => filterValues,
  (filter: any) => filter
);

export const getReportFilterSettings = createSelector(
  ({ report: { filterSettings } }: IStoreState): IReportFilter =>
    filterSettings,
  (filterSettings: IReportFilter) => filterSettings
);

export const getReportFilterSorting = createSelector(
  ({ report: { sort } }: IStoreState): IReportSortingState =>
    sort || initialReportSortingState,
  data => data
);

export const getReportSortBy = createSelector(
  ({ report: { sortBy } }: IStoreState): ISortingObject =>
    sortBy || ({} as ISortingObject),
  data => data
);
