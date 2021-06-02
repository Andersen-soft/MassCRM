import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    edit: {
      padding: '4px',
      background: '#fff'
    },
    editBtn: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    editContent: {
      maxWidth: '290px',
      padding: '8px',
      maxHeight: '200px',
      wordBreak: 'break-word'
    },
    editText: {
      width: '290px',
      minHeight: '200px'
    },
    icon: {
      padding: '4px'
    }
  })
);
