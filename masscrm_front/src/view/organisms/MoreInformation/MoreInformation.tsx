import React, { FC, useMemo, useState, MouseEvent } from 'react';
import { MoreVert } from '@material-ui/icons';
import { Popover, SvgIconProps, Tooltip } from '@material-ui/core';
import { tooltipStyles } from 'src/styles';
import { BOTTOM, CENTER, getPositionConfig, LEFT, TOP } from 'src/constants';
import { OpenBtn } from './components';
import { useStyles } from './MoreInformation.styles';

interface IProps {
  clearAutocompleteList?: () => void;
  icon?: FC<SvgIconProps>;
  popperInfo?: JSX.Element | Element;
  tooltip?: string;
  notification?: boolean;
  autoClose?: boolean;
}

export const MoreInformation: FC<IProps> = ({
  popperInfo,
  icon,
  tooltip,
  clearAutocompleteList,
  notification,
  autoClose
}) => {
  const styles = useStyles();
  const tooltipClasses = tooltipStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const id = open ? 'simple-popper' : undefined;

  const handleClick = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : currentTarget);
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
    <div className={styles.more}>
      {tooltip ? (
        <Tooltip title={tooltip} placement={TOP} classes={tooltipClasses}>
          <div>{openModeBtn}</div>
        </Tooltip>
      ) : (
        openModeBtn
      )}
      <Popover
        className={
          notification
            ? `${styles.popover} ${styles.notification}`
            : styles.popover
        }
        id={id}
        open={open}
        onClick={autoClose ? handleClose : undefined}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={getPositionConfig(BOTTOM, LEFT)}
        transformOrigin={getPositionConfig(TOP, CENTER)}
      >
        {popperInfo}
      </Popover>
    </div>
  );
};
