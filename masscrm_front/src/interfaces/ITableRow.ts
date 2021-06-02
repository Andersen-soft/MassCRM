import { ITableCell } from 'src/interfaces';

export interface ITableRow {
  id: number;
  cells: ITableCell[];
  disableResetPassword?: boolean;
  isSelected?: boolean;
  selectItem?: () => void;
}
