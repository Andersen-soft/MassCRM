import React, { FC } from 'react';
import { styleNames } from 'src/services';
import style from './LinkField.scss';

const sn = styleNames(style);

export const LinkField: FC<{ link?: string }> = ({ link }) => (
  <a href={link} target='_blank' rel='noreferrer' className={sn('link')}>
    {link}
  </a>
);
