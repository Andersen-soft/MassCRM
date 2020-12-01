import {
  IContactFiltersState,
  IFilterValuesUsers,
  IUserFiltersValues,
  IBlacklistFiltersState,
  IExportInputFilterValues
} from 'src/interfaces';
import { IFilterValue, ITableConfig, ITableRow, TOpen } from '.';

export interface ITableProps {
  config: ITableConfig;
  clearAutocompleteList?: () => void;
  currentPage?: number;
  count?: number;
  onChangePage?: Function;
  changeFilter?: (
    obj: IFilterValue | IUserFiltersValues | IExportInputFilterValues
  ) => void;
  resetFilter?: (name: string) => void;
  autocompleteValues?: (name: string) => string[];
  changeInput?: (value: string, name: string) => void;
  filtersValues:
    | IFilterValuesUsers
    | IContactFiltersState
    | IBlacklistFiltersState
    | IExportInputFilterValues;
  inputFilter?: Function;
  data: Array<ITableRow>;
  onChangeData?: (fun: (item: ITableRow) => boolean) => void;
  onDeleteData?: (ids: Array<number>) => void;
  onEdit?: (id: number, type?: TOpen) => void;
  otherHeight?: any;
  isFullTable?: boolean;
}
