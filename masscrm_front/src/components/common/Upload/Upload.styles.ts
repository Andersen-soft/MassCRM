import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'flex-start',
      flexDirection: 'column'
    },
    customInputFile: {
      height: 0.1,
      opacity: 0,
      overflow: 'hidden',
      position: 'absolute',
      width: 0.1,
      zIndex: -1
    },
    uploadBtn: {
      margin: 0
    },
    label: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 32,
      width: '100%',
      borderRadius: 50,
      cursor: 'pointer'
    },
    fileInfoContainer: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      padding: '8px 0',
      overflow: 'hidden'
    },
    fileInfo: {
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      fontSize: 12,
      color: '#78829D',
      width: 'calc(100% - 24px)'
    },
    iconBtn: {
      padding: 5
    },
    closeIcon: {
      fontSize: 14
    },
    fileName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    fileSize: {
      paddingLeft: 5,
      whiteSpace: 'nowrap'
    }
  }),
  { name: 'Upload' }
);
