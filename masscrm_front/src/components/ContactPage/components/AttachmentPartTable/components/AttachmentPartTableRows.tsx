import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, GetApp } from '@material-ui/icons';
import { CommonIcon } from '../../../../common/CommonIcon';
import { IOneContactAttachmentItem } from '../../../../../interfaces/IOneContactData';

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

export const AttachmentPartTableRows = (element: IOneContactAttachmentItem) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell
        align='left'
        className={classes.firstColumn}
        component='th'
        scope='row'
      >
        <a href={element.url} download className={classes.link}>
          {element.fileName}
        </a>
      </TableCell>
      <TableCell align='left' className={classes.middleColumn}>
        {element.user.name}
      </TableCell>
      <TableCell align='left' className={classes.middleColumn}>
        {element.createdAt}
      </TableCell>
      <TableCell align='right' className={classes.forthFifthColumn}>
        <CommonIcon IconComponent={GetApp} />
      </TableCell>
      <TableCell className={classes.forthFifthColumn}>
        <CommonIcon IconComponent={Delete} />
      </TableCell>
    </TableRow>
  );
};
