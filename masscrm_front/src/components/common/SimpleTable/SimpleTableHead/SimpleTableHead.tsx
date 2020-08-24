import * as React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

import { useStyles } from './SimpleTableHead.styles';

interface Props {
  headData: Array<string | number>;
}

export const SimpleTableHead: React.FC<Props> = props => {
  const classes = useStyles(props);
  const { headData } = props;
  const cellClasses = React.useMemo(
    () => ({
      head: classes.cell
    }),
    [classes.cell]
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
