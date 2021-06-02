import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    commentTD: {
      maxWidth: '290px'
    },
    commentTDContent: {
      maxWidth: '290px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    commentEditContent: {
      maxWidth: '290px',
      padding: '8px',
      maxHeight: '200px',
      wordBreak: 'break-word'
    }
  })
);
