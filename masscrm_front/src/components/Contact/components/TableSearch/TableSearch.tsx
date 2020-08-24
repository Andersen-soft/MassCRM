import React, { FC, useCallback, useState } from 'react';
import { GetApp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import {
  SearchInput,
  DateRange,
  CommonButton,
  CommonIcon
} from 'src/components/common';
import { importActions } from 'src/actions/import.action';
import { IStoreState } from 'src/interfaces';
import { ContactModal } from '../ContactModal';
import { ColumnsFilter } from './components';
import style from './TableSearch.scss';
import { DownloadReport } from './components/DownloadReport';

const sn = styleNames(style);

export const TableSearch: FC<{ isFullTable: boolean }> = ({ isFullTable }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>();
  const [dateValue, setDateValue] = useState<Array<Date>>([]);
  const importStatus = useSelector(
    (state: IStoreState) => state.import.importStatus
  );

  const handleToggle = () => {
    setOpen(val => !val);
  };

  const handleOpenImportModal = useCallback(() => {
    dispatch(importActions.openImportModalAction());
  }, [dispatch]);

  return (
    <div className={sn('table-search')}>
      <div className={sn('table-search__item')}>
        <div className={sn('table-search__input')}>
          <SearchInput
            value={searchValue}
            placeholder='Search'
            items={[]}
            onChange={setSearchValue}
          />
        </div>
        <div className={sn('table-search__input')}>
          <DateRange
            name='choose'
            hasDataRangeFilter
            date={dateValue}
            placeholder='Choose'
            singular={false}
            onChange={setDateValue}
          />
        </div>
      </div>
      <div className={sn('table-search__item')}>
        {isFullTable && (
          <>
            <CommonButton
              color='yellow'
              onClickHandler={handleToggle}
              text='Add Contact'
            />
            <ContactModal handleClose={handleToggle} open={open} />
          </>
        )}
        <ColumnsFilter isFullTable />
        {isFullTable && (
          <div className={sn('tooltip')}>
            <CommonIcon
              IconComponent={GetApp}
              className={sn('table-search__icon')}
              onClick={handleOpenImportModal}
              disabled={importStatus !== 'none'}
            />
            <span className={sn('tooltipText')}>
              Import contacts from the file
            </span>
          </div>
        )}
        <DownloadReport />
      </div>
    </div>
  );
};
