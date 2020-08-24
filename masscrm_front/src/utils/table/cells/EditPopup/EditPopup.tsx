import React, { FC, MouseEvent, useState } from 'react';
import { Popover } from '@material-ui/core';
import { IEditPopup } from './interfaces';

export const EditPopup: FC<IEditPopup> = ({
  tdProps: { className },
  editProps,
  ContentTD,
  ContentEdit,
  disabled
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const onDoubleClickHandler = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <td className={className} onDoubleClick={onDoubleClickHandler}>
        <ContentTD />
      </td>
      {!disabled && (
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <ContentEdit {...editProps} handleClose={handleClose} />
        </Popover>
      )}
    </>
  );
};
