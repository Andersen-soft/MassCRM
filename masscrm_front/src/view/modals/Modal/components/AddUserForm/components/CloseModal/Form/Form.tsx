import React, { FC } from 'react';
import { CommonButton } from 'src/view/atoms';
import { useStyles } from './Form.styles';

interface IProps {
  handleClose: () => void;
  onClose: () => void;
}

export const CloseModalForm: FC<IProps> = ({ handleClose, onClose }) => {
  const styles = useStyles();

  return (
    <div className={styles.mainBlock}>
      <div className={styles.mainTitle}>
        Do you want to cancel adding a new user?
      </div>
      <div>
        <CommonButton
          size='big'
          color='white'
          text='No'
          onClickHandler={handleClose}
        />
        <CommonButton
          size='big'
          color='yellow'
          text='Yes'
          onClickHandler={() => {
            handleClose();
            onClose();
          }}
        />
      </div>
    </div>
  );
};
