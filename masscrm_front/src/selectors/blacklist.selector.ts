import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';
import {
  IBlacklistFiltersState,
  IBlacklistItem,
  IBlacklistSearch
} from '../interfaces';

export const getBlacklistSelector = createSelector(
  (state: IStoreState): Array<IBlacklistItem> => state.blacklist.data || [],
  blacklist => blacklist
);

export const getBlacklistLength = createSelector(
  (state: IStoreState): number => state.blacklist?.total || 0,
  (blacklistLength: number) => blacklistLength
);

export const showBlacklistItem = createSelector(
  (state: IStoreState): Array<IBlacklistItem> => state.blacklist.data || [],
  (data: Array<IBlacklistItem>) => data.length
);

export const getBlacklistTotalCount = createSelector(
  (state: IStoreState): number => state.blacklist.total || 1,
  (total: number) => total
);

export const getBlacklistFilter = createSelector(
  (state: IStoreState): IBlacklistFiltersState => state.blacklist.filterValues,
  (filter: IBlacklistFiltersState) => filter
);

export const getBlacklistFilterSettings = createSelector(
  (state: IStoreState): IBlacklistSearch => state.blacklist.filterSettings,
  (filterSettings: IBlacklistSearch) => filterSettings
);

export const getFiltersUse = createSelector(
  (state: IStoreState): boolean => state.blacklist.isFiltersUse,
  (useFilters: boolean) => useFilters
);

export const getShowCountBlacklist = createSelector(
  (state: IStoreState): number => state.blacklist.showCount,
  (showCount: number) => showCount
);
