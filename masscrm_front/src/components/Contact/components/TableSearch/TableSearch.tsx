import React, { FC, useCallback } from 'react';
import { styleNames } from 'src/services';
import { DateRange, CommonButton, CommonInput } from 'src/components/common';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getAddContactList, setFilterValues, setPage } from 'src/actions';
import { getFilterSettings, getFilterValues } from 'src/selectors';
import { IContactSearch, IGlobalContactSearch } from 'src/interfaces';
import { format, parse } from 'date-fns';
import style from './TableSearch.scss';

const sn = styleNames(style);

interface ITableSearchInputs {
  search?: string;
  date?: Date[];
}

export const TableSearch: FC<{ isToday?: boolean }> = ({ isToday }) => {
  const dispatch = useDispatch();
  const filters = useSelector(getFilterSettings);
  const values = useSelector(getFilterValues);
  const currentDay = new Date();
  const getData = () => {
    if (isToday) {
      return [currentDay, currentDay];
    }
    const {
      global: { from, to }
    } = values;
    const dateFrom = from && parse(from, 'dd-MM-yyyy', new Date());
    const dateTo = to && parse(to, 'dd-MM-yyyy', new Date());
    return dateFrom && dateTo ? [dateFrom, dateTo] : [];
  };

  const initialValues: ITableSearchInputs = {
    search: values.global.query || '',
    date: getData()
  };

  const onSubmit = useCallback(
    ({ date: [from, to], search: query }) => {
      const global: IGlobalContactSearch = {
        from: from && format(new Date(from), 'dd-LL-y'),
        to: to && format(new Date(to), 'dd-LL-y'),
        query: query || undefined
      };
      dispatch(setPage(1));
      dispatch(
        getAddContactList({
          ...filters,
          search: {
            ...filters.search,
            global
          } as IContactSearch,
          page: 1
        })
      );
      dispatch(setFilterValues({ ...values, global }));
    },
    [filters, values]
  );

  const resetGlobalDateFilter = () => {
    dispatch(
      setFilterValues({
        ...values,
        global: { ...values.global, from: undefined, to: undefined }
      })
    );
    dispatch(setPage(1));
    dispatch(
      getAddContactList({
        ...filters,
        search: {
          ...filters.search,
          global
        } as IContactSearch,
        page: 1
      })
    );
  };

  const {
    values: { search, date },
    handleSubmit,
    handleChange,
    setFieldValue
  } = useFormik({ initialValues, onSubmit });

  return (
    <div className={sn('table-search')}>
      <form className={sn('table-search__item')} onSubmit={handleSubmit}>
        <div className={sn('table-search__input')}>
          <CommonInput
            onChangeValue={handleChange}
            name='search'
            value={search}
            placeholder='Search'
          />
        </div>
        {!isToday && (
          <>
            <div className={sn('table-search__input')}>
              <DateRange
                name='date'
                hasDataRangeFilter
                date={date}
                placeholder='Choose'
                singular={false}
                onChange={setFieldValue}
                resetDateFilter={resetGlobalDateFilter}
              />
            </div>
            <div className={sn('table-search__input')} data-testid='search_btn'>
              <CommonButton
                text='Search'
                type='submit'
                onClickHandler={handleSubmit}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};
