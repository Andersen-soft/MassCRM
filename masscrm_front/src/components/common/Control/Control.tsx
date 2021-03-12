import React, {
  FC,
  useState,
  useCallback,
  useMemo,
  SyntheticEvent
} from 'react';
import { Edit, VpnKeyRounded } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { Modal } from 'src/components/common/Modal';
import { CommonAlert } from 'src/components/common/CommonAlert';
import { DeleteUser } from 'src/components/common/DeleteUser';
import { ResetLinkModal } from 'src/components/ResetLinkModal/ResetLinkModal';
import { styleNames } from '../../../services';
import style from './Control.scss';
import { IControlProps } from './interfaces';
import { CommonIcon } from '../CommonIcon';

const sn = styleNames(style);

export const Control: FC<IControlProps> = ({
  icon,
  id,
  disableResetPassword,
  hasDeleteButton,
  fetchUsers
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const [openResetLink, setOpenResetLink] = useState(false);

  const handleClickResetLinkOpen = useCallback(() => {
    setOpenResetLink(true);
  }, []);

  const handleResetLinkClose = useCallback(() => {
    setOpenResetLink(false);
  }, []);

  const [openAlert, setOpenAlert] = useState(false);

  const handleClickAlert = useCallback(() => {
    setOpenAlert(true);
  }, []);

  const handleCloseAlert = useCallback(
    (event: SyntheticEvent<Element, Event>, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    },
    []
  );

  const [currentUser, setCurrentUser] = useState('');

  const setUserLogin = useCallback((login?: string) => {
    login && setCurrentUser(login);
  }, []);

  const resetPasswordButton = useMemo(
    () =>
      disableResetPassword ? (
        <Tooltip
          title='The password change link can only be sent to a user who is not registered by corporate e-mail'
          placement='top-end'
        >
          <div className={sn('control-btn')}>
            <CommonIcon IconComponent={icon || VpnKeyRounded} />
          </div>
        </Tooltip>
      ) : (
        <button
          id='reset-link-button'
          className={sn('control-btn')}
          type='button'
          onClick={handleClickResetLinkOpen}
        >
          <CommonIcon IconComponent={icon || VpnKeyRounded} />
        </button>
      ),
    []
  );

  return (
    <div className={sn('control')}>
      {hasDeleteButton && <DeleteUser userId={id} fetchUsers={fetchUsers} />}
      {resetPasswordButton}
      <button
        id={`edit-user${id}-button`}
        className={sn('control-btn')}
        type='button'
        onClick={handleClickOpen}
      >
        <CommonIcon IconComponent={icon || Edit} />
      </button>

      <Modal open={open} onClose={handleClose} id={id} />

      <ResetLinkModal
        open={openResetLink}
        onClose={handleResetLinkClose}
        userId={id || 0}
        openAlert={handleClickAlert}
        setUserLogin={setUserLogin}
      />

      <CommonAlert
        open={openAlert}
        onClose={handleCloseAlert}
        errorMessage={`Password reset link has been sent to ${currentUser}`}
        type='success'
      />
    </div>
  );
};
