import React, { FC, useState } from 'react';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { Modal } from 'src/components/common/Modal';
import { CommonIcon } from '../CommonIcon';
import { styleNames } from '../../../services';
import style from './UsersTitle.scss';

const sn = styleNames(style);

export const UsersTitle: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={sn('users-title')}>
      <div className={sn('users-title-title')}>CRM Users</div>
      <button
        id='add-user-modal-button'
        className={sn('users-title-btn')}
        type='button'
        onClick={handleClickOpen}
      >
        <CommonIcon IconComponent={AddCircleOutlineRounded} />
      </button>
      <Modal open={open} onClose={handleClose} />
    </div>
  );
};
