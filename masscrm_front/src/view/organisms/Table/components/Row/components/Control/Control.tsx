import React, {
  FC,
  useState,
  useCallback,
  useMemo,
  SyntheticEvent
} from 'react';
import { useSelector } from 'react-redux';
import { Edit, VpnKeyRounded } from '@material-ui/icons';
import { SvgIconProps, Tooltip } from '@material-ui/core';
import { Modal } from 'src/view/modals';
import { CommonAlert, CommonIcon } from 'src/view/atoms';
import { PASSWORD_LINK_SENT, tooltipMessage, TOP_END } from 'src/constants';
import { getUsersSelector } from 'src/store/slices';
import { DeleteUser, ResetLinkModal } from './components';
import { useStyles } from './Control.styles';

interface IProps {
  icon?: FC<SvgIconProps>;
  id?: number;
  currentPage?: number;
  disableResetPassword?: boolean;
  hasDeleteButton?: boolean;
  fetchUsers?: () => void;
}

export const Control: FC<IProps> = ({
  icon,
  id = 0,
  disableResetPassword,
  fetchUsers
}) => {
  const styles = useStyles();
  const users = useSelector(getUsersSelector);
  const isActive = users.find(item => item.id === id)?.active;

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
    (_: SyntheticEvent<Element, Event>, reason?: string) => {
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
        <Tooltip title={tooltipMessage} placement={TOP_END}>
          <div className={styles.controlBtn}>
            <CommonIcon IconComponent={icon || VpnKeyRounded} />
          </div>
        </Tooltip>
      ) : (
        <button
          id='reset-link-button'
          className={styles.controlBtn}
          type='button'
          onClick={handleClickResetLinkOpen}
        >
          <CommonIcon IconComponent={icon || VpnKeyRounded} />
        </button>
      ),
    []
  );

  return (
    <div className={styles.control}>
      {isActive ? (
        resetPasswordButton
      ) : (
        <DeleteUser userId={id} fetchUsers={fetchUsers} />
      )}
      <button
        id={`edit-user${id}-button`}
        className={styles.controlBtn}
        type='button'
        onClick={handleClickOpen}
      >
        <CommonIcon IconComponent={icon || Edit} />
      </button>

      <Modal open={open} onClose={handleClose} id={id} />

      <ResetLinkModal
        open={openResetLink}
        onClose={handleResetLinkClose}
        userId={id}
        openAlert={handleClickAlert}
        setUserLogin={setUserLogin}
      />

      <CommonAlert
        open={openAlert}
        onClose={handleCloseAlert}
        errorMessage={`${PASSWORD_LINK_SENT} ${currentUser}`}
        type='success'
      />
    </div>
  );
};
