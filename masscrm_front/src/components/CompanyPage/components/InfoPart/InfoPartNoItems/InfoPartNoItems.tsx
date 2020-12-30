import React, { FC } from 'react';
import { styleNames } from 'src/services';

import style from './InfoPartNoItems.scss';

const sn = styleNames(style);

export const InfoPartNoItems: FC<{ items: string }> = ({ items }) => (
  <div className={sn('noItems')}>{`There are no ${items} at the moment.`}</div>
);
