import React, { useState } from 'react';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { Modal } from 'src/view/modals';
import { CommonIcon } from 'src/view/atoms';
import { useStyles } from './Title.styles';

export const Title = () => {
  const styles = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.userTitle}>
      <div className={styles.userTitleTitle}>CRM Users</div>
      <button
        id='add-user-modal-button'
        className={styles.userTitleBtn}
        type='button'
        onClick={handleClickOpen}
      >
        <CommonIcon IconComponent={AddCircleOutlineRounded} />
      </button>
      <Modal open={open} onClose={handleClose} />
    </div>
  );
};
