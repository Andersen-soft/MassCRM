import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'flex-start',
      flexDirection: 'column'
    },
    dropZone: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      position: 'relative',
      width: 230,
      fontSize: 14,
      color: '#212121',
      overflow: 'hidden',
      paddingTop: 9,
      backgroundPosition: 'top',
      backgroundRepeat: 'repeat-x',
      borderColor: '#E1E5ED',
      borderWidth: 2,
      borderStyle: 'dashed',
      boxSizing: 'border-box'
    },
    rectangle: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    dropZoneField: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginLeft: 11,
      marginBottom: 11,
      cursor: 'default'
    },
    uploadIcon: {
      color: '#DADADA',
      marginRight: 11
    },
    dropZoneFieldText: {
      minWidth: 21,
      textAlign: 'center',
      margin: '0 8px 0 0'
    },
    uploadArea: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 140,
      height: 32,
      border: '1px solid #B6BECF',
      boxSizing: 'border-box',
      borderRadius: 50,
      background: '#FFFFFF'
    },
    uploadAreaBlocked: {
      cursor: 'pointer'
    },
    filePicture: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 42,
      height: 64
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
