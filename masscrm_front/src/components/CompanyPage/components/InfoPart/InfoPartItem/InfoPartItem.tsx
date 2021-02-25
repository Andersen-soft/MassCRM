import { Tooltip } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { tooltipStyle } from 'src/styles/ToolTip.style';
import { styleNames } from 'src/services';
import { cutStringWithEllipsis } from 'src/utils/string';
import style from './InfoPartItem.scss';

const sn = styleNames(style);

const Item: FC<{
  title: string;
  value: string;
  isLink?: boolean;
}> = ({ value, title, isLink }) => {
  const styleTooltip = tooltipStyle();
  const getValue = () => (value ? cutStringWithEllipsis(value, 40) : '');

  return (
    <div className={sn('item')}>
      <span className={sn('spanLeft')}>{title}:</span>
      {isLink ? (
        <Tooltip
          title={value || ''}
          placement='top-start'
          classes={styleTooltip}
        >
          <a
            href={value}
            rel='noreferrer'
            target='_blank'
            className={`${sn('spanRight')} ${sn('link')}`}
          >
            {getValue()}
          </a>
        </Tooltip>
      ) : (
        <Tooltip
          title={value || ''}
          placement='top-start'
          classes={styleTooltip}
        >
          <span className={sn('spanRight')}>{getValue()}</span>
        </Tooltip>
      )}
    </div>
  );
};

export const InfoPartItem = memo(Item);
