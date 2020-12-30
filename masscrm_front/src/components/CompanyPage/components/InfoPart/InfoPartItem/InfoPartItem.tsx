import React, { FC, memo } from 'react';
import { styleNames } from 'src/services';
import style from './InfoPartItem.scss';

const sn = styleNames(style);

const Item: FC<{
  title: string;
  value: string;
  isLink?: boolean;
}> = ({ value, title, isLink }) => (
  <div className={sn('item')}>
    <span className={sn('spanLeft')}>{title}:</span>
    {isLink ? (
      <a
        href={value}
        rel='noreferrer'
        target='_blank'
        className={`${sn('spanRight')} ${sn('link')}`}
      >
        {value}
      </a>
    ) : (
      <span className={sn('spanRight')}>{value}</span>
    )}
  </div>
);

export const InfoPartItem = memo(Item);
