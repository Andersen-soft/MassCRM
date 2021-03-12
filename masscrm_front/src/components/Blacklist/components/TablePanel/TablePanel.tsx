import React, { useCallback, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import { Publish, PermIdentity } from '@material-ui/icons';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import { tooltipStyle } from 'src/styles/ToolTip.style';
import { Tooltip } from '@material-ui/core';
import { DownloadReportModal } from 'src/components/Contact/components/TableTools/components';
import { formatDateFilter } from 'src/utils/form/date';
import { setShowCount, startExport } from 'src/actions/blacklist.action';
import { LabelIconGroup } from 'src/components/common/LabelIconGroup';
import {
  getBlacklistFilter,
  getBlacklistLength,
  getShowCountBlacklist,
  showBlacklistItem
} from 'src/selectors/blacklist.selector';
import { CommonIcon } from 'src/components/common/CommonIcon';
import { setPage } from 'src/actions';
import { SHOW_COUNTS_BLACKLIST } from 'src/constants';
import { ShowCountSelect } from 'src/components/common';
import style from './TablePanel.scss';
import { BlacklistTable } from '../BlacklistTable';
import { IPropsTablePanel } from '../../interfaces';

const sn = styleNames(style);

export const TablePanel = ({
  showTable,
  changeShowTable,
  blacklistPage
}: IPropsTablePanel) => {
  const styleTooltip = tooltipStyle();
  const dispatch = useDispatch();
  const dataLength = useSelector(getBlacklistLength);
  const showBlacklist = useSelector(showBlacklistItem);
  const filtersState = useSelector(getBlacklistFilter);
  const showCount = useSelector(getShowCountBlacklist);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const closePopup = useCallback(() => setShowReportModal(false), []);

  const handleChangeShowCount = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    dispatch(setPage(1));
    dispatch(setShowCount(event.target.value as number));
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
    <div className={sn('table-panel')}>
      <div className={sn('table-panel__flex')}>
        <div>
          <div className={sn('title')}> Blacklist </div>
          <button type='button' className={sn('button')}>
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
          <Tooltip title='Export blacklist to the file' classes={styleTooltip}>
            <div>
              <CommonIcon
                IconComponent={Publish}
                className={sn('table-search__icon')}
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
          {Boolean(dataLength) && (
            <div className={sn('panel_item')}>
              <LabelIconGroup
                label='Total'
                count={dataLength}
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
          )}
        </div>
      </div>
      <CSSTransition in={showTable} timeout={400} unmountOnExit>
        <BlacklistTable showCount={showCount} blacklistPage={blacklistPage} />
      </CSSTransition>
      <DownloadReportModal
        open={showReportModal}
        onClose={closePopup}
        message='Data export will take time. You will be notified once this action is complete.'
      />
    </div>
  );
};
