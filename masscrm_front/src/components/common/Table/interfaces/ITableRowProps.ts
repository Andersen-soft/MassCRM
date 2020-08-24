import { ITableRow, ITableBodyConfig, ITableColumnConfig } from '.';

export interface ITableRowProps {
  row: ITableRow;
  config: ITableColumnConfig;
  data: ITableBodyConfig;
  onSelect?: (id: number) => void;
  currentPage?: number;
}
