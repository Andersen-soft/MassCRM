import React, { FC, MouseEvent, PropsWithChildren, useState } from 'react';
import { Popover, TableCellBaseProps } from '@material-ui/core';
import { BOTTOM, CENTER, getPositionConfig, TOP } from 'src/constants';

export interface IProps {
  tdProps: PropsWithChildren<TableCellBaseProps>;
  editProps?: any;
  ContentTD: FC;
  ContentEdit: FC<any & IProps>;
  disabled?: boolean;
  doubleClickEdit?: boolean;
}

export const EditPopup: FC<IProps> = ({
  tdProps: { className },
  editProps,
  ContentTD,
  ContentEdit,
  disabled,
  doubleClickEdit
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onDoubleClickHandler = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <td
        className={className}
        onDoubleClick={doubleClickEdit ? onDoubleClickHandler : undefined}
      >
        <ContentTD />
      </td>
      {!disabled && (
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={getPositionConfig(BOTTOM, CENTER)}
          transformOrigin={getPositionConfig(TOP, CENTER)}
        >
          {!!anchorEl && (
            <ContentEdit {...editProps} handleClose={handleClose} />
          )}
        </Popover>
      )}
    </>
  );
};
