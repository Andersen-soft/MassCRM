import React, { useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import 'src/styles/main.scss';
import { Route, Switch } from 'react-router-dom';
import { continueSession } from 'src/actions/continueSession';
import { setPage } from 'src/actions';
import { getUserRoles } from 'src/selectors';
import { IStoreState } from 'src/interfaces/store';
import { ErrorEmitterProvider } from 'src/context';
import { ContactPage } from '../ContactPage';
import { Loader } from '../common/Loader';

const Contact = lazy(() => import('../Contact/Contact'));
const UsersCRM = lazy(() => import('../UsersCRM/UsersCRM'));
const CompanyPage = lazy(() => import('../CompanyPage/CompanyPage'));
const SetPassword = lazy(() => import('../SetPassword/SetPassword'));
const AuthPage = lazy(() => import('../AuthPage/AuthPage'));
const Blacklist = lazy(() => import('../Blacklist/Blacklist'));
const StatusPage = lazy(() => import('../StatusPage/StatusPage'));

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
    <Suspense fallback={<Loader />}>
      <ErrorEmitterProvider>
        <Switch>
          <Route exact path='/set_password'>
            <SetPassword />
          </Route>
          <Route exact path='/company_page'>
            <CompanyPage />
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
              <StatusPage />
            </Route>
            <Route exact path='/import'>
              <StatusPage isImport />
            </Route>
          </AuthPage>
        </Switch>
      </ErrorEmitterProvider>
    </Suspense>
  );
};
