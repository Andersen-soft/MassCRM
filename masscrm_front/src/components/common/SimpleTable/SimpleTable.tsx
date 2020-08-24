import * as React from 'react';
import { TableContainer, TableBody, Table, Paper } from '@material-ui/core';
import uniqueId from 'lodash.uniqueid';
import { SimpleTableHead } from './SimpleTableHead';
import { SimpleTableRow } from './SimpleTableRow';
import { useStyles } from './SimpleTable.styles';

interface Props {
  rows: Array<Array<string | number | null>>;
  headData: Array<string | number>;
  className?: string;
}

export const SimpleTable: React.FC<Props> = props => {
  const classes = useStyles(props);
  const { className, headData, rows } = props;

  const rootClasses = React.useMemo(
    () => ({
      root: `${classes.root} ${className || ''}`
    }),
    [className, classes.root]
  );
  const bodyClasses = React.useMemo(
    () => ({
      root: classes.tableBody
    }),
    [classes.tableBody]
  );

  return (
    <TableContainer component={Paper} classes={rootClasses}>
      <Table stickyHeader aria-label='sticky table'>
        <SimpleTableHead headData={headData} />
        <TableBody classes={bodyClasses}>
          {rows.map(rowData => (
            <SimpleTableRow
              key={uniqueId('simple_table_row_')}
              rowData={rowData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
