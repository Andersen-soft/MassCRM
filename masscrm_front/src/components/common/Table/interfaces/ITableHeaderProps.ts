import {
  IContactFiltersState,
  IFilterValuesUsers,
  ISortingObject
} from 'src/interfaces';
import { ITableConfig } from './ITableConfig';

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
  filtersValues: IFilterValuesUsers | IContactFiltersState;
  inputFilter?: Function;
  data?: Array<object>;
  sorting?: (parameter: ISortingObject) => void;
  clearAutocompleteList?: () => void;
}
