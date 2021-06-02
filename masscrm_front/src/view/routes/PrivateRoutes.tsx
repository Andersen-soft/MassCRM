import React, { FC, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiltersProvider } from '../../contexts';
import { IUser } from '../../interfaces';
import { getWs, websocketActions } from '../../store/slices';
import history from '../../utils/history';
import { Authentication } from '../organisms';
import { ROUTES_CONFIG } from '.';
import { HOME_PATH, NAVIGATION_CONFIG } from '../../constants';

interface IProps {
  user: IUser;
  token?: string;
}

export const PrivateRoutes: FC<IProps> = ({ user, token }) => {
  const dispatch = useDispatch();
  const [userRole] = Object.keys(user.roles);
  const defaultPage = NAVIGATION_CONFIG[userRole]?.defaultPage || HOME_PATH;

  const ws = useSelector(getWs);

  useEffect(() => {
    if (token && !ws) {
      dispatch(websocketActions.connectAction());
    }
  }, [token, ws]);

  if (!token) {
    return <Authentication />;
  }

  if (history.location.pathname === HOME_PATH) {
    return <Redirect to={defaultPage} />;
  }

  return (
    <FiltersProvider>
      {ROUTES_CONFIG.map(
        ({
          key,
          path,
          exact,
          component: Component,
          additionalProps,
          availableFor
        }) => (
          <Route
            key={key}
            path={path}
            exact={exact}
            render={props =>
              availableFor.includes(userRole) && (
                <Component {...props} {...additionalProps} />
              )
            }
          />
        )
      )}
    </FiltersProvider>
  );
};
