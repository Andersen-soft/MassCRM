import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCompanyActivityLog,
  getCompanyActivityLogSelector
} from 'src/store/slices';
import { ActivityLog as CommonActivityLog } from 'src/view/organisms';
import { format } from 'date-fns';
import { IChangePageArgs, ISearchParams } from 'src/interfaces';
import { DD_MM_YYYY } from 'src/constants';
import { initialParams } from './constants';

interface IProps {
  id: number;
}

export const ActivityLog: FC<IProps> = ({ id }) => {
  const dispatch = useDispatch();

  const activityLog = useSelector(getCompanyActivityLogSelector);

  const [searchParams, setSearchParams] = useState<ISearchParams>(
    initialParams
  );

  const changePageHandler = useCallback(
    ({ page, query, from, to }: IChangePageArgs) =>
      dispatch(
        getCompanyActivityLog(id, page, searchParams.limit, query, from, to)
      ),
    [dispatch, getCompanyActivityLog, id]
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
      from: dateFrom && format(dateFrom, DD_MM_YYYY),
      to: dateTo && format(dateTo, DD_MM_YYYY)
    }));
  };

  const onPaginationChange = (_: ChangeEvent<unknown>, currentPage: number) => {
    setSearchParams(prev => ({
      ...prev,
      page: currentPage
    }));
  };

  useEffect(() => {
    const { page, from, to, query, limit } = searchParams;

    dispatch(getCompanyActivityLog(id, page, limit, query, from, to));
  }, [id, searchParams.page]);

  return activityLog.meta ? (
    <CommonActivityLog
      activityLog={activityLog}
      changePageHandler={changePageHandler}
      onChangeSearch={onChangeSearch}
      searchParams={searchParams}
      handleDateOfChange={handleDateOfChange}
      onPaginationChange={onPaginationChange}
    />
  ) : null;
};
