import React, { FC } from 'react';
import { PermIdentity, Publish } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { SHOW_COUNTS_CONTACTS_TABLE } from 'src/constants';
import { useDispatch } from 'react-redux';
import { setPage, setShowCountContacts } from 'src/actions';
import {
  CommonIcon,
  DateRange,
  LabelIconGroup,
  ShowCountSelect
} from 'src/components/common';
import style from './TablePanel.scss';

const sn = styleNames(style);

export const TablePanel: FC<{
  total?: number;
  show?: number;
}> = ({ total = 1, show = 1 }) => {
  const dispatch = useDispatch();

  const handleChangeShowCount = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    dispatch(setPage(1));
    dispatch(setShowCountContacts(event.target.value as number));
  };

  return (
    <div className={sn('panel')}>
      <div className={sn('panel_title')}>Report page</div>
      <div className={sn('panel_item')}>
        <DateRange
          name='date'
          hasDataRangeFilter
          date={[new Date(), new Date()]}
          placeholder='Choose'
          singular={false}
          onChange={() => {}}
          resetDateFilter={() => {}}
        />
        <div className={sn('tooltip')}>
          <CommonIcon
            IconComponent={Publish}
            className={sn('panel_export-icon')}
            onClick={() => {}}
            disabled={false}
            // TODO add functionality in the corresponding task in the near future
            // disabled={disabled || !totalContactsLength}
          />
          <span className={sn('tooltipText')}>Export contacts to the file</span>
        </div>
      </div>
      <div className={sn('panel_item')}>
        <ShowCountSelect
          handleChangeShowCount={handleChangeShowCount}
          showCount={show}
          countConfig={SHOW_COUNTS_CONTACTS_TABLE}
        />
        <LabelIconGroup
          label='Total'
          count={total || 0}
          icon={PermIdentity}
          isActive
        />
        <LabelIconGroup
          label='Show'
          count={show || 0}
          icon={PermIdentity}
          isActive
          className={sn('panel_label')}
        />
      </div>
    </div>
  );
};

export default TablePanel;
