import { parseISO } from 'date-fns';
import { formatDateFilter } from 'src/utils/form/date';

export const getDatesPeriod = (dates: (string | Date)[]) => {
  return dates.length &&
    dates.every((val: string | Date) => typeof val === 'string')
    ? formatDateFilter([parseISO(`${dates[0]}`), parseISO(`${dates[1]}`)])
    : formatDateFilter(dates as Date[]);
};
