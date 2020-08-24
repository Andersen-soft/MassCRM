import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import history from 'src/store/history';
import { rolesConfig, header } from 'src/data/header';
import { IStoreState } from 'src/interfaces/store';
import { getUserRoles } from 'src/selectors';
import { Logo } from '../Logo';
import style from './Header.scss';
import { ExitIcon } from '../ExitIcon';

const sn = styleNames(style);

export const Header: FC = () => {
  const { location } = window;
  const userRole = useSelector(getUserRoles);
  const roles = Object.keys(userRole);

  const mockFun = useCallback(() => {
    Cookies.remove('token');
    location.reload();
  }, []);

  const headerCallBack = useCallback(() => {
    if (roles.length > 0) {
      return rolesConfig.availablePages[roles[0]]?.map(url => {
        const name = header[url.split('/')[1]];
        return (
          <Link
            key={name}
            to={url}
            className={`${sn('header__item')} ${
              history.location.pathname === url ? sn('header__item_active') : ''
            }`}
          >
            <span>{name}</span>
          </Link>
        );
      });
    }
    return false;
  }, [userRole]);

  const user = useSelector((state: IStoreState) => state.users.userData);

  return (
    <header className={sn('header')}>
      <div className={`${sn('header__container')} container`}>
        <div className={sn('header__nav')}>
          <Logo />
          <nav className={sn('header__menu')}>{headerCallBack()}</nav>
        </div>
        <div className={sn('header__btns')}>
          <span className={sn('header__user')}>
            {user?.name ? user.name : ''}
          </span>
          <ExitIcon onClickHandler={mockFun} />
        </div>
      </div>
    </header>
  );
};
