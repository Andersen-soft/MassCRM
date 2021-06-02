import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    customCell: {
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        padding: '0 3px'
      }
    },
    customIcon: {
      '& .MuiBox-root': {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom: '5px'
      },
      '& .MuiBox-root-33': {
        float: 'right'
      }
    },
    resetButton: {
      background: 'transparent',
      padding: 0,
      width: '24px',
      height: '24px',
      border: 'none',
      outline: 'none'
    },
    resetButtonNone: {
      display: 'none'
    },
    customTooltip: {
      background: '#fff'
    },
    sortButton: {
      width: '24px',
      display: 'flex',
      height: '24px',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      padding: 0,
      border: 'none',
      outline: 'none'
    },
    iconWrapper: {
      marginRight: '8px'
    }
  })
);

export const tableCellStyles = withStyles((theme: Theme) =>
  createStyles({
    head: {
      background: theme.palette.common.white
    }
  })
);
