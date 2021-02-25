import React, { FC } from 'react';
import { styleNames } from 'src/services';
import style from './TitlePanel.scss';

const sn = styleNames(style);

export const TitlePanel: FC<{}> = () => {
  return (
    <div className={sn('wrapper')}>
      <div className={sn('title')}>Review page</div>
      <div className={sn('total-block')}>
        <div className={sn('total-block__title')}>Total:</div>
        {/* TODO remove hardcore */}
        <div className={sn('total-block__number')}>9</div>
      </div>
    </div>
  );
};

export default TitlePanel;
