import React, { FC, memo } from 'react';
import { PermIdentity } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { SHOW_COUNTS_CONTACTS_TABLE } from 'src/constants';
import { useDispatch } from 'react-redux';
import { setPage, setShowCountContacts } from 'src/actions';
import { ShowCountSelect } from 'src/components/common';
import style from './TablePanel.scss';
import { LabelIconGroup } from '..';

const sn = styleNames(style);

const Panel: FC<{
  title?: string;
  total?: number;
  show?: number;
  Search?: FC;
}> = ({ title, total, show, Search }) => {
  const dispatch = useDispatch();

  const handleChangeShowCount = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    dispatch(setPage(1));
    dispatch(setShowCountContacts(event.target.value as number));
  };

  return (
    <div className={sn('panel')}>
      <div className={sn('panel_item')}>
        <div className={sn('panel_title')}>{title}</div>
        {Search && <Search />}
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

export const TablePanel = memo(Panel);
