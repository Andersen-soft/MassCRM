import * as React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import uniqueId from 'lodash.uniqueid';

interface Props {
  rowData: Array<string | number | null>;
}

export const SimpleTableRow: React.FC<Props> = props => {
  const { rowData } = props;

  return (
    <TableRow>
      {rowData.map(rowItem => (
        <TableCell key={uniqueId('simple_table_cell_')}>
          {rowItem || ''}
        </TableCell>
      ))}
    </TableRow>
  );
};
