import { ICompanySize } from './ICompany';
import {
  IBlacklistFiltersState,
  IContactFiltersState,
  IExportInputFilterValues,
  IFilterValuesUsers,
  IMinMax,
  IUserFiltersValues
} from './index';
import { IGlobalContactSearch } from './IContact';
import { ITableRow } from '../components/common/Table/interfaces';

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
  company_size?: Array<ICompanySize>;
  origin?: Array<string>;
  company_type?: Array<string>;
  export_status?: { [key: string]: string };
}

export interface ISelectedContacts {
  [key: string]: ITableRow[] | undefined | number;
  data?: ITableRow[];
  id?: number;
}
