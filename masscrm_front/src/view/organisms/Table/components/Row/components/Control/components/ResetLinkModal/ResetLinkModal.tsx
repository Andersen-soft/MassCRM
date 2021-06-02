import React, { FC, useCallback } from 'react';
import { Dialog } from '@material-ui/core';
import { ResetLink } from './components';
import { useStyles } from './ResetLinkModal.styles';

interface IProps {
  open: boolean;
  onClose: (val: boolean) => void;
  userId: number;
  setUserLogin: (val?: string) => void;
  openAlert?: () => void;
}

export const ResetLinkModal: FC<IProps> = ({
  open,
  onClose,
  userId,
  openAlert,
  setUserLogin
}) => {
  const styles = useStyles();

  const handleClose = useCallback(() => {
    onClose(false);
  }, []);

  return (
    <Dialog classes={{ root: styles.dialog }} open={open}>
      <ResetLink
        handleClose={handleClose}
        id={userId}
        openAlert={openAlert}
        setUserLogin={setUserLogin}
      />
    </Dialog>
  );
};
