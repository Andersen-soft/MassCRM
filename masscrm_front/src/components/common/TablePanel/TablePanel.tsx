import React, { FC, memo } from 'react';
import { PermIdentity } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { LabelIconGroup } from '..';
import style from './TablePanel.scss';

const sn = styleNames(style);

const Panel: FC<{
  title?: string;
  total?: number;
  show?: number;
  Search?: FC;
}> = ({ title, total, show, Search }) => {
  return (
    <div className={sn('panel')}>
      <div className={sn('panel_item')}>
        <div className={sn('panel_title')}>{title}</div>
        {Search && <Search />}
      </div>
      <div className={sn('panel_item')}>
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
