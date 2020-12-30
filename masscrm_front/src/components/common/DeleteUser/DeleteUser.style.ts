import { createStyles, makeStyles } from '@material-ui/core';

export const dialogStyle = makeStyles(() =>
  createStyles({
    dialog: {
      '& .MuiDialog-paperWidthSm': {
        maxWidth: '1000px',
        maxHeigth: '100px',
        padding: '56px 56px 40px'
      }
    },
    deleteIcon: {
      color: '#DADADA',
      cursor: 'pointer',
      '& :hover': {
        color: '#939BB2'
      }
    },
    modalText: {
      margin: '0 0 48px',
      fontSize: 20,
      color: '#212121',
      textAlign: 'center'
    }
  })
);
