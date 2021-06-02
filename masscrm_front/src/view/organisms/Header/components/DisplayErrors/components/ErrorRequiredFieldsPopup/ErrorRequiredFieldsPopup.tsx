import { DialogContent } from '@material-ui/core';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';
import React, { FC, useCallback, useState } from 'react';
import { CancelEditModal } from 'src/view/modals';
import { CommonIcon } from 'src/view/atoms';
import { CLOSE_FORM_CONFIRM } from 'src/constants';
import { ContactAddErrorBody } from './components';
import { useStyles } from './ErrorRequiredFieldsPopup.styles';

interface IProps {
  open: boolean;
  handleClose: Function;
  handleToggleEditContact: any;
  errorsData: string[];
}

export const ErrorRequiredFieldsPopup: FC<IProps> = ({
  open,
  handleClose,
  handleToggleEditContact,
  errorsData
}) => {
  const styles = useStyles();

  const [openMessage, setOpenMessage] = useState(false);

  const handleToggle = useCallback(() => {
    if (open && !openMessage) {
      return setOpenMessage(true);
    }
    return handleClose();
  }, [open, openMessage, setOpenMessage, handleClose]);

  const handleToggleMessage = useCallback(
    (shouldClose: boolean) => (): void => {
      setOpenMessage(false);
      shouldClose && handleClose();
    },
    []
  );

  return (
    <div className={styles.wrapper}>
      <CommonIcon
        className={styles.close}
        IconComponent={CloseRoundedIcon}
        onClick={handleToggle}
      />
      <DialogContent classes={{ root: styles.content }}>
        <ContactAddErrorBody
          handleToggleEditContact={handleToggleEditContact}
          errorsData={errorsData}
        />
      </DialogContent>
      <CancelEditModal
        open={openMessage}
        onClose={handleToggleMessage(false)}
        onConfirm={handleToggleMessage(true)}
        message={CLOSE_FORM_CONFIRM}
      />
    </div>
  );
};
