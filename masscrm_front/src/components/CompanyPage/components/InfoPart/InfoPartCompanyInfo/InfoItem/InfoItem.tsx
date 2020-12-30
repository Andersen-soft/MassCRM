import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { IInfoItem } from 'src/interfaces';
import style from './InfoItem.scss';

const sn = styleNames(style);

export const InfoItem: FC<IInfoItem> = ({
  title,
  value,
  showMore,
  renderItem
}) => (
  <div className={sn('item')} key={title}>
    {renderItem(value, title)}
    {showMore}
  </div>
);
