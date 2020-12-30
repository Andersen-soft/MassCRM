import React, { FC } from 'react';
import { styleNames } from 'src/services';
import style from '../../Contact.scss';

const sn = styleNames(style);

export const AddContactSearch: FC = () => {
  return (
    <div className={sn('data-search')}>
      <span className={sn('data-title')}>Today&apos;s contact</span>
    </div>
  );
};
