import React from 'react';
import { styleNames } from 'src/services';
import style from '../CompanyPage.scss';

const sn = styleNames(style);

export const LeftColumn = () => {
  return (
    <div className={sn('leftContainer')}>
      <p>Company Info</p>
    </div>
  );
};
