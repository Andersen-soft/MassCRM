import React, { FC, useCallback, useState } from 'react';
import { GetApp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import { SearchInput, DateRange, CommonIcon } from 'src/components/common';
import { openImportModalAction } from 'src/actions/import.action';
import importAnimation from 'src/lotties/importAnimation.json';
import Lottie from 'react-lottie';
import { getImportStatus } from 'src/selectors';
import { ColumnsFilter, KebabMenu } from './components';
import style from './TableSearch.scss';
import { DownloadReport } from './components/DownloadReport';

const sn = styleNames(style);

const defaultOptions = {
  autoplay: true,
  renderer: 'svg',
  animationData: importAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const TableSearch: FC<{ isFullTable: boolean }> = ({ isFullTable }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>();
  const [dateValue, setDateValue] = useState<Array<Date>>([]);
  const importStatus = useSelector(getImportStatus);

  const handleOpenImportModal = useCallback(() => {
    dispatch(openImportModalAction(true));
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
        <ColumnsFilter isFullTable />
        {importStatus === 'processing' ? (
          <Lottie
            options={defaultOptions}
            height={24}
            width={24}
            isClickToPauseDisabled
          />
        ) : (
          <div className={sn('tooltip')}>
            <CommonIcon
              IconComponent={GetApp}
              className={sn('table-search__icon')}
              onClick={handleOpenImportModal}
            />
            <span className={sn('tooltipText')}>
              Import contacts from the file
            </span>
          </div>
        )}
        {isFullTable && <DownloadReport />}
        {isFullTable && <KebabMenu />}
      </div>
    </div>
  );
};
