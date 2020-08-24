import { ITableCell } from '../components/TableCells/interfaces/ITableCell';

export interface ITableRow {
  id: number;
  cells: Array<ITableCell>;
  disableResetPassword?: boolean;
  isSelected?: boolean;
  selectItem?: () => void;
}
