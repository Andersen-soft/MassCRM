import { lazy, ComponentType, LazyExoticComponent } from 'react';

interface IRoute {
  key: number;
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
  exact: boolean;
  additionalProps: {
    myContactPage?: boolean;
    addContactsPage?: boolean;
    blacklistPage?: boolean;
    isImport?: boolean;
    reportPage?: boolean;
  };
}

const Contact = lazy(() => import('../components/Contact/Contact'));
const UsersCRM = lazy(() => import('../components/UsersCRM/UsersCRM'));
const CompanyPage = lazy(() => import('../components/CompanyPage/CompanyPage'));
const SetPassword = lazy(() => import('../components/SetPassword/SetPassword'));
const Blacklist = lazy(() => import('../components/Blacklist/Blacklist'));
const ContactPage = lazy(() => import('../components/ContactPage/ContactPage'));
const StatusPage = lazy(() => import('../components/StatusPage/StatusPage'));
const ErrorPage = lazy(() => import('../components/ErrorPage/ErrorPage'));
const ReviewPage = lazy(() => import('../components/ReviewPage/ReviewPage'));
const ReportPage = lazy(() => import('../components/ReportPage/ReportPage'));

export const HOME_PATH: string = '/';
export const SET_PASSWORD_PATH: string = '/set_password';
export const COMPANY_PAGE_PATH: string = '/company';
export const USERS_PATH: string = '/users';
export const ADD_CONTACTS_PATH: string = '/add_contacts';
export const MY_CONTACTS_PATH: string = '/my_contacts';
export const ALL_CONTACTS_PATH: string = '/all_contacts';
export const BLACKLIST_PATH: string = '/blacklist';
export const CONTACT_PAGE_PATH: string = '/contact';
export const EXPORT_PATH: string = '/export';
export const IMPORT_PATH: string = '/import';
export const ERROR_PATH: string = '/error';
export const REVIEW_PAGE_PATH: string = '/review';
export const REPORT_PAGE_PATH: string = '/report';

export const ROUTES: IRoute[] = [
  {
    key: 1,
    path: SET_PASSWORD_PATH,
    component: SetPassword,
    exact: true,
    additionalProps: {}
  },
  {
    key: 2,
    path: COMPANY_PAGE_PATH,
    component: CompanyPage,
    exact: true,
    additionalProps: {}
  },
  {
    key: 3,
    path: ERROR_PATH,
    component: ErrorPage,
    exact: true,
    additionalProps: {}
  }
];

export const AUTH_ROUTES: IRoute[] = [
  {
    key: 1,
    path: USERS_PATH,
    component: UsersCRM,
    exact: true,
    additionalProps: {}
  },
  {
    key: 2,
    path: ADD_CONTACTS_PATH,
    component: Contact,
    exact: true,
    additionalProps: { addContactsPage: true }
  },
  {
    key: 3,
    path: MY_CONTACTS_PATH,
    component: Contact,
    exact: true,
    additionalProps: { myContactPage: true }
  },
  {
    key: 4,
    path: ALL_CONTACTS_PATH,
    component: Contact,
    exact: true,
    additionalProps: {}
  },
  {
    key: 5,
    path: BLACKLIST_PATH,
    component: Blacklist,
    exact: true,
    additionalProps: { blacklistPage: true }
  },
  {
    key: 6,
    path: CONTACT_PAGE_PATH,
    component: ContactPage,
    exact: true,
    additionalProps: {}
  },
  {
    key: 7,
    path: EXPORT_PATH,
    component: StatusPage,
    exact: true,
    additionalProps: {}
  },
  {
    key: 8,
    path: IMPORT_PATH,
    component: StatusPage,
    exact: true,
    additionalProps: { isImport: true }
  },
  {
    key: 9,
    path: REVIEW_PAGE_PATH,
    component: ReviewPage,
    exact: true,
    additionalProps: {}
  },
  {
    key: 10,
    path: REPORT_PAGE_PATH,
    component: ReportPage,
    exact: true,
    additionalProps: { reportPage: true }
  }
];
