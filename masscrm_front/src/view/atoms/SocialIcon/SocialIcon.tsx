import React, { FC } from 'react';
import { Tooltip } from '@material-ui/core';
import {
  applicationPath,
  BLANK,
  BOTTOM,
  NO_REFERRER,
  socialNetworks
} from 'src/constants';
import { tooltipStyles } from 'src/styles';
import { useStyles } from './SocialIcon.styles';

interface IProps {
  link?: string;
  socialName: string;
}

export const SocialIcon: FC<IProps> = ({ link, socialName }) => {
  const styles = useStyles();
  const tooltipClasses = tooltipStyles();

  const icon = (
    <use
      xlinkHref={`${applicationPath}assets/svg/sprite.svg#${
        socialNetworks.includes(socialName) ? socialName : 'angel'
      }`}
    />
  );
  const href = socialName === 'skype' && link ? `skype:${link}` : link;

  return href && link ? (
    <Tooltip title={link} placement={BOTTOM} classes={tooltipClasses}>
      <a href={href} rel={NO_REFERRER} target={BLANK}>
        <svg className={`${styles.icon} ${!!link && styles.activeIcon}`}>
          {icon}
        </svg>
      </a>
    </Tooltip>
  ) : null;
};
