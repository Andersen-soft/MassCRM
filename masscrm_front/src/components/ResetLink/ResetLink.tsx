import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CommonButton } from 'src/components/common';
import { getUsers } from 'src/selectors/user.selector';
import sendResetLink from 'src/services/sendResetLink';
import { IUser } from 'src/interfaces';
import styles from './ResetLink.scss';

interface IResetLinkProps {
  handleClose: () => void;
  id: number;
  setUserLogin: (val?: string) => void;
  openAlert?: () => void;
  currentPage: number;
}

export const ResetLink: FC<IResetLinkProps> = props => {
  const { handleClose, id, openAlert, setUserLogin, currentPage } = props;

  const currentUser: IUser[] = useSelector(getUsers)[currentPage].filter(
    (item: IUser) => item.id === id
  );

  const getResetLink = useCallback(async () => {
    await sendResetLink(id);
    setUserLogin(currentUser[0].login);
    handleClose();
    openAlert && openAlert();
  }, []);

  return (
    <div className={styles.mainBlock}>
      <div className={styles.mainTitle}>
        Send a password reset link to the user
      </div>
      <div className={styles.titleLogin}>{currentUser[0].login}?</div>

      <div>
        <CommonButton
          color='white'
          text='Cancel'
          size='big'
          onClickHandler={handleClose}
        />
        <CommonButton
          color='yellow'
          text='Send'
          size='big'
          onClickHandler={getResetLink}
        />
      </div>
    </div>
  );
};
