import React, { FC, useState, useCallback, useEffect } from 'react';
import { Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { isSameDay } from 'date-fns';
import { EventNote, Close } from '@material-ui/icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DateRangePicker } from './components';
import { useStyles, fullWidthStyles } from './DateRange.styles';

interface IProps {
  placeholder: string;
  minDate?: Date;
  maxDate?: Date;
  date?: Date[];
  disabledYear?: boolean;
  singular?: boolean;
  onChange: Function;
  name?: string;
  code: string;
  changeFilter?: (value: {
    code: string;
    item: string | string[] | null | Date[];
    isCheckbox?: boolean;
  }) => void;
  hasDataRangeFilter?: boolean;
  resetDateFilter?: Function;
  styleProp?: 'fullWidth';
}

export const DateRange: FC<IProps> = ({
  date = [],
  changeFilter,
  name,
  code,
  onChange,
  singular,
  hasDataRangeFilter,
  resetDateFilter,
  styleProp,
  ...props
}) => {
  const classes = fullWidthStyles();

  const styles = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);

  const handleDate = useCallback(
    (clear: boolean, value: Date[] = []) => () => {
      if (!value.length && resetDateFilter) {
        resetDateFilter('date');
      }
      setIsCleaned(clear);
      onChange(code, value);
      code && changeFilter && changeFilter({ code, item: value });
    },
    [setIsCleaned, onChange, code, resetDateFilter]
  );

  const openCalendar = useCallback(() => setIsOpen(true), []);

  const closeCalendar = useCallback((value?: Date[]) => {
    if (!hasDataRangeFilter) {
      code && onChange(code, value || []);
    }
    setIsOpen(false);
  }, []);

  const disabledDate = useCallback(
    (day: Date) => isSameDay(day, new Date('2020-08-20')),
    []
  );

  useEffect(() => {
    if (code && date?.length && date[0] && date[1]) {
      if (changeFilter) {
        changeFilter({ code, item: date });
      }
    }
  }, [date]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box
        className={`${styles.dateRange} ${styleProp ? classes[styleProp] : ''}`}
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
        {date.length && !isOpen ? (
          <Close
            fontSize='small'
            className={styles.dateRangeIcon}
            onClick={handleDate(true)}
          />
        ) : (
          <EventNote fontSize='small' className={styles.dateRangeIcon} />
        )}
      </Box>
    </MuiPickersUtilsProvider>
  );
};
