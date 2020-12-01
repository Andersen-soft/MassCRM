import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';
import { IBlacklistFiltersState, IBlacklistItem } from '../interfaces';

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

export const getTotalCount = createSelector(
  (state: IStoreState): number => state.blacklist.total || 1,
  (total: number) => total
);

export const getBlacklistFilter = createSelector(
  (state: IStoreState): IBlacklistFiltersState =>
    state.blacklist.blacklistFilter,
  (filter: IBlacklistFiltersState) => filter
);

export const getFiltersUse = createSelector(
  (state: IStoreState): boolean => state.blacklist.isFiltersUse,
  (useFilters: boolean) => useFilters
);

export const getShowCount = createSelector(
  (state: IStoreState): number => state.blacklist.showCount,
  (showCount: number) => showCount
);
