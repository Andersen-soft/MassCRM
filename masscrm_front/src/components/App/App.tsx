import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import 'src/styles/main.scss';
import { Route, Switch } from 'react-router-dom';
import { continueSession } from 'src/actions/continueSession';
import { setPage } from 'src/actions';
import { getUserRoles } from 'src/selectors';
import { IStoreState } from 'src/interfaces/store';
import {
  SetPassword,
  UsersCRM,
  Contact,
  Demo,
  CompanyPage,
  AuthPage,
  Blacklist,
  ExportPage
} from 'src/components';
import { ContactPage } from '../ContactPage';

export const App = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(getUserRoles);
  const token = Cookies.get('token');

  const user = useSelector((state: IStoreState) => state.users.userData);

  useEffect(() => {
    if (
      (!user && window.location.pathname !== '/') ||
      (user && window.location.pathname !== '/set_password')
    ) {
      dispatch(setPage());
    }
    if (Cookies.get('token')) {
      dispatch(continueSession());
    }
  }, []);

  return (
    <>
      <Switch>
        <Route exact path='/set_password'>
          <SetPassword />
        </Route>
        <Route exact path='/company_page'>
          <CompanyPage />
        </Route>
        <Route exact path='/demo'>
          <Demo />
        </Route>
        <AuthPage token={token} userRole={userRole}>
          <Route exact path='/users'>
            <UsersCRM />
          </Route>
          <Route exact path='/add_contacts'>
            <Contact addContactsPage />
          </Route>
          <Route exact path='/my_contacts'>
            <Contact myContactPage />
          </Route>
          <Route exact path='/all_contacts'>
            <Contact />
          </Route>
          <Route exact path='/blacklist'>
            <Blacklist />
          </Route>
          <Route exact path='/contact'>
            <ContactPage />
          </Route>
          <Route exact path='/export'>
            <ExportPage />
          </Route>
        </AuthPage>
      </Switch>
    </>
  );
};
