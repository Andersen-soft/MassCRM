import React from 'react';

import { styleNames } from 'src/services';
import style from './PopUp.scss';
import { CommonButton } from '../CommonButton';
import { IContactFormInputs } from '../ContactForm/interfaces';

interface IPopUp {
  value?: string | IContactFormInputs;
  questionMessage: string | JSX.Element;
  onClose: () => void;
  onConfirm: any;
  helpers?: any;
}

const sn = styleNames(style);

export const DefaultPopUp = ({
  value,
  questionMessage,
  onConfirm,
  onClose,
  helpers
}: IPopUp) => {
  const handleClick = () => {
    if (value) {
      onClose();
      return onConfirm(value, helpers || true);
    }
    return onConfirm();
  };

  return (
    <div className={sn('wrapperTwo')}>
      {typeof questionMessage === 'string' ? (
        <p className={sn('question')}>{questionMessage}</p>
      ) : (
        questionMessage
      )}
      <div className={sn('buttons')}>
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
