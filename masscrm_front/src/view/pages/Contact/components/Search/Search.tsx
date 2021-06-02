import React, { FC, useCallback, useEffect } from 'react';
import { CommonButton, CommonInput } from 'src/view/atoms';
import { useFormik } from 'formik';
import { format, parse } from 'date-fns';
import { IGlobalContactSearch, ITableSearchInputs } from 'src/interfaces';
import { DateRange } from 'src/view/molecules';
import { DD_LL_Y, DD_MM_YYYY, initialFiltersState } from 'src/constants';
import {
  currentDay,
  deleteEmptyFields,
  urlDeserialize,
  urlSerialize
} from 'src/utils';

import history from 'src/utils/history';
import { useStyles } from './Search.styles';

interface IProps {
  isToday?: boolean;
}

export const Search: FC<IProps> = ({ isToday }) => {
  const paramURL = new URLSearchParams(window.location.search);
  const filterParamURL = paramURL.get('filter');
  const filterValue = filterParamURL && urlDeserialize(filterParamURL);

  const styles = useStyles();

  const getData = () => {
    if (isToday) {
      return [currentDay, currentDay];
    }

    const from = filterValue && filterValue?.global?.from;
    const to = filterValue && filterValue?.global?.to;
    const dateFrom = from && parse(from, DD_MM_YYYY, new Date());
    const dateTo = to && parse(to, DD_MM_YYYY, new Date());
    return dateFrom && dateTo ? [dateFrom, dateTo] : [];
  };

  const initialValues: ITableSearchInputs = {
    search: filterValue?.global?.query || '',
    date: getData()
  };

  const onSubmit = useCallback(
    ({ date: [from, to], search: query }) => {
      const global: IGlobalContactSearch = {
        from: from && format(new Date(from), DD_LL_Y),
        to: to && format(new Date(to), DD_LL_Y),
        query: query || undefined
      };
      if (Object.values(global).some(Boolean)) {
        paramURL.set(
          'filter',
          urlSerialize(
            deleteEmptyFields({ ...filterValue, global: { ...global } })
          )
        );
        history.replace({
          search: paramURL.toString()
        });
      }
    },
    [filterValue]
  );

  const resetGlobalDateFilter = () => {
    paramURL.set(
      'filter',
      urlSerialize(
        deleteEmptyFields({
          ...initialFiltersState,
          global: filterValue.global
        })
      )
    );
    history.replace({
      search: paramURL.toString()
    });
  };

  const {
    values: { search, date },
    handleSubmit,
    handleChange,
    setFieldValue
  } = useFormik({ initialValues, onSubmit });

  useEffect(() => {
    if (search?.length && !filterValue?.global?.query) {
      setFieldValue('search', '');
    }
  }, [filterParamURL]);

  return (
    <div className={styles.tableSearch}>
      <form className={styles.tableSearchItem} onSubmit={handleSubmit}>
        <div className={styles.tableSearchInput}>
          <CommonInput
            onChangeValue={handleChange}
            name='search'
            value={search}
            placeholder='Search'
          />
        </div>
        {!isToday && (
          <>
            <div className={styles.tableSearchInput}>
              <DateRange
                name='date'
                code='date'
                hasDataRangeFilter
                date={date}
                placeholder='Choose'
                singular={false}
                onChange={setFieldValue}
                resetDateFilter={resetGlobalDateFilter}
              />
            </div>
            <div className={styles.tableSearchInput} data-testid='search_btn'>
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
