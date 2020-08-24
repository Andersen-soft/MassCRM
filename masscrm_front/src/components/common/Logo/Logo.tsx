import React, { FC } from 'react';
import { styleNames } from 'src/services';
import styles from './Logo.scss';

const sn = styleNames(styles);

export const Logo: FC = () => {
  const icon = <use xlinkHref='assets/svg/sprite.svg#logo' />;

  return (
    <a href='/'>
      <svg className={sn('icon')}>{icon}</svg>
    </a>
  );
};
