import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import { continueSession, getUser } from '../../store/slices';
import { PrivateRoutes } from '.';
import {
  COMPANY_PAGE_PATH,
  ERROR_PATH,
  SET_PASSWORD_PATH,
  SetPassword,
  CompanyPage,
  ErrorPage
} from '../../constants';

export const AppRoutes = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      dispatch(continueSession());
    }
  }, []);

  return (
    <Switch>
      <Route exact path={SET_PASSWORD_PATH} component={SetPassword} />
      <Route exact path={COMPANY_PAGE_PATH} component={CompanyPage} />
      <Route exact path={ERROR_PATH} component={ErrorPage} />
      <PrivateRoutes user={currentUser} token={token} />
    </Switch>
  );
};

export default AppRoutes;
