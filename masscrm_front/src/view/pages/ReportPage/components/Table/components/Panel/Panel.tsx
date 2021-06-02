import React, { FC, useCallback, ChangeEvent } from 'react';
import { PermIdentity, Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPage,
  getShowCountReport,
  getUserRoles,
  getReportTotalCount,
  setShowCountReport
} from 'src/store/slices';
import { CommonIcon, ShowCountSelect } from 'src/view/atoms';
import { LabelIconGroup, DateRange } from 'src/view/molecules';
import { IFilterValue } from 'src/interfaces';
import { currentMonthPeriod } from 'src/utils/dates';
import { SHOW_COUNTS_REPORT_TABLE } from './constants';
import { useStyles } from './Panel.styles';

interface IProps {
  // IFilterValue improve
  changeFilter: (obj: IFilterValue) => void;
  resetFilter: (name: string) => void;
  datesRange?: any;
}

export const Panel: FC<IProps> = ({
  changeFilter,
  resetFilter,
  datesRange
}) => {
  const dispatch = useDispatch();
  const showCount = useSelector(getShowCountReport);
  const userRole = useSelector(getUserRoles);
  // TODO remove comments after export implementation
  // const userRole = useSelector(getUserRoles);
  const total = useSelector(getReportTotalCount);

  const handleChangeShowCount = ({
    target: { value }
  }: ChangeEvent<{ value: unknown }>) => {
    dispatch(setPage(1));
    dispatch(setShowCountReport(value as number));
  };

  const mockDate = useCallback(() => new Date().toISOString(), []);

  const styles = useStyles();

  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>Report page</div>
      {/* TODO remove comments after export implementation */}
      <div className={styles.panelItem}>
        <DateRange
          data-testid='date_filter'
          code='date'
          name='date'
          date={datesRange}
          hasDataRangeFilter
          placeholder={!datesRange ? currentMonthPeriod : ''}
          onChange={mockDate}
          changeFilter={changeFilter}
          resetDateFilter={resetFilter}
        />
        {/* <div className={styles.tooltip}> */}
        {userRole.manager && (
          <CommonIcon
            data-testid='export_contacts'
            IconComponent={Publish}
            className={styles.panelExportIcon}
            onClick={() => {}}
            disabled
          />
        )}
        <span className={styles.tooltipText}>Export contacts to the file</span>
        {/* </div> */}
      </div>
      <div className={styles.panelItem}>
        <ShowCountSelect
          handleChangeShowCount={handleChangeShowCount}
          showCount={showCount}
          countConfig={SHOW_COUNTS_REPORT_TABLE}
          data-testid='report-show-contacts'
        />
        <LabelIconGroup
          data-testid='total'
          label='Total'
          count={total}
          icon={PermIdentity}
          isActive
        />
        <LabelIconGroup
          data-testid='show'
          label='Show'
          count={showCount}
          icon={PermIdentity}
          isActive
          className={styles.panelLabel}
        />
      </div>
    </div>
  );
};

export default Panel;
