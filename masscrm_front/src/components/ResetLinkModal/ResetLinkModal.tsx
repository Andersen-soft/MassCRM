import React, { FC, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { ResetLink } from 'src/components/ResetLink/ResetLink';
import { dialogStyle } from './ResetLinkModal.style';

interface IModalProps {
  open: boolean;
  onClose: (val: boolean) => void;
  userId: number;
  setUserLogin: (val?: string) => void;
  openAlert?: () => void;
}

export const ResetLinkModal: FC<IModalProps> = ({
  open,
  onClose,
  userId,
  openAlert,
  setUserLogin
}) => {
  const style = dialogStyle();

  const handleClose = useCallback(() => {
    onClose(false);
  }, []);

  return (
    <Dialog classes={{ root: style.dialog }} open={open}>
      <ResetLink
        handleClose={handleClose}
        id={userId}
        openAlert={openAlert}
        setUserLogin={setUserLogin}
      />
    </Dialog>
  );
};
