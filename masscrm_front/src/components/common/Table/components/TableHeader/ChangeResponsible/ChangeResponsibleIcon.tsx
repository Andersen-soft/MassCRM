import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { applicationPath } from 'src/constants';
import styles from './ChangeResponsible.scss';

const sn = styleNames(styles);

export const ChangeResponsibleIcon: FC = () => {
  return (
    <svg className={sn('icon')}>
      <use
        className={sn('parent-style')}
        xlinkHref={`${applicationPath}assets/svg/sprite.svg#changeResponsible`}
      />
    </svg>
  );
};
