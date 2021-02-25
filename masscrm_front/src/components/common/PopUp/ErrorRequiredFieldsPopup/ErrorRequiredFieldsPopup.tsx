import { DialogContent } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import React, { FC, useCallback, useState } from 'react';
import {
  CancelEditModal,
  ContactAddErrorBody,
  CommonIcon
} from 'src/components/common';
import { styleNames } from 'src/services';
import style from '../PopUp.scss';

import { modalStyles } from './ErrorRequiredFieldsPopup.style';

interface IErrorRequiredFieldsPopup {
  open: boolean;
  handleClose: Function;
  handleToggleEditContact: Function;
  errorsData: string[];
}

const sn = styleNames(style);

export const ErrorRequiredFieldsPopup: FC<IErrorRequiredFieldsPopup> = ({
  open,
  handleClose,
  handleToggleEditContact,
  errorsData
}) => {
  const popupStyles = modalStyles();
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    if (open && !openMessage) {
      setOpenMessage(true);
    } else {
      handleClose();
    }
  }, [open, openMessage, setOpenMessage, handleClose]);

  const handleToggleMessage = useCallback(
    (shouldClose: boolean) => (): void => {
      setOpenMessage(false);
      shouldClose && handleClose();
    },
    []
  );

  return (
    <div className={sn('wrapper')}>
      <CommonIcon
        className={sn('close')}
        IconComponent={CloseRoundedIcon}
        onClick={handleToggle}
      />
      <DialogContent classes={{ root: popupStyles.content }}>
        <ContactAddErrorBody
          handleToggleEditContact={handleToggleEditContact}
          errorsData={errorsData}
        />
      </DialogContent>
      <CancelEditModal
        open={openMessage}
        onClose={handleToggleMessage(false)}
        onConfirm={handleToggleMessage(true)}
        message='Are you sure that you want close that form?'
      />
    </div>
  );
};
