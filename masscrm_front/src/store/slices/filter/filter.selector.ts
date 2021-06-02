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
  initialSortingState,
  initialFiltersState,
  initialMultiFilterState,
  initialUsersFilterState
} from 'src/constants';

export const getFiltersDataSelector = createSelector(
  ({ filter: { data } }: IStoreState): IFilterData =>
    data || ({} as IFilterData),
  data => data
);

export const getCompanySizeFilter = createSelector(
  ({ filter: { data } }: IStoreState): ICompanySize[] =>
    data?.company_size || [],
  data => data
);

export const getCompanyTypesFilter = createSelector(
  ({ filter: { data } }: IStoreState): string[] => data?.company_type || [],
  data => data
);

export const getRolesFilter = createSelector(
  ({ filter: { data } }: IStoreState): string[] => data?.user_roles || [],
  data => data
);

export const getOriginsFilter = createSelector(
  ({ filter: { data } }: IStoreState): string[] => data?.origin || [],
  data => data
);

export const getFilterSettings = createSelector(
  ({ filter: { settings } }: IStoreState): IContactFilter =>
    settings || { search: {}, sort: {} },
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
  ({ filter: { usersSettings } }: IStoreState): IFilter => usersSettings || {},
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
