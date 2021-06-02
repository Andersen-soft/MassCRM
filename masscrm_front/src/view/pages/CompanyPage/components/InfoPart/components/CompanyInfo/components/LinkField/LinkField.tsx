import React, { FC } from 'react';
import { BLANK, NO_REFERRER } from 'src/constants';
import { useStyles } from './LinkField.styles';

interface IProps {
  link?: string;
}

export const LinkField: FC<IProps> = ({ link }) => {
  const styles = useStyles();

  return (
    <a href={link} target={BLANK} rel={NO_REFERRER} className={styles.link}>
      {link}
    </a>
  );
};
