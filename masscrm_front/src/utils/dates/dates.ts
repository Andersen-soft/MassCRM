import { parseISO, format } from 'date-fns';
import { DD_MM_YYYY } from 'src/constants';
import { formatDateFilter } from 'src/utils/form/date';

export const getDatesPeriod = (
  dates: (string | Date)[],
  datesRangeKeys?: string[],
  dateFormat?: string
) => {
  return dates.length &&
    dates.every((val: string | Date) => typeof val === 'string')
    ? formatDateFilter(
        [parseISO(`${dates[0]}`), parseISO(`${dates[1]}`)],
        datesRangeKeys,
        dateFormat
      )
    : formatDateFilter(dates as Date[], datesRangeKeys, dateFormat);
};

export const getDateOfFormatYYYY_MM = ({ from, to }: any) => ({
  from: from.substr(0, 7),
  to: to.substr(0, 7)
});

export const currentDay = new Date();

const firstDayOfMonth = new Date(
  currentDay.getFullYear(),
  currentDay.getMonth(),
  1
);

const lastDayOfMonth = new Date(
  currentDay.getFullYear(),
  currentDay.getMonth() + 1,
  0
);

export const currentMonthPeriod = `${format(
  firstDayOfMonth,
  DD_MM_YYYY
)} - ${format(lastDayOfMonth, DD_MM_YYYY)}`;
