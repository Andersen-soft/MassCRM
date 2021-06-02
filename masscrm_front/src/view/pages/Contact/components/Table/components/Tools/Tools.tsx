import React, { FC, useCallback } from 'react';
import { GetApp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import {
  getUserRoles,
  openImportModalAction,
  closeImportModalAction,
  getIsImportModalOpen
} from 'src/store/slices';
import { CommonIcon } from 'src/view/atoms';
import { ImportModal } from 'src/view/modals';
import { FiltersStateType } from 'src/interfaces';
import { MainFilters } from 'src/view/organisms';
import { tooltipStyles } from 'src/styles';
import { TOP_START } from 'src/constants';
import { KebabMenu, DownloadReport, ColumnsFilter } from './components';
import { useStyles } from './Tools.styles';
import { IContactFilter } from '../../../../../../../interfaces';

interface IProps {
  autocompleteValues: (name: string) => string[];
  onChangeFilter?: (obj: FiltersStateType) => void;
  initialFilters: FiltersStateType;
  handleChangeInput: (value: string, name: string) => void;
  resetAllFilters: () => void;
  selectedContacts: number[];
  rowsForJob?: boolean;
  filterValues: IContactFilter;
}

export const Tools: FC<IProps> = ({
  autocompleteValues,
  onChangeFilter,
  initialFilters,
  handleChangeInput,
  resetAllFilters,
  selectedContacts,
  rowsForJob,
  filterValues
}) => {
  const dispatch = useDispatch();

  const userRole = useSelector(getUserRoles);
  const isImportModalOpen = useSelector(getIsImportModalOpen);

  const isFullTable = !!userRole?.manager || !!userRole?.superAdmin;

  const styles = useStyles();
  const tooltipClasses = tooltipStyles();

  const handleOpenImportModal = useCallback(() => {
    dispatch(openImportModalAction(true));
  }, [dispatch]);

  const handleCloseImportModal = useCallback(() => {
    dispatch(closeImportModalAction(false));
  }, [dispatch]);

  return (
    <>
      <div className={styles.tableTools}>
        <MainFilters
          isFullTable={isFullTable}
          resetAllFilters={resetAllFilters}
          handleChangeInput={handleChangeInput}
          initialFilters={initialFilters}
          autocompleteValues={autocompleteValues}
          onChangeFilter={onChangeFilter}
          rowsForJob={rowsForJob}
        />
        <div className={styles.tableToolsItem}>
          <ColumnsFilter
            isFullTable={!!isFullTable}
            rowsForJob={!!rowsForJob}
          />
          <Tooltip
            title='Import contacts from the file'
            classes={tooltipClasses}
            placement={TOP_START}
          >
            <div className={styles.tooltip} data-testid='import_button'>
              <CommonIcon
                IconComponent={GetApp}
                onClick={handleOpenImportModal}
              />
            </div>
          </Tooltip>
          {isFullTable && (
            <DownloadReport
              selectedContacts={selectedContacts}
              filters={filterValues}
            />
          )}
          <div className={styles.tooltip} data-testid='kebab_menu'>
            <KebabMenu isFullFunctionality={isFullTable} />
          </div>
        </div>
      </div>
      <ImportModal open={isImportModalOpen} onClose={handleCloseImportModal} />
    </>
  );
};
