import React, { FC } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { uniqueId } from 'lodash';

interface IProps {
  rowData: (string | number | null)[];
}

export const Row: FC<IProps> = ({ rowData }) => (
  <TableRow>
    {rowData.map(rowItem => (
      <TableCell key={uniqueId('simple_table_cell_')}>
        {rowItem || ''}
      </TableCell>
    ))}
  </TableRow>
);
