import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { applicationPath } from 'src/constants';
import { socialNetworks } from 'src/data/socialNetworks';
import { Tooltip } from '@material-ui/core';
import { tooltipStyle } from 'src/styles/ToolTip.style';
import { ISocialIconProps } from './interfaces';
import styles from './SocialIcon.scss';

const sn = styleNames(styles);

export const SocialIcon: FC<ISocialIconProps> = ({ link, socialName }) => {
  const styleTooltip = tooltipStyle();
  const icon = (
    <use
      xlinkHref={`${applicationPath}assets/svg/sprite.svg#${
        socialNetworks.includes(socialName) ? socialName : 'angel'
      }`}
    />
  );
  const href = socialName === 'skype' && link ? `skype:${link}` : link;

  return href && link ? (
    <Tooltip title={link} placement='bottom' classes={styleTooltip}>
      <a href={href} rel='noreferrer' target='_blank'>
        <svg className={`${sn('icon')} ${!!link && sn('icon_active')}`}>
          {icon}
        </svg>
      </a>
    </Tooltip>
  ) : null;
};
