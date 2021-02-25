import React, { FC, useState, useCallback, useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { isSameDay } from 'date-fns';
import { EventNote, Close } from '@material-ui/icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { styleNames } from 'src/services';
import { DateRangePicker } from './components';
import myStyle from './DateRange.scss';
import { IDateRangeProps } from './interfaces/IDateRangeProps';

const sn = styleNames(myStyle);

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%'
  }
}));

export const DateRange: FC<IDateRangeProps> = ({
  date = [],
  changeFilter,
  name,
  onChange,
  singular,
  hasDataRangeFilter,
  resetDateFilter,
  styleProp,
  ...props
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCleaned, setIsCleaned] = useState<boolean>(false);
  const handleDate = useCallback(
    (clear: boolean, value: Date[] = []) => () => {
      if (!value.length && resetDateFilter) {
        resetDateFilter();
      }
      setIsCleaned(clear);
      onChange(name, value);
      name && changeFilter && changeFilter({ name, item: value });
    },
    [setIsCleaned, onChange, name, resetDateFilter]
  );

  const openCalendar = useCallback(() => setIsOpen(true), []);

  const closeCalendar = useCallback((value?: Date[]) => {
    if (!hasDataRangeFilter) {
      name && onChange(name, value || []);
    }
    setIsOpen(false);
  }, []);

  const disabledDate = useCallback(
    (day: Date) => isSameDay(day, new Date('2020-08-20')),
    []
  );

  useEffect(() => {
    if (name && date?.length && date[0] && date[1]) {
      if (changeFilter) {
        changeFilter({ name, item: date });
      }
    }
  }, [date]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box
        className={`${sn('date-range')} ${styleProp ? classes[styleProp] : ''}`}
      >
        <DateRangePicker
          {...props}
          value={date}
          onlyCalendar
          hasDataRangeFilter={hasDataRangeFilter}
          shouldDisableDate={disabledDate}
          onOpen={openCalendar}
          onClose={closeCalendar}
          onChange={handleDate}
          onClean={handleDate(true)}
          singular={singular}
          isCleaned={isCleaned}
          open={isOpen}
          autoOk
        />
        {date.length > 0 && !isOpen ? (
          <Close
            fontSize='small'
            className={sn('date-range_icon')}
            onClick={handleDate(true)}
          />
        ) : (
          <EventNote fontSize='small' className={sn('date-range_icon')} />
        )}
      </Box>
    </MuiPickersUtilsProvider>
  );
};
