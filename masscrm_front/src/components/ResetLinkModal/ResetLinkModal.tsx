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
  currentPage?: number;
}

export const ResetLinkModal: FC<IModalProps> = props => {
  const style = dialogStyle();

  const { open, onClose, id, openAlert, setUserLogin, currentPage } = props;

  const handleClose = useCallback(() => {
    onClose(false);
  }, []);

  return (
    <Dialog classes={{ root: style.dialog }} open={open}>
      <ResetLink
        currentPage={currentPage || 1}
        handleClose={handleClose}
        id={id}
        openAlert={openAlert}
        setUserLogin={setUserLogin}
      />
    </Dialog>
  );
};
