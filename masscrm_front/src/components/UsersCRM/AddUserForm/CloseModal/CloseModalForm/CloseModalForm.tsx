import React, { FC } from 'react';
import { CommonButton } from 'src/components/common';
import styles from './CloseModalForm.scss';

interface ICloseModalFormProps {
  handleClose: () => void;
  onClose: () => void;
}

export const CloseModalForm: FC<ICloseModalFormProps> = props => {
  const { handleClose, onClose } = props;

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
