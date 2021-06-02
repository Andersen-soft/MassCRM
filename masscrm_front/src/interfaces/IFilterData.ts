import {
  IBlacklistFiltersState,
  IContactFiltersState,
  IExportInputFilterValues,
  IFilterValuesUsers,
  IMinMax,
  IUserFiltersValues,
  IGlobalContactSearch,
  ICompanySize,
  ITableRow
} from 'src/interfaces';

export type FiltersStateType =
  | IFilterValuesUsers
  | IContactFiltersState
  | IBlacklistFiltersState
  | IExportInputFilterValues
  | IUserFiltersValues;

export type FiltersTypes = {
  [x: string]:
    | string[]
    | string
    | number
    | (number | Date)[]
    | never[]
    | IMinMax
    | IMinMax[]
    | IGlobalContactSearch;
};

export type FiltersParamsItemType =
  | number[]
  | string
  | string[]
  | (string | string[])[]
  | Date[]
  | null;

export interface IFilterData {
  company_size?: ICompanySize[];
  origin?: string[];
  company_type?: string[];
  export_status?: { [key: string]: string };
  user_roles?: string[];
}

export interface ISelectedContacts {
  [key: string]: ITableRow[] | undefined | number | string | Function;
  data?: ITableRow[];
  id?: number;
  setSelectedContactsAction: Function;
  selectedContactsFilterName: string;
}
