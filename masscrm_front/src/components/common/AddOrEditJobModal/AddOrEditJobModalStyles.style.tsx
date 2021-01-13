import { createStyles, makeStyles } from '@material-ui/core';

export const modalStyles = makeStyles(() =>
  createStyles({
    modal: {
      '& .MuiDialog-paperWidthLg': {
        width: '448px',
        height: '340px'
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
