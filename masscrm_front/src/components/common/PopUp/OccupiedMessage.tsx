import React from 'react';
import { styleNames } from 'src/services';
import style from './PopUp.scss';

interface IPopUp {
  message: string[];
}

const sn = styleNames(style);

export const OccupiedMessage = ({ message }: IPopUp) => {
  return (
    <div className={sn('wrapperThree')}>
      {message.map(item => (
        <p key={item} className={sn('occupied')}>
          {item}
        </p>
      ))}
    </div>
  );
};
