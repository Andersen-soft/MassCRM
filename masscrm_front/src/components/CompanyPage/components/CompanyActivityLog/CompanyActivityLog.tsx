import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyActivityLog } from 'src/actions';
import { getCompanyActivityLogSelector } from 'src/selectors';
import { ActivityLog } from 'src/components/common/ActivityLog';
import { format } from 'date-fns';
import { IChangePageArgs, ISearchParams } from './interfaces';

const initialParams = {
  page: 1,
  limit: 5,
  query: undefined,
  from: undefined,
  to: undefined
};

export const CompanyActivityLog: FC<{ id: number }> = ({ id }) => {
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

  const onChangeSearch = (searchWord: string) => {
    setSearchParams(prev => ({
      ...prev,
      query: searchWord || undefined
    }));
  };

  const handleDateOfChange = (name: string, value: Date[]) => {
    const [dateFrom, dateTo] = value;
    setSearchParams(prev => ({
      ...prev,
      from: dateFrom && format(dateFrom, 'dd-MM-yyyy'),
      to: dateTo && format(dateTo, 'dd-MM-yyyy')
    }));
  };

  const onPaginationChange = (
    event: ChangeEvent<unknown>,
    currentPage: number
  ) => {
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
    <ActivityLog
      activityLog={activityLog}
      changePageHandler={changePageHandler}
      onChangeSearch={onChangeSearch}
      searchParams={searchParams}
      handleDateOfChange={handleDateOfChange}
      onPaginationChange={onPaginationChange}
    />
  ) : null;
};
