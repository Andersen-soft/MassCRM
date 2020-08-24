import React from 'react';
import { styleNames } from 'src/services';
import style from './PopUp.scss';

interface IPopUp {
  message: string;
}

const sn = styleNames(style);

export const OccupiedMessage = ({ message }: IPopUp) => {
  return (
    <div className={sn('wrapperThree')}>
      <p className={sn('occupied')}>{message}</p>
    </div>
  );
};
