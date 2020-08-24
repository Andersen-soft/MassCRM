import { FC, PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { IEditContent } from './IEditContent';

export interface IEditPopup {
  tdProps: PropsWithChildren<TableCellBaseProps>;
  editProps?: any;
  ContentTD: FC;
  ContentEdit: FC<any & IEditContent>;
  disabled?: boolean;
}
