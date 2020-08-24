import React, { FC, useState, MouseEvent } from 'react';
import { Popover } from '@material-ui/core';
import { SingleInputForm } from 'src/components/common/SingleInputForm';
import { ITableCellText } from './interfaces';

export const TableCellText: FC<ITableCellText> = ({
  value,
  className,
  onSubmitChanges,
  required,
  link,
  td,
  validation
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDoubleClickHandler = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onChangeValue = () => false;

  const inputProps = { value, onChangeValue, required };

  return (
    <>
      <td className={className} onDoubleClick={onDoubleClickHandler}>
        {td ||
          (link ? (
            <a href={value} rel='noreferrer' target='_blank'>
              {link}
            </a>
          ) : (
            <div>{value}</div>
          ))}
      </td>
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
        <SingleInputForm
          inputProps={inputProps}
          onSubmit={onSubmitChanges}
          onCancel={handleClose}
          validation={validation}
        />
      </Popover>
    </>
  );
};
