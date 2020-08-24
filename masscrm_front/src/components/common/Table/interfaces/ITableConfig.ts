export interface ITableHeaderItem {
  code?: string;
  name: string;
  hasFilter: boolean;
  isFiltered: boolean;
  hasInputFilter?: boolean;
  hasCheckboxFilter?: boolean;
  hasRadioFilter?: boolean;
  hasMultiSelectFilter?: boolean;
  hasDataRangeFilter?: boolean;
  hasSorting?: boolean;
  hasNumericRangeFilter?: boolean;
}

export interface ITableColumnConfig {
  isBold?: boolean;
  hasSelectAll?: boolean;
  hasDelete?: boolean;
  hasEdit?: boolean;
  hasInfo?: boolean;
  hasControl?: boolean;
  selectedAll?: boolean;
  onSelectAll?: (value: boolean) => void;
  onDeleteSelected?: (id?: number) => void;
  moreInfoRow?: (id: number) => Element;
  onSelectRow?: (id: number) => void;
  onFilteredBy?: (name: string) => void;
  onEdit?: (id: number) => void;
}

export interface ITableBodyConfig {
  selectedRows?: Array<number>;
  filteredBy?: Array<string>;
}

export interface ITableConfig {
  rows: Array<ITableHeaderItem>;
  column: ITableColumnConfig;
  body: ITableBodyConfig;
}
