import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    fieldsBlock: {
      width: 'calc(100% + 48px)',
      marginLeft: -24,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-around',
      overflowY: 'scroll',
      overflowX: 'hidden',
      maxHeight: 212
    },
    fieldsContainer: {
      width: '100%',
      padding: '8px 64px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    fieldLabel: {
      paddingTop: 8,
      paddingRight: 8
    },
    fieldLabelText: {
      width: 100,
      textAlign: 'right',
      overflow: 'hidden'
    },
    searchField: {
      width: 230
    },
    importedData: {
      color: '#212121',
      paddingTop: 16,
      paddingBottom: 8
    },
    table: {
      overflowY: 'hidden'
    }
  }),
  { name: 'FieldMatching' }
);
