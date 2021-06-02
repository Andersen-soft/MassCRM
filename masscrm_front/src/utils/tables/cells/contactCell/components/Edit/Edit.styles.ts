import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    listTDWrap: {
      padding: '8px'
    },
    listTDInput: {
      display: 'block',
      padding: '10px 0'
    },
    icon: {
      padding: '4px'
    },
    listTDBtns: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    listTDBtnsForm: {
      display: 'flex'
    }
  })
);
