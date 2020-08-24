import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { applicationPath } from 'src/constants';
import { socialNetworks } from 'src/data/socialNetworks';
import { ISocialIconProps } from './interfaces';
import styles from './SocialIcon.scss';

const sn = styleNames(styles);

export const SocialIcon: FC<ISocialIconProps> = ({ link, socialName }) => {
  const icon = (
    <use
      xlinkHref={`${applicationPath}assets/svg/sprite.svg#${
        socialNetworks.includes(socialName) ? socialName : 'angel'
      }`}
    />
  );

  return link ? (
    <a href={link} rel='noreferrer' target='_blank'>
      <svg className={`${sn('icon')} ${!!link && sn('icon_active')}`}>
        {icon}
      </svg>
    </a>
  ) : (
    <span>
      <svg className={sn('icon')}>{icon}</svg>
    </span>
  );
};
