import React, { FC, useState, useCallback, useEffect } from 'react';
import { Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { isSameDay } from 'date-fns';
import { EventNote, Close } from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { styleNames } from 'src/services';
import { DateRangePicker } from './components';
import myStyle from './DateRange.scss';
import { IDateRangeProps } from './interfaces/IDateRangeProps';

const sn = styleNames(myStyle);

export const DateRange: FC<IDateRangeProps> = ({
  date,
  changeFilter,
  name,
  onChange,
  hasDataRangeFilter,
  ...props
}) => {
  const [dates, setDates] = useState<Array<Date>>(date || []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const clearDate = useCallback(() => setDates([]), []);

  const openCalendar = useCallback(() => setIsOpen(true), []);

  const closeCalendar = useCallback((value?: Date[]) => {
    if (!hasDataRangeFilter) {
      name && onChange(name, value || []);
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (name && dates?.length && dates[0] && dates[1]) {
      if (changeFilter) {
        changeFilter({ name, item: dates });
      }
    }
  }, [dates]);

  const disabledDate = useCallback(
    (day: Date) => isSameDay(day, new Date('2020-08-20')),
    []
  );

  const handleDateChange = (value?: Array<Date>) => {
    setDates(value || []);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box className={sn('date-range')}>
        <DateRangePicker
          {...props}
          value={dates}
          onlyCalendar
          hasDataRangeFilter={hasDataRangeFilter}
          PickerComponent={DatePicker}
          shouldDisableDate={disabledDate}
          onOpen={openCalendar}
          onClose={closeCalendar}
          onChange={handleDateChange}
        />
        {dates.length > 0 && !isOpen ? (
          <Close
            fontSize='small'
            className={sn('date-range_icon')}
            onClick={clearDate}
          />
        ) : (
          <EventNote fontSize='small' className={sn('date-range_icon')} />
        )}
      </Box>
    </MuiPickersUtilsProvider>
  );
};
