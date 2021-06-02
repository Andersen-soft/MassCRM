import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    colConainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    rowConainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    paddingBottom24: {
      paddingBottom: 24
    },
    paddingTop24: {
      paddingTop: 24
    },
    paddingRight40: {
      paddingRight: 40
    },
    labelText: {
      minWidth: 114
    },
    flexWrap: {
      flexWrap: 'wrap'
    },
    aligntStart: {
      alignItems: 'flex-start'
    },
    fileInfo: {
      width: 230
    },
    searchField: {
      width: 230
    },
    commentField: {
      height: 200,
      width: 312
    }
  }),
  { name: 'UploadingSettings' }
);
