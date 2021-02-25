import React, { FC } from 'react';
import { styleNames } from 'src/services';
import style from './InfoBox.scss';

const sn = styleNames(style);

// interface IFieldsConfigItem {
//   title: string;
//   descr: string | number;
// }

export const InfoBox: FC<{ fieldsConfig: any }> = ({ fieldsConfig }) => (
  <div className={sn('wrapper')}>
    {fieldsConfig.map(({ title, descr }: any, index: number) => (
      <div key={index} className={sn('item-block')}>
        <div className={sn('item-block-wrapper')}>
          <div className={sn('item-block__title')}>{`${title}:`}</div>
          <div className={sn('item-block__descr')}>{descr}</div>
        </div>
      </div>
    ))}
  </div>
);

export default InfoBox;
