import React, { FC } from 'react';
import { IContactFormInputs } from 'src/interfaces';
import { CommonButton } from 'src/view/atoms';
import { useStyles } from './DefaultPopup.styles';

interface IProps {
  value?: string | IContactFormInputs;
  questionMessage: string | JSX.Element;
  onClose: () => void;
  onConfirm: any;
  helpers?: any;
}

export const DefaultPopup: FC<IProps> = ({
  value,
  questionMessage,
  onConfirm,
  onClose,
  helpers
}) => {
  const handleClick = () => {
    if (value) {
      onClose();
      return onConfirm(value, helpers || true);
    }
    return onConfirm();
  };

  const styles = useStyles();

  return (
    <div className={styles.wrapperTwo}>
      {typeof questionMessage === 'string' ? (
        <p className={styles.question}>{questionMessage}</p>
      ) : (
        questionMessage
      )}
      <div className={styles.buttons}>
        <CommonButton onClickHandler={onClose} text='Cancel' />
        <CommonButton
          onClickHandler={handleClick}
          text='Confirm'
          color='yellow'
          type='submit'
        />
      </div>
    </div>
  );
};
