import { format, max, min } from 'date-fns';
import { YYYY_MM_DD } from 'src/constants';

export const formatDateFilter = (
  value: Date[],
  datesRangeKeys?: string[],
  dateFormat?: string
) => ({
  [datesRangeKeys ? datesRangeKeys[0] : 'min']: value?.length
    ? format(min(value), dateFormat || YYYY_MM_DD)
    : undefined,
  [datesRangeKeys ? datesRangeKeys[1] : 'max']: value?.length
    ? format(max(value), dateFormat || YYYY_MM_DD)
    : undefined
});
