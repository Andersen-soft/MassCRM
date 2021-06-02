import React from 'react';
import { useStyles } from './Logo.styles';

export const Logo = () => {
  const icon = <use xlinkHref='assets/svg/sprite.svg#logo' />;
  const styles = useStyles();

  return (
    <a href='/'>
      <svg className={styles.icon}>{icon}</svg>
    </a>
  );
};
