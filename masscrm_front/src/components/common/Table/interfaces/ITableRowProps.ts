import { ITableRow, ITableBodyConfig, ITableColumnConfig } from '.';

export interface ITableRowProps {
  fetchUsers?: () => void;
  row: ITableRow;
  config: ITableColumnConfig;
  data: ITableBodyConfig;
  onSelect?: (id: number) => void;
  currentPage?: number;
  isNC2myContacts?: boolean;
}
