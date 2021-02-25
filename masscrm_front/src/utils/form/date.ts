import { format, max, min } from 'date-fns';

export const formatDateFilter = (value: Date[]) => ({
  min: value?.length ? format(min(value), 'yyyy-MM-dd') : undefined,
  max: value?.length ? format(max(value), 'yyyy-MM-dd') : undefined
});
