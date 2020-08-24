import React from 'react';
import { styleNames } from 'src/services';
import style from '../CompanyPage.scss';

const sn = styleNames(style);

export const Footer = () => {
  return (
    <div className={sn('footContainer')}>
      <p>footer</p>
    </div>
  );
};
