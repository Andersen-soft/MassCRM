import React, { FC, useCallback } from 'react';
import Lottie from 'react-lottie';
import { GetApp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getImportStatus, getUserRoles } from 'src/selectors';
import { openImportModalAction } from 'src/actions';
import importAnimation from 'src/lotties/importAnimation.json';
import { CommonIcon } from 'src/components/common/CommonIcon';
import { styleNames } from 'src/services';
import {
  IMultiFilterState,
  FiltersStateType,
  FiltersTypes
} from 'src/interfaces';
import {
  ColumnsFilter,
  DownloadReport,
  KebabMenu,
  MainFilters
} from './components';
import style from './TableTools.scss';

const sn = styleNames(style);

interface ITableToolsProps {
  autocompleteValues: (name: string) => string[];
  onChangeFilter?: (obj: FiltersStateType) => void;
  filtersState: FiltersStateType;
  multiFiltersState: IMultiFilterState;
  handleChangeInput: (value: string, name: string) => void;
  resetFilter: (resetObject: FiltersTypes) => void;
}

const defaultOptions = {
  autoplay: true,
  renderer: 'svg',
  animationData: importAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const TableTools: FC<ITableToolsProps> = ({
  autocompleteValues,
  onChangeFilter,
  filtersState,
  multiFiltersState,
  handleChangeInput,
  resetFilter
}) => {
  const dispatch = useDispatch();
  const importStatus = useSelector(getImportStatus);
  const userRole = useSelector(getUserRoles);
  const isFullTable = !!userRole?.manager || !!userRole?.superAdmin;

  const handleOpenImportModal = useCallback(() => {
    dispatch(openImportModalAction(true));
  }, [dispatch]);

  return (
    <div className={sn('table-tools')}>
      <MainFilters
        isFullTable={isFullTable}
        resetFilter={resetFilter}
        handleChangeInput={handleChangeInput}
        filtersState={filtersState}
        multiFiltersState={multiFiltersState}
        autocompleteValues={autocompleteValues}
        onChangeFilter={onChangeFilter}
      />
      <div className={sn('table-tools_item')} />
      <div className={sn('table-tools_item')}>
        <ColumnsFilter isFullTable />
        {importStatus === 'processing' ? (
          <div>
            <Lottie
              options={defaultOptions}
              height={24}
              width={24}
              isClickToPauseDisabled
            />
          </div>
        ) : (
          <div className={sn('tooltip')}>
            <CommonIcon
              IconComponent={GetApp}
              className={sn('table-tools__icon')}
              onClick={handleOpenImportModal}
            />
            <span className={sn('tooltipText')}>
              Import contacts from the file
            </span>
          </div>
        )}
        {isFullTable && <DownloadReport />}
        <KebabMenu isFullFunctionality={isFullTable} />
      </div>
    </div>
  );
};
