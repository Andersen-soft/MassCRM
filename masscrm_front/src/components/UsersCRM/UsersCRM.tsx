import React, { FC } from 'react';
import { UsersTable } from './UsersTable';
import { Header } from '../common/Header';
import { UsersTitle } from '../common/UsersTitle';
import { styleNames } from '../../services';
import style from './UsersCRM.scss';

const sn = styleNames(style);

export const UsersCRM: FC = () => {
  return (
    <>
      <Header />
      <div className={sn('users-wrapper')}>
        <UsersTitle />
        <UsersTable />
      </div>
    </>
  );
};
