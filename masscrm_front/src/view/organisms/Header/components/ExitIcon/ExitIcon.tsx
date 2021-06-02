import React, { FC } from 'react';
import { KEY_ENTER } from 'src/constants';
import { useStyles } from './ExitIcon.styles';

interface IProps {
  onClickHandler?: () => void;
}

export const ExitIcon: FC<IProps> = ({ onClickHandler }) => {
  const styles = useStyles();
  const icon = <use xlinkHref='assets/svg/sprite.svg#exit' />;

  return onClickHandler ? (
    <span
      id='logout-button'
      onClick={onClickHandler}
      role='button'
      tabIndex={0}
      onKeyDown={
        onClickHandler &&
        (button => {
          button.key === KEY_ENTER.keyName && onClickHandler();
        })
      }
    >
      <svg className={`${styles.icon} ${!!onClickHandler && styles.active}`}>
        {icon}
      </svg>
    </span>
  ) : (
    <span>
      <svg className={styles.icon}>{icon}</svg>
    </span>
  );
};
