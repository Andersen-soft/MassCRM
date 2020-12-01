import { ICompanySize } from './ICompany';
import {
  IBlacklistFiltersState,
  IContactFiltersState,
  IExportInputFilterValues,
  IFilterValuesUsers,
  IMinMax
} from './index';
import { IGlobalContactSearch } from './IContact';

export type FiltersStateType =
  | IFilterValuesUsers
  | IContactFiltersState
  | IBlacklistFiltersState
  | IExportInputFilterValues;

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
