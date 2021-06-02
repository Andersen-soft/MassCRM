import React, { FC, useMemo } from 'react';
import { TableContainer, TableBody, Table, Paper } from '@material-ui/core';
import { uniqueId } from 'lodash';
import { Row, Header } from './components';
import { useStyles } from './SimpleTable.styles';

interface IProps {
  rows: (string | number | null)[][];
  headData: (string | number)[];
  className?: string;
}

export const SimpleTable: FC<IProps> = props => {
  const styles = useStyles(props);

  const { className = '', headData, rows } = props;

  const rootClasses = useMemo(
    () => ({
      root: `${styles.root} ${className}`
    }),
    [className, styles.root]
  );
  const bodyClasses = useMemo(
    () => ({
      root: styles.tableBody
    }),
    [styles.tableBody]
  );

  return (
    <TableContainer component={Paper} classes={rootClasses}>
      <Table stickyHeader aria-label='sticky table'>
        <Header headData={headData} />
        <TableBody classes={bodyClasses}>
          {rows.map(rowData => (
            <Row key={uniqueId('simple_table_row_')} rowData={rowData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
