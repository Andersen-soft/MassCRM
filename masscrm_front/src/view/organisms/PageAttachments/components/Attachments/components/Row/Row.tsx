import React, { FC, useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Delete, GetApp } from '@material-ui/icons';
import { CommonIcon } from 'src/view/atoms';
import { IAttachment } from 'src/interfaces';
import { BLANK, NO_REFERRER } from 'src/constants';
import { useStyles } from './Row.styles';

interface IProps {
  element: IAttachment;
  deleteHandler: (id: number) => void;
}

export const Row: FC<IProps> = ({
  element: {
    id,
    url,
    user: { name },
    createdAt,
    fileName
  },
  deleteHandler
}) => {
  const styles = useStyles();

  const deleteItem = useCallback(() => id && deleteHandler(id), [
    deleteHandler,
    id
  ]);

  return (
    <TableRow>
      <TableCell
        align='left'
        className={styles.firstColumn}
        component='th'
        scope='row'
      >
        <a href={url} target={BLANK} rel={NO_REFERRER} className={styles.link}>
          {fileName}
        </a>
      </TableCell>
      <TableCell align='left' className={styles.middleColumn}>
        {name}
      </TableCell>
      <TableCell align='left' className={styles.middleColumn}>
        {createdAt}
      </TableCell>
      <TableCell align='right' className={styles.forthFifthColumn}>
        <a
          href={url}
          download
          target={BLANK}
          rel={NO_REFERRER}
          className={styles.link}
        >
          <CommonIcon IconComponent={GetApp} />
        </a>
      </TableCell>
      <TableCell className={styles.forthFifthColumn}>
        <CommonIcon IconComponent={Delete} onClick={deleteItem} />
      </TableCell>
    </TableRow>
  );
};
