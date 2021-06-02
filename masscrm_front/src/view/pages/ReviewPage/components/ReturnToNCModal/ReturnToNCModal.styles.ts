import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      '& .MuiDialog-paperWidthLg': {
        width: '800px'
      },
      '& .MuiDialogContent-root': {
        padding: 0
      },
      '& .MuiDialogTitle-root': {
        padding: '24px'
      },
      '& .title': {
        fontSize: '1.43rem',
        fontWeight: 'normal',
        color: '#212121'
      }
    },
    content: {
      overflowY: 'initial'
    }
  })
);
