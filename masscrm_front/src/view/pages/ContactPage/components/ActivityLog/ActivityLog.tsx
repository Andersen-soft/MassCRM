import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ActivityLog as CommonActivityLog } from 'src/view/organisms';
import { getActivityLog, getActivityLogSelector } from 'src/store/slices';
import { IChangePageArgs, ISearchParams } from 'src/interfaces';
import { DD_MM_YYYY } from 'src/constants';
import { initialParams } from './constants';

interface IProps {
  id: number;
}

export const ActivityLog: FC<IProps> = ({ id }) => {
  const dispatch = useDispatch();

  const activityLog = useSelector(getActivityLogSelector);

  const [{ page, limit, query, from, to }, setSearchParams] = useState<
    ISearchParams
  >(initialParams);

  const changePageHandler = useCallback(
    ({
      page: pageArg,
      query: queryArg,
      from: fromArg,
      to: toArg
    }: IChangePageArgs) =>
      dispatch(
        getActivityLog({
          page: pageArg,
          query: queryArg,
          from: fromArg,
          to: toArg
        })
      ),
    [dispatch, getActivityLog, id]
  );

  const onChangeSearch = ({
    target
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchParams(prev => ({
      ...prev,
      query: target.value || undefined
    }));
  };

  const handleDateOfChange = (_: string, value: Date[]) => {
    const [dateFrom, dateTo] = value;

    setSearchParams(prev => ({
      ...prev,
      from: dateFrom ? format(dateFrom, DD_MM_YYYY) : undefined,
      to: dateTo ? format(dateTo, DD_MM_YYYY) : undefined
    }));
  };

  const onPaginationChange = (_: ChangeEvent<unknown>, currentPage: number) => {
    setSearchParams(prev => ({
      ...prev,
      page: currentPage
    }));
  };

  useEffect(() => {
    dispatch(getActivityLog({ id, page, limit, query, from, to }));
  }, [id, page]);

  return activityLog.meta ? (
    <CommonActivityLog
      activityLog={activityLog}
      changePageHandler={changePageHandler}
      onChangeSearch={onChangeSearch}
      searchParams={{ page, from, to, query, limit }}
      handleDateOfChange={handleDateOfChange}
      onPaginationChange={onPaginationChange}
    />
  ) : null;
};
