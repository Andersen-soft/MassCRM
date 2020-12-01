import React, { FC, useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, GetApp } from '@material-ui/icons';
import { CommonIcon } from 'src/components/common/CommonIcon';
import { IAttachment } from 'src/interfaces';

const useStyles = makeStyles({
  firstColumn: {
    width: '30%',
    borderBottom: 'none',
    paddingLeft: '24px'
  },
  link: {
    color: '#13639D',
    textDecoration: 'none'
  },
  middleColumn: {
    width: '20%',
    borderBottom: 'none'
  },
  forthFifthColumn: {
    width: '1%',
    borderBottom: 'none'
  }
});

export const AttachmentRow: FC<{
  element: IAttachment;
  deleteHandler: (id: number) => void;
}> = ({
  element: {
    id,
    url,
    user: { name },
    createdAt,
    fileName
  },
  deleteHandler
}) => {
  const classes = useStyles();

  const deleteItem = useCallback(() => id && deleteHandler(id), [
    deleteHandler,
    id
  ]);

  return (
    <TableRow>
      <TableCell
        align='left'
        className={classes.firstColumn}
        component='th'
        scope='row'
      >
        <a href={url} target='_blank' rel='noreferrer' className={classes.link}>
          {fileName}
        </a>
      </TableCell>
      <TableCell align='left' className={classes.middleColumn}>
        {name}
      </TableCell>
      <TableCell align='left' className={classes.middleColumn}>
        {createdAt}
      </TableCell>
      <TableCell align='right' className={classes.forthFifthColumn}>
        <a
          href={url}
          download
          target='_blank'
          rel='noreferrer'
          className={classes.link}
        >
          <CommonIcon IconComponent={GetApp} />
        </a>
      </TableCell>
      <TableCell className={classes.forthFifthColumn}>
        <CommonIcon IconComponent={Delete} onClick={deleteItem} />
      </TableCell>
    </TableRow>
  );
};
