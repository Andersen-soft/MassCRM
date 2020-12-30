import React, { FC, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { ResetLink } from 'src/components/ResetLink/ResetLink';
import { dialogStyle } from './ResetLinkModal.style';

interface IModalProps {
  open: boolean;
  onClose: (val: boolean) => void;
  id: number;
  setUserLogin: (val?: string) => void;
  openAlert?: () => void;
}

export const ResetLinkModal: FC<IModalProps> = ({
  open,
  onClose,
  id,
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
        id={id}
        openAlert={openAlert}
        setUserLogin={setUserLogin}
      />
    </Dialog>
  );
};
