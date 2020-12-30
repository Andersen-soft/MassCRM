import React, { useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import 'src/styles/main.scss';
import { Route, Switch } from 'react-router-dom';
import { continueSession } from 'src/actions/continueSession';
import { setPage } from 'src/actions';
import { getUserRoles } from 'src/selectors';
import { IStoreState } from 'src/interfaces/store';
import { ErrorEmitterProvider, FilterProvider } from 'src/context';
import { ROUTES, AUTH_ROUTES, HOME_PATH, SET_PASSWORD_PATH } from 'src/router';
import { Loader } from '../common/Loader';

const AuthPage = lazy(() => import('../AuthPage/AuthPage'));

export const App = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(getUserRoles);
  const token = Cookies.get('token');

  const user = useSelector((state: IStoreState) => state.users.userData);

  useEffect(() => {
    if (
      (!user && window.location.pathname !== HOME_PATH) ||
      (user && window.location.pathname !== SET_PASSWORD_PATH)
    ) {
      dispatch(setPage());
    }
    if (Cookies.get('token')) {
      dispatch(continueSession());
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <ErrorEmitterProvider>
        <Switch>
          {ROUTES.map(
            ({ key, path, exact, component: Component, additionalProps }) => (
              <Route
                key={key}
                path={path}
                exact={exact}
                render={props => <Component {...props} {...additionalProps} />}
              />
            )
          )}
          <AuthPage token={token} userRole={userRole}>
            <FilterProvider>
              {AUTH_ROUTES.map(
                ({
                  key,
                  path,
                  exact,
                  component: Component,
                  additionalProps
                }) => (
                  <Route
                    key={key}
                    path={path}
                    exact={exact}
                    render={props => (
                      <Component {...props} {...additionalProps} />
                    )}
                  />
                )
              )}
            </FilterProvider>
          </AuthPage>
        </Switch>
      </ErrorEmitterProvider>
    </Suspense>
  );
};
