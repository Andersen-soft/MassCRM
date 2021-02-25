import React, { FC } from 'react';
import { InfoBox } from 'src/components/common';
import { styleNames } from 'src/services';
import { IMock } from '../..';

import style from './UsersInfo.scss';

interface IUsersInfo {
  usersInfo: IMock[];
}

const sn = styleNames(style);

export const UsersInfo: FC<IUsersInfo> = ({ usersInfo }) => (
  <div className={sn('wrapper')}>
    {usersInfo.map((item, index: number) => {
      const fieldsConfig = Object.keys(item).map(key => ({
        title: key,
        descr: item[key]
      }));
      // TODO for key put 'id' when backend will be implemented
      return <InfoBox key={index} fieldsConfig={fieldsConfig} />;
    })}
  </div>
);

export default UsersInfo;
