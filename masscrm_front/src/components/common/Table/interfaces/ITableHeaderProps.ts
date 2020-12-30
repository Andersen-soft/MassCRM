import {
  IBlacklistFiltersState,
  IContactFiltersState,
  IFilterValuesUsers,
  IExportInputFilterValues
} from 'src/interfaces';
import { ITableConfig } from './ITableConfig';
import { ITableRow } from './ITableRow';

export interface IFilterValue {
  name: string;
  item: string | string[] | null | Date[];
}

export interface ITableHeaderProps {
  config: ITableConfig;
  resetFilter?: (name: string) => void;
  autocompleteValues?: (value: string) => string[];
  changeFilter?: Function;
  changeInput?: (value: string, name: string) => void;
  filtersValues:
    | IFilterValuesUsers
    | IContactFiltersState
    | IBlacklistFiltersState
    | IExportInputFilterValues;
  inputFilter?: Function;
  data?: Array<ITableRow>;
  clearAutocompleteList?: () => void;
  isFullTable?: boolean;
  currentPage?: number;
}
