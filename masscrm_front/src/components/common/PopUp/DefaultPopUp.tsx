import React from 'react';

import { styleNames } from 'src/services';
import style from './PopUp.scss';
import { CommonButton } from '../CommonButton';

interface IPopUp {
  questionMessage: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

const sn = styleNames(style);

export const DefaultPopUp = ({
  questionMessage,
  onConfirm,
  onClose
}: IPopUp) => {
  return (
    <div className={sn('wrapperTwo')}>
      <p className={sn('question')}>{questionMessage}</p>
      <div className={sn('buttons')}>
        <CommonButton onClickHandler={onClose} text='Cancel' />
        <CommonButton
          onClickHandler={onConfirm}
          text='Confirm'
          color='yellow'
        />
      </div>
    </div>
  );
};
