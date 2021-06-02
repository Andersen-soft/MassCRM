import React from 'react';
import { applicationPath } from 'src/constants';
import { useStyles } from './ChangeResponsible.styles';

export const ChangeResponsibleIcon = () => {
  const styles = useStyles();

  return (
    <svg className={styles.icon}>
      <use
        className={styles.parentStyle}
        xlinkHref={`${applicationPath}assets/svg/sprite.svg#changeResponsible`}
      />
    </svg>
  );
};
