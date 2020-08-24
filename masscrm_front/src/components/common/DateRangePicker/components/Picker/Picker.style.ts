import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { styles as dayStyles } from 'material-ui-pickers/DatePicker/components/Day';

export const pickerStyle = makeStyles(() =>
  createStyles({
    MuiInputUnderline: {
      '&:before': {
        content: 'none'
      },
      '&:after': {
        content: 'none'
      }
    },
    MuiPaperRoot: {
      color: '#212121'
    },
    MuiPopoverPaper: {
      '& .MuiTypography-colorPrimary ': {
        color: '#FEDA00'
      },
      margin: '20px 27px',
      color: '#212121',
      '& .MuiPickersBasePicker-pickerView': {
        minWidth: '230px',
        minHeight: '290px',
        justifyContent: 'start'
      },
      '& .MuiPickersCalendar-transitionContainer': {
        minHeight: '140px',
        textAlign: 'center'
      },
      '& .MuiPickersCalendar-week': {
        display: 'inline-flex',
        borderRadius: '30px',
        border: 'solid transparent',
        overflow: 'hidden'
      },
      '& .MuiPickersCalendarHeader-dayLabel': {
        width: '22px'
      }
    },
    MuiPopoverPaperY: {
      '& .MuiPickersCalendarHeader-transitionContainer p': {
        wordSpacing: '200px'
      }
    }
  })
);

export const dayStyle = (theme: Theme) => {
  const base = dayStyles(theme);
  return {
    ...base,
    day: {
      ...base.day,
      margin: 0,
      width: '26px',
      height: '26px',
      borderRadius: '0',
      '&:hover': {
        borderRadius: '100%'
      }
    },
    beginCap: {
      borderRadius: '50% 0 0 50%',
      background: '#feda0038',
      '& .MuiIconButton-label': {
        borderRadius: '50%',
        height: '100%',
        background: '#FEDA00'
      }
    },
    endCap: {
      borderRadius: '0 50% 50% 0',
      background: '#feda0038',
      '& .MuiIconButton-label': {
        borderRadius: '50%',
        height: '100%',
        background: '#FEDA00'
      }
    },
    isSelected: {
      background: '#feda0038'
    }
  };
};
