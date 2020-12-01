import React, { FC, useMemo } from 'react';
import { MoreVert } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { Popover, Tooltip } from '@material-ui/core';
import { tooltipStyle } from 'src/styles/ToolTip.style';
import { IMoreInformationProps } from './interfaces';
import { OpenBtn } from './components';
import style from './MoreInformation.scss';
import { customPopover } from './MoreInformation.style';

const sn = styleNames(style);

export const MoreInformation: FC<IMoreInformationProps> = ({
  popperInfo,
  icon,
  tooltip,
  clearAutocompleteList,
  notification,
  autoClose
}) => {
  const stylePopover = customPopover();
  const styleTooltip = tooltipStyle();
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

  const openModeBtn = useMemo(
    () => (
      <OpenBtn
        anchorEl={anchorEl}
        handleClick={handleClick}
        icon={icon || MoreVert}
      />
    ),
    [anchorEl]
  );

  return (
    <div className={sn('more')}>
      {tooltip ? (
        <Tooltip title={tooltip} placement='top' classes={styleTooltip}>
          <div>{openModeBtn}</div>
        </Tooltip>
      ) : (
        openModeBtn
      )}
      <Popover
        className={
          notification
            ? `${stylePopover.popover} ${stylePopover.notification}`
            : stylePopover.popover
        }
        id={id}
        open={open}
        onClick={autoClose ? handleClose : undefined}
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
