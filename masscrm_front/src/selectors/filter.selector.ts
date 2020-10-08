import { createSelector } from 'reselect';
import {
  IStoreState,
  ICompanySize,
  IContactFilter,
  IContactFiltersState,
  ISortingObject,
  ISortingState,
  IMultiFilterState
} from 'src/interfaces';
import {
  initialFiltersState,
  initialMultiFilterState
} from '../reducers/tableFilters.reducer';
import { initialSortingState } from '../reducers/tableSorting.reducer';

export const getCompanySizeFilter = createSelector(
  ({ filter }: IStoreState): Array<ICompanySize> =>
    filter?.data?.company_size || [],
  data => data
);

export const getCompanyTypesFilter = createSelector(
  ({ filter }: IStoreState): Array<string> => filter?.data?.company_type || [],
  data => data
);

export const getOriginsFilter = createSelector(
  ({ filter }: IStoreState): Array<string> => filter?.data?.origin || [],
  data => data
);

export const getFilterSettings = createSelector(
  ({ filter }: IStoreState): IContactFilter =>
    filter?.settings || { search: {}, sort: {} },
  data => data
);

export const getFilterValues = createSelector(
  ({ filter: { values } }: IStoreState): IContactFiltersState =>
    values || initialFiltersState,
  data => data
);

export const getMultiFilterValues = createSelector(
  ({ filter: { multiValues } }: IStoreState): IMultiFilterState =>
    multiValues || initialMultiFilterState,
  data => data
);

export const getFilterSorting = createSelector(
  ({ filter: { sort } }: IStoreState): ISortingState =>
    sort || initialSortingState,
  data => data
);

export const getSortBy = createSelector(
  ({ filter: { sortBy } }: IStoreState): ISortingObject =>
    sortBy || {
      field_name: 'created_at',
      type_sort: 'DESC'
    },
  data => data
);

export const getFilterExportData = createSelector(
  ({ filter: { data } }: IStoreState): { [key: string]: string } =>
    data?.export_status || {},
  data => data
);
