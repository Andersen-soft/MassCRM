import React, { FC, useMemo } from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';
import { useStyles } from './Header.styles';

interface IProps {
  headData: (string | number)[];
}

export const Header: FC<IProps> = props => {
  const styles = useStyles(props);

  const { headData } = props;

  const cellClasses = useMemo(
    () => ({
      head: styles.cell
    }),
    [styles.cell]
  );

  return (
    <TableHead>
      <TableRow>
        {headData.map((headItem: string | number) => (
          <TableCell classes={cellClasses} key={headItem}>
            {headItem}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
