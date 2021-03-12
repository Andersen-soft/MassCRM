import React, { FC } from 'react';
import { MoreVert } from '@material-ui/icons';
import { CommonIcon } from 'src/components/common/CommonIcon';
import { styleNames } from 'src/services';
import style from '../../MoreInformation.scss';

const sn = styleNames(style);

export const OpenBtn: FC<{
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  icon: FC;
  anchorEl: HTMLElement | null;
}> = ({ handleClick, icon, anchorEl }) => (
  <button
    className={sn('more-btn')}
    type='button'
    onClick={handleClick}
    data-testid='notification_btn'
  >
    <CommonIcon IconComponent={icon || MoreVert} isActive={!!anchorEl} />
  </button>
);
