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
}> = ({ title, total, show }) => {
  return (
    <div className={sn('panel')}>
      <div className={sn('panel_item')}>
        <div className={sn('panel_title')}>{title}</div>
      </div>
      <div className={sn('panel_item')}>
        {total ? (
          <LabelIconGroup
            label='Total'
            count={total}
            icon={PermIdentity}
            isActive
          />
        ) : null}
        {show ? (
          <LabelIconGroup
            label='Show'
            count={show}
            icon={PermIdentity}
            isActive
          />
        ) : null}
      </div>
    </div>
  );
};

export const TablePanel = memo(Panel);
