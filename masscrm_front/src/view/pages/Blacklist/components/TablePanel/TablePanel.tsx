import React, { useCallback, useState, FC, ChangeEvent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowDropDownRounded as ArrowDropDownRoundedIcon,
  ArrowDropUpRounded as ArrowDropUpRoundedIcon,
  Publish,
  PermIdentity
} from '@material-ui/icons';
import { tooltipStyles } from 'src/styles';
import { Tooltip } from '@material-ui/core';
import { LabelIconGroup } from 'src/view/molecules';
import { formatDateFilter } from 'src/utils';
import {
  getBlacklistFilter,
  getBlacklistTotalCount,
  getShowCountBlacklist,
  showBlacklistItem,
  setShowCount,
  startExport,
  setPage
} from 'src/store/slices';
import { CommonIcon, ShowCountSelect } from 'src/view/atoms';
import { DownloadReportModal } from 'src/view/modals';
import { EXPORT_SUCCESS_NOTIFICATION } from 'src/constants';
import { Table } from './components';
import { SHOW_COUNTS_BLACKLIST } from './constants';
import { useStyles } from './TablePanel.styles';

interface IProps {
  showTable?: boolean;
  blacklistPage: boolean;
  changeShowTable: () => void;
}

export const TablePanel: FC<IProps> = ({
  showTable,
  changeShowTable,
  blacklistPage
}) => {
  const tooltipClasses = tooltipStyles();
  const styles = useStyles();

  const dispatch = useDispatch();

  const total = useSelector(getBlacklistTotalCount);
  const showBlacklist = useSelector(showBlacklistItem);
  const filtersState = useSelector(getBlacklistFilter);
  const showCount = useSelector(getShowCountBlacklist);

  const [showReportModal, setShowReportModal] = useState(false);

  const closePopup = useCallback(() => setShowReportModal(false), []);

  const handleChangeShowCount = ({
    target: { value }
  }: ChangeEvent<{ value: unknown }>) => {
    dispatch(setPage(1));
    dispatch(setShowCount(value as number));
  };

  const handleChangeVisibleTable = () => {
    changeShowTable();
  };

  const handleClickExport = () => {
    setShowReportModal(true);

    return startExport({
      search: {
        domain: filtersState.blacklist || undefined,
        user: filtersState.user || undefined,
        date: formatDateFilter(filtersState.date)
      }
    });
  };

  return (
    <div className={styles.tablePanel}>
      <div className={styles.tablePanelFlex}>
        <div>
          <div className={styles.title}> Blacklist </div>
          <button type='button' className={styles.button}>
            <span>{showTable ? 'hide' : 'show'}</span>
            <CommonIcon
              IconComponent={
                showTable ? ArrowDropUpRoundedIcon : ArrowDropDownRoundedIcon
              }
              isActive={showTable}
              onClick={handleChangeVisibleTable}
              dataTestId='blacklist-visibility'
            />
          </button>
        </div>
        <div>
          <Tooltip
            title='Export blacklist to the file'
            classes={tooltipClasses}
          >
            <div>
              <CommonIcon
                IconComponent={Publish}
                className={styles.tableSearchIcon}
                onClick={handleClickExport}
                dataTestId='blacklist-export'
              />
            </div>
          </Tooltip>
          <ShowCountSelect
            handleChangeShowCount={handleChangeShowCount}
            showCount={showCount}
            countConfig={SHOW_COUNTS_BLACKLIST}
            data-testid='blacklist-show-contacts'
          />
          <div className={styles.panelItem}>
            <LabelIconGroup
              label='Total'
              count={total}
              icon={PermIdentity}
              dataTestId='blacklist-total'
              isActive
            />
            <LabelIconGroup
              label='Show'
              count={showBlacklist}
              icon={PermIdentity}
              dataTestId='blacklist-show'
              isActive
            />
          </div>
        </div>
      </div>
      <CSSTransition in={showTable} timeout={400} unmountOnExit>
        <Table showCount={showCount} blacklistPage={blacklistPage} />
      </CSSTransition>
      <DownloadReportModal
        open={showReportModal}
        onClose={closePopup}
        message={EXPORT_SUCCESS_NOTIFICATION}
      />
    </div>
  );
};
