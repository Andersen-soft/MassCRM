import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CommonButton } from 'src/view/atoms';
import { getUsersSelector, sendResetLink } from 'src/store/slices';
import { IUser } from 'src/interfaces';
import { useStyles } from './ResetLink.styles';

interface IProps {
  handleClose: () => void;
  id: number;
  setUserLogin: (val?: string) => void;
  openAlert?: () => void;
}

export const ResetLink: FC<IProps> = ({
  handleClose,
  id,
  openAlert,
  setUserLogin
}) => {
  const styles = useStyles();

  const currentUser: IUser[] = useSelector(getUsersSelector).filter(
    ({ id: itemId }: IUser) => itemId === id
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
