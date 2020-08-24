import React, { FC } from 'react';
import { MoreVert } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { Popover, Tooltip } from '@material-ui/core';
import { IMoreInformationProps } from './interfaces';
import { OpenBtn } from './components';
import style from './MoreInformation.scss';
import { customPopover } from './MoreInformation.style';

const sn = styleNames(style);

export const MoreInformation: FC<IMoreInformationProps> = ({
  popperInfo,
  icon,
  tooltip,
  clearAutocompleteList
}) => {
  const stylePopover = customPopover();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    clearAutocompleteList && clearAutocompleteList();
  };

  const openModeBtn = (
    <OpenBtn
      anchorEl={anchorEl}
      handleClick={handleClick}
      icon={icon || MoreVert}
    />
  );

  return (
    <div className={sn('more')}>
      {tooltip ? <Tooltip title={tooltip}>{openModeBtn}</Tooltip> : openModeBtn}
      <Popover
        className={stylePopover.popover}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {popperInfo}
      </Popover>
    </div>
  );
};
