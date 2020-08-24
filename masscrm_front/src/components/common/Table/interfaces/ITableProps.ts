import {
  IContactFiltersState,
  IFilterValuesUsers,
  IUserFiltersValues,
  ISortingObject
} from 'src/interfaces';
import { IFilterValue, ITableConfig, ITableRow } from '.';

export interface ITableProps {
  config: ITableConfig;
  clearAutocompleteList?: () => void;
  currentPage?: number;
  count?: number;
  onChangePage?: Function;
  changeFilter?: (obj: IFilterValue | IUserFiltersValues) => void;
  resetFilter?: (name: string) => void;
  autocompleteValues?: (name: string) => string[];
  changeInput?: (value: string, name: string) => void;
  filtersValues: IFilterValuesUsers | IContactFiltersState;
  inputFilter?: Function;
  data: Array<ITableRow>;
  onChangeData?: (fun: (item: ITableRow) => boolean) => void;
  onDeleteData?: (ids: Array<number>) => void;
  onEdit?: (id: number) => void;
  sorting?: (parameter: ISortingObject) => void;
  otherHeight?: string;
}
