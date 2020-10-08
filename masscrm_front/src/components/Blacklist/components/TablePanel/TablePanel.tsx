import React, { useCallback, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { styleNames } from 'src/services';
import { Publish, PermIdentity } from '@material-ui/icons';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DownloadReportModal } from 'src/components/Contact/components/TableSearch/components';
import { tooltipStyle } from 'src/components/common/Table/Table.style';
import { formatDateFilter } from 'src/utils/form/date';
import { setShowCount, startExport } from 'src/actions/blacklist.action';
import { LabelIconGroup } from 'src/components/common/LabelIconGroup';
import {
  getBlacklistFilter,
  getBlacklistLength,
  getShowCount,
  showBlacklistItem
} from 'src/selectors/blacklist.selector';
import { CommonIcon } from 'src/components/common/CommonIcon';
import { setPage } from 'src/actions';
import style from './TablePanel.scss';
import { BlacklistTable } from '../BlacklistTable';
import { IPropsTablePanel, IShowCountItem } from '../../interfaces';
import { useStyles } from './TablePanel.styles';

const sn = styleNames(style);

const SHOW_COUNTS: Array<IShowCountItem> = [
  { title: 'Show 5', value: 5 },
  { title: 'Show 10', value: 10 },
  { title: 'Show 15', value: 15 }
];

export const TablePanel = ({
  showTable,
  changeShowTable
}: IPropsTablePanel) => {
  const classes = useStyles();
  const styleTooltip = tooltipStyle();
  const dispatch = useDispatch();
  const dataLength = useSelector(getBlacklistLength);
  const showBlacklist = useSelector(showBlacklistItem);
  const filtersState = useSelector(getBlacklistFilter);
  const showCount = useSelector(getShowCount);
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
              />
            </div>
          </Tooltip>
          <Select
            className={classes.countSelect}
            variant='outlined'
            value={showCount}
            onChange={handleChangeShowCount}
          >
            {SHOW_COUNTS.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
          {Boolean(dataLength) && (
            <div className={sn('panel_item')}>
              <LabelIconGroup
                label='Total'
                count={dataLength}
                icon={PermIdentity}
                isActive
              />
              <LabelIconGroup
                label='Show'
                count={showBlacklist}
                icon={PermIdentity}
                isActive
              />
            </div>
          )}
        </div>
      </div>
      <CSSTransition in={showTable} timeout={400} unmountOnExit>
        <BlacklistTable showCount={showCount} />
      </CSSTransition>
      <DownloadReportModal
        open={showReportModal}
        onClose={closePopup}
        message='Data export will take time. You will be notified once this action is complete.'
      />
    </div>
  );
};
