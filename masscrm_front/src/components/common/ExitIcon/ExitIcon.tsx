import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { IExitIconProps } from './interfaces';
import styles from './ExitIcon.scss';

const sn = styleNames(styles);

export const ExitIcon: FC<IExitIconProps> = ({ onClickHandler }) => {
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
          button.keyCode === 13 && button.key === 'Enter' && onClickHandler();
        })
      }
    >
      <svg className={`${sn('icon')} ${!!onClickHandler && sn('icon_active')}`}>
        {icon}
      </svg>
    </span>
  ) : (
    <span>
      <svg className={sn('icon')}>{icon}</svg>
    </span>
  );
};
