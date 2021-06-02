import { SvgIconProps } from '@material-ui/core';
import { FC } from 'react';

export type Open = 'edit' | 'copy' | boolean;
export interface ITableHeaderItem {
  code: string;
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
  IconComponent?: FC<SvgIconProps<'svg', {}>>;
}

export interface ITableColumnConfig {
  isBold?: boolean;
  hasSelectAll?: boolean;
  hasDelete?: boolean;
  hasEdit?: boolean;
  hasCopy?: boolean;
  hasInfo?: boolean;
  hasControl?: boolean;
  selectedAll?: boolean;
  onDeleteSelected?: (id?: number) => void;
  moreInfoRow?: (id: number) => Element;
  onSelectRow?: (id: number) => (value: boolean) => void;
  onFilteredBy?: (name: string) => void;
  onEdit?: (id: number, type?: Open) => void;
}

export interface ITableBodyConfig {
  selectedRows?: number[];
  filteredBy?: string[];
}

export interface ITableConfig {
  rows: ITableHeaderItem[];
  column: ITableColumnConfig;
  body: ITableBodyConfig;
}
