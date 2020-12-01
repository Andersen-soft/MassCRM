import React, { FC, memo } from 'react';
import { styleNames } from 'src/services';
import style from '../InfoPart.scss';

const sn = styleNames(style);

const Item: FC<{
  key?: number | string;
  title: string;
  value?: Element | string;
}> = ({ key, value, title }) => {
  return (
    <div className={sn('item')} key={key || title}>
      <span className={sn('spanLeft')}>{title}:</span>
      <span className={sn('spanRight')}>{value}</span>
    </div>
  );
};

export const InfoPartItem = memo(Item);
