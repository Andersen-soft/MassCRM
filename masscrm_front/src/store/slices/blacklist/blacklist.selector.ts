import { createSelector } from 'reselect';
import {
  IStoreState,
  IBlacklistFiltersState,
  IBlacklistItem,
  IBlacklistSearch
} from 'src/interfaces';

export const getBlacklistSelector = createSelector(
  ({ blacklist: { data } }: IStoreState): IBlacklistItem[] => data,
  blacklist => blacklist
);

export const showBlacklistItem = createSelector(
  ({ blacklist: { data } }: IStoreState): IBlacklistItem[] => data,
  (data: IBlacklistItem[]) => data.length
);

export const getBlacklistTotalCount = createSelector(
  ({ blacklist: { total } }: IStoreState): number => total || 0,
  (total: number) => total
);

export const getBlacklistFilter = createSelector(
  ({ blacklist: { filterValues } }: IStoreState): IBlacklistFiltersState =>
    filterValues,
  (filter: IBlacklistFiltersState) => filter
);

export const getBlacklistFilterSettings = createSelector(
  ({ blacklist: { filterSettings } }: IStoreState): IBlacklistSearch =>
    filterSettings,
  (filterSettings: IBlacklistSearch) => filterSettings
);

export const getFiltersUse = createSelector(
  ({ blacklist: { isFiltersUse } }: IStoreState): boolean => isFiltersUse,
  (useFilters: boolean) => useFilters
);

export const getShowCountBlacklist = createSelector(
  ({ blacklist: { showCount } }: IStoreState): number => showCount,
  (showCount: number) => showCount
);
