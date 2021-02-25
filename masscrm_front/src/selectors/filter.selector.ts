import { createSelector } from 'reselect';
import {
  IStoreState,
  ICompanySize,
  IContactFilter,
  IContactFiltersState,
  ISortingState,
  IMultiFilterState,
  ISort,
  IFilter,
  IUserFiltersValues,
  IFilterData
} from 'src/interfaces';
import {
  initialFiltersState,
  initialMultiFilterState,
  initialUsersFilterState
} from '../reducers/tableFilters.reducer';
import { initialSortingState } from '../reducers/tableSorting.reducer';

export const getFiltersData = createSelector(
  ({ filter }: IStoreState): IFilterData => filter?.data || ({} as IFilterData),
  data => data
);

export const getCompanySizeFilter = createSelector(
  ({ filter }: IStoreState): Array<ICompanySize> =>
    filter?.data?.company_size || [],
  data => data
);

export const getCompanyTypesFilter = createSelector(
  ({ filter }: IStoreState): string[] => filter?.data?.company_type || [],
  data => data
);

export const getRolesFilter = createSelector(
  ({ filter }: IStoreState): string[] => filter?.data?.user_roles || [],
  data => data
);

export const getOriginsFilter = createSelector(
  ({ filter }: IStoreState): string[] => filter?.data?.origin || [],
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
  ({ filter: { sortBy } }: IStoreState): ISort => sortBy || {},
  data => data
);

export const getFilterExportData = createSelector(
  ({ filter: { data } }: IStoreState): { [key: string]: string } =>
    data?.export_status || {},
  data => data
);

export const getFilter = createSelector(
  ({ filter: { data } }: IStoreState): { [key: string]: string } =>
    data?.export_status || {},
  data => data
);

export const getUsersFiltersSettings = createSelector(
  ({ filter }: IStoreState): IFilter => filter?.usersSettings || {},
  data => data
);

export const getUsersFiltersValues = createSelector(
  ({ filter: { usersValues } }: IStoreState): IUserFiltersValues =>
    usersValues || initialUsersFilterState,
  data => data
);

export const getSelectedContacts = (key: string) =>
  createSelector(
    ({ filter: { [key]: selectedContacts } }: IStoreState): number[] =>
      selectedContacts || [],
    data => data
  );
